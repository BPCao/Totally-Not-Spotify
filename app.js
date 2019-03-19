// GET https://api.spotify.com/v1/search
// curl -X "GET" "https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBe7On70vnzC4ri37k4xn6pvfV72C4ALxoE98cumKlYoVBD5ncZEiIsgcRk84126cF9wVSItHx7nMuiUJglUrkUKs2ARHSP1j3cwb9KrWB1fV5upvryK6N7MPbiTGj9GsdZZkcFCDzYcf21Ry8fnINUDIw9YBk"
let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let resultsBox = document.getElementById('resultsBox')
let resultsUL = document.getElementById('resultsUL')
let userAccessToken = "BQBdAw_fyxuerEQSP8HubzFCDprqhE5OhMCij-erFNf89-_SONj6nJ-JO3tNh543Kw8DQ3e6QJ6xnkuHPGd_NmIRV6RMs-Xe9VGIIqdKnei-K6v6vb6lFTfBN8gT4VUsI4B9oqv__5bSOs4cGx6Ywu_qRLD6xLvwXxrh5wZr93Ew79bzEO84"

// fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {


// fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
//     method: "GET",
//     headers: {
//         Authorization: `Bearer ${userAccessToken}`
//     }
// })
//     .then(response => response.json())
//     .then(({ beats }) => {
//         beats.forEach((beat, index) => {
//             console.log(`Beat ${index} starts at ${beat.start}`);
//         })
//     })

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
// .then(({ items, index }) => {
//     // console.log(`${tracks.items[2].album.name}`);

//     for (let i = 0; i < items.length; i++) {
//         console.log(`${items[index].album.name}`)
//     }
// })

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
            items.map((item) => {
                console.log(`${item.track_number}`)
                console.log(`${item.name}`)
            })
        })
}


