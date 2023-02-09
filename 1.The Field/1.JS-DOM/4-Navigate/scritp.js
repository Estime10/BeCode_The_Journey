//Define lastChild
const ol  = document.querySelector("ol");
// console.log(ol);
// console.table(ol);


// const lastChildOl = ol.lastChild;
// console.table(lastChildOl)

const lastChildOl = ol.lastElementChild;
// console.log(lastChildOl.innerHTML);

//Move the lastElementChild
ol.insertBefore(lastChildOl, ol.children[0]);

// //Move H2 title
const main = document.querySelector("main");
// // console.log(main);

const secondRow = main.children[1];
// console.log(secondRow);
const thirdRow = main.lastElementChild;
// console.log(thirdRow);

const divThirdRow = thirdRow.firstElementChild;

const secondTitle = document.querySelector("div > h2")
// console.log(thirdTitle);
const thirdTitle = secondRow.firstElementChild;
// console.log(secondTitle);

//switch titles
secondRow.insertBefore(secondTitle, secondRow.children[0]);
divThirdRow.insertBefore(thirdTitle, divThirdRow.children[0]);

main.removeChild(thirdRow)


