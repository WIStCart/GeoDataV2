(function ( $ ) {
    $.fn.addSearchControl = function( options ) {



        var settings = $.extend({
          latLng: false,
          address: false,
          gazetteer: false,
          county: false,
          cityTownVillage: false,
          twnRng: false,
          twnRngSec: false,
          // quad: false,
          position: 'topleft',
          // order: ["latLng", "address", "gazetteer", "county", "cityTownVillage", "twnRng", "twnRngSec", "quad"],
          order: ["latLng", "address", "gazetteer", "county", "cityTownVillage", "twnRng", "twnRngSec"],
          // searchText: 'Search <img id = "searchText" src='+searchLocationIconURL+' alt="search-location-icon" height="20px" width="20px">'
          searchText: 'Search <div style="display:inline-block; transform: translateY(3px);><span id = "searchText" class="searchIcon" style="margin-top:3px;"></span></div>'
        }, options );

        // Global variables
        // Holds the results of an address search to get [lat,lng] when result is clicked
        var addressResultsObject = {};
        var gazetteerResultsObject = {};
        var cityTownVillageResultsObject = {};
        // Track if each dropdown in twnRngSearchSCO has a selected value
        var twnRngSearchSCOT = false;
        var twnRngSearchSCOR = false;
        var twnRngSearchSCOD = false;
        // Track if each dropdown in twnRngSearchSecSCO has a selected value
        var twnRngSecSearchSCOT = false;
        var twnRngSecSearchSCOR = false;
        var twnRngSecSearchSCOD = false;
        var twnRngSecSearchSCOS = false;
        // The marker returned by a search result
        var marker;
        // The window width checked for mobile styling
        var mobileWindowWidth = 640;
        // The amount of time used when the mobile menu fades out/in after a search
        var panFadeOutTime = 200;
        var panFadeWaitTime = 400;
        var panFadeInTime = 1200;



        var incrementsForZoom = {
          7:-0.96,
          8:-0.48,
          9:-0.24,
          10:-0.12,
          11:-0.06,
          12:-0.03,
          13:-0.015,
          14:-0.0075,
          15:-.00375,
          16:-0.002,
          17:-0.0014,
          18:-0.0008
        }

        function isMobile (){
          return ($(window).width() <= mobileWindowWidth)
        }

        function panForMobile(){
          setTimeout(function(){map.panTo([map.getCenter().lat+incrementsForZoom[map.getZoom()],map.getCenter().lng])},300);
        }

        // Create additional Control placeholders
        function addControlPlaceholders(map) {
          var corners = map._controlCorners,
              l = 'leaflet-',
              container = map._controlContainer;

          function createCorner(vSide, hSide) {
              var className = l + vSide + ' ' + l + hSide;

              corners[vSide + hSide] = L.DomUtil.create('div', className, container);
          }

          // createCorner('verticalcenter', 'left');
          // createCorner('verticalcenter', 'right');
          // createCorner('horizontalcenter', 'top');
          // createCorner('horizontalcenter', 'bottom');
          createCorner('raisedbottom', 'right');
        }
        addControlPlaceholders(map);

        optionsObject = {position: settings.position};

        // Position to custom position mobile view
        if (isMobile()) {
          optionsObject = {position: 'raisedbottomright'};
        }


        // Define the search control
        var searchControl = L.Control.extend({
          options: optionsObject,
          onAdd: function(map) {
            var container = L.DomUtil.create('div', 'searchControl-container');
            //L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
            L.DomEvent.disableClickPropagation(container);
            L.DomEvent.on(container, 'mousewheel', L.DomEvent.stopPropagation);
            return container;
          }
        })



        // Base PHP URL
        basePhpURL = 'https://maps.sco.wisc.edu/searchControl/index.php?'

        // Create a search control
        mySearchControl = new searchControl();

        // Add the search control to the map
        map.addControl(mySearchControl);

        // Add Search Text to the search control
        $('.searchControl-container').append('<div id = "searchText-div"></div>');
        if (!isMobile()) {
          $('#searchText-div').append(settings.searchText);
        }else{
          // $('#searchText-div').append('<img id = "searchText" src='+searchLocationIconURL+' alt="search-location-icon" height="20px" width="20px">');
          $('#searchText-div').append('Search <span id = "searchText" class="searchIcon" style="margin-top:3px;"></span>');
        }

        // Add listener for when the search icon is clicked
        $('#searchText-div').on('click', function(){showMenu();});

        // Add menu and content
        $('.searchControl-container').append('<div id="menu-div" style="background-color: #F0F8FF;"><h5 id="searchLocation-div" style="color: gray; line-height: 1.5; padding-left: 12px;"></h5></div>');
        $('#searchLocation-div')[0].innerHTML = settings.searchText;
        $('#menu-div').append('<div id = "timesIcon-div"></div>');
        $('#menu-div').append('<div id = "searchOptions-div" class="accordion"></div>');

        // Add Times Icon to close the search options menu
        // $('#timesIcon-div').append('<img id = "timesIcon" class="times-circle-icon" src='+timesCircleIconURL+' alt="times-circle-icon">');
        $('#timesIcon-div').append('<span id = "timesIcon" class="timesCircleIcon" style="display: inline-block;"></span>');


        // Add listener for when the times icon is clicked
        $('#timesIcon-div').on('click', function(){hideMenu();});

        // Function to display the search options menu (when search icon is clicked)
        function showMenu() {


          $('#searchText-div').fadeOut(1);
          $('#menu-div').fadeIn(500);

          // If in mobile view, also need to adjust margins
          if (isMobile()) {

            //If the header is being used, it there will be a menuToggle element
            //This needs to be hidden while the menu is open or it will overlap it
            if($('#menuToggle').length){
              $('#menuToggle').fadeOut(1);
            }

            $(".searchControl-container").css({
              "margin-bottom":"0",
              "margin-right": "0"
            });

            // Calculate and set the correct height for the contentSlider div if not yet set
            if($('.contentSlider').css("height") == "0px"){
              var contentSliderHeight = $("#menu-div").outerHeight(true);
              if(contentSliderHeight > 311){
                contentSliderHeight += "px";
                $(".contentSlider").css({
                  "height": contentSliderHeight
                });
              }else{
                $(".contentSlider").css({
                  "height": "311px"
                });
              }
            }

            // Calculate and set the correct height for the resultsSlider div if not yet set
            if($('.resultsSlider').css("height") == "0px"){
              var resultsSliderHeight = $("#menu-div").outerHeight(true);
              if(resultsSliderHeight > 311){
                resultsSliderHeight += "px";
                $(".resultsSlider").css({
                  "height": resultsSliderHeight
                });
              }else{
                $(".resultsSlider").css({
                  "height": "311px"
                });
              }
            }
          }

        }

        // Function to hide the search options menu (when X icon is clicked)
        function hideMenu() {
          $('#menu-div').fadeOut(1);
          $('#searchText-div').fadeIn(500);

          // If in mobile view, also need to adjust margins
          if (isMobile()) {

            //If the header is being used, it there will be a menuToggle element
            //This needs to be revealed when the menu closes
            if($('#menuToggle').length){
              $('#menuToggle').fadeIn(500);
            }

            $(".searchControl-container").css({
              "margin-bottom":"6vh",
              "margin-right": "10px"
            });
          }
        }

        function fadeMenu() {
          $('.searchControl-container').fadeTo(panFadeOutTime, 0, function() {
            setTimeout(function() {$('.searchControl-container').fadeTo(panFadeInTime, 1);}, panFadeWaitTime);
          });
        }


        // Add search options in order specified by settings.order
        for(index in settings.order) {
          var settingName = settings.order[index];

          if(settingName == "latLng" && settings.latLng) {addLatLngSearch();};
          if(settingName == "address" && settings.address) {addAddressSearch();};
          if(settingName == "gazetteer" && settings.gazetteer) {addGazetteerSearch();};
          if(settingName == "county" && settings.county) {addCountySearch();};
          if(settingName == "cityTownVillage" && settings.cityTownVillage) {addCityTownVillage();};
          if(settingName == "twnRng" && settings.twnRng) {addtwnRngSearch();};
          if(settingName == "twnRngSec" && settings.twnRngSec) {addtwnRngSecSearch();};
          // if(settingName == "quad" && settings.quad) {addQuadSearch();};
        }

        // Enable tooltips
          $(function () {
            $('[data-toggle="tooltip"]').tooltip()
          })

        /******************************* Individual functions to add search options *****************************/

        function addLatLngSearch(){

          // Add collapsable element to the search options that opens on click
          $('#searchOptions-div').append(
            '<div class="card" !important;"> \
              <div class="card-header" id="latLngHeader"> \
                <h5 class="mb-0" data-toggle="tooltip" data-placement="left" title="Zoom to a lat/lon point using either decimal degrees or degrees/minutes/seconds"> \
                  <div class="searchOptionHeader collapsed" data-toggle="collapse" data-target="#latLngCollapse" aria-expanded="false" aria-controls="latLngCollapse"> \
                    <div class="circle-right-icon-container"><span class = "circle-right-icon"></span></div> \
                    <b style="font-family:Arial; font-size:85%;"> Latitude / Longitude </b> \
              </div></h5></div> \
              <div id="latLngCollapse" class="collapse" aria-labelledby="latLngHeader" data-parent="#searchOptions-div"> \
                <div id="latLngContent" class="card-body"></div> \
            </div></div><span class="sexy_line"></span>');
          // Add content to the collapsable element (input fields, dropdowns, submit button, etc)
          $('#latLngContent').append(
            '<form id="latLngForm" style="padding-left: 25px; padding-right: 5px;"> \
              <div class="bootstrap-select">Select input format:\
                <span style=\'margin-right:0px; display:inline-block;\'></span> \
                <select class="form-control form-control-sm" id="parSelect" name="parSelect" style="width:140px; height: 30px; display:inline-block;"> \
                  <option value="DD" selected>Decimal Degrees</option> \
                  <option value="DMS">Deg/Min/Sec</option> \
              </select></div> \
              <span style=\'display:inline-block;\'></span> \
              <div id="latLonValues"></div> \
              <button id="latLngSubmit" type="submit" value="submit" class="btn btn-outline-secondary">Go!</button> \
            </form>');

          // Add click listener to searchOptionHeader to rotate arrow when the header is clicked if not in mobile view
          if (!isMobile()) {
            $('#latLngHeader').find('span.circle-right-icon')[0].style.WebkitTransitionDuration='0.5s';
            $('#latLngHeader').click(function() {
              if($('#latLngHeader').find('div.searchOptionHeader').hasClass('collapsed')){
                for(i = 0; i  < $('.circle-right-icon').length; i++){
                  $('.circle-right-icon')[i].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
                }
                $('#latLngHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(90deg) translate(0px, 0px)';
              }else{
                $('#latLngHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
              }
            });
          }



          $('#latLonValues').append(
          '<div class="form-group" id="ddValues" style="display: visible"> \
            <div class="form-group row" id="latValue"> \
              <div ><input type="text" style="margin: 0px 15px; width: 150px;" class="form-control" id="latInput" placeholder="Latitude" style="font-size: 1.2em;"></div> \
              <label for="latInput" style="margin:auto 0px">N</label> \
            </div> \
            <div class="form-group row" id="lonValue"> \
              <div ><input type="text" style="margin: 0px 15px; width: 150px;" class="form-control" id="lngInput" placeholder="Longitude" style="font-size: 1.2em;"></div> \
              <label for="lngInput" style="margin:auto 0px">W</label> \
          </div></div>');
          $('#latLonValues').append(
          '<div class="form-group" id="dmsValues" style="display: none"> \
            <label for="latInputs">Latitude:</label> \
            <div class="form-group row" id="latInputs" style="margin-left: 0px;"> \
              <div ><input type="text" style="margin: 0px 3px; width: 80px;" class="form-control font-size: 1.2em;" id="latDegreeInput" placeholder="Degree"></div> \
              <div ><input type="text" style="margin: 0px 3px; width: 80px;" class="form-control font-size: 1.2em;" id="latMinuteInput" placeholder="Minute"></div> \
              <div ><input type="text" style="margin: 0px 3px; width: 80px;" class="form-control font-size: 1.2em;" id="latSecondInput" placeholder="Second"></div> \
              <label for="latSecondInput" style="margin:auto 0px">N</label> \
            </div> \
            <label for="lngInput">Longitude:</label> \
            <div class="form-group row" id="lngInputs" style="margin-left: 0px;"> \
              <div ><input type="text" style="margin: 0px 3px; width: 80px;" class="form-control font-size: 1.2em;" id="lngDegreeInput" placeholder="Degree"></div> \
              <div ><input type="text" style="margin: 0px 3px; width: 80px;" class="form-control font-size: 1.2em;" id="lngMinuteInput" placeholder="Minute"></div> \
              <div ><input type="text" style="margin: 0px 3px; width: 80px;" class="form-control font-size: 1.2em;" id="lngSecondInput" placeholder="Second"></div> \
              <label for="lngSecondInput" style="margin:auto 0px">W</label> \
            </div> \
          </div>');

          $( "#parSelect" ).on( "change", function( event ) {
            var select = $('#parSelect')[0].selectedOptions[0].label;
            if (select == "Deg/Min/Sec") {
              $('#ddValues')[0].style.display="none";
              $('#dmsValues')[0].style.display="block";
            } else {
              $('#ddValues')[0].style.display="block";
              $('#dmsValues')[0].style.display="none";
            }
          });

          // On submit
          $('#latLngForm').submit(function(){

            event.preventDefault();

            $('#latLngResults').remove();

            // Add results div to search options
            $('#latLngContent').append('<div id="latLngResults" class="results"></div>');


            // Remove existing marker from map to avoid confusion
            if (marker != null) {
              map.removeLayer(marker);
            }

            var select = document.getElementById("parSelect").value;
            if (select == "DD") {
              // Get lat and lng from inputs
              var lat = parseFloat(document.getElementById("latInput").value);
              var lng = parseFloat(document.getElementById("lngInput").value);
              // Check if the parse to float was successful
              if (Number.isNaN(lat) || Number.isNaN(lng)) {
                // alert('Invalid search parameters');
                // If invalid parameters, print message
                $('#latLngResults').append('<br>Invalid search parameters.<br>Refine search and try again.');
              }
              // Check if the lat and lng numbers are valid
              if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
                // alert('Invalid search parameters');
                // If invalid parameters, print message
                $('#latLngResults').append('<br>Invalid search parameters.<br>Refine search and try again.');
              } else {
                if (lng > 0) {lng = lng*-1};
                // Check if out of bounds
                if (lat < 42.491983 || lat > 47.080621 || lng < -92.888114 || lng > -86.805415){
                  // Alert if out of bounds
                  // alert('No result found in WI.  Please refine search and try again.');
                  // If no results, print message
                  $('#latLngResults').append('<br>No results found in WI.<br>Refine search and try again.');
                } else {
                  // Make search control slightly transparent on map pan for a moment to show marker location
                  if(isMobile()){
                    // fadeMenu();
                  }
                  // Else zoom and pan map to coordinates
                  map.setView([lat,lng],12);

                  // If we're in mobile view, pan the map up slightly
                  if(isMobile()){
                    panForMobile();
                  }

                  // Update marker
                  if (marker != null) {
                    map.removeLayer(marker);
                  }
                  marker = L.marker([lat, lng]);
                  marker.addTo(map);
                }
              }
            } else {
              // Get lat and lng from inputs
              var latDegree = document.getElementById("latDegreeInput").value;
              var latMinute = document.getElementById("latMinuteInput").value;
              var latSecond = document.getElementById("latSecondInput").value;
              var lngDegree = document.getElementById("lngDegreeInput").value;
              var lngMinute = document.getElementById("lngMinuteInput").value;
              var lngSecond = document.getElementById("lngSecondInput").value;

              // Change all blank inputs to 0; parse inputs to float
              latSecond == "" ? latSecond = 0 : (latSecond = parseFloat(latSecond));
              latMinute == "" ? latMinute = 0 : (latMinute = parseFloat(latMinute));
              latDegree == "" ? latDegree = 0 : (latDegree = parseFloat(latDegree));
              lngSecond == "" ? lngSecond = 0 : (lngSecond = parseFloat(lngSecond));
              lngMinute == "" ? lngMinute = 0 : (lngMinute = parseFloat(lngMinute));
              lngDegree == "" ? lngDegree = 0 : (lngDegree = parseFloat(lngDegree));

              // If there was a value that coudln't be parsed to a float, alert the user
              if (Number.isNaN(latSecond) || Number.isNaN(latMinute) ||Number.isNaN(latDegree) ||Number.isNaN(lngSecond) || Number.isNaN(lngMinute) || Number.isNaN(lngDegree)) {
                // alert('Invalid search parameters');
                // If invalid parameters, print message
                $('#latLngResults').append('<br>Invalid search parameters.<br>Refine search and try again.');
              } else {
                // Check that the minute and second fields are not negative
                if (latDegree < -90 || latDegree > 90 || lngDegree < -180 || lngDegree > 180 || latMinute < 0 || latMinute >= 60 || latSecond < 0 || latSecond >= 60 || lngMinute < 0 || lngMinute >= 60 || lngSecond < 0 || lngSecond >= 60) {
                  // alert('Invalid search parameters');
                  // If invalid parameters, print message
                  $('#latLngResults').append('<br>Invalid search parameters.<br>Refine search and try again.');
                // Check that the degree, minute and second fields are not decimal numbers
                } else if (latMinute % 1 != 0 || latDegree % 1 != 0 || lngMinute % 1 != 0 || lngDegree % 1 != 0) {
                  // alert('Invalid search parameters');
                  // If invalid parameters, print message
                  $('#latLngResults').append('<br>Invalid search parameters.<br>Refine search and try again.');
                } else {
                  // If the longitude is positive, automatically set it to negative
                  if (lngDegree > 0) {lngDegree = lngDegree*-1};

                  // Convert degree-minute-second (DMS) input to decimal degree (DD)
                  lat = (latSecond/3600.00) + (latMinute/60.00) + latDegree;
                  lng = (lngSecond/3600.00) + (lngMinute/60.00) + lngDegree;

                  // Check if out of bounds
                  if (lat < 42.491983 || lat > 47.080621 || lng < -92.888114 || lng > -86.805415) {
                    // Alert if out of bounds
                    // alert('No result found in WI.  Please refine search and try again.');
                    // If no results, print message
                    $('#latLngResults').append('<br>No results found in WI.<br>Refine search and try again.');
                  } else {
                    // Make search control slightly transparent on map pan for a moment to show marker location
                    if(isMobile()){
                      // fadeMenu();
                    }
                    // Else zoom and pan map to coordinates
                    map.setView([lat,lng],12);

                    // If we're in mobile view, pan the map up slightly
                    if(isMobile()){
                      panForMobile();
                    }

                    // Update marker
                    marker = L.marker([lat, lng]);
                    marker.addTo(map);
                  }
                }
              }
            }
          })
        }


        function addAddressSearch() {

          // Add collapsable element to the search options that opens on click
          $('#searchOptions-div').append(
            '<div class="card"> \
              <div class="card-header" id="addressHeader"> \
                <h5 class="mb-0"data-toggle="tooltip" data-placement="left" title="Find a street address using the WI Legislature\'s geocoder"> \
                  <div class="searchOptionHeader collapsed" data-toggle="collapse" data-target="#addressCollapse" aria-expanded="false" aria-controls="addressCollapse"> \
                    <div class="circle-right-icon-container"><span class = "circle-right-icon"></span></div> \
                    <b style="font-family:Arial; font-size:85%;"> Street Address </b>\
              </div></h5></div> \
              <div id="addressCollapse" class="collapse" aria-labelledby="addressHeader" data-parent="#searchOptions-div"> \
                <div id="addressContent" class="card-body"> \
            </div></div></div><span class="sexy_line"></span>');
          // Add content to the collapsable element (input fields, dropdowns, submit button, etc)
          $('#addressContent').append('<form id="addressForm" style="padding-left: 25px; padding-right: 15px;"><div class="input-group"><input type="text" class="form-control" id="addressInput" placeholder="Enter street address, city, zip" style="font-size:1.3em"><div class="input-group-append"><button id="addressSubmit" type="submit" value="submit" class="btn btn-outline-secondary">Go!</button></div></div></form>')

          // Add click listener to searchOptionHeader to rotate arrow when the header is clicked if not in mobile view
          if (!isMobile()) {
            $('#addressHeader').find('span.circle-right-icon')[0].style.WebkitTransitionDuration='0.5s';
            $('#addressHeader').click(function() {
              if($('#addressHeader').find('div.searchOptionHeader').hasClass('collapsed')){
                for(i = 0; i  < $('.circle-right-icon').length; i++){
                  $('.circle-right-icon')[i].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
                }
                $('#addressHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(90deg) translate(0px, 0px)';
              }else{
                $('#addressHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
              }
            });
          }

          // On clicking the submit button
          $('#addressForm').submit(function(){
            event.preventDefault();
            // Remove existing marker from map to avoid confusion
            if (marker != null) {
              map.removeLayer(marker);
            }

            // Get input address
            var address = document.getElementById("addressInput").value;

            $("#addressResults").remove()
            if (address.trim() != ""){
              $('#addressContent').append('<div id="addressResults" class="results">Loading results...</div>');
            }

            // Construct php url
            var phpURL = basePhpURL + 'streetAddress=' + address;

            // use jQuery to call the API and get the JSON results
            $.getJSON(phpURL, function (data) {

            }).done(function(data){


              // Clear any previous results
              addressResultsObject = {};
              $('#addressResults').remove();

              // Add results div to search options
              if(isMobile()){
                $('.resultsSlider').append('<ul id="addressResults" class="results"></ul>');
                var resultsHeight = ($(".resultsSlider").outerHeight(true) - 38) + 'px';
                $('#addressResults').css({
                  "maxHeight": resultsHeight
                })
              }else{
                $('#addressContent').append('<ul id="addressResults" class="results"></ul>');
              }

              // Check if there is a result
              if(data.rows){
                if(data.rows.length > 0){

                  // For each result
                  for(i=0; i<data.rows.length; i++){

                    // Create result div
                    var result = L.DomUtil.create('li', 'result');
                    result.id = "addressResult"+i;

                    // Add content (address)
                    result.innerHTML = data.rows[i].display_name;

                    // Add result to the addressResults div
                    $('#addressResults').append(result);
                    // Add result to our results array
                    addressResultsObject[result.id] = data.rows[i];

                    // Add event listener for each result to zoom/pan on click
                    $('#addressResult'+i).on('click', function(){

                      // Remove existing marker from map to avoid confusion
                      if (marker != null) {
                        map.removeLayer(marker);
                      }

                      var idNum = this.id.slice(13);
                      // Make search control slightly transparent on map pan for a moment to show marker location if mobile
                      if(isMobile()){
                        // fadeMenu();
                      }
                      // Zoom on map
                      map.setView(addressResultsObject["addressResult" + idNum].coordinates,16);

                      // If we're in mobile view, pan the map up slightly
                      if(isMobile()){
                        panForMobile();
                      }

                      // Update marker
                      marker = L.marker(addressResultsObject["addressResult" + idNum].coordinates);
                      marker.addTo(map);

                    })


                  } // End results for loop

                }else{
                  // If no results, print message
                  if(isMobile()){
                    $('.resultsSlider').append('<div style="text-align: center"><h4><br>No results found in WI.<br>Refine search and try again.</h4></div>');
                  }else{
                    $('#addressResults').append('<div id="addressError"><br>No results found in WI.<br>Refine search and try again.</div>');
                  }
                }
              }else{
                // If no results, print message
                if(isMobile()){
                  $('.resultsSlider').append('<div style="text-align: center"><h4><br>No results found in WI.<br>Refine search and try again.</h4></div>');
                }else{
                  $('#addressResults').append('<div id="addressError"><br>No results found in WI.<br>Refine search and try again.</div>');
                }
              }
            })


          })
        }

        function addGazetteerSearch() {

          // Add collapsable element to the search options that opens on click
          $('#searchOptions-div').append(
            '<div class="card"> \
              <div class="card-header" id="gazetteerHeader"> \
                <h5 class="mb-0" data-toggle="tooltip" data-placement="left" title="Search OpenStreetMap for geographic names including landmarks, points of interest, and businesses"> \
                  <div class="searchOptionHeader collapsed" data-toggle="collapse" data-target="#gazetteerCollapse" aria-expanded="false" aria-controls="gazetteerCollapse"> \
                    <div class="circle-right-icon-container"><span class = "circle-right-icon"></span></div> \
                    <b style="font-family:Arial; font-size:85%;"> Gazetteer Search </b>\
              </div></h5></div> \
              <div id="gazetteerCollapse" class="collapse" aria-labelledby="gazetteerHeader" data-parent="#searchOptions-div"> \
                <div id="gazetteerContent" class="card-body"> \
            </div></div></div><span class="sexy_line"></span>');
          // Add content to the collapsable element (input fields, dropdowns, submit button, etc)
          $('#gazetteerContent').append('<form id="gazetteerForm" style="padding-left: 25px; padding-right: 15px;"><div class="input-group"><input type="text" class="form-control" id="gazetteerInput" placeholder="Enter name to find"><div class="input-group-append"><button id="gazetteerSubmit" type="submit" value="submit" class="btn btn-outline-secondary">Go!</button></div></div><small id="emailHelp" class="form-text text-muted">Example: East Towne Mall</small></form>');

          // Add click listener to searchOptionHeader to rotate arrow when the header is clicked if not in mobile view
          if (!isMobile()) {
            $('#gazetteerHeader').find('span.circle-right-icon')[0].style.WebkitTransitionDuration='0.5s';
            $('#gazetteerHeader').click(function() {
              if($('#gazetteerHeader').find('div.searchOptionHeader').hasClass('collapsed')){
                for(i = 0; i  < $('.circle-right-icon').length; i++){
                  $('.circle-right-icon')[i].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
                }
                $('#gazetteerHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(90deg) translate(0px, 0px)';
              }else{
                $('#gazetteerHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
              }
            });
          }

          // On submit
          $('#gazetteerForm').submit(function(){

            event.preventDefault();

            // Get input address
            var place = document.getElementById("gazetteerInput").value;

            $("#gazetteerResults").remove()
            if (place.trim() != ""){
              $('#gazetteerContent').append('<ul id="gazetteerResults" class="results">Loading results...</ul>');
            }

            // Remove existing marker from map to avoid confusion
            if (marker != null) {
              map.removeLayer(marker);
            }

            // Construct php url
            var phpURL = basePhpURL + 'gazetteer=' + place;

            // use jQuery to call the API and get the JSON results
            $.getJSON(phpURL, function (data) {

            }).done(function(data){

              // Clear any previous results
              gazetteerResultsObject = {};
              $('#gazetteerResults').remove();

              // Add results div to search options
              if(isMobile()){
                $('.resultsSlider').append('<ul id="gazetteerResults" class="results"></ul>');
                var resultsHeight = ($(".resultsSlider").outerHeight(true) - 38) + 'px';
                $('#gazetteerResults').css({
                  "margin-top": "0px",
                  "padding-right": "40px",
                  "maxHeight": resultsHeight
                })
              }else{
                $('#gazetteerContent').append('<ul id="gazetteerResults" class="results"></ul>');
              }

              if(data.rows){
                // Check if there is a result
                if(data.rows.length > 0){

                  // For each result
                  for(i=0; i<data.rows.length; i++){

                    // Create result div
                    var result = L.DomUtil.create('li', 'result');
                    result.id = "gazetteerResult"+i;

                    // Add content (gazetteer)
                    result.innerHTML = data.rows[i].display_name;

                    // Add result to the gazetteerResults div
                    $('#gazetteerResults').append(result);
                    // Add result to our results array
                    gazetteerResultsObject[result.id] = data.rows[i];

                    // Add event listener for each result to zoom/pan on click
                    $('#gazetteerResult'+i).on('click', function(){

                      // Remove existing marker from map to avoid confusion
                      if (marker != null) {
                        map.removeLayer(marker);
                      }

                      var idNum = this.id.slice(15);
                      // Access the bounding box
                      var bbox = gazetteerResultsObject["gazetteerResult" + idNum].bbox;
                      // Make search control slightly transparent on map pan for a moment to show marker location if mobile
                      if(isMobile()){
                        // fadeMenu();
                      }
                      // Zoom to bounds
                      map.fitBounds([bbox.sw,bbox.ne]);

                      // If we're in mobile view, pan the map up slightly
                      if(isMobile()){
                        panForMobile();
                      }

                      // Update marker
                      marker = L.marker(gazetteerResultsObject["gazetteerResult" + idNum].coordinates);
                      marker.addTo(map);

                    })


                  } // End results for loop

                }else{
                  // If no results, print message
                  if(isMobile()){
                    $('.resultsSlider').append('<div style="text-align: center"><h4><br>No results found in WI.<br>Refine search and try again.</h4></div>');
                  }else{
                    $('#gazetteerResults').append('<br>No results found in WI.<br>Refine search and try again.');
                  }
                }
              }else{
                // If no results, print message
                if(isMobile()){
                  $('.resultsSlider').append('<div style="text-align: center"><h4><br>No results found in WI.<br>Refine search and try again.</h4></div>');
                }else{
                  $('#gazetteerResults').append('<br>No results found in WI.<br>Refine search and try again.');
                }
              }
            })



          })
        }



        function addCountySearch() {

          // Add collapsable element to the search options that opens on click
          $('#searchOptions-div').append(
            '<div class="card"> \
              <div class="card-header" id="countyHeader"> \
                <h5 class="mb-0" data-toggle="tooltip" data-placement="left" title="Zoom to a Wisconsin county" > \
                  <div class="searchOptionHeader collapsed" data-toggle="collapse" data-target="#countyCollapse" aria-expanded="false" aria-controls="countyCollapse"> \
                      <div class="circle-right-icon-container"><span class = "circle-right-icon"></span></div> \
                      <b style="font-family:Arial; font-size:85%;"> County </b>\
              </div></h5></div> \
              <div id="countyCollapse" class="collapse" aria-labelledby="countyHeader" data-parent="#searchOptions-div"><div id="countyContent" class="card-body"> \
            </div></div></div><span class="sexy_line"></span>');
          // Populate options
          var countyOptions = '<option>Adams</option><option>Ashland</option><option>Barron</option><option>Bayfield</option><option>Brown</option><option>Buffalo</option><option>Burnett</option><option>Calumet</option><option>Chippewa</option><option>Clark</option><option>Columbia</option><option>Crawford</option><option>Dane</option><option>Dodge</option><option>Door</option><option>Douglas</option><option>Dunn</option><option>Eau Claire</option><option>Florence</option><option>Fond du Lac</option><option>Forest</option><option>Grant</option><option>Green</option><option>Green Lake</option><option>Iowa</option><option>Iron</option><option>Jackson</option><option>Jefferson</option><option>Juneau</option><option>Kenosha</option><option>Kewaunee</option><option>La Crosse</option><option>Lafayette</option><option>Langlade</option><option>Lincoln</option><option>Manitowoc</option><option>Marathon</option><option>Marinette</option><option>Marquette</option><option>Menominee</option><option>Milwaukee</option><option>Monroe</option><option>Oconto</option><option>Oneida</option><option>Outagamie</option><option>Ozaukee</option><option>Pepin</option><option>Pierce</option><option>Polk</option><option>Portage</option><option>Price</option><option>Racine</option><option>Richland</option><option>Rock</option><option>Rusk</option><option>Sauk</option><option>Sawyer</option><option>Shawano</option><option>Sheboygan</option><option>St. Croix</option><option>Taylor</option><option>Trempealeau</option><option>Vernon</option><option>Vilas</option><option>Walworth</option><option>Washburn</option><option>Washington</option><option>Waukesha</option><option>Waupaca</option><option>Waushara</option><option>Winnebago</option><option>Wood</option>';
          // Add content to the collapsable element (input fields, dropdowns, submit button, etc)
          $('#countyContent').append('<select class="form-control form-control-sm" name="countySelect" id="countySelect" style="width: 200px; height: 30px; display:inline-block; margin-left: 25px;"><option selected disabled>Choose a county</option>'+countyOptions+'</select>')

          // Add submit button
          // $('#countyContent').append('<form id="countyForm"><button id="countySubmit" type="submit" value="submit" class="btn btn-outline-secondary">Go!</button></form>');

          // Add click listener to searchOptionHeader to rotate arrow when the header is clicked if not in mobile view
          if (!isMobile()) {
            $('#countyHeader').find('span.circle-right-icon')[0].style.WebkitTransitionDuration='0.5s';
            $('#countyHeader').click(function() {
              if($('#countyHeader').find('div.searchOptionHeader').hasClass('collapsed')){
                for(i = 0; i  < $('.circle-right-icon').length; i++){
                  $('.circle-right-icon')[i].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
                }
                $('#countyHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(90deg) translate(0px, 0px)';
              }else{
                $('#countyHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
              }
            });
          }

          // On selecting a county
          $( "#countySelect" ).on( "change", function( event ) {

            // Remove existing marker from map to avoid confusion
            if (marker != null) {
              map.removeLayer(marker);
            }

            // event.preventDefault();

            // Construct php url
            var phpURL = basePhpURL + 'county=' + $('#countySelect')[0].selectedOptions[0].label;

            // use jQuery to call the API and get the JSON results
            $.getJSON(phpURL, function (data) {

            }).done(function(data){

              // Access the bounding box
              var bbox = data.rows[0].bbox;
              // Make search control slightly transparent on map pan for a moment to show location if mobile
              if(isMobile()){
                // fadeMenu();
              }
              // Zoom to bounds
              map.fitBounds([bbox.sw,bbox.ne]);

              // If we're in mobile view, pan the map up slightly
              if(isMobile()){
                panForMobile();
              }

            })

          });


        }

        function addCityTownVillage() {

          // Add collapsable element to the search options that opens on click
          $('#searchOptions-div').append(
            '<div class="card"> \
              <div class="card-header" id="cityTownVillageHeader"> \
                <h5 class="mb-0" data-toggle="tooltip" data-placement="left" title="Zoom to a Wisconsin municipality"> \
                  <div class="searchOptionHeader collapsed" data-toggle="collapse" data-target="#cityTownVillageCollapse" aria-expanded="false" aria-controls="cityTownVillageCollapse"> \
                    <div class="circle-right-icon-container"><span class = "circle-right-icon"></span></div> \
                    <b style="font-family:Arial; font-size:85%;"> City, Town, or Village</b> \
              </div></h5></div> \
              <div id="cityTownVillageCollapse" class="collapse" aria-labelledby="cityTownVillageHeader" data-parent="#searchOptions-div"> \
                <div id="cityTownVillageContent" class="card-body"> \
            </div></div></div><span class="sexy_line"></span>');
          // Add content to the collapsable element (input fields, dropdowns, submit button, etc)
          $('#cityTownVillageContent').append('<form id="cityTownVillageForm" style="padding-left: 25px; padding-right: 15px;"><div class="input-group"><input type="text" class="form-control" id="cityTownVillageInput" placeholder="Enter municipality name"><div class="input-group-append"><button id="cityTownVillageSubmit" type="submit" value="submit" class="btn btn-outline-secondary">Go!</button></div></div><small id="municipalityHelp" class="form-text text-muted">Hint: Do not enter "City of", "Town of", or "Village of"</small></form>')

          // Add click listener to searchOptionHeader to rotate arrow when the header is clicked if not in mobile view
          if (!isMobile()) {
            $('#cityTownVillageHeader').find('span.circle-right-icon')[0].style.WebkitTransitionDuration='0.5s';
            $('#cityTownVillageHeader').click(function() {
              if($('#cityTownVillageHeader').find('div.searchOptionHeader').hasClass('collapsed')){
                for(i = 0; i  < $('.circle-right-icon').length; i++){
                  $('.circle-right-icon')[i].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
                }
                $('#cityTownVillageHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(90deg) translate(0px, 0px)';
              }else{
                $('#cityTownVillageHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
              }
            });
          }

          // On submit
          $('#cityTownVillageForm').submit(function(){
            event.preventDefault();

            $("#cityTownVillageResults").remove()
            if (document.getElementById("cityTownVillageInput").value.trim() != ""){
              $('#cityTownVillageContent').append('<div id="cityTownVillageResults" class="results">Loading Results...</div>');
            }

            // Remove existing marker from map to avoid confusion
            if (marker != null) {
              map.removeLayer(marker);
            }


            // Construct php url
            var phpURL = basePhpURL + 'cityTownVillage=' + document.getElementById("cityTownVillageInput").value;

            // use jQuery to call the API and get the JSON results
            $.getJSON(phpURL, function (data) {

            }).done(function(data){

            // Clear any previous results
            cityTownVillageResultsObject = {};
            $('#cityTownVillageResults').remove();

              // Add results div to search options
              if(isMobile()){
                $('.resultsSlider').append('<ul id="cityTownVillageResults" class="results"></ul>');
                var resultsHeight = ($(".resultsSlider").outerHeight(true) - 38) + 'px';
                $('#cityTownVillageResults').css({
                  "maxHeight": resultsHeight
                })
              }else{
                $('#cityTownVillageContent').append('<ul id="cityTownVillageResults" class="results"></ul>');
              }
               // For each result:
               if(data.rows){
                for (i = 0; i < data.rows.length; i++) {

                  // Create result div
                  var result = L.DomUtil.create('li', 'result');
                  result.id = "cityTownVillageResult"+i;
                  // Add content (cityTownVillage)
                  result.innerHTML = data.rows[i].display_name;
                  // Add result to the cityTownVillageResults div
                  $('#cityTownVillageResults').append(result);
                  // Add result to our results array
                  cityTownVillageResultsObject[result.id] =data.rows[i];
                  // Add event listener for each result to zoom/pan on click
                  $('#cityTownVillageResult'+i).on('click', function(){

                    // Remove existing marker from map to avoid confusion
                    if (marker != null) {
                      map.removeLayer(marker);
                    }

                    var idNum = this.id.slice(21);
                    // Access the bounding box
                    var bbox = cityTownVillageResultsObject["cityTownVillageResult"+idNum].bbox;

                    var sw = bbox.sw;
                    var ne = bbox.ne;

                    // Make search control slightly transparent on map pan for a moment to show marker location if mobile
                    if(isMobile()){
                      // fadeMenu();
                    }
                    // Zoom to bounds
                    map.fitBounds([sw,ne]);

                    // If we're in mobile view, pan the map up slightly
                    if(isMobile()){
                      panForMobile();
                    }

                    // Update marker
                    marker = L.marker(cityTownVillageResultsObject["cityTownVillageResult"+idNum].coordinates);
                    marker.addTo(map);

                  })


                } // End results for loop
              }

               // If there were no results in WI found
               if(jQuery.isEmptyObject(cityTownVillageResultsObject)){
                if(isMobile()){
                  $('.resultsSlider').append('<div style="text-align: center"><h4><br>No results found in WI.<br>Refine search and try again.</h4></div>');
                }else{
                  $('#cityTownVillageResults').append('<br>No results found in WI.<br>Refine search and try again.');
                }
               }

             }) // End getJSON
          })
        }


        function addtwnRngSearch() {

          // Add collapsable element to the search options that opens on click
          $('#searchOptions-div').append(
            '<div class="card"> \
              <div class="card-header" id="twnRngHeader"> \
                <h5 class="mb-0" data-toggle="tooltip" data-placement="left" title="Zoom to a Public Land Survey System Township-Range"> \
                  <div class="searchOptionHeader collapsed" data-toggle="collapse" data-target="#twnRngCollapse" aria-expanded="false" aria-controls="twnRngCollapse"> \
                    <div class="circle-right-icon-container"><span class = "circle-right-icon"></span></div> \
                    <b style="font-family:Arial; font-size:85%;"> Township & Range</b> \
              </div></h5></div> \
              <div id="twnRngCollapse" class="collapse" aria-labelledby="twnRngHeader" data-parent="#searchOptions-div"> \
                <div id="twnRngContent" class="card-body"> \
            </div></div></div><span class="sexy_line"></span>');

          // Populate options
          var townOptions = '<option value="" disabled selected>Town</option>';
          for (i = 1; i < 54; i++){
            townOptions += '<option>T'+i+'</option>'
          }
          // Populate options
          var rangeOptions = '<option value="" disabled selected>Range</option>';
          for (i=1; i<32;i++){
            rangeOptions += '<option>R'+i+'</option>'
          }

          // $('#twnRngContent').append('<div class="dropdown"><button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">Town</button><div class="dropdown-menu">'+townOptions+'</div></div>')
          $('#twnRngContent').append(
            '<div class="form-group"><select class="form-control form-control-sm" id="townSelect3" name="townSelect3" style="width:80px; height: 30px; display:inline-block; margin-left: 25px">'+townOptions+'</select>'
            + '<select class="form-control form-control-sm" id="rangeSelect3" name="rangeSelect3" style="width:85px; height: 30px; display:inline-block; margin-left: 8px">'+rangeOptions+'</select>'
            + '<select class="form-control form-control-sm" id="dirSelect3" name="dirSelect3" style="width:65px; height: 30px; display:inline-block; margin-left: 8px"><option selected disabled>Dir</option><option>E</option><option>W</option></select>'
            +'</div>'
            )


          // Add click listener to searchOptionHeader to rotate arrow when the header is clicked if not in mobile view
          if (!isMobile()) {
            $('#twnRngHeader').find('span.circle-right-icon')[0].style.WebkitTransitionDuration='0.5s';
            $('#twnRngHeader').click(function() {
              if($('#twnRngHeader').find('div.searchOptionHeader').hasClass('collapsed')){
                for(i = 0; i  < $('.circle-right-icon').length; i++){
                  $('.circle-right-icon')[i].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
                }
                $('#twnRngHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(90deg) translate(0px, 0px)';
              }else{
                $('#twnRngHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
              }
            });
          }

          // Function called when all dropdowns have values selected
          function twnRngSearchSubmit() {

            // Remove existing marker from map to avoid confusion
            if (marker != null) {
              map.removeLayer(marker);
            }

            // Extract the info from the dropdown menus
            var township = $('#townSelect3')[0].selectedOptions[0].label;
            var range = $('#rangeSelect3')[0].selectedOptions[0].label;
            var dir = $('#dirSelect3')[0].selectedOptions[0].label;

            // Convert input to ints (data table uses just the ints)
            township = township.slice(1);
            range = range.slice(1);

            var phpURL = basePhpURL + 'township=' + township + '&range=' + range + '&dir=' + dir;

            // Use AJAX to query PHP for result
            $.getJSON(phpURL, function (data) {

            }).done(function(data){

              $('#noResultsDiv').remove();

              if(data.rows){
                if(data.rows.length > 0){
                  // Access the bounding box
                  var bbox = data.rows[0].bbox;
                  // Make search control slightly transparent on map pan for a moment to show marker location if mobile
                  if(isMobile()){
                    // fadeMenu();
                  }
                  // Zoom to bounds
                  map.fitBounds([bbox.sw,bbox.ne]);

                  // If we're in mobile view, pan the map up slightly
                  if(isMobile()){
                    panForMobile();
                  }

                }else{
                  // If rows is empty, no results
                  $('#twnRngContent').append('<div id="noResultsDiv" style="text-align: center;"><br>No results found in WI.<br>Refine search and try again.</div>');
                }
              }else{
                // If rows is empty, no results
                $('#twnRngContent').append('<div id="noResultsDiv" style="text-align: center;"><br>No results found in WI.<br>Refine search and try again.</div>');
              }

            })

          };

          // Whenever a dropdown has a selection made, check if all dropdowns have something selected, and if so, perform the search
          $( "#townSelect3" ).on("change", function(e) {
            twnRngSearchSCOT = true;
            if (twnRngSearchSCOT && twnRngSearchSCOR && twnRngSearchSCOD){
              twnRngSearchSubmit();
            }
          });
          $( "#rangeSelect3" ).on("change", function(e) {
            twnRngSearchSCOR = true;
            if (twnRngSearchSCOT && twnRngSearchSCOR && twnRngSearchSCOD){
              twnRngSearchSubmit();
            }
          });
          $( "#dirSelect3" ).on("change", function(e) {
            twnRngSearchSCOD = true;
            if (twnRngSearchSCOT && twnRngSearchSCOR && twnRngSearchSCOD){
              twnRngSearchSubmit();
            }
          });
        }

        function addtwnRngSecSearch() {

          // Add collapsable element to the search options that opens on click
          $('#searchOptions-div').append(
            '<div class="card"> \
              <div class="card-header" id="twnRngSecHeader"> \
                <h5 class="mb-0" data-toggle="tooltip" data-placement="left" title="Zoom to a Public Land Survey System Township-Range-Section"> \
                  <div class="searchOptionHeader collapsed" data-toggle="collapse" data-target="#twnRngSecCollapse" aria-expanded="false" aria-controls="twnRngSecCollapse"> \
                    <div class="circle-right-icon-container"><span class = "circle-right-icon"></span></div> \
                    <b style="font-family:Arial; font-size:85%;"> Township Range & Section</b> \
              </div></h5></div> \
              <div id="twnRngSecCollapse" class="collapse" aria-labelledby="twnRngSecHeader" data-parent="#searchOptions-div"> \
                <div id="twnRngSecContent" class="card-body"> \
            </div></div></div><span class="sexy_line"></span>');

          // Populate options
          var townOptions = '<option value="" disabled selected>Town</option>';
          for (i = 1; i < 54; i++){
            townOptions += '<option>T'+i+'</option>'
          }
          // Populate options
          var rangeOptions = '<option value="" disabled selected>Rng</option>';
          for (i=1; i<32;i++){
            rangeOptions += '<option>R'+i+'</option>'
          }
          // Populate options
          var secOptions = '<option value="" disabled selected>Sec</option>';
          for (i=1; i<37;i++){
            secOptions += '<option>S'+i+'</option>'
          }

          // Add content to the collapsable element (input fields, dropdowns, submit button, etc)

          $('#twnRngSecContent').append(
            '<div class="form-group"><select class="form-control form-control-sm" id="townSelect4" name="townSelect4" style="width:75px; height: 30px; display:inline-block; margin-left: 25px">'+townOptions+'</select>'
            + '<select class="form-control form-control-sm" id="rangeSelect4" name="rangeSelect4" style="width:70px; height: 30px; display:inline-block;">'+rangeOptions+'</select>'
            + '<select class="form-control form-control-sm" id="dirSelect4" name="dirSelect4" style="width:63px; height: 30px; display:inline-block;"><option selected disabled>Dir</option><option>E</option><option>W</option></select>'
            + '<select class="form-control form-control-sm" id="secSelect4" name="secSelect4" style="width:69px; height: 30px; display:inline-block;">'+secOptions+'</select>'
            +'</div>'
            )

          // Add click listener to searchOptionHeader to rotate arrow when the header is clicked if not in mobile view
          if (!isMobile()) {
            $('#twnRngSecHeader').find('span.circle-right-icon')[0].style.WebkitTransitionDuration='0.5s';
            $('#twnRngSecHeader').click(function() {
              if($('#twnRngSecHeader').find('div.searchOptionHeader').hasClass('collapsed')){
                for(i = 0; i  < $('.circle-right-icon').length; i++){
                  $('.circle-right-icon')[i].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
                }
                $('#twnRngSecHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(90deg) translate(0px, 0px)';
              }else{
                $('#twnRngSecHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
              }
            });
          }

          // Function called when all dropdowns have values selected
          function twnRngSecSearchSubmit() {

            // Remove existing marker from map to avoid confusion
            if (marker != null) {
              map.removeLayer(marker);
            }

            // Extract the info from the dropdown menus
            var township = $('#townSelect4')[0].selectedOptions[0].label;
            var range = $('#rangeSelect4')[0].selectedOptions[0].label;
            var dir = $('#dirSelect4')[0].selectedOptions[0].label;
            var sec = $('#secSelect4')[0].selectedOptions[0].label;

            // Convert input to ints (data table uses just the ints)
            township = township.slice(1);
            range = range.slice(1);
            sec = sec.slice(1);

            var phpURL = basePhpURL + 'township=' + township + '&range=' + range + '&dir=' + dir + '&sec=' + sec;

            // Use AJAX to query PHP for result
            $.getJSON(phpURL, function (data) {

            }).done(function(data){

              $('#noResultsDiv').remove();

              if(data.rows){
                if(data.rows.length > 0){
                  // Access the bounding box
                  var bbox = data.rows[0].bbox;
                  // Make search control slightly transparent on map pan for a moment to show marker location if mobile
                  if(isMobile()){
                    // fadeMenu();
                  }
                  // Zoom to bounds
                  map.fitBounds([bbox.sw,bbox.ne]);

                  // If we're in mobile view, pan the map up slightly
                  if(isMobile()){
                    panForMobile();
                  }

                }else{
                  // If rows is empty, no results
                  $('#twnRngSecContent').append('<div id="noResultsDiv" style="text-align: center;"><br>No results found in WI.<br>Refine search and try again.</div>');
                }
              }else{
                // If rows is empty, no results
                $('#twnRngSecContent').append('<div id="noResultsDiv" style="text-align: center;"><br>No results found in WI.<br>Refine search and try again.</div>');
              }

            })

          };

          // Whenever a dropdown has a selection made, check if all dropdowns have something selected, and if so, perform the search
          $( "#townSelect4" ).on( "change", function( event ) {
            twnRngSecSearchSCOT = true;
            if (twnRngSecSearchSCOT && twnRngSecSearchSCOR && twnRngSecSearchSCOD && twnRngSecSearchSCOS){
              twnRngSecSearchSubmit();
            }
          });
          $( "#rangeSelect4" ).on( "change", function( event ) {
            twnRngSecSearchSCOR = true;
            if (twnRngSecSearchSCOT && twnRngSecSearchSCOR && twnRngSecSearchSCOD && twnRngSecSearchSCOS){
              twnRngSecSearchSubmit();
            }
          });
          $( "#dirSelect4" ).on( "change", function( event ) {
            twnRngSecSearchSCOD = true;
            if (twnRngSecSearchSCOT && twnRngSecSearchSCOR && twnRngSecSearchSCOD && twnRngSecSearchSCOS){
              twnRngSecSearchSubmit();
            }
          });
          $( "#secSelect4" ).on( "change", function( event ) {
            twnRngSecSearchSCOS = true;
            if (twnRngSecSearchSCOT && twnRngSecSearchSCOR && twnRngSecSearchSCOD && twnRngSecSearchSCOS){
              twnRngSecSearchSubmit();
            }
          });
        }


        /***************************************** Work in Progress **********************************************/
        /***************************************** Not Currently in Use **********************************************/

        function addQuadSearch() {

          // Add collapsable element to the search options that opens on click
          $('#searchOptions-div').append(
            '<div class="card"> \
              <div class="card-header" id="quadHeader"> \
                <h5 class="mb-0" data-toggle="tooltip" data-placement="left" title="Zoom to a 24K Quad"> \
                  <div class="searchOptionHeader collapsed" data-toggle="collapse" data-target="#quadCollapse" aria-expanded="false" aria-controls="quadCollapse"> \
                    <div class="circle-right-icon-container"><span class = "circle-right-icon"></span></div> \
                    <b style="font-family:Arial; font-size:85%;"> 24K Quad</b> \
              </div></h5></div> \
              <div id="quadCollapse" class="collapse" aria-labelledby="quadHeader" data-parent="#searchOptions-div"> \
                <div id="quadContent" class="card-body"> \
            </div></div></div><span class="sexy_line"></span>');

            // Add click listener to searchOptionHeader to rotate arrow when the header is clicked if not in mobile view
          if (!isMobile()) {
            $('#quadHeader').find('span.circle-right-icon')[0].style.WebkitTransitionDuration='0.5s';
            $('#quadHeader').click(function() {
              if($('#quadHeader').find('div.searchOptionHeader').hasClass('collapsed')){
                for(i = 0; i  < $('.circle-right-icon').length; i++){
                  $('.circle-right-icon')[i].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
                }
                $('#quadHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(90deg) translate(0px, 0px)';
              }else{
                $('#quadHeader').find('span.circle-right-icon')[0].style.WebkitTransform='rotate(0deg) translate(0px, 0px)';
              }
            });
          }

           // Add content to the collapsable element (input fields, dropdowns, submit button, etc)
           $('#quadContent').append('<form id="quadForm" style="padding-left: 25px; padding-right: 15px;"><div class="input-group"><input type="text" class="form-control" id="quadInput" placeholder="Enter USGS Quad ID"><div class="input-group-append"><button id="quadSubmit" type="submit" value="submit" class="btn btn-outline-secondary">Go!</button></div></div><small id="quadHelp" class="form-text text-muted">e.g. 46092-D1</small></form>');


          // On submit
          $('#quadForm').submit(function(){
            event.preventDefault();

            // Remove existing marker from map to avoid confusion
            if (marker != null) {
              map.removeLayer(marker);
            }

            // Construct php url
            var phpURL = basePhpURL + 'quad=' + document.getElementById("quadInput").value;

            // use jQuery to call the API and get the JSON results
            $.getJSON(phpURL, function (data) {

            }).done(function(data){

              $('#noResultsQuadDiv').remove();

              if(data.rows){
                if(data.rows.length > 0){
                  // Access the bounding box
                  var bbox = data.rows[0].bbox;
                  // Make search control slightly transparent on map pan for a moment to show marker location if mobile
                  if(isMobile()){
                    // fadeMenu();
                  }
                  // Zoom to bounds
                  map.fitBounds([bbox.sw,bbox.ne]);

                  // If we're in mobile view, pan the map up slightly
                  if(isMobile()){
                    panForMobile();
                  }

                }else{
                  // If rows is empty, no results
                  $('#quadContent').append('<div id="noResultsQuadDiv" style="text-align: center;"><br>No results found in WI.<br>Refine search and try again.</div>');
                }
              }else{
                // If rows is empty, no results
                $('#quadContent').append('<div id="noResultsQuadDiv" style="text-align: center;"><br>No results found in WI.<br>Refine search and try again.</div>');
              }

            })



          }) // End submit


        }

/******************************************************************** Mobile **************************************************************************************/

      // Some restyling for mobile view
      if (isMobile()) {

        // Resize font of menu header
        $('#searchLocation-div').css({
          "font-size": "1.3em"
        });

        // Resize font of card headers (search options)
        $('.collapsed').css({
          "font-size": "0.8em"
        });

        // Remove the margins from the searchControl-container
        $(".searchControl-container").css({
          "margin": "0px",
          "margin-right": "10px",
          "margin-bottom": "6vh"
        });

        // Expand the menu div to cover the entire map width
        $("#menu-div").css({
          "width": $("#map").css("width")
        });

        // Disable tooltips
        $('[data-toggle=tooltip]').tooltip('disable');

        // Disable accordion by removing the data-toggle attribute
        $('[data-toggle="collapse"]').removeAttr('data-toggle');

        // Restyle results
        if(settings.address || settings.gazetteer || settings.cityTownVillage){
          $(".results").css({
            "margin-top": "0px",
            "padding-bottom": "50px"
          });
        }

        // Create contentSlider element
        var contentSlider = L.DomUtil.create('div', 'contentSlider');
        $("#menu-div").append(contentSlider);

        // Create resultsSlider element
        var resultsSlider = L.DomUtil.create('div', 'resultsSlider');
        $("#menu-div").append(resultsSlider);

        // Add a header to the content contentSlider
        $('.contentSlider').append('<div id="contentSliderHeader" class="sliderHeader"></div>');

        // Add a back button to the header
        $('#contentSliderHeader').append('<span id = "backArrow" class = "leftArrowIcon"></span>');

        // Add a title
        var contentSliderTitle = L.DomUtil.create('div', 'contentSliderTitle');
        $("#contentSliderHeader").append(contentSliderTitle);

        // Add event listener for back button to hide contentSlider
        $('#backArrow').on('click', function() {

          // Slide content out of view
          $('.contentSlider').stop().animate({
            left: '-100%'
          }, 400);

          // Add in original padding
          var cardBody = $('.contentSlider')[0].getElementsByClassName("card-body");
          $(cardBody).removeClass('mobileContent');

          // Replace content in it's original card
          var id = $('.contentSlider')[0].getElementsByClassName("card-body")[0].id;
          id = id.slice(0,-7);
          id += 'Collapse';
          $('#'+id).append($('.contentSlider')[0].getElementsByClassName("card-body")[0]);
        });

        // Add Times Icon to close the search options menu
        $('#contentSliderHeader').append('<div class="headerTimes-div"><span id = "contentSliderTimesIcon" class = "headerTimes timesCircleIcon"></span></div>');

        // Add listener for when the times icon is clicked
        $('#contentSliderTimesIcon').on('click', function(){hideMenu();});

        // Add a header to the content contentSlider
        $('.resultsSlider').append('<div id="resultsSliderHeader" class="sliderHeader"></div>');

        // Add a back button to the content resultsSlider
        $('#resultsSliderHeader').append('<span id = "backArrow2" class = "leftArrowIcon"></span>');

        // Add a title
        var resultsSliderTitle = L.DomUtil.create('div', 'resultsSliderTitle');
        resultsSliderTitle.innerHTML = '<h5><b style="font-family:Arial; font-size:85%;">Results</b></h5>';
        $("#resultsSliderHeader").append(resultsSliderTitle);

        // Add Times Icon to close the search options menu
        $('#resultsSliderHeader').append('<div class="headerTimes-div"><span id = "resultsSliderTimesIcon" class = "headerTimes timesCircleIcon"></span></div>');

        // Add listener for when the times icon is clicked
        $('#resultsSliderTimesIcon').on('click', function(){hideMenu();});

        // Add event listener for back button to hide resultsSlider
        $('#backArrow2').on('click', function() {

          // Slide content out of view
          $('.resultsSlider').stop().animate({
            left: '-100%'
          }, 400);

          // Add in original padding
          var cardBody = $('.resultsSlider')[0].getElementsByClassName("card-body");
          $(cardBody).removeClass('mobileContent');

          $('.results').remove();

        });

        // Add click event listeners to replace the accordion effect with sliding content
        $('.card').find('.card-header').on('click', function() {

          // Add title
          contentSliderTitle.innerHTML = '<h5><b style="font-family:Arial; font-size:85%;">' + this.parentElement.getElementsByClassName("card-header")[0].getElementsByClassName("mb-0")[0].getElementsByClassName("searchOptionHeader")[0].getElementsByTagName('b')[0].innerHTML + '</b></h5>';

          // Add event listener for form submission of street, gazetteer, and ctv search
          var form = this.parentElement.getElementsByClassName("collapse")[0].getElementsByClassName("card-body")[0].getElementsByTagName('form')[0];
          if(form){
            if((form.id) != 'latLngForm' && (form.id) != 'quadForm'){
              $(form).submit(function() {
                event.preventDefault();
                // Slide in results
                $('.resultsSlider').stop().animate({
                  left: 0
                }, 400);
              })
            }
          }

          $(this.parentElement.getElementsByClassName("collapse")[0].getElementsByClassName("card-body")).addClass('mobileContent');
          $('.contentSlider').append(this.parentElement.getElementsByClassName("collapse")[0].getElementsByClassName("card-body")[0]);

          // Slide in content
          $('.contentSlider').stop().animate({
            left: 0
          }, 400);


        });

      }

    }; // End add search control




}( jQuery ));
