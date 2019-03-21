let userID = document.getElementById("userID")
let database = firebase.database()

firebase.auth().onAuthStateChanged(function (user) 
{
    if (user) 
    {
        userID.innerHTML = `<h3>Logged in as: ${firebase.auth().currentUser.email}</h3>`
    }
})
