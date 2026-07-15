/*==================================================
BANIN UNIVERSE
MAIN LOGO OBJECT
Fixed Logo + Moonlight Glow + White Gold Particles
==================================================*/

"use strict";


const BaninUniverseLogo = {

    element: null,

    parts: {},

    initialized: false,
    hovered: false,

    particles: [],

    nextParticleAt: 0,

    imagePath:
        "assets/world/banin-universe-logo.webp",


    /*==================================================
    CREATE
    ==================================================*/

    create(){

        if(this.initialized){
            return;
        }


        this.element =
            document.getElementById(
                "baninUniverseLogoContainer"
            );


        if(!this.element){

            console.warn(
                "❌ baninUniverseLogoContainer not found"
            );

            return;
        }


        this.injectStyles();

        this.setup();

        this.build();

        this.bindEvents();

        this.resize();


        this.initialized =
            true;


        console.log(
            "✨ Banin Universe Logo created"
        );

    },


    /*==================================================
    STYLES
    ==================================================*/

    injectStyles(){

        const oldStyle =
            document.getElementById(
                "baninUniverseLogoStyles"
            );


        if(oldStyle){
            oldStyle.remove();
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "baninUniverseLogoStyles";


        style.textContent = `

            @keyframes baninLogoAuraPulse{

                0%,
                100%{
                    opacity:.42;

                    transform:
                        translate(-50%,-50%)
                        scale(.94);
                }

                50%{
                    opacity:.68;

                    transform:
                        translate(-50%,-50%)
                        scale(1.04);
                }

            }


            @keyframes baninLogoParticleMove{

                0%{
                    opacity:0;

                    transform:
                        translate(-50%,-50%)
                        scale(.28)
                        rotate(0deg);
                }

                14%{
                    opacity:1;
                }

                72%{
                    opacity:.94;
                }

                100%{
                    opacity:0;

                    transform:
                        translate(
                            calc(
                                -50% +
                                var(--logo-particle-x)
                            ),
                            calc(
                                -50% +
                                var(--logo-particle-y)
                            )
                        )
                        scale(1.15)
                        rotate(
                            var(
                                --logo-particle-rotation
                            )
                        );
                }

            }


            .banin-universe-logo-aura{
                position:absolute;

                left:50%;
                top:50%;

                width:112%;
                height:96%;

                transform:
                    translate(-50%,-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        ellipse,
                        rgba(255,255,255,.31) 0%,
                        rgba(222,220,255,.24) 27%,
                        rgba(172,110,255,.14) 50%,
                        transparent 75%
                    );

                filter:
                    blur(24px);

                opacity:.52;

                pointer-events:none;

                animation:
                    baninLogoAuraPulse
                    4.8s
                    ease-in-out
                    infinite;

                transition:
                    opacity .4s ease,
                    filter .4s ease;

                z-index:1;
            }


            .banin-universe-logo-image{
                position:absolute;

                left:50%;
                top:50%;

                width:100%;
                height:100%;

                display:block;

                object-fit:contain;

                transform:
                    translate(-50%,-50%);

                filter:
                    brightness(1.04)
                    saturate(1.04)

                    drop-shadow(
                        0 0 10px
                        rgba(255,255,255,.34)
                    )

                    drop-shadow(
                        0 0 23px
                        rgba(184,130,255,.20)
                    );

                transition:
                    filter .42s ease;

                pointer-events:none;

                user-select:none;
                -webkit-user-drag:none;

                z-index:10;
            }


            .banin-universe-logo-particles{
                position:absolute;

                left:50%;
                top:50%;

                width:112%;
                height:108%;

                transform:
                    translate(-50%,-50%);

                overflow:visible;

                pointer-events:none;

                z-index:20;
            }


            .banin-universe-logo-particle{
                position:absolute;

                left:
                    var(
                        --logo-particle-left
                    );

                top:
                    var(
                        --logo-particle-top
                    );

                color:
                    var(
                        --logo-particle-color
                    );

                font-family:
                    Georgia,
                    serif;

                font-size:
                    var(
                        --logo-particle-size
                    );

                line-height:1;

                text-shadow:
                    0 0 7px
                    currentColor,

                    0 0 15px
                    currentColor,

                    0 0 25px
                    rgba(255,210,104,.40);

                animation:
                    baninLogoParticleMove
                    var(
                        --logo-particle-duration
                    )
                    ease-out
                    both;

                pointer-events:none;

                user-select:none;

                z-index:25;
            }


.banin-universe-logo-hitbox{
    position:absolute;

    left:50%;
    top:47%;

    width:72%;
    height:34%;

    transform:
        translate(-50%,-50%);

    border-radius:34%;

    background:transparent;

    pointer-events:auto;
    cursor:default;

    z-index:100;
}


            #baninUniverseLogoContainer.logo-hovered
            .banin-universe-logo-aura{
                opacity:1;

                filter:
                    blur(30px)
                    brightness(1.28);
            }


            #baninUniverseLogoContainer.logo-hovered
            .banin-universe-logo-image{
                filter:
                    brightness(1.22)
                    saturate(1.13)

                    drop-shadow(
                        0 0 12px
                        rgba(255,255,255,.88)
                    )

                    drop-shadow(
                        0 0 28px
                        rgba(255,226,143,.48)
                    )

                    drop-shadow(
                        0 0 48px
                        rgba(177,104,255,.50)
                    );
            }

        `;


        document.head.appendChild(
            style
        );

    },


    /*==================================================
    SETUP
    ==================================================*/

setup(){

    this.element.innerHTML =
        "";


    /*
    Logo must stay attached directly to the page,
    outside the transformed world and camera layers.
    */

    if(
        this.element.parentElement !==
        document.body
    ){
        document.body.appendChild(
            this.element
        );
    }


    this.element.style.position =
        "fixed";

    this.element.style.left =
        "50%";

    this.element.style.top =
        "43%";

    this.element.style.width =
        "620px";

    this.element.style.height =
        "310px";

    this.element.style.display =
        "block";

    this.element.style.visibility =
        "visible";

    this.element.style.opacity =
        "1";

    this.element.style.overflow =
        "visible";

/*
The transparent logo container must never block
the objects behind it. Only its hitbox receives mouse events.
*/
this.element.style.pointerEvents =
    "none";

    this.element.style.transform =
        "translate(-50%, -50%)";

    this.element.style.transformOrigin =
        "center center";

    this.element.style.zIndex =
        "10020";

    this.element.style.willChange =
        "auto";


    this.element.classList.remove(
        "logo-hovered"
    );


    this.hovered =
        false;

    this.nextParticleAt =
        0;

    this.particles =
        [];

},


    /*==================================================
    BUILD
    ==================================================*/

    build(){

        const aura =
            document.createElement(
                "div"
            );

        const image =
            document.createElement(
                "img"
            );

        const particleLayer =
            document.createElement(
                "div"
            );

        const hitbox =
            document.createElement(
                "div"
            );


        aura.className =
            "banin-universe-logo-aura";

        image.className =
            "banin-universe-logo-image";

        particleLayer.className =
            "banin-universe-logo-particles";

        hitbox.className =
            "banin-universe-logo-hitbox";


        image.src =
            this.imagePath;

        image.alt =
            "Banin Universe";

        image.draggable =
            false;


        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "❌ Banin Universe logo artwork not found:",
                    this.imagePath
                );

            },
            {
                once:true
            }
        );


        this.element.appendChild(
            aura
        );

        this.element.appendChild(
            image
        );

        this.element.appendChild(
            particleLayer
        );

        this.element.appendChild(
            hitbox
        );


        this.parts = {

            aura,
            image,
            particleLayer,
            hitbox

        };

    },


    /*==================================================
    EVENTS
    ==================================================*/

    bindEvents(){

        if(!this.parts.hitbox){
            return;
        }


        this.parts.hitbox.addEventListener(
            "mouseenter",
            () => {

                this.hovered =
                    true;


                this.element.classList.add(
                    "logo-hovered"
                );


                this.createParticleBurst(
                    15
                );

            }
        );


        this.parts.hitbox.addEventListener(
            "mouseleave",
            () => {

                this.hovered =
                    false;


                this.element.classList.remove(
                    "logo-hovered"
                );

            }
        );

    },


    /*==================================================
    PARTICLES
    ==================================================*/

    createParticleBurst(count){

        for(
            let index = 0;
            index < count;
            index += 1
        ){

            this.createParticle(
                index * 28
            );

        }

    },


    createParticle(delay = 0){

        if(!this.parts.particleLayer){
            return;
        }


        const config =
            WorldConfig.baninUniverseLogo || {};


        const particleConfig =
            config.particle || {};


        const maxParticles =
            particleConfig.max || 34;


        if(
            this.particles.length >=
            maxParticles
        ){
            return;
        }


        const particle =
            document.createElement(
                "span"
            );


        const symbols = [
            "✦",
            "✧",
            "•",
            "⋆"
        ];


        particle.className =
            "banin-universe-logo-particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        const isGolden =
            Math.random() < .40;


        const startLeft =
            12 +
            Math.random() *
            76;


        const startTop =
            24 +
            Math.random() *
            53;


        const direction =
            Math.random() > .5
                ? 1
                : -1;


        const travelX =
            direction *
            (
                28 +
                Math.random() *
                72
            );


        const travelY =
            -35 -
            Math.random() *
            85;


        const size =
            6 +
            Math.random() *
            10;


        const duration =
            1.05 +
            Math.random() *
            .72;


        particle.style.setProperty(
            "--logo-particle-left",
            startLeft + "%"
        );


        particle.style.setProperty(
            "--logo-particle-top",
            startTop + "%"
        );


        particle.style.setProperty(
            "--logo-particle-x",
            travelX + "px"
        );


        particle.style.setProperty(
            "--logo-particle-y",
            travelY + "px"
        );


        particle.style.setProperty(
            "--logo-particle-size",
            size + "px"
        );


        particle.style.setProperty(
            "--logo-particle-duration",
            duration + "s"
        );


        particle.style.setProperty(
            "--logo-particle-rotation",
            (
                direction *
                (
                    70 +
                    Math.random() *
                    170
                )
            ) +
            "deg"
        );


        particle.style.setProperty(
            "--logo-particle-color",

            isGolden
                ? "rgba(255,221,129,.98)"
                : "rgba(255,255,255,.99)"
        );


        particle.style.animationDelay =
            delay + "ms";


        this.parts.particleLayer.appendChild(
            particle
        );


        this.particles.push(
            particle
        );


        window.setTimeout(
            () => {

                particle.remove();


                const index =
                    this.particles.indexOf(
                        particle
                    );


                if(index >= 0){

                    this.particles.splice(
                        index,
                        1
                    );

                }

            },
            delay + 2200
        );

    },


    /*==================================================
    RESIZE
    ==================================================*/

