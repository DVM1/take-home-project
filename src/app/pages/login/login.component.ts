import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private snackbar: MatSnackBar, 
    private service: CoreService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.service.accountSubject.subscribe((data: any) => {
      this.navigateByAccountType((data) ? data.accountType : '');
    })
  }

  onLogin() {
    if (this.loginForm.valid) {
      const isAuthenticated = this.service.authenticateUser(this.loginForm.value.username, this.loginForm.value.password)

      if (isAuthenticated) {
        this.showMessage(`User ${this.loginForm.value.username} is logged in.`);
        this.loginForm.reset();
      } else {
        this.showMessage('Please check your username and password');
      }
    }
  }

  showMessage(message: string) {
    this.snackbar.open(message, undefined, {
      duration: 2500
    });
  }

  navigateByAccountType(type: string) {
    if (type === 'admin') {
      this.router.navigate(['/admin']);
    } else if (type === 'user') {
      this.router.navigate(['/']);
    }
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    return control?.dirty && control.errors?.['required'];
  }
}
