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

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);
    renderTasks();
}

function renderTasks() {
    list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', () => toggleTask(task.id));

        list.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );

    renderTasks();
}

