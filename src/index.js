document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('task-input');
  const priorityInput = document.getElementById('priority-input');
  const dueDateInput = document.getElementById('due-date-input');
  const taskForm = document.getElementById('task-form');
  const taskList = document.getElementById('task-list');
  const sortBtn = document.getElementById('sort-btn');

  let tasks = [];
  let sortOrder = 'asc'; // ascending order by default

  // Function to render tasks
  const renderTasks = () => {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.className = task.priority;
      li.innerHTML = `
        <span>${task.name} - ${task.priority} priority - Due: ${task.dueDate}</span>
        <button onclick="deleteTask(${index})">Delete</button>
        <button onclick="editTask(${index})">Edit</button>
      `;
      taskList.appendChild(li);
    });
  };

  // Add task with preventDefault to stop form submission
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevents form from reloading the page

    const task = {
      name: taskInput.value,
      priority: priorityInput.value,
      dueDate: dueDateInput.value
    };
    tasks.push(task);
    renderTasks();

    // Clear input fields
    taskInput.value = '';
    dueDateInput.value = '';
  });

  // Function to delete task
  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
  };

  // Function to edit task
  window.editTask = (index) => {
    const task = tasks[index];
    taskInput.value = task.name;
    priorityInput.value = task.priority;
    dueDateInput.value = task.dueDate;
    
    // Remove the task from the list and let the user add the edited task
    tasks.splice(index, 1);
    renderTasks();
  };

  // Function to sort tasks by priority
  sortBtn.addEventListener('click', () => {
    tasks.sort((a, b) => {
      const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
      return sortOrder === 'asc' 
        ? priorityOrder[a.priority] - priorityOrder[b.priority] 
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    
    // Toggle sort order for the next click
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    renderTasks();
  });
});