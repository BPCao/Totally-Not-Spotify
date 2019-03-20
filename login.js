// Initial Settings
let database = firebase.database()
//Sign-In
let registerHeader = document.getElementById("registerHeader")
let userbar = document.getElementById("userbar")
let emailTextBox = document.getElementById("emailTextBox")
let passwordTextBox = document.getElementById("passwordTextBox")
let registerButton = document.getElementById("registerButton")
let loggedUser = document.getElementById("loggedUser")
//Login
let loginButton = document.getElementById("loginButton")



// Create User
registerButton.addEventListener('click',function() {
    let emailAddress = document.getElementById('emailTextBox').value
    let password = document.getElementById('passwordTextBox').value
    userName(emailAddress,password)
    firebase.auth().createUserWithEmailAndPassword(emailAddress,password)
    alert("Your account has been successfully created.")
  })

// Add Users to Firebase
function userName(emailAddress,password) {
    let usersRef = database.ref("Users")
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
    firebase.auth().onAuthStateChanged(function(user) 
    {
      if (user) 
      {
        console.log(user)
        registerHeader.style.display = 'none';
        emailTextBox.style.display = 'none';
        passwordTextBox.style.display = 'none';
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
        loggedUser.style.display = 'block';
        loggedUser.innerHTML = `<h3>Logged in under ${emailTextBox.value}</h3>`
      } 
      else 
      {
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