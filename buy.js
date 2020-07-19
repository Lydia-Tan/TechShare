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
    // Change this.div class
    this.div = document.createElement("UniqueDivs");
    // this.div.setAttribute("class", "itemsBuy");
		this.div.id = "RemoveableIcons";
    insertAfter(this.div, document.getElementById("searchForm"));
    
    this.name_node = document.createTextNode(this.name);
    this.name_p = document.createElement("p");
		this.name_p.id = "NameDucky";
    this.name_p.appendChild(this.name_node);
    this.div.appendChild(this.name_p);
    // Change this.name_p style
    // this.name_p.style = "color:'red';width:200px;"
    
    this.price_node = document.createTextNode("$" + this.price);
    this.price_p = document.createElement("p");
    this.price_p.appendChild(this.price_node);
		this.price_p.id = "PriceDucky";
    this.div.appendChild(this.price_p);

    this.percentDonated_node = document.createTextNode("Percent donated: " + this.percentDonated + "%");
    this.percentDonated_p = document.createElement("p");
    this.percentDonated_p.appendChild(this.percentDonated_node);
		this.percentDonated_p.id = "PercentDucky";
    this.div.appendChild(this.percentDonated_p);

    this.image_img = document.createElement("img");
    this.image_img.setAttribute("src", this.imageSrc);
    // this.image_img.setAttribute("style", "width:100px;");
    
		 this.image_img.setAttribute("style", "height:100px;");

		this.image_img.id = "ImageDucky";
    this.div.appendChild(this.image_img);

    this.buy_button = document.createElement("button");
    this.buy_button.type = "button";
    this.buy_button.value = "Buy";
    this.buy_button.textContent = "Buy";
    this.buy_button.onclick = "buy()";
		this.buy_button.id = "BuyBtnDucky";
    this.div.appendChild(this.buy_button);
    // this.div.setAttribute("class", "btn");


    this.share_button = document.createElement("button");
    this.share_button.type = "button";
    this.share_button.value = "Share";
    this.share_button.textContent = "Share";
    this.share_button.onclick = "share()";
		this.share_button.id = "ShareBtnDucky";
    this.div.appendChild(this.share_button);
    this.div.setAttribute("class", "btn");
  }

  showFull() {
    
  }
}

function buy() {

}

function share() {
  // Add bid to user's bids collection
}

// dummy pics :D
// var myListing = new Listing("Computer", 300, "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg", 50);
// myListing.showMin();

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

	// var div2 = document.createElement("div");
	// insertAfter(div2, document.getElementById("nav-bar"));
  
  // var warning_node = document.createTextNode("Warning: Not Signed In");
  // var warning_p = document.createElement("p");
  // //this.setAttribute("class", "blahDuck");
  // warning_p.appendChild(warning_node);
  // div2.appendChild(warning_p);

  document.getElementById("warning").innerHTML = 'Warning: Not Signed In';
  
}

// Read data example
// var docRef = db.collection("text").doc("text");
// docRef.get().then(function(doc) {
//   console.log("Document data:", doc.data());
// });

function returnFalse() {
  return false;
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



async function runSearch4(form)
{
	clearSearch(document.getElementById("nav-bar"));
	console.log('running search4');
	var listingsBase = await db.collectionGroup('listings').get();
	var listingsBase2 = listingsBase.docs;
	var usersBase = await db.collection("users").get();
	var usersBase2 = usersBase.docs;
  console.log(usersBase2);
	
	for (let i = 0; i < listingsBase2.length; i++) {
    if(!listingsBase2[i].data()["name"].toLowerCase().includes(form.searchBox.value.toLowerCase())) {
      continue;	
    }
		console.log(listingsBase2[i].data()["name"]);
    //Do something

    console.log(form.searchDistance.value);
    
    if(localStorage.getItem('signedIn') !== "null" && form.searchDistance.value !== "") {
		  var sellerName = listingsBase2[i].data()["seller"];
  
      var buyerName = localStorage.getItem("signedIn");
      // var sellerIndex = usersBase2.indexOf(sellerName);
      for(let i2 = 0; i2 < usersBase2.length; i2++)
      {
        if(sellerName === usersBase2[i2].data()["username"])
          var sellerIndex = i2;
        if(buyerName === usersBase2[i2].data()["username"])
          var buyerIndex = i2;
      }
      
      var loc1 = usersBase2[sellerIndex].data()["location"];
      
      console.log(loc1);
      var coord1 = testAjax(loc1);

      // var buyerIndex = usersBase2.indexOf(localStorage.getItem("signedIn"));
      var loc2 = usersBase2[buyerIndex].data()["location"];	console.log(loc2);
      var coord2 = testAjax(loc2);
      
      var dist2 = getDistanceFromLatLonInKm(coord1[1],coord1[0],coord2[1],coord2[0]);
      
      console.log(dist2,form.searchDistance.value);
			
        if(dist2 > form.searchDistance.value) {
        continue;
        } 
     // // let queryListing = new Listing(listingsBase2[i].data()["name"], listingsBase2[i].data()["price"], url, listingsBase2[i].data()["percentDonated"], listingsBase2[i].data()["notes"]);

    }
      // queryListing.showMin();
      // console.log('listed!');
    
    console.log("Trying to get image");
    
    var url;
 /*   try {
      await console.log("listingsImages/" + listingsBase2[i].id);
      await storage.ref().child("listingsImages/" + listingsBase2[i].id).catch(function(error) {
      });
    } catch(err) {
      imageExists = await returnFalse();
    }*/

	
     // await console.log("listingsImages//" + listingsBase2[i].id);
    //  await storage.ref().child("listingsImages//" + listingsBase2[i].id)
			
   
      //imageExists = await returnFalse();
    

   
    try{
		
      url = await storage.ref().child("listingsImages/" + listingsBase2[i].id).getDownloadURL()
    
		}
		catch (error)
		{
			url = "https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg";
		}
    
    let queryListing = new Listing(listingsBase2[i].data()["name"], listingsBase2[i].data()["price"], url, listingsBase2[i].data()["percentDonated"], listingsBase2[i].data()["notes"]);

    queryListing.showMin();
    console.log('listed!');
  }
}

// function createDistanceRank(form) {
//   listingsBase2.sort()
// }
				
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

$(function () {
    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
});