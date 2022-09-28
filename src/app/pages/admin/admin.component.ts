import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/components/order-table/order.interface';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  orders: Order[];

  constructor(private service: CoreService) { }

  ngOnInit(): void {
    this.service.orderSubject.subscribe((data: any) => {
      this.orders = data;
    })
  }

}
