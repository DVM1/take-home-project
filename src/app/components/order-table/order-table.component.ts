import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { CoreService } from 'src/app/services/core.service';
import { Order } from './order.interface';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {
  @Input() orders: Order[] = [];
  @Output() order = new EventEmitter<any>();

  accountType: string = '';
  btnActionOne : string = '';
  btnActionTwo : string = '';

  displayedColumns: string[] = ['description', 'status', 'actions'];
  dataSource = new MatTableDataSource<Order>();
  
  constructor(private service: CoreService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Order>(this.orders);

    this.service.accountSubject.subscribe((data: any) => {
      this.configButton(data);
    })
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource<Order>(this.orders);
  }

  btnAction(action: string, data: any) {
    if (this.accountType === "admin") {
      this.adminActions(action, data);
    } else {
      this.userActions(action, data);
    }
  }

  configButton(data: any) {
    this.accountType = (data) ? data.accountType : '';
    this.btnActionOne = (this.accountType === "admin") ? "Approve" : "Edit";
    this.btnActionTwo = (this.accountType === "admin") ? "Reject" : "Remove";
  }

  adminActions(action: string, index: number) {
    if (action === "Approve") {
      this.dataSource.data[index].status = 'Approved';
      this.service.saveOrderSession(this.dataSource.data);
    } else {
      this.dataSource.data[index].status = 'Rejected';
      this.service.saveOrderSession(this.dataSource.data);
    }
  }

  userActions(action: string, index: number) {
    if (action === "Edit") {
      const data = {
        index: index,
        source: this.dataSource.data[index]
      }
      this.order.emit(data);
    } else {
      this.dataSource.data = this.dataSource.data.filter((row, i) => i !== index)
      this.service.saveOrderSession(this.dataSource.data);
    }
  }
}