const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");
const resulTrack = document.getElementById("result-music");
const gridMusicContainer = document.getElementById('grid-container-music');
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

async function requestApi(searchTerm) {
  const searchTermFormatted = searchTerm.replace(/\s+/g, '-');

  const resposta = await fetch(
    "http://localhost:3000/api/artist/test?test=" + searchTerm 
  );
  dados = await resposta.json();
  console.log(dados)

  
  
  let name = dados["data"][0]["artist"]["name"];
  let picture = dados["data"][0]["artist"]["picture_big"]
  let artistId = dados["data"][0]["artist"]["id"];

  console.log(dados["id"]);

  const respostaMusic = await fetch(
    `http://localhost:3000/api/musics?id_music=${artistId}`
  );

  dadosMusic = await respostaMusic.json();
  console.log(dadosMusic);

  
  gridMusicContainer.innerHTML = '';
  for (let i = 0; i < dadosMusic["data"].length ; i++) {
    console.log("Iteração do loop:", i);
    nameSong = dadosMusic["data"][i]["title"];
    songAutor = dadosMusic["data"][i]["artist"]["name"];
    previewSong = dadosMusic["data"][i]["preview"];
    coverSong = dadosMusic["data"][i]["album"]["cover_medium"];
    duration = dadosMusic["data"][i]["duration"];

    console.log(nameSong)


    console.log("Dados da música", i , ":", dadosMusic["data"][i]);

    nameSong= nameSong;
    
    
    coverSmall = coverSong;

    // Criar o elemento music-card
    const novoMusicCard = document.createElement('div');
    novoMusicCard.classList.add('music-card');

    // Definir o ID do music-card, se necessário
    novoMusicCard.id = "seu-id-aqui";

    // Criar o elemento card-track-img
    const novoCardTrackImg = document.createElement('div');
    novoCardTrackImg.classList.add('card-track-img');

    // Criar o elemento img para a capa do álbum
    const novoAlbumImg = document.createElement('img');
    novoAlbumImg.classList.add('album-img');
    novoAlbumImg.src = dadosMusic["data"][i]["album"]["cover_medium"];
    novoAlbumImg.alt = "Capa do Álbum";

    // Adicionar img da capa do álbum ao elemento card-track-img
    novoCardTrackImg.appendChild(novoAlbumImg);

    // Criar o elemento play
    const novoPlay = document.createElement('div');
    novoPlay.classList.add('play');

    // Criar o elemento img para o botão de play
    const novoBtnTrackPlay = document.createElement('img');
    novoBtnTrackPlay.src = "assets/icons/play.svg";
    novoBtnTrackPlay.alt = "";
    novoBtnTrackPlay.id = "btn-track-play";

    // Adicionar img do botão de play ao elemento play
    novoPlay.appendChild(novoBtnTrackPlay);

    // Adicionar elemento play ao elemento card-track-img
    novoCardTrackImg.appendChild(novoPlay);

    // Adicionar elementos card-track-img ao music-card
    novoMusicCard.appendChild(novoCardTrackImg);

    // Criar o elemento card-text
    const novoCardText = document.createElement('div');
    novoCardText.classList.add('card-text');

    // Criar o elemento a para o nome da música
    const novoMusicName = document.createElement('a');
    novoMusicName.title = "Nome da Música";
    novoMusicName.classList.add('music-name');
    novoMusicName.href = "#";
    novoMusicName.textContent = dadosMusic["data"][i]["title"];

    // Adicionar elemento a para o nome da música ao elemento card-text
    novoCardText.appendChild(novoMusicName);

    // Criar o elemento span para o nome do artista da música
    const novoArtistName = document.createElement('span');
    novoArtistName.classList.add('artist-name');
    novoArtistName.textContent = dadosMusic["data"][i]["artist"]["name"];

    // Adicionar elemento span para o nome do artista da música ao elemento card-text
    novoCardText.appendChild(novoArtistName);

    // Criar o elemento span para a categoria da música
    const novoArtistCategorie = document.createElement('span');
    novoArtistCategorie.classList.add('artist-categorie');
    novoArtistCategorie.textContent = "Categoria";

    // Adicionar elemento span para a categoria da música ao elemento card-text
    novoCardText.appendChild(novoArtistCategorie);

    // Adicionar elementos card-text ao music-card
    novoMusicCard.appendChild(novoCardText);

    // Adicionar music-card ao contêiner desejado
    gridMusicContainer.appendChild(novoMusicCard);


    const artistName = document.getElementById("artist-name");
    const artistMusicName = document.getElementById("artist-music-name");
    const artistImage = document.getElementById("artist-img");
    const albumImg = document.getElementsByClassName("album-img");
    const musicName = document.querySelectorAll('.music-name')

    artistName.innerText = name;
    artistImage.src = picture;


    

    btnCantor.addEventListener("click", () => {
      resulTrack.classList.add("hidden");
      resulTrack.classList.remove("hidden");
      
      // Pausar o áudio atual, se estiver reproduzindo
      if (audio && !audio.paused) {
        audio.pause();
      }
      
      // Criar novo objeto de áudio com a primeira música
      const primeiraMusica = dadosMusic["data"][0];
      audio = new Audio(primeiraMusica["preview"]);
      audio.volume = 0.1;
      volumeAtual = audio.volume;
    
      // Definir a duração da música
      audio.addEventListener("loadedmetadata", function() {
        musicTimer.innerText = Math.trunc(audio.duration);
      });
    
      setTimeout(() => {
        // Atualizar informações da primeira música
        nameSong = primeiraMusica["title"];
        songAutor = primeiraMusica["artist"]["name"];
        previewSong = primeiraMusica["preview"];
        coverSong = primeiraMusica["album"]["cover_medium"];
        duration = primeiraMusica["duration"];
    
        // Atualizar elementos HTML
        playerCantor.innerText = songAutor;
        playerMusica.innerText = nameSong;
        capaMusica.src = coverSong;
    
        // Reproduzir a primeira música
        audio.play();
        btnPlayImg.src = imgPause;
        soundIsplaying = true;
        console.log(audio);
      }, 1000);
    
      // Esconder footer e exibir player após um segundo
      footerAd.classList.add("hidden");
      setTimeout(player, 1000);
      player.classList.remove("hidden");
    });
    
    // Exibir resultados de outras músicas
    displayResults(
      name,
      picture,
      nameSong,
      previewSong,
      coverSmall,
      duration,
      songAutor
    );
    
    
  }


 

  /*song = dadosMusic["data"]["title"];
  previewSong = dadosMusic["data"]["preview"];
  songAutor = dadosMusic["data"]["artist"]["name"];
  coverSmall = dadosMusic["data"]["album"]["cover_medium"];
  const duration = dadosMusic["data"]["duration"];*/

  /*
  displayResults(
    name,
    picture,
    song,
    previewSong,
    coverSmall,
    duration,
    songAutor
  );
  passarmusica(
    dados,
    name,
    picture,
    song,
    previewSong,
    coverSmall,
    duration,
    songAutor
  );
  */
}

function displayResults(
  nome,
  imagem,
  song,
  previewSong,
  coverSmall,
  duration,
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
  previewSong = dadosMusic["data"][muiscAtual]["preview"];
  nameSong= dadosMusic["data"][muiscAtual]["title"];
  songAutor = dadosMusic["data"][muiscAtual]["artist"]["name"];
  coverSmall = dadosMusic["data"][muiscAtual]["album"]["cover_small"];
  playerMusica.innerText = nameSong;
  playerCantor.innerText = songAutor;
  capaMusica.src = coverSmall;

  audio = new Audio(previewSong);
  audio.play();
  audio.volume = 0.1;
});

btnNext.addEventListener("click", () => {
  console.log("deu");
  audio.pause();
  muiscAtual++;
  previewSong = dadosMusic["data"][muiscAtual]["preview"];
  nameSong= dadosMusic["data"][muiscAtual]["title"];
  songAutor = dadosMusic["data"][muiscAtual]["artist"]["name"];
  coverSmall = dadosMusic["data"][muiscAtual]["album"]["cover_small"];
  playerMusica.innerText = nameSong;
  playerCantor.innerText = songAutor;
  capaMusica.src = coverSmall;

  audio = new Audio(previewSong);
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
