var music = new Audio();
var musicList
var min
var sec = ''
var totalSec
var index = 0;
//music.autoplay = true;

getMusic(function (list) {
    musicList = list
    loodMusic(list[index])
    for(var i=0;i<musicList.length;i++){
        var li =  document.createElement("li");
        li.innerText = musicList[i].song
        document.querySelector('#musiclist').appendChild(li)
     }
})

document.querySelector('ul').addEventListener('click',function(e){
    document.querySelectorAll('li').forEach(function(li,idx){
        li.classList.remove('active')
        if(e.target == li){
            index = idx
        }
        
    })
    e.target.classList.add('active')  
    loodMusic(musicList[index]) 
    music.play();
    // document.querySelectorAll('.btn')[1].classList.add('icon-yinlebofangye-zanting')
    // document.querySelectorAll('.btn')[1].classList.remove('icon-yinlebofangye-bofang');
    playicon();
})

music.addEventListener('timeupdate', function () {
    
    totalSec = Math.floor(music.duration % 60) + ''
    totalSec = totalSec.length === 2? totalSec : '0' + totalSec
    document.querySelector('#total').innerText = '0' + Math.floor(music.duration / 60) + ':' + totalSec

    min = Math.floor(music.currentTime / 60) + ''
    sec = Math.floor(music.currentTime % 60) + ''
    min = min.length === 2 ? min : '0' + min
    sec = sec.length === 2 ? sec : '0' + sec
    document.querySelector('#now').innerText = min + ':' + sec + '/'
    document.querySelector('#progress-now').style.width = (music.currentTime / music.duration) * 100 + '%'
})

document.querySelectorAll('.btn')[1].onclick = function () {
    if (music.paused) {
        music.play();
        // document.querySelectorAll('.btn')[1].classList.add('icon-yinlebofangye-zanting')
        // document.querySelectorAll('.btn')[1].classList.remove('icon-yinlebofangye-bofang');
        playicon();
    } else {
        music.pause();
        document.querySelectorAll('.btn')[1].classList.add('icon-yinlebofangye-bofang')
        document.querySelectorAll('.btn')[1].classList.remove('icon-yinlebofangye-zanting');
    }
}

document.querySelector('.icon-yinlebofangye-xiayishou').onclick = function () {
    index = (++index) % musicList.length
    loodMusic(musicList[index]);
    music.play();
    // document.querySelectorAll('.btn')[1].classList.add('icon-yinlebofangye-zanting');
    // document.querySelectorAll('.btn')[1].classList.remove('icon-yinlebofangye-bofang');
    playicon();
    document.querySelectorAll('li').forEach(function(li){
        li.classList.remove('active')
    })
    document.querySelectorAll('li')[index].classList.add('active');
}

document.querySelector('.icon-yinlebofangye-shangyishou').onclick = function () {
    index = (musicList.length + --index) % musicList.length 
    loodMusic(musicList[index]);
    music.play();
    // document.querySelectorAll('.btn')[1].classList.add('icon-yinlebofangye-zanting')
    // document.querySelectorAll('.btn')[1].classList.remove('icon-yinlebofangye-bofang');
    playicon();
    document.querySelectorAll('li').forEach(function(li){
        li.classList.remove('active')
    })
    document.querySelectorAll('li')[index].classList.add('active');
}

document.querySelector('#bar').onclick =function(e){
    var percent = e.offsetX/parseInt(getComputedStyle(this).width)
    document.querySelector('#progress-now').style.width= percent*100+'%'
    music.currentTime = music.duration*percent
}

function getMusic(callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://localhost:8080/data.json', true)
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            callback(JSON.parse(xhr.responseText))
        } else {
            console.log("服务器异常")
        }
    }
    xhr.send()
}

function loodMusic(obj) {
    music.src = obj.url;
    document.querySelector('#albumBg').style.backgroundImage = "url(" + obj.albumCover + ")"
    document.querySelector('#title').innerText = obj.song;
    document.querySelector('#songer').innerText = obj.author;

    music.volume = 0.2
}

function playicon(){
    document.querySelectorAll('.btn')[1].classList.add('icon-yinlebofangye-zanting');
    document.querySelectorAll('.btn')[1].classList.remove('icon-yinlebofangye-bofang');
}