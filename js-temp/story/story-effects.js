/*==================================================
🌙 BANIN UNIVERSE
Story Effects System
==================================================*/

"use strict";

const StoryEffects = {

    initialized: false,

    particles: [],

    /*==============================
    Init
    ==============================*/

    init(){

        if(this.initialized) return;

        this.initialized = true;

        this.createContainer();

    },

    /*==============================
    Container
    ==============================*/

    createContainer(){

        let container = document.getElementById("storyEffects");

        if(container) return;

        container = document.createElement("div");

        container.id = "storyEffects";

        document.body.appendChild(container);

    },

    /*==============================
    Book Glow
    ==============================*/

    glowBook(book){

        if(!book) return;

        book.animate(

            [

                {
                    boxShadow:"0 0 0px rgba(255,255,255,0)"
                },

                {
                    boxShadow:"0 0 40px rgba(255,255,255,.5)"
                },

                {
                    boxShadow:"0 0 20px rgba(255,255,255,.2)"
                }

            ],

            {

                duration:900,

                easing:"ease-out"

            }

        );

    },

    /*==============================
    Page Flash
    ==============================*/

    flash(){

        const flash = document.createElement("div");

        flash.className = "storyFlash";

        document.body.appendChild(flash);

        flash.animate(

            [

                {

                    opacity:0

                },

                {

                    opacity:.35

                },

                {

                    opacity:0

                }

            ],

            {

                duration:350

            }

        );

        setTimeout(()=>{

            flash.remove();

        },350);

    },

    /*==============================
    Floating Dust
    ==============================*/

    spawnDust(){

        const container = document.getElementById("storyEffects");

        if(!container) return;

        const dust = document.createElement("div");

        dust.className = "storyDust";

        dust.style.left =
            Math.random()*100+"%";

        dust.style.animationDuration =
            (5+Math.random()*4)+"s";

        container.appendChild(dust);

        setTimeout(()=>{

            dust.remove();

        },9000);

    },

    /*==============================
    Magic Spark
    ==============================*/

    magicBurst(x,y){

        const container =
            document.getElementById("storyEffects");

        if(!container) return;

        for(let i=0;i<12;i++){

            const p=document.createElement("div");

            p.className="magicParticle";

            p.style.left=x+"px";

            p.style.top=y+"px";

            p.style.setProperty("--dx",
                (Math.random()*120-60)+"px");

            p.style.setProperty("--dy",
                (Math.random()*120-60)+"px");

            container.appendChild(p);

            setTimeout(()=>{

                p.remove();

            },1200);

        }

    }

};