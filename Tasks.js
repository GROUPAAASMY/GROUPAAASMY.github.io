const filter = document.getElementById('filter');
const taskList = document.getElementById('taskList');


function updateCount(){
  const total = document.querySelectorAll('.task').length;
  const done = document.querySelectorAll('.task input:checked').length;
  const percent = Math.round((done / total) * 100);
  document.getElementById('doneCount').textContent = done;
  document.getElementById('totalCount').textContent = total;
  document.getElementById('percent').textContent = percent + '%';
  document.getElementById('barFill').style.width = percent + '%';
}


function showTasks(){
  document.querySelectorAll('.task').forEach(task => {
    const checked = task.querySelector('input').checked;
    const mine = task.dataset.owner === 'YO';
    if(filter.value === 'mine' && !mine){
      task.style.display = 'none';
    }else if(filter.value === 'done' && !checked){
      task.style.display = 'none';
    }else{
      task.style.display = 'flex';
    }
  });
}


document.querySelectorAll('.task input').forEach(item => {
  item.addEventListener('change', () => {
    const task = item.closest('.task');
    if(item.checked){
      task.classList.add('completed');
    }else{
      task.classList.remove('completed');
    }
    updateCount();
    showTasks();
  });
});

filter.addEventListener('change', showTasks);


document.getElementById('addForm').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.getElementById('newTask');
  if(input.value.trim() === ''){
    return;
  }
  const task = document.createElement('div');
  task.className = 'task';
  task.dataset.owner = 'YO';
  task.innerHTML = '<input type="checkbox"><div><h4></h4><small>Anytime today</small></div><span class="badge red">YO</span>';
  task.querySelector('h4').textContent = input.value;
  task.querySelector('input').addEventListener('change', () => {
    task.classList.toggle('completed');
    updateCount();
    showTasks();
  });
  taskList.appendChild(task);
  input.value = '';
  updateCount();
});
