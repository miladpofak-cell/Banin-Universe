/*==================================================
🌙 BANIN UNIVERSE
Story Audio System
==================================================*/

"use strict";

const StoryAudio = {

    /*==============================
    Audio References
    ==============================*/

    sounds: {

        open: null,
        close: null,
        flip: null,
        typing: null,
        music: null

    },

    initialized: false,

    /*==============================
    Init
    ==============================*/

    init(){

        if(this.initialized) return;

        this.initialized = true;

        this.sounds.open =
            document.getElementById("storyOpenSound");

        this.sounds.close =
            document.getElementById("storyCloseSound");

        this.sounds.flip =
            document.getElementById("storyFlipSound");

        this.sounds.typing =
            document.getElementById("storyTypingSound");

        this.sounds.music =
            document.getElementById("storyMusic");

    },

    /*==============================
    Generic Play
    ==============================*/

    play(audio){

        if(!audio) return;

        audio.currentTime = 0;

        audio.play().catch(()=>{});

    },

    /*==============================
    Open Book
    ==============================*/

    playOpen(){

        this.play(this.sounds.open);

    },

    /*==============================
    Close Book
    ==============================*/

    playClose(){

        this.play(this.sounds.close);

    },

    /*==============================
    Flip Page
    ==============================*/

    playFlip(){

        this.play(this.sounds.flip);

    },

    /*==============================
    Typing
    ==============================*/

    playTyping(){

        this.play(this.sounds.typing);

    },

    stopTyping(){

        if(!this.sounds.typing) return;

        this.sounds.typing.pause();
        this.sounds.typing.currentTime = 0;

    },

    /*==============================
    Chapter Music
    ==============================*/

    playMusic(src){

        if(!this.sounds.music) return;

        this.sounds.music.src = src;

        this.sounds.music.volume = 0.35;

        this.sounds.music.play().catch(()=>{});

    },

    stopMusic(){

        if(!this.sounds.music) return;

        this.sounds.music.pause();

        this.sounds.music.currentTime = 0;

    },

    setMusicVolume(value){

        if(!this.sounds.music) return;

        this.sounds.music.volume = value;

    }

};