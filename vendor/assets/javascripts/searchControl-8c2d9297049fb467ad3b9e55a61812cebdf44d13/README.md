# Search Control

Repo for the Leaflet Search Control

### About Search Control

Search Control is an extension of Leaflet's control.  It has the option of including various types of search types, and zooms the map to the searched feature on search completion.

### Search Control Requirements 

Add the following meta tags to the application's html head.

* \<meta charset="utf-8"/>
* \<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

Add the following tags to the application's html head as stylesheet tags.

* \<link rel="stylesheet" href="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/themes/css/cartodb.css" />
* \<link rel="stylesheet" href="https://dev.sco.wisc.edu/searchControl/Joe/searchControl/searchControl.css">
* \<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
* \<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
* \<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
* \<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

Add the following tags to the application's html body as script tags.

* \<script src="https://cartodb-libs.global.ssl.fastly.net/cartodb.js/v3/3.15/cartodb.js"></script>
* \<script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
* \<script src="https://code.jquery.com/ui/1.12.0/jquery-ui.min.js"></script>
* \<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
* \<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
* THIS NEEDS TO BE CHANGED WHEN IT GOES LIVE: <script type="text/javascript" src="https://dev.sco.wisc.edu/searchControl/Joe/searchControl/searchControl.js"></script>

Files and links can all be found in the example.

* https://dev.sco.wisc.edu/searchControl/joe/searchControl/example/

### Adding the Search Control to the Project

Adding the Search Control is easy. After including the links above and defining a Leaflet map in your code, it can be added as a control to Leaflet's map as so:
```
    $(map).addSearchControl({options});
```

### Options

The user can specify certain options, which constitute which search options will be added to the control, the position of the control, and what text will be displayed on the collapsed search control.
The default for all search options is false.  The default position is 'topleft'.  The default searchText is that shown in the example below.

Example:
```
    $(map).addSearchControl({
        latLng: true,
        address: true,
        gazeteer: true,
        county: true,
        cityTownVillage: true,
        twnRng: true,
        twnRngSec: true,
        position: 'topright',
        order: ["latLng", "address", "gazetteer", "county", "cityTownVillage", "twnRng", "twnRngSec"],
        searchText: 'Search <i id="searchText" class="fas fa-search-location"></i>'
    });
```

* latLng allows the user to input a latitude and longitude in degree decimal or degree minute second form.
* address allows the user to input an address, then searches for possible matches using the BLM Rest.
* gazeteer allows the user to input a more place name, then searches for possible matches using the nominatim Geocoder.
* county allows the user to select a WI county from a dropdown menu and finds a match using the SCO carto data table wi_county_bnds.
* cityTownVillage allows the user to input a city, town, or village name, then searches for possible matches using the SCO carto data table scobase_wi_municipal_boundaries_spring_2019.
* twnRng allows the user to select a township, range, and direction, then finds a match using the SCO carto data table twpppoly.
* twnRngSec allows the user to select a township, range, direction, and section, then finds a match using the SCO carto data table scobase_wi_plss_sections_24k.
* quad allows the user to select a 7.5- by 7.5-minute quadrangle for Wisconsin using the USA USGS 24K Topo Map Boundarues layer.
* position determines the Search Control's position using Leaflet's standard control positions.
* order determines a specific order in which to add the search options to the controls, from top to bottom.  If used, you must include all options you are including with the exact spelling as the option itself, or the option will not be added.  If unspecified, the default order is: ["latLng", "address", "gazetteer", "county", "cityTownVillage", "twnRng", "twnRngSec"]
* searchText determines what text will be displayed on the collapsed search control.  As seen in the example above, icons or images can be imbedded into this as well.


