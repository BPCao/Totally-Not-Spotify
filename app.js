let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let resultsBox = document.getElementById('resultsBox')
let resultsUL = document.getElementById('resultsUL')
let userAccessToken = "BQDlgUD2EK8AWLvS87EkO4jyLVONi5IMfWs0hfnsf_XbxsTJNPBI7VX5ACIJOn1CuBLN-cFPBJnXPJXUwl3UDml5Ssr83SN1uEff15hFwA7RysULsfCkmtoWutdOJzTtfUXW0xIzY2tfi6n-L2FoCyz6qDtsF7Q"
let happinessUL = document.getElementById('happinessUL')
let featureSelect = document.getElementById('featureSelect')
let database = firebase.database()
let playlist = []
let tracksId = document.getElementById('tracksId')
let trackInfoList = []
let usersRef = database.ref("Users")
let selectedValue = "happiness"
let bigAlbumImage = document.getElementById('bigAlbumImage')
currentAlbumID = ""
let musicStorage = firebase.auth().currentUser
let albumCovers = []



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
            // ===========GENERATE ALBUM COVERS LIST ====================
            albumCovers = tracks.items.map((item) => {
                return {
                    id: `${item.album.id}`,
                    cover: item.album.images[0].url
                }
            })
            //  ===========ALBUM COVER LIST ENDS HERE=================
        })
})

let finalTrackInfoList = []
let featureToDisplayList
async function getTracks(id) {
    // ===============NEW FUNCTION FOR ALBUM COVER===============
    currentAlbumID = id
    albumCovers.forEach((album) => {
        if (currentAlbumID == album.id) {
            bigAlbumImage.src = album.cover

        }
    })
    // ==============ALBUM COVER FUNCTION ENDS HERE ===================
    console.log(albumCovers)


    let response = await fetch("https://api.spotify.com/v1/albums/" + id + "/tracks",
        {
            method: "GET",
            headers:
            {
                Authorization: `Bearer ${userAccessToken}`
            }
        })
    let json = await response.json()

    trackInfoList = json.items.map((item) => {
        return {
            id: `${item.id}`,
            track_number: item.track_number,
            name: item.name,
            happiness: ""
        }
    })

    let idString = ""

    idString += trackInfoList.map((item) => {
        return item.id
    })
    getTrackFeatures(idString)
}



function getTrackFeatures(idString) {
    // pass a variable to show one of severl track features
    selectedValue = featureSelect.value

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
                    time: feature.duration_ms,
                    acousticness: feature.acousticness,
                    instrumentalness: feature.instrumental,
                    liveness: feature.liveness,
                    valence: feature.valence,
                    danceability: feature.danceability,
                    energy: feature.energy,
                    tempo: feature.tempo
                }


            })

            finalTrackInfoList = populateTrackFeatures(featuresList)
            displayTrackInfo(selectedValue)
        })

}

function populateTrackFeatures(features) {
    for (i = 0; i < features.length; i++) {
        let happyValue = features[i].valence
        let danceValue = features[i].danceability
        let energyValue = features[i].energy
        let tempoValue = features[i].tempo
        let timeValue = features[i].time
        let liveValue = features[i].liveness
        // let acousticValue = features[i].acousticness
        // ==========TIME NUMBER ===============
        // trackInfoList[i].time = (Math.floor(timeValue / 1000 / 60)) + ":" + Math.floor((timeValue / 1000 % 60))
        let minutes = Math.floor(timeValue / 60000);
        let seconds = ((timeValue % 60000) / 1000).toFixed(0);
        trackInfoList[i].time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

        // ==========END TIME NUMBER ===============

        // ==========NEW HAPPINESS GRAPHIC ===============
        if (happyValue >= 0.75) {

            trackInfoList[i].happiness = "images/100.png"
        }
        else if (happyValue >= 0.5) {
            trackInfoList[i].happiness = "images/75.png"

        } else if (happyValue >= 0.25) {
            trackInfoList[i].happiness = "images/50.png"

        } else {
            trackInfoList[i].happiness = "images/25.png"
        }
        // ========== HAPPINESS GRAPHIC ENDS HERE ============

        //=============DANCEABILITY GRAPHIC CONTROL ===========
        if (danceValue >= 0.75) {

            trackInfoList[i].danceability = "images/100.png"
        }
        else if (danceValue >= 0.5) {
            trackInfoList[i].danceability = "images/75.png"

        } else if (danceValue >= 0.25) {
            trackInfoList[i].danceability = "images/50.png"

        } else {
            trackInfoList[i].danceability = "images/25.png"
        }
        //============= DANCEABILITY GRAPHIC END ==============


        //  ============ ENERGY GRAPHIC CONTROL ================
        if (energyValue >= 0.75) {

            trackInfoList[i].energy = "images/100.png"
        }
        else if (energyValue >= 0.5) {
            trackInfoList[i].energy = "images/75.png"

        } else if (energyValue >= 0.25) {
            trackInfoList[i].energy = "images/50.png"

        } else {
            trackInfoList[i].energy = "images/25.png"
        }

        // ==============ENERGY GRAPHIC CONTROL END ============
        //  ============ LIVENESS GRAPHIC CONTROL===============
        if (liveValue >= 0.75) {

            trackInfoList[i].liveness = "images/100.png"
        }
        else if (liveValue >= 0.5) {
            trackInfoList[i].liveness = "images/75.png"

        } else if (liveValue >= 0.25) {
            trackInfoList[i].liveness = "images/50.png"

        } else {
            trackInfoList[i].liveness = "images/25.png"
        }
        //  ============ LIVENESS GRAPHIC CONTROL END ===========
        trackInfoList[i].tempo = Math.round(tempoValue) + " bpm"
    }
    return trackInfoList

}


