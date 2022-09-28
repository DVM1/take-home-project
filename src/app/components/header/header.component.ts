import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username: string = '';

  constructor(private service: CoreService, private router: Router) { }

  ngOnInit(): void {
    this.service.accountSubject.subscribe((data: any) => {
      this.username = data.username;
    })
  }

  onLogout() {
    this.service.saveUserSession('', '');
    this.router.navigate(['/login']);
  }

}
