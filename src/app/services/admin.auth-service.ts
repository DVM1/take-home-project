import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CoreService } from "./core.service";

@Injectable()
export class CanActivateAccess implements CanActivate {
  constructor(private router: Router, private service: CoreService,) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
	): Promise<boolean> {
		const accountType = (this.service.accountSubject.value) ? this.service.accountSubject.value.accountType : '';

		switch (accountType) {
			case 'user':
				if ((state.url === '/admin') || (state.url === '/login')) {
					return this.router.navigate(['/']);
				}
				return true;
			case 'admin':
				if ((state.url === '/') || (state.url === '/login')) {
					return this.router.navigate(['/admin']);
				}
				return true;
			default:
				if ((state.url === '/admin') || (state.url === '/')) {
					return this.router.navigate(['/login']);
				}
				return true;
		}
  }
}