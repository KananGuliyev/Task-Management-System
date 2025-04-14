import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Edit Task</h2>
    <form *ngIf="task" (ngSubmit)="updateTask()">
      <label>Title:</label>
      <input [(ngModel)]="task.title" name="title" required /><br />

      <label>Description:</label>
      <input [(ngModel)]="task.description" name="description" required /><br />

      <label>Due Date:</label>
      <input [(ngModel)]="task.dueDate" name="dueDate" type="date" required /><br />

      <label>Status:</label>
      <select [(ngModel)]="task.status" name="status">
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select><br />

      <button type="submit">Update Task</button>
    </form>
    <p *ngIf="!task">Loading task...</p>
  `
})
export class TaskDetailComponent implements OnInit {
  task!: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('jwtToken');

    if (token) {
      this.taskService.getTask(id, token).subscribe({
        next: (task: Task) => this.task = task,
        error: (err) => console.error('❌ Failed to load task', err)
      });
    } else {
      console.error('❌ No token found');
    }
  }

  updateTask(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const token = localStorage.getItem('jwtToken');

    if (!token) {
      console.error('❌ No token found');
      return;
    }

    this.taskService.updateTask(id, this.task, token).subscribe({
      next: () => {
        console.log('✅ Task updated');
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('❌ Update failed', err);
      }
    });
  }
}

