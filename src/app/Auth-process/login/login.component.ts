// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()">
      <input type="text" [(ngModel)]="username" placeholder="Username" required>
      <input type="password" [(ngModel)]="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ username: this.username, password: this.password })
      .subscribe((response:any) => {
        // Assuming the backend returns a token
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      });
  }
}
