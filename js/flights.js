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
    results += "<h2>Flight Details from " + origin +  " to " + destination + "</h2>";
    let dest = json.data[destination];

    for (let i = 0; i < Object.keys(dest).length; i++) {
      let card = "<div class=\"card\"><div class=\"card-body\">";
    
      // Airline
      let code = dest[i].airline;
      card += "<div id = \"airName" + i + "\"></div>"
      getAirlineName(code, i).then(function(data) { 
        console.log(data);
        airline = data;
      });
      
      // Price
      card += "<p class=\"price\">Ticket Price: $" + dest[i].price + ".00</p>";

      // Flight Number
      card += "<p class=\"flight-number\">Flight Number: #" + dest[i].flight_number + "</p>";

      // Departure Date
      card += "<p class=\"departure-date\">Departure Date: " + dest[i].departure_at + "</p>";

      // Return Date
      card += "<p class=\"return-date\">Return Date: " + dest[i].return_at + "</p>";
      
      card += "</div></div>";
      results += card;
    }
    console.log(results);
    document.getElementById("flight-data").innerHTML = results;
  });
});

/* Returns the Airline Name */
function getAirlineName(code, i) {
  return fetch("https://iata-and-icao-codes.p.rapidapi.com/airline?iata_code=" + code, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "iata-and-icao-codes.p.rapidapi.com",
          "x-rapidapi-key": "d6f870f92fmsh06e8bba4585eef3p12aa21jsn04f58e145da2"
        }
      })
      .then((response) => response.json())
      .then(json => {
        let airline = "<h3> Airline: "; 
        airline += json[0].name;
        airline += "</h3>"
        document.getElementById("airName" + i).innerHTML = airline;
      })
      .catch(error => console.warn(error));
}