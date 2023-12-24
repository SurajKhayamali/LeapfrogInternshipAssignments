import { Task } from './Task';
import { TaskControl } from './TaskControl';
import { validateFormInput } from './utils';

interface IUIControl {
  searchParam: string;

  taskListElement: HTMLElement;
  pendingOnlyTodoList: HTMLElement;
  completedOnlyTodoList: HTMLElement;

  render: (searchParam?: string) => void;
}

export class UIControl implements IUIControl {
  searchParam = '';

  taskListElement: HTMLElement;
  pendingOnlyTodoList: HTMLElement;
  completedOnlyTodoList: HTMLElement;

  constructor(private readonly taskControl: TaskControl) {
    this.taskListElement = this.getOrCreateTodoList('todoList');
    this.pendingOnlyTodoList = this.getOrCreateTodoList('pendingOnlyTodoList');
    this.completedOnlyTodoList = this.getOrCreateTodoList(
      'completedOnlyTodoList'
    );

    const addTodoForm = document.getElementById('addTodoForm');
    addTodoForm?.addEventListener('submit', this.bindAddTodoFormEventListener);

    const filterInput = document.getElementById('filterInput');
    filterInput?.addEventListener('input', this.bindFilterInputEventListener);
  }

  private bindAddTodoFormEventListener = (e: SubmitEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const inputField = form.querySelector('input');
    if (!inputField) throw new Error('Input field not found');

    const value = inputField.value;

    const isValid = validateFormInput(
      value,
      this.taskControl.getFilteredTasks(this.searchParam)
    );
    if (!isValid) return;

    this.taskControl.createTask(value);
    this.reRender();

    inputField.value = '';
  };

  private bindFilterInputEventListener = (e: Event) => {
    this.searchParam = (e.target as HTMLInputElement)?.value;

    this.render(this.searchParam);
  };

  private bindEventListnersInTodoItem = (li: HTMLLIElement) => {
    const label = li.querySelector('label');
    if (!label) throw new Error('Label not found');

    const inputField = li.querySelector('input');
    if (!inputField) throw new Error('Input field not found');

    const deleteBtn = li.querySelector('button');
    if (!deleteBtn) throw new Error('Delete button not found');

    const inputId = inputField.id;

    label.addEventListener('click', () => {
      this.handleToogleTaskCompleted(inputId);
    });

    inputField.addEventListener('change', () => {
      this.handleToogleTaskCompleted(inputId);
    });

    deleteBtn.addEventListener('click', () => {
      this.handleDeleteTask(inputId);
    });
  };

  private getOrCreateTodoList = (id: string) => {
    const existingList = document.getElementById(id);
    if (existingList) return existingList;

    const newList = document.createElement('ul');
    newList.classList.add('todo-list', 'form-control');

    return newList;
  };

  private reRender() {
    this.render(this.searchParam);
  }

  private handleToogleTaskCompleted = (id: string) => {
    this.taskControl.toggleTaskCompleted(id);
    this.reRender();
  };

  private handleDeleteTask = (id: string) => {
    this.taskControl.deleteTask(id);
    this.reRender();
  };

  private createLabel = (id: string, value: string) => {
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.classList.add('todo-list__text');
    label.textContent = value;

    return label;
  };

  private createCheckbox = (id: string, completed: boolean) => {
    const inputField = document.createElement('input');
    inputField.id = id;
    inputField.setAttribute('type', 'checkbox');
    inputField.checked = completed;

    inputField.addEventListener('change', () => {
      this.handleToogleTaskCompleted(id);
    });

    return inputField;
  };

  private createDeleteBtn = (id: string) => {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add(
      'todo-list__action-btn',
      'todo-list__action-btn--delete'
    );
    deleteBtn.title = 'Delete';
    deleteBtn.addEventListener('click', () => {
      this.handleDeleteTask(id);
    });

    const deleteImg = document.createElement('img');
    deleteImg.src = './icons/circle-xmark.svg';
    deleteImg.alt = 'delete';

    deleteBtn.appendChild(deleteImg);

    return deleteBtn;
  };

  private createActions = (id: string, completed: boolean) => {
    const actions = document.createElement('div');
    actions.classList.add('todo-list__actions');

    const inputField = this.createCheckbox(id, completed);
    actions.appendChild(inputField);

    const deleteBtn = this.createDeleteBtn(id);
    actions.appendChild(deleteBtn);

    return actions;
  };

  private renderTodoItem = (task: Task) => {
    const { id, value, completed } = task;
    const li = document.createElement('li');
    li.classList.add('todo-list__item', 'form-control');

    const label = this.createLabel(id, value);
    completed && li.classList.add('todo-list__item--done');
    li.appendChild(label);

    const actions = this.createActions(id, completed);
    li.appendChild(actions);

    const clonedElement = li.cloneNode(true);
    this.bindEventListnersInTodoItem(clonedElement as HTMLLIElement);

    if (completed) {
      this.completedOnlyTodoList.appendChild(clonedElement);
    } else {
      this.pendingOnlyTodoList.appendChild(clonedElement);
    }

    this.taskListElement.appendChild(li);
  };

  private clearList = () => {
    this.taskListElement.innerHTML = '';
    this.pendingOnlyTodoList.innerHTML = '';
    this.completedOnlyTodoList.innerHTML = '';
  };

  private renderList = (tasks: Task[]) => {
    this.clearList();

    tasks.forEach(this.renderTodoItem);
  };

  render(searchParam: string = '') {
    const filteredTaskList = this.taskControl.getFilteredTasks(searchParam);

    this.renderList(filteredTaskList);
  }
}
