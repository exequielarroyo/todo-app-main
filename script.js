class Todo {
    constructor(title) {
        this.todo = document.createElement("div");
        this.todo.classList.add("todo");
        this.details = document.createElement("div");
        this.details.classList.add("todo-details");
        this.checkbox = document.createElement("input");
        this.checkbox.type = "checkbox";
        this.checkbox.classList.add("todo-checkbox");
        this.todoTitle = document.createElement("p");
        this.todoTitle.classList.add("todo-title");
        this.todoTitle.innerText = title;
        this.deleteBtn = document.createElement("button");
        this.deleteBtn.classList.add("delete-todo");
        this.deleteBtn.style.visibility = "hidden";
        this.active = true;

        this.deleteBtn.addEventListener("click", e => {
            this.todo.remove();
            todos.splice(todos.indexOf(this), 1);
            updateTodosLeft(todos);
            updateTodo();
        });
        this.todo.addEventListener("mouseenter", e => {
            this.deleteBtn.style.visibility = "visible";
        });
        this.todo.addEventListener("mouseleave", e => {
            this.deleteBtn.style.visibility = "hidden";
        });
        this.checkbox.addEventListener("change", e => {
            if (this.checkbox.checked) {
                this.todoTitle.innerHTML = `<del>${this.todoTitle.innerText}</del>`;
                this.todoTitle.style.color = "var(--font-color-sdr)";
                this.active = false;
                updateTodosLeft(todos);
                updateTodo();
            } else {
                this.todoTitle.innerHTML = `${this.todoTitle.innerText}`;
                this.todoTitle.style.color = "var(--font-color-prm)";
                this.active = true;
                updateTodosLeft(todos);
                updateTodo();
            }
        });

        this.details.append(this.checkbox);
        this.details.append(this.todoTitle);
        this.todo.append(this.details);
        this.todo.append(this.deleteBtn);
    }
}

let todos = [];

const todoInput = document.querySelector("#add-todo-input");
const todosWrapper = document.querySelector(".todos-wrapper");

function loadTodos() {
    let stringArray = localStorage.getItem("items");
    if (stringArray != null) {
        const todosData = stringArray.split(",");
        todosData.forEach(todoTitle => {
            if (todosData != "") {
                todos.push(new Todo(todoTitle));
                updateTodo();
                updateTodosLeft(todos);
            }
        });
    }
}

loadTodos();

todoInput.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        // addign new todos
        const todoTitle = todoInput.value;
        todos.push(new Todo(todoTitle));

        updateTodo();
        updateTodosLeft(todos);

        todoInput.value = "";
    }
});

const filterActiveLabel = document.getElementById("filter-active");
const filterAllLabel = document.getElementById("filter-all");
const filterCompletedLabel = document.getElementById("filter-completed");

filterActiveLabel.addEventListener("click", e => {
    filterActive();
});

function filterActive() {
    const activeTodos = todos.filter(todo => {
        return todo.active == true;
    });
    todosWrapper.innerHTML = "";
    activeTodos.forEach(todo => {
        todosWrapper.append(todo.todo);
    });
}

filterAllLabel.addEventListener("click", e => {
    filterAll();
});

function filterAll() {
    todosWrapper.innerHTML = "";
    todos.forEach(todo => {
        todosWrapper.append(todo.todo);
    });
}

filterCompletedLabel.addEventListener("click", e => {
    filterCompleted();
});

function filterCompleted() {
    const completeTodos = todos.filter(todo => {
        return todo.active == false;
    });
    todosWrapper.innerHTML = "";
    completeTodos.forEach(todo => {
        todosWrapper.append(todo.todo);
    });
}

const clearCompleted = document.getElementById("clear-completed");

clearCompleted.addEventListener("click", e => {
    const activeTodos = todos.filter(todo => {
        return todo.active == true;
    });
    todos = activeTodos;
    todosWrapper.innerHTML = "";
    todos.forEach(todo => {
        todosWrapper.append(todo.todo);
    });
    updateTodo();
});

function updateTodosLeft(todos) {
    const todoLeft = document.getElementById("todo-left");
    const activeNumber = todos.filter(todo => {
        return todo.active == true;
    });
    todoLeft.innerText = `${activeNumber.length} items left`;
}

function updateTodo() {
    const filters = document.querySelectorAll("input[type='radio'");
    let filter = null;
    filters.forEach(filterItem => {
        if (filterItem.checked) {
            filter = filterItem;
        }
    });

    if (filter.checked && filter.id == "all") {
        filterAll();
    } else if (filter.checked && filter.id == "completed") {
        filterCompleted();
    } else {
        filterActive();
    }

    localStorage.setItem(
        "items",
        `${todos.map(todo => {
            return todo["details"].innerText;
        })}`
    );
}

function loadLocalstorage() {
    isDarkmode = localStorage.getItem("isDarkmode");
    if (isDarkmode == "true") {
        document.body.classList.add("theme-darkmode");
    } else {
        document.body.classList.remove("theme-darkmode");
    }
}
let isDarkmode = localStorage.getItem("isDarkmode");

loadLocalstorage();

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", e => {
    if (isDarkmode == "true") {
        localStorage.setItem("isDarkmode", false);
    } else {
        localStorage.setItem("isDarkmode", true);
    }
    loadLocalstorage();
});
