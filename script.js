let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text" + (task.completed ? " completed-task" : "");
    span.onclick = () => toggleTask(index);

    const button = document.createElement("button");
    button.textContent = "Delete";
    button.className = "delete-btn";
    button.onclick = () => deleteTask(index);

    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);
  });

  document.getElementById("total").textContent = "Total: " + tasks.length;
  document.getElementById("completed").textContent =
    "Completed: " + tasks.filter(task => task.completed).length;
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (!text) return;

  tasks.push({
    text: text,
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

document.getElementById("taskInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

renderTasks();
