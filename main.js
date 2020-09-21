let sat_btn = document.getElementById("saturn_btn")
let query_form = document.getElementById("query_form")
let planet_card = document.getElementById("planet_card")

function getPlanetImg(){
    planet = 'saturn'
    topResults = {}
    fetch(`https://images-api.nasa.gov/search?q=${planet}&media_type=image`)
    .then(res => res.json())
    .then( data => {
        // console.log(data)
        for (let i = 0; i < 10; i++) {
            topResults[i] = {}
            topResults[i]["desc"] = (data["collection"]["items"][i]["data"][0]["description"])
            topResults[i]["thumb_img"] = data["collection"]["items"][i]["links"][0]["href"]
            topResults[i]["href"] = data["collection"]["items"][i]["href"]
            // topResults[i]["desc"] = data["collection"]["items"][i]["data"][0]["description"]
        }
        console.log(topResults)
        }
    )
    .catch(err => alert(err))

    return topResults
}

// function getWikiInfo(){

//     planet = 'saturn'
//     wiki_info = {}
//     fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${planet}&format=json&origin=*`)
//     .then(res => res.json())
//     .then(data => {
//         first_result = data["query"]["search"][0]
//         console.log(first_result)
//     })
// }

function getPlanetInfo(event){
    event.preventDefault()
    planet = query_form.planet.value
    planetUl = document.createElement('ul')
    planet_card.appendChild(planetUl)
    // planet = 'mars'                     //default mars
    // find the planet from the search query
    // or pass the planet variable when a image is selected

    planetInfo = {}
    fetch(`https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=englishName%2Ceq%2C${planet}`)           //getting the planet information from API
    .then(res => res.json())
    .then(data => {
        planetResult = data["bodies"][0]
        console.log(planetResult)
        planetUl.innerHTML = `<li>Name: ${planetResult["englishName"]}</li><li> Radius: ${planetResult["meanRadius"]} km</li><li>Orbit Radius: ${planetResult["semimajorAxis"]} km</li><li> Gravity: ${planetResult["gravity"]} m/s^2</li>`
    })



}

function getImgOfDay(){
    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
    .then(res => res.json())
    .then(data => {
        return data["url"]
    })
}

sat_btn.addEventListener('click', getPlanetImg)
query_form.addEventListener('submit', getPlanetInfo)
