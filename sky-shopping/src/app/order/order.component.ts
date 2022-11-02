import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Order } from '../shared/types/order';
import { OrderService } from './order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export interface OrderElement {
  id: string;
  name: string;
  orderPrice: number;
  paymentMethod: string;
  createdAt: Date;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  orderList: Order[] = [];
  userSubscription!: Subscription;
  userId!: string;
  orderDisplayedColumns: string[] = [
    'id',
    'name',
    'orderPrice',
    'paymentMethod',
    'createdAt',
  ];
  orderSource: OrderElement[] = [];
  orderDataSource = new MatTableDataSource<OrderElement>(this.orderSource);

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly _liveAnnouncer: LiveAnnouncer
  ) {}

  ngAfterViewInit() {
    console.log('ngAfterViewInit', this.sort);
    this.orderDataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.hidePaginator();
    this.userSubscription = this.authService.user.subscribe((user) => {
      this.userId = user ? user.id : '';
      this.orderService.getOrderList(this.userId).subscribe({
        next: (res) => {
          if (res.data) {
            console.log('Order List', res.data);
            this.orderList = res.data;
            this.hidePaginator();
            this.orderSource = this.orderList.map((order) => {
              return {
                id: order._id,
                name: order.fullName,
                orderPrice: order.orderPrice,
                paymentMethod: order.paymentMethod,
                createdAt: order.createdAt,
              };
            });
          }
        },
        complete: () => {
          this.orderDataSource = new MatTableDataSource<OrderElement>(
            this.orderSource
          );
          this.orderDataSource.paginator = this.paginator;
          this.orderDataSource.sort = this.sort;
          console.log(this.orderDataSource, this.sort);
        },
      });
    });
  }

  hidePaginator = () => {
    return this.orderList.length === 0 ? true : false;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getOrderDetail = (orderId: string) => {
    this.router.navigate([this.router.url, orderId]);
  };
}
