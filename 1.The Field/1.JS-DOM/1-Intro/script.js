function changeText() {
    var myTitle = document.getElementById("title");
    console.log(myTitle.innerHTML);
    
    myTitle.innerHTML ="Modifying The DOM";
}

function changeColor() {
    var myBody = document.querySelector("body");

    myBody.style.backgroundColor = "#ff59a1";
}

function changeColor() {

    var x = Math.floor(Math.random() *255);
    var y = Math.floor(Math.random() *255);
    var z = Math.floor(Math.random() *255);

    
    document.body.style.backgroundColor = 'rgb('+x+','+y+','+z+')';
}



