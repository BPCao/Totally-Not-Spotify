let userID = document.getElementById("userID")
// let database = firebase.database()
let logoutButton = document.getElementById("logoutButton")
let userKey = null
firebase.auth().onAuthStateChanged(function (user) 
{
    if (user) 
    {
        userID.innerHTML = `<h3>Logged in as: ${firebase.auth().currentUser.email}</h3>`
        database.ref("Users").on("child_added", (user) => {
            if(user.val().name == firebase.auth().currentUser.email)
            {
                userKey = user.key
                let playListRef = database.ref("Users/" + userKey + "/playlist")
                playListRef.on("value", (songs) =>
                {
                    let songsHTML = ''
                    if(songs.val() != null){
                        songsHTML = Object.entries(songs.val()).map((cancion) => {
                            return `<li onclick="removeSong('${cancion[0]}')" style="color: white">${cancion[1]}</li>`
                        }).join('')
                    }
                    mikeBox.innerHTML = songsHTML
                })
            }
        })
    }
})

function removeSong(songKey) {
    let userList = database.ref("Users/" + userKey + "/playlist")
    userList.child(songKey).remove()
}

// Sign-Out
 logoutButton.addEventListener('click', function () 
 {
   firebase.auth().signOut()
    window.location = "login.html"
})
 