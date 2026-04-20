const clearAllBtn = document.getElementById('clear-all');
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = [];

// Add task on form submit
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const text = input.value.trim();
    if (text === "") return;

    addTask(text);
    input.value = "";
});

// Clear all tasks
clearAllBtn.addEventListener('click', clearAllTasks);

// Render tasks
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

        // Delete task
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        // Toggle completion
        textSpan.addEventListener('click', () => toggleTask(task.id));

        li.appendChild(textSpan);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}

// Toggle task complete
function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Save to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
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

// Load tasks on page start
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

// Clear all tasks
function clearAllTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
}

loadTasks();

