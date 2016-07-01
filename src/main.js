---
# comment for jekyll
---
// wow so pretty ♥️
if (window.location.protocol === 'http:') {
    window.location.protocol = 'https:';
}

function getJSON(url, successHandler, errorHandler) {
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status == 200) {
      successHandler && successHandler(xhr.response);
    } else {
      errorHandler && errorHandler(status);
    }
  };
  xhr.send();
};

var geodata = {};
var icons = {};


{% for category in site.data.categories %}
{% if category.icon %}
icons.{{category.name | downcase }} = L.icon({
    iconUrl: '{{category.icon}}',
    iconSize: [48, 48],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
{% else %}
icons.{{category.name | downcase }} = L.icon({
    iconUrl: 'src/svg/oranje/default.svg',
    iconSize: [48, 48],
    iconAnchor: [16, 37],
    popupAnchor: [0, -28]
});
{% endif %}

(function(){
  getJSON('{{category.location}}', function(data){
    geodata.{{category.name | downcase}} = L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: icons.{{category.name | downcase}} });
        },
        onEachFeature: function(feature, layer) {
          if (feature.properties) {
            if (feature.properties.popupContent) {
              layer.bindPopup(feature.properties.popupContent);
            } else if(feature.properties.name) {
              layer.bindPopup(feature.properties.name);
            } else if(feature.properties.description) {
              layer.bindPopup(feature.properties.description);
            } else {
              layer.bindPopup('Pas op voor {{category.name | downcase}}!');
            }
          }
        }
    });
  });
})();
{% endfor %}

var mymap = L.map('ikhaatmap').setView([51.05, 3.73], 12);

L.tileLayer('https://a.tiles.mapbox.com/v4/mslee.ad466bba/{z}/{x}/{y}'+(L.Browser.retina?'@2x':'')+'.png?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
maxZoom: 30,
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
  mymap.removeLayer(geodata[index]);
}

var displayPoints = function(index) {
  document.body.classList.add('loading');
  mymap.addLayer(geodata[index]);
  document.body.classList.remove('loading');
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

getJSON("src/data/wijken.geojson", getWijkenCallback);

function getWijkenCallback(data) {
  var wijken = new L.GeoJSON({
    "type": "Feature",
    "geometry": data,
    "properties": {
      "name": "MultiPolygon",
      "style": {
        'weight': 1,
        color: "white",
        opacity: 1,
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

// bamburger
var toggles = 0;
document.getElementById('burger').addEventListener('click',function(e){
  e.preventDefault();
  if (document.getElementById('controls').classList.contains('collapsed')) {
    document.getElementById('controls').classList.remove('collapsed');
    this.innerHTML = '▲';
    sizeFrames();
    toggles++;
  } else {
    document.getElementById('controls').classList.add('collapsed');
    this.innerHTML = '▼';
    sizeFrames();
    toggles++;
  }
  if (toggles === 10) {
    document.body.classList.add('easter');
  }
});

// haters
// hack: we need to prevent the form from being submitted
document.getElementById('controls').addEventListener('submit',function(){
  console.log('haha tis e twuk e');
  return false;
});
document.getElementById('haat').addEventListener('click',function(e){
  e.preventDefault();
  firebase.initializeApp({
    apiKey: "AIzaSyCIaKHVOB5_xSiD-UQSY9n5bqoDcdaj7yY",
    authDomain: "ikhaatgent.firebaseapp.com",
    databaseURL: 'https://ikhaatgent.firebaseio.com'
  });
  var ref = firebase.database().ref('/');
  navigator.geolocation.getCurrentPosition(function(pos){
    getJSON('https://ikhaatgent.firebaseio.com/coordinates.json', function(data){
      data.push([pos.coords.longitude,pos.coords.latitude]);
      ref.child('coordinates').set(data);
      alert('bedankt voor je haat 👌');
    });
  });
});

