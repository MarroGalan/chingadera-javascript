document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('new-task');
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskList = document.getElementById('task-list');

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
          addTask();
      }
  });

  function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === '') {
          return;
      }

      const newTask = {
          id: Date.now(),
          text: taskText
      };

      fetch('http://localhost:3000/tarea', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newTask)
      })
      .then(response => response.json())
      .then(task => {
          addTaskToList(task);
      });

      taskInput.value = '';
      taskInput.focus();
  }

  function addTaskToList(task) {
      const taskListItem = document.createElement('li');
      taskListItem.className = 'list-item';
      taskListItem.setAttribute('data-id', task.id);

      const taskContent = document.createElement('span');
      taskContent.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete';
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', () => {
          deleteTask(task.id);
      });

      taskListItem.appendChild(taskContent);
      taskListItem.appendChild(deleteBtn);

      taskList.appendChild(taskListItem);
  }

  function deleteTask(taskId) {
      fetch(`http://localhost:3000/tarea/${taskId}`, {
          method: 'DELETE'
      })
      .then(() => {
          const taskListItem = document.querySelector(`li[data-id='${taskId}']`);
          if (taskListItem) {
              taskList.removeChild(taskListItem);
          }
      });
  }

  function loadTasks() {
      fetch('http://localhost:3000/tareas')
      .then(response => response.json())
      .then(tasks => {
          tasks.forEach(task => addTaskToList(task));
      });
  }

  loadTasks();
});