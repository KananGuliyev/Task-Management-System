import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Login</h2>
    <form (ngSubmit)="login()">
      <input
        [(ngModel)]="username"
        name="username"
        placeholder="Username"
        required
      />
      <input
        [(ngModel)]="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  `
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    console.log('🟡 Login button clicked');

    this.http.post<any>('/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        console.log('✅ Login success:', res);
        localStorage.setItem('jwtToken', res.token);
        this.router.navigate(['/tasks']); // ✅ Redirect to task list page
      },
      error: (err) => {
        console.error('❌ Login failed', err);
      }
    });
  }
}

