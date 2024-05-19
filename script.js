const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
    let lis = listContainer.querySelectorAll("li");
    lis.forEach(addEditListener);
}

function clearAll() {
    listContainer.innerHTML = "";
    saveData();
}
function addEditListener(li) {
    li.addEventListener("dblclick", function() {
        let currentText = li.childNodes[0].nodeValue;
        let input = document.createElement("input");
        input.type = "text";
        input.value = currentText;
        li.innerHTML = "";
        li.appendChild(input);
        input.focus();

        input.addEventListener("blur", function() {
            li.innerHTML = input.value;
            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);
            addEditListener(li);
            saveData();
        });

        input.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                li.innerHTML = input.value;
                let span = document.createElement("span");
                span.innerHTML = "\u00d7";
                li.appendChild(span);
                addEditListener(li);
                saveData();
            }
        });
    });
}


showList();
