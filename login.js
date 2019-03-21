// Initial Settings
let database = firebase.database()
let registerHeader = document.getElementById("registerHeader")
let userbar = document.getElementById("userbar")
let loginEmail = document.getElementById("loginEmail")
let loginPassword = document.getElementById("loginPassword")
let registerEmail = document.getElementById("registerEmail")
let registerPassword = document.getElementById("registerPassword")
let registerButton = document.getElementById("registerButton")
let loggedUser = document.getElementById("loggedUser")
let loginButton = document.getElementById("loginButton")
let userID = document.getElementById("userID")
let signOutButton = document.getElementById("signOutButton")


// Create User (Database has user but not authenticated in list)
registerButton.addEventListener('click', function () 
{
  let emailAddress = document.getElementById('registerEmail').value
  let password = document.getElementById('registerPassword').value
  userName(emailAddress, password)
  firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
  alert("Your account has been successfully created.")
})

// Add Users to Firebase
function userName(emailAddress, password) 
{
  let usersRef = database.ref("Users")
  usersRef.push
  ({
    name: emailAddress,
    password: password
  })
  // userRef.child("stores").set({
  //   any: ''
  // }) Save for setting playlists
}

// Sign-In
loginButton.addEventListener('click', function () 
{
  let emailAddress = document.getElementById('loginEmail').value
  let password = document.getElementById('loginPassword').value
  firebase.auth().signInWithEmailAndPassword(emailAddress, password)
  firebase.auth().onAuthStateChanged(function (user) 
  {
    if (user) 
    {
      console.log(user)
      window.location.replace("frontend.html")
      
      console.log('Hello bleow')
    }
    else 
    {
      console.log("signed out")
    }
  });
})

// Sign-Out
signOutButton.addEventListener('click', function () 
{
  firebase.auth().signOut().then(function () 
  {
    location.reload().then(function () { }).catch(function (error) 
    {
    });
  })
})

