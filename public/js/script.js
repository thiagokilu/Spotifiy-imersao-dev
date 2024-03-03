const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");
const resulTrack = document.getElementById("result-music");
const player = document.getElementById("player");
const btnCantor = document.getElementById("btn-cantor");
const btnPlay = document.getElementById("btn-play");
const btnPlayImg = document.getElementById("btn-play-img");
const playerCantor = document.getElementById("player-cantor");
const playerMusica = document.getElementById("player-musica");
const musicTimer = document.getElementById("music-timer");
const footerAd = document.getElementById("footer");
const capaMusica = document.getElementById("capa-musica");
const btnPrevius = document.getElementById("btn-previus");
const btnNext = document.getElementById("btn-next");
const imgPlay = "assets/icons/play2.png";
const imgPause = "assets/icons/pause2.png";
let dados;
let audio;
let songFile;
let song;
let songAutor;
let coverSmall;
let muiscAtual = 0;
let audioAtual;
let volumeAtual;
let dadosMusic;
let novoMusicCard;
let novoCardTrackImg;
let novoAlbumImg;
let novoPlay;
let novoBtnTrackPlay;
let novoCardText;
let novoMusicName;
let novoArtistName;
let novoArtistCategorie;
let novoGridContainer;



let nameSong, previewSong, coverSong, duration;

const searchTerm = encodeURIComponent(searchTerm);
async function requestApi(searchTerm) {
  const resposta = await fetch(
    "https://spotifiy-imersao-dev.vercel.app//api/artist?test=" + searchTerm
  );
  dados = await resposta.json();

  let name = dados["name"];
  let picture = dados["picture_medium"];
  let artistId = dados["id"]

  console.log(dados["id"]);

  const respostaMusic = await fetch(
    `https://spotifiy-imersao-dev.vercel.app//api/musics?id_music=${artistId}`
  );

  dadosMusic = await respostaMusic.json();
  console.log(dadosMusic);

  

  for (let i = 0; i < dadosMusic["data"].length; i++) {
    console.log("Iteração do loop:", i);
    nameSong = dadosMusic["data"][0]["title"];
    songAutor = dadosMusic["data"][i]["artist"]["name"];
    previewSong = dadosMusic["data"][i]["preview"];
    coverSong = dadosMusic["data"][0]["album"]["cover_medium"];
    duration = dadosMusic["data"][i]["duration"];

    console.log(nameSong)


    console.log("Dados da música", i , ":", dadosMusic["data"][i]);

    song = nameSong;
    songFile = previewSong;
    
    coverSmall = coverSong;
    const duracaoMusica = duration;

    // Criar o elemento music-card
    novoMusicCard = document.createElement('div');
    novoMusicCard.classList.add('music-card');

    // Definir o ID do music-card, se necessário
    novoMusicCard.id = "seu-id-aqui";

    // Criar o elemento card-track-img
    novoCardTrackImg = document.createElement('div');
    novoCardTrackImg.classList.add('card-track-img');

    // Criar o elemento img para a capa do álbum
    novoAlbumImg = document.createElement('img');
    novoAlbumImg.classList.add('album-img');
    novoAlbumImg.src = "";
    novoAlbumImg.alt = "Capa do Álbum";

    // Criar o elemento play
    novoPlay = document.createElement('div');
    novoPlay.classList.add('play');

    // Criar o elemento img para o botão de play
    novoBtnTrackPlay = document.createElement('img');
    novoBtnTrackPlay.src = "assets/icons/play.svg";
    novoBtnTrackPlay.alt = "";
    novoBtnTrackPlay.id = "btn-track-play";

    // Adicionar img do botão de play ao elemento play
    novoPlay.appendChild(novoBtnTrackPlay);

    // Adicionar img da capa do álbum ao elemento card-track-img
    novoCardTrackImg.appendChild(novoAlbumImg);
    novoCardTrackImg.appendChild(novoPlay);

    // Criar o elemento card-text
    novoCardText = document.createElement('div');
    novoCardText.classList.add('card-text');

    // Criar o elemento a para o nome da música
    novoMusicName = document.createElement('a');
    novoMusicName.title = "Nome da Música";
    novoMusicName.classList.add('music-name');
    novoMusicName.href = "#";
    novoMusicName.textContent = "Nome da Música";

    // Criar o elemento span para o nome do artista da música
    novoArtistName = document.createElement('span');
    novoArtistName.classList.add('artist-name');
    novoArtistName.id = "artist-music-name";

    // Criar o elemento span para a categoria da música
    novoArtistCategorie = document.createElement('span');
    novoArtistCategorie.classList.add('artist-categorie');
    novoArtistCategorie.textContent = "Categoria";

    // Adicionar elementos de texto ao elemento card-text
    novoCardText.appendChild(novoMusicName);
    novoCardText.appendChild(novoArtistName);
    novoCardText.appendChild(novoArtistCategorie);

    // Adicionar elementos card-track-img e card-text ao music-card
    novoMusicCard.appendChild(novoCardTrackImg);
    novoMusicCard.appendChild(novoCardText);

    // Adicionar music-card ao seu contêiner desejado
     novoGridContainer = document.getElementById('grid-container-music');
    novoGridContainer.appendChild(novoMusicCard);


    const artistName = document.getElementById("artist-name");
    const artistMusicName = document.getElementById("artist-music-name");
    const artistImage = document.getElementById("artist-img");
    const albumImg = document.getElementsByClassName("album-img");
    const musicName = document.querySelectorAll('.music-name')

    artistName.innerText = name;
    artistMusicName.innerText = songAutor;
    artistImage.src = picture;
    musicName.innerText = nameSong;
    albumImg.src = coverSong;


    audio = new Audio(songFile);
    audio.volume = 0.1;
    volumeAtual = audio.volume;

    

    btnCantor.addEventListener("click", () => {
      console.log(duracaoMusica);

      musicTimer.innerText = Math.trunc(audio.duration);

      if (audioAtual && !audioAtual.paused) {
        audioAtual.pause();
      }

      setTimeout(() => {
        playerCantor.innerText = songAutor;
        playerMusica.innerText = song;
        capaMusica.src = coverSmall;
        audio.play();
        btnPlayImg.src = imgPause;
        soundIsplaying = true;
        audioAtual = audio;
      }, 1000);
      audio.currentTime = 0;

      footerAd.classList.add("hidden");
      setTimeout(player, 1000);
      player.classList.remove("hidden");
    });

    displayResults(
        name,
        picture,
        song,
        songFile,
        coverSmall,
        duracaoMusica,
        songAutor
      );

      /*passarmusica(
        dados,
        name,
        picture,
        song,
        songFile,
        coverSmall,
        duracaoMusica,
        songAutor
      );
      */
    
  }


 

  /*song = dadosMusic["data"]["title"];
  songFile = dadosMusic["data"]["preview"];
  songAutor = dadosMusic["data"]["artist"]["name"];
  coverSmall = dadosMusic["data"]["album"]["cover_medium"];
  const duracaoMusica = dadosMusic["data"]["duration"];*/

  /*
  displayResults(
    name,
    picture,
    song,
    songFile,
    coverSmall,
    duracaoMusica,
    songAutor
  );
  passarmusica(
    dados,
    name,
    picture,
    song,
    songFile,
    coverSmall,
    duracaoMusica,
    songAutor
  );
  */
}

