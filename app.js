let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let resultsBox = document.getElementById('resultsBox')
let resultsUL = document.getElementById('resultsUL')
let userAccessToken = "BQBJBVPB0eBK4_pq3bzaR7IrQb8cLCASvrNU0ttPBukErdC3_sqVfaWOrtQb8gNeImaVBGlD07bF4DJr_aSgPbqpedKaFVI_BAVbcu83aM9mwzmo8oQQ9NGgyjnw82CPrOPWAGZAjikVunV-45v2_NTQ-IEdUWY"
let happinessUL = document.getElementById('happinessUL')
let featureSelect = document.getElementById('featureSelect')
let tracksId = document.getElementById('tracksId')
let songBox = document.getElementById('songBox')
let mikeBox = document.getElementById('mikeBox')
let playlistBase = database.ref("Playlist")
let playlist = []
let userAccessToken = "BQD81JUzU6mMe5jA7fxF9e_LBMWfbVz0ZNIj-_mvFfG7dP3W9Kewd6hmkHIG3I_PyHaBfhMMsBP7Za6n9IX22ptwMteDSKPUYlGldeh_7y6XDEfP2zc66ajHGmQn_cv4RrckaRogUTrOyW4QEoq4_TZSQTj3d73a64ZpVJuU_yAPQesGeOvy"

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
                //     return `

                //         <li><p>${item.track_number}</p>
                //             <p>${item.name}</p>
                //         </li>
                //         `
            })
            // tracksId.innerHTML = list.join('')
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
    // let happinessDisplay = happinessList.map((value) => {
    //     return `<li>
    //                 <h3>${value}</h3>
    //             </li>`
    // })
    // happinessUL.innerHTML = happinessDisplay.join("")
}

function populateTrackFeatures(features) {
    console.log(features)
    for (i = 0; i < features.length; i++) {
        let happyValue = features[i].valence
        let danceValue = features[i].danceability
        let energyValue = features[i].energy
        let tempoValue = features[i].tempo
        // possibily loop through trackinfofeaturelist to asssociate tracks with values
        // for (trackInfoFeatureList[i])
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
    return trackInfoList

}


function displayTrackInfo(selectedValue) {
    // for (let i = 0; i < trackInfoList.length; i++) {
    //     trackInfoList[i].selectedValue = featureToDisplayList[i]
    // }
    // let selectedValue = featureSelect.value

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
    playlistBase.push(name)

    console.log(playlist)
}

// function displayPlaylist() {
//     playlist.map()
// }
// ============The stuff to paste============

            // featureToDisplayList = featuresList.map((selectedValue) => {
            // happinessList = []
            // danceabilityList = []
            // energyList = []
            // rempoList = []
            // for (i = 0; i < featuresList; i++) {
            //     let happyValue = featuresList[i].valence
            //     let danceValue = featuresList[i].danceability
            //     let energyValue = featuresList[i].energy
            //     let tempoValue = featuresList[i].tempo
            //     if (happyValue > 0.6) {
            //         console.log('trackinfolist', trackInfoList[i])
            //         trackInfoList[i].happiness = ":)"
            //     }
            //     else {
            //         trackInfoList[i].happiness = ":)"
            //     }

            //     if (danceValue > 0.5) {
            //         trackInfoList[i].danceability = "Yes"
            //     }
            //     else {
            //         trackInfoList[i].danceability = "No"
            //     }
            //     if (energyValue > 0.6) {
            //         trackInfoList[i].energy = "high energy"
            //     }
            //     else {
            //         trackInfoList[i].energy = "low energy"
            //     }
            //     trackInfoList[i].tempo = tempoValue + " bpm"
            // }
            // switch (selectedValue) {
            //     case "happiness":
            //         featureToDisplayList = []
            //         featureToDisplayList = featuresList.map((valence) => {

            //             if (valence > 0.6) {
            //                 result = ":)"
            //             }
            //             else {
            //                 result = ":("
            //             }
            //             return result
            //         })
            //         break;
            //     case "danceability":
            //         featureToDisplayList = []
            //         featureToDisplayList = featuresList.map((danceability) => {
            //             if (danceability > 0.5) {
            //                 result = "yes"
            //             }
            //             else {
            //                 result = "no"
            //             }
            //             return result
            //         })
            //         break;
            //     case "energy":
            //         featureToDisplayList = []
            //         featureToDisplayList = featuresList.map((energy) => {
            //             if (energy > 0.6) {
            //                 result = "high energy"
            //             }
            //             else {
            //                 result = "low energy"
            //             }
            //             return result
            //         })
            //         break;
            //     case "tempo":
            //         featureToDisplayList = []
            //         featureToDisplayList = featuresList.map((tempo) => {
            //             result = tempo + " bpm"
            //             return result
            //         })
            //         break;
            //     default:
            //         break;
            // }
