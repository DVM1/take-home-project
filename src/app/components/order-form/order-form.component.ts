import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoreService } from 'src/app/services/core.service';
import { Order } from '../order-table/order.interface';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  @Input() order: any;
  @Input() state: string;
  btnState: string;
  orders: Order[];

  matcher = new MyErrorStateMatcher();
  orderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private snackbar: MatSnackBar, 
    private service: CoreService) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      order: ['', Validators.required],
    });

    this.service.orderSubject.subscribe((data: any) => {
      this.orders = data;
    })
  }

  ngOnChanges() {
    this.btnState = this.state;
    if (this.btnState === 'update') {
      this.orderForm.get('order')?.setValue(this.order.source.description);
    }
  }

  onSubmit() {
    if (this.orderForm.valid) {
      if (this.btnState === 'update') {
        const source: any = [...this.orders];
        
        source[this.order.index].description = this.orderForm.get('order')?.value;
        this.service.saveOrderSession(source);
        this.showMessage('Order is updated');
      } else {
        const source = [...this.orders];
        
        source.push({ description: this.orderForm.get('order')?.value, status: 'Pending'});
        this.service.saveOrderSession(source);
        this.showMessage('Order is created');
      }

      this.btnState = '';
      this.orderForm.reset();
    }
  }

  showMessage(message: string) {
    this.snackbar.open(message, undefined, {
      duration: 2500
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return control?.dirty && control.errors?.['required'];
  }
}
