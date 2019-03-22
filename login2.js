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
                database.ref("Users/" + user.key + "/playlist").on("child_added", (song) => {
                    mikeBox.innerHTML += `<li>${song.val()}<li>`
                })
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
 