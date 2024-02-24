const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById('result-playlists');
const resulTrack = document.getElementById('result-music')
const player = document.getElementById('player')
const btnCantor = document.getElementById('btn-cantor')
const btnPlay = document.getElementById('btn-play')
const btnPlayImg = document.getElementById('btn-play-img')
const playerCantor = document.getElementById('player-cantor')
const playerMusica = document.getElementById('player-musica')
const musicTimer = document.getElementById('music-timer')
const footerAd = document.getElementById('footer')
const capaMusica = document.getElementById('capa-musica')
const btnPrevius = document.getElementById('btn-previus')
const btnNext = document.getElementById('btn-next')
const imgPlay = "assets/icons/play2.png"
const imgPause = "assets/icons/pause2.png"
let dados;
let audio;
let songFile;
let song;
let songAutor;
let coverSmall
let muiscAtual = 0;
let audioAtual;
let volumeAtual;




async function requestApi(searchTerm) {
    const resposta = await fetch(
        "http://localhost:3000/api/artist/test?test=" + searchTerm 
      );
      dados = await resposta.json();
      console.log(dados)
      
      const name = dados["name"];
      const picture = dados["picture_medium"]
      console.log(name)
      console.log(picture)
      song = dados["data"][0]["title"]
      songFile = dados["data"][0]["preview"]
      songAutor = dados["data"][0]["artist"]["name"]
      coverSmall = dados["data"][0]["album"]["cover_medium"];
      const duracaoMusica = dados["data"][0]["duration"];
      console.log(name)
      console.log(picture)
      console.log(dados)
      console.log(typeof(dados))
      displayResults(name, picture, song, songFile, coverSmall, duracaoMusica, songAutor)
      passarmusica(dados, name, picture, song, songFile, coverSmall, duracaoMusica, songAutor)

};






function displayResults(nome, imagem, song, songFile, coverSmall, duracaoMusica, songAutor) {
    resultPlaylist.classList.add("hidden")
    resulTrack.classList.add('hidden')
    const artistName = document.getElementById('artist-name');
    const artistMusicName = document.getElementById('artist-music-name');
    const artistImage = document.getElementById('artist-img');
    const albumImg = document.getElementById('album-img');
    const musicName = document.getElementById('music-name');
    song = dados["data"][0]["title"]
    
    artistName.innerText = nome;
    artistMusicName.innerText = songAutor;
    musicName.innerText = song;
    artistImage.src = imagem;
    albumImg.src = coverSmall;
    

    audio = new Audio(songFile);
    audio.volume = 0.1;
    volumeAtual = audio.volume

    btnCantor.addEventListener('click', () => {

        console.log(duracaoMusica)

        musicTimer.innerText = Math.trunc(audio.duration);

        if (audioAtual && !audioAtual.paused) {
            audioAtual.pause();
        }

        setTimeout(() => {
            playerCantor.innerText = songAutor;
            playerMusica.innerText = song;
            capaMusica.src = coverSmall;
            audio.play();
            btnPlayImg.src = imgPause
            soundIsplaying = true
            audioAtual = audio

        }, 1000);
        audio.currentTime = 0;
        
        footerAd.classList.add('hidden');
        setTimeout(player, 1000)
        player.classList.remove('hidden')

        
    })
    /* result.forEach(element => {
        

        
    });
    */

    resultArtist.classList.remove('hidden');
    resulTrack.classList.remove('hidden')
    
}

btnPrevius.addEventListener('click', () => {
    console.log('deu')
    audio.pause()
    muiscAtual--;
    songFile = dados["data"][muiscAtual]["preview"]
    song = dados["data"][muiscAtual]["title"]
    songAutor = dados["data"][muiscAtual]["artist"]["name"]
    coverSmall = dados["data"][muiscAtual]["album"]["cover_small"];
    playerMusica.innerText = song;
    playerCantor.innerText = songAutor;
    capaMusica.src = coverSmall;

    audio = new Audio(songFile);
    audio.play()
    audio.volume = 0.1;
})

btnNext.addEventListener('click', () => {
    console.log('deu')
    audio.pause()
    muiscAtual++;
    songFile = dados["data"][muiscAtual]["preview"]
    song = dados["data"][muiscAtual]["title"]
    songAutor = dados["data"][muiscAtual]["artist"]["name"]
    coverSmall = dados["data"][muiscAtual]["album"]["cover_small"];
    playerMusica.innerText = song;
    playerCantor.innerText = songAutor;
    capaMusica.src = coverSmall;

    audio = new Audio(songFile);
    audio.play()
    audio.volume = 0.1;
})


let timeoutId;

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    
    clearTimeout(timeoutId); // Limpa o timeout anterior, se houver
    timeoutId = setTimeout(function() {
        if (searchTerm === '') {
            resultPlaylist.classList.add('hidden');
            resultArtist.classList.remove('hidden');
            resulTrack.classList.remove('hidden')
            resultPlaylist.classList.remove('hidden');
            resultArtist.classList.add('hidden');
            resulTrack.classList.add('hidden')

            return;
        }
        requestApi(searchTerm);
    }, 500); // Aguarda 300ms antes de chamar a função requestApi()
});





btnPlay.addEventListener("click", () => {
    if (audio.paused) {
        audio.pause()
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
    if (audio.volume + 0.1 <= 1) {
        audio.volume += 0.1;
    } else {
        audio.volume = 1;
    }
}




function decreaseVolume() {
    if (audio.volume > 0) {
        audio.volume -= 0.1;
    }else {
        audio.volume = 0;
    
    }
}



