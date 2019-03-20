// Initial Settings
let database = firebase.database()


//Sign-In
let emailTextBox = document.getElementById("emailTextBox")
let passwordTextBox = document.getElementById("passwordTextBox")
let registerButton = document.getElementById("registerButton")
//Login
let loginButton = document.getElementById("loginButton")



// Create User
registerButton.addEventListener('click',function() {
    let emailAddress = document.getElementById('emailTextBox').value
    let password = document.getElementById('passwordTextBox').value
    userName(emailAddress,password)
    firebase.auth().createUserWithEmailAndPassword(emailAddress,password)
  })

// Add Users to Firebase
function userName(emailAddress,password) {
    let usersRef = database.ref("users")
    let userRef = usersRef.push({
      name: emailAddress,
      password: password
    })
  }

// Sign-In
loginButton.addEventListener('click',function() {
    let emailAddress = document.getElementById('emailTextBox').value
    let password = document.getElementById('passwordTextBox').value
    firebase.auth().signInWithEmailAndPassword(emailAddress,password)
    console.log('yes you rock')
    // checking()
  })

// Sign-Out
signOutButton.addEventListener('click',function(){
    firebase.auth().signOut().then(function() {
    //   document.getElementById("storesUL").style.display = "none";
    //   document.getElementById("itemBox").style.display = "none";
    //   document.getElementById("itemForm").style.display = "none";
      location.reload().then(function(){}).catch(function(error) {
    });
  })
  })

// Sign
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });



function userName(emailAddress,password) {
    let usersRef = database.ref("users")
    let userRef = usersRef.push({
      name: emailAddress,
      password: password
    })
    // userRef.child("stores").set({
    //   any: ''
    // }) Save for setting playlists
  }

 