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
    insertAfter(this.div, document.getElementById("buy_navbar"));

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
  }

  showFull() {
    
  }
}

function buy() {

}

function share() {
  // Add bid to user's bids collection
}

//var myListing = new Listing("Computer", 300, //"https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg", 50);
//myListing.showMin();

DisplaySignedInWarning();

function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function clearSearch(parent) {
	while(true)
	{
	var ele = document.getElementById("RemoveableIcons");
	if(ele == null)
		break;
	ele.parentNode.removeChild(ele);
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

function DisplaySignedInWarning()
{
  // const cookieValue = document.cookie
  //   .split('; ')
  //   .find(row => row.startsWith('signedIn'))
  //   .split('=')[1];

  // console.log(cookieValue);
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

// Read data example
// var docRef = db.collection("text").doc("text");
// docRef.get().then(function(doc) {
//   console.log("Document data:", doc.data());
// });


async function runSearch2(form)
	{
    clearSearch(document.getElementById("buy_navbar"));
		console.log('running search2');


  db.collectionGroup('listings').get().then(function(querySnapshot) {
    querySnapshot.forEach(async function(doc) {
      // doc.data() is never undefined for query doc snapshots

      if(!doc.data()["name"].toLowerCase().includes(form.searchBox.value.toLowerCase()))
        {return;}
			
     console.log(doc.data()["seller"],localStorage.getItem('signedIn'));

      // var notAVar = await getCoordinates(doc.data()["seller"],localStorage.getItem('signedIn'))
      await  db.collection("users").doc(doc.data()["seller"]).get().then(async function(doc) {
        var sellerLocation = doc.data()["location"];
        console.log(sellerLocation);
        var x2 = await sendGeocodingRequest(sellerLocation);
        
      })

      await db.collection("users").doc(localStorage.getItem('signedIn')).get().then(async function(doc) {
        var buyerLocation = doc.data()["location"];
        console.log(buyerLocation);
      var x = await sendGeocodingRequest(buyerLocation);
      });

      console.log(dist, form.searchDistance.value);

      if (await dist > form.searchDistance.value) 
      {console.log('take off listing')
        return;}
      
      /*var url = storage.ref().child("listingsImages/" + doc.data().id).getDownloadURL();
      console.log(url);*/

      let queryListing = new Listing(doc.data()["name"], doc.data()["price"],"https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg", doc.data()["percentDonated"], doc.data()["notes"]);

      queryListing.showMin();
      console.log('listed!');
    });
  });
  
}

var authHeaders = {
  "X-Application-Id": "4f92ecf3",
  "X-Api-Key": "3bc3ac3273cdaf55da7430ee71006721",
  "Accept-Language": "en-US"
}
    
async function sendGeocodingRequest(location) {
  console.log('run request');
  var request = {
    query: location
  };      
  // Sending the request.
  $.ajax({
    // The URL for the geocoding endpoint.
    url: "https://api.traveltimeapp.com/v4/geocoding/search",
    // The API endpoint accepts GET requests.
    type: "get",
		async: false,
    // The authentication headers.
    headers: authHeaders,
    data: request,
    contentType: "application/json; charset=UTF-8",
    // We handle the response here
    success: console.log("AAAAA"),
    success: createCoords
    
  })
	return "null";
}

var currentCoords = "";
var coordsArray = [];
var dist;

function createCoords(response)
{
	currentCoords = response.features[0].geometry.coordinates;
	
	var coordinates = response.features[0].geometry.coordinates;
  coordsArray.push(coordinates);
	console.log(coordsArray[0][1],coordsArray[0][0],coordsArray[1][1],coordsArray[1][0]);
   if(coordsArray.length === 2) {
    dist = getDistanceFromLatLonInKm(coordsArray[0][1],coordsArray[0][0],coordsArray[1][1],coordsArray[1][0]);
    // document.getElementById('d').innerHTML = dist;
    coordsArray = [];
  }
	return dist;
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371 // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function runSearch3(form)
{
		
  clearSearch(document.getElementById("buy_navbar"));
	console.log('running search3');

  // get all listings
  db.collectionGroup('listings').get().then(function(querySnapshot) {
  	querySnapshot.forEach(function(doc) {
      
    	// take off listing if name doesn't match
      if(!doc.data()["name"].toLowerCase().includes(form.searchBox.value.toLowerCase()))
        {return};

			var loc1;
			 //db.collection("users").doc(doc.data()["seller"]).get().then(function(doc) {
      // loc1 = doc.data()["location"];
			//
			// });
			loc1 = db.collection("users").doc(doc.data()["seller"]).data()["Location"];
 			console.log("loc1", loc1);
			var coord1 = testAjax(doc.data()["location"]);
			var loc2;
			  db.collection("users").doc(localStorage.getItem('signedIn')).get().then(function(doc) {
      	 loc2 = doc.data()["location"];
				
			 });
			 console.log("loc2",loc2);
			var coord2 = testAjax(loc2)
			dist2 = getDistanceFromLatLonInKm(coord1[1][0],coord1[0][0],coord2[1][1],coord2[1][0]);
			if(dist2 > form.searchDistance.value)
				return;
			let queryListing = new Listing(doc.data()["name"], doc.data()["price"],"https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg", doc.data()["percentDonated"], doc.data()["notes"]);

      queryListing.showMin();
		});
	});
				
		function testAjax(location) {
    var result="";
		var request = {
    query: location
 		 };      
    $.ajax({
			 // The URL for the geocoding endpoint.
    	url: "https://api.traveltimeapp.com/v4/geocoding/search",
  	  // The API endpoint accepts GET requests.
   	 	type: "get",
			async: false,
    	// The authentication headers.
   	  headers: authHeaders,
  	  data: request,
  	  contentType: "application/json; charset=UTF-8",
  	  // We handle the response here
    	
  		success: function(data) 
			{	result = data.features[0].geometry.coordinates; }
   })
   return result;
}

}