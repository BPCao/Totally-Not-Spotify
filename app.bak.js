let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let resultsBox = document.getElementById('resultsBox')
let resultsUL = document.getElementById('resultsUL')
let happinessUL = document.getElementById('happinessUL')
let featureSelect = document.getElementById('featureSelect')
let tracksId = document.getElementById('tracksId')
let songBox = document.getElementById('songBox')
let mikeBox = document.getElementById('mikeBox')
let playlistBase = database.ref("Playlist")
let playlist = []
let finalTrackInfoList = []
let trackInfoList = []
let featureToDisplayList
let userAccessToken = "BQDEgnnecW0toDAiFkCJjEyzWTBUF2ChBQ-eVGjT8ipYjxG1uM9U2dC_QBfq1TUfI5oDXH7D5Npu92DHm9MnCpXbKdjrheToHrPPsqpKccC9Nh6-bYxekSq7QVxZexqd48jic-prabyd3toxvms9au8YqDx5TUG6rc5w-cT0t0BD8fUNbQ"

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

function getTracks(id) {
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
    let idString = ""
    trackInfoList.map((item) => {
        idString += item.id + ","
    })
    getTrackFeatures(idString)
}


function getTrackFeatures(idString) {
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
        })
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
}

let list = trackInfoList.map((item) => {
    return `<li class="trackLI">
            <div class="trackBox">
            <h3 onclick="addToPlaylist('${item.name}')">+</h3>
            <p class="trackNumber">${item.track_number}-</p>
            <p id="${item.id}">${item.name}</p>
            <p class="featureValue">${item.happiness}</p>
            </div>
            </li>`
})

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
        return `<li class="trackLI">
                <div class="trackBox">
                <h3 onclick="addToPlaylist(${item.name})">+</h3>
                <p class="trackNumber">${item.track_number}-</p>
                <p id="${item.id}">${item.name}</p>
                <p class="featureValue">${featuretoDisplay}</p>
                </div>
                </li>`
    })
    tracksId.innerHTML = list.join('')
}

function addToPlaylist(name) {
    playlist.push(name)
    playlistBase.push(name)
    console.log(playlist)
}

