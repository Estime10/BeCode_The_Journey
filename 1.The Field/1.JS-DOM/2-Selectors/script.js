// show title
const title = document.getElementsByClassName("important");
    for( 
        const important of title
        ) {
            important.setAttribute("title", "");
        }
console.log(title);

// display: none
const selecting = document.querySelectorAll('img')
imglen = selecting.length

for(i=0; i<imglen; i++) {

if (selecting[i].classList == ('important')) {}
     else {
        selecting[i].style.display = "none";
     }
 }

//show classes
const txt = (element) => {
    return element.classList.length > 0;
};

const txts = document.querySelectorAll("p");
for(const paragraph of txts
    ){
        //showing classes
    if (txt(paragraph)) {
        console.log(paragraph.innerHTML);
        console.log(paragraph.classList.value)
        //Colors Random
    } else {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        paragraph.style.color = `rgb(${r}, ${g}, ${b})`;
    }
}