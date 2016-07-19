# Ik Haat Gent ([ikhaat.gent](https://ikhaat.gent))
> Avoid things you don't like in Ghent

[![Build Status](https://travis-ci.org/FCCghent/ikhaat.svg?branch=gh-pages)](https://travis-ci.org/FCCghent/ikhaat)

Een site dingen te vermijden die je haat in Gent.

# Info

Gemaakt tijdens (M)Apps for Ghent 2016 door Haroen Viaene, Elias Meire, Simon Wydooghe, Leenke De Donder en Aaike Geussens.

# Updating data

* everything

This is also done by Travis

```
npm install
npm run update
```

This will fetch some of the data manually, and GIPOD is parsed into GeoJSON.

# Running locally

This is a [Jekyll](https://jekyllrb.com) site, so installing Ruby and then doing (`sudo`)`gem install jekyll`. Then you can run the site with `jekyll serve`.

Note: requesting location (for the `haat` button) requires the site to be run via `https` locally as well. You do this by running `jekyll s --ssl-cert assets/ca.crt --ssl-key assets/ca.key`.

# Uses

* Jekyll
* Open Street Maps
  * Overpass Turbo
  * Leaflet
  * Mapbox
* Open Data by Ghent
* [GIPOD](http://gipod.api.agiv.be/#!index.md) (and Haroen's [wrapper](https://github.com/haroenv/gipod-to-geojson))
* Firebase
