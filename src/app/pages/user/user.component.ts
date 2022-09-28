import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/components/order-table/order.interface';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  orders: Order[];

  orderItem: any = {
    index: 0,
    source: {
      description: '',
      status: ''
    }
  };
  orderState: string;

  constructor(private service: CoreService) { }

  ngOnInit(): void {
    this.service.orderSubject.subscribe((data: any) => {
      this.orders = data;
    })
  }

  onReceivedOrder(order: any) {
    this.orderItem = order;
    this.orderState = 'update';
  }

}
