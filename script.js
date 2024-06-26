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
  
      const taskListItem = document.createElement('li');
      taskListItem.className = 'list-item';
  
      const taskContent = document.createElement('span');
      taskContent.textContent = taskText;
  
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete';
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskListItem);
      });
  
      taskListItem.appendChild(taskContent);
      taskListItem.appendChild(deleteBtn);
  
      taskList.appendChild(taskListItem);
  
      taskInput.value = '';
      taskInput.focus();
    }
  });