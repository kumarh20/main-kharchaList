// logout.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-logout',
  template: `
    <button (click)="logout()">Logout</button>
  `,
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout()
      .subscribe(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      });
  }
}
