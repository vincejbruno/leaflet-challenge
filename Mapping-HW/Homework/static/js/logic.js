// Create variable for the earthquakes over 4.5 mag
var quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson";


// Request the json
d3.json(quakeURL, function(data) {
  features(data.features);
});

function features(quakeData) {

  var quakes = L.geoJSON(quakeData, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>Mag: " + feature.properties.mag +"</h2><h2>Place: "+ feature.properties.place +
        "</h2><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
    
    pointToLayer: function (feature) {
      return new L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
        radius: radius(feature.properties.mag),
        weight: .5,
        fillOpacity: .8,
        stroke: true,
        })
    }
  });

  
  // create map function
  createMap(quakes);
}

function createMap(quakes) {

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });
    
    // Define base
    // Pass in base
    var base = {
      "Light Map": lightmap
    };

    // Create overlay 
    // Pass in overlay
    var overlay = {
      "quakes": quakes,
    };

    // Set center of map - point selected is Bucharest, Romania - gives a nice full view
    var myMap = L.map("map", {
      center: [
        44.4268, 26.1025],
      zoom: 1.7,
      layers: [quakes]
    }); 
  
    // Add to the map
    L.control.layers(base, overlay, {
      collapsed: false
    }).addTo(myMap);

  // Legend
//   var legend = L.control({position: 'bottomright'});

//     legend.onAdd = function(myMap){
//       var div = L.DomUtil.create('div', 'info legend'),
//         grades = [4, 5],
//         labels = [];

    // for (var i = 0; i < grades.length; i++) {
    //     div.innerHTML +=
    //         '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
    //         grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    // }
return div;
    // };

    // legend.addTo(myMap);
}
   

  //Adjust circle colors
  function color(magnitude) {
    return magnitude > 5 ? "red":
              "orange"; // <= 5 
  }

  //circle size
  function radius(value){
    return value*50000
  }