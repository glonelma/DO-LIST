// Load tasks from localStorage
window.onload = function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
    updateTaskCount();
};

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(task => {
        tasks.push({
            text: task.textContent.trim(),
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create a task element
function createTaskElement(text, completed = false) {
    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.textContent = text;
    if (completed) li.classList.add('completed');

    // Add event listeners
    li.addEventListener('click', function () {
        li.classList.toggle('completed');
        saveTasks();
        updateTaskCount();
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function (e) {
        e.stopPropagation();
        taskList.removeChild(li);
        saveTasks();
        updateTaskCount();
    });

    li.appendChild(deleteButton);
    taskList.appendChild(li);
    updateTaskCount();
}

// Update task count
function updateTaskCount() {
    const tasksLeft = document.querySelectorAll('li:not(.completed)').length;
    document.getElementById('taskCount').textContent = `Tasks Left: ${tasksLeft}`;
}

// Modify the addTask function
document.getElementById('addTaskBtn').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const dueDateInput = document.getElementById('dueDateInput');
    const dueDate = dueDateInput.value;

    if (taskText !== "") {
        createTaskElement(taskText);
        saveTasks();
        taskInput.value = "";
        dueDateInput.value = ""; // Clear date input
    } else {
        alert("Please enter a task!");
    }
});

// Filter tasks
document.getElementById('all').addEventListener('click', function () {
    showAllTasks();
});
document.getElementById('active').addEventListener('click', function () {
    filterTasks(false);
});
document.getElementById('completed').addEventListener('click', function () {
    filterTasks(true);
});

function showAllTasks() {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(task => task.style.display = 'block');
}

function filterTasks(completed) {
    const tasks = document.querySelectorAll('li');
    tasks.forEach(task => {
        if (task.classList.contains('completed') === completed) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Clear completed tasks
document.getElementById('clearCompletedBtn').addEventListener('click', function () {
    const tasks = document.querySelectorAll('li.completed');
    tasks.forEach(task => task.remove());
    saveTasks();
    updateTaskCount();
});

