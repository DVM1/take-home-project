import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MaterialModule } from 'src/app/components/material.module';
import { OrderFormComponent } from 'src/app/components/order-form/order-form.component';
import { OrderTableComponent } from 'src/app/components/order-table/order-table.component';

import { AdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent, HeaderComponent, OrderFormComponent, OrderTableComponent ],
      imports: [MaterialModule, BrowserAnimationsModule, ComponentsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
