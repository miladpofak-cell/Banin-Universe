/*==================================================
BANIN UNIVERSE
GIRL OBJECT
Disabled because girl is now inside swing artwork
==================================================*/

"use strict";

const Girl = {

    element: null,
    initialized: false,

    create(){

        console.log("👧 Girl disabled: included in swing artwork");

        this.element = document.getElementById("girlContainer");

        if(this.element){

            this.element.innerHTML = "";
            this.element.style.display = "none";
            this.element.style.visibility = "hidden";
            this.element.style.opacity = "0";
            this.element.style.pointerEvents = "none";

        }

        this.initialized = true;

    },

    resize(){},

    update(){},

    destroy(){

        if(this.element){
            this.element.innerHTML = "";
        }

        this.element = null;
        this.initialized = false;

    }

};

window.Girl = Girl;