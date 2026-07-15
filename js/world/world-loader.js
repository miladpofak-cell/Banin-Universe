/*==================================================
BANIN UNIVERSE
WORLD ASSET LOADER
Real Image + Audio Preloading
==================================================*/

"use strict";

const WorldLoader = {

    assets: {},

    loadedCount: 0,
    totalCount: 0,

    async load(onProgress){

        console.log(
            "🌙 Loading Banin Universe Assets..."
        );

        const assetList =
            this.getAssetList();

        this.loadedCount = 0;
        this.totalCount =
            assetList.length;

        if(!this.totalCount){

            this.reportProgress(
                onProgress
            );

            return;
        }

        await Promise.all(
            assetList.map(
                asset =>
                    this.loadAsset(asset)
                        .catch(
                            error => {

                                console.warn(
                                    "⚠️ Asset load failed:",
                                    asset.src,
                                    error
                                );

                            }
                        )
                        .finally(
                            () => {

                                this.loadedCount += 1;

                                this.reportProgress(
                                    onProgress,
                                    asset
                                );

                            }
                        )
            )
        );

        console.log(
            "✅ Banin Universe Assets Loaded"
        );

    },

    getAssetList(){

    /*
        Only assets required for the opening world
        are loaded before entry.

        Story pages, encrypted Gallery photos,
        panel backgrounds and music will load
        only when they are actually needed.
    */

    const assets = [

        {
            type:
                "image",

            src:
                "assets/images/background.webp"
        },

        {
            type:
                "image",

            src:
                "assets/world/moon.webp"
        },

        

        {
             type:
                 "image",

             src:
                 "assets/world/girl-swing.webp"
        },

        {
            type:
                "image",

            src:
                "assets/world/lantern.webp"
        },

        {
            type:
                "image",

            src:
                "assets/world/story-book.webp"
        },

        {
            type:
                "image",

            src:
                "assets/world/gallery-object.webp"
        },

        {
            type:
                "image",

            src:
                "assets/world/gift.webp"
        },

        {
            type:
                "image",

            src:
                "assets/world/music-object.webp"
        },

        {
            type:
                "image",

            src:
                "assets/world/banin-universe-logo.webp"
        },

        {
            type:
                "image",

            src:
                "assets/world/milad-signature.webp"
        }

    ];


    return this.removeDuplicates(
        assets
    );

},

    removeDuplicates(assetList){

        const seen =
            new Set();

        return assetList.filter(
            asset => {

                if(
                    !asset ||
                    !asset.src ||
                    seen.has(asset.src)
                ){
                    return false;
                }

                seen.add(asset.src);

                return true;

            }
        );

    },

    loadAsset(asset){

        if(asset.type === "audio"){

            return this.loadAudio(
                asset.src
            );

        }

        return this.loadImage(
            asset.src
        );

    },

    loadImage(src){

        return new Promise(
            resolve => {

                const image =
                    new Image();

                image.onload =
                    () => {

                        this.assets[src] =
                            image;

                        resolve(image);

                    };

                image.onerror =
                    () => {

                        console.warn(
                            "⚠️ Image not found:",
                            src
                        );

                        resolve(null);

                    };

                image.src =
                    src;

            }
        );

    },

    loadAudio(src){

        return new Promise(
            resolve => {

                const audio =
                    document.getElementById(
                        "bgMusic"
                    ) ||
                    new Audio();

                let finished =
                    false;

                const finish =
                    () => {

                        if(finished){
                            return;
                        }

                        finished = true;

                        audio.removeEventListener(
                            "canplaythrough",
                            finish
                        );

                        audio.removeEventListener(
                            "loadeddata",
                            finish
                        );

                        audio.removeEventListener(
                            "error",
                            finish
                        );

                        this.assets[src] =
                            audio;

                        resolve(audio);

                    };

                audio.addEventListener(
                    "canplaythrough",
                    finish,
                    {
                        once:true
                    }
                );

                audio.addEventListener(
                    "loadeddata",
                    finish,
                    {
                        once:true
                    }
                );

                audio.addEventListener(
                    "error",
                    finish,
                    {
                        once:true
                    }
                );

                if(!audio.src){

                    audio.src =
                        src;

                }

                audio.preload =
                    "auto";

                audio.load();

                window.setTimeout(
                    finish,
                    5000
                );

            }
        );

    },

    reportProgress(
        onProgress,
        currentAsset = null
    ){

        const progress =
            this.totalCount
                ? (
                    this.loadedCount /
                    this.totalCount
                ) * 100
                : 100;

        if(
            typeof onProgress ===
            "function"
        ){

            onProgress({
                loaded:
                    this.loadedCount,

                total:
                    this.totalCount,

                progress,

                asset:
                    currentAsset
            });

        }

    }

};

window.WorldLoader =
    WorldLoader;