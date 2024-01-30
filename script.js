const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedListContainer = document.getElementById("list-container-completed");
const completedCount = document.getElementById("completed-count");
const totalCount = document.getElementById("total-count");

function addTask() {
    if (inputBox.value === '') {
        alert("Please write something!");
    } else {
        let li = createListItem(inputBox.value);
        listContainer.appendChild(li);
        updateCounters();
        saveData();
    }
    inputBox.value = '';
}

function createListItem(text) {
    let li = document.createElement("li");
    li.innerHTML = text;
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // o X para remover os elementos
    li.appendChild(span);
    li.onclick = function() { toggleTask(this); };
    return li;
}

function toggleTask(li) {
    if (li.parentElement.id === "list-container") {
        completedListContainer.appendChild(li);
    } else {
        listContainer.appendChild(li);
        li.classList.remove("completed");
    }
    updateCounters();
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    updateCounters();
    saveData();
}, false);

completedListContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.remove("completed");
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveData();
    updateCounters();
}, false);

function updateCounters() {
    let completedTasks = completedListContainer.children.length;
    let totalTasks = listContainer.children.length + completedTasks;
    completedCount.innerText = completedTasks;
    totalCount.innerText = totalTasks;
}

function saveData() {
    localStorage.setItem("todoList", listContainer.innerHTML);
    localStorage.setItem("completedList", completedListContainer.innerHTML);
}

function attachEventListeners(list) {
    Array.from(list.children).forEach(li => {
        li.addEventListener("click", function(e){
            if(e.target.tagName === "LI"){
                // Modify to handle moving between lists
                toggleTask(e.target);
            } else if (e.target.tagName === "SPAN"){
                e.target.parentElement.remove();
                saveData();
            }
        });
    });
}

function applyCompletedClass() {
    Array.from(completedListContainer.children).forEach(li => {
        li.classList.add("completed");
    });
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("todoList");
    completedListContainer.innerHTML = localStorage.getItem("completedList");
    updateCounters();
    attachEventListeners(listContainer);
    attachEventListeners(completedListContainer);
    applyCompletedClass();
}
showList();