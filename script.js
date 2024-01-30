const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("Please write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value; // Adicionar o texto ao elemento
        listContainer.appendChild(li); // Adicionar o elemento à lista
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        saveData();
    }
    inputBox.value = ''; // Apagar o texto da barra
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("completed");
    } else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
    saveData();
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showList();