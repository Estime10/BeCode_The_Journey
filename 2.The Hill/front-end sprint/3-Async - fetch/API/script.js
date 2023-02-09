// create button(bouton)
const body = document.querySelector("body");
const bouton = document.createElement("button");
//set the button under the body
body.appendChild(bouton)
bouton.innerText=("Click to get the API info")

//create input in a new div
const text = document.createElement("input")
const div = document.createElement("div")
// set the div under the button
body.appendChild (div)
// set the input inside the div 
div.appendChild(text)
// input type (text)
text.type = "text"
text.classList.add("nameInput")
const theInput = document.querySelector(".nameInput");
// add up a select
const select = document.createElement("select")
body.appendChild(select)
// create select otpions
const option = document.createElement("option")
const option0 = document.createElement("option")
const option1 = document.createElement("option")
const option2 = document.createElement("option")
const option3 = document.createElement("option")
const option4 = document.createElement("option")
const option5 = document.createElement("option")
const option6 = document.createElement("option")
const option7 = document.createElement("option")
const option8 = document.createElement("option")
// option value
option0.value = "US"
option0.text ="Etats-Unis"

option1.value = "BE"
option1.text ="Belgique"

option2.value = "FR"
option2.text ="France"

option3.value = "CE"
option3.text ="Italie"

option4.value = "ES"
option4.text ="Espagne"

option5.value = "DE"
option5.text ="Allemagne"

option6.value = "Go"
option6.text ="Royaume-Uni"

option7.value = "CG"
option7.text ="République du Congo"

// set otpion inside select
select.appendChild(option)
select.appendChild(option0)
select.appendChild(option1)
select.appendChild(option2)
select.appendChild(option4)
select.appendChild(option5)
select.appendChild(option6)
select.appendChild(option7)

// addEventListener
bouton.addEventListener('click', () => {
    // name value
    const name = theInput.value
    // country value
    const country = select.value
    // last research
    const lastSearched = localStorage.getItem(`research_${name}_${country}`) 
    // const name and country
    const fetchName = (name, country) => 
    fetch('https://api.agify.io/?name=' + name + '&country_id=' + country)
    
    if (lastSearched != null) {
        let json = JSON.parse(lastSearched)
        console.log(json)
        div(name, json)
} else {
    console.log('fetched from API')

        fetchName(name, country)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            // creates a new div everytime you enter a name
            const div = document.createElement('div')
            body.appendChild (div)
            //convert a JS value into a JSON string
            const jsontostring = JSON.stringify(json)
            div.textContent = (jsontostring)
            // localStorage
            localStorage.setItem(`research_${name}_${country}`, json.stringify(json))
        })
        .catch(error => {
          console.log('ERROR!', error)
        })
    }
})
