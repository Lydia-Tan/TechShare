DisplaySignedInWarning();

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function DisplaySignedInWarning()
{
	if(String(localStorage.getItem('signedIn')) != "null")
	{
		return;
	}

	var div2 = document.createElement("div");
	insertAfter(div2, document.getElementById("buy_navbar"));
  
  var warning_node = document.createTextNode("Warning: Not Signed In");
  var warning_p = document.createElement("p");
  warning_p.appendChild(warning_node);
  div2.appendChild(warning_p);
}

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
var storageRef = firebase.storage().ref();

// Write data example
// db.collection("text").doc("text").set({
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

// // Read data example
// var docRef = db.collection("text").doc("text");
// docRef.get().then(function(doc) {
//   console.log("Document data:", doc.data());
// });

function addListing(form) {
	if(String(localStorage.getItem('signedIn')) === null)
		{
			//Needs a Pretty Message
			console.log("No Selling Without Signing In");
			return;
		}
  var id;
  var file = form.imageFile.files[0];

  var usersRef = db.collection('users');
  usersRef.doc(String(localStorage.getItem('signedIn'))).collection('listings').add({
    name: form.productNameBox.value,
    price: form.priceBox.value,
    percentDonated: form.percentDonatedBox.value,
    notes: form.featuresBox.value,
    seller: localStorage.getItem('signedIn')
  })
  .then(function(docRef) {
    id = docRef.id;
    
    storageRef.child("listingsImages/" + id).put(file).then(function(snapshot) {
      console.log('Uploaded a blob or file!');
    });
  });
  
}
