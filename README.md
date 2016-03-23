# Ik Haat Gent ([ikhaat.gent](https://ikhaat.gent))
> Avoid things you don't like in Ghent

Een site dingen te vermijden die je haat in Gent.

# Info

Gemaakt tijdens (M)Apps for Ghent 2016 door Haroen Viaene, Elias Meire, Simon Wydooghe, Leenke De Donder en Aaike Geussens.

# Updating datagit+https://github.com/haroenv/gipod-to-geojson

* wegenwerken (traffic works)

```
npm install git+https://github.com/haroenv/gipod-to-geojson
gipod --type workassignment --query city=gent > src/data/werken.geojson
```

# Uses

* Jekyll
* Open Street Maps
  * Overpass Turbo
  * Leaflet
  * Mapbox
* Open Data by Ghent
* [GIPOD](http://gipod.api.agiv.be/#!index.md) (and Haroen's [wrapper](https://github.com/haroenv/gipod-to-geojson))
* Firebase
