/*==================================================
BANIN UNIVERSE
ENGINE v1.0
==================================================*/

"use strict";

/*==================================================
APPLICATION STATE
==================================================*/

const App = {

    version: "1.0.0",

    initialized: false

};

/*==================================================
ENGINE
==================================================*/

const Engine = {

    started: false,
    frame: 0,
    fps: 60,

    lastTime: 0,
    deltaTime: 0,
    elapsed: 0,

    start(){

        if(this.started) return;

        this.started = true;

        console.log("🚀 Engine Started");

        this.lastTime = performance.now();

        requestAnimationFrame(this.loop.bind(this));
    },

    loop(currentTime){

        Engine.deltaTime = (currentTime - Engine.lastTime) / 1000;
        Engine.lastTime = currentTime;

        Engine.elapsed += Engine.deltaTime;
        Engine.frame++;

        update();

        requestAnimationFrame(Engine.loop.bind(Engine));
    }

};

/*==================================================
UPDATE
==================================================*/

function update(){

    if(typeof updateWorld === "function"){
        updateWorld();
    }

    if(typeof updateParticles === "function"){
        updateParticles();
    }

    if(typeof updateGallery === "function"){
        updateGallery();
    }

    if(typeof updateStory === "function"){
        updateStory();
    }

    if(typeof updateDiary === "function"){
        updateDiary();
    }

    if(typeof updateGifts === "function"){
        updateGifts();
    }

    if(typeof updateMusic === "function"){
        updateMusic();
    }

}