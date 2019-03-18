// GET https://api.spotify.com/v1/search
// curl -X "GET" "https://api.spotify.com/v1/search?q=Muse&type=track%2Cartist&market=US&limit=10&offset=5" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQBe7On70vnzC4ri37k4xn6pvfV72C4ALxoE98cumKlYoVBD5ncZEiIsgcRk84126cF9wVSItHx7nMuiUJglUrkUKs2ARHSP1j3cwb9KrWB1fV5upvryK6N7MPbiTGj9GsdZZkcFCDzYcf21Ry8fnINUDIw9YBk"
let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let userAccessToken = "BQDafDLYSxwNV2QiDTDcKtSxtSOrclK6d9fahA5tsAOKmEZefEbMP1ZZ_r9_Biu55H_5iNuEHToolpClA_98253IHLUhVK5wA7mgrLrH8GVAQheFr5sSfgJvqlhxcsGZyFOjhsT7MiiH5CAoEJXB9GaH7JTQwPo"

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

    fetch("https://api.spotify.com/v1/search?q=" + searchBar.value + "&type=track%2Cartist&market=US&limit=5&offset=5", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userAccessToken}`
        }
    })
        .then(response => response.json())
        .then(({ tracks }) => {
            tracks.items.forEach((item) => {
                console.log(`${item.album.artists[0].name}`)
                console.log(`${item.album.name}`)
                console.log(`${item.album.images[1].url}`)
                console.log(`${item.album.release_date}`)
            })
        })
})
    // .then(({ items, index }) => {
    //     // console.log(`${tracks.items[2].album.name}`);

    //     for (let i = 0; i < items.length; i++) {
    //         console.log(`${items[index].album.name}`)
    //     }
    // })

