import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { OrderFormComponent } from './order-form/order-form.component';
import { OrderTableComponent } from './order-table/order-table.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderTableComponent,
    HeaderComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    HeaderComponent,
    OrderFormComponent,
    OrderTableComponent
  ]
})
export class ComponentsModule { }
