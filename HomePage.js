document.querySelectorAll('.task input').forEach(item => {
  item.addEventListener('change', () => {
    const = task = item.closest('.task');
    if(item.checked){
      task.classList.add('completed');
    }else{
      task.classList.remove('completed');
    }
  });
});

