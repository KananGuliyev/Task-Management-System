import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(token: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  createTask(task: Task, token: string): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  updateTask(id: number, task: Task, token: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  deleteTask(id: number, token: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }

  getTask(id: number, token: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    });
  }
}

