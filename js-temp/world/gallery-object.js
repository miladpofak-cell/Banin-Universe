/*==================================================
BANIN UNIVERSE
GALLERY OBJECT
Hanging Magical Memory Frame
==================================================*/

"use strict";

const GalleryObject = {

    element: null,
    parts: {},

    initialized: false,
    hovered: false,

    imagePath:
        "assets/world/gallery-object.webp",

    /*
        Bigger than the old Gallery object.
    */
    sizeScale: 1.65,

    /*
        Length of the hanging rope.
    */
    defaultRopeLength: 35,

    create(){

        if(this.initialized){
            return;
        }

        console.log(
            "🖼 GalleryObject.create() called"
        );

        this.element =
            document.getElementById(
                "galleryContainer"
            );

        if(!this.element){

            console.warn(
                "❌ galleryContainer not found"
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
            "✅ Hanging Gallery object created"
        );

    },

    getWorldConfig(){

        return (
            window.WorldConfig ||
            (
                typeof WorldConfig !==
                "undefined"
                    ? WorldConfig
                    : {}
            )
        );

    },

    injectStyles(){

        const oldStyle =
            document.getElementById(
                "galleryObjectArtworkStyles"
            );

        if(oldStyle){
            oldStyle.remove();
        }

        const style =
            document.createElement("style");

        style.id =
            "galleryObjectArtworkStyles";

        style.textContent = `

            @keyframes galleryObjectSwing{

                0%,
                100%{
                    transform:
                        rotate(
                            var(
                                --gallery-swing-left,
                                -6deg
                            )
                        );
                }

                50%{
                    transform:
                        rotate(
                            var(
                                --gallery-swing-right,
                                4deg
                            )
                        );
                }

            }

            @keyframes galleryObjectAuraPulse{

                0%,
                100%{
                    opacity:.28;

                    transform:
                        translate(-50%,-50%)
                        scale(.92);
                }

                50%{
                    opacity:.66;

                    transform:
                        translate(-50%,-50%)
                        scale(1.08);
                }

            }

            @keyframes galleryObjectSparkleFloat{

                0%{
                    opacity:0;

                    transform:
                        translate(0,8px)
                        scale(.35)
                        rotate(0deg);
                }

                22%{
                    opacity:1;
                }

                68%{
                    opacity:.88;

                    transform:
                        translate(
                            var(--gallery-sparkle-x),
                            var(--gallery-sparkle-y)
                        )
                        scale(1)
                        rotate(110deg);
                }

                100%{
                    opacity:0;

                    transform:
                        translate(
                            var(
                                --gallery-sparkle-end-x
                            ),
                            var(
                                --gallery-sparkle-end-y
                            )
                        )
                        scale(.45)
                        rotate(190deg);
                }

            }

            @keyframes galleryObjectOrbit{

                0%{
                    opacity:0;

                    transform:
                        translate(-50%,-50%)
                        rotate(0deg)
                        translateX(62px)
                        rotate(0deg)
                        scale(.55);
                }

                16%{
                    opacity:1;
                }

                72%{
                    opacity:.90;
                }

                100%{
                    opacity:0;

                    transform:
                        translate(-50%,-50%)
                        rotate(360deg)
                        translateX(62px)
                        rotate(-360deg)
                        scale(1);
                }

            }

            /*
                Rope and artwork rotate together
                from the top attachment point.
            */
            .gallery-object-swing-group{
                position:absolute;

                left:0;
                top:0;

                width:100%;
                height:100%;

                transform-origin:
                    50% 0;

                animation:
                    galleryObjectSwing
                    var(
                        --gallery-swing-duration,
                        5.8s
                    )
                    cubic-bezier(.45,0,.55,1)
                    infinite;

                will-change:
                    transform;

                pointer-events:none;

                z-index:1;
            }

.gallery-object-rope{
    position:absolute;

    left:50%;
    top:0;

    width:2px;

    /*
        Rope continues behind the transparent
        upper part of the artwork.
    */
height:
    var(
        --gallery-object-rope-length,
        82px
    );

    transform:
        translateX(-50%);

    border-radius:999px;

    background:
        linear-gradient(
            to right,
            rgba(88,47,25,.96),
            rgba(231,176,93,.96) 48%,
            rgba(103,57,29,.96)
        );

    box-shadow:
        0 0 4px
        rgba(255,201,113,.34),

        1px 0 2px
        rgba(0,0,0,.36);

    pointer-events:none;

    z-index:5;
}

            .gallery-object-rope::before{
                content:"";

                position:absolute;

                left:50%;
                top:-4px;

                width:8px;
                height:8px;

                transform:
                    translateX(-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle at 38% 34%,
                        #fff0b6,
                        #d69a45 48%,
                        #6d381c 100%
                    );

                box-shadow:
                    0 0 7px
                    rgba(255,207,117,.50),

                    0 2px 4px
                    rgba(0,0,0,.38);
            }

            /*
                Knot connecting the rope
                to the Gallery frame.
            */
.gallery-object-rope::after{
    content:"";

    position:absolute;

    left:50%;
    bottom:-4px;

    width:10px;
    height:7px;

    transform:
        translateX(-50%);

    border-radius:50%;

    background:
        linear-gradient(
            145deg,
            #f1bb66,
            #78411f
        );

    box-shadow:
        0 0 7px
        rgba(255,195,102,.44),

        0 2px 5px
        rgba(0,0,0,.38);

    z-index:4;
}


            /*
                Area containing the Gallery artwork.
            */
.gallery-object-zone{
    position:absolute;

    left:0;

    top:
        var(
            --gallery-object-rope-length,
            82px
        );

    width:100%;

    height:
        var(
            --gallery-object-art-height,
            170px
        );

    overflow:visible;

    pointer-events:none;

    z-index:10;
}

/*
    This connector continues the main rope
    through the transparent upper area
    of the artwork.
*/
.gallery-object-zone::before{
    content:"";

    position:absolute;

    left:50%;
    top:-4px;

    width:2px;
    height:92px;

    transform:
        translateX(-50%);

    border-radius:999px;

    background:
        linear-gradient(
            to right,
            rgba(88,47,25,.98),
            rgba(235,181,96,.98) 48%,
            rgba(103,57,29,.98)
        );

    box-shadow:
        0 0 4px
        rgba(255,201,113,.38),

        1px 0 2px
        rgba(0,0,0,.38);

    pointer-events:none;

    z-index:4;
}


            .gallery-object-shadow{
                position:absolute;

                left:50%;
                bottom:1%;

                width:70%;
                height:13%;

                transform:
                    translateX(-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(0,0,0,.48),
                        transparent 72%
                    );

                filter:
                    blur(8px);

                opacity:.48;

                pointer-events:none;

                z-index:1;
            }

            .gallery-object-aura{
                position:absolute;

                left:50%;
                top:52%;

                width:128%;
                height:128%;

                transform:
                    translate(-50%,-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,215,135,.28),
                        rgba(211,102,255,.18) 35%,
                        rgba(105,72,224,.08) 58%,
                        transparent 76%
                    );

                filter:
                    blur(14px);

                opacity:.42;

                pointer-events:none;

                animation:
                    galleryObjectAuraPulse
                    4s
                    ease-in-out
                    infinite;

                z-index:2;
            }

            .gallery-object-hover-glow{
                position:absolute;

                left:50%;
                top:52%;

                width:148%;
                height:148%;

                transform:
                    translate(-50%,-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,236,173,.44),
                        rgba(255,137,231,.27) 34%,
                        rgba(173,100,255,.13) 58%,
                        transparent 78%
                    );

                filter:
                    blur(17px);

                opacity:0;

                pointer-events:none;

                transition:
                    opacity .32s ease,
                    filter .32s ease;

                z-index:3;
            }

            .gallery-object-artwork-body{
                position:absolute;

                left:50%;
                top:50%;

                width:100%;
                height:100%;

                transform:
                    translate(-50%,-50%)
                    rotate(
                        var(
                            --gallery-object-inner-rotate,
                            -2deg
                        )
                    )
                    scale(1);

                transform-origin:
                    50% 12%;

                transition:
                    transform .36s
                    cubic-bezier(.2,.85,.25,1);

                pointer-events:none;

                will-change:
                    transform;

                z-index:10;
            }

            .gallery-object-img{
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
                    drop-shadow(
                        0 12px 15px
                        rgba(0,0,0,.48)
                    )
                    drop-shadow(
                        0 0 11px
                        rgba(255,191,105,.34)
                    )
                    drop-shadow(
                        0 0 20px
                        rgba(194,91,255,.26)
                    );

                transition:
                    filter .32s ease;

                pointer-events:none;

                user-select:none;
                -webkit-user-drag:none;

                z-index:10;
            }

            .gallery-object-hitbox{
                position:absolute;

                left:8%;
                top:6%;

                width:84%;
                height:88%;

                border-radius:30%;

                background:transparent;

                pointer-events:auto;

                cursor:pointer;

                z-index:90;
            }

            .gallery-object-sparkle{
                position:absolute;

                color:
                    rgba(255,232,167,.98);

                font-family:
                    Georgia,
                    serif;

                font-size:
                    var(
                        --gallery-sparkle-size,
                        12px
                    );

                text-shadow:
                    0 0 7px
                    rgba(255,230,160,.96),

                    0 0 15px
                    rgba(255,188,91,.78),

                    0 0 22px
                    rgba(205,100,255,.46);

                opacity:0;

                pointer-events:none;

                z-index:70;
            }

            .gallery-object-orbit{
                position:absolute;

                left:50%;
                top:50%;

                color:
                    rgba(255,239,187,.98);

                font-family:
                    Georgia,
                    serif;

                font-size:12px;

                text-shadow:
                    0 0 8px
                    rgba(255,234,174,.96),

                    0 0 18px
                    rgba(255,194,98,.78),

                    0 0 25px
                    rgba(205,103,255,.52);

                opacity:0;

                pointer-events:none;

                z-index:72;
            }

            #galleryContainer.is-hovered
            .gallery-object-hover-glow{
                opacity:.94;

                filter:
                    blur(19px);
            }

            #galleryContainer.is-hovered
            .gallery-object-artwork-body{
                transform:
                    translate(-50%,-50%)
                    rotate(0deg)
                    scale(1.10);
            }

            #galleryContainer.is-hovered
            .gallery-object-img{
                filter:
                    drop-shadow(
                        0 15px 18px
                        rgba(0,0,0,.52)
                    )
                    drop-shadow(
                        0 0 17px
                        rgba(255,220,145,.68)
                    )
                    drop-shadow(
                        0 0 31px
                        rgba(210,102,255,.56)
                    );
            }

            #galleryContainer.is-hovered
            .gallery-object-sparkle{
                animation:
                    galleryObjectSparkleFloat
                    var(
                        --gallery-sparkle-duration,
                        1.9s
                    )
                    ease-in-out
                    var(
                        --gallery-sparkle-delay,
                        0s
                    )
                    infinite;
            }

            #galleryContainer.is-hovered
            .gallery-object-orbit{
                animation:
                    galleryObjectOrbit
                    2.5s
                    linear
                    infinite;
            }

        `;

        document.head.appendChild(
            style
        );

    },

    setup(){

        this.element.innerHTML =
            "";

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
            "none";

        this.element.style.transformOrigin =
            "50% 0";

        this.element.style.willChange =
            "transform";

        this.element.style.backfaceVisibility =
            "hidden";

        const worldConfig =
            this.getWorldConfig();

        const config =
            worldConfig.gallery || {};

        this.element.style.zIndex =
            String(
                config.z || 113
            );

        this.hovered =
            false;

        this.element.classList.remove(
            "is-hovered"
        );

    },

    build(){

        this.parts = {

            swingGroup:
                document.createElement("div"),

            rope:
                document.createElement("div"),

            objectZone:
                document.createElement("div"),

            shadow:
                document.createElement("div"),

            aura:
                document.createElement("div"),

            hoverGlow:
                document.createElement("div"),

            artworkBody:
                document.createElement("div"),

            image:
                document.createElement("img"),

            orbit:
                document.createElement("span"),

            hitbox:
                document.createElement("div"),

            sparkles: []

        };

        this.parts.swingGroup.className =
            "gallery-object-swing-group";

        this.parts.rope.className =
            "gallery-object-rope";

        this.parts.objectZone.className =
            "gallery-object-zone";

        this.parts.shadow.className =
            "gallery-object-shadow";

        this.parts.aura.className =
            "gallery-object-aura";

        this.parts.hoverGlow.className =
            "gallery-object-hover-glow";

        this.parts.artworkBody.className =
            "gallery-object-artwork-body";

        this.parts.image.className =
            "gallery-object-img";

        this.parts.image.src =
            this.imagePath;

        this.parts.image.alt =
            "Magical gallery memory frame";

        this.parts.image.draggable =
            false;

        this.parts.image.onerror =
            () => {

                console.warn(
                    "❌ Gallery artwork not found:",
                    this.imagePath
                );

            };

        this.parts.orbit.className =
            "gallery-object-orbit";

        this.parts.orbit.textContent =
            "✦";

        this.parts.hitbox.className =
            "gallery-object-hitbox";

        this.parts.artworkBody.appendChild(
            this.parts.image
        );

        this.parts.objectZone.appendChild(
            this.parts.shadow
        );

        this.parts.objectZone.appendChild(
            this.parts.aura
        );

        this.parts.objectZone.appendChild(
            this.parts.hoverGlow
        );

        this.parts.objectZone.appendChild(
            this.parts.artworkBody
        );

        this.createSparkles();

        this.parts.objectZone.appendChild(
            this.parts.orbit
        );

        this.parts.objectZone.appendChild(
            this.parts.hitbox
        );

        this.parts.swingGroup.appendChild(
            this.parts.rope
        );

        this.parts.swingGroup.appendChild(
            this.parts.objectZone
        );

        this.element.appendChild(
            this.parts.swingGroup
        );

    },

    createSparkles(){

        const sparkleData = [

            {
                x:10,
                y:25,
                size:11,
                delay:-.10,
                duration:1.8,
                moveX:-10,
                moveY:-24
            },

            {
                x:84,
                y:20,
                size:14,
                delay:-.48,
                duration:2.1,
                moveX:11,
                moveY:-27
            },

            {
                x:92,
                y:52,
                size:10,
                delay:-.82,
                duration:1.9,
                moveX:15,
                moveY:-17
            },

            {
                x:13,
                y:64,
                size:13,
                delay:-1.15,
                duration:2.2,
                moveX:-13,
                moveY:-20
            },

            {
                x:72,
                y:86,
                size:10,
                delay:-1.42,
                duration:1.85,
                moveX:8,
                moveY:-22
            },

            {
                x:35,
                y:91,
                size:12,
                delay:-.70,
                duration:2.05,
                moveX:-6,
                moveY:-25
            },

            {
                x:52,
                y:8,
                size:9,
                delay:-1.65,
                duration:2.25,
                moveX:4,
                moveY:-21
            },

            {
                x:4,
                y:43,
                size:9,
                delay:-1.02,
                duration:1.95,
                moveX:-12,
                moveY:-15
            }

        ];

        sparkleData.forEach(
            (item, index) => {

                const sparkle =
                    document.createElement(
                        "span"
                    );

                sparkle.className =
                    "gallery-object-sparkle";

                sparkle.textContent =
                    index % 2 === 0
                        ? "✦"
                        : "✧";

                sparkle.style.left =
                    item.x + "%";

                sparkle.style.top =
                    item.y + "%";

                sparkle.style.setProperty(
                    "--gallery-sparkle-size",
                    item.size + "px"
                );

                sparkle.style.setProperty(
                    "--gallery-sparkle-delay",
                    item.delay + "s"
                );

                sparkle.style.setProperty(
                    "--gallery-sparkle-duration",
                    item.duration + "s"
                );

                sparkle.style.setProperty(
                    "--gallery-sparkle-x",
                    item.moveX + "px"
                );

                sparkle.style.setProperty(
                    "--gallery-sparkle-y",
                    item.moveY + "px"
                );

                sparkle.style.setProperty(
                    "--gallery-sparkle-end-x",
                    item.moveX * 1.45 + "px"
                );

                sparkle.style.setProperty(
                    "--gallery-sparkle-end-y",
                    item.moveY * 1.55 + "px"
                );

                this.parts.sparkles.push(
                    sparkle
                );

                this.parts.objectZone.appendChild(
                    sparkle
                );

            }
        );

    },

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
                    "is-hovered"
                );

            }
        );

        this.parts.hitbox.addEventListener(
            "mouseleave",
            () => {

                this.hovered =
                    false;

                this.element.classList.remove(
                    "is-hovered"
                );

            }
        );

        this.parts.hitbox.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

