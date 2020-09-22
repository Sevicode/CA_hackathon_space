let sat_btn = document.getElementById("saturn_btn")
let query_form = document.getElementById("query_form")
let planet_card = document.getElementById("planet_card")
let main_planet_img = document.getElementById("main_planet_img")

////Api to get the Image of the day
const imageOfTheDay = document.querySelector(".daily-image");
const apiPicOfTheDay = axios.get("https://api.nasa.gov/planetary/apod?", {
    params: {
        api_key: "ngHRTZ4OcS3inyyY02Q1Gl6fbRpQ9OnBRJeEqhBJ",
        date: "2010-01-01"
    },
});

const getImageOfTheDay = () => {
    apiPicOfTheDay
        .then((response) => {
            imageOfTheDay.style["background-image"] = `url("${response.data.url}")`
        })
        .catch((err) => {
            console.log(err);
        });
};

getImageOfTheDay();

function getPlanetImg(planet){
    // planet = 'saturn'
    topResults = {}
    fetch(`https://images-api.nasa.gov/search?q=${planet}%20planet&media_type=image`)
      .then((res) => res.json())
      .then(
        (data) => {
          // console.log(data)
          for (let i = 0; i < 5; i++) {
            topResults[i] = {};
            topResults[i]["desc"] = data["collection"]["items"][i]["data"][0]["description"];
            topResults[i]["thumb_img"] = data["collection"]["items"][i]["links"][0]["href"];
            topResults[i]["href"] = data["collection"]["items"][i]["href"];
            // topResults[i]["desc"] = data["collection"]["items"][i]["data"][0]["description"]
          }
          console.log(topResults);
          for (i = 1; i < 5; i++) {
            planetImages_desc = topResults[i]["desc"];
            // console.log(planetImages_desc)
            img_box = document.getElementById("cars_img_${}");
            console.log("img_box")
            console.log(i)
            console.log(img_box)
            img_box.src = topResults[i]["thumb_img"]
          }
        }
       
      )
      .catch((err) => alert(err));

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

    while (planet_card.hasChildNodes()) {  
        planet_card.removeChild(planet_card.firstChild);
    } 
    
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

    planetImages = getPlanetImg(planet);                //get the images and save in to object


    //have for loop go through planetImages and assign to carosel images
    
    
   


}


// sat_btn.addEventListener('click', getPlanetImg)
query_form.addEventListener('submit', getPlanetInfo)

