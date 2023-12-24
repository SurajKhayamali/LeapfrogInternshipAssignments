import { Task } from './Task';
import { TaskList } from './TaskList';

interface ITaskControl {
  taskList: TaskList;

  createTask: (value: string) => Task;
  toggleTaskCompleted: (id: string) => Task;
  deleteTask: (id: string) => Task;
  getFilteredTasks: (searchTerm: string) => Task[];
}

export class TaskControl implements ITaskControl {
  taskList: TaskList;

  constructor() {
    this.taskList = new TaskList();
  }

  createTask = (value: string) => {
    const task = new Task(value);
    this.taskList.addTask(task);

    return task;
  };

  toggleTaskCompleted = (id: string) => {
    const task = this.taskList.getTaskByIdOrFail(id);

    task.toggleCompleted();

    return task;
  };

  deleteTask = (id: string) => {
    const task = this.taskList.getTaskByIdOrFail(id);

    this.taskList.deleteTask(id);

    return task;
  };

  getFilteredTasks = (searchTerm: string = '') => {
    const tasks = this.taskList.list.filter((item) => {
      return item.value.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return tasks;
  };
}
