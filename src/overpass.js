const path = require('path')
const fs = require('fs.promised');
const overpass = require('query-overpass');

const data = {
  studenten: {
    file: () => path.join(__dirname, '../assets/overpass/studenten.ql'),
    output: () => path.join(__dirname, './data/studenten.geojson'),
  },
  toerisme: {
    file: () => path.join(__dirname, '../assets/overpass/toerisme.ql'),
    output: () => path.join(__dirname, './data/toerisme.geojson'),
  },
  cafes: {
    file: () => path.join(__dirname, '../assets/overpass/cafes.ql'),
    output: () => path.join(__dirname, './data/cafes.geojson'),
  },
};

Object.keys(data).forEach((point) => {
  fs.readFile(data[point].file()).then((query) => {
    try {
      overpass(query, (err, res) => {
        if (!err) {
          fs.writeFile(data[point].output(), JSON.stringify(res));
        } else {
          console.log(err);
        }
      });
    } catch(err) {
      console.log(err);
    };
  });
});
