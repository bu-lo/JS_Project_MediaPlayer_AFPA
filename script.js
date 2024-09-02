// https://www.w3schools.com/jsref/dom_obj_audio.asp

// *** DECLARATION OF VARIABLES ***
let tabMusic = [
    ["Blue Skies", "B.S Author", "musics/Blue_Skies.mp3", "music0.1"],
    ["Cartoon Hoedown", "C.H Author", "musics/Cartoon_Hoedown.mp3", "music0.2"],
    ["Earthy Crust", "E.C Author", "musics/Earthy_Crust.mp3", "music0.3"],
    ["Hold On a Minute", "H.O.a.M Author", "musics/Hold_On_a_Minute.mp3", "music0.4"],
    ["John Dunbar", "J.D Movie Theme", "musics/JohnDunbarTheme.mp3", "music0.5"],
    ["Stay With You", "S.W.Y Author", "musics/Stay_With_You.mp3", "music0.6"],
    ["Symphony No 5", "Beethoven", "musics/Symphony_No_5_by_Beethoven.mp3", "music0.7"]
];

console.log(tabMusic);

let currentMusicIndex = -1;
let currentMusicVolume = 0.5;
const mediaplayer = document.getElementById("mediaplayer");

// *** INITIALIZATION ***
window.onload = function () {
    mediaplayer.src = tabMusic[currentMusicIndex][2];
    mediaplayer.volume = currentMusicVolume;
}

// Initiaization music // tabMusic                             /////////////////////////////////////
const musicSpace = document.getElementById('music_space');
const articles = musicSpace.getElementsByClassName('music');

tabMusic.forEach((music, index) => {
    const article = articles[index];
    if (article) {
        // Mettre à jour le titre et le nom de l'auteur
        const titleElement = article.querySelector('.p1');
        const artistElement = article.querySelector('.p3');
        
        titleElement.textContent = music[0]; // Title
        artistElement.textContent = music[1]; // Author
    }
});


// *** FUNCTIONS ***

function highlightCurrentMusic() {
    document.querySelectorAll('.music').forEach(element => {
        element.classList.remove('highlighted');
    });

    const currentMusicElement = document.getElementById(tabMusic[currentMusicIndex][3]);
    if (currentMusicElement) {
        currentMusicElement.classList.add('highlighted');
    }
}

// Initiaization music // tabMusic                             /////////////////////////////////////
function playMusicById(id) {                                
    const music = tabMusic.find(music => music[3] === id);
    if (music) {
        currentMusicIndex = tabMusic.indexOf(music);
        mediaplayer.src = music[2];
        play();
        highlightCurrentMusic();
    }
}

function play() {
    if (currentMusicIndex === -1) {
        currentMusicIndex = 0;
        mediaplayer.src = tabMusic[currentMusicIndex][2];
    }
    mediaplayer.play();
    highlightCurrentMusic();
    updateMusicDetails();
}

function pause() {
    mediaplayer.pause();
}

function next() {
    if (currentMusicIndex < tabMusic.length - 1){
        currentMusicIndex ++;
    }else{
        currentMusicIndex = 0;
    }
    mediaplayer.src = tabMusic[currentMusicIndex][2];
    play();
}

function previous() {
    if (currentMusicIndex > 0 ){
        currentMusicIndex --;
    }
    mediaplayer.src = tabMusic[currentMusicIndex][2];
    play();
}

function lowerSound(){
    console.log(currentMusicVolume);
    if(currentMusicVolume > 0.1){
        currentMusicVolume -= 0.1;
        currentMusicVolume = Math.round(currentMusicVolume*10)/10;
    } else {
        currentMusicVolume = 0;
    }
    mediaplayer.volume = currentMusicVolume;
    updateDownIcon();
    console.log(mediaplayer.volume);
}

function increaseSound(){
    console.log(currentMusicVolume);
    if(currentMusicVolume < 1){
        currentMusicVolume += 0.1;
        currentMusicVolume = Math.round(currentMusicVolume*10)/10;
    }
    mediaplayer.volume = currentMusicVolume;
    updateDownIcon();
    console.log(mediaplayer.volume);
}

function updateMusicDetails() {
    if (currentMusicIndex >= 0 && currentMusicIndex < tabMusic.length) {
        document.getElementById("Author").textContent = tabMusic[currentMusicIndex][1];
        document.getElementById("Title").textContent = tabMusic[currentMusicIndex][0];
    }
}


function filterMusic() {                                 /////////////////////////////////////
    const query = document.getElementById('search_input').value.toLowerCase();
    
    // forEach music
    document.querySelectorAll('.music').forEach(article => {
        const title = article.querySelector('.p1').textContent.toLowerCase();
        const artist = article.querySelector('.p3').textContent.toLowerCase();
        
        // == Research ?
        if (title.includes(query) || artist.includes(query)) {
            article.style.display = ''; 
        } else {
            article.style.display = 'none';
        }
    });
}

function updateDownIcon() {
    if (document.getElementById('smaller_range').value == 0) {
        document.getElementById('down').innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
        document.getElementById('down').innerHTML = '<i class="fa-solid fa-volume-low"></i>';
    }

    if (document.getElementById('smaller_range').value == 1) {
        document.getElementById('up').innerHTML = '<i class="fa-solid fa-plane-departure"></i>';
    } else {
        document.getElementById('up').innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
}


// *** ACTIONS ***

// *** DOC ***

document.querySelectorAll('.music').forEach(element => {
    element.addEventListener('click', function() {
        playMusicById(this.id);
    });
});

document.getElementById("play").addEventListener("click",function() {
    if (mediaplayer.paused){
        play();
    } else{
        pause();
    }
})

document.getElementById("previous").addEventListener("click",function(){
    previous();
})

document.getElementById("next").addEventListener("click",function(){
    next();
})

document.getElementById("up").addEventListener("click",function(){
    increaseSound();
    document.getElementById("smaller_range").value = mediaplayer.volume;
})

document.getElementById("down").addEventListener("click",function(){
    lowerSound();
    document.getElementById("smaller_range").value = mediaplayer.volume;
})


document.getElementById("smaller_range").addEventListener("change",function(){
    mediaplayer.volume = document.getElementById("smaller_range").value;
})


document.getElementById("bigger_range").addEventListener("input",function(){
    mediaplayer.currentTime = (this.value / 100) * mediaplayer.duration;
})

document.getElementById('search_input').addEventListener('input', function(){
    filterMusic();
})

document.getElementById('smaller_range').addEventListener("input",function(){
    updateDownIcon();
})


// ** MEDIAPLAYER **

mediaplayer.addEventListener("timeupdate", function() {
    const timeMediaplayer = (mediaplayer.currentTime / mediaplayer.duration) * 100;
    document.getElementById("bigger_range").value = timeMediaplayer;
});

mediaplayer.addEventListener("ended", function() {
    next();
});



