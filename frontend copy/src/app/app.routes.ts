import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TaskListComponent } from './components/task-list/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },   // ✅ Default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TaskListComponent }
];

