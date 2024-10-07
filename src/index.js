document.addEventListener('DOMContentLoaded', function () {
  //INITIALIZE VARIABLES TO HOLD THE DIFFERENT GRAB SEQUENCES
  let tasks = []; // Initialize an empty array that will store user tasks
  const form = document.getElementById('task-form'); // grabs the form
  const inputTask = document.getElementById('task-input'); // grabs task input field
  const inputPriority = document.getElementById('priority-input'); // grabs priority input field
  const dateDue = document.getElementById('due-date-input'); // grabs due date input field

  // STEP 1
  // Add task with preventDefault to stop form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevents form from reloading the page
    
    // OBJECT HOLDING TASK KEY AND VALUES ENTERED BY THE USER
    const task = {
      name: inputTask.value,
      priority: inputPriority.value,
      dueDate: dateDue.value,
    };

    tasks.push(task);//ADDS A NEW TASK OBJECT TO END OF THE TASKS ARRAY
    renderTasks(); // CALLS RENDER TASK FUNCTION

    // Clear input fields
    inputTask.value = '';
    dateDue.value = '';
  });

  // STEP 2
  // This function grabs the task-list element and appends a list of tasks created by the user
  const taskList = document.getElementById('task-list'); // grabs unordered list

  const renderTasks = () => {
    taskList.innerHTML = ''; // Clear content from task list (ul)
    tasks.forEach((task, index) => {
      const li = document.createElement('li'); // Create new individual list item
      li.className = task.priority; // Set class for current task to 'priority'
      li.innerHTML = `
        <span>${task.name} - ${task.priority} priority - Due: ${task.dueDate}</span>
        <button class="delete-btn" data-index="${index}">Delete</button>
        <button onclick="editTask(${index})">Edit</button>
      `; // Create the task with name, priority, and due date; also add buttons for delete and edit
      taskList.appendChild(li); // Append the child <li> to parent <ul>
    });

    // Attach event listeners to all delete buttons
    document.querySelectorAll('.delete-btn').forEach((button) => {
      button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        deleteTask(index); // Call deleteTask with the index
      });
    });
  };

  // Function to delete task
  const deleteTask = (index) => {
    const taskList = document.getElementById('task-list'); // Grab the task list
    const taskItems = taskList.getElementsByTagName('li'); // Get all <li> elements
    if (taskItems[index]) {
      taskItems[index].remove(); // Remove the specific task from the DOM
    }
    tasks.splice(index, 1); // Remove the task from the array
  };

  // Function to edit task
  const editTask = (index) => {
    const task = tasks[index];
    inputTask.value = task.name;
    inputPriority.value = task.priority;
    dateDue.value = task.dueDate;

    // Remove the task from the list and let the user add the edited task
    tasks.splice(index, 1);
    renderTasks();
  };

  // Function to sort tasks by priority
  const sortBtn = document.getElementById('sort-btn'); // grabs sort button
  let sortOrder = 'asc'; // ascending order by default
  sortBtn.addEventListener('click', () => {
    tasks.sort((a, b) => {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      let comparison;

      if (sortOrder === 'asc') {
        comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else {
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return comparison;
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
