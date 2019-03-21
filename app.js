let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let resultsBox = document.getElementById('resultsBox')
let resultsUL = document.getElementById('resultsUL')
let userAccessToken = "BQBxVVh72TIDUvkCSPY5_LVsEdqoF23UHTzQRfuPkG62Vu7hpj1SFNs2Yo0wK5fgs2xTscwix99p_Dd4RmlL7eTF6OLA4Vu1LJUqtnPXjsmpaMi5v1RxGGFBf8b91S2-EEwfW5__ATQUquwTHJWYERFbfIZgBs0"
let happinessUL = document.getElementById('happinessUL')
let featureSelect = document.getElementById('featureSelect')
let playlist = []
let tracksId = document.getElementById('tracksId')
let trackInfoList = []

// let selectedValue = featureSelect.value
// Searches albums by artist
searchButton.addEventListener('click', function () {
    fetch("https://api.spotify.com/v1/search?q=" + searchBar.value + "&type=track%2Cartist&market=US&limit=10&offset=5",
        {
            method: "GET",
            headers:
            {
                Authorization: `Bearer ${userAccessToken}`
            }
        })
        .then(response => response.json())
        .then(({ tracks }) => {
            let resultsLItem = tracks.items.map((item) => {
                return `<li>
                        <h3>${item.album.artists[0].name}</h3>
                        <div class="elementBox">
                        <img onclick="getTracks('${item.album.id}')" src="${item.album.images[1].url}"></img>
                        <p>${item.album.name}</p>
                        <p>${item.album.release_date}</p>
                        </div>
                        </li>`
            })
            resultsUL.innerHTML = resultsLItem.join('')
        })
})

let finalTrackInfoList = []
let featureToDisplayList
function getTracks(id) {
    //place html visibility = show
    fetch("https://api.spotify.com/v1/albums/" + id + "/tracks",
        {
            method: "GET",
            headers:
            {
                Authorization: `Bearer ${userAccessToken}`
            }
        })
        .then(response => response.json())
        .then(({ items }) => {
            trackInfoList = []
            trackInfoList = items.map((item) => {
                return {
                    id: `${item.id}`,
                    track_number: item.track_number,
                    name: item.name,
                    happiness: ""
                    // happiness: ""
                }

            })
            // trackInfoFeatureList.push(trackInfoList)
            // console.log(trackInfoFeatureList)
            let idString = ""
            trackInfoList.map((item) => {
                idString += item.id + ","
            })
            getTrackFeatures(idString)

        })
}


function getTrackFeatures(idString) {
    // pass a variable to show one of severl track features
    let selectedValue = featureSelect.value

    fetch("https://api.spotify.com/v1/audio-features/?ids=" + idString,
        {
            method: "GET",
            headers:
            {
                Authorization: `Bearer ${userAccessToken}`
            }
        })
        .then(features => features.json())
        .then(({ audio_features }) => {

            let featuresList = audio_features.map((feature) => {
                return {
                    danceability: feature.danceability,
                    valence: feature.valence,
                    energy: feature.energy,
                    tempo: feature.tempo
                }


            })

            finalTrackInfoList = populateTrackFeatures(featuresList)
            // featureToDisplayList = []
            // ==============New Functionality Here ============
            // =================Past Crap here=============

            // ============================================
        })

    // console.log(happinessList)
    displayTrackInfo(selectedValue)
}

function populateTrackFeatures(features) {
    console.log(features)
    for (i = 0; i < features.length; i++) {
        let happyValue = features[i].valence
        let danceValue = features[i].danceability
        let energyValue = features[i].energy
        let tempoValue = features[i].tempo
        if (happyValue > 0.6) {

            trackInfoList[i].happiness = ":)"
            console.log(happyValue)

        }
        else {
            trackInfoList[i].happiness = ":("
            console.log(happyValue)

        }

        if (danceValue > 0.5) {
            trackInfoList[i].danceability = "Yes"
        }
        else {
            trackInfoList[i].danceability = "No"
        }
        if (energyValue > 0.6) {
            trackInfoList[i].energy = "high energy"
        }
        else {
            trackInfoList[i].energy = "low energy"
        }
        trackInfoList[i].tempo = tempoValue + " bpm"
    }
    return trackInfoList

}


function displayTrackInfo(selectedValue) {

    let list = finalTrackInfoList.map((item) => {
        console.log(item.tempo)
        let featuretoDisplay = ''

        if (selectedValue == "happiness") {
            featuretoDisplay = item.happiness
        } else if (selectedValue == "danceability") {
            featuretoDisplay = item.danceability
        } else if (selectedValue == "energy") {
            featuretoDisplay = item.energy
        } else if (selectedValue == "tempo") {
            featuretoDisplay = item.tempo
        } else {
            console.log("it did not work")
        }

        console.log(featuretoDisplay)

        return `
            
                    <li class="trackLI">
                        <div class="trackBox">
                            <h3 onclick="addToPlaylist(${item.name})">+</h3>
                            <p class="trackNumber">${item.track_number}-</p>
                            <p id="${item.id}">${item.name}</p>
                            <p class="featureValue">${featuretoDisplay}</p>
                        </div>
                    </li>
                    `
    })
    tracksId.innerHTML = list.join('')
}

function addToPlaylist(name) {
    playlist.push(name)
}

