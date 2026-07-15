/*==================================================
BANIN UNIVERSE
MAIN v2.0
Cinematic Loading + Click To Enter
==================================================*/

"use strict";

/*==================================================
BOOT
==================================================*/

if(document.readyState === "loading"){

    document.addEventListener(
        "DOMContentLoaded",
        startUniverse,
        {
            once:true
        }
    );

}else{

    startUniverse();

}
/*==================================================
START
==================================================*/

async function startUniverse(){

const loadingStartTime = performance.now();

    console.log(
        "🌙 Banin Universe Booting..."
    );

const minimumLoadingDuration =
    5000;

const elapsedLoadingTime =
    performance.now() -
    loadingStartTime;

const remainingLoadingTime =
    Math.max(
        0,
        minimumLoadingDuration -
        elapsedLoadingTime
    );

if(remainingLoadingTime > 0){

    await new Promise(
        resolve => {

            window.setTimeout(
                resolve,
                remainingLoadingTime
            );

        }
    );

}

    if(
        typeof LoadingScreen !==
        "undefined"
    ){

        LoadingScreen.create();

        LoadingScreen.setStatus(
            "دارم دنیای کوچیکمون رو روشن می‌کنم..."
        );

    }

    /*
        Initialize the entire world while
        the loading screen is still visible.
    */
    initializeModules();

    /*
        Start the Engine behind the loading screen.
        World animations and particles can settle
        before the user enters.
    */
    Engine.start();

    /*
        Preload important Banin Universe assets.
    */
    if(
        typeof WorldLoader !==
        "undefined" &&
        typeof WorldLoader.load ===
        "function"
    ){

        await WorldLoader.load(
            data => {

                if(
                    typeof LoadingScreen ===
                    "undefined"
                ){
                    return;
                }

                LoadingScreen.setProgress(
                    data.progress
                );

                LoadingScreen.setStatus(
                    getLoadingMessage(
                        data.progress
                    )
                );

            }
        );

    }

    if(
        typeof LoadingScreen !==
        "undefined"
    ){

        LoadingScreen.markReady();

    }else{

        hideLoading();

    }

    console.log(
        "✅ Banin Universe Ready To Enter"
    );

}

/*==================================================
LOADING MESSAGES
==================================================*/

function getLoadingMessage(progress){

    const value =
        Number(progress) || 0;

    if(value < 20){

        return "دارم آسمون بنین رو پر از ستاره می‌کنم...";

    }

    if(value < 40){

        return "دارم نور ماه رو روی دنیامون می‌ریزم...";

    }

    if(value < 60){

        return "دارم خاطره‌هامون رو کنار هم می‌چینم...";

    }

    if(value < 80){

        return "دارم قصه‌مون رو ورق می‌زنم...";

    }

    if(value < 100){

        return "فقط چند لحظه تا روشن شدن دنیامون مونده...";

    }

    return "همه‌چیز آماده‌ست...";

}

/*==================================================
INITIALIZE ALL MODULES
==================================================*/

function initializeModules(){

    initializeWorld();

    initializeParticles();

    if(
        typeof initializeGallery ===
        "function"
    ){

        initializeGallery();

    }

    if(
        typeof initializeStory ===
        "function"
    ){

        initializeStory();

    }

    if(
        typeof initializeDiary ===
        "function"
    ){

        initializeDiary();

    }

    if(
        typeof initializeGifts ===
        "function"
    ){

        initializeGifts();

    }

    if(
        typeof initializeMusic ===
        "function"
    ){

        initializeMusic();

    }

    if(
        typeof initializeSave ===
        "function"
    ){

        initializeSave();

    }

}

/*==================================================
GLOBAL SHORTCUTS
==================================================*/

window.App =
    App;

window.World =
    World;

window.Engine =
    Engine;

window.Settings =
    Settings;