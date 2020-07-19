//import 'firebase/app';
localStorage.setItem('signedIn', null);
var profiles = [];
// signedIn = false;

var firebaseConfig = {
  apiKey: "AIzaSyBEGN-UPkzJ8q3L98Bw3U3Gi4gxAnqjaFk",
  authDomain: "techshare-d3a7e.firebaseapp.com",
  databaseURL: "https://techshare-d3a7e.firebaseio.com",
  projectId: "techshare-d3a7e",
  storageBucket: "techshare-d3a7e.appspot.com",
  messagingSenderId: "839628268474",
  appId: "1:839628268474:web:6f2a65c71c5d25f6e4f383",
  measurementId: "G-BWNNE5GMKR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

async function AddPerson(form) {
	var isUniqueUsername = await confirmUniqueUserName(form.userBox2.value);
  
	if(!isUniqueUsername)
  {
		console.log("Need Unique Username");
    //Display Error about being needing a unique username
    return;
  }
	
  db.collection("users").doc(form.userBox2.value).set({
    name: form.fullNameBox.value,
    email: form.emailBox.value,
		username: form.userBox2.value,
    password: form.passwordBox2.value,
    location: form.locationBox.value
  });
  localStorage.setItem('signedIn', form.userBox2.value);
}

async function confirmUniqueUserName(username)
{
	var returnValue = true;
	var docRef = db.collection("users");
	await docRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      if(doc.data()["username"].toLowerCase() == (username.toLowerCase()))
      {
        returnValue = false;
		  }
    });
  });

	return returnValue;
}

function logIn(form) {
  console.log("Attempting to log in...");
  var docRef = db.collection("users").doc(form.userBox.value);
  docRef.get().then(function(doc) {
    if(doc.data()["password"] == form.passwordBox.value) {
      localStorage.setItem('signedIn', form.userBox.value);
      //window.location.href="user-profile.html";
      console.log(localStorage.getItem('signedIn'));
    } else {
      // Display can't login error
    }
  });
}

function logOut() {
  localStorage.setItem('signedIn', null);
  window.location.href="profile.html";
  console.log(localStorage.getItem('signedIn'));
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
