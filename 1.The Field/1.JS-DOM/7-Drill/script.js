
//1-childNode list
const childNode = document.querySelector("ul")
// console.log(childNode)
const childNodes = childNode.childNodes
// console.log(childNodes)
const list = document.querySelectorAll("li")
// console.log(li)

//2-Move fast n furious on top of that list
const fastFurious = childNode.children[5];
// console.log(fastFurious)
childNode.insertBefore(fastFurious, childNode.children[0]);

//3-Add class .important to fastFurious conts
fastFurious.classList.add("important")

//4-Create a new div before the list
const div = document.createElement("div")
// console.log(div);
//adding div before the list
document.body.insertBefore(div, document.body.children[1])
//adding select div into div
const select = document.createElement("select")
div.append(select)
//adding two divs into select div
const option1 = document.createElement("option")
option1.innerHTML = "normal franchises"
// console.log(option1)
const option2 = document.createElement("option")
option2.innerHTML = "important franchises"
// console.log(option2)
select.append(option1);
select.append(option2)

//5-Class important using toggle
const notfavorite = element => {
    if(!element.classList.contains("important")) {
            element.style.visibility = "hidden";
        }
    };

const favorite = element => {
    if(!element.classList.contains("normal")) {
        element.style.visibility = "visible";
    }
};
const hideOrSeek = () => {
    for(li of childNode.children) {
        if(select.selectedIndex === 0) {
            favorite(li);
        }else if (select.selectedIndex === 1) {
            notfavorite(li);
        }
        }
    };
    select.addEventListener("change", hideOrSeek);



//6-click on list stuck at showing not working the way i want to work just showing the full list
//  const fastNFurious = "Fast and Furious"
//  console.log(fastNFurious)
// fastNFurious.addEventListener("click", () =>{
//     if(fastNFurious.textContent === (fastNFurious.textContent)){
//         alert("The most important franchise ever")
//     }else {
//          alert(childNodes.textContent)
//     }
// });
// SECOND TRY still didnt work 
// childNode.addEventListener('click', () => {
//     if (childNode.innerText ===  fastNFurious) {
//         alert(`The most important franchise ever, the story of DOM(inic) Toretto's family. It's not about car, it's about family`)
//     }
//     else {
//         alert(childNode.innerText)
//     }
// })
//THIRD TRY now it works had to create a li const (queryselectorAll)
list.forEach(function (film) {
    film.addEventListener("click", () => {
      alert(film.textContent);
  
      if (film.textContent === "Fast and Furious") {
        alert(
          "The most important franchise ever, the story of DOM(inic) Toretto's family. It's not about car, it's about family."
        );
      }
    });
  });


//7-duplicate and randomize the list on key pressed ( r for random ) ( d for duplicate) still need to do it 

const randomList = document.querySelectorAll("li")
// // console.log(randomList)
// // const randomize =  Math.floor(Math.random() *childNodes.length)

// const shuffle = randomList
// console.log(shuffle)

// document.body.addEventListener("keyup", (shuffle) => {
//     console.log(shuffle)
// let randomize = randomize =  Math.floor(Math.random() *childNodes.length)
// console.log(randomize)
// })



