import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Tasks</h2>
    <ul>
      <li *ngFor="let task of tasks">
        {{ task.title }} - {{ task.status }}
        <button (click)="deleteTask(task.id)">Delete</button>
      </li>
    </ul>
    <p *ngIf="tasks.length === 0">No tasks available.</p>
  `,
  styles: []
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('❌ No token found in localStorage');
      return;
    }

    this.taskService.getTasks(token).subscribe({
      next: (data: Task[]) => {
        console.log('✅ Tasks loaded:', data);
        this.tasks = data;
      },
      error: (err: any) => console.error('❌ Could not load tasks:', err)
    });
  }

  deleteTask(id: number): void {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('❌ No token found for deletion');
      return;
    }

    this.taskService.deleteTask(id, token).subscribe({
      next: () => {
        console.log(`🗑️ Task with ID ${id} deleted`);
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      error: (err: any) => console.error('❌ Failed to delete task:', err)
    });
  }
}

