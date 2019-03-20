let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let resultsBox = document.getElementById('resultsBox')
let resultsUL = document.getElementById('resultsUL')
<<<<<<< HEAD
<<<<<<< HEAD
let userAccessToken = "BQBD3YjFyPhz0C87FyTmPIhu9hupxCmtzp2xF8rSaOYvt4UiFLQQaOJgoKbExWOjZrptOG_AVzKDPp4FK6Oc-9HU3Pyo0EbziRyFA6gVC_g0N_YzonUopZAbjhXSozEGMRFipQU8jCaA0V5g7-F0260Z4cTWPpyxO3JMZO-brenEroGCfM-l"
=======
=======
let userAccessToken = "BQBD3YjFyPhz0C87FyTmPIhu9hupxCmtzp2xF8rSaOYvt4UiFLQQaOJgoKbExWOjZrptOG_AVzKDPp4FK6Oc-9HU3Pyo0EbziRyFA6gVC_g0N_YzonUopZAbjhXSozEGMRFipQU8jCaA0V5g7-F0260Z4cTWPpyxO3JMZO-brenEroGCfM-l"
>>>>>>> ed4cb1a0b2c63e468dfd0ec3a67923909278b88a
let happinessUL = document.getElementById('happinessUL')
let featureSelect = document.getElementById('featureSelect')
let playlist = []
let userAccessToken = "BQCq3nYe2LBM_xwXfGFpNLtlJCQPR2d3mOIXELYAZ28dW08dekaz2GjEDdUhxviO4LFhXmyeerPFt_qweytRJclC0NJ4USNWxeSgd4ui-EsR95lifgtKVPVn8IXqDVN81hfeCw5D8w9L6pGq61YexI8zbUOrxrg"
<<<<<<< HEAD


>>>>>>> e18409c430a521ba31b0965f0af3aa394f57d5ea
=======
>>>>>>> ed4cb1a0b2c63e468dfd0ec3a67923909278b88a
let tracksId = document.getElementById('tracksId')

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

// let trackInfoList
// let happinessList 
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
                }
            })
            let idString = ""
            console.log(trackInfoList)
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
<<<<<<< HEAD
<<<<<<< HEAD
    // pass a variable to show one of several track features
=======
    // pass a variable to show one of severl track features
    // let selectedValue = featureSelect.value
>>>>>>> e18409c430a521ba31b0965f0af3aa394f57d5ea
=======

    // pass a variable to show one of severl track features
    // let selectedValue = featureSelect.value

>>>>>>> ed4cb1a0b2c63e468dfd0ec3a67923909278b88a
    fetch("https://api.spotify.com/v1/audio-features/?ids=" + idString, {
        method: "GET",
        headers:
        {
            Authorization: `Bearer ${userAccessToken}`
        }
    })
        .then(features => features.json())
        .then(({ audio_features }) => {
            let featuresList = audio_features.map((feature) => {
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
            happinessList = featuresList.map((valence) => {

                if (valence >= 0.6) {
                    return ":)"
                }
                else {
                    return ":("
                }
            })
            console.log(happinessList)
            displayTrackInfo()
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> ed4cb1a0b2c63e468dfd0ec3a67923909278b88a
            // let happinessDisplay = happinessList.map((value) => {
            //     return `<li>
            //                 <h3>${value}</h3>
            //             </li>`
            // })
            // happinessUL.innerHTML = happinessDisplay.join("")
<<<<<<< HEAD
=======
>>>>>>> e18409c430a521ba31b0965f0af3aa394f57d5ea
=======

>>>>>>> ed4cb1a0b2c63e468dfd0ec3a67923909278b88a
        })
}

function displayTrackInfo() {
    for (let i = 0; i < trackInfoList.length; i++) {
        trackInfoList[i].happiness = happinessList[i]
    }
    let list = trackInfoList.map((item) => {

        return `
            
                    <li class="trackLI">
                        <div class="trackBox">
                            <h3 onclick="addToPlaylist(${item.name})">+</h3>
                            <p class="trackNumber">${item.track_number}-</p>
                            <p id="${item.id}">${item.name}</p>
                            <p class="featureValue">${item.happiness}</p>
                        </div>
                    </li>
                    `
    })
    tracksId.innerHTML = list.join('')
}

function addToPlaylist(name) {
    playlist.push(name)
}
