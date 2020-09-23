let sat_btn = document.getElementById("saturn_btn")
let query_form = document.getElementById("query_form")
let planet_section = document.getElementById("planet_section")
let body_sec = document.querySelector("body")
let today_text = document.getElementById("today")

var today = new Date();
var now_day = today.getDate();

var now_month = today.getMonth()+1; 
var now_year = today.getFullYear();

if(now_day < 10) 
{
    if(now_day < 2){               //if less then 2 go to the previous month
        now_day = 28
        if(now_month == 1){
            now_month = 12
            now_year = now_year - 1
        }
    }

    now_day = '0' + (now_day - 1);
}
else{
    now_day  = now_day - 1
}


if(now_month < 10) 
{
    now_month = '0' + now_month;
} 

search_day = `${now_year}-${now_month}-${now_day}`;             //set the search date to todays date -1
// console.log(search_day);
today_text.textContent = `picture from ${search_day}`           //set caption

//Api to get the Image of the day
const imageOfTheDay = document.querySelector(".daily-image");
const apiPicOfTheDay = axios.get("https://api.nasa.gov/planetary/apod?", {
    params: {
        api_key: "ngHRTZ4OcS3inyyY02Q1Gl6fbRpQ9OnBRJeEqhBJ",
        date: search_day
    },
});



const getImageOfTheDay = () => {
    apiPicOfTheDay
        .then((response) => {
            imageOfTheDay.style["background-image"] = `url("${response.data.url}")`             //set the background image
        })
        .catch((err) => {
            console.log(err);
        });
};

getImageOfTheDay();


// get planet images from NASA image library API
function getPlanetImg(planet){
    // planet = 'saturn'
    topResults = {}
    fetch(`https://images-api.nasa.gov/search?q=${planet}&media_type=image&center=JPL`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)

        for (let i = 0; i < 10; i++) {
            topResults[i] = {}
            topResults[i]["desc"] = (data["collection"]["items"][i]["data"][0]["description"])
            topResults[i]["thumb_img"] = data["collection"]["items"][i]["links"][0]["href"]
            topResults[i]["href"] = data["collection"]["items"][i]["href"]
            // topResults[i]["desc"] = data["collection"]["items"][i]["data"][0]["description"]
        }
        // console.log(`top results`)
        // console.log(topResults)

        main_planet_img.src = topResults[0]["thumb_img"]

        for (let i = 1; i < 6; i++) {
            caro_img = document.getElementById(`caro_img${i}`)
            caro_img.src = topResults[i]["thumb_img"]
            caro_img.style["width"] = '100px'
            caro_img.style["height"] = '100px'
        }

        }
    )
    .catch(err => alert(err))
}

function getPlanetInfo(event){
    event.preventDefault()


    if(event.type == 'submit'){
        planet = event.target[0].value
        info_url = `https://api.le-systeme-solaire.net/rest.php/bodies?filter%5B%5D=englishName%2Ceq%2C${planet}`
    }
    else{
        info_url = event.target.value
        // console.log(info_url)
    }
    // console.log(event)
    
    if(planet_section.hasChildNodes()){
        planet_section.removeChild(planet_section.firstChild)
    }

    planet_section.innerHTML = `<div class="secton_info d-flex justify-content-around">
        <div>
            <img id="main_planet_img" src="" alt="main planet photo">
        </div>
        <div id="planet_card"></div>
    </div>`

    planet_card = document.getElementById("planet_card")
    main_planet_img = document.getElementById("main_planet_img")

    while (planet_card.hasChildNodes()) {  
        planet_card.removeChild(planet_card.firstChild);
    } 
    
    planetUl = document.createElement('ul')
    planet_card.appendChild(planetUl)

    photo_section = document.getElementById("photo_section")
    if(photo_section == null){
        photo_div = document.createElement('div')
        photo_div.id = "photo_section"
        body_sec.appendChild(photo_div)
        photo_section = photo_div
        // console.log(photo_section)
    }
    while (photo_section.hasChildNodes()) {  
        photo_section.removeChild(photo_section.firstChild);
    } 

    photo_section.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
        <div class="carousel-item active d-flex justify-content-around">
            <img id="caro_img1" src="" class="w-30" alt="...">
            <img id="caro_img2" src="" class="w-30" alt="...">
            <img id="caro_img3" src="" class="w-30" alt="...">
        </div>
        <div class="carousel-item d-flex justify-content-around">
            <img id="caro_img4" src="" class="w-30" alt="...">
            <img id="caro_img5" src="" class="w-30" alt="...">
            <img id="caro_img6" src="" class="w-30" alt="...">
        </div>
        <div class="carousel-item d-flex justify-content-around">
            <img id="caro_img7" src="" class="w-30" alt="...">
            <img id="caro_img8" src="" class="w-30" alt="...">
            <img id="caro_img9" src="" class="w-30" alt="...">
        </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
        </a>
    </div>`
    
    // find the planet from the search query
    // or pass the planet variable when a image is selected

    planetInfo = {}


    fetch(info_url)           //getting the planet information from API
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        if(event.type == 'submit'){
            planetResult = data["bodies"][0]
        }
        else{
            planetResult = data
            planet = data["englishName"]
        }
        // console.log(planetResult)
        planetUl.innerHTML = `<li>Name: ${planetResult["englishName"]}</li><li> Radius: ${planetResult["meanRadius"]} km</li>
        <li>Orbit Radius: ${planetResult["semimajorAxis"]} km</li><li> Gravity: ${planetResult["gravity"]} m/s^2</li>`

        if(planetResult["aroundPlanet"] != null){
            planet_lab = document.createElement('li')
            planet_lab.textContent = `Orbit Around: ${planetResult["aroundPlanet"]["planet"]}`
            planetUl.appendChild(planet_lab)
        }


        if(planetResult["moons"] != null){
            moon_lab = document.createElement('li')
            moon_lab.textContent = 'Moons: '
            planetUl.appendChild(moon_lab)

            moon_sel = document.createElement("select")
            moon_sel.style["width"] = '100px'
            planetUl.appendChild(moon_sel)
            moon_sel.addEventListener('change', getPlanetInfo)

            moon_item = document.createElement("option")
            moon_sel.appendChild(moon_item)
            moon_item.value = ''

            for (let i = 0; i < planetResult["moons"].length; i++) {
                element = planetResult["moons"][i];
                moon_item = document.createElement("option")
                moon_sel.appendChild(moon_item)

                // console.log(element)
                moon_item.value = element["rel"]
                moon_item.label = element["moon"]

                // fetch(element["rel"])
                // .then(res => res.json())
                // .then(data => {
                //     console.log(data["englishName"])
                //     moon_item.textContent = data["englishName"]
                // })

                // console.log(element)
                
            }
        }
        getPlanetImg(planet);                //get the images and save in to object
    })
}

query_form.addEventListener('submit', getPlanetInfo)

