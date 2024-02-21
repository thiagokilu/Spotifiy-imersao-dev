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
const capaMusica = document.getElementById('capa-musica')
const imgPlay = "assets/icons/play2.png"
const imgPause = "assets/icons/pause2.png"



async function requestApi(searchTerm) {
    const resposta = await fetch(
        "http://localhost:3000/api/artist/test?test=" + searchTerm 
      );
      const dados = await resposta.json();
      const name = dados["data"][0]["artist"]["name"];
      const picture = dados["data"][0]["artist"]["picture"]
      const song = dados["data"][0]["title"]
      const songFile = dados["data"][0]["preview"]
      const coverSmall = dados["data"][0]["album"]["cover_small"];
      console.log(name)
      console.log(picture)
      displayResults(name, picture, song, songFile, coverSmall)

};




function displayResults(nome, imagem, song, songFile, coverSmall) {
    resultPlaylist.classList.add("hidden")
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    artistName.innerText = nome;
    artistImage.src = imagem;
    capaMusica.src = coverSmall;
    const audio = new Audio(songFile);
    audio.volume = 0.1;

    btnCantor.addEventListener('click', () => {
        playerCantor.innerText = nome;
        playerMusica.innerText = song;
        setTimeout(() => {
            audio.play();
            soundIsplaying = true
        }, 1000);
        audio.currentTime = 0;
        btnPlayImg.src = imgPause
        footerAd.classList.add('hidden');
        setTimeout(player, 1000)
        player.classList.remove('hidden')
    })
    /* result.forEach(element => {
        

        
    });
    */

    resultArtist.classList.remove('hidden');
    
}


let timeoutId;

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    
    clearTimeout(timeoutId); // Limpa o timeout anterior, se houver
    timeoutId = setTimeout(function() {
        if (searchTerm === '') {
            resultPlaylist.classList.add('hidden');
            resultArtist.classList.remove('hidden');
            return;
        }
        requestApi(searchTerm);
    }, 500); // Aguarda 300ms antes de chamar a função requestApi()
});

btnPlay.addEventListener("click", () => {
    if (soundIsplaying == false){
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