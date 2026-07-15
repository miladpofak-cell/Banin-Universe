/*==================================================
🌙 BANIN UNIVERSE
Story Typing System
==================================================*/

"use strict";

const StoryTyping = {

    speed: 35,

    timer: null,

    currentText: "",

    currentIndex: 0,

    target: null,

    typing: false,

    /*==============================
    Start Typing
    ==============================*/

    start(target, text){

        this.stop();

        if(!target) return;

        this.target = target;
        this.currentText = text;
        this.currentIndex = 0;

        this.target.innerHTML = "";

        this.typing = true;

        StoryAudio.playTyping();

        this.type();
    },

    /*==============================
    Type Loop
    ==============================*/

    type(){

        if(!this.typing) return;

        if(this.currentIndex >= this.currentText.length){

            this.finish();

            return;

        }

        this.target.innerHTML +=
            this.currentText.charAt(this.currentIndex);

        this.currentIndex++;

        this.timer = setTimeout(()=>{

            this.type();

        },this.speed);

    },

    /*==============================
    Finish
    ==============================*/

    finish(){

        this.typing = false;

        clearTimeout(this.timer);

        StoryAudio.stopTyping();

    },

    /*==============================
    Skip Typing
    ==============================*/

    skip(){

        if(!this.typing) return;

        clearTimeout(this.timer);

        this.target.innerHTML = this.currentText;

        this.finish();

    },

    /*==============================
    Stop
    ==============================*/

    stop(){

        clearTimeout(this.timer);

        StoryAudio.stopTyping();

        this.typing = false;

    },

    /*==============================
    Speed
    ==============================*/

    setSpeed(value){

        this.speed = value;

    }

};