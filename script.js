const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

function addTodo() {
  const task = todoInput.value.trim();
  if (!task) return;

  const li = document.createElement('li');
  li.textContent = task;

  // Toggle completed on click
  li.addEventListener('click', () => {
    li.classList.toggle('completed');
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
  todoInput.value = '';
}
