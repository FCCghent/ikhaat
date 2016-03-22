'use strict';
var url = 'http://gipod.api.agiv.be/ws/v1/workassignment?city=gent';

const got = require('got');

let parsed;

let output = {
  'type': 'FeatureCollection',
  'features': ''
};

got(url)
  .then(response => {
    parsed = response.body.replace(/"coordinate"/g,'"geometry"');
    parsed = JSON.parse(parsed);
    let features = [];
    for (let i in parsed) {
      if (parsed.hasOwnProperty(i)) {
        let feat = {};
        feat.geometry = parsed[i].geometry;
        feat.type = 'Feature';
        feat.properties = {
          'description':parsed[i].description,
          'detail':parsed[i].detail
        };
        features.push(feat);
      }
    }
    output.features = features;
    console.log(JSON.stringify(output));
  })
  .catch(error => {
    console.log(error.response.body);
  });
