// Document elements
const todoInput = document.getElementById("todo-input");
const todoButton = document.getElementById("todo-button");
const todoLists = document.getElementById("todo-lists");
const completeButton = document.getElementById("complete-btn");
const trashButton = document.getElementById("trash-btn");

// Event Listeners
// For load Todos and Todos Completed from Local Storage
document.addEventListener("DOMContentLoaded", getTodos);
// For Add , Deleted and Checked Todo 
todoButton.addEventListener("click", addTodo);
todoLists.addEventListener("click", deleteAndCheck);

// Functions
// Add Todo List
function addTodo(event) {

    // Prevent form from submitting
    event.preventDefault();

    // Check already have thing in there?
    const todos = checkTodos();

    // Add New List
    if ((todoInput.value.trim() !== "") && (!todos.includes(todoInput.value))) {
        // Create Todo List
        createTodoList(todoInput.value);
        // Save Todo to local storage
        saveLocalTodos(todoInput.value);
        // Clear todo input value
        todoInput.value = "";
    } else {
        alert("Add New Task Only ❗❗❗");
    }

}

// Create Todo List
function createTodoList(todo) {

    // Create Todo List Element
    const newTodoList = document.createElement("li");
    newTodoList.classList.add("todo", "list-group-item", "d-flex", "justify-content-between", "align-items-center");
    // Create Todo
    createTodo(todo, newTodoList);

}

// Create Todo Completed
function createTodoListCompleted(todoCompleted) {

    // Create Todo Completed List Element
    const newTodoList = document.createElement("li");
    newTodoList.classList.add("todo", "list-group-item", "d-flex", "justify-content-between", "align-items-center", "completed");
    // Create Todo
    createTodo(todoCompleted, newTodoList);

}

// Create Todo and Buttons
function createTodo(todo, newTodoList) {
    // Create Todo Text
    const newTodoText = document.createElement("h5");
    newTodoText.classList.add("text-truncate", "col-8", "col-md-10", "pl-0");
    newTodoText.innerText = todo;
    // Add to List
    newTodoList.appendChild(newTodoText);

    // Create Button Span
    const newTodoButtons = document.createElement("span");
    newTodoButtons.classList.add("col-4", "col-md-2", "d-flex", "justify-content-end", "px-0");
    newTodoList.appendChild(newTodoButtons);

    // Create Complete Button
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.type = "button";
    completeButton.classList.add("complete-btn", "btn", "btn-success", "mr-1");
    // Add Complete Button
    newTodoButtons.appendChild(completeButton);

    // Create Trash Button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    completeButton.type = "button";
    trashButton.classList.add("trash-btn", "btn", "btn-danger");
    // Add Trash Button
    newTodoButtons.appendChild(trashButton);

    // Add Complete and Trash Button to List
    newTodoList.appendChild(newTodoButtons);

    // Append New Todo to list
    todoLists.appendChild(newTodoList);

}

// Delete and Check Mark Todo Item
function deleteAndCheck(event) {

    const item = event.target;

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement.parentElement;
        // Add class for Toggle Todo Completed
        todo.classList.toggle("completed");
        // Add Todo Completed to Local Storage
        saveLocalTodosCompleted(todo.children[0].innerText);
    }

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement.parentElement;
        // Add class for Delete Todo 
        todo.classList.add("animate__animated", "animate__zoomOut");
        todo.addEventListener('animationend', function () {
            todo.remove();
        });
        // Delete Todo and Todo Completed from Local Storage
        removeLocalTodos(todo);
        removeLoacalTodosCompleted(todo);
    }

}

// Add Todos to Local Storage
function saveLocalTodos(todo) {

    // Check already have thing in there?
    const todos = checkTodos();

    // Add Todo to Local Storage
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

}

// Remove Todos from Local Storage
function removeLocalTodos(todo) {

    // Check already have thing in there?
    const todos = checkTodos();

    const todoIndex = todo.children[0].innerText;
    // console.log(todoIndex)
    // Delete Todo from Local Storage
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}

// Add Todos Completed to Local Storage
function saveLocalTodosCompleted(todo) {

    // Check already have thing in there?
    const todosCompleted = checkTodosCompleted();

    // Check and Unchecked Todo Completed
    if (!todosCompleted.includes(todo)) {
        // Checked for Add Todo Completed to todosCompleted
        todosCompleted.push(todo);
    } else {
        // Checked for Delete Todo Completed from todosCompleted (Unchecked! Todo)
        const todoIndex = todo;
        todosCompleted.splice(todosCompleted.indexOf(todoIndex), 1);
    }
    // Add Todo Completed to Local Storage
    localStorage.setItem("todosCompleted", JSON.stringify(todosCompleted));

}

// Delete Todos Compelted from Local Storage
function removeLoacalTodosCompleted(todo) {

    // Check already have thing in there?
    const todosCompleted = checkTodosCompleted();

    const todoIndex = todo.children[0].innerText;
    // console.log(todoIndex)
    todosCompleted.splice(todosCompleted.indexOf(todoIndex), 1);
    localStorage.setItem("todosCompleted", JSON.stringify(todosCompleted));

}

// Get Todos from Local Storage
function getTodos() {

    // Check already have thing in there?
    const todos = checkTodos();
    const todosCompleted = checkTodosCompleted();

    // Check and Create New Todo List or Todo Completed List with Older Position
    todos.forEach(function (todo) {
        if (!todosCompleted.includes(todo)) {
            createTodoList(todo);
        } else {
            createTodoListCompleted(todo);
        }
    })

}

// Check already Todos have thing in there?
function checkTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        return todos = [];
    } else {
        return todos = JSON.parse(localStorage.getItem("todos"));
    }
}

// Check already TodosCompleted have thing in there?
function checkTodosCompleted() {
    let todosCompleted;
    if (localStorage.getItem("todosCompleted") === null) {
        return todosCompleted = [];
    } else {
        return todosCompleted = JSON.parse(localStorage.getItem("todosCompleted"));
    }
}