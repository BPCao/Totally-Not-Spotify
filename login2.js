let userID = document.getElementById("userID")
let database = firebase.database()
let signOutButton = document.getElementById("signOutButton")
firebase.auth().onAuthStateChanged(function (user) 
{
    if (user) 
    {
        userID.innerHTML = `<h3>Logged in as: ${firebase.auth().currentUser.email}</h3>`
    }
})

signOutButton.addEventListener('click', function ()
{
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
})