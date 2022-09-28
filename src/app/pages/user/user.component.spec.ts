import { Overlay } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from 'src/app/components/components.module';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MaterialModule } from 'src/app/components/material.module';
import { OrderFormComponent } from 'src/app/components/order-form/order-form.component';
import { OrderTableComponent } from 'src/app/components/order-table/order-table.component';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent, HeaderComponent, OrderFormComponent, OrderTableComponent ],
      imports: [MaterialModule, BrowserAnimationsModule, ComponentsModule],
      providers: [
        FormBuilder,
        MatSnackBar,
        Overlay
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
