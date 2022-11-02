import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/types/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: [
    './order-detail.component.css',
    '../../shared/common/common-style.css',
  ],
})
export class OrderDetailComponent implements OnInit {
  orderId!: string;
  order!: any;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.orderId = params['orderId'];
      console.log(this.orderId);
      this.orderService.getOrderDetail(this.orderId).subscribe({
        next: (res) => {
          if (res.data) {
            this.order = res.data;
            console.log('Get order', this.order);
          }
        },
      });
    });
  }
}
