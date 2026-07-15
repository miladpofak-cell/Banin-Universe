/*==================================================
🌙 BANIN UNIVERSE
Story Storage System
==================================================*/

"use strict";

const StoryStorage = {

    saveKey: "BaninUniverse_Story",

    /*==============================
    Save Current Page
    ==============================*/

    save(page){

        const data = {

            page: page,
            time: Date.now()

        };

        localStorage.setItem(
            this.saveKey,
            JSON.stringify(data)
        );

    },

    /*==============================
    Load Save
    ==============================*/

    load(){

        const data = localStorage.getItem(this.saveKey);

        if(!data) return null;

        try{

            return JSON.parse(data);

        }

        catch(error){

            console.warn("Story Save Corrupted");

            return null;

        }

    },

    /*==============================
    Last Page
    ==============================*/

    getLastPage(){

        const save = this.load();

        if(!save) return 0;

        return save.page ?? 0;

    },

    /*==============================
    Clear Save
    ==============================*/

    clear(){

        localStorage.removeItem(this.saveKey);

    }

};