window.addEventListener("DOMContentLoaded",()=> {
    
    const backward = document.querySelector(".Play-pre");
    const forward = document.querySelector(".Play-nex");
    let arrayAudio = ["mailinh","CafeinFreeStyle","Van","Finale2","OTrongThanhPho","TaCoNen","AixWasabi"];
    let arrayTitle = ["Mai linh - 24k Right","Cafe in FreeStyle - 24k Right","Vẫn - 24k Right","Finale 2 - Bray","Ở Trong Thành Phố - Bray x Masew","Ta CÓ Nên - Bray","Ai x Wasabi - Bray x Young H feat. Masew"];
    let indexAudio = 0;
    let audio = document.getElementById("song");
    const play = document.querySelector(".Play-play");
    const Img = document.querySelector(".Play-img");
    const PlayDuration = document.querySelector(".Play-duration");
    const Playremain = document.querySelector(".Play-remaining");
    const bar = document.getElementById("progress-bar");
    const layer = document.querySelector(".layer");
    const title = document.querySelector(".Play-title");
    var state = true;
    var audioDuration = Math.floor(audio.duration);
    bar.setAttribute("value",0);
    function Run() {
        const delay = setInterval(function() {
            if (state === false) {
                state = true;
                clearInterval(delay);
                return;
            }
            if (remain.sec - 1 < 0) {
                if (remain.min - 1 < 0) {
                    play.classList = "fa fa-play Play-play";
                    audio.pause();
                    Img.style.animationPlayState = `paused`;
                    clearInterval(delay);
                    return;
                } else {
                    remain.min--;
                    remain.sec = 60;
                }
            } else {
                remain.sec--;
            }
            if (during.sec + 1 > 60) {
            during.min++;
            during.sec = 0;
            } else {
                during.sec++;
            }
            Playremain.textContent = `${remain.min}:${remain.sec}`;
            PlayDuration.textContent = `${during.min}:${during.sec}`;
            bar.value = Math.floor(audio.currentTime);
        },1000);
    }
    play.addEventListener("click",() => {
        if (play.matches(".fa-play")) {
            if (Math.floor(audio.currentTime) === audioDuration) {
                // Nếu audio đã hết và cho chạy lại
                setDuringAndRemain(timeAudio);
                Playremain.textContent = `${remain.min}:${remain.sec}`;
                PlayDuration.textContent = `${during.min}:${during.sec}`;
                audio.currentTime = 0;
                audio.play();
                play.classList = "fa fa-pause Play-play";
                Img.style.animation = `autoRote 3s forwards infinite linear`;
                Run();
                bar.value = 0;                
            } else {
                play.classList = "fa fa-pause Play-play";
                audio.play();
                Img.style.animation = `autoRote 3s forwards infinite linear`;
                Run();
            }
        } else {
            play.classList = "fa fa-play Play-play";
            audio.pause();
            Img.style.animationPlayState = `paused`;
            state = false;
        }
    })
    let timeAudio = audioDuration; 
    let remain = {};
    let during = {
        "min":0,
        "sec":0
    };
    function setDuringAndRemain(timeAudio,state = true) {
        if ((timeAudio / 60) >= 1) {
            remain = {
                "min":Math.floor(timeAudio / 60),
                "sec":timeAudio - (Math.floor(timeAudio / 60) * 60)
            }  
        } else {
            remain = {
                "min":0,
                "sec":timeAudio
            }
        }
        if (state === true) {
            during = {
                "min":0,
                "sec":0
            };
        } else {
            during = {
                "min":Math.floor( ((audioDuration - timeAudio) / 60)),
                "sec":(audioDuration - timeAudio) - (Math.floor(((audioDuration - timeAudio) / 60)) * 60)
            };
        }
    }
    setDuringAndRemain(timeAudio);
    
    Playremain.textContent = `${remain.min}:${remain.sec}`;
    PlayDuration.textContent = `${during.min}:${during.sec}`;

    // làm thanh bar
    bar.setAttribute("max",audioDuration);
    bar.addEventListener("change",(e) => {
        let valueBar = parseInt(e.target.value);
        audio.currentTime = valueBar;
        setDuringAndRemain(Math.floor(audioDuration - valueBar),false);
        Playremain.textContent = `${remain.min}:${remain.sec}`;
        PlayDuration.textContent = `${during.min}:${during.sec}`;
        e.target.value = valueBar;
    })
    // 
    // make forward audio
    forward.addEventListener("click",()=> {
        layer.style.display = `flex`;
        indexAudio = (indexAudio+1) >= arrayAudio.length ? 0 : indexAudio+1;
        document.querySelector("#song").setAttribute("src",`./files/${arrayAudio[indexAudio]}.mp3`);
        Img.setAttribute("src",`./files/${arrayAudio[indexAudio]}.PNG`);
        if (!play.matches(".fa-play")) {
            state = false;
        }
        play.classList = "fa fa-play Play-play";
        audio.pause();
        Img.style.animationPlayState = `paused`;
        setTimeout(function () {
            title.textContent = arrayTitle[indexAudio];
            layer.style.display = `none`;
            audioDuration = Math.floor(audio.duration);
            let timeAudio = audioDuration; 
            setDuringAndRemain(timeAudio);
            bar.setAttribute("max",audioDuration);
            bar.value = 0;
            Playremain.textContent = `${remain.min}:${remain.sec}`;
            PlayDuration.textContent = `${during.min}:${during.sec}`;
        },2000);
    })
    backward.addEventListener("click",()=> {
        title.textContent = arrayTitle[indexAudio];
        layer.style.display = `flex`;
        indexAudio = (indexAudio-1) < 0 ? arrayAudio.length-1 : indexAudio-1;
        document.querySelector("#song").setAttribute("src",`./files/${arrayAudio[indexAudio]}.mp3`);
        Img.setAttribute("src",`./files/${arrayAudio[indexAudio]}.PNG`);
        if (!play.matches(".fa-play")) {
            state = false;
        }
        play.classList = "fa fa-play Play-play";
        audio.pause();
        Img.style.animationPlayState = `paused`;
        setTimeout(function () {
            layer.style.display = `none`;
            audioDuration = Math.floor(audio.duration);
            let timeAudio = audioDuration; 
            setDuringAndRemain(timeAudio);
            bar.setAttribute("max",audioDuration);
            bar.value = 0;
            Playremain.textContent = `${remain.min}:${remain.sec}`;
            PlayDuration.textContent = `${during.min}:${during.sec}`;
            
        },2000);
    })
})