if(
    window.GalleryLock &&
    typeof GalleryLock.open ===
    "function"
){

    GalleryLock.open();

}else{

    console.warn(
        "❌ GalleryLock is not loaded"
    );

}

            }
        );

    },

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
            Tree.getAnchor("gallery");

        if(!anchor){
            return;
        }

        const worldLayer =
            document.getElementById(
                "worldLayer"
            );

        if(!worldLayer){
            return;
        }

        const treeRect =
            Tree.element.getBoundingClientRect();

        const worldRect =
            worldLayer.getBoundingClientRect();

        const worldConfig =
            this.getWorldConfig();

        const config =
            worldConfig.gallery || {};

        const baseWidth =
            Number(config.width) || 105;

        const baseHeight =
            Number(config.height) || 105;

        const width =
            baseWidth * this.sizeScale;

        const artHeight =
            baseHeight * this.sizeScale;

        const ropeLength =
            Number.isFinite(
                Number(config.ropeLength)
            )
                ? Number(config.ropeLength)
                : this.defaultRopeLength;

        const offsetX =
            Number(config.offsetX) || 0;

        const offsetY =
            Number(config.offsetY) || 0;

        const restAngle =
            Number.isFinite(
                Number(config.rotate)
            )
                ? Number(config.rotate)
                : -7;

        const rightAngle =
            Math.max(
                3,
                Math.abs(restAngle) * .65
            );

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

        /*
            Artwork stays near its old position.
            The rope extends upward to the tree.
        */
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
                ropeLength -
                artHeight / 2 +
                offsetY
            ) +
            "px";

        this.element.style.width =
            width + "px";

        this.element.style.height =
            (
                ropeLength +
                artHeight
            ) +
            "px";

        this.element.style.zIndex =
            String(
                config.z || 113
            );

        this.element.style.setProperty(
            "--gallery-object-rope-length",
            ropeLength + "px"
        );

        this.element.style.setProperty(
            "--gallery-object-art-height",
            artHeight + "px"
        );

        this.element.style.setProperty(
            "--gallery-swing-left",
            restAngle + "deg"
        );

        this.element.style.setProperty(
            "--gallery-swing-right",
            rightAngle + "deg"
        );

        this.element.style.setProperty(
            "--gallery-swing-duration",
            (
                Number(config.swingDuration) ||
                5.8
            ) +
            "s"
        );

        this.element.style.setProperty(
            "--gallery-object-inner-rotate",
            "-2deg"
        );

    },

    update(){

        /*
            Swing motion is handled by CSS.

            This function remains here because
            the Banin Universe world loop may
            call GalleryObject.update().
        */

    },

    destroy(){

        if(this.element){

            this.element.innerHTML =
                "";

            this.element.classList.remove(
                "is-hovered"
            );

        }

        const style =
            document.getElementById(
                "galleryObjectArtworkStyles"
            );

        if(style){
            style.remove();
        }

        this.element =
            null;

        this.parts =
            {};

        this.initialized =
            false;

        this.hovered =
            false;

    }

};

window.GalleryObject =
    GalleryObject;