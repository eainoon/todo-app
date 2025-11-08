const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks
document.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTask(taskText);
  saveTask(taskText);
  taskInput.value = "";
}

function createTask(text) {
  const li = document.createElement("li");
  li.textContent = text;

  // Done toggle
  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveAllTasks();
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.textContent = "×";
  delBtn.classList.add("delete");
  delBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveAllTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    createTask(task.text);
    const li = taskList.lastElementChild;
    if (task.done) li.classList.add("done");
  });
}

function saveAllTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
