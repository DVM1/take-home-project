import { Component } from '@angular/core';
import { Order } from './components/order-table/order.interface';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'take-home-project';
  orders: string = `[
    {
      "description": "order item 1",
      "status": "Pending"
    },
    {
      "description": "order item 2",
      "status": "Approved"
    },
    {
      "description": "order item 3",
      "status": "Rejected"
    }
  ]`

  constructor(private service: CoreService) { }

  ngOnInit(): void {
    const loggedAccount: any = sessionStorage.getItem('loggedAccount');
    const orders: any = (sessionStorage.getItem('orders')) ? sessionStorage.getItem('orders') : this.orders;

    this.service.accountSubject.next(JSON.parse(loggedAccount));
    this.service.orderSubject.next(JSON.parse(orders));
  }
}
