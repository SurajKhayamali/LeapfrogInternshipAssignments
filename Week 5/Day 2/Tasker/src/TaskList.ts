import { Task } from './Task';

export interface ITaskList {
  list: Task[];

  getTaskById: (id: string) => Task | null;
  getTaskByIndex: (index: number) => Task | null;
  getTaskByIdOrFail: (id: string) => Task;

  addTask: (task: Task) => Task[];
  deleteTask: (id: string) => Task[];
}

export class TaskList implements ITaskList {
  list: Task[];

  constructor(tasks?: Task[]) {
    this.list = tasks || [];
  }

  addTask = (task: Task) => {
    this.list.push(task);

    return this.list;
  };

  getTaskById = (id: string) => {
    return this.list.find((item) => item.id === id) || null;
  };

  getTaskByIdOrFail = (id: string) => {
    const task = this.getTaskById(id);

    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }

    return task;
  };

  getTaskByIndex = (index: number) => {
    return this.list[index] || null;
  };

  deleteTask = (id: string) => {
    const index = this.list.findIndex((item) => item.id === id);

    if (index > -1) {
      this.list.splice(index, 1);
    }

    return this.list;
  };
}
