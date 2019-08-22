//= require handlebars.runtime
//= require geoblacklight/geoblacklight
//= require geoblacklight/basemaps
//= require geoblacklight/controls
//= require geoblacklight/viewers
//= require geoblacklight/modules
//= require geoblacklight/downloaders
//= require leaflet-iiif
//= require esri-leaflet
//= require readmore

// additional leaflet base layers
GeoBlacklight.Basemaps.esri =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: false,
  minZoom: 6,
  maxZoom: 18,
  worldCopyJump: true,
  detectRetina: true,
  noWrap: false
});