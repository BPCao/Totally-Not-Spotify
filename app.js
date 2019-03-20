let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let resultsBox = document.getElementById('resultsBox')
let resultsUL = document.getElementById('resultsUL')
let userAccessToken = "BQDE9fU9yBrIhRuW4rCY3iu4z5t-BQaqWEMP2iVhVud0Qn8vTeUdqW6cwO5nueXMrJIuTJYZqrvNG1eLuRf2VkFXNhzsGlTf5P3GHuWgwEm_V3YY29psyf1a-yQes-EMJeB01SEDg0Jn9laQFi8fJha3t2K3fO4"
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

// Returns albums related to artist
// function getTracks(id) {
//     fetch("https://api.spotify.com/v1/albums/" + id + "/tracks",
//         {
//             method: "GET",
//             headers:
//             {
//                 Authorization: `Bearer ${userAccessToken}`
//             }
//         })
//         .then(response => response.json())
//         .then(({ items }) => {
//             list = items.map((item) => {
//                 return `

//             <li>${item.track_number}</li>
//             <li>${item.name}</li>
//             `
//             })
//             tracksId.innerHTML = list.join('')

//         })
// }

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
            let trackInfoList = items.map((item) => {

                return {
                    id: `${item.id}`,
                    track_number: item.track_number,
                    name: item.name
                }
            })
            let idString = ""
            console.log(trackInfoList)
            let list = trackInfoList.map((item) => {

                idString += item.id + ","
                return `
            
                    <li>${item.track_number}</li>
                    <li>${item.name}</li>
                    `

            })
            tracksId.innerHTML = list.join('')
            getTrackFeatures(idString)
        })
}






function getTrackFeatures(idString) {
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
            let happinessList = featuresList.map((valence) => {
                if (valence >= 0.5) {
                    return ":)"
                }
                else {
                    return ":("
                }
            })
            console.log(happinessList)
        })
}