export const mapStyleDarkMode = [
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d6e2e6"
            }
        ]
    },
    {   // Country Border lines
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9E9E9E"
            }
        ]
    },
    {   // Country names
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                //"color": "#7492a8"
                "color": "black"
                //"color": "#C4C4C4"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "lightness": 25
            }
        ]
    },
    {   // city colors
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                //"color": "#dde2e3"
                "color": "#444444"
                //"color": "2c2c2b"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                //"color": "#cfd4d5"
                "color" : "#919191"
            }
        ]
    },
    {   // Country surfaces
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                //"color": "#dde2e3"
                "color": "#2C2C2B"
            }
        ]
    },
    {   // TBD
        "featureType": "landscape.natural",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7492a8"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                //"color": "#dde2e3"
                "color": "#919191"
            }
        ]
    },
    {   // text of places like REWE, Herrngarten, King Darmstadt ...
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                //"color": "#cc0000"
                //"color": "#a9a9a9"
                "color": "#741b47"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": -100
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                //"color": "#a9de83"
                //"color": "#79876e"
                "color": "#6e7766"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                //"color": "#bae6a1"
                "color": "#79876e"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.fill",
        "stylers": [
            {
                //"color": "#c6e8b3"
                "color": "#8a9683"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#bae6a1"
                //"color": "#8a9683"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#41626b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": -45
            },
            {
                "lightness": 10
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#919191"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                //"color": "#a6b5bb"
                "color":"#919191"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.fill",
        "stylers": [
            {
                //"color": "#9fb6bd"
                "color": "#999999"
            }
        ]
    },
    {   // big routes in neighborhood
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#919191"
            }
        ]
    },
    {   // local roads (neighborhood)
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b6b6b6"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "saturation": -70
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#919191"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#588ca4"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#008cb5"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": -5
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                //"color": "#242726"
                "color": "#191A1A"
            }
        ]
    }
]