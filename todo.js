//Selected Elements
const cardBody1 = document.querySelectorAll(".card-body")[0]
const cardBody2 = document.querySelectorAll(".card-body")[1]
const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoFilter = document.querySelector("#filter")
const listGroup = document.querySelector(".list-group")
const clearTodos = document.querySelector("#clear-todos")


addEventListener()

//Event Listeners
function addEventListener(){
    todoForm.addEventListener("submit" , addTodo)
    document.addEventListener("DOMContentLoaded" , loadAllTodosToUI)
    cardBody2.addEventListener("click" , deleteTodo)
    cardBody2.addEventListener("click" , completeTodo)
    todoFilter.addEventListener("keyup" , filterTodos)
    clearTodos.addEventListener("click" , clearAllTodos)
}

//filter of the to do list
function filterTodos(e){
    const filterValue = e.target.value.toLowerCase()
    const listItem = document.querySelectorAll(".list-group-item")

    listItem.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase()
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style" , "display:none !important")
        }else{
            listItem.setAttribute("style" , "display:block;")
        }
    })
}

//Delete to do element
function deleteTodo(e){
     if(e.target.className === "fa fa-remove"){
         e.target.parentElement.parentElement.remove()
         deleteTodoLocalStorage(e.target.parentElement.parentElement.textContent)
         showMessage("Deleted successfully." , "success")
    }
}

function completeTodo(e){
    if(e.target.className === "fas fa-check-square"){
        e.target.parentElement.parentElement.style.textDecoration = "line-through"
   }
}

//Delete to do element from the local storage
function deleteTodoLocalStorage(deletetodo){
    let todos = getTodosFromStorage()

    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index, 1)
        }
    })
    localStorage.setItem("todos" , JSON.stringify(todos))
}

//add to do list to page when the page is refreshed
function loadAllTodosToUI(){
    let todos = getTodosFromStorage()
    todos.forEach(function(todo) {
        addTodoUI(todo)
    });
}

//Created new to do 
function addTodo(e){
    
    const newTodo = todoInput.value.trim()
    const todos = getTodosFromStorage()
        let flag = 0;
        todos.forEach(function(todo){
            if(newTodo === todo){
                flag = 1;
                showMessage("Please, add new to do.","danger")
            }
        })
        if (newTodo === "") {
            showMessage("Fill in the empty places.","danger")
        }
        else if(flag ===0){
            addTodoUI(newTodo)
            addTodoLocalStorage(newTodo)
            showMessage("Added Successfully.", "success")
        }

    e.preventDefault()
}

//Get to do list from storage
function getTodosFromStorage(){
    let todos 
    if (localStorage.getItem("todos") === null) {
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    return todos
}

//Add to do list to the local storage.
function addTodoLocalStorage(newTodo){
    let todos = getTodosFromStorage()

    todos.push(newTodo)

    localStorage.setItem("todos" , JSON.stringify(todos))
    
}

// Add to do list to the UI
function addTodoUI(newTodo){
      // Todo list-item
      const listItem = document.createElement("li")
      listItem.className = "list-group-item d-flex"
      // Todo Link
      const todoLink = document.createElement("a")
      todoLink.href = "#"
      todoLink.className = "delete-item"
      todoLink.innerHTML = "<i class = 'fa fa-remove' ></i>"
      const completeLink = document.createElement("a")
      completeLink.href = "#"
      completeLink.className = "complete-link ml-auto mr-3"
      completeLink.innerHTML = "<i class='fas fa-check-square'></i>"
      //Todo link add to the todo list-item
      listItem.appendChild(document.createTextNode(newTodo))
      listItem.appendChild(completeLink)
      listItem.appendChild(todoLink)
      
      
      //New todo add to list group
      listGroup.appendChild(listItem)

      todoInput.value = ""
}

//Add alert message to the UI
function showMessage(message,type){
//     <div class="alert alert-primary" role="alert">
//   A simple primary alert—check it out!
//   </div>

    const todoMessage = document.createElement("div")

    todoMessage.className = `alert alert-${type}`
    todoMessage.role = "alert"
    todoMessage.textContent = `${message}`
    todoMessage.style.marginTop = "1rem"
    cardBody1.appendChild(todoMessage)

    setTimeout(function(){
        todoMessage.remove()
    },3000)

}

//Clear all to do list from UI and local storage.
function clearAllTodos(e){
    while(listGroup.firstElementChild != null){
        listGroup.firstElementChild.remove()
    }

    localStorage.removeItem("todos")
}