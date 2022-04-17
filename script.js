const cards = document.querySelector(".todo-cards")
const input = document.querySelector("input");
const button = document.querySelector("button");
const icons = document.querySelector(".card-icons");
const filter = document.querySelector(".filter");
console.log(cards.childNodes)

document.addEventListener('DOMContentLoaded', appendCard);
cards.addEventListener("click", removeCompleteCard);
filter.addEventListener("click", filterTodo);

function filterTodo(event) {

    const todos = cards.childNodes;
    console.log(todos)
    todos.forEach(function (todo) {
        console.log(todo)
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "complited":
                if (todo.classList.contains("complete-card")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncomplited":
                if (todo.classList.contains("complete-card")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    })
}

function removeCompleteCard(event) {
    const item = event.target;
    const todoCard = item.parentElement.parentElement
    if (item.classList[1] == "fa-trash") {
        const text = todoCard.children[0].innerText;
        removeLocalTodo(text);
        todoCard.remove()
    }
    else if (item.classList[1] == "fa-check") {
        todoCard.classList.toggle("complete-card")
    }
}

function createTodo() {
    // create card that shows the todo
    const card = document.createElement("div"); // container
    card.className = "card";
    const paragraph = document.createElement("p"); // paragraph that shows text
    const card_icons = document.createElement("div"); // div that contain icons
    card_icons.className = "card-icons";
    const tick_icon = document.createElement("i"); // tick icon
    tick_icon.className = "fa-solid fa-check"; 
    const trash_icon = document.createElement("i"); // trash icon
    trash_icon.className = "fa-solid fa-trash";
    
    // tune the card
    card.appendChild(paragraph);
    card_icons.appendChild(tick_icon);
    card_icons.appendChild(trash_icon);
    card.appendChild(card_icons);

    return card;
}

function saveLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));

    }
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// adding card 
button.addEventListener("click", addCard);

function addCard() {
    
    if (input.value != "") {
        saveLocalTodo(input.value);
        const todoCard = createTodo();
        todoCard.children[0].innerText = input.value;
        cards.appendChild(todoCard);
        input.value = "";
    }
}

function appendCard() {
    try {
        const todoList = JSON.parse(localStorage.getItem("todos"));

        todoList.forEach(item => {
            const todoCard = createTodo();
            todoCard.children[0].innerText = item;
            cards.appendChild(todoCard);
            // console.log(todoCard)
        })
        
    }
    catch {
        null
    }

}