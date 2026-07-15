/*==================================================
BANIN UNIVERSE
WORLD v1.0
==================================================*/

"use strict";

/*==================================================
WORLD
==================================================*/

const World = {

    loading: null,

    background: null,
    backgroundImage: null,

    moon: null,

    tree: null,
    lantern: null,

    starCanvas: null,
    ctx: null,

    width: 0,
    height: 0

};

/*==================================================
SETTINGS
==================================================*/

const Settings = {

    menu:{

        bottom:60

    }

};

/*==================================================
INITIALIZE WORLD
==================================================*/

function initializeWorld(){

    cacheWorldElements();

if(typeof BaninUniverseLogo !== "undefined"){
    BaninUniverseLogo.create();
}

if(typeof MiladSignature !== "undefined"){
    MiladSignature.create();
}

Moon.create();

    Tree.create();

    Swing.create();

    Lantern.create();

    Girl.create();

    StoryBookObject.create();

    DiaryObject.create();

    GalleryObject.create();

    GalleryPanel.create();

    GiftObject.create();

    if(typeof MusicObject !== "undefined"){
        MusicObject.create();
    }
  
    if(typeof WorldInteractions !== "undefined"){
        WorldInteractions.create();
    }

    if(typeof StoryBookSystem !== "undefined"){
        StoryBookSystem.create();
    }

    resizeWorld();

    window.addEventListener("resize", resizeWorld);

}

/*==================================================
CACHE
==================================================*/

function cacheWorldElements(){

    World.loading = document.getElementById("loadingScreen");

    World.background = document.getElementById("backgroundLayer");
    World.backgroundImage = document.getElementById("backgroundImage");

    World.moon = document.getElementById("moon");

    World.tree = document.getElementById("treeContainer");
    World.lantern = document.getElementById("lanternContainer");

    World.starCanvas = document.getElementById("starCanvas");

    if(World.starCanvas){

        World.ctx = World.starCanvas.getContext("2d");

    }

}

/*==================================================
RESIZE
==================================================*/

function resizeWorld(){

    World.width = window.innerWidth;
    World.height = window.innerHeight;

    if(World.starCanvas){

        World.starCanvas.width = World.width;
        World.starCanvas.height = World.height;
        
    }

    if(typeof BaninUniverseLogo !== "undefined"){
        BaninUniverseLogo.resize();
    }

    Moon.resize();

    Tree.resize();;

    Swing.resize();

    Lantern.resize();

    Girl.resize();

    StoryBookObject.resize();

    DiaryObject.resize();

    GalleryObject.resize();

    GiftObject.resize();

    if(typeof MusicObject !== "undefined"){
        MusicObject.resize();
    }

}

/*==================================================
UPDATE WORLD
==================================================*/

function updateWorld(){

    if(typeof BaninUniverseLogo !== "undefined"){
        BaninUniverseLogo.update();
    }

    Moon.update();

    Tree.update();

    Swing.update();

    Lantern.update();

    Girl.update();

    StoryBookObject.update();

    DiaryObject.update();

    GalleryObject.update();

    GiftObject.update();

    if(typeof MusicObject !== "undefined"){
        MusicObject.update();
    }

}


/*==================================================
LOADING
==================================================*/

function hideLoading(){

    if(!World.loading) return;

    World.loading.classList.add("hidden");

}