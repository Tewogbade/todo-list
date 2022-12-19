"use strict";

// SELECTOR
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const warning = document.querySelector(".warning");
const clearAll = document.querySelector(".clear-all");
const taskDown = document.querySelector(".task-down");

// EVENT LISTENERS
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", edit);
filterOption.addEventListener("click", filterTodo);
clearAll.addEventListener("click", clearTodos);

// FUNCTION
function addTodo(event) {
  event.preventDefault();
  if (todoInput.value === "") {
    // TO MAKE SHOW WARNING
    warning.style.visibility = "visible";
  } else {
    // TO MAKE WARNING DISAPEAR
    warning.style.visibility = "hidden";
    //   TODO DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // EDIT BUTTON
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-user-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    //   CREAT LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //   CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"> </i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //   TRASH MARK BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //   APPEND TO LIST
    todoList.appendChild(todoDiv);
    //   CLEAR TODO INPUT VALUE
    todoInput.value = "";
  }
  todoCount();
}

function deleteCheck(e) {
  const item = e.target;
  //  DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // ANIMATION
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
    todoCount();
  }

  //  CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function edit(e) {
  const item = e.target;
  //  DELETE TODO
  if (item.classList[0] === "edit-btn") {
    const todo = item.parentElement;
    todoInput.value = todo.innerText;
    removeLocalTodos(todo);
    todo.remove();
    todoCount();
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  // CHECK IF LOCAL STORAGE FOR ANY TODO
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  // CHECK IF LOCAL STORAGE FOR ANY TODO
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // EDIT BUTTON
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-user-edit"></i>';
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    //   CREAT LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //   CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"> </i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //   TRASH MARK BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //   APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  // CHECK IF LOCAL STORAGE FOR ANY TODO
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {
  localStorage.clear();
  todoList.innerHTML = [];
  clearAll.style.display = "none";
  todoCount();
}

function todoCount() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  taskDown.innerHTML = `You have ${todos.length} task${
    todos.length < 2 ? "" : "s"
  }`;

  // CLEAR ALL BUTTON
  if (todos.length >= 2) {
    clearAll.style.display = "flex";
  } else {
    clearAll.style.display = "none";
  }
}
todoCount();
