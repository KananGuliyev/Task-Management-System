// task.model.ts
export interface Task {
  id?: number;
  title: string;
  description: string;
  status: string;         // ✅ Add this line
  dueDate: string;
  priority: string;
  category: string;
  assignedTo: string;
}

