/* Event Listener for the Submit Form */
document.getElementById("submit").addEventListener("click", validateForm);

/* Function that Validates that the Form is Filled Out Correctly */
function validateForm() {
  let origin = document.forms["myForm"]["origin"].value;
  let destination = document.forms["myForm"]["destination"].value;
  let currency = document.forms["myForm"]["currency"].value;
  
  if (origin === "") {
    alert("Origin must be filled out");
    return false;
  }
  else if (destination === "") {
    alert("Destination must be filled out");
    return false;
  }

  getCheapestFlight(origin, destination, currency);
}

/* Function that Fetches the Cheapest Flight Using an External API */
function getCheapestFlight(origin, destination, currency) {
  fetch("https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/cheap?origin=" + origin + "&page=None&currency=" + currency + "&destination=" + destination, {
    "method": "GET",
    "headers": {
      "x-access-token": "2ffd501228722984feea7ceb9cf73388",
      "x-rapidapi-host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
      "x-rapidapi-key": "d6f870f92fmsh06e8bba4585eef3p12aa21jsn04f58e145da2"
    }
  })
  .then(response => {
    console.log("-------------------HERE--------------------");
    console.log(response);
    
    /* Add to the Flight Data... */
    // let output = document.getElementById("flight-data");
  })
  .catch(err => {
    console.error(err);
  });
}
