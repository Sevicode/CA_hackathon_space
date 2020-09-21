let sat_btn = document.getElementById("saturn_btn")


function getPlanetImg(){
    topResults = {}
    fetch(`https://images-api.nasa.gov/search?q=saturn&media_type=image`)
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

    
}


sat_btn.addEventListener('click', getPlanetImg)