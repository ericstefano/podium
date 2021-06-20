let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -32, lng: 151.22879464019775 },
        zoom: 18,
    });
}
// LOCALIZAÇÃO ATUAL
x = navigator.geolocation;
x.getCurrentPosition(success, failure);

function success(position) {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;

    var coords = new google.maps.LatLng(myLat, myLong);

    var mapOptions = {
        zoom: 12,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({ map: map, position: coords });
}

function failure() { }
// FIM LOCALIZAÇÃO ATUAL

// MARCADOR CUSTOMIZADO
// https://www.youtube.com/watch?v=Xptz0GQ2DO4&ab_channel=PradipDebnath

// const iconBase = 'icons/';
// const marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     icon: `${iconBase}baseline_local_parking_black_48dp.png`
// })

const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
const icons = {
    podcast: {
        icon: iconBase + "/img/podcast1.jpg",
    },
};
const features = [
    {
        position: new google.maps.LatLng(-33.91722, 151.23064),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.91539, 151.2282),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.9191, 151.22907),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.91725, 151.23011),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.91872, 151.23089),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.91784, 151.23094),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.91682, 151.23149),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.9179, 151.23463),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.91666, 151.23468),
        type: "podcast",
    },
    {
        position: new google.maps.LatLng(-33.916988, 151.23364),
        type: "podcast",
    },
];

// Create markers.
for (let i = 0; i < features.length; i++) {
    const marker = new google.maps.Marker({
        position: features[i].position.LatLng = [0],
        icon: icons[features[i].type].icon,
        map: map,
    });
}