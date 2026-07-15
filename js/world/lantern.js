/*==================================================
BANIN UNIVERSE
LANTERN OBJECT
Artwork + Nail + Rope + Glow + Fire Hover
==================================================*/

"use strict";

const Lantern = {

    element: null,
    glow: null,

    parts: {},

    initialized: false,
    hovered: false,

    nextSparkAt: 0,

    imagePath:
        "assets/world/lantern.webp",


    /*==================================================
    CREATE
    ==================================================*/

    create(){

        if(this.initialized){
            return;
        }

        console.log("🏮 Lantern.create() called");

        this.element =
            document.getElementById(
                "lanternContainer"
            );

        this.glow =
            document.getElementById(
                "lanternGlow"
            );

        if(!this.element){

            console.warn(
                "❌ lanternContainer not found"
            );

            return;
        }

        this.injectStyles();

        this.setup();

        this.build();

        this.bindEvents();

        this.resize();

        this.initialized = true;

        console.log("✅ Lantern created");

    },


    /*==================================================
    STYLES
    ==================================================*/

    injectStyles(){

        const oldStyle =
            document.getElementById(
                "lanternArtworkStyles"
            );

        if(oldStyle){
            oldStyle.remove();
        }

        const style =
            document.createElement("style");

        style.id =
            "lanternArtworkStyles";

        style.textContent = `

            @keyframes lanternRopeShimmer{

                0%,
                100%{
                    filter:
                        brightness(.88);
                }

                50%{
                    filter:
                        brightness(1.12);
                }

            }


            @keyframes lanternArtworkBreath{

                0%,
                100%{
                    filter:
                        brightness(1)
                        saturate(1.02)
                        drop-shadow(
                            0 8px 13px
                            rgba(0,0,0,.42)
                        )
                        drop-shadow(
                            0 0 13px
                            rgba(255,151,48,.32)
                        );
                }

                50%{
                    filter:
                        brightness(1.075)
                        saturate(1.08)
                        drop-shadow(
                            0 9px 15px
                            rgba(0,0,0,.45)
                        )
                        drop-shadow(
                            0 0 21px
                            rgba(255,174,61,.48)
                        );
                }

            }


            @keyframes lanternInnerFlame{

                0%,
                100%{
                    opacity:.62;

                    transform:
                        translate(-50%,-50%)
                        scale(.88,.98)
                        rotate(-2deg);
                }

                35%{
                    opacity:.94;

                    transform:
                        translate(-50%,-50%)
                        scale(1.02,1.12)
                        rotate(2deg);
                }

                70%{
                    opacity:.74;

                    transform:
                        translate(-50%,-50%)
                        scale(.94,1.04)
                        rotate(-1deg);
                }

            }


            @keyframes lanternSparkRise{

                0%{
                    opacity:0;

                    transform:
                        translate(-50%,-50%)
                        scale(.25)
                        rotate(0deg);
                }

                15%{
                    opacity:1;
                }

                72%{
                    opacity:.88;
                }

                100%{
                    opacity:0;

                    transform:
                        translate(
                            calc(
                                -50% +
                                var(--lantern-spark-x)
                            ),
                            calc(
                                -50% +
                                var(--lantern-spark-y)
                            )
                        )
                        scale(1.05)
                        rotate(150deg);
                }

            }


            /*==========================================
            NAIL
            ==========================================*/

            .lantern-nail{
                position:absolute;

                left:50%;
                top:-2px;

                width:13px;
                height:13px;

                transform:
                    translateX(-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle at 35% 30%,
                        rgba(243,205,147,.98),
                        rgba(115,70,40,.98) 35%,
                        rgba(42,25,19,1) 75%
                    );

                border:
                    1px solid
                    rgba(255,210,145,.48);

                box-shadow:
                    0 2px 5px
                    rgba(0,0,0,.62),
                    0 0 7px
                    rgba(255,176,82,.22);

                pointer-events:none;

                z-index:40;
            }


            .lantern-nail::after{
                content:"";

                position:absolute;

                left:50%;
                top:50%;

                width:4px;
                height:4px;

                transform:
                    translate(-50%,-50%);

                border-radius:50%;

                background:
                    rgba(31,18,13,.92);

                box-shadow:
                    inset 0 0 2px
                    rgba(255,218,161,.45);
            }


            /*==========================================
            ROPE
            ==========================================*/

            .lantern-rope{
                position:absolute;

                left:50%;
                top:8px;

                width:3px;
                height:31%;

                transform:
                    translateX(-50%);

                border-radius:999px;

                background:
                    linear-gradient(
                        90deg,
                        rgba(52,30,22,.98),
                        rgba(186,125,68,.94) 47%,
                        rgba(59,32,23,.98)
                    );

                box-shadow:
                    0 0 3px
                    rgba(0,0,0,.52),
                    0 0 5px
                    rgba(255,165,72,.18);

                animation:
                    lanternRopeShimmer
                    4.4s
                    ease-in-out
                    infinite;

                pointer-events:none;

                z-index:10;
            }


            /*==========================================
            ARTWORK
            ==========================================*/

            .lantern-artwork-wrap{
                position:absolute;

                left:50%;
                top:24%;

                width:100%;
                height:76%;

                transform:
                    translateX(-50%)
                    scale(1);

                transform-origin:
                    50% 12%;

                transition:
                    transform .42s
                    cubic-bezier(.2,.8,.2,1),
                    filter .42s ease;

                pointer-events:none;

                overflow:visible;

                z-index:20;
            }


            .lantern-artwork-image{
                position:absolute;

                left:50%;
                top:50%;

                width:210%;
                height:210%;

                transform:
                    translate(-50%,-50%);

                object-fit:contain;

                animation:
                    lanternArtworkBreath
                    4.8s
                    ease-in-out
                    infinite;

                transition:
                    filter .38s ease;

                user-select:none;
                -webkit-user-drag:none;

                pointer-events:none;

                z-index:20;
            }


            /*==========================================
            INNER LIGHT
            ==========================================*/

            .lantern-inner-glow{
                position:absolute;

                left:50%;
                top:57%;

                width:76%;
                height:74%;

                transform:
                    translate(-50%,-50%)
                    scale(.94);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,250,195,.62) 0%,
                        rgba(255,194,78,.48) 25%,
                        rgba(255,115,31,.19) 53%,
                        transparent 74%
                    );

                filter:
                    blur(10px);

                opacity:.46;

                mix-blend-mode:screen;

                transition:
                    opacity .4s ease,
                    transform .4s ease,
                    filter .4s ease;

                pointer-events:none;

                z-index:24;
            }


            .lantern-flame-core{
                position:absolute;

                left:50%;
                top:58%;

                width:14%;
                height:27%;

                transform:
                    translate(-50%,-50%);

                border-radius:
                    52% 48% 58% 42%
                    / 70% 68% 32% 30%;

                background:
                    radial-gradient(
                        ellipse at 50% 68%,
                        rgba(255,255,220,1) 0%,
                        rgba(255,235,135,.98) 28%,
                        rgba(255,166,54,.78) 57%,
                        rgba(255,89,22,.18) 82%,
                        transparent 100%
                    );

                filter:
                    blur(.5px)
                    drop-shadow(
                        0 0 7px
                        rgba(255,238,155,.96)
                    )
                    drop-shadow(
                        0 0 17px
                        rgba(255,138,36,.68)
                    );

                mix-blend-mode:screen;

                animation:
                    lanternInnerFlame
                    .72s
                    ease-in-out
                    infinite;

                pointer-events:none;

                z-index:27;
            }


            /*==========================================
            FIRE PARTICLES
            ==========================================*/

            .lantern-spark-layer{
                position:absolute;

                left:50%;
                top:24%;

                width:150%;
                height:95%;

                transform:
                    translateX(-50%);

                overflow:visible;

                pointer-events:none;

                z-index:35;
            }


            .lantern-fire-spark{
                position:absolute;

                left:
                    var(
                        --lantern-spark-left,
                        50%
                    );

                top:
                    var(
                        --lantern-spark-top,
                        58%
                    );

                width:
                    var(
                        --lantern-spark-size,
                        4px
                    );

                height:
                    var(
                        --lantern-spark-size,
                        4px
                    );

                border-radius:50%;

                background:
                    rgba(255,238,161,.98);

                box-shadow:
                    0 0 6px
                    rgba(255,235,151,.98),
                    0 0 12px
                    rgba(255,139,38,.82),
                    0 0 20px
                    rgba(255,82,18,.42);

                pointer-events:none;

                animation:
                    lanternSparkRise
                    var(
                        --lantern-spark-duration,
                        1s
                    )
                    ease-out
                    both;

                z-index:40;
            }


            /*==========================================
            HITBOX
            ==========================================*/

            .lantern-hitbox{
                position:absolute;

                left:50%;
                top:23%;

                width:112%;
                height:78%;

                transform:
                    translateX(-50%);

                border-radius:
                    44% 44% 35% 35%;

                background:transparent;

                cursor:pointer;
                pointer-events:auto;
                touch-action:manipulation;

                z-index:100;
            }


            /*==========================================
            HOVER
            ==========================================*/

            #lanternContainer.lantern-hovered
            .lantern-artwork-wrap{
                transform:
                    translateX(-50%)
                    scale(1.055);
            }


            #lanternContainer.lantern-hovered
            .lantern-artwork-image{
                animation-duration:2.5s;

                filter:
                    brightness(1.22)
                    saturate(1.17)
                    drop-shadow(
                        0 10px 16px
                        rgba(0,0,0,.45)
                    )
                    drop-shadow(
                        0 0 23px
                        rgba(255,190,77,.86)
                    )
                    drop-shadow(
                        0 0 42px
                        rgba(255,102,24,.46)
                    );
            }


            #lanternContainer.lantern-hovered
            .lantern-inner-glow{
                opacity:1;

                transform:
                    translate(-50%,-50%)
                    scale(1.18);

                filter:
                    blur(13px);
            }


            #lanternContainer.lantern-hovered
            .lantern-flame-core{
                filter:
                    brightness(1.22)
                    blur(.35px)
                    drop-shadow(
                        0 0 9px
                        rgba(255,244,173,.98)
                    )
                    drop-shadow(
                        0 0 24px
                        rgba(255,130,29,.86)
                    );
            }

        `;

        document.head.appendChild(style);

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

        this.element.style.pointerEvents =
            "auto";

        this.element.style.overflow =
            "visible";

        this.element.style.transformOrigin =
            "50% 0%";

        this.element.style.willChange =
            "transform, opacity";

        this.element.style.zIndex =
            String(
                WorldConfig.lantern.z
            );

        this.element.classList.remove(
            "lantern-hovered"
        );

        this.hovered = false;

        this.nextSparkAt = 0;


        if(this.glow){

            this.glow.style.position =
                "absolute";

            this.glow.style.pointerEvents =
                "none";

            this.glow.style.borderRadius =
                "50%";

            this.glow.style.background =
                "radial-gradient(circle, rgba(255,229,143,.52), rgba(255,157,51,.25) 32%, rgba(255,82,24,.10) 53%, rgba(255,82,24,0) 75%)";

            this.glow.style.filter =
                "blur(13px)";

            this.glow.style.opacity =
                "0.58";

            this.glow.style.mixBlendMode =
                "screen";

            this.glow.style.transformOrigin =
                "50% 50%";

            this.glow.style.willChange =
                "transform, opacity";

            this.glow.style.zIndex =
                "90";

        }

    },


    /*==================================================
    BUILD
    ==================================================*/

    build(){

        const nail =
            document.createElement("div");

        const rope =
            document.createElement("div");

        const artworkWrap =
            document.createElement("div");

        const image =
            document.createElement("img");

        const innerGlow =
            document.createElement("div");

        const flame =
            document.createElement("div");

        const sparkLayer =
            document.createElement("div");

        const hitbox =
            document.createElement("div");


        nail.className =
            "lantern-nail";

        rope.className =
            "lantern-rope";

        artworkWrap.className =
            "lantern-artwork-wrap";

        image.className =
            "lantern-artwork-image";

        innerGlow.className =
            "lantern-inner-glow";

        flame.className =
            "lantern-flame-core";

        sparkLayer.className =
            "lantern-spark-layer";

        hitbox.className =
            "lantern-hitbox";


        image.src =
            this.imagePath;

        image.alt =
            "Magical hanging lantern";

        image.draggable =
            false;


        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "❌ Lantern artwork not found:",
                    this.imagePath
                );

            },
            {
                once:true
            }
        );


        artworkWrap.appendChild(image);

        artworkWrap.appendChild(innerGlow);

        artworkWrap.appendChild(flame);


        this.element.appendChild(nail);

        this.element.appendChild(rope);

        this.element.appendChild(artworkWrap);

        this.element.appendChild(sparkLayer);

        this.element.appendChild(hitbox);


        this.parts = {

            nail,
            rope,

            artworkWrap,
            image,

            innerGlow,
            flame,

            sparkLayer,
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
                    "lantern-hovered"
                );

                this.createFireBurst(7);

            }
        );


        this.parts.hitbox.addEventListener(
            "mouseleave",
            () => {

                this.hovered = false;

                this.element.classList.remove(
                    "lantern-hovered"
                );

            }
        );

    },


    /*==================================================
    FIRE PARTICLES
    ==================================================*/

    createFireBurst(count){

        for(
            let index = 0;
            index < count;
            index += 1
        ){

            this.createFireSpark(
                index * 35
            );

        }

    },


    createFireSpark(delay = 0){

        if(!this.parts.sparkLayer){
            return;
        }


        const spark =
            document.createElement("span");


        spark.className =
            "lantern-fire-spark";


        const startLeft =
            46 +
            Math.random() * 8;


        const startTop =
            58 +
            Math.random() * 12;


        const travelX =
            -32 +
            Math.random() * 64;


        const travelY =
            -55 -
            Math.random() * 70;


        const size =
            2.5 +
            Math.random() * 4.5;


        const duration =
            .72 +
            Math.random() * .72;


        spark.style.setProperty(
            "--lantern-spark-left",
            startLeft + "%"
        );


        spark.style.setProperty(
            "--lantern-spark-top",
            startTop + "%"
        );


        spark.style.setProperty(
            "--lantern-spark-x",
            travelX + "px"
        );


        spark.style.setProperty(
            "--lantern-spark-y",
            travelY + "px"
        );


        spark.style.setProperty(
            "--lantern-spark-size",
            size + "px"
        );


        spark.style.setProperty(
            "--lantern-spark-duration",
            duration + "s"
        );


        spark.style.animationDelay =
            delay + "ms";


        this.parts.sparkLayer.appendChild(
            spark
        );


        window.setTimeout(
            () => {

                spark.remove();

            },
            delay + 1700
        );

    },


    /*==================================================
    RESIZE
    ==================================================*/

    resize(){

        if(!this.element){
            return;
        }


        const anchor =
            Tree.getAnchor("lantern");


        if(!anchor || !Tree.element){
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


        const config =
            WorldConfig.lantern;


        const width =
            config.width;


        const height =
            config.height;


        const offsetX =
            config.offsetX || 0;


        const offsetY =
            config.offsetY || 0;


        this.element.style.left =
            (
                anchorX -
                width / 2 +
                offsetX
            ) +
            "px";


        this.element.style.top =
            (
                anchorY +
                offsetY
            ) +
            "px";


        this.element.style.width =
            width + "px";


        this.element.style.height =
            height + "px";


        this.element.style.zIndex =
            String(config.z);


        if(this.glow){

            const glowSize =
                config.glowSize || 210;


            const lanternCenterY =
                anchorY +
                offsetY +
                height * .63;


            this.glow.style.left =
                (
                    anchorX -
                    glowSize / 2 +
                    offsetX
                ) +
                "px";


            this.glow.style.top =
                (
                    lanternCenterY -
                    glowSize / 2
                ) +
                "px";


            this.glow.style.width =
                glowSize + "px";


            this.glow.style.height =
                glowSize + "px";

        }

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
            Engine.elapsed;


        const sway =
            Math.sin(
                time * .82
            ) *
            1.55;


        const verticalFloat =
            Math.sin(
                time * .67
            ) *
            .65;


        const flicker =
            .76 +
            Math.sin(
                time * 6.4
            ) *
            .075 +
            Math.sin(
                time * 11.3
            ) *
            .035;


        this.element.style.transform =
            `translateY(${verticalFloat}px) rotate(${sway}deg)`;


        if(this.parts.flame){

            const flameBrightness =
                this.hovered
                    ? 1.12 + flicker * .16
                    : .96 + flicker * .09;


            this.parts.flame.style.opacity =
                String(
                    this.hovered
                        ? .78 + flicker * .18
                        : .52 + flicker * .20
                );


            this.parts.flame.style.setProperty(
                "filter",
                `brightness(${flameBrightness}) blur(.45px) drop-shadow(0 0 9px rgba(255,240,160,.95)) drop-shadow(0 0 20px rgba(255,128,30,.72))`
            );

        }


        if(this.parts.innerGlow){

            const glowScale =
                this.hovered
                    ? 1.12 + flicker * .10
                    : .92 + flicker * .08;


            this.parts.innerGlow.style.transform =
                `translate(-50%,-50%) scale(${glowScale})`;

        }


        if(this.glow){

            const glowOpacity =
                this.hovered
                    ? .74 + flicker * .18
                    : .38 + flicker * .22;


            const glowScale =
                this.hovered
                    ? 1.14 + flicker * .09
                    : .93 + flicker * .07;


            this.glow.style.opacity =
                String(glowOpacity);


            this.glow.style.transform =
                `scale(${glowScale})`;

        }


        if(
            this.hovered &&
            time >= this.nextSparkAt
        ){

            this.createFireSpark();


            if(Math.random() > .52){

                this.createFireSpark(45);

            }


            this.nextSparkAt =
                time +
                .075 +
                Math.random() * .095;

        }

    },


    /*==================================================
    DESTROY
    ==================================================*/

    destroy(){

        if(this.element){

            this.element.innerHTML = "";

            this.element.classList.remove(
                "lantern-hovered"
            );

        }


        const style =
            document.getElementById(
                "lanternArtworkStyles"
            );


        if(style){
            style.remove();
        }


        this.element = null;

        this.glow = null;

        this.parts = {};

        this.hovered = false;

        this.nextSparkAt = 0;

        this.initialized = false;

    }

};


window.Lantern = Lantern;