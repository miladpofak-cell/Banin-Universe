/*==================================================
BANIN UNIVERSE
DIARY OBJECT
Artwork + Gold Glow + Magic Letters + Visible Ink
==================================================*/

"use strict";


const DiaryObject = {

    element: null,

    parts: {},

    initialized: false,
    hovered: false,

    nextParticleAt: 0,

    imagePath:
        "assets/world/diary.webp",


    /*==================================================
    CREATE
    ==================================================*/

    create(){

        if(this.initialized){
            return;
        }

        console.log(
            "📔 DiaryObject.create() called"
        );

        this.element =
            document.getElementById(
                "diaryContainer"
            );

        if(!this.element){

            console.warn(
                "❌ diaryContainer not found"
            );

            return;
        }

        this.injectStyles();

        this.setup();

        this.build();

        this.bindEvents();

        this.resize();

        this.initialized = true;

        console.log(
            "✅ Diary artwork object created"
        );

    },


    /*==================================================
    STYLES
    ==================================================*/

    injectStyles(){

        const oldStyle =
            document.getElementById(
                "diaryArtworkStyles"
            );

        if(oldStyle){
            oldStyle.remove();
        }

        const style =
            document.createElement(
                "style"
            );

        style.id =
            "diaryArtworkStyles";

        style.textContent = `

            @keyframes diaryArtworkBreath{

                0%,
                100%{
                    filter:
                        brightness(1)
                        saturate(1)
                        drop-shadow(
                            0 10px 14px
                            rgba(0,0,0,.50)
                        )
                        drop-shadow(
                            0 0 11px
                            rgba(170,101,255,.18)
                        );
                }

                50%{
                    filter:
                        brightness(1.055)
                        saturate(1.045)
                        drop-shadow(
                            0 11px 16px
                            rgba(0,0,0,.53)
                        )
                        drop-shadow(
                            0 0 19px
                            rgba(192,117,255,.29)
                        );
                }

            }


            @keyframes diaryAuraBreath{

                0%,
                100%{
                    opacity:.34;

                    transform:
                        translate(-50%,-50%)
                        scale(.92);
                }

                50%{
                    opacity:.65;

                    transform:
                        translate(-50%,-50%)
                        scale(1.07);
                }

            }


            @keyframes diaryGoldPulse{

                0%,
                100%{
                    opacity:.30;

                    transform:
                        translate(-50%,-50%)
                        scale(.86);
                }

                50%{
                    opacity:.66;

                    transform:
                        translate(-50%,-50%)
                        scale(1.04);
                }

            }


            @keyframes diaryGoldSparkle{

                0%,
                100%{
                    opacity:.35;

                    transform:
                        translate(-50%,-50%)
                        scale(.65)
                        rotate(0deg);
                }

                50%{
                    opacity:1;

                    transform:
                        translate(-50%,-50%)
                        scale(1.15)
                        rotate(90deg);
                }

            }


            @keyframes diaryParticleFloat{

                0%{
                    opacity:0;

                    transform:
                        translate(-50%,-50%)
                        scale(.25)
                        rotate(0deg);
                }

                14%{
                    opacity:1;
                }

                72%{
                    opacity:.92;
                }

                100%{
                    opacity:0;

                    transform:
                        translate(
                            calc(
                                -50% +
                                var(
                                    --diary-particle-x
                                )
                            ),
                            calc(
                                -50% +
                                var(
                                    --diary-particle-y
                                )
                            )
                        )
                        scale(1.12)
                        rotate(
                            var(
                                --diary-particle-rotate,
                                130deg
                            )
                        );
                }

            }


            @keyframes diaryInkSplash{

                0%{
                    opacity:0;

                    transform:
                        translate(-50%,-50%)
                        scale(.18)
                        rotate(0deg);
                }

                13%{
                    opacity:1;

                    transform:
                        translate(-50%,-50%)
                        scale(1)
                        rotate(10deg);
                }

                70%{
                    opacity:.96;
                }

                100%{
                    opacity:0;

                    transform:
                        translate(
                            calc(
                                -50% +
                                var(
                                    --diary-particle-x
                                )
                            ),
                            calc(
                                -50% +
                                var(
                                    --diary-particle-y
                                )
                            )
                        )
                        scale(.72)
                        rotate(
                            var(
                                --diary-particle-rotate,
                                120deg
                            )
                        );
                }

            }


            /*==========================================
            SHADOW
            ==========================================*/

            .diary-artwork-shadow{
                position:absolute;

                left:50%;
                bottom:1%;

                width:100%;
                height:18%;

                transform:
                    translateX(-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        ellipse,
                        rgba(0,0,0,.58),
                        rgba(0,0,0,.23) 44%,
                        transparent 74%
                    );

                filter:
                    blur(7px);

                opacity:.68;

                pointer-events:none;

                transition:
                    opacity .4s ease,
                    transform .4s ease;

                z-index:1;
            }


            /*==========================================
            AURA
            ==========================================*/

            .diary-artwork-aura{
                position:absolute;

                left:50%;
                top:50%;

                width:160%;
                height:138%;

                transform:
                    translate(-50%,-50%);

                border-radius:45%;

                background:
                    radial-gradient(
                        ellipse,
                        rgba(255,210,112,.18) 0%,
                        rgba(181,103,255,.16) 35%,
                        rgba(88,42,162,.09) 57%,
                        transparent 77%
                    );

                filter:
                    blur(15px);

                opacity:.44;

                pointer-events:none;

                animation:
                    diaryAuraBreath
                    5.2s
                    ease-in-out
                    infinite;

                transition:
                    opacity .4s ease,
                    filter .4s ease;

                z-index:2;
            }


            /*==========================================
            ARTWORK
            ==========================================*/

            .diary-artwork-wrap{
                position:absolute;

                left:50%;
                top:50%;

                width:100%;
                height:100%;

                transform:
                    translate(-50%,-51%)
                    perspective(950px)
                    rotateY(-6deg)
                    rotateX(-4deg)
                    rotateZ(-10deg)
                    scale(1);

                transform-origin:
                    44% 82%;

                transition:
                    transform .48s
                    cubic-bezier(.18,.82,.22,1),
                    filter .42s ease;

                pointer-events:none;

                will-change:transform;

                z-index:10;
            }


            .diary-artwork-image{
                position:absolute;

                left:50%;
                top:50%;

                width:205%;
                height:205%;

                display:block;

                object-fit:contain;

                transform:
                    translate(-50%,-50%);

                animation:
                    diaryArtworkBreath
                    5s
                    ease-in-out
                    infinite;

                transition:
                    filter .4s ease;

                user-select:none;
                -webkit-user-drag:none;

                pointer-events:none;

                z-index:10;
            }


            /*==========================================
            TITLE HEART GLOW
            ==========================================*/

            .diary-title-heart-glow{
                position:absolute;

                left:49%;
                top:39%;

                width:30%;
                height:21%;

                transform:
                    translate(-50%,-50%)
                    scale(.86);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,255,230,.98) 0%,
                        rgba(255,230,117,.88) 18%,
                        rgba(255,176,53,.56) 39%,
                        rgba(255,105,28,.19) 61%,
                        transparent 78%
                    );

                box-shadow:
                    0 0 11px
                    rgba(255,247,188,.78),
                    0 0 25px
                    rgba(255,187,62,.59),
                    0 0 43px
                    rgba(190,102,255,.28);

                filter:
                    blur(5px);

                mix-blend-mode:screen;

                opacity:.30;

                pointer-events:none;

                animation:
                    diaryGoldPulse
                    3.1s
                    ease-in-out
                    infinite;

                transition:
                    opacity .35s ease,
                    filter .35s ease,
                    transform .35s ease;

                z-index:16;
            }


            .diary-title-heart-glow::after{
                content:"✦";

                position:absolute;

                left:50%;
                top:50%;

                color:
                    rgba(255,249,203,.98);

                font-family:
                    Georgia,
                    serif;

                font-size:14px;

                line-height:1;

                transform:
                    translate(-50%,-50%);

                text-shadow:
                    0 0 7px
                    rgba(255,244,185,.98),
                    0 0 17px
                    rgba(255,183,62,.88);

                animation:
                    diaryGoldSparkle
                    2.1s
                    ease-in-out
                    infinite;
            }


            /*==========================================
            LOCK GLOW
            ==========================================*/

            .diary-lock-glow{
                position:absolute;

                left:68%;
                top:57%;

                width:35%;
                height:30%;

                transform:
                    translate(-50%,-50%)
                    scale(.84);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,255,231,.99) 0%,
                        rgba(255,228,106,.91) 18%,
                        rgba(255,165,44,.60) 40%,
                        rgba(255,89,20,.20) 62%,
                        transparent 79%
                    );

                box-shadow:
                    0 0 13px
                    rgba(255,247,185,.82),
                    0 0 29px
                    rgba(255,177,51,.64),
                    0 0 47px
                    rgba(181,89,255,.29);

                filter:
                    blur(5px);

                mix-blend-mode:screen;

                opacity:.28;

                pointer-events:none;

                animation:
                    diaryGoldPulse
                    2.7s
                    ease-in-out
                    .45s
                    infinite;

                transition:
                    opacity .35s ease,
                    filter .35s ease,
                    transform .35s ease;

                z-index:17;
            }


            .diary-lock-glow::after{
                content:"✦";

                position:absolute;

                left:50%;
                top:50%;

                color:
                    rgba(255,249,204,.99);

                font-family:
                    Georgia,
                    serif;

                font-size:16px;

                line-height:1;

                transform:
                    translate(-50%,-50%);

                text-shadow:
                    0 0 8px
                    rgba(255,244,181,.98),
                    0 0 19px
                    rgba(255,167,48,.91);

                animation:
                    diaryGoldSparkle
                    1.8s
                    ease-in-out
                    .3s
                    infinite;
            }


            /*==========================================
            PARTICLE LAYER
            ==========================================*/

            .diary-particle-layer{
                position:absolute;

                left:50%;
                top:50%;

                width:165%;
                height:145%;

                transform:
                    translate(-50%,-50%);

                overflow:visible;

                pointer-events:none;

                z-index:30;
            }


            /*==========================================
            MAGIC LETTERS AND STARS
            ==========================================*/

            .diary-magic-particle{
                position:absolute;

                left:
                    var(
                        --diary-particle-left,
                        50%
                    );

                top:
                    var(
                        --diary-particle-top,
                        50%
                    );

                color:
                    rgba(255,226,137,.99);

                font-family:
                    "BaninDream",
                    "Cormorant Garamond",
                    Georgia,
                    serif;

                font-size:
                    var(
                        --diary-particle-size,
                        17px
                    );

                font-weight:700;

                line-height:1;

                text-shadow:
                    0 0 7px
                    rgba(255,225,135,.98),
                    0 0 17px
                    rgba(207,121,255,.80),
                    0 0 29px
                    rgba(103,54,214,.53);

                pointer-events:none;

                animation:
                    diaryParticleFloat
                    var(
                        --diary-particle-duration,
                        1.5s
                    )
                    ease-out
                    both;

                z-index:36;
            }


            /*==========================================
            VISIBLE INK PARTICLES
            ==========================================*/

            .diary-ink-particle{
                position:absolute;

                left:
                    var(
                        --diary-particle-left,
                        50%
                    );

                top:
                    var(
                        --diary-particle-top,
                        50%
                    );

                width:
                    var(
                        --diary-particle-size,
                        9px
                    );

                height:
                    calc(
                        var(
                            --diary-particle-size,
                            9px
                        ) * 1.18
                    );

                border-radius:
                    62% 38% 58% 42%
                    / 66% 52% 48% 34%;

                background:
                    radial-gradient(
                        circle at 34% 27%,
                        rgba(235,188,255,.98) 0%,
                        rgba(132,69,190,.96) 27%,
                        rgba(55,24,92,.99) 62%,
                        rgba(16,8,31,1) 100%
                    );

                border:
                    1px solid
                    rgba(218,159,255,.72);

                box-shadow:
                    0 0 6px
                    rgba(226,175,255,.94),
                    0 0 14px
                    rgba(158,82,222,.82),
                    0 0 25px
                    rgba(75,35,146,.65);

                filter:
                    drop-shadow(
                        0 0 4px
                        rgba(222,164,255,.68)
                    );

                pointer-events:none;

                animation:
                    diaryInkSplash
                    var(
                        --diary-particle-duration,
                        1.45s
                    )
                    ease-out
                    both;

                z-index:37;
            }


            .diary-ink-particle::before{
                content:"";

                position:absolute;

                left:68%;
                top:72%;

                width:45%;
                height:45%;

                border-radius:50%;

                background:
                    rgba(75,34,128,.98);

                border:
                    1px solid
                    rgba(207,139,249,.48);

                box-shadow:
                    0 0 7px
                    rgba(161,89,225,.64);
            }


            .diary-ink-particle::after{
                content:"";

                position:absolute;

                left:-35%;
                top:18%;

                width:30%;
                height:30%;

                border-radius:50%;

                background:
                    rgba(103,48,162,.98);

                box-shadow:
                    0 0 6px
                    rgba(194,124,242,.68);
            }


            /*==========================================
            HITBOX
            ==========================================*/

            .diary-artwork-hitbox{
                position:absolute;

                left:50%;
                top:50%;

                width:126%;
                height:105%;

                transform:
                    translate(-50%,-50%);

                border-radius:
                    35% 43% 35% 34%;

                background:transparent;

                pointer-events:auto;

                cursor:pointer;

                touch-action:manipulation;

                z-index:100;
            }


            /*==========================================
            HOVER
            ==========================================*/

            #diaryContainer.diary-hovered
            .diary-artwork-wrap{
                transform:
                    translate(-50%,-54%)
                    perspective(950px)
                    rotateY(-9deg)
                    rotateX(-5deg)
                    rotateZ(-11deg)
                    scale(1.055);
            }


            #diaryContainer.diary-hovered
            .diary-artwork-image{
                animation-duration:2.7s;

                filter:
                    brightness(1.17)
                    saturate(1.14)
                    drop-shadow(
                        0 12px 16px
                        rgba(0,0,0,.54)
                    )
                    drop-shadow(
                        0 0 18px
                        rgba(255,208,105,.58)
                    )
                    drop-shadow(
                        0 0 33px
                        rgba(186,104,255,.48)
                    );
            }


            #diaryContainer.diary-hovered
            .diary-artwork-aura{
                opacity:1;

                filter:
                    blur(19px)
                    brightness(1.2);
            }


            #diaryContainer.diary-hovered
            .diary-title-heart-glow{
                opacity:1;

                transform:
                    translate(-50%,-50%)
                    scale(1.42);

                filter:
                    blur(6px)
                    brightness(1.55);

                animation-duration:.9s;
            }


            #diaryContainer.diary-hovered
            .diary-lock-glow{
                opacity:1;

                transform:
                    translate(-50%,-50%)
                    scale(1.46);

                filter:
                    blur(6px)
                    brightness(1.62);

                animation-duration:.82s;
            }


            #diaryContainer.diary-hovered
            .diary-artwork-shadow{
                opacity:.80;

                transform:
                    translateX(-50%)
                    scale(1.08);
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

        this.element.innerHTML = "";

        this.element.style.position =
            "absolute";

        this.element.style.display =
            "block";

        this.element.style.visibility =
            "visible";

        this.element.style.opacity =
            "1";

        this.element.style.overflow =
            "visible";

        this.element.style.pointerEvents =
            "auto";

        this.element.style.cursor =
            "pointer";

        this.element.style.transformOrigin =
            "50% 76%";

        this.element.style.willChange =
            "transform";

        this.element.style.zIndex =
            String(
                WorldConfig.diary.z || 112
            );

        this.element.classList.remove(
            "diary-hovered"
        );

        this.hovered = false;

        this.nextParticleAt = 0;

    },


    /*==================================================
    BUILD
    ==================================================*/

    build(){

        const shadow =
            document.createElement(
                "div"
            );

        const aura =
            document.createElement(
                "div"
            );

        const artworkWrap =
            document.createElement(
                "div"
            );

        const image =
            document.createElement(
                "img"
            );

        const titleHeartGlow =
            document.createElement(
                "div"
            );

        const lockGlow =
            document.createElement(
                "div"
            );

        const particleLayer =
            document.createElement(
                "div"
            );

        const hitbox =
            document.createElement(
                "div"
            );


        shadow.className =
            "diary-artwork-shadow";

        aura.className =
            "diary-artwork-aura";

        artworkWrap.className =
            "diary-artwork-wrap";

        image.className =
            "diary-artwork-image";

        titleHeartGlow.className =
            "diary-title-heart-glow";

        lockGlow.className =
            "diary-lock-glow";

        particleLayer.className =
            "diary-particle-layer";

        hitbox.className =
            "diary-artwork-hitbox";


        image.src =
            this.imagePath;

        image.alt =
            "Magical personal diary";

        image.draggable =
            false;


        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "❌ Diary artwork not found:",
                    this.imagePath
                );

            },
            {
                once:true
            }
        );


        artworkWrap.appendChild(
            image
        );

        artworkWrap.appendChild(
            titleHeartGlow
        );

        artworkWrap.appendChild(
            lockGlow
        );


        this.element.appendChild(
            shadow
        );

        this.element.appendChild(
            aura
        );

        this.element.appendChild(
            artworkWrap
        );

        this.element.appendChild(
            particleLayer
        );

        this.element.appendChild(
            hitbox
        );


        this.parts = {

            shadow,
            aura,

            artworkWrap,
            image,

            titleHeartGlow,
            lockGlow,

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

                this.hovered = true;

                this.element.classList.add(
                    "diary-hovered"
                );

                this.createParticleBurst(
                    13
                );

            }
        );


        this.parts.hitbox.addEventListener(
            "mouseleave",
            () => {

                this.hovered = false;

                this.element.classList.remove(
                    "diary-hovered"
                );

            }
        );

    },


    /*==================================================
    PARTICLES
    ==================================================*/

    createParticleBurst(count){

        const inkCount =
            Math.max(
                4,
                Math.floor(
                    count * .35
                )
            );


        for(
            let index = 0;
            index < inkCount;
            index += 1
        ){

            this.createParticle(
                index * 38,
                true
            );

        }


        for(
            let index = inkCount;
            index < count;
            index += 1
        ){

            this.createParticle(
                index * 32,
                false
            );

        }

    },


    createParticle(
        delay = 0,
        forceInk = null
    ){

        if(!this.parts.particleLayer){
            return;
        }


        const symbols = [
            "✦",
            "✧",
            "♡",
            "a",
            "ب",
            "✎"
        ];


        const useInk =
            forceInk === true
                ? true
                : forceInk === false
                    ? false
                    : Math.random() < .42;


        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            useInk
                ? "diary-ink-particle"
                : "diary-magic-particle";


        if(!useInk){

            particle.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];

        }


        const startLeft =
            32 +
            Math.random() *
            43;


        const startTop =
            34 +
            Math.random() *
            46;


        const sideDirection =
            Math.random() > .5
                ? 1
                : -1;


        const travelX =
            sideDirection *
            (
                38 +
                Math.random() *
                67
            );


        const travelY =
            -55 -
            Math.random() *
            100;


        const size =
            useInk
                ? 7 +
                    Math.random() *
                    7
                : 14 +
                    Math.random() *
                    11;


        const duration =
            1.15 +
            Math.random() *
            .78;


        particle.style.setProperty(
            "--diary-particle-left",
            startLeft + "%"
        );


        particle.style.setProperty(
            "--diary-particle-top",
            startTop + "%"
        );


        particle.style.setProperty(
            "--diary-particle-x",
            travelX + "px"
        );


        particle.style.setProperty(
            "--diary-particle-y",
            travelY + "px"
        );


        particle.style.setProperty(
            "--diary-particle-size",
            size + "px"
        );


        particle.style.setProperty(
            "--diary-particle-duration",
            duration + "s"
        );


        particle.style.setProperty(
            "--diary-particle-rotate",
            (
                sideDirection *
                (
                    90 +
                    Math.random() *
                    160
                )
            ) +
            "deg"
        );


        particle.style.animationDelay =
            delay + "ms";


        this.parts.particleLayer.appendChild(
            particle
        );


        window.setTimeout(
            () => {

                particle.remove();

            },
            delay + 2400
        );

    },


    /*==================================================
    RESIZE
    ==================================================*/

    resize(){

        if(!this.element){
            return;
        }


        if(
            typeof Tree === "undefined" ||
            !Tree.getAnchor ||
            !Tree.element
        ){
            return;
        }


        const anchor =
            Tree.getAnchor(
                "diary"
            );


        if(!anchor){
            return;
        }


        const treeRect =
            Tree.element
                .getBoundingClientRect();


        const worldLayer =
            document.getElementById(
                "worldLayer"
            );


        if(!worldLayer){
            return;
        }


        const worldRect =
            worldLayer
                .getBoundingClientRect();


        const config =
            WorldConfig.diary || {};


        const width =
            config.width || 130;


        const height =
            config.height || 200;


        const offsetX =
            config.offsetX || 0;


        const offsetY =
            config.offsetY || 0;


        const anchorX =
            treeRect.left +
            (
                anchor.x / 100
            ) *
            treeRect.width -
            worldRect.left;


        const anchorY =
            treeRect.top +
            (
                anchor.y / 100
            ) *
            treeRect.height -
            worldRect.top;


        this.element.style.left =
            (
                anchorX -
                width / 2 +
                offsetX
            ) +
            "px";


        this.element.style.top =
            (
                anchorY -
                height / 2 +
                offsetY
            ) +
            "px";


        this.element.style.width =
            width + "px";


        this.element.style.height =
            height + "px";


        this.element.style.zIndex =
            String(
                config.z || 112
            );

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
                : performance.now() / 1000;


        const config =
            WorldConfig.diary || {};


        const baseRotate =
            config.rotate || 0;


        const floatY =
            Math.sin(
                time * .88 +
                1.2
            ) *
            1.12;


        const softRotate =
            Math.sin(
                time * .58 +
                .5
            ) *
            .30;


        const hoverLift =
            this.hovered
                ? -2
                : 0;


        this.element.style.transform =
            `translateY(${floatY + hoverLift}px) rotate(${baseRotate + softRotate}deg)`;


        if(this.parts.aura){

            const auraOpacity =
                this.hovered
                    ? .94
                    : .41 +
                        Math.sin(
                            time * 1.7
                        ) *
                        .08;


            this.parts.aura.style.opacity =
                String(
                    auraOpacity
                );

        }


        if(
            this.hovered &&
            time >=
                this.nextParticleAt
        ){

            const makeInk =
                Math.random() < .43;


            this.createParticle(
                0,
                makeInk
            );


            if(Math.random() > .56){

                this.createParticle(
                    45,
                    Math.random() < .43
                );

            }


            this.nextParticleAt =
                time +
                .14 +
                Math.random() *
                .16;

        }

    },


    /*==================================================
    DESTROY
    ==================================================*/

    destroy(){

        if(this.element){

            this.element.innerHTML =
                "";

            this.element.classList.remove(
                "diary-hovered"
            );

        }


        const style =
            document.getElementById(
                "diaryArtworkStyles"
            );


        if(style){
            style.remove();
        }


        this.element = null;

        this.parts = {};

        this.hovered = false;

        this.nextParticleAt = 0;

        this.initialized = false;

    }

};


window.DiaryObject =
    DiaryObject;