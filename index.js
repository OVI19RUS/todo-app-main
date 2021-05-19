// Selectors
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');
let todoid = '0';
const todoCount = document.getElementById('todo-count');
const all = document.querySelectorAll('.all')

// Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
for (i = 0; i < all.length; i++) {
all[i].addEventListener('click', filterTodo);
all[i].addEventListener('click', colorChange);}
moon.addEventListener('click', goingDark);
sun.addEventListener('click', goingLight);

//Functions

function addTodo(event){
    //Prevent form from refreshing
    event.preventDefault();
    if (todoInput.value == ''){
        alert('Buddy, try another time!')
    }
    else{
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('draggable');
    todoDiv.setAttribute('draggable', 'true');
    todoDiv.setAttribute('id', 'todo_' + todoid);
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.classList.add('btn');
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Delete button
    const deletedButton = document.createElement('button');
    deletedButton.classList.add('delete-btn');
    todoDiv.appendChild(deletedButton);
    //Append to list
    todoList.appendChild(todoDiv);
    todoid++
    totalMsg(todoid);
    //Clear Todo Input value
    todoInput.value = '';
    }
}

function deleteCheck(e){
    const item = e.target;
    //Delete todo
    if (item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        todoid--;
        todo.addEventListener('transitionend', function(){
        todo.remove();
        })
    }

    if (item.classList[0] === 'btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        item.classList.toggle('check');
        console.log(todo);
        if(todo.classList.contains('completed')){
            todoid--;
            totalMsg(todoid);
    }else{  todoid++;
            totalMsg(todoid);
        }
    }
    if(todoid === 0){
        totalMsg(todoid)
    }else{
        totalMsg(todoid);
    }
}

function filterTodo (e){
const todos = todoList.childNodes;
todos.forEach(function(todo){
    switch (e.target.value) {
        case 'all':
            todo.style.display = 'flex';
        break;
        case 'completed':
        if(todo.classList.contains('completed')){
            todo.style.display = 'flex';
        }else{
            todo.style.display = 'none';
        }
        break;
        case 'active':
        if(!todo.classList.contains('completed')){
            todo.style.display = 'flex';
        }else{
            todo.style.display = 'none';
        }
        break;
        case "clear":
        x = document.querySelectorAll(".completed");
        for (i = x.length - 1; i >= 0; i--) {
          x[i].remove();
        }
    }
});
}

function colorChange (e){
    for (i = 0; i < all.length; i++) {
        if (all[i].classList.contains("active")) {
            all[i].classList.remove("active");
        }
      }
      event.target.classList.add("active");
}


function goingDark(){
    const body = document.querySelector('body');
    moon.style.display = 'none';
    sun.style.display = 'block';
    document.querySelector('header').classList.add('Dark');
    body.classList.add('Dark');
    document.querySelectorAll('btn').classList.add('Dark');
}

function goingLight(){
    const body = document.querySelector('body');
    sun.style.display = 'none';
    moon.style.display = 'block';
    document.querySelector('header').classList.remove('Dark');
    body.classList.remove('Dark');
    document.querySelectorAll('btn').classList.remove('Dark');
}

todoList.addEventListener('dragstart', (evt) =>{
    evt.target.classList.add('over')
})

todoList.addEventListener('dragend', (evt) =>{
    evt.target.classList.remove('over')
})

const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
    
    const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;
    
    return nextElement;
  };

todoList.addEventListener('dragover', (evt) => {
    evt.preventDefault();
    const activeElement = todoList.querySelector('.over');
    const currentElement = evt.target;
    const isMoveable = activeElement !== currentElement &&
    currentElement.classList.contains('draggable');
    if (!isMoveable) {
    return;
  }
  const nextElement = getNextElement(evt.clientY, currentElement);
  
  if (
    nextElement && 
    activeElement === nextElement.previousElementSibling ||
    activeElement === nextElement
  ) {
    return;
  }
   todoList.insertBefore(activeElement, nextElement);
});

function totalMsg(todoid){
    if(todoid === 1){
        return todoCount.innerHTML = '<b>' + todoid + '</b> item left';
    }else{
        return todoCount.innerHTML = '<b>' + todoid + '</b> items left';
    }
}
