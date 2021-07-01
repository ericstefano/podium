// Mapa
const mapElement = document.getElementById("map")
const pesquisaElement = document.getElementById("pesquisa");
const modalElement = document.getElementById("exampleModal")

const baseURL = 'https://api.spotify.com/v1/';
const searchURL = 'search?q=';
const typeURL = '&type=show';
const apikey = 'f58c9bc653334b2586490edc052081a5';

/*https://api.spotify.com/v1/search?q=bob%20year:2014&type=album_
Returns albums released in 2014 with their names or artist names containing “bob”.
You can also use the tag:new field filter to get just these albums, as well as compilations and singles, released in the last 2 weeks.*/

// Spotify
// const spotify = import('./spotify-web-api.js');
// const spotifyApi = new spotify();
// const apikey = 'f58c9bc653334b2586490edc052081a5';
// spotifyApi.setAccessToken(apikey);

const centerCoords = {
    lat: -19.905328282366675,
    lng: -43.97587664589055
};
const markersOnMap = [
    {
        LatLng: {
            lat: -19.85205145019345,
            lng: -43.97841751460232
        },
        nome: "Café Brasil",
        icon: 'img/podcast-icon2.png'

    },
    {
        LatLng: {
            lat: -19.87131996466008,
            lng: -43.984518954106576
        },
        nome: "BrainCast"
    },
    {
        LatLng: {
            lat: -19.88187884554605,
            lng: -44.00085022825316
        },
        nome: "NerdCast"
    },
    {
        LatLng: {
            lat: -19.9020347548531,
            lng: -44.005545469570286
        },
        nome: "NerdCast"
    },
    {
        LatLng: {
            lat: -19.881686872173166,
            lng: -43.92490980347161
        },
        nome: "RapaduraCast"
    },
    {
        LatLng: {
            lat: -19.888981696801125,
            lng: -43.924093239764275
        },
        nome: "Mundo Podcast"
    },
    {
        LatLng: {
            lat: -19.896084229515576,
            lng: -43.957368210837906
        },
        nome: "Bom dia, Obvious"
    },
    {
        LatLng: {
            lat: -19.918541492421443,
            lng: -43.93981209113035
        },
        nome: "Acenda a Sua Luz"
    },
    {
        LatLng: {
            lat: -19.932743585147396,
            lng: -44.050048191619695
        },
        nome: "Zine Negócios"
    },
    {
        LatLng: {
            lat: -19.942338871157848,
            lng: -44.03637074952194
        },
        nome: "Projetos Humanos"
    },
    {
        LatLng: {
            lat: -19.959800795429427,
            lng: -43.96247173400872
        },
        nome: "Autoconsciente"
    },
    {
        LatLng: {
            lat: -19.935622232151992,
            lng: -43.92980918571558
        },
        nome: "Nerdcast"
    },
    {
        LatLng: {
            lat: -19.97188868792483,
            lng: -43.938383104642526
        },
        nom: "Autoconsciente"
    },
    {
        LatLng: {
            lat: -19.851928188281764,
            lng: -43.953081251374435
        },
        nome: "Pretinho Básico"
    },
    {
        LatLng: [{
            lat: -19.857304363800623,
            lng: -43.968595961813676
        }],
        nome: "Filhos da Grávida de Taubaté"
    }
];

const addMarkerInfo = map => {
    for (let i = 0; i < markersOnMap.length; i++) {
        const marker = new google.maps.Marker({
            position: markersOnMap[i].LatLng,
            icon: markersOnMap[0].icon,
            map: map,
            title: markersOnMap[i].nome,
            optimized: false
        });
        marker.addListener("click", () => {
            createModal(marker);
        });
    }
}

const createModal = marker => {
    const htmlModal = `
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
</div>`;
    const modal = modalElement.innerHTML = htmlModal;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
}

pesquisaElement.addEventListener('keypress', enter => {
    if (enter.key === 'Enter') {
        const valor = document.getElementById("floatingInputValue").value;
        for (let i = 0; i < markersOnMap.length; i++) {
            if (markersOnMap[i].nome === valor) {
                const mapOptions = {
                    zoom: 15,
                    center: markersOnMap[i].LatLng,
                }
                const map = new google.maps.Map(mapElement, mapOptions);
                addMarkerInfo(map);
            }
        }

    }
})

const success = position => {
    let myLat = position.coords.latitude;
    let myLong = position.coords.longitude;
    let coords = new google.maps.LatLng(myLat, myLong);
    let mapOptions = {
        zoom: 15,
        center: coords,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    let map = new google.maps.Map(mapElement, mapOptions);
    let marker = new google.maps.Marker({ map: map, position: coords });
    addMarkerInfo(map);
}

const currentLocation = () => {
    let x = navigator.geolocation;
    x.getCurrentPosition(success);

};

const initMap = () => {
    let mapOptions = {
        zoom: 12,
        center: centerCoords,
    };
    let map = new google.maps.Map(mapElement, mapOptions);
    addMarkerInfo(map);
}

window.onload = () => {
    initMap();
};