function displayTrackInfo(selectedValue) {

    let featuretoDisplay = ''
    let list = finalTrackInfoList.map((item) => {


        if (selectedValue == "happiness") {
            featuretoDisplay = item.happiness
            return `

                    <li class="trackLI">
                        <div class="trackBox">
                            <h3 onclick="addToPlaylist('${item.name}')">+</h3>
                            <p id="${item.id}">${item.name}</p>
                            <img class="imgFeatureValue" src="${featuretoDisplay}"></img>
                        </div>
                    </li>
                    `
        } else if (selectedValue == "danceability") {
            featuretoDisplay = item.danceability
            return `

                    <li class="trackLI">
                        <div class="trackBox">
                            <h3 onclick="addToPlaylist('${item.name}')">+</h3>
                            <p id="${item.id}">${item.name}</p>
                            <img class="imgFeatureValue" src="${featuretoDisplay}"></img>
                        </div>
                    </li>
                    `
        } else if (selectedValue == "energy") {
            featuretoDisplay = item.energy
            return `

                    <li class="trackLI">
                        <div class="trackBox">
                            <h3 onclick="addToPlaylist('${item.name}')">+</h3>
                            <p id="${item.id}">${item.name}</p>
                            <img class="imgFeatureValue" src="${featuretoDisplay}"></img>
                        </div>
                    </li>
                    `
        } else if (selectedValue == "tempo") {
            featuretoDisplay = item.tempo
            return `

                    <li class="trackLI">
                        <div class="trackBox">
                            <h3 onclick="addToPlaylist('${item.name}')">+</h3>
                            <p id="${item.id}">${item.name}</p>
                            <p class="featureValue">${featuretoDisplay}</p>
                        </div>
                    </li>
                    `

        } else if (selectedValue == "time") {
            featuretoDisplay = item.time
            return `

                    <li class="trackLI">
                        <div class="trackBox">
                            <h3 onclick="addToPlaylist('${item.name}')">+</h3>
                            <p id="${item.id}">${item.name}</p>
                            <p class="featureValue">${featuretoDisplay}</p>
                        </div>
                    </li>
                    `
        } else if (selectedValue == "live") {
            featuretoDisplay = item.liveness
            return `

                    <li class="trackLI">
                        <div class="trackBox">
                            <h3 onclick="addToPlaylist('${item.name}')">+</h3>
                            <p id="${item.id}">${item.name}</p>
                            <img class="imgFeatureValue" src="${featuretoDisplay}"></img>
                        </div>
                    </li>
                    `
        } else {
            console.log("it did not work")
        }
    })
    tracksId.innerHTML = list.join('')
}

function addToPlaylist(name) {
    database.ref("Users").on("child_added", (user) => {
        if (user.val().name == firebase.auth().currentUser.email) {
            database.ref("Users/" + user.key + "/playlist").push(name)
            playlist.push(name)
        }
    })
}

featureSelect.addEventListener('change', () => {
    document.querySelector('select[name="feature"]').onchange = displayTrackInfo(event.target.value);

}, false)
