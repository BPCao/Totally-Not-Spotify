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
let userAccessToken = "BQD81JUzU6mMe5jA7fxF9e_LBMWfbVz0ZNIj-_mvFfG7dP3W9Kewd6hmkHIG3I_PyHaBfhMMsBP7Za6n9IX22ptwMteDSKPUYlGldeh_7y6XDEfP2zc66ajHGmQn_cv4RrckaRogUTrOyW4QEoq4_TZSQTj3d73a64ZpVJuU_yAPQesGeOvy"

// Searches albums by artist
searchButton.addEventListener('click', function () 
{
    fetch("https://api.spotify.com/v1/search?q=" + searchBar.value + "&type=track%2Cartist&market=US&limit=10&offset=5",
    {
        method: "GET",
        headers:
        {
            Authorization: `Bearer ${userAccessToken}`
        }
    })
    .then(response => response.json())
    .then(({ tracks }) => 
    {
        let resultsLItem = tracks.items.map((item) => 
        {
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

function getTracks(id) 
{
    fetch("https://api.spotify.com/v1/albums/" + id + "/tracks",
    {
        method: "GET",
        headers:
        {
            Authorization: `Bearer ${userAccessToken}`
        }
    })
        .then(response => response.json())
        .then(({ items }) => 
        {
            trackInfoList = []
            trackInfoList = items.map((item) => 
            {
                return {
                    id: `${item.id}`,
                    track_number: item.track_number,
                    name: item.name,
                    happiness: ""
                }
            })
            let idString = ""
            trackInfoList.map((item) => 
            {
                idString += item.id + ","
            })
            getTrackFeatures(idString)
        })
}


function getTrackFeatures(idString) 
{
    // pass a variable to show one of severl track features
    // let selectedValue = featureSelect.value
    fetch("https://api.spotify.com/v1/audio-features/?ids=" + idString, 
    {
        method: "GET",
        headers:
        {
            Authorization: `Bearer ${userAccessToken}`
        }
    })
        .then(features => features.json())
        .then(({ audio_features }) => 
        {
            let featuresList = audio_features.map((feature) => 
            {
                return feature.valence
            })
            console.log(featuresList)
            happinessList = []
            // ==============New Functionality Here ============
            // happinessList = featuresList.map((selectedValue = "tempo") => {

            //     switch (selectedValue) {
            //         case selectedValue: "happiness"
            //             if (valence > 0.6) {
            //                 result = ":)"
            //             }
            //             else {
            //                 result = ":("
            //             }
            //             break;
            //         case selectedValue: "danceability"
            //             if (danceability > 0.5) {
            //                 result = "yes"
            //             }
            //             else {
            //                 result = "no"
            //             }
            //             break;
            //         case selectedValue: "energy"
            //             if (energy > 0.6) {
            //                 result = "high energy"
            //             }
            //             else {
            //                 result = "low energy"
            //             }
            //             break;
            //         case selectedValue: "tempo"
            //             result = tempo + " bpm"
            //             break;
            //         default:
            //             break;
            //     }
            happinessList = featuresList.map((valence) => 
            {
                if (valence >= 0.6) 
                {
                    return ":)"
                }
                else 
                {
                    return ":("
                }
            })
            console.log(happinessList)
            displayTrackInfo()
            // let happinessDisplay = happinessList.map((value) => {
            //     return `<li>
            //                 <h3>${value}</h3>
            //             </li>`
            // })
            // happinessUL.innerHTML = happinessDisplay.join("")
        })
}

function displayTrackInfo() 
{
    for (let i = 0; i < trackInfoList.length; i++) 
    {
        trackInfoList[i].happiness = happinessList[i]
    }
    let list = trackInfoList.map((item) => 
    {
        return `<li class="trackLI">
                    <div class="trackBox">
                        <h3 onclick="addToPlaylist('${item.name}')">+</h3>
                        <p class="trackNumber">${item.track_number}-</p>
                        <p id="${item.id}">${item.name}</p>
                        <p class="featureValue">${item.happiness}</p>
                    </div>
                </li>`
    })
    tracksId.innerHTML = list.join('')
}

function addToPlaylist(name) 
{
    
    playlist.push(name)
    playlistBase.push(name)

    console.log(playlist)
}

// function displayPlaylist() {
//     playlist.map()
// }