function displayResults(
  nome,
  imagem,
  song,
  songFile,
  coverSmall,
  duracaoMusica,
  songAutor
) {
  resultPlaylist.classList.add("hidden");
  resulTrack.classList.add("hidden");

  /* result.forEach(element => {
        

        
    });
    */

  resultArtist.classList.remove("hidden");
  resulTrack.classList.remove("hidden");
}

btnPrevius.addEventListener("click", () => {
  console.log("deu");
  audio.pause();
  muiscAtual--;
  songFile = dadosMusic["data"][muiscAtual]["preview"];
  song = dadosMusic["data"][muiscAtual]["title"];
  songAutor = dadosMusic["data"][muiscAtual]["artist"]["name"];
  coverSmall = dadosMusic["data"][muiscAtual]["album"]["cover_small"];
  playerMusica.innerText = song;
  playerCantor.innerText = songAutor;
  capaMusica.src = coverSmall;

  audio = new Audio(songFile);
  audio.play();
  audio.volume = 0.1;
});

btnNext.addEventListener("click", () => {
  console.log("deu");
  audio.pause();
  muiscAtual++;
  songFile = dadosMusic["data"][muiscAtual]["preview"];
  song = dadosMusic["data"][muiscAtual]["title"];
  songAutor = dadosMusic["data"][muiscAtual]["artist"]["name"];
  coverSmall = dadosMusic["data"][muiscAtual]["album"]["cover_small"];
  playerMusica.innerText = song;
  playerCantor.innerText = songAutor;
  capaMusica.src = coverSmall;

  audio = new Audio(songFile);
  audio.play();
  audio.volume = 0.1;
});

let timeoutId;

document.addEventListener("input", function () {
  const searchTerm = searchInput.value.toLowerCase();

  clearTimeout(timeoutId); // Limpa o timeout anterior, se houver
  timeoutId = setTimeout(function () {
    if (searchTerm === "") {
      resultPlaylist.classList.add("hidden");
      resultArtist.classList.remove("hidden");
      resulTrack.classList.remove("hidden");
      resultPlaylist.classList.remove("hidden");
      resultArtist.classList.add("hidden");
      resulTrack.classList.add("hidden");

      return;
    }
    requestApi(searchTerm);
  }, 500); // Aguarda 300ms antes de chamar a função requestApi()
});

btnPlay.addEventListener("click", () => {
  if (audio.paused) {
    audio.pause();
    audio.play();
    btnPlayImg.src = imgPause;
  } else {
    audio.pause();
    btnPlayImg.src = imgPlay;
  }
});

function fechar() {
  footerAd.classList.add("hidden");
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
  } else {
    audio.volume = 0;
  }
}
