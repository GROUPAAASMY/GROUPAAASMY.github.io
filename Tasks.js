const filter = document.getElementById('filter');
const taskList = document.getElementById('taskList');

// Updates the numbers and the progress bar
function updateCount(){
  const total = document.querySelectorAll('.task').length;
  const done = document.querySelectorAll('.task input:checked').length;
  const percent = Math.round((done / total) * 100);
  document.getElementById('doneCount').textContent = done;
  document.getElementById('totalCount').textContent = total;
  document.getElementById('percent').textContent = percent + '%';
  document.getElementById('barFill').style.width = percent + '%';
}

// Shows only the tasks that match the dropdown
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

// When a checkbox is clicked, add or remove the 'completed' class
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

// SWAP: click Swap on one task, then Swap on a second task to trade owners
const swapHint = document.getElementById('swapHint');
let firstTask = null;

function swapOwners(a, b){
  const badgeA = a.querySelector('.badge');
  const badgeB = b.querySelector('.badge');
  // swap the owner initials
  const ownerA = a.dataset.owner;
  a.dataset.owner = b.dataset.owner;
  b.dataset.owner = ownerA;
  // swap the badge text and colour
  const textA = badgeA.textContent;
  const colourA = badgeA.className;
  badgeA.textContent = badgeB.textContent;
  badgeA.className = badgeB.className;
  badgeB.textContent = textA;
  badgeB.className = colourA;
}

function clickSwap(task){
  if(firstTask === null){
    // first click: remember this task
    firstTask = task;
    task.classList.add('swap-selected');
    swapHint.hidden = false;
  }else{
    // second click on a different task: swap, then reset
    if(firstTask !== task){
      swapOwners(firstTask, task);
    }
    firstTask.classList.remove('swap-selected');
    firstTask = null;
    swapHint.hidden = true;
    showTasks();
  }
}

document.querySelectorAll('.swap-btn').forEach(button => {
  button.addEventListener('click', () => {
    clickSwap(button.closest('.task'));
  });
});

// Adds a new task when the form is submitted
document.getElementById('addForm').addEventListener('submit', event => {
  event.preventDefault();
  const input = document.getElementById('newTask');
  if(input.value.trim() === ''){
    return;
  }
  const task = document.createElement('div');
  task.className = 'task';
  task.dataset.owner = 'YO';
  task.innerHTML = '<input type="checkbox"><div><h4></h4><small>Anytime today</small></div><button type="button" class="swap-btn">Swap</button><span class="badge red">YO</span>';
  task.querySelector('h4').textContent = input.value;
  task.querySelector('.swap-btn').addEventListener('click', () => {
    clickSwap(task);
  });
  task.querySelector('input').addEventListener('change', () => {
    task.classList.toggle('completed');
    updateCount();
    showTasks();
  });
  taskList.appendChild(task);
  input.value = '';
  updateCount();
});
