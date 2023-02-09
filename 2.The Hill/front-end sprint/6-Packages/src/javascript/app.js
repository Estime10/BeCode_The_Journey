import mapboxgl from 'mapbox-gl';
import * as dotenv from 'dotenv'
dotenv.config()

// console.log(process.env.MAPBOX_API_KEY)

const adressForm = document.getElementById("adressForm")
// console.log("adressForm", adressForm)

adressForm.addEventListener("submit", (event) => {
    event.preventDefault()
    let address = document.getElementById("adress").value
    console.log(address)
    

    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?proximity=ip&types=address&access_token=${process.env.MAPBOX_API_KEY}`)
    .then(response => response.json())
    .then((data) => {
        console.log(data.features[0].center)
        mapboxgl.accessToken = 'pk.eyJ1IjoiZXN0aW1lIiwiYSI6ImNsYWR3MWZoODBhZmszdm82cHo4NzBxYjMifQ.RnkMbXpQZk5pc0uy95Q5Rg';

const map = new mapboxgl.Map({
    
    container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio  
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: data.features[0].center, // starting position [lng, lat]
    zoom: 18, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});
 
map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});
    
})

})
    




