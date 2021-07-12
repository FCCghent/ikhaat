const got = require('got');
const path = require('path');
const fs = require('fs');

const urls = [
  {
    url: 'https://data.stad.gent/api/records/1.0/search/?dataset=speelterreinen-gent&rows=1000',
    output: path.join(__dirname, './data/speelterreinen.geojson'),
  },
  {
    url: 'https://data.stad.gent/api/records/1.0/search/?dataset=hondentoilletten-gent&rows=1000',
    output: path.join(__dirname, './data/hondenvoorzieningen.geojson'),
  },
  // {
  //   url: 'https://datatank.stad.gent/4/doelgroepen/clubhuizenvoorsenioren.geojson',
  //   output: path.join(__dirname, './data/clubhuizenvoorsenioren.geojson'),
  // },
];

Promise.all(
  urls.map(({ url }) => got(url).catch(() => console.log('failed on', url)))
)
  .then((results) =>
    results.map((result, i) => ({
      data: {
        type: 'FeatureCollection',
        features: JSON.parse(result.body).records.map(
          (record) => record.fields.geometry
        ),
      },
      ...urls[i],
    }))
  )
  .then((results) =>
    Promise.all(
      results.map((result) => {
        return fs.writeFileSync(result.output, JSON.stringify(result.data));
      })
    )
  );
