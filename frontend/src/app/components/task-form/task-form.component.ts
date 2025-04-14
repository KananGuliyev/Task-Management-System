import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service'; // adjust path if needed

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Create New Task</h2>
    <form (ngSubmit)="createTask()">
      <label>Title:</label>
      <input [(ngModel)]="title" name="title" required /><br />

      <label>Description:</label>
      <input [(ngModel)]="description" name="description" /><br />

      <label>Due Date:</label>
      <input [(ngModel)]="dueDate" name="dueDate" type="date" /><br />

      <label>Status:</label>
      <input [(ngModel)]="status" name="status" /><br />

      <label>Priority:</label>
      <input [(ngModel)]="priority" name="priority" /><br />

      <label>Category:</label>
      <input [(ngModel)]="category" name="category" /><br />

      <label>Assigned To:</label>
      <input [(ngModel)]="assignedTo" name="assignedTo" /><br />

      <button type="submit">Create</button>
    </form>
  `
})
export class TaskFormComponent {
  title = '';
  description = '';
  dueDate = '';
  status = '';
  priority = '';
  category = '';
  assignedTo = '';

  constructor(private taskService: TaskService, private router: Router) {}

  createTask(): void {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      console.error('❌ No token found for task creation');
      return;
    }

    this.taskService.createTask({
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      status: this.status,
      priority: this.priority,
      category: this.category,
      assignedTo: this.assignedTo
    }, token).subscribe({
      next: () => {
        console.log('✅ Task created successfully');
        this.router.navigate(['/tasks']);
      },
      error: (err) => console.error('❌ Task creation failed', err)
    });
  }
}

