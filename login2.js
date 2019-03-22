let userID = document.getElementById("userID")
let database = firebase.database()
let logoutButton = document.getElementById("logoutButton")

firebase.auth().onAuthStateChanged(function (user) 
{
    if (user) 
    {
        userID.innerHTML = `<h3>Logged in as: ${firebase.auth().currentUser.email}</h3>`
    }
})

// Sign-Out
 logoutButton.addEventListener('click', function () 
 {
   firebase.auth().signOut()
    window.location = "login.html"
})
 