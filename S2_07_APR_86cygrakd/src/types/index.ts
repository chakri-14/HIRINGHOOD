export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'To Do' | 'In Progress' | 'Done';
    tags?: string[];
  }
  
  export interface TaskFilters {
    status?: string;
    priority?: string;
    search?: string;
  }