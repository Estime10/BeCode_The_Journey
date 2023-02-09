

let weather = {
    apiKey: "a5cf13039d6af02d4d2993ee2c8d7191",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));

    },
    displayWeather:  (data) => {
      
      for(i = 0; i<5; i++){
      const  name  = document.querySelector(".bar").value;
      
      const { description } = data.list[i].weather;
      const { temp, humidity } = data.list[i].main;
      const { speed } = data.list[i].wind;
      document.getElementById("day" + (i+1) +"City").innerText = "Weather in " + name;
      document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
      document.getElementById("day" + (i+1) +"Description").innerhtml = description;
      document.getElementById("day" + (i+1) +"Temp").innerText = temp.toFixed(1) + "°C";
      // toFixed will put only 1 number after the ,
      document.getElementById("day" + (i+1) +"Humidity").innerText = "Humidity: " + humidity + "%";
      document.getElementById("day" + (i+1) +"Wind").innerText = "Wind : " + speed + " km/h";
      document.getElementById("day" + (i+1) +"Weather").classList.remove("loading");
      document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
      }
      
    },
  
    search:function() {
      this.fetchWeather(document.querySelector(".bar").value);
      
      const  data  = document.querySelector(".bar").value;
      localStorage.setItem('lastWeather', JSON.stringify(data) );
      

    },
  

  };

  document.querySelector(".searchBtn").addEventListener("click",  () =>{
    weather.search();
  });
  
  document.querySelector(".bar").addEventListener("keyup",  (event) => {
      if (event.key == "Enter") {
        weather.search();
      }
    });

    weather.fetchWeather("Brussels")

 

  //Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

const CheckDay = (day) => {
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)]
    }


// function to create to get the right date on the clock 
const brusselTime =  () =>{
    
    document.getElementById("bxl").innerHTML = 
new Date ().toLocaleString("fr-BE",{timeZone:'Europe/Brussels',timeStyle :'medium', hourCycle:'h24'})
};
// set every second to make sure it's refreshes
brusselTime()
setInterval(brusselTime,1000);

// fuction to create the local date
const brusselTime2 =  ()  => {
    
    document.getElementById("bxl-2").innerHTML = 
new Date ().toLocaleString("fr-BE",{timeZone:'Europe/Brussels',dateStyle:'medium'})
};
// set every second to make sure it's refreshes
brusselTime2()
setInterval(brusselTime2,1000);