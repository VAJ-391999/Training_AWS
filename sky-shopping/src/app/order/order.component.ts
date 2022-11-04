import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from '../shared/types/order';
import { OrderService } from './order.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { select } from '@angular-redux/store';
import { UserTokenPayload } from '../shared/types/auth';

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
export class OrderComponent implements OnInit, AfterViewInit, OnDestroy {
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
  @select('user') user!: Observable<UserTokenPayload>;

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly _liveAnnouncer: LiveAnnouncer
  ) {}

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.orderDataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    console.log('order ngoninit');
    this.hidePaginator();
    this.userSubscription = this.user.subscribe((user) => {
      this.userId = user ? user.id : '';
      if (this.userId !== '') {
        this.orderService.getOrderList(this.userId).subscribe({
          next: (res) => {
            if (res.data) {
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
          },
        });
      }
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
