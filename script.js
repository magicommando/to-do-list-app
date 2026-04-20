const clearAllBtn = document.getElementById('clear-all');
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = [];
form.addEventListener('submit', function(event) {
    event.preventDefault();
    

    const text = input.value.trim();
    if (text === "") return;

    addTask(text);
    input.value = "";
});
clearAllBtn.addEventListener('click', clearAllTasks);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text === "") return;
    addTask(text);
    input.value = "";
});

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');

        // Create text span
        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;

        if (task.completed) {
            textSpan.classList.add('completed');
        }

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add('delete-btn');

        // When delete button is clicked
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        // When text is clicked, toggle completion
        textSpan.addEventListener('click', () => toggleTask(task.id));

        // Add elements to li
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);

        // Add li to list
        list.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}   saveTasks();
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}



function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
}


function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}
loadTasks();
function clearAllTasks() {
    tasks = [];
    saveTasks();   // keep storage in sync
    renderTasks(); // update UI
}

loadTasks();




