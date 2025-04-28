// Sample tasks data
const sampleTasks = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Finish project report", completed: true },
  { id: 3, text: "Call mom", completed: false },
  { id: 4, text: "Workout for 30 minutes", completed: false }
];

const taskList = document.getElementById("task-list");
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");

let tasks = [];

// Load sample tasks on page load
window.onload = () => {
  tasks = [...sampleTasks];
  renderTasks();
};

// Render tasks to the DOM
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;
    span.onclick = () => toggleTaskCompletion(task.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Add new task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  const newTask = {
    id: Date.now(),
    text,
    completed: false
  };
  tasks.push(newTask);
  taskInput.value = "";
  renderTasks();
}

// Toggle task completion
function toggleTaskCompletion(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") {
    addTask();
  }
});
