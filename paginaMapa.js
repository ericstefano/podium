// Mapa
const mapElement = document.getElementById("map")
const pesquisaElement = document.getElementById("pesquisa");
const modalElement = document.getElementById("exampleModal")
const centerCoords = {
    lat: -19.905328282366675,
    lng: -43.97587664589055
};

const pegarApi = () => {
    let client_id = "c59e630c38634d85bdb9fc946fd29489";
    let client_secret = "0b90b7c6774544e9bbf3fd279c4e77e8";
    let url = "https://accounts.spotify.com/authorize";
    url += "?client_id=" + client_id;
    url += "&response_type=code";
    url += "&redirect_uri=" + encodeURI("http://127.0.0.1:5501/paginaMapa.html");
    url += "&show_dialog=true";
    window.location.href = url;
}

const spotifyApi = new SpotifyWebApi;
const queryString = window.location.search;
if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    let code = urlParams.get('code');
    console.log(code)
    spotifyApi.setAccessToken(code);
} else {
    pegarApi();
}

pesquisarPodcast = async query => {
    let podcast;
    await spotifyApi.searchShows(query, {"market": "BR" }).then(
        obj => {
            obj.shows.items.forEach((item => {
                if (item.name.toLowerCase() == query.toLowerCase()) {
                    podcast = JSON.parse(JSON.stringify(item))
                }
            }))
        }
    )
    return podcast;
}

criarListaMarkers = async () => {
    let markers = []
    await pesquisarPodcast("Malignos Podcast").then(async (obj) => {
        markers = [
            {
                LatLng: {
                    lat: -19.85205145019345,
                    lng: -43.97841751460232
                },
                title: obj.name,
                icon: obj.images[2].url,
                description: obj.description,
                link: obj.external_urls.spotify

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
    })
    return markers;
}

const addMarkerInfo = async map => {
    const markersOnMap = await criarListaMarkers()
    markersOnMap.forEach(item => {
        const marker = new google.maps.Marker({
            position: item.LatLng,
            icon: item.icon,
            title: item.title,
            description: item.description,
            link: item.link,
            map: map,
            optimized: false
        });
        marker.addListener("click", () => {
            createModal(marker);
        })
    })
}

const createModal = marker => {
    const htmlModal = `
<div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
        <div class="modal-header">
            <div class="modal-podcast">
                <img
                    src="${marker.icon}">
                <h5 class="modal-title" id="exampleModalLabel">${marker.title}</h5>
            </div>
        </div>
        <div class="modal-body">
            <h5>Descrição</h5>
            <p>${marker.description}</p>
        </div>
        <div class="modal-footer d-flex justify-content-start">
            <div class="me-auto">
                <p class="my-0">${marker.position}</p>
            </div>
            <a href=${marker.link} target="_blank"><button type="button" class="btn btn-primary">Escutar</button><a>
        </div>
    </div>
</div>`;
    modalElement.innerHTML = htmlModal;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
}

pesquisaElement.addEventListener('keypress', async enter => {
    const markersOnMap = await criarListaMarkers()
    if (enter.key === 'Enter') {
        const valor = document.getElementById("floatingInputValue").value;
        markersOnMap.forEach(marcador => {
            if (marcador.title.toLowerCase() === valor.toLowerCase()) {
                const mapOptions = {
                    zoom: 15,
                    center: marcador.LatLng,
                }
                const map = new google.maps.Map(mapElement, mapOptions);
                addMarkerInfo(map);
            }
        })
    }
})

const currentLocation = () => {
    let x = navigator.geolocation;
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
    x.getCurrentPosition(success);
};

const initMap = async () => {
    let mapOptions = {
        zoom: 12,
        center: centerCoords,
    };
    map = await new google.maps.Map(mapElement, mapOptions)
    addMarkerInfo(map);
}

window.onload = async () => {
    await initMap();
};