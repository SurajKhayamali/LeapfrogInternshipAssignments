import "normalize.css";
import "./assets/styles/style.css";

import { Task } from "./Task";
import { TaskList } from "./TaskList";

const taskListElement = document.getElementById("task-list");
const searchInput = document.getElementById("search-input");

const taskList = new TaskList();

function createTask(value: string): Task {
  const task = new Task(value);
  taskList.addTask(task);

  return task;
}

function toggleTaskCompleted(id: string): Task {
  const task = taskList.getTaskById(id);

  if (!task) {
    throw new Error(`Task with id ${id} not found`);
  }

  if (task) {
    task.toggleCompleted();
  }

  return task;
}

createTask("Learn some new language");
createTask("Learn how to learn a new language");
createTask("Fail at learning a new language");

function search(list: TaskList, searchTerm: string = ""): TaskList {
  const tasks = list.list.filter((item) => {
    return item.value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return new TaskList(tasks);
}

function renderList(tasks: TaskList) {
  if (!taskListElement) throw new Error("DOM element not found");

  taskListElement.innerHTML = "";

  tasks.list.forEach((task) => {
    const element = document.createElement("div");
    element.classList.add("task-item");

    const label = document.createElement("label");
    label.classList.add("form-control");
    element.appendChild(label);

    const inputField = document.createElement("input");
    inputField.setAttribute("type", "checkbox");
    inputField.checked = task.completed;

    inputField.addEventListener("change", () => {
      toggleTaskCompleted(task.id);
    });

    const taskValue = document.createElement("div");
    taskValue.classList.add("task-item-value");
    taskValue.textContent = task.value;

    label.appendChild(inputField);
    label.appendChild(taskValue);

    taskListElement.appendChild(element);
  });
}

searchInput?.addEventListener("input", (e) => {
  const searchParam = (e.target as HTMLInputElement)?.value;

  render(searchParam);
});

function render(searchParam: string = "") {
  const filteredTaskList = search(taskList, searchParam);

  renderList(filteredTaskList);
}

render();
