/*
==================================================
BANIN UNIVERSE
MOON
Artwork + Magical Glow + Secret Message
==================================================
*/

"use strict";

const Moon = {

    element: null,

    parts: {},

    initialized: false,
    hovered: false,

    secretClickCount: 0,
    secretRequiredClicks: 5,
    secretOpen: false,
    secretUnlocking: false,

    secretOverlay: null,
    secretCloseButton: null,

    keydownHandler: null,

    imagePath:
        "assets/world/moon.webp",


    /*==================================================
    CREATE
    ==================================================*/

    create(){

        if(this.initialized){
            return;
        }

        this.element =
            document.getElementById("moon");

        if(!this.element){

            console.warn(
                "❌ Moon element not found"
            );

            return;
        }

        this.injectStyles();

        this.setupElement();

        this.buildMoon();

        this.createSecretPanel();

        this.bindEvents();

        this.resize();

        this.initialized = true;

        console.log(
            "✅ Moon created successfully"
        );

    },


    /*==================================================
    STYLES
    ==================================================*/

    injectStyles(){

        const oldStyles =
            document.getElementById(
                "moonMagicalStyles"
            );

        if(oldStyles){
            oldStyles.remove();
        }

        const style =
            document.createElement("style");

        style.id =
            "moonMagicalStyles";

        style.textContent = `

            @keyframes moonAuraBreath{

                0%,
                100%{
                    opacity:.58;

                    transform:
                        translate(-50%,-50%)
                        scale(.94);
                }

                50%{
                    opacity:.92;

                    transform:
                        translate(-50%,-50%)
                        scale(1.06);
                }

            }


            @keyframes moonImageBreath{

                0%,
                100%{
                    filter:
                        brightness(1)
                        saturate(1);
                }

                50%{
                    filter:
                        brightness(1.065)
                        saturate(1.04);
                }

            }


            @keyframes moonStarTwinkle{

                0%,
                100%{
                    opacity:.15;

                    transform:
                        scale(.55)
                        rotate(0deg);
                }

                50%{
                    opacity:1;

                    transform:
                        scale(1.15)
                        rotate(70deg);
                }

            }


            @keyframes moonClickSparkAnimation{

                0%{
                    opacity:1;

                    transform:
                        translate(-50%,-50%)
                        scale(.2)
                        rotate(0deg);
                }

                100%{
                    opacity:0;

                    transform:
                        translate(
                            calc(
                                -50% +
                                var(--moon-spark-x)
                            ),
                            calc(
                                -50% +
                                var(--moon-spark-y)
                            )
                        )
                        scale(1.25)
                        rotate(150deg);
                }

            }


            @keyframes moonUnlockAnimation{

                0%{
                    transform:
                        translate(-50%,-50%)
                        scale(1);

                    filter:
                        brightness(1);
                }

                45%{
                    transform:
                        translate(-50%,-50%)
                        scale(1.075);

                    filter:
                        brightness(1.55);
                }

                100%{
                    transform:
                        translate(-50%,-50%)
                        scale(1);

                    filter:
                        brightness(1);
                }

            }


            @keyframes moonSecretOverlayIn{

                from{
                    opacity:0;
                }

                to{
                    opacity:1;
                }

            }


            @keyframes moonSecretPanelIn{

                from{
                    opacity:0;

                    transform:
                        translateY(24px)
                        scale(.92);
                }

                to{
                    opacity:1;

                    transform:
                        translateY(0)
                        scale(1);
                }

            }


            @keyframes moonSecretBorderGlow{

                0%,
                100%{
                    opacity:.36;
                }

                50%{
                    opacity:1;
                }

            }


            @keyframes moonSecretStarFloat{

                0%,
                100%{
                    opacity:.25;

                    transform:
                        translateY(0)
                        scale(.7);
                }

                50%{
                    opacity:1;

                    transform:
                        translateY(-6px)
                        scale(1.1);
                }

            }


            .moon-artwork-float{
                position:absolute;

                inset:0;

                overflow:visible;

                pointer-events:none;

                will-change:transform;

                z-index:1;
            }


            .moon-artwork-aura{
                position:absolute;

                left:50%;
                top:50%;

                width:155%;
                height:155%;

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,255,237,.26) 0%,
                        rgba(169,203,255,.16) 32%,
                        rgba(59,86,185,.09) 54%,
                        transparent 75%
                    );

                filter:
                    blur(18px);

                transform:
                    translate(-50%,-50%);

                animation:
                    moonAuraBreath
                    7s
                    ease-in-out
                    infinite;

                pointer-events:none;

                z-index:1;
            }


            .moon-artwork-image-wrap{
                position:absolute;

                left:50%;
                top:50%;

                width:100%;
                height:100%;

                transform:
                    translate(-50%,-50%)
                    scale(1);

                transform-origin:center;

                animation:
                    moonImageBreath
                    7.2s
                    ease-in-out
                    infinite;

                transition:
                    transform .45s ease,
                    filter .45s ease;

                pointer-events:none;

                z-index:5;
            }


            .moon-artwork-image{
                position:absolute;

                left:50%;
                top:50%;

                width:235%;
                height:235%;

                object-fit:contain;

                transform:
                    translate(-50%,-50%);

                filter:
                    drop-shadow(
                        0 0 13px
                        rgba(255,255,239,.55)
                    )
                    drop-shadow(
                        0 0 28px
                        rgba(139,184,255,.34)
                    )
                    drop-shadow(
                        0 0 48px
                        rgba(49,70,173,.23)
                    );

                transition:
                    filter .45s ease;

                user-select:none;
                -webkit-user-drag:none;

                pointer-events:none;

                z-index:5;
            }


            .moon-artwork-star{
                position:absolute;

                color:
                    rgba(255,248,207,.98);

                font-family:
                    Georgia,
                    serif;

                font-size:
                    var(
                        --moon-star-size,
                        10px
                    );

                text-shadow:
                    0 0 7px
                    rgba(255,245,205,.98),
                    0 0 17px
                    rgba(160,202,255,.78),
                    0 0 27px
                    rgba(63,91,205,.48);

                animation:
                    moonStarTwinkle
                    var(
                        --moon-star-duration,
                        3.5s
                    )
                    ease-in-out
                    var(
                        --moon-star-delay,
                        0s
                    )
                    infinite;

                pointer-events:none;

                z-index:12;
            }


            .moon-artwork-hitbox{
                position:absolute;

                left:50%;
                top:50%;

                width:180%;
                height:180%;

                border-radius:50%;

                transform:
                    translate(-50%,-50%);

                background:
                    transparent;

                pointer-events:auto;

                cursor:pointer;

                touch-action:manipulation;

                z-index:100;
            }


            .moon-click-spark{
                position:absolute;

                left:50%;
                top:50%;

                color:
                    rgba(255,248,210,.98);

                font-family:
                    Georgia,
                    serif;

                font-size:
                    var(
                        --moon-click-spark-size,
                        12px
                    );

                text-shadow:
                    0 0 8px
                    rgba(255,244,204,.98),
                    0 0 17px
                    rgba(158,203,255,.85),
                    0 0 27px
                    rgba(66,91,215,.58);

                pointer-events:none;

                animation:
                    moonClickSparkAnimation
                    .8s
                    ease-out
                    both;

                z-index:120;
            }


            #moon.moon-hovered
            .moon-artwork-aura{
                opacity:1;

                filter:
                    blur(22px);
            }


            #moon.moon-hovered
            .moon-artwork-image-wrap{
                transform:
                    translate(-50%,-50%)
                    scale(1.025);

                filter:
                    brightness(1.08);
            }


            #moon.moon-hovered
            .moon-artwork-image{
                filter:
                    drop-shadow(
                        0 0 17px
                        rgba(255,255,239,.78)
                    )
                    drop-shadow(
                        0 0 38px
                        rgba(148,196,255,.59)
                    )
                    drop-shadow(
                        0 0 60px
                        rgba(56,78,193,.38)
                    );
            }


            #moon.moon-secret-unlocking
            .moon-artwork-image-wrap{
                animation:
                    moonUnlockAnimation
                    .7s
                    cubic-bezier(.2,.85,.25,1)
                    both;
            }


            .moon-secret-overlay{
                position:fixed;

                inset:0;

                display:flex;
                align-items:center;
                justify-content:center;

                padding:30px;

                background:
                    radial-gradient(
                        circle at 50% 42%,
                        rgba(57,84,182,.25),
                        transparent 45%
                    ),
                    rgba(2,4,18,.78);

                backdrop-filter:
                    blur(9px);

                -webkit-backdrop-filter:
                    blur(9px);

                opacity:0;
                visibility:hidden;
                pointer-events:none;

                transition:
                    opacity .4s ease,
                    visibility .4s ease;

                z-index:2147483000;
            }


            .moon-secret-overlay.visible{
                opacity:1;
                visibility:visible;
                pointer-events:auto;

                animation:
                    moonSecretOverlayIn
                    .4s
                    ease
                    both;
            }


            .moon-secret-panel{
                position:relative;

                width:
                    min(
                        620px,
                        calc(100vw - 60px)
                    );

                min-height:310px;

                box-sizing:border-box;

                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;

                padding:
                    58px 64px 52px;

                border-radius:30px;

                border:
                    1px solid
                    rgba(213,229,255,.5);

                background:
                    radial-gradient(
                        circle at 50% 10%,
                        rgba(157,196,255,.18),
                        transparent 42%
                    ),
                    linear-gradient(
                        145deg,
                        rgba(20,31,76,.99),
                        rgba(5,9,31,.99) 55%,
                        rgba(26,29,78,.99)
                    );

                box-shadow:
                    0 35px 100px
                    rgba(0,0,0,.75),
                    0 0 42px
                    rgba(132,183,255,.27),
                    0 0 80px
                    rgba(55,75,190,.23),
                    inset 0 0 45px
                    rgba(148,188,255,.08);

                text-align:center;

                opacity:0;

                transform:
                    translateY(24px)
                    scale(.92);
            }


            .moon-secret-overlay.visible
            .moon-secret-panel{
                animation:
                    moonSecretPanelIn
                    .62s
                    cubic-bezier(.2,.9,.2,1)
                    both;
            }


            .moon-secret-panel::before,
            .moon-secret-panel::after{
                content:"";

                position:absolute;

                pointer-events:none;

                border-radius:38px;

                animation:
                    moonSecretBorderGlow
                    3.5s
                    ease-in-out
                    infinite;
            }


            .moon-secret-panel::before{
                inset:-12px;

                border:
                    1px solid
                    rgba(220,234,255,.25);

                box-shadow:
                    0 0 28px
                    rgba(146,195,255,.22);
            }


            .moon-secret-panel::after{
                inset:-23px;

                border:
                    1px solid
                    rgba(130,163,255,.12);

                box-shadow:
                    0 0 45px
                    rgba(74,95,215,.18);

                animation-delay:1.1s;
            }


            .moon-secret-kicker{
                margin:
                    0 0 19px;

                color:
                    rgba(173,207,255,.86);

                font-family:
                    "BaninDream",
                    "Cormorant Garamond",
                    Georgia,
                    serif;

                font-size:12px;
                font-weight:700;

                letter-spacing:3.5px;

                text-transform:uppercase;

                text-shadow:
                    0 0 14px
                    rgba(130,181,255,.48);
            }


            .moon-secret-message{
                margin:0;

                max-width:520px;

                color:
                    rgba(255,248,217,.99);

                font-family:
                    "BaninDream",
                    "Cormorant Garamond",
                    Georgia,
                    serif;

                font-size:
                    clamp(
                        25px,
                        3vw,
                        38px
                    );

                line-height:1.42;
                font-weight:700;
                font-style:italic;

                text-shadow:
                    0 3px 15px
                    rgba(0,0,0,.68),
                    0 0 20px
                    rgba(255,239,183,.22),
                    0 0 34px
                    rgba(123,175,255,.27);
            }


            .moon-secret-divider{
                width:180px;
                height:1px;

                margin:
                    26px 0 19px;

                background:
                    linear-gradient(
                        90deg,
                        transparent,
                        rgba(157,203,255,.82),
                        rgba(255,232,167,.9),
                        rgba(157,203,255,.82),
                        transparent
                    );

                box-shadow:
                    0 0 9px
                    rgba(143,195,255,.4);
            }


            .moon-secret-persian{
                margin:0;

                color:
                    rgba(225,235,255,.93);

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    sans-serif;

                font-size:17px;
                line-height:2;

                direction:rtl;

                text-shadow:
                    0 2px 11px
                    rgba(0,0,0,.7),
                    0 0 16px
                    rgba(116,171,255,.23);
            }


            .moon-secret-close{
                position:absolute;

                top:-18px;
                right:-18px;

                width:45px;
                height:45px;

                display:flex;
                align-items:center;
                justify-content:center;

                border-radius:50%;

                border:
                    1px solid
                    rgba(218,234,255,.6);

                background:
                    linear-gradient(
                        145deg,
                        rgba(36,56,125,.99),
                        rgba(5,9,29,.99)
                    );

                color:
                    rgba(255,245,207,.99);

                font-family:
                    Arial,
                    sans-serif;

                font-size:27px;
                line-height:1;

                cursor:pointer;

                box-shadow:
                    0 12px 30px
                    rgba(0,0,0,.52),
                    0 0 24px
                    rgba(131,187,255,.27);

                transition:
                    transform .22s ease,
                    filter .22s ease;

                z-index:20;
            }


            .moon-secret-close:hover{
                transform:
                    scale(1.09)
                    rotate(7deg);

                filter:
                    brightness(1.18);
            }


            .moon-secret-decoration{
                position:absolute;

                color:
                    rgba(255,244,203,.96);

                font-family:
                    Georgia,
                    serif;

                text-shadow:
                    0 0 8px
                    rgba(255,240,199,.92),
                    0 0 19px
                    rgba(132,187,255,.68);

                pointer-events:none;

                animation:
                    moonSecretStarFloat
                    var(
                        --moon-secret-star-duration,
                        3.5s
                    )
                    ease-in-out
                    var(
                        --moon-secret-star-delay,
                        0s
                    )
                    infinite;
            }

        `;

        document.head.appendChild(style);

    },


    /*==================================================
    ELEMENT SETUP
    ==================================================*/

    setupElement(){

        this.element.innerHTML = "";

        this.element.style.position =
            "absolute";

        this.element.style.display =
            "block";

        this.element.style.visibility =
            "visible";

        this.element.style.opacity =
            "1";

        this.element.style.background =
            "transparent";

        this.element.style.border =
            "none";

        this.element.style.borderRadius =
            "0";

        this.element.style.boxShadow =
            "none";

        this.element.style.overflow =
            "visible";

        this.element.style.pointerEvents =
            "auto";

        this.element.style.touchAction =
            "manipulation";

        this.element.classList.remove(
            "moon-hovered",
            "moon-secret-unlocking"
        );

        this.secretClickCount = 0;
        this.secretOpen = false;
        this.secretUnlocking = false;

    },


    /*==================================================
    BUILD MOON
    ==================================================*/

    buildMoon(){

        const float =
            document.createElement("div");

        const aura =
            document.createElement("div");

        const imageWrap =
            document.createElement("div");

        const image =
            document.createElement("img");

        const hitbox =
            document.createElement("div");


        float.className =
            "moon-artwork-float";

        aura.className =
            "moon-artwork-aura";

        imageWrap.className =
            "moon-artwork-image-wrap";

        image.className =
            "moon-artwork-image";

        hitbox.className =
            "moon-artwork-hitbox";


        image.src =
            this.imagePath;

        image.alt =
            "Magical full moon";

        image.draggable =
            false;


        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "❌ Moon artwork was not found:",
                    this.imagePath
                );

            },
            {
                once:true
            }
        );


        imageWrap.appendChild(image);

        float.appendChild(aura);

        float.appendChild(imageWrap);

        this.parts = {

            float,
            aura,
            imageWrap,
            image,
            hitbox,
            stars: []

        };


        this.createAmbientStars();


        float.appendChild(hitbox);

        this.element.appendChild(float);

    },


    /*==================================================
    AMBIENT STARS
    ==================================================*/

    createAmbientStars(){

        const starData = [

            {
                left:2,
                top:22,
                size:10,
                duration:3.2,
                delay:-.3
            },

            {
                left:20,
                top:-8,
                size:8,
                duration:3.8,
                delay:-1.1
            },

            {
                left:75,
                top:-4,
                size:12,
                duration:3.4,
                delay:-1.7
            },

            {
                left:101,
                top:38,
                size:9,
                duration:2.9,
                delay:-.6
            },

            {
                left:88,
                top:88,
                size:11,
                duration:3.7,
                delay:-2.1
            },

            {
                left:24,
                top:101,
                size:8,
                duration:3.3,
                delay:-1.4
            },

            {
                left:-6,
                top:67,
                size:11,
                duration:4,
                delay:-2.5
            },

            {
                left:54,
                top:-14,
                size:7,
                duration:3.5,
                delay:-.9
            }

        ];


        starData.forEach(
            (item, index) => {

                const star =
                    document.createElement(
                        "span"
                    );

                star.className =
                    "moon-artwork-star";

                star.textContent =
                    index % 2 === 0
                        ? "✦"
                        : "✧";

                star.style.left =
                    item.left + "%";

                star.style.top =
                    item.top + "%";

                star.style.setProperty(
                    "--moon-star-size",
                    item.size + "px"
                );

                star.style.setProperty(
                    "--moon-star-duration",
                    item.duration + "s"
                );

                star.style.setProperty(
                    "--moon-star-delay",
                    item.delay + "s"
                );

                this.parts.stars.push(star);

                this.parts.float.appendChild(
                    star
                );

            }
        );

    },


    /*==================================================
    SECRET PANEL
    ==================================================*/

    createSecretPanel(){

        const oldOverlay =
            document.getElementById(
                "moonSecretOverlay"
            );

        if(oldOverlay){
            oldOverlay.remove();
        }


        const overlay =
            document.createElement("div");

        const panel =
            document.createElement("section");

        const closeButton =
            document.createElement("button");

        const kicker =
            document.createElement("p");

        const message =
            document.createElement("p");

        const divider =
            document.createElement("div");

        const persian =
            document.createElement("p");


        overlay.id =
            "moonSecretOverlay";

        overlay.className =
            "moon-secret-overlay";

        overlay.setAttribute(
            "aria-hidden",
            "true"
        );


        panel.className =
            "moon-secret-panel";

        panel.setAttribute(
            "role",
            "dialog"
        );

        panel.setAttribute(
            "aria-modal",
            "true"
        );

        panel.setAttribute(
            "aria-label",
            "A secret from the moon"
        );


        closeButton.type =
            "button";

        closeButton.className =
            "moon-secret-close";

        closeButton.textContent =
            "×";

        closeButton.setAttribute(
            "aria-label",
            "Close moon secret"
        );


        kicker.className =
            "moon-secret-kicker";

        kicker.textContent =
            "A Secret From The Moon";


        message.className =
            "moon-secret-message";

        message.textContent =
            "The moon knows how much I missed you.";


        divider.className =
            "moon-secret-divider";


        persian.className =
            "moon-secret-persian";

        persian.textContent =
            "ماه می‌دونه چقدردلم برات تنگ شده.";


        panel.appendChild(kicker);

        panel.appendChild(message);

        panel.appendChild(divider);

        panel.appendChild(persian);

        panel.appendChild(closeButton);


        this.createSecretDecorations(
            panel
        );


        overlay.appendChild(panel);

        document.body.appendChild(
            overlay
        );


        this.secretOverlay =
            overlay;

        this.secretCloseButton =
            closeButton;

    },


    createSecretDecorations(panel){

        const decorations = [

            {
                symbol:"✦",
                left:"7%",
                top:"13%",
                size:"13px",
                duration:"3.2s",
                delay:"-.4s"
            },

            {
                symbol:"✧",
                right:"8%",
                top:"18%",
                size:"10px",
                duration:"3.8s",
                delay:"-1.2s"
            },

            {
                symbol:"✦",
                left:"12%",
                bottom:"14%",
                size:"9px",
                duration:"3.5s",
                delay:"-2s"
            },

            {
                symbol:"✧",
                right:"11%",
                bottom:"12%",
                size:"12px",
                duration:"4s",
                delay:"-.8s"
            }

        ];


        decorations.forEach(
            item => {

                const star =
                    document.createElement(
                        "span"
                    );

                star.className =
                    "moon-secret-decoration";

                star.textContent =
                    item.symbol;


                if(item.left){
                    star.style.left =
                        item.left;
                }

                if(item.right){
                    star.style.right =
                        item.right;
                }

                if(item.top){
                    star.style.top =
                        item.top;
                }

                if(item.bottom){
                    star.style.bottom =
                        item.bottom;
                }


                star.style.fontSize =
                    item.size;

                star.style.setProperty(
                    "--moon-secret-star-duration",
                    item.duration
                );

                star.style.setProperty(
                    "--moon-secret-star-delay",
                    item.delay
                );

                panel.appendChild(star);

            }
        );

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
                    "moon-hovered"
                );

            }
        );


        this.parts.hitbox.addEventListener(
            "mouseleave",
            () => {

                this.hovered = false;

                this.element.classList.remove(
                    "moon-hovered"
                );

            }
        );


        this.parts.hitbox.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                this.registerSecretClick();

            }
        );


        this.secretCloseButton.addEventListener(
            "click",
            () => {

                this.closeSecretMessage();

            }
        );


        this.secretOverlay.addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    this.secretOverlay
                ){

                    this.closeSecretMessage();

                }

            }
        );


        this.keydownHandler =
            event => {

                if(
                    event.key === "Escape" &&
                    this.secretOpen
                ){

                    this.closeSecretMessage();

                }

            };


        document.addEventListener(
            "keydown",
            this.keydownHandler
        );

    },


    /*==================================================
    SECRET CLICK
    ==================================================*/

    registerSecretClick(){

        if(
            this.secretOpen ||
            this.secretUnlocking
        ){
            return;
        }


        this.secretClickCount += 1;


        console.log(
            `🌙 Moon secret: ${this.secretClickCount}/${this.secretRequiredClicks}`
        );


        this.createClickBurst();


        if(
            this.secretClickCount <
            this.secretRequiredClicks
        ){
            return;
        }


        this.secretClickCount = 0;

        this.secretUnlocking = true;


        this.element.classList.add(
            "moon-secret-unlocking"
        );


        window.setTimeout(
            () => {

                this.element.classList.remove(
                    "moon-secret-unlocking"
                );

                this.secretUnlocking = false;

                this.openSecretMessage();

            },
            680
        );

    },


    createClickBurst(){

        if(!this.parts.float){
            return;
        }


        const sparkCount = 6;


        for(
            let index = 0;
            index < sparkCount;
            index += 1
        ){

            const spark =
                document.createElement(
                    "span"
                );

            spark.className =
                "moon-click-spark";

            spark.textContent =
                index % 2 === 0
                    ? "✦"
                    : "✧";


            const angle =
                (
                    Math.PI *
                    2 *
                    index /
                    sparkCount
                ) +
                Math.random() *
                .45;


            const distance =
                40 +
                Math.random() *
                33;


            spark.style.setProperty(
                "--moon-spark-x",
                (
                    Math.cos(angle) *
                    distance
                ) +
                "px"
            );


            spark.style.setProperty(
                "--moon-spark-y",
                (
                    Math.sin(angle) *
                    distance
                ) +
                "px"
            );


            spark.style.setProperty(
                "--moon-click-spark-size",
                (
                    8 +
                    Math.random() *
                    7
                ) +
                "px"
            );


            spark.style.animationDelay =
                index * .025 + "s";


            this.parts.float.appendChild(
                spark
            );


            window.setTimeout(
                () => {

                    spark.remove();

                },
                900
            );

        }

    },


    /*==================================================
    SECRET OPEN / CLOSE
    ==================================================*/

    openSecretMessage(){

        if(
            !this.secretOverlay ||
            this.secretOpen
        ){
            return;
        }


        this.secretOpen = true;


        this.secretOverlay.classList.add(
            "visible"
        );


        this.secretOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        requestAnimationFrame(
            () => {

                this.secretCloseButton.focus({
                    preventScroll:true
                });

            }
        );

    },


    closeSecretMessage(){

        if(!this.secretOverlay){
            return;
        }


        this.secretOpen = false;


        this.secretOverlay.classList.remove(
            "visible"
        );


        this.secretOverlay.setAttribute(
            "aria-hidden",
            "true"
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
            WorldConfig.moon;


        this.element.style.left =
            config.x + "%";

        this.element.style.top =
            config.y + "%";

        this.element.style.width =
            config.width + "px";

        this.element.style.height =
            config.height + "px";

        this.element.style.zIndex =
            String(config.z);

    },


    /*==================================================
    UPDATE
    ==================================================*/

    update(){

        if(
            !this.element ||
            !this.parts.float
        ){
            return;
        }


        const elapsed =
            (
                typeof Engine !== "undefined" &&
                Number.isFinite(
                    Number(Engine.elapsed)
                )
            )
                ? Number(Engine.elapsed)
                : performance.now() / 1000;


        const floatX =
            Math.cos(
                elapsed * .4
            ) * .7;


        const floatY =
            Math.sin(
                elapsed * .54
            ) * 1.35;


        this.parts.float.style.transform =
            `translate(${floatX}px, ${floatY}px)`;

    },


    /*==================================================
    DESTROY
    ==================================================*/

    destroy(){

        if(this.keydownHandler){

            document.removeEventListener(
                "keydown",
                this.keydownHandler
            );

            this.keydownHandler = null;

        }


        if(this.secretOverlay){

            this.secretOverlay.remove();

        }


        if(this.element){

            this.element.innerHTML = "";

            this.element.classList.remove(
                "moon-hovered",
                "moon-secret-unlocking"
            );

        }


        const styles =
            document.getElementById(
                "moonMagicalStyles"
            );


        if(styles){
            styles.remove();
        }


        this.parts = {};

        this.element = null;

        this.secretOverlay = null;
        this.secretCloseButton = null;

        this.secretClickCount = 0;
        this.secretOpen = false;
        this.secretUnlocking = false;

        this.hovered = false;
        this.initialized = false;

    }

};


window.Moon = Moon;