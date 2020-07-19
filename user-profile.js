class Listing {
  constructor(name, price, imageSrc, percentDonated, notes, listPrice, shipTime) {
    this.name = name;
    this.price = price;
    this.imageSrc = imageSrc;
    this.percentDonated = percentDonated;
    this.notes = notes;
    this.listPrice = listPrice;
    this.shipTime = shipTime;
  }

  showMin() {
    this.div = document.createElement("UniqueDivs");
		this.div.id = "RemoveableIcons";
    insertAfter(this.div, document.getElementById("listings-p"));

    this.name_node = document.createTextNode(this.name);
    this.name_p = document.createElement("p");
    this.name_p.appendChild(this.name_node);
    this.div.appendChild(this.name_p);

    this.price_node = document.createTextNode("$" + this.price);
    this.price_p = document.createElement("p");
    this.price_p.appendChild(this.price_node);
    this.div.appendChild(this.price_p);

    this.percentDonated_node = document.createTextNode("Percent donated: " + this.percentDonated + "%");
    this.percentDonated_p = document.createElement("p");
    this.percentDonated_p.appendChild(this.percentDonated_node);
    this.div.appendChild(this.percentDonated_p);

    this.image_img = document.createElement("img");
    this.image_img.setAttribute("src", this.imageSrc);
    this.image_img.setAttribute("style", "width:200px;");
    this.div.appendChild(this.image_img);
  }
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
var storage = firebase.storage();

function logOut() {
  localStorage.setItem('signedIn', null);
  window.location.href="profile.html";
}

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var docRef = db.collection("users").doc(localStorage.getItem("signedIn"));
docRef.get().then(function(doc) {
  div = document.createElement("div");
  div.id = "profile-div";
  insertAfter(div, document.getElementById("nav-bar"));

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

  listings_div = document.createElement("div");
  insertAfter(listings_div, document.getElementById("profile-div"));

  listings_node = document.createTextNode("My listings");
  listings_p = document.createElement("p");
  listings_p.appendChild(listings_node);
  listings_p.id = "listings-p";
  listings_div.appendChild(listings_p);

  db.collection("users").doc(localStorage.getItem("signedIn")).collection("listings").get().then(function(querySnapshot) {
    querySnapshot.forEach(async function(doc) {
      // var imageExists = true;
      // var url = "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg";
      // try {
      //   await storage.ref().child("listingsImages/" + doc.id).catch(function(error) {
      //   });
      // } catch(err) {
      //   imageExists = await returnFalse();
      // }

      // console.log("imageExists:" + imageExists);
      // if(imageExists) {        
      //   url = await storage.ref().child("listingsImages/" + doc.id).getDownloadURL()
      // }

      try {
        var url = await storage.ref().child("listingsImages/" + listingsBase2[i].id).getDownloadURL()
      }
      
		  catch (error) {
			  url = "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg";
		  }

      let queryListing = new Listing(doc.data()["name"], doc.data()["price"], url, doc.data()["percentDonated"], doc.data()["notes"]);

      queryListing.showMin();
      console.log('listed!');
    });
  });
});

function returnFalse() {
  return false;
}
