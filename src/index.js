document.addEventListener('DOMContentLoaded', function () {
  let tasks = []; // initialize an empty array that will store user tasks (move this declaration to the top)

  // STEP 1
  // Add task with preventDefault to stop form submission
  const taskForm = document.getElementById('task-form');//grabs the form
  const taskInput = document.getElementById('task-input');//grabs task input field
  const priorityInput = document.getElementById('priority-input');//grabs priority input field
  const dueDateInput = document.getElementById('due-date-input');//grabs due date input field
  
  taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevents form from reloading the page

    const task = {
      name: taskInput.value,
      priority: priorityInput.value,
      dueDate: dueDateInput.value
    };//OBJECT HOLDING TASK KEY AND VALUE PROPERTIES
    tasks.push(task);
    renderTasks();//CALLS RENDER TASK FUNCTION

    // Clear input fields
    taskInput.value = '';
    dueDateInput.value = '';
  });

  // STEP 2
  // This function grabs the task-list element and appends a list of tasks created by the user
  const taskList = document.getElementById('task-list');//grabs unordered list
  const renderTasks = () => {
    taskList.innerHTML = '';//clear content from task list (ul)
    tasks.forEach((task, index) => {
      const li = document.createElement('li');//create new individual list item
      li.className = task.priority;//set class for current task to 'priority'
      li.innerHTML = `
        <span>${task.name} - ${task.priority} priority - Due: ${task.dueDate}</span>
        <button onclick="deleteTask(${index})">Delete</button>
        <button onclick="editTask(${index})">Edit</button>
      `;//create the task with name, priority and due date also add two buttons one for delete and another for edit
      taskList.appendChild(li);//append the child <li> to parent <ul>
    });
  };

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
  const sortBtn = document.getElementById('sort-btn');//grabs sort button
  let sortOrder = 'asc'; // ascending order by default
  sortBtn.addEventListener('click', () => {
    tasks.sort((a, b) => {
      const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };
      return sortOrder === 'asc' 
        ? priorityOrder[a.priority] - priorityOrder[b.priority] 
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // Toggle sort order for the next click
    if (sortOrder === 'asc') {
      sortOrder = 'desc';
    } else {
      sortOrder = 'asc';
    }
    renderTasks();
  });
});
