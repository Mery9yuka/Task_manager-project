const form = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', addTask);

function addTask(event) {
  event.preventDefault();
  const taskName = taskInput.value.trim();
  if (taskName === '') return;
  
  const task = { name: taskName };
  
  fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
  .then(response => response.json())
  .then(data => {
    taskList.appendChild(createTaskElement(data));
    taskInput.value = '';
  })
  .catch(error => console.error('Error adding task:', error));
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.name}</span>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    return li;
  }
  
  function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
      const taskElement = document.querySelector(`li[data-task-id="${taskId}"]`);
      if (taskElement) taskElement.remove();
    })
    .catch(error => console.error('Error deleting task:', error));
  }
  
  // Fetch initial tasks
  fetch('/api/tasks')
    .then(response => response.json())
    .then(tasks => {
      tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
      });
    })
    .catch(error => console.error('Error fetching tasks:', error));
