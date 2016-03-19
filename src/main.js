---
# comment for jekyll
---

var honden;
var studenten;

$.getJSON("http://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson", getStudentenCallback);
$.getJSON("http://datatank.stad.gent/4/grondgebied/wijken.geojson", getWijkenCallback);

function getStudentenCallback(data) {
  var geojsonFeature = {
    "type": "Feature",
    "properties": {
      "name": "Hondenvoorzieningen",
      "amenity": "blablabla",
      "popupContent": "Crap! Mogelijks een megagevaarlijke hond hier!"
    },
    "geometry": data
  };
  studenten = L.geoJson(geojsonFeature);
}

var mymap = L.map('ikhaatmap').setView([51.05, 3.73], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
maxZoom: 18,
id: 'hyperbaton.pep3hi9n',
accessToken: 'pk.eyJ1IjoiaHlwZXJiYXRvbiIsImEiOiJjaWx5eThiOW0wMGdudmZtNjNnNThmamQ5In0.TFkmQoeiKHGDPxct3o9Jjg'
}).addTo(mymap);

// ugly styling of leaflet
var sizeFrames = function() {
  if (window.innerWidth > 960) {
      // sidebar
      document.getElementById('ikhaatmap').style.width = window.innerWidth - document.getElementById('menu').offsetWidth + 'px';
  } else {
      // over eachother
      document.getElementById('ikhaatmap').style.height = window.innerHeight - document.getElementById('menu').offsetHeight + 'px';
  }
}

sizeFrames();
var resizeTimer;
window.addEventListener('resize', function(){
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    sizeFrames();
  }, 250);
});

//var myjson;
//$.getJSON("http://datatank.stad.gent/4/infrastructuur/hondenvoorzieningen.geojson", function(json){
//    myjson = json;
//});

//console.log(myjson);

var hidePoints = function(index) {
  if (index === 0) {
    mymap.removeLayer(studenten);
  }
  else if (index === 1) {
    mymap.removeLayer(wijken);
  }
}

var displayPoints = function(index) {
  if (index === 0) {
    mymap.addLayer(studenten);
  }
  else if (index === 1) {
    mymap.addLayer(wijken);
  }
}

var categories = {{site.data.categories | jsonify }};

// get the features that need to be displayed

var checks = document.querySelectorAll('input[type=checkbox]');

for (var i = checks.length; i--;) {
  checks[i].addEventListener('change',function(e){
    if(this.checked) {
      for (var j = categories.length; j--;) {
        if (e.target.name === categories[j].name.toLowerCase()) {
          displayPoints(j);
        }
      }
    } else {
      for (var j = categories.length; j--;) {
        if (e.target.name === categories[j].name.toLowerCase()) {
          hidePoints(j);
        }
      }
    }
  });
}

function getWijkenCallback(data)
{
  var mp = {
    "type": "Feature",
    "geometry": data,
    "properties": {
      "name": "MultiPolygon",
      "style": {
          color: "black",
          opacity: 1,
          fillColor: "red",
          fillOpacity: 1
      }
    }
  };
  wijken = new L.GeoJSON(mp, {
    style: function(feature) {
      return feature.properties.style
    }
  });
}

