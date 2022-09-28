import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
    accountSubject = new BehaviorSubject<any>({});
    orderSubject = new BehaviorSubject<any>([]);

  constructor() { }

  authenticateUser(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
        this.saveUserSession(username, 'admin');
        return true;
    } else if (username === 'user' && password === 'user') {
        this.saveUserSession(username, 'user');
        return true;
    } else {
        return false;
    }
  }

  saveUserSession(username: string, accountType: string) {
    const data = {
      username: username,
      accountType: accountType
    }

    this.accountSubject.next(data);
    sessionStorage.setItem('loggedAccount', JSON.stringify(data));
  }

  saveOrderSession(data: any) {
    this.orderSubject.next(data);
    sessionStorage.setItem('orders', JSON.stringify(data));
  }

}