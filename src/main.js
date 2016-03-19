---
# comment for jekyll
---

var geodata = {};


$.getJSON("http://datatank.stad.gent/4/grondgebied/wijken.geojson", getWijkenCallback);

{% for category in site.data.categories %}
  $.getJSON('{{category.location}}', get{{category.name | capitalize}}Callback);

  function get{{category.name | capitalize}}Callback(data) {
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
        "name": "{{category.name}}",
        "amenity": "blablabla",
        "popupContent": "Crap! Mogelijks een megagevaarlijke hond hier!"
      },
      "geometry": data
    };
    geodata.honden = L.geoJson(geojsonFeature);
  }
{% endfor %}

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

// hide and display shizzles
var hidePoints = function(index) {
  console.log(index,geodata,geodata[index],index);
  mymap.removeLayer(geodata[index]);
}

var displayPoints = function(index) {
  console.log(index,geodata,geodata[index],index);
  mymap.addLayer(geodata[index]);
}

var categories = {{site.data.categories | jsonify }};

// get the features that need to be displayed

var checks = document.querySelectorAll('input[type=checkbox]');

for (var i = checks.length; i--;) {
  checks[i].addEventListener('change',function(e){
    if(this.checked) {
      for (var j = categories.length; j--;) {
        if (e.target.name === categories[j].name.toLowerCase()) {
          displayPoints(e.target.name);
        }
      }
    } else {
      for (var j = categories.length; j--;) {
        if (e.target.name === categories[j].name.toLowerCase()) {
          hidePoints(e.target.name);
        }
      }
    }
  });
}

// get wijken

$.getJSON("http://datatank.stad.gent/4/grondgebied/wijken.geojson", getWijkenCallback);

function getWijkenCallback(data) {
  var wijken = new L.GeoJSON({
    "type": "Feature",
    "geometry": data,
    "properties": {
      "name": "MultiPolygon",
      "style": {
        strokeWidth: 3,
        color: "black",
        opacity: .6,
        fillColor: "red",
        fillOpacity: .6
      }
    }
  }, {
    style: function(feature) {
      return feature.properties.style
    }
  });
  mymap.addLayer(wijken);
}

