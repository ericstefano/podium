// Mapa
const mapElement = document.getElementById("map")
const pesquisaElement = document.getElementById("pesquisa");
const modalElement = document.getElementById("modal")

// Coordenadas de Belo Horizonte, temporário
const centerCoords = {
    lat: -19.905328282366675,
    lng: -43.97587664589055
};

// Spotify
const spotifyApi = new SpotifyWebApi();
const client_id = "c59e630c38634d85bdb9fc946fd29489"
const client_secret = "0b90b7c6774544e9bbf3fd279c4e77e8";


// Pegar Token de Requisição do Spotify
// Está sendo feito direto com as credenciais acima do App Podium
// Certamente não se faz assim e as IDs acima tinham que ficar escondidas (?)
const getToken = async () => {
    await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret),
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'grant_type=client_credentials'
    })
        .then(response => response.json())
        .then(data => {
            spotifyApi.setAccessToken(data.access_token)
        });
}

// Realiza a pesquisa do Podcast na API do Spotify
const pesquisarPodcast = async query => {
    let podcast;
    await spotifyApi.searchShows(query, { "market": "BR" }).then(
        obj => {
            for (let item of obj.shows.items) {
                // TODO: fazer validação/filtragem aqui
                podcast = JSON.parse(JSON.stringify(item))
                break;
            }
        }
    )
    return podcast;
}


// Adicionar os marcadores criados ao mapa
const addMarkerInfo = async (map, coords) => {
    const service = new google.maps.places.PlacesService(map);
    let request = {
        location: coords,
        radius: '25000',
        query: 'podcast'
    };
    await service.textSearch(request, async results => {
        for (let pod of results) {
            await pesquisarPodcast(pod.name).then((obj) => {
                if (obj !== undefined) {
                    const marker = new google.maps.Marker({
                        position: {
                            lat: pod.geometry.location.lat(),
                            lng: pod.geometry.location.lng()
                        },
                        icon: obj.images[2].url,
                        title: obj.name,
                        description: obj.description,
                        link: obj.external_urls.spotify,
                        map: map,
                        endereco: pod.formatted_address,
                        optimized: false
                    });
                    marker.addListener("click", () => {
                        createModal(marker);
                    })
                }
            })
        }
    })
}

// Criar o modal dos marcadores dos mapa
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
                <p class="my-0">${marker.endereco}</p>
            </div>
            <a href=${marker.link} target="_blank"><button type="button" class="btn btn-primary">Escutar</button><a>
        </div>
    </div>
</div>`;
    modalElement.innerHTML = htmlModal;
    const bootstrapModal = new bootstrap.Modal(modalElement);
    bootstrapModal.show();
}


// Pesquisa de Podcasts baseado nos marcadores disponíveis
pesquisaElement.addEventListener('keypress', async enter => {
    if (enter.key === 'Enter') {
        let geocoder = new google.maps.Geocoder();
        let address = document.getElementById('floatingInputValue').value;
        geocoder.geocode({
            'address': address
        }, (results, status) => {
            if (status == google.maps.GeocoderStatus.OK) {
                let LatLng = {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()
                }
                let mapOptions = {
                    zoom: 15,
                    center: LatLng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }
                const map = new google.maps.Map(mapElement, mapOptions);
                addMarkerInfo(map, LatLng);
            }
        });
    }
})


// Localização atual do Usuário, possivelmente quebrado
// Funciona só no Google Chrome
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
        addMarkerInfo(map, coords);
    }
    x.getCurrentPosition(success);
};

const initMap = () => {
    let mapOptions = {
        zoom: 12,
        center: centerCoords,
    };
    let map = new google.maps.Map(mapElement, mapOptions)
    return map;
}

// Criar mapa e marcadores assincronamente
window.onload = () => {

    // Pegar Token OAUTH do Spotify, THEN criar marcadores no mapa criado.
    getToken().then(() => {
        let map = initMap();
        addMarkerInfo(map, centerCoords);
    })
};