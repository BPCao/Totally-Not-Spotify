let searchBar = document.getElementById('searchBar')
let searchButton = document.getElementById('searchButton')
let resultsBox = document.getElementById('resultsBox')
let resultsUL = document.getElementById('resultsUL')
let userAccessToken = "BQApxp8vjvj0D63bNzDn4YcqkWwnvEGziStHlxG15X3xxaWcKU73q4JJgfv_-9NQ6tzGeHqdVF5EHZVG7EmYdl-C9Max4PO2hHnciMCr3thpaHU5rPnxhB8EVYDj5fsTYSd9LwpKP-feUCir4gLxgYGVpD_D_SU"
let tracksId = document.getElementById('tracksId')
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

// Returns albums related to artist
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
           list = items.map((item) => 
            {
                return `
            
            <li>${item.track_number}</li>
            <li>${item.name}</li>
            `
            })
            tracksId.innerHTML = list.join('')
        
        })
}
