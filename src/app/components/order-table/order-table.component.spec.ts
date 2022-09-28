import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';
import { OrderTableComponent } from './order-table.component';
import { Order } from './order.interface';

describe('OrderTableComponent', () => {
  let component: OrderTableComponent;
  let fixture: ComponentFixture<OrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTableComponent ],
      imports: [MaterialModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.orders = [{ "description": "order item 1", "status": "Pending" }]
    component.dataSource = new MatTableDataSource<Order>(component.orders);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if accountType is admin, the first button name should be Approve', () => {
    const accountType = { accountType: 'admin'};
    component.configButton(accountType);
    fixture.detectChanges();

    expect(component.btnActionOne).toBe('Approve');
  });

  it('if accountType is admin, the second button name should be Reject', () => {
    const accountType = { accountType: 'admin'};
    component.configButton(accountType);
    fixture.detectChanges();

    expect(component.btnActionTwo).toBe('Reject');
  });

  it('if accountType is user, the first button name should be Edit', () => {
    const accountType = { accountType: 'user'};
    component.configButton(accountType);
    fixture.detectChanges();

    expect(component.btnActionOne).toBe('Edit');
  });

  it('if accountType is user, the second button name should be Remove', () => {
    const accountType = { accountType: 'user'};
    component.configButton(accountType);
    fixture.detectChanges();

    expect(component.btnActionTwo).toBe('Remove');
  });

  it('should check if approve button exists using admin accountType', () => {
    const accountType = { accountType: 'admin'};
    component.configButton(accountType);
    fixture.detectChanges();

    const approveBtn = fixture.debugElement.query(By.css('button:first-child')).nativeElement;
    expect(approveBtn).toBeTruthy()
  });

  it('should check if reject button exists using admin accountType', () => {
    const accountType = { accountType: 'admin'};
    component.configButton(accountType);
    fixture.detectChanges();

    const rejectBtn = fixture.debugElement.query(By.css('button:last-child')).nativeElement;
    expect(rejectBtn).toBeTruthy()
  });
});