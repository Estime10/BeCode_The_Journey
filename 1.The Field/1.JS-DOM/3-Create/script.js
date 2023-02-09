//create section

//sections
const student1 = document.createElement("section");
const student2 = document.createElement("section");
const student3 = document.createElement("section");
//  random color section
 const r1 = Math.floor(Math.random() *255);
 const g1 = Math.floor(Math.random() *255);
 const b1 = Math.floor(Math.random() *255);

 const r2 = Math.floor(Math.random() *255);
 const g2 = Math.floor(Math.random() *255);
 const b2 = Math.floor(Math.random() *255);

 const r3 = Math.floor(Math.random() *255);
 const g3 = Math.floor(Math.random() *255);
 const b3 = Math.floor(Math.random() *255);

 student1.style.background = "rgb(" + r1 + ", " + g1+ ", " + b1 + ")"
 student2.style.background = "rgb(" + r2 + ", " + g2+ ", " + b2 + ")"
 student3.style.background = "rgb(" + r3 + ", " + g3+ ", " + b3 + ")"
 
 student1.style.color = ((0.3 * r1) + (0.59 * g1) + (0.11 * b1) <= 128) ? '#FFF' : '#000';
 student2.style.color = ((0.3 * r2) + (0.59 * g2) + (0.11 * b2) <= 128) ? '#FFF' : '#000';
 student3.style.color = ((0.3 * r3) + (0.59 * g3) + (0.11 * b3) <= 128) ? '#FFF' : '#000';

//new students
const student1Txt = document.createTextNode("First student");
const studentPar1 = document.createElement("p");
studentPar1.appendChild(student1Txt);
student1.appendChild(studentPar1);


const student2Txt = document.createTextNode("Second student");
const studentPar2 = document.createElement("p");
studentPar2.appendChild(student2Txt);
student2.appendChild(studentPar2);

const student3Txt = document.createTextNode("Third student");
const studentPar3 = document.createElement("p");
studentPar3.appendChild(student3Txt);
student3.appendChild(studentPar3);

//create div article
const div = document.createElement("div");
div.append(student1, student2, student3);
const article = document.querySelector("article");
article.appendChild(div);





