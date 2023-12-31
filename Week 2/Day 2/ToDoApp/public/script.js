/**
 * @typedef {Object} Todo
 * @property {string} title
 * @property {boolean} completed
 */
const todos = [];
let filterQueryText = "";

/**
 *
 * @param {title, completed} todo
 * @returns {undefined}
 *
 */
const handleNewTodo = (todo) => {
  todos.push(todo);
  renderTodos();
};

/**
 * Mark a todo as completed or pending
 * @param {string} title
 * @param {boolean} completed
 * @returns {undefined}
 *
 */
const handleTodoCompletedStatusChange = (title, completed) => {
  const todo = todos.find((todo) => todo.title === title);
  if (!todo) return;
  todo.completed = completed;
  renderTodos();
};

/**
 * Mark a todo as completed
 * @param {string} title
 * @returns {undefined}
 *
 */
const handleTodoDone = (title) => {
  return handleTodoCompletedStatusChange(title, true);
};

/**
 * Mark a todo as pending
 * @param {string} title
 * @returns {undefined}
 *
 */
const handleTodoUndone = (title) => {
  return handleTodoCompletedStatusChange(title, false);
};

/**
 * Delete a todo
 * @param {string} title
 * @returns {undefined}
 *
 */
const handleTodoDelete = (title) => {
  const index = todos.findIndex((todo) => todo.title === title);
  if (index === -1) return;
  todos.splice(index, 1);
  renderTodos();
};

/**
 * Generate HTML Element for todo
 * @param {title, completed} todo
 * @returns {HTMLLIElement} li
 *
 */
const generateHTMLElement = (todo) => {
  // Example HTML structure
  //   <li class="todoList__item">
  //   <div class="todoList__text">Todo 1</div>
  //   <div class="todoList__actions">
  //     <button class="todoList__actionBtn todoList__actionBtn--done">
  //       <img src="./icons/circle-check.svg" alt="done" />
  //     </button>
  //     <button class="todoList__actionBtn todoList__actionBtn--undone">
  //       <img src="./icons/circle.svg" alt="undone" />
  //     </button>
  //     <button class="todoList__actionBtn todoList__actionBtn--delete">
  //       <img src="./icons/circle-xmark.svg" alt="delete" />
  //     </button>
  //   </div>
  // </li>
  const { title, completed } = todo;
  const li = document.createElement("li");
  li.classList.add("todoList__item");

  const text = document.createElement("div");
  text.classList.add("todoList__text");
  text.innerText = title;

  const actions = document.createElement("div");
  actions.classList.add("todoList__actions");

  if (completed) {
    li.classList.add("todoList__item--done");

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("todoList__actionBtn", "todoList__actionBtn--done");
    doneBtn.title = "Mark as undone";
    doneBtn.addEventListener("click", () => handleTodoUndone(title)); // INFO: reversal, on done marked button click, undone action is performed and vice versa

    const doneImg = document.createElement("img");
    doneImg.src = "./icons/circle-check.svg";
    doneImg.alt = "done";

    doneBtn.appendChild(doneImg);
    actions.appendChild(doneBtn);
  } else {
    const undoneBtn = document.createElement("button");
    undoneBtn.classList.add(
      "todoList__actionBtn",
      "todoList__actionBtn--undone"
    );
    undoneBtn.title = "Mark as done";
    undoneBtn.addEventListener("click", () => handleTodoDone(title));

    const undoneImg = document.createElement("img");
    undoneImg.src = "./icons/circle.svg";
    undoneImg.alt = "undone";

    undoneBtn.appendChild(undoneImg);
    actions.appendChild(undoneBtn);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("todoList__actionBtn", "todoList__actionBtn--delete");
  deleteBtn.title = "Delete";
  deleteBtn.addEventListener("click", () => handleTodoDelete(title));

  const deleteImg = document.createElement("img");
  deleteImg.src = "./icons/circle-xmark.svg";
  deleteImg.alt = "delete";

  deleteBtn.appendChild(deleteImg);
  actions.appendChild(deleteBtn);

  li.appendChild(text);
  li.appendChild(actions);

  return li;
};

/**
 * Bind event listeners to the todo html element
 * @param {HTMLLIElement} li, {string} title
 * @returns {undefined}
 *
 */
const bindEventListeners = (li, title) => {
  const doneBtn = li.querySelector(".todoList__actionBtn--done");
  doneBtn?.addEventListener("click", () => handleTodoUndone(title));

  const undoneBtn = li.querySelector(".todoList__actionBtn--undone");
  undoneBtn?.addEventListener("click", () => handleTodoDone(title));

  const deleteBtn = li.querySelector(".todoList__actionBtn--delete");
  deleteBtn.addEventListener("click", () => handleTodoDelete(title));
};

/**
 * Renders the todos array to the DOM
 * @returns {undefined}
 *
 */
const renderTodos = () => {
  const todoList = document.getElementById("todoList");
  const pendingOnlyTodoList = document.getElementById("pendingOnlyTodoList");
  const completedOnlyTodoList = document.getElementById(
    "completedOnlyTodoList"
  );
  todoList.innerHTML = "";
  pendingOnlyTodoList.innerHTML = "";
  completedOnlyTodoList.innerHTML = "";

  const filteredTodos = handleFilter(filterQueryText);
  for (const todo of filteredTodos) {
    const li = generateHTMLElement(todo);
    todoList.appendChild(li);

    const clonedElement = li.cloneNode(true);
    bindEventListeners(clonedElement, todo.title);

    if (todo.completed) {
      completedOnlyTodoList.appendChild(clonedElement);
    } else {
      pendingOnlyTodoList.appendChild(clonedElement);
    }
  }
};

/**
 * Validates the form input value,
 * Checks:
 * 1. If the value is empty
 * 2. If the value is a duplicate, already present in the todos array
 * @param {string} value
 * @returns {boolean} isValid
 */
const validateFormInput = (value) => {
  if (!value) {
    alert("Please enter a todo");
    return false;
  }

  const isDuplicate = todos.some((todo) => todo.title === value);
  if (isDuplicate) {
    alert("Todo with that title already exists");
    return false;
  }

  return true;
};

/**
 * Handles the form submit event
 * @param {Event} e
 * @returns {undefined}
 *
 */
const handleFormSubmit = (e) => {
  e.preventDefault();

  const form = e.target;
  const input = form.querySelector("input");
  const value = input.value;

  const isValid = validateFormInput(value);
  if (!isValid) return;

  handleNewTodo({
    title: value,
    completed: false,
  });

  input.value = "";
};

const addTodoForm = document.getElementById("addTodoForm");
addTodoForm.addEventListener("submit", handleFormSubmit);

const handleFilter = (title) => {
  return todos.filter((todo) => todo.title.includes(title));
};
const handleFilterChange = (e) => {
  filterQueryText = e.target.value;
  renderTodos();
};

const filterInput = document.getElementById("filterInput");
filterInput.addEventListener("input", handleFilterChange);

window.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});
