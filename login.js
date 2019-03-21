// Initial Settings
let database = firebase.database()
let registerHeader = document.getElementById("registerHeader")
let userbar = document.getElementById("userbar")
let emailTextBox = document.getElementById("emailTextBox")
let passwordTextBox = document.getElementById("passwordTextBox")
let registerButton = document.getElementById("registerButton")
let loggedUser = document.getElementById("loggedUser")
let loginButton = document.getElementById("loginButton")
let signOutButton = document.getElementById("signOutButton")


// Create User
registerButton.addEventListener('click', function () {
  let emailAddress = document.getElementById('emailTextBox').value
  let password = document.getElementById('passwordTextBox').value
  userName(emailAddress, password)
  firebase.auth().createUserWithEmailAndPassword(emailAddress, password)
  alert("Your account has been successfully created.")
})

// Add Users to Firebase
function userName(emailAddress, password) {
  let usersRef = database.ref("Users")
  let userRef = usersRef.push({
    name: emailAddress,
    password: password
  })
}

// Sign-In
<<<<<<< HEAD
loginButton.addEventListener('click',function() {
    let emailAddress = document.getElementById('emailTextBox').value
    let password = document.getElementById('passwordTextBox').value
    firebase.auth().signInWithEmailAndPassword(emailAddress,password)
    console.log('yes you rock')
    // checking()
  })
=======
loginButton.addEventListener('click', function () {
  let emailAddress = document.getElementById('emailTextBox').value
  let password = document.getElementById('passwordTextBox').value
  firebase.auth().signInWithEmailAndPassword(emailAddress, password)
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(user)
      registerHeader.style.display = 'none';
      emailTextBox.style.display = 'none';
      passwordTextBox.style.display = 'none';
      registerButton.style.display = 'none';
      loginButton.style.display = 'none';
      signOutButton.style.display = 'block';
      loggedUser.style.display = 'block'
      loggedUser.innerHTML = `<h3>Account: ${emailTextBox.value}</h3>`
    }
    else {
      // window.location = "login.html"
      console.log("signed out")
      registerHeader.style.display = 'block';
      emailTextBox.style.display = 'block';
      passwordTextBox.style.display = 'block';
      registerButton.style.display = 'block';
      loginButton.style.display = 'block';
      loggedUser.style.display = 'none';
    }
  });
  // checking()
})
>>>>>>> f0e60d864c06d96880644e2c2cb0a9f21b04738b

// Sign-Out
signOutButton.addEventListener('click', function () {
  firebase.auth().signOut().then(function () {
    location.reload().then(function () { }).catch(function (error) {
    });
  })
})

// Sign
// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// });

<<<<<<< HEAD


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

 
=======
function userName(emailAddress, password) {
  let usersRef = database.ref("users")
  let userRef = usersRef.push({
    name: emailAddress,
    password: password
  })
  // userRef.child("stores").set({
  //   any: ''
  // }) Save for setting playlists
}
>>>>>>> f0e60d864c06d96880644e2c2cb0a9f21b04738b
