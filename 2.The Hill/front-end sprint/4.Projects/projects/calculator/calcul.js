// add things under main
const main = document.querySelector("main")


// titte 
const title = document.createElement("h1")
title.innerText = "DOM Calulator"
document.body.insertBefore(title, document.body.children[0])

// create a tableau
const table = document.createElement("table")
table.classList.add("calcu")
main.append(table)

// create a tr
const tr = document.createElement("tr")
table.append(tr)
// create a td
const td = document.createElement("td")
td.colSpan = "3"
tr.append(td)
// create input
const input1 = document.createElement("input")
input1.setAttribute("type", "text")
input1.id = "result"
td.append(input1)

// create td2
const td2 = document.createElement("td")
tr.append(td2)
// create input2
const input2 = document.createElement("input")
input2.classList.add("clr")
input2.setAttribute("type", "button")
input2.setAttribute("value", "C")
input2.setAttribute("onclick", "clr()")
td2.append(input2)

// create tr2
const tr2 = document.createElement("tr")
table.append(tr2)
// crerate td3
const td3 = document.createElement("td")
tr2.append(td3)
//create input3
const input3 = document.createElement("input")
input3.setAttribute("type", "button")
input3.setAttribute("value", "1")
input3.setAttribute("onclick", "display ('1')")
input3.setAttribute("onkeydown", "display(val)")
td3.append(input3)

// crerate td3
const td4 = document.createElement("td")
tr2.append(td4)
//create input3
const input4 = document.createElement("input")
input4.setAttribute("type", "button")
input4.setAttribute("value", "2")
input4.setAttribute("onclick", "display('2')")
input4.setAttribute("onkeydown", "display(val)")
td4.append(input4)

// crerate td5
const td5 = document.createElement("td")
tr2.append(td5)
//create input4
const input5 = document.createElement("input")
input5.setAttribute("type", "button")
input5.setAttribute("value", "3")
input5.setAttribute("onclick", "display('3')")
input5.setAttribute("onkeydown", "display(val)")
td5.append(input5)

// crerate td6
const td6 = document.createElement("td")
tr2.append(td6)
//create input6
const input6 = document.createElement("input")
input6.setAttribute("type", "button")
input6.setAttribute("value", "/")
input6.setAttribute("onclick", "display('/')")
input6.setAttribute("onkeydown", "display(val)")
td6.append(input6)

// create tr3
const tr3 = document.createElement("tr")
table.append(tr3)
// create td7
const td7 = document.createElement("td")
tr3.append(td7)
// create input7
const input7 = document.createElement("input")
input7.setAttribute("type", "button")
input7.setAttribute("value", "4")
input7.setAttribute("onclick", "display('4')")
input7.setAttribute("onkeydown", "display(val)")
td7.append(input7)

// create td8
const td8 = document.createElement("td")
tr3.append(td8)
// create input8
const input8 = document.createElement("input")
input8.setAttribute("type", "button")
input8.setAttribute("value", "5")
input8.setAttribute("onclick", "display('5')")
input8.setAttribute("onkeydown", "display(val)")
td8.append(input8)

// create td9
const td9 = document.createElement("td")
tr3.append(td9)
// create input 9
const input9 = document.createElement("input")
input9.setAttribute("type", "button")
input9.setAttribute("value", "6")
input9.setAttribute("onclick", "display('6')")
input9.setAttribute("onkeydown", "display(val)")
td9.append(input9)

// create td10
const td10 = document.createElement("td")
tr3.append(td10)
// create input10
const input10 = document.createElement("input")
input10.setAttribute("type", "button")
input10.setAttribute("value", "*")
input10.setAttribute("onclick", "display('*')")
input10.setAttribute("onkeydown", "display(val)")
td10.append(input10)

// create tr4
const tr4 = document.createElement("tr")
table.append(tr4)

// create td11
const td11 = document.createElement("td")
tr4.append(td11)
// create input11
const input11 = document.createElement("input")
input11.setAttribute("type", "button")
input11.setAttribute("value", "7")
input11.setAttribute("onclick", "display('7')")
input11.setAttribute("onkeydown", "display(val)")
td11.append(input11)

// create td12
const td12 = document.createElement("td")
tr4.append(td12)
// create input12
const input12 = document.createElement("input")
input12.setAttribute("type", "button")
input12.setAttribute("value", "8")
input12.setAttribute("onclick", "display('8')")
input12.setAttribute("onkeydown", "display(val)")
td12.append(input12)

// create td13
const td13 = document.createElement("td")
tr4.append(td13)
// create input13
const input13 = document.createElement("input")
input13.setAttribute("type", "button")
input13.setAttribute("value", "9")
input13.setAttribute("onclick", "display('9')")
input13.setAttribute("onkeydown", "display(val)")
td13.append(input13)

// create td14
const td14 = document.createElement("td")
tr4.append(td14)
// create input14
const input14 = document.createElement("input")
input14.setAttribute("type", "button")
input14.setAttribute("value", "-")
input14.setAttribute("onclick", "display('-')")
input14.setAttribute("onkeydown", "display(val)")
td14.append(input14)

// create tr5
const tr5 = document.createElement("tr")
table.append(tr5)

// // create td15
const td15 = document.createElement("td")
tr5.append(td15)
// create input15
const input15 = document.createElement("input")
input15.setAttribute("type", "button")
input15.setAttribute("value", "0")
input15.setAttribute("onclick", "display('0')")
input15.setAttribute("onkeydown", "display(val)")
td15.append(input15)

// create td16
const td16 = document.createElement("td")
tr5.append(td16)
// create input16
const input16 = document.createElement("input")
input16.setAttribute("type", "button")
input16.setAttribute("value", ".")
input16.setAttribute("onclick", "display('.')")
input16.setAttribute("onkeydown", "display(val)")
td16.append(input16)

// create td17
const td17 = document.createElement("td")
tr5.append(td17)
// create input17
const input17 = document.createElement("input")
input17.setAttribute("type", "button")
input17.setAttribute("value", "=")
input17.setAttribute("onclick", "display('=')")
input17.setAttribute("onkeydown", "display(val)")
td17.append(input17)

// create td18
const td18 = document.createElement("td")
tr5.append(td18)
// create input18
const input18 = document.createElement("input")
input18.setAttribute("type", "button")
input18.setAttribute("value", "+")
input18.setAttribute("onclick", "display('+')")
input18.setAttribute("onkeydown", "display(val)")
td18.append(input18)

// display value

const display = (val) => {
    input1.value += val
}

// display keys 
const calculate = (event) => {
    if (event.key == "0" || event.key == "1"
    ||  event.key == "2" || event.key =="3"
    ||  event.key == "4" || event.key =="5"
    ||  event.key == "6" || event.key =="7"
    ||  event.key == "8" || event.key =="9"
    ||  event.key == "+" || event.key =="-"
    ||  event.key == "*" || event.key =="/"
    
        )
        input1.value += event.key
}

// execute inputs 
const cal = table
table.onkeyup = (event) => {
    if (event.keyCode === 13) {
        console.log("enter")
        let x = input1.value
        console.log(x)
        solve()
    }
}

// execture calculs
const solve = () => {
    let x = input1.value
    let y = math.evaluate(x)
    input1.value = y
    
} 

function clr() {
    input1.value = ""
}