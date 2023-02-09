const taskInput = document.getElementById("new-task");
const addButton = document.getElementById("bouton");
const incomplete = document.getElementById("incomplete-tasks");
const completed = document.getElementById("completed-tasks");


// dueTime
const daysDifference = ()  =>{  
  //define two variables and fetch the input from HTML form  
  let dateI1 = document.getElementById("dateInput1").value;  
  let dateI2 = document.getElementById("dateInput2").value;  

 //define two date object variables to store the date values  
  let date1 = new Date(dateI1);  
  let date2 = new Date(dateI2);  

 //calculate time difference  
  let time_difference = date2.getTime() - date1.getTime();  

  //calculate days difference by dividing total milliseconds in a day  
  let result = time_difference / (1000 * 60 * 60 * 24);  

  return document.getElementById("result").innerHTML =    
  result + " days to deadline  ";  
} 



//New Task List Item
const createNewTaskElement = (taskString) => {
  //Create List Item
  const listItem = document.createElement("li");

  //input (checkbox)
  const checkBox = document.createElement("input"); // checkbox

  //label
  const label = document.createElement("label");
  //input (text)
  const editInput = document.createElement("input"); // text
  // add dueDate
  const insertDue = document.getElementById("result");
  //button.edit
  const editButton = document.createElement("button");
  //button.delete
  const deleteButton = document.createElement("button");

  //Each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  insertDue.className = "resultats";
  
  label.innerText = taskString;


  // each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  label.appendChild(insertDue);

  return listItem;
}

// Add a new task
const addTask = () => {
  console.log("Add task...");
  //Create a new list item with the text from #new-task:
  const listItem = createNewTaskElement(taskInput.value);
  //Append listItem to incomplete
  incomplete.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);  
  
  taskInput.value = "";   
}

// Edit an existing task
const editTask = () => {
  console.log("Edit Task...");
  
  const listItem = this.parentNode;
  
  const editInput = listItem.querySelector("input[type=text]")
  const label = listItem.querySelector("label");
  
  const containsClass = listItem.classList.contains("editMode");
    //if the class of the parent is .editMode 
  if(containsClass) {
      //switch from .editMode 
      //Make label text become the input's value
    label.innerText = editInput.value;
  } else {
      //Switch to .editMode
      //input value becomes the label's text
    editInput.value = label.innerText;
  }
  
    // Toggle .editMode on the parent
  listItem.classList.toggle("editMode");
 
}


// Delete an existing task
const deleteTask = function() {
  console.log("Delete task...");
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  
  //Remove the parent list item from the ul
  ul.removeChild(listItem);
}

// Mark a task as complete 
const taskCompleted = function() {
  console.log("Task complete...");
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completed.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

// Mark a task as incomplete
const taskIncomplete = function() {
  console.log("Task Incomplete...");
  // When checkbox is unchecked
  // Append the task list item #incomplete-tasks
  const listItem = this.parentNode;
  incomplete.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");
  
  //bind editTask to edit button
  editButton.onclick = editTask;
  
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

// Set the click handler to the addTask function
//addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


// Cycle over the incompleteTaskHolder ul list items
for(var i = 0; i <  incomplete.children.length; i++) {
    // bind events to list item's children (taskCompleted)
  bindTaskEvents(incomplete.children[i], taskCompleted);
}
// Cycle over the completeTaskHolder ul list items
for(var i = 0; i <  completed.children.length; i++) {
    // bind events to list item's children (taskIncompleted)
  bindTaskEvents(completed.children[i], taskIncomplete); 

}




