var map;
var InforObj = [];
var centerCoords = {
    lat: -19.905328282366675,
    lng: -43.97587664589055
};

var icons = {
    podcast: {
        icon: 'img/podcast-icon2.png'
    },
};

var markersOnMap = [
    {
        LatLng: [{
            lat: -19.85205145019345,
            lng: -43.97841751460232
        }],
        type: 'podcast',

    },
    {
        LatLng: [{
            lat: -19.87131996466008,
            lng: -43.984518954106576
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.88187884554605,
            lng: -44.00085022825316
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.9020347548531,
            lng: -44.005545469570286
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.881686872173166,
            lng: -43.92490980347161
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.888981696801125,
            lng: -43.924093239764275
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.896084229515576,
            lng: -43.957368210837906
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.918541492421443,
            lng: -43.93981209113035
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.932743585147396,
            lng: -44.050048191619695
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.942338871157848,
            lng: -44.03637074952194
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.959800795429427,
            lng: -43.96247173400872
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.935622232151992,
            lng: -43.92980918571558
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.97188868792483,
            lng: -43.938383104642526
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.851928188281764,
            lng: -43.953081251374435
        }],
        type: 'podcast'
    },
    {
        LatLng: [{
            lat: -19.857304363800623,
            lng: -43.968595961813676
        }],
        type: 'podcast',
    }
]

const createModal = (marker) => {
    let htmlModal = `
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <div class="modal-podcast">
                <img
                    src="${marker.icon}">
                <h5 class="modal-title" id="exampleModalLabel">Podcast ${marker.title}</h5>
            </div>
        </div>
        <div class="modal-body">
            <h5>Descrição</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quos mollitia laborum
                maxime
                quibusdam, et voluptas similique modi voluptatum rerum nulla veniam culpa deleniti sequi
                autem
                aperiam doloribus. Enim, at.</p>

        </div>
        <div class="modal-footer d-flex justify-content-start">
            <div class="me-auto">
                <p class="my-0">${marker.position}</p>
            </div>
            <button type="button" class="btn btn-primary">Escutar</button>
        </div>
    </div>
</div>`
    let modal = document.getElementById("exampleModal").innerHTML = htmlModal;
    let bootstrapModal = new bootstrap.Modal(document.getElementById('exampleModal'));
    bootstrapModal.show();
}

window.onload = function () {
    initMap();
};

function addMarkerInfo() {
    for (var i = 0; i < markersOnMap.length; i++) {
        const marker = new google.maps.Marker({
            position: markersOnMap[i].LatLng[0],
            icon: icons[markersOnMap[i].type].icon,
            map: map,
            title: `${i + 1}`,
            optimized: false

        });

        // Abrir/Criar Modal do podcast

        marker.addListener("click", () => {
            // alert(marker.title);
            createModal(marker);
        });
    }
}

// LOCALIZAÇÃO ATUAL

function currentLocation() {
    x = navigator.geolocation;
    x.getCurrentPosition(success, failure);
    function success(position) {
        let myLat = position.coords.latitude;
        let myLong = position.coords.longitude;

        let coords = new google.maps.LatLng(myLat, myLong);

        let mapOptions = {
            zoom: 14,
            center: coords,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        let map = new google.maps.Map(document.getElementById("map"), mapOptions);
        let marker = new google.maps.Marker({ map: map, position: coords });
        addMarkerInfo();
    }

    function failure() { }
};

// FIM LOCALIZAÇÃO ATUAL

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: centerCoords,
    });
    addMarkerInfo();
}

