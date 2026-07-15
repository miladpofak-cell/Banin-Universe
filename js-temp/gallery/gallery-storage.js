/*==================================================
BANIN UNIVERSE
Gallery Storage Module v1.0
==================================================*/

"use strict";

/*==================================================
CONFIG
==================================================*/

const GalleryConfig = {

    password: "banin",

    storageKeys: {

        unlocked: "banin_gallery_unlocked",

        lastImage: "banin_gallery_last_image"

    }

};

/*==================================================
STATE
==================================================*/

const GalleryStorage = {

    unlocked: false

};

/*==================================================
INIT
==================================================*/

function initializeGalleryStorage(){

    loadGalleryState();

}

/*==================================================
LOAD
==================================================*/

function loadGalleryState(){

    const value = localStorage.getItem(
        GalleryConfig.storageKeys.unlocked
    );

    GalleryStorage.unlocked = value === "true";

}

/*==================================================
SAVE
==================================================*/

function saveGalleryState(){

    localStorage.setItem(

        GalleryConfig.storageKeys.unlocked,

        GalleryStorage.unlocked

    );

}

/*==================================================
UNLOCK
==================================================*/

function unlockGallery(password){

    if(password !== GalleryConfig.password){

        return false;

    }

    GalleryStorage.unlocked = true;

    saveGalleryState();

    return true;

}

/*==================================================
LOCK
==================================================*/

function lockGallery(){

    GalleryStorage.unlocked = false;

    saveGalleryState();

}

/*==================================================
CHECK
==================================================*/

function isGalleryUnlocked(){

    return GalleryStorage.unlocked;

}

/*==================================================
LAST IMAGE
==================================================*/

function saveLastImage(index){

    localStorage.setItem(

        GalleryConfig.storageKeys.lastImage,

        index

    );

}

function loadLastImage(){

    const value = localStorage.getItem(

        GalleryConfig.storageKeys.lastImage

    );

    if(value === null){

        return 0;

    }

    return Number(value);

}

/*==================================================
RESET
==================================================*/

function resetGalleryStorage(){

    localStorage.removeItem(

        GalleryConfig.storageKeys.unlocked

    );

    localStorage.removeItem(

        GalleryConfig.storageKeys.lastImage

    );

    GalleryStorage.unlocked = false;

}

/*==================================================
PUBLIC API
==================================================*/

window.GalleryStorage = GalleryStorage;

window.initializeGalleryStorage = initializeGalleryStorage;

window.unlockGallery = unlockGallery;

window.lockGallery = lockGallery;

window.isGalleryUnlocked = isGalleryUnlocked;

window.saveLastImage = saveLastImage;

window.loadLastImage = loadLastImage;

window.resetGalleryStorage = resetGalleryStorage;