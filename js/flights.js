// /* Event Listener for the Submit Form */
// document.getElementById("submit").addEventListener("click", validateForm);

// /* Function that Validates that the Form is Filled Out Correctly */
// function validateForm() {
//   let origin = document.forms["myForm"]["origin"].value;
//   let destination = document.forms["myForm"]["destination"].value;
//   let currency = document.forms["myForm"]["currency"].value;
  
//   if (origin === "") {
//     alert("Origin must be filled out");
//     return false;
//   }
//   else if (destination === "") {
//     alert("Destination must be filled out");
//     return false;
//   }
//   else if (origin === destination) {
//     alert("Origin must be different than destination")
//     return false;
//   }

//   getCheapestFlight(origin, destination, currency);
// }

// /* Function that Fetches the Cheapest Flight Using an External API */
// function getCheapestFlight(origin, destination, currency) {
//   fetch("https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?origin=" + origin + "&page=None&currency=" + currency + "&destination=" + destination, {
//     "method": "GET",
//     "headers": {
//       "x-access-token": "2ffd501228722984feea7ceb9cf73388",
//       "x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
//       "x-rapidapi-key": "d6f870f92fmsh06e8bba4585eef3p12aa21jsn04f58e145da2"
//     }
//   }).then(function(response) {
//     return response.json();
//   }).then(function(json) {
//     console.log(json);
    
//     /* Grab the Flight Data and Return to the Web Page */
//     let results = "";
//     results += '<h2>Flight info from ' + origin +  "to " + destination + "</h2>";
//     results += "<p>";
//     results += "TEST TEST TEST TEST TEST";
//     results += "</p>";
//     document.getElementById("flight-data").innerHTML = results;
//   }).catch(err => {s
//     console.error(err);
//   });
// }

document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  const origin = document.getElementById("origin").value;
  const destination = document.getElementById("destination").value;
  const currency = document.getElementById("currency").value;

  if (origin === "") {
    alert("Origin must be filled out");
    return false;
  }
  else if (destination === "") {
    alert("Destination must be filled out");
    return false;
  }
  else if (origin === destination) {
    alert("Origin must be different than destination")
    return false;
  }

  fetch("https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?origin=" + origin + "&page=None&currency=" + currency + "&destination=" + destination, {
    "method": "GET",
    "headers": {
      "x-access-token": "2ffd501228722984feea7ceb9cf73388",
      "x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
      "x-rapidapi-key": "d6f870f92fmsh06e8bba4585eef3p12aa21jsn04f58e145da2"
    }
  })
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json);

    let results = "";
    results += "<h2>Flight info from " + origin +  " to " + destination + "</h2>";
    results += "<p>";
    for (let i = 0; json.data[destination].length; i++) {
      results += json.data[destination][i];
      console.log(json.data[destination][i]);
    }
    
    results += "TEST TEST TEST TEST TEST";
    results += "</p>";
    console.log(results);
    document.getElementById("flight-data").innerHTML = results;
  });
});
