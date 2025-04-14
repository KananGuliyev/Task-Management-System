import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <a routerLink="/login">Login</a> |
      <a routerLink="/register">Register</a> |
      <a routerLink="/tasks">Tasks</a> |
      <a routerLink="/tasks/new">New Task</a> |
      <a (click)="logout()" style="cursor:pointer;">Logout</a>
    </nav>
    <hr />
  `
})
export class NavbarComponent {
  logout() {
    localStorage.removeItem('jwtToken');
    window.location.href = '/login';
  }
}

