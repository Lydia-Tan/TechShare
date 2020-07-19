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

function logOut() {
  localStorage.setItem('signedIn', null);
  window.location.href="profile.html";
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var name;
var email;
var username;
var location;
var docRef = db.collection("users").doc(localStorage.getItem("signedIn"));
docRef.get().then(function(doc) {
  div = document.createElement("div");
  insertAfter(div, document.getElementById("navbar"));

  name_node = document.createTextNode("Name: " + doc.data()["name"]);
  name_p = document.createElement("p");
  name_p.appendChild(name_node);
  div.appendChild(name_p);

  email_node = document.createTextNode("Email: " + doc.data()["email"]);
  email_p = document.createElement("p");
  email_p.appendChild(email_node);
  div.appendChild(email_p);

  username_node = document.createTextNode("Username: " + doc.data()["username"]);
  username_p = document.createElement("p");
  username_p.appendChild(username_node);
  div.appendChild(username_p);

  location_node = document.createTextNode("Shipping address: " + doc.data()["location"]);
  location_p = document.createElement("p");
  location_p.appendChild(location_node);
  div.appendChild(location_p);
});
