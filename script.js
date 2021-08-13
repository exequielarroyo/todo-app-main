const todosTitle = document.querySelectorAll(".todo-title");
const todosCheckbox = document.querySelectorAll(".todo-checkbox");
const todos = document.querySelectorAll(".todo");
const deleteTodos = document.querySelectorAll(".delete-todo");

deleteTodos.forEach(deleteTodo => {
    deleteTodo.style.visibility = "hidden";
});

todos.forEach(todo => {
    todo.addEventListener("mouseenter", e => {
        const button = todo.querySelector("button");
        button.addEventListener("click", e => {
            todo.remove();
        });
        button.style.visibility = "visible";
    });
});

todos.forEach(todo => {
    todo.addEventListener("mouseleave", e => {
        const button = todo.querySelector("button");
        button.style.visibility = "hidden";
    });
});

for (let i = 0; i < todosCheckbox.length; i++) {
    todosCheckbox[i].addEventListener("change", e => {
        if (todosCheckbox[i].checked) {
            todosTitle[i].innerHTML = `<del>${todosTitle[i].innerText}</del>`;
            todosTitle[i].style.color = "var(--font-color-sdr)";
        } else {
            todosTitle[i].innerHTML = `${todosTitle[i].innerText}`;
            todosTitle[i].style.color = "var(--font-color-prm)";
        }
    });
}