resize(){

    if(!this.element){
        return;
    }


    const config =
        WorldConfig.baninUniverseLogo || {};


    const width =
        Number(config.width) || 620;


    const height =
        Number(config.height) || 310;


    const x =
        Number.isFinite(
            Number(config.x)
        )
            ? Number(config.x)
            : 50;


    const y =
        Number.isFinite(
            Number(config.y)
        )
            ? Number(config.y)
            : 43;


    this.element.style.position =
        "fixed";


    this.element.style.left =
        x + "%";


    this.element.style.top =
        y + "%";


    this.element.style.width =
        width + "px";


    this.element.style.height =
        height + "px";


    this.element.style.zIndex =
        String(
            config.z || 10020
        );


    this.element.style.transform =
        "translate(-50%, -50%)";

},


    /*==================================================
    UPDATE
    ==================================================*/

    update(){

        if(
            !this.initialized ||
            !this.element
        ){
            return;
        }


        /*
        The object itself never moves.
        Update is used only for hover particles.
        */


        if(!this.hovered){
            return;
        }


        const time =
            (
                typeof Engine !== "undefined" &&
                Number.isFinite(
                    Number(
                        Engine.elapsed
                    )
                )
            )
                ? Number(
                    Engine.elapsed
                )
                : performance.now() /
                    1000;


        if(time < this.nextParticleAt){
            return;
        }


        this.createParticle();


        if(Math.random() > .56){

            this.createParticle(
                35
            );

        }


        const config =
            WorldConfig.baninUniverseLogo || {};


        const particleConfig =
            config.particle || {};


        const minDelay =
            particleConfig.minDelay ||
            .055;


        const maxDelay =
            particleConfig.maxDelay ||
            .11;


        this.nextParticleAt =
            time +
            minDelay +
            Math.random() *
            Math.max(
                0,
                maxDelay -
                minDelay
            );

    },


    /*==================================================
    DESTROY
    ==================================================*/

    destroy(){

        for(const particle of this.particles){

            if(particle){
                particle.remove();
            }

        }


        this.particles =
            [];


        if(this.element){

            this.element.innerHTML =
                "";

            this.element.classList.remove(
                "logo-hovered"
            );

        }


        const style =
            document.getElementById(
                "baninUniverseLogoStyles"
            );


        if(style){
            style.remove();
        }


        this.element =
            null;

        this.parts =
            {};

        this.hovered =
            false;

        this.nextParticleAt =
            0;

        this.initialized =
            false;

    }

};


window.BaninUniverseLogo =
    BaninUniverseLogo;