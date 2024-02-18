const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const player = document.getElementById('player')
const btnCantor = document.getElementById('btn-cantor')
const btnPlay = document.getElementById('btn-play')
const btnPlayImg = document.getElementById('btn-play-img')
const playerCantor = document.getElementById('player-cantor')
const playerMusica = document.getElementById('player-musica')
const footerAd = document.getElementById('footer')
const imgPlay = "./src/assets/icons/play.png"
const imgPause = "./src/assets/icons/pause.png"
const audio = new Audio('https://cdn.pixabay.com/download/audio/2023/09/29/audio_0eaceb1002.mp3?filename=once-in-paris-168895.mp3');


function requestApi(searchTerm) {
    const url = `https://my-json-server.typicode.com/thiagokilu/Spotifiy-imersao-dev/artists=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}


function displayResults(result) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;

        btnCantor.addEventListener('click', () => {
            playerCantor.innerText = element.name
            playerMusica.innerText = element.song
            setTimeout(() => {
                audio.play();
            }, 1000);
            audio.currentTime = 0;
            btnPlayImg.src = imgPause
            footerAd.classList.add('hidden');
            setTimeout(player, 1000)
            player.classList.remove('hidden')
        })
    });

    resultArtist.classList.remove('hidden');
}


document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.add('hidden');
        resultArtist.classList.remove('hidden');
        return
    }
    
    requestApi(searchTerm);
})

btnPlay.addEventListener("click", () => {
    if (audio.paused) {
        audio.play()
        btnPlayImg.src = imgPause

    } else {
        audio.pause()
        btnPlayImg.src = imgPlay
    }

    
})

function fechar() {
    footerAd.classList.add('hidden');
}

let volumeLevel = 50; // volume inicial
const volumeElement = document.getElementById("volume-level");

function updateVolumeDisplay() {
    volumeElement.textContent = volumeLevel;
}

function increaseVolume() {
    if (volumeLevel < 100) {
        volumeLevel += 10;
        updateVolumeDisplay();
        // Aqui você pode adicionar lógica para atualizar o volume real do seu aplicativo/elemento de áudio
    }
}

function decreaseVolume() {
    if (volumeLevel > 0) {
        volumeLevel -= 10;
        updateVolumeDisplay();
        // Aqui você pode adicionar lógica para atualizar o volume real do seu aplicativo/elemento de áudio
    }
}