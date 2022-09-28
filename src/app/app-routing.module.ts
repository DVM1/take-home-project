import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserComponent } from './pages/user/user.component';
import { CanActivateAccess } from './services/admin.auth-service'

const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CanActivateAccess]
  },
  {
    path: '',
    component: UserComponent,
    canActivate: [CanActivateAccess]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [CanActivateAccess]
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanActivateAccess]
})
export class AppRoutingModule { }
