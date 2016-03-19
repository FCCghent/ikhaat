---
# comment for jekyll
---
var mymap = L.map('ikhaatmap').setView([51.05, 3.73], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
maxZoom: 18,
id: 'hyperbaton.pep3hi9n',
accessToken: 'pk.eyJ1IjoiaHlwZXJiYXRvbiIsImEiOiJjaWx5eThiOW0wMGdudmZtNjNnNThmamQ5In0.TFkmQoeiKHGDPxct3o9Jjg'
}).addTo(mymap);

//var myjson;
//$.getJSON("http://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson", function(json){
//    myjson = json;
//});

//console.log(myjson);

$.getJSON("http://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson", getJsonCallback);

function getJsonCallback(data)
{
  var geojsonFeature = {
    "type": "Feature",
    "properties": {
      "name": "Hondenvoorzieningen",
      "amenity": "blablabla",
      "popupContent": "Crap! Mogelijks een megagevaarlijke hond hier!"
    },
    "geometry": data
  };
  L.geoJson(geojsonFeature).addTo(mymap);
}

