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
  name = doc.data()["name"];
  email = doc.data()["email"];
  username = doc.data()["username"];
  location = doc.data()["location"];
  console.log("Document data:", doc.data());
});

div = document.createElement("div");
insertAfter(div, document.getElementById("user-profile_navbar"));

name_node = document.createTextNode(name);
name_p = document.createElement("p");
name_p.appendChild(name_node);
div.appendChild(name_p);

email_node = document.createTextNode("$" + email);
email_p = document.createElement("p");
email_p.appendChild(email_node);
div.appendChild(email_p);

username_node = document.createTextNode(username);
username_p = document.createElement("p");
username_p.appendChild(this.percentDonated_node);
this.div.appendChild(this.percentDonated_p);

this.image_img = document.createElement("img");
this.image_img.setAttribute("src", this.imageSrc);
this.image_img.setAttribute("style", "width:200px;");
this.div.appendChild(this.image_img);

this.buy_button = document.createElement("button");
this.buy_button.type = "button";
this.buy_button.value = "Buy";
this.buy_button.onclick = "buy()";
this.div.appendChild(this.buy_button);

this.share_button = document.createElement("button");
this.share_button.type = "button";
this.share_button.value = "Share";
this.share_button.onclick = "share()";
this.div.appendChild(this.share_button);