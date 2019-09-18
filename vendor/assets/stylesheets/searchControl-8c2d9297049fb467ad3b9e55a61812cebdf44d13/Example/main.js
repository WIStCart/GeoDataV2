var map;

function createmap (){
     
    bounds = L.latLngBounds(
		L.latLng(48.5, -82),
		L.latLng(41, -97.5)
	);
		
	map = L.map('map', {
		center: bounds.getCenter(),
		zoom: 7,
		minZoom: 7,
		maxZoom: 18,
        maxBounds: bounds
    })

   // Basemap definitions:
	satelliteBasemap = L.tileLayer('https://api.mapbox.com/styles/v1/wistcart/cj015vzhy009i2ss11iyjstb0/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2lzdGNhcnQiLCJhIjoiY2l6NjB2enI5MDZkYjMyb2Frc3RtcmFzZSJ9.U_x2EJHkCo_RWMlYunR-7g', {
		attribution: 'Imagery © <a href="https://mapbox.com">Mapbox</a>',
	}).addTo(map);


    // $(map).addSearchControl({
        
    //     address: true,
    //     gazetteer: true,
    //     county: true,
    //     cityTownVillage: true,
    //     latLng: true,
    //     twnRngSec: true,
    //     twnRng: true,
    //     position: 'topright',
    //     order: ["latLng", "address", "gazetteer", "county", "cityTownVillage", "twnRng", "twnRngSec"],

    // });

    $(map).addSearchControl({
        
        address: true,
        gazetteer: true,
        county: true,
        cityTownVillage: true,
        latLng: true,
        twnRngSec: true,
        twnRng: true,
        quad: true,
        position: 'topright',
        order: ["latLng", "address", "gazetteer", "county", "cityTownVillage", "twnRng", "twnRngSec", "quad"],

    });

    // $(map).addSearchControl({
        
    //     address: false,
    //     gazetteer: true,
    //     county: true,
    //     cityTownVillage: false,
    //     latLng: true,
    //     twnRngSec: false,
    //     twnRng: true,
    //     position: 'topright',
    //     order: ["latLng", "gazetteer", "county"],

    // });

    // $(map).addSearchControl({
        
    //     address: false,
    //     gazetteer: true,
    //     county: false,
    //     cityTownVillage: false,
    //     latLng: false,
    //     twnRngSec: false,
    //     twnRng: true,
    //     position: 'topright',
    //     order: ["gazetteer"],

    // });


}
$(document).ready(createmap);
