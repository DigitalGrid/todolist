//get elements
var add = document.getElementById("add"),
    addInput = document.getElementById("add-input"),
    addButton = document.getElementById("add-button"),
    todoActivities = document.getElementById("todo"),
    doneActivities = document.getElementById("done");

var todoList = new Todo();

//check if information is localy stored in the browser
if(localStorage.getItem("todoActivitiesStorage") !== null || localStorage.getItem("doneActivitiesStorage") !== null) {
  var todoListStr = localStorage.getItem("todoActivitiesStorage"),
      doneListStr = localStorage.getItem("doneActivitiesStorage");
      
  todoList.todoActivities = JSON.parse(todoListStr) || [];
  todoList.doneActivities = JSON.parse(doneListStr) || [];
  
  display("todoActivities");
  display("doneActivities");
}

addButton.addEventListener("click", function() {
  addE();
});

addInput.addEventListener("keypress", function(e) {
  var key = e.which || e.keyCode;
  if(key === 13) {
    addE();
  }
});

/*
* add new activity
*/
function addE() {
  todoList.add(addInput.value);
  localStorage.setItem("todoActivitiesStorage", JSON.stringify(todoList.todoActivities)); //localStorage todo
  addInput.value = "";
  display("todoActivities");
}

/*
* display list
* @param list - The list to display (todo or done)
*/
function display(list) {
  var len = todoList[list].length;
  
  while(window[list].childNodes.length > 2) {
    window[list].removeChild(window[list].lastChild); 
  }
  
  for(var i = 0; i < len; i++) {
    var listItem = document.createElement("li"); 
    listItem.className = "list-group-item";
    
    var itemName = document.createElement("div");
    itemName.className = "item-name";
    itemName.setAttribute("data-show-input", "false");
    itemName.id = list + i;
    itemName.innerText = todoList[list][i];
    
    var itemButtons = document.createElement("div");
    itemButtons.className = "pull-right item-buttons";
    
    if(list == "todoActivities") {
      var edit = document.createElement("span");
      edit.className = "glyphicon glyphicon-pencil";
      edit.addEventListener("click", function() {
        editE(this);  
      });
      var move = document.createElement("span");
      move.className = "glyphicon glyphicon-ok";
      move.addEventListener("click", function() {
        moveE(this);
      });
      itemButtons.appendChild(edit);
      itemButtons.appendChild(move);
    }
    var remove = document.createElement("span");
    remove.className = "glyphicon glyphicon-remove"
    remove.addEventListener("click", function() {
      removeE(this);
    });
    
    itemButtons.appendChild(remove);
    listItem.appendChild(itemName);
    listItem.appendChild(itemButtons);
    window[list].appendChild(listItem);    
  }
}

/*
* edit text in the todolist
* @param element - the element that was clicked
*/
function editE(element) {
  var itemName = element.parentNode.parentNode.firstChild;
  
  if(itemName.getAttribute("data-show-input") == "false") {
    var input = document.createElement("input"),
        temp = itemName.innerText;
    
    itemName.innerText = "";
    input.type = "text";
    input.className = "form-control";
    input.value = temp;
    itemName.appendChild(input);
    
    itemName.setAttribute("data-show-input", "true");
    element.classList.add("class", "blue");
  } else {
    var index = itemName.id.match(/\d+/)[0],
        inputValue = itemName.getElementsByTagName("input")[0].value;
    
    if(todoList.edit(index, inputValue) !== false) {
      localStorage.setItem("todoActivitiesStorage", JSON.stringify(todoList.todoActivities)); //localStorage todo
      itemName.innerText = inputValue;
      itemName.setAttribute("data-show-input", "false");
      element.classList.remove("class", "blue");
    }
  }
}

/*
* move item from todolist to donelist
* @param element - the element that was clicked
*/
function moveE(element) {
  var itemName = element.parentNode.parentNode.firstChild,
      index = itemName.id.match(/\d+/)[0];
  
  todoList.move(index);
  localStorage.setItem("todoActivitiesStorage", JSON.stringify(todoList.todoActivities)); //localStorage todo
  localStorage.setItem("doneActivitiesStorage", JSON.stringify(todoList.doneActivities)); //localStorage done
  display("todoActivities");
  display("doneActivities");
}


/*
* remove activity from list
* @param element - the element that was clicked
*/
function removeE(element) {
  var itemName = element.parentNode.parentNode.firstChild,
      index = itemName.id.match(/\d+/)[0],
      idName = itemName.id.replace(index,"");
  
  todoList.remove(index, idName);
  localStorage.setItem("todoActivitiesStorage", JSON.stringify(todoList.todoActivities)); //localStorage todo
  localStorage.setItem("doneActivitiesStorage", JSON.stringify(todoList.doneActivities)); //localStorage done
  display(idName);
}