const searchInput = document.getElementById("search-input");
const resultArtist = document.getElementById("result-artist");
const resultPlaylist = document.getElementById("result-playlists");
const resulTrack = document.getElementById("result-music");
const btnMicrophone = document.getElementById("link-microphone")
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
const volumeSlider = document.getElementById("volume-slider")
const imgPlay = "assets/icons/play2.png";
const imgPause = "assets/icons/pause2.png";
let dados;
let audio;
let songAutor;
let coverSmall;
let i;
let muiscAtualArtist = 0;
let muiscAtualCard;
let qualLista;
let muiscAtual;
let audioAtual;
let novoMusicCard;
let novoCardTrackImg;
let novoAlbumImg;
let novoPlay;
let novoBtnTrackPlay;
let novoCardText;
let novoMusicName;
let novoArtistName;
let contributors;
let novoArtistCategorie;
let novoGridContainer;



let nameSong, previewSong, coverSong, duration;

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
SpeechRecognition.lang = 'pt-BR'
SpeechRecognition.continuous = true
SpeechRecognition.maxAlternatives = 1
SpeechRecognition.interimResults = true

btnMicrophone.addEventListener ("click", () => {
  recognition.start()
})



async function requestApi(searchTerm) {

  const resposta = await fetch(
    "https://spotifiy-imersao-dev.vercel.app/api/artist/test?test=" + searchTerm
  );
  dados = await resposta.json();


  
  
  let name = dados["data"][0]["artist"]["name"];
  let picture = dados["data"][0]["artist"]["picture_big"]
  let artistId = dados["data"][0]["artist"]["id"];


  const respostaMusic = await fetch(
    `https://spotifiy-imersao-dev.vercel.app/api/musics?id_music=${artistId}`
  );

  dadosArtist = await respostaMusic.json();

  nameSong = dadosArtist["data"][0]["title"];
  songAutor = dadosArtist["data"][0]["artist"]["name"];
  previewSong = dadosArtist["data"][0]["preview"];
  coverSong = dadosArtist["data"][0]["album"]["cover_medium"];
  duration = dadosArtist["data"][0]["duration"];
  contributors = dadosArtist["data"][0]["contributors"];

  const NamesContributors = contributors.map(contributor => String(contributor.name)).join(', ');
  
  gridMusicContainer.innerHTML = '';
  for (let i = 0; i < dados["data"].length ; i++) {
    nameSong = dados["data"][i]["title"];
    songId = dados["data"][i]["album"]["id"];
    songAutor = dados["data"][i]["artist"]["name"];
    previewSong = dados["data"][i]["preview"];
    coverSong = dados["data"][i]["album"]["cover_medium"];
    duration = dados["data"][i]["duration"];
    




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
    novoAlbumImg.src = dados["data"][i]["album"]["cover_medium"];
    novoAlbumImg.alt = "Capa do Álbum";

    // Adicionar img da capa do álbum ao elemento card-track-img
    novoCardTrackImg.appendChild(novoAlbumImg);

    // Criar o elemento play
    const novoPlay = document.createElement('div');
    novoPlay.classList.add('play');

    const NovolinkDoPlay = document.createElement('a')
    NovolinkDoPlay.id = 'linkDoPlay';
    novoPlay.appendChild(NovolinkDoPlay);

    // Criar o elemento img para o botão de play
    const novoBtnTrackPlay = document.createElement('img');
    novoBtnTrackPlay.src = "assets/icons/play.svg";
    novoBtnTrackPlay.alt = "";
    novoBtnTrackPlay.id = "btn-track-play";

    // Adicionar img do botão de play ao elemento play
    NovolinkDoPlay.appendChild(novoBtnTrackPlay);

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
    novoMusicName.textContent = dados["data"][i]["title"];
    

    // Adicionar elemento a para o nome da música ao elemento card-text
    novoCardText.appendChild(novoMusicName);

    // Criar o elemento span para o nome do artista da música
    const novoArtistName = document.createElement('span');
    novoArtistName.classList.add('artist-name');
    novoArtistName.textContent = dados["data"][i]["artist"]["name"];

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
    let btnTrackPlay = document.getElementById('novoBtnTrackPlay.')

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
      const primeiraMusica = dadosArtist["data"][0];
      audio = new Audio(primeiraMusica["preview"]);
      nameSong = dadosArtist["data"][0]["title"];
      songAutor = dadosArtist["data"][0]["artist"]["name"];
      contributors = dadosArtist["data"][0]["contributors"];
      previewSong = dadosArtist["data"][0]["preview"];
      coverSong = dadosArtist["data"][0]["album"]["cover_medium"];
      duration = dadosArtist["data"][0]["duration"];
      muiscAtualArtist = 0;
      qualLista = 'artist'
      const NamesContributors = contributors.map(contributor => String(contributor.name)).join(', ');
    
      // Definir a duração da música
      audio.addEventListener("loadedmetadata", function() {
        musicTimer.innerText = Math.trunc(audio.duration);
      });
    
      setTimeout(() => {
        // Atualizar informações da primeira música
    
        // Atualizar elementos HTML
        playerCantor.innerText = NamesContributors;
        playerMusica.innerText = nameSong;
        capaMusica.src = coverSong;
    
        // Reproduzir a primeira música
        audio.play();
        btnPlayImg.src = imgPause;
        soundIsplaying = true;
      }, 1000);
    
      // Esconder footer e exibir player após um segundo
      footerAd.classList.add("hidden");
      setTimeout(player, 1000);
      player.classList.remove("hidden");
    });

    NovolinkDoPlay.addEventListener("click", () => {
      resulTrack.classList.add("hidden");
      resulTrack.classList.remove("hidden");
      
      
      // Pausar o áudio atual, se estiver reproduzindo
      if (audio && !audio.paused) {
        audio.pause();
      }
      
      // Criar novo objeto de áudio com a primeira música
      const MusicaDoCard = dados["data"][i]["preview"];
      audio = new Audio(MusicaDoCard);
      nameSong = dados["data"][i]["title"];
      songAutor = dados["data"][i]["artist"]["name"];
      coverSong = dados["data"][i]["album"]["cover_medium"];
      duration = dados["data"][i]["duration"];
      muiscAtualCard = i;
      qualLista = 'track'
    
      // Definir a duração da música
      audio.addEventListener("loadedmetadata", function() {
        musicTimer.innerText = Math.trunc(audio.duration);
      });
    
      setTimeout(() => {
    
        // Atualizar elementos HTML
        playerCantor.innerText = songAutor;
        playerMusica.innerText = nameSong;
        capaMusica.src = coverSong;
    
        // Reproduzir a primeira música
        audio.play();
        btnPlayImg.src = imgPause;
        soundIsplaying = true;
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


 

  /*song = dados["data"]["title"];
  previewSong = dados["data"]["preview"];
  songAutor = dados["data"]["artist"]["name"];
  coverSmall = dados["data"]["album"]["cover_medium"];
  const duration = dados["data"]["duration"];*/

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

btnPrevius.addEventListener("click", (i) => {
  audio.pause();
  if (qualLista === 'artist'){
    muiscAtualArtist--;
    if(muiscAtualArtist < 0){
      muiscAtualArtist = 0
    }
    qualLista === 'artist'
    nameSong = dadosArtist["data"][muiscAtualArtist]["title"];
    songAutor = dadosArtist["data"][muiscAtualArtist]["artist"]["name"];
    contributors = dadosArtist["data"][muiscAtualArtist]["contributors"];
    previewSong = dadosArtist["data"][muiscAtualArtist]["preview"];
    coverSong = dadosArtist["data"][muiscAtualArtist]["album"]["cover_medium"];
    duration = dadosArtist["data"][muiscAtualArtist]["duration"];
    const NamesContributors = contributors.map(contributor => String(contributor.name)).join(', ');
    playerCantor.innerText = NamesContributors;
  } else{
    muiscAtualCard--;
    if(muiscAtualCard < 0){
      muiscAtualCard = 0
    }
    nameSong = dados["data"][muiscAtualCard]["title"];
    songAutor = dados["data"][muiscAtualCard]["artist"]["name"];
    previewSong = dados["data"][muiscAtualCard]["preview"];
    coverSong = dados["data"][muiscAtualCard]["album"]["cover_medium"];
    duration = dados["data"][muiscAtualCard]["duration"];
    playerCantor.innerText = songAutor;
  }

  playerMusica.innerText = nameSong;
  
  capaMusica.src = coverSong;

  audio = new Audio(previewSong);
  audio.play();
});

btnNext.addEventListener("click", () => {
  audio.pause();
  if (qualLista === 'artist'){
    muiscAtualArtist++

    if(muiscAtualArtist >= dadosArtist["data"].length){
      muiscAtualArtist --
    }
    qualLista === 'artist'
    nameSong = dadosArtist["data"][muiscAtualArtist]["title"];
    songAutor = dadosArtist["data"][muiscAtualArtist]["artist"]["name"];
    contributors = dadosArtist["data"][muiscAtualArtist]["contributors"];
    previewSong = dadosArtist["data"][muiscAtualArtist]["preview"];
    coverSong = dadosArtist["data"][muiscAtualArtist]["album"]["cover_medium"];
    duration = dadosArtist["data"][muiscAtualArtist]["duration"];
    const NamesContributors = contributors.map(contributor => String(contributor.name)).join(', ');
    playerCantor.innerText = NamesContributors;
  } else{
    muiscAtualCard++;
    if(muiscAtualCard >= dados["data"].length){
      muiscAtualCard --
    }
    nameSong = dados["data"][muiscAtualCard]["title"];
    songAutor = dados["data"][muiscAtualCard]["artist"]["name"];
    previewSong = dados["data"][muiscAtualCard]["preview"];
    coverSong = dados["data"][muiscAtualCard]["album"]["cover_medium"];
    duration = dados["data"][muiscAtualCard]["duration"];
    playerCantor.innerText = songAutor;
  }
  playerMusica.innerText = nameSong;
  capaMusica.src = coverSong;

  audio = new Audio(previewSong);
  audio.play();
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

recognition.addEventListener('result', (e) => {
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  // Atualiza o valor do campo de pesquisa com o texto reconhecido
  searchInput.value = text;

  clearTimeout(timeoutId); // Limpa o timeout anterior, se houver
  timeoutId = setTimeout(function () {
    const searchTerm = text.toLowerCase();

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
  }, 500); // Aguarda 500ms antes de chamar a função requestApi()
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

volumeSlider.onchange = () => setVolume();

function setVolume(){
  audio.volume = volumeSlider.value / 100
}



