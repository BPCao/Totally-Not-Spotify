// let userID = document.getElementById("userID")
// let database = firebase.database()
// let logoutButton = document.getElementById("logoutButton")

firebase.auth().onAuthStateChanged(function (user) 
{
    if (user) 
    {
        userID.innerHTML = `<h3>Logged in as: ${firebase.auth().currentUser.email}</h3>`
        database.ref("Users").on("child_added", (user) => {
            if(user.val().name == firebase.auth().currentUser.email)
            {
                // let finalList = playlist.map(function (song) 
                // {
                //     return `<li>${song}</li>`
                // })
                // mikeBox.innerHTML = finalList.join('')

                mikeBox.innerHTML = Object.values(user.val().playlist).map((song) => {
                    return `<li>${song}</li>`
                }).join('')
            }
        })
    }
})

// Sign-Out
 logoutButton.addEventListener('click', function () 
 {
   firebase.auth().signOut()
    window.location = "login.html"
})
 