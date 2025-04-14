import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="register()">
      <input [(ngModel)]="username" name="username" placeholder="Username" required />
      <input [(ngModel)]="email" name="email" placeholder="Email" required />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  `
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

register() {
  this.http.post('/auth/register', {
    username: this.username,
    email: this.email,
    password: this.password
  }, { responseType: 'text' }).subscribe({
    next: () => this.router.navigate(['/login']),
    error: (err) => console.error('❌ Registration failed', err)
  });
}
}

