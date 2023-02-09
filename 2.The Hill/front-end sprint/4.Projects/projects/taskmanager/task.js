const prompt = require('prompt-sync') ();

// menu

let tasks =["new task"]


menu()

function menu () {
    console.log('welcome to your task manager, Press:\n'
    ,'1. to see all your tasks\n'
    ,'2. to add a task\n'
    ,'3. to delete a task\n'
    ,'4. to mark a task as done\n'
    ,'5. to Exit the task\n')

    let select = prompt("Entrer a number from 1 to 5 " + ": number"  )

    if (select==1) {
        // show the new task
        seeall()
    }
    if (select==2) {
        // adds up a new task 
        add()
    }
    if (select==3) {
        //  deletes the last task
        del()
    }
    if (select==4) {
        // marks the task as done
        done()
    }
    if (select==5) {
        // exit the task menu
        exit()
    }
    if (select>5 ) {
        menu()
    }
}

// 1. Access to the menu

function seeall() {
    for (x=0; x<= tasks.length-1; x++)
    console.log('\n' , (x+1), tasks[x],'\n')

    

    menu()
}

// 2. Adding a task

function add() {
    // anwer a task name
    taskname = prompt("Task name" )

    tasks.push(taskname)
    console.log(taskname)
    
    menu()
}

// 3. Delete task

//shows the created array
//     console.log(tasks);

//    //delete the created array
//     while (tasks.length) {
//         tasks.pop();

//     }

//     console.log(tasks)

function del() {

var elementsSupprimes = tasks.splice(0,1)
console.log(tasks);
// show [restant]
console.log(elementsSupprimes);
// show [supprimé]

    menu()
}









// 4. Mark a task as Done

function done() {
    // asks the task name to mark as done
    doneName = prompt("task name")

tasks.push(doneName)

console.log(doneName + " DONE ");
    
    menu()
}

// 5. To Exit the file manager

function exit() {

}
    
