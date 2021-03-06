'use strict';
var L = require('leaflet');

module.exports = function(itinerary, index){
	// console.log('Les plus proches: ', itinerary);

	var rank = '';
	var color = '#000000';

	if (index === 2){
		rank += 'first';
		color = '#008200';
	}

	// Get route points
	var route = itinerary.routes[0];
	console.log('test :', itinerary);

	var destination = L.latLng(route.legs[0].end_location.lat(), route.legs[0].end_location.lng());

	var path = route.overview_path;
	var routeLatLng = [];
	for (var j = 0; j < path.length; j++)
		routeLatLng[j] = {lat: path[j].lat(), lng: path[j].lng()};

	// Create and add infos on the route
	var itTime = route.legs[0].duration.value;

	var minutes = Math.floor(itTime / 60);
	var secondes = itTime % 60;
	var time = minutes + "' "  + secondes + "\" ";
	var distance = route.legs[0].distance.value;

	var myIcon, myAnchor;

	if (itTime >= 600){ // if time to display is too long for regular bubble
		myIcon = new L.Point(100, 70);
		myAnchor = new L.Point(50, 108);
	}
	else {
		myIcon = new L.Point(70, 70);
		myAnchor = new L.Point(35, 108);
	}

	var infos = L.divIcon({
		className: ['infos', rank].join(' '),
		iconSize: myIcon,
		iconAnchor: myAnchor,
		html: time + '<div class="subInfos">' + distance + ' m </div>'
	});

	var marker = L.marker(destination, {icon: infos});

	// Create route
	var polyline = L.polyline(routeLatLng, {
		className: ['route', rank].join(' '),
		color: color,
		smoothFactor: 3.0,
		noClip: true,
		opacity: 1
	});

	return {
		polyline: polyline,
		marker: marker
	};
};
