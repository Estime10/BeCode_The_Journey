// console.log("WARNING! in exactly five seconds something will explode");

// function theExplosion() {
//     // console.log("BOOM!");
//     alert("BOOM")
// }
// const button = document.createElement("button");
// button.textContent = "WARNING";
// button.addEventListener("click", () => {
//     //it will delay the event by 5 seconds
//    setTimeout(theExplosion, 5000); 
// });
// document.body.appendChild(button)


// let times = 0;
// function heyYou() {
//     console.log("hey! you! I called you " + times + " times!");
//     times++;

//     const nextCall =  Math.floor(Math.random() * 2000); //random till the function is called 
//     setTimeout(heyYou, nextCall);
// }

// let times = 0;
// function heyYou() {
//   console.log("Hey! You! I called you " + times + " times!");
//   times++;
// }

// setInterval(heyYou, 5000);

// let interval;
// let times = 0;

// function heyYou() {
//   console.log("Hey! You! I called you " + times + " times!");
//   times++;
// }

// buttonThreeSeconds = document.createElement("button");
// buttonThreeSeconds.textContent = "say hey every 3 seconds";
// buttonThreeSeconds.addEventListener("click", () => {
//   interval = setInterval(heyYou, 3000);
// });

// buttonStop = document.createElement("button");
// buttonStop.textContent = "Stop saying hey";
// buttonStop.addEventListener("click", () => {
//   // We must first check if there is an interval
//   if (interval != undefined) {
//     clearInterval(interval);
//   }
// });

// document.body.appendChild(buttonThreeSeconds);
// document.body.appendChild(buttonStop);



//exo 1 

// let str = 'Prout in your face'.split('');
// buttonProut = document.createElement("button");
// buttonProut.textContent = "SMELL IT";
// buttonProut.addEventListener("click", () => {
//     const prout = setInterval(() => {
//         document.write(str[0]);
//         str = str.slice(1);
        
//         if (!str.length) {
//           clearInterval(prout);
//         }
//       }, 500);;
//   });
// document.body.appendChild(buttonProut);

//exo 2 in the console

// let interval;
// let times = 0;

// function clock() {
//   console.log("you have been on the browser for" + times + "seconds")
//   times++;
// }

// buttonTimer = document.createElement("button");
// buttonTimer.textContent = "start counting";
// buttonTimer.addEventListener("click" , () => {
//   interval = setInterval(clock, 1000);


// function tellMe() {
//     console.log("PLUS ONE MINUTE");
//   }
//   setInterval(tellMe, 60000);
// });
// buttonStop = document.createElement("button");
// buttonStop.textContent = "stop counting";
// buttonStop.addEventListener("click", () => {
//     if(interval != undefined) {
//         clearInterval(interval);
//     }
// });

// document.body.appendChild(buttonTimer);
// document.body.appendChild(buttonStop);

// exo 2 in the browser 

// const newDiv = document.createElement("div")
// document.body.appendChild(newDiv)


// let interval;
// let times = 0;



// function clock() {
//   document.body.innerHTML = " "   
//   document.write("you have been on the browser for" + times + "seconds");
//   times++;
//   if(times == 60){
//     document.body.innerHTML = " "
//     document.write("PLUS ONE MINUTE")
//   }
//   if(times == 120){
//     document.body.innerHTML = " "
//     document.write("PLUS ONE MINUTE")
//   }
// // continue for other minutes

// }

// buttonTimeSpent = document.createElement("button");
// buttonTimeSpent.textContent = "start counting";

// buttonTimeSpent.addEventListener("click", () => {
  
//     interval = setInterval(clock, 100);
//   });


// exo 3
// select cursor
const cursor = document.querySelector('.cursor')
// select holes 3dots+[] = select array divs 
const holes = [...document.querySelectorAll('.hole')]
// select score 
const scoreEl = document.querySelector('.score span')
// define score (or time in other cases)
let score = 0


// define the function to run the random movements 
function run(){
    const i = Math.floor(Math.random() * holes.length)
    const hole = holes[i]
    let timer = null
// define a div for moles 
    const img = document.createElement('img')
    img.classList.add('mole')
    img.src = 'mole.png'
// listener in the images 
    img.addEventListener('click', () => {
        // define the raising of the score 
        score += 10
        scoreEl.textContent = score
        // img of whacked mole 
        img.src = 'mole-whacked.png'
        clearTimeout(timer)
        setTimeout(() => {
            hole.removeChild(img)
            run()
        }, 500)
    })

    hole.appendChild(img)
// set the timer to remove the random moles popping out 
    timer = setTimeout(() => {
        hole.removeChild(img)
        run()
    }, 1500)
}
run()
// define the movements of the hammer (top-left (css) / click up click down )
document.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})
document.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
document.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})









