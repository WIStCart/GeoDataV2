Blacklight.onLoad(function() {
  $('[data-map="home"]').each(function(i, element) {

    var geoblacklight = new GeoBlacklight.Viewer.Map(this);
    geoblacklight.map.setMinZoom(6);
    var data = $(this).data();

    geoblacklight.map.addControl(L.control.geosearch({
      baseUrl: data.catalogPath,
      dynamic: false,
      searcher: function() {
        window.location.href = this.getSearchUrl();
      },
      staticButton: '<a class="btn btn-primary">Search here</a>'
    }));

    // Add searchControl jQuery plugin
    // "map" must exist in global namespace
    window.map = geoblacklight.map;

    $(map).addSearchControl({
      latLng: false,
      address: true,
      gazetteer: false,
      county: true,
      cityTownVillage: true,
      twnRng: false,
      twnRngSec: true,
      quad: false,
      position: 'topleft',
      order: ["latLng", "address", "gazetteer", "county", "cityTownVillage", "twnRng", "twnRngSec", "quad"],
      searchText: 'Search <span id = "searchText" class="searchIcon" style="margin-top:3px;"></span>'
    });
  });
});
