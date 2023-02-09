//connect the body
const body = document.querySelector("body")
// console.log(body)
// connect to the button
const bouton = document.querySelector("button")
//  console.log(bouton)
// create list (ul)
const ul = document.createElement("ul")
body.appendChild(ul)
// console.log(ul)

 bouton.addEventListener("click", ()=> {
fetch("becode.json")
.then(response => response.json())
.then(data => {
    data.forEach(list =>{
        const li = document.createElement("li")
        ul.appendChild(li)
        li.textContent = list
    })
})
 })






                






