var PlayAudio = function (element, url) {
    var audioElem = new Audio(url);
    var audioType = 'audio/' + (url.split('.')).slice(-1);
    
    if ( audioElem.canPlayType(audioType) ) {
        element.innerHTML = '<div><a href="javascript:" class="play_play">Pause</a> <span class="play_time">00:00</span><br><input class="play_range" type="range" value="0"></div>';
        
        var playButton = document.querySelector('.play_play');
        var playTime   = document.querySelector('.play_time');
        var playRange  = document.querySelector('.play_range');
        
        audioElem.addEventListener('timeupdate', function() {
            var time = this.currentTime;
            var minutes = (Math.floor(time / 60) < 10) ? '0' + Math.floor(time / 60) : Math.floor(time / 60);
            var seconds = (Math.floor(time % 60) < 10) ? '0' + Math.floor(time % 60) : Math.floor(time % 60);
            playTime.innerHTML = minutes + ':' + seconds;
            playRange.value = audioElem.currentTime;
        });
        
        audioElem.play();
        
        audioElem.addEventListener('loadedmetadata', function() {
            playRange.max = Math.floor(audioElem.duration);
        });
        
        playRange.addEventListener('change', function() {
            audioElem.currentTime = playRange.value;
        });
        
        playButton.addEventListener('click', function() {
            if ( audioElem.paused ) {
                playButton.innerHTML = "Pause";
                audioElem.play();
            } else {
                playButton.innerHTML = "Play";
                audioElem.pause();
            }
        });
    }
};

PlayAudio(document.querySelector('p'), 'media/Kalimba.mp3');