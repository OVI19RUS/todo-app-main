// Selectors
const todoInput = document.querySelector('#todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
moon.addEventListener('click', goingDark);
sun.addEventListener('click', goingLight)

//Functions

function addTodo(event){
    //Prevent form from refreshing
    event.preventDefault();
    if (todoInput.value == ''){
        alert('Error!')
    }
    else{
        const todoDiv = document.createElement('div');
    todoDiv.classList.add('draggable');
    todoDiv.setAttribute('draggable', 'true');
    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    todoDiv.innerHTML = '<img src="images/icon-check.svg"/>';
    todoDiv.appendChild(completedButton);
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add todo to local storage
    saveLocalTodos(todoInput.value);
    //Delete button
    const deletedButton = document.createElement('button');
    deletedButton.innerHTML = '<img src="images/icon-cross.svg"/>';
    deletedButton.classList.add('delete-btn');
    todoDiv.appendChild(deletedButton);
    //Append to list
    todoList.appendChild(todoDiv);
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
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
        todo.remove();
        })
    }

    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
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
    }
});
}

function saveLocalTodos(todo){
    //Check - do I already have thing in there?
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    //Check - do I already have thing in there?
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('draggable');
        todoDiv.setAttribute('draggable', 'true');
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<img src="images/icon-check.svg"/>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Delete button
        const deletedButton = document.createElement('button');
        deletedButton.innerHTML = '<img src="images/icon-cross.svg"/>';
        deletedButton.classList.add('delete-btn');
        todoDiv.appendChild(deletedButton);
        //Append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    //Check - do I already have thing in there?
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[1].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function goingDark(){
    moon.style.display = 'none';
    sun.style.display = 'block';
    document.querySelector('header').style.backgroundImage = 'url(images/bg-desktop-dark.jpg)'
    document.body.className = 'Dark'; 
    document.querySelector('input').className = 'Dark';
    document.querySelector('button').className = 'Dark';
}

function goingLight(){
    sun.style.display = 'none';
    moon.style.display = 'block';
    document.querySelector('header').style.backgroundImage = 'url(images/bg-desktop-light.jpg)'
    document.body.classList.remove('Dark');
    document.querySelector('input').classList.remove('Dark');
    document.querySelector('button').classList.remove('Dark');
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