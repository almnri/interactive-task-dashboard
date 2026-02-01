const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const filterButtons = document.querySelectorAll(".filters button");

let tasks = [];

function updateStats() {
  totalTasks.textContent = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  completedTasks.textContent = completed;
  pendingTasks.textContent = tasks.length - completed;
}

function renderTasks(filter = "all") {
  taskList.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <span>${task.text}</span>
      <button>✓</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks(filter);
      updateStats();
    });

    taskList.appendChild(li);
  });
}

addTaskBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  taskInput.value = "";

  renderTasks();
  updateStats();
});

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");
    renderTasks(filter);
  });
});
