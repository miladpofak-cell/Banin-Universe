/*==================================================
BANIN UNIVERSE
MILAD SIGNATURE
Fixed Signature + Fire Hover + Romantic Message
==================================================*/

"use strict";


const MiladSignature = {

    initialized: false,
    opened: false,
    hovered: false,

    container: null,
    signature: null,
    particleLayer: null,

    overlay: null,
    panel: null,

    closeButton: null,

    particles: [],
    particleTimer: null,


    /*==================================================
    CREATE
    ==================================================*/

    create(){

        if(this.initialized){
            return;
        }


        this.container =
            document.getElementById(
                "miladSignatureContainer"
            );


        if(!this.container){

            console.warn(
                "❌ miladSignatureContainer not found"
            );

            return;
        }


        this.injectStyles();
        this.setup();
        this.buildSignature();
        this.buildPanel();
        this.bindEvents();


        this.initialized = true;


        console.log(
            "🔥 Milad Signature created"
        );

    },


    /*==================================================
    STYLES
    ==================================================*/

    injectStyles(){

        const oldStyle =
            document.getElementById(
                "miladSignatureStyles"
            );


        if(oldStyle){
            oldStyle.remove();
        }


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "miladSignatureStyles";


        style.textContent = `

            @keyframes miladFireParticle{

                0%{
                    opacity:0;

                    transform:
                        translate(-50%,-50%)
                        scale(.35);
                }

                15%{
                    opacity:1;
                }

                65%{
                    opacity:.95;
                }

                100%{
                    opacity:0;

                    transform:
                        translate(
                            calc(
                                -50% +
                                var(--milad-fire-x)
                            ),
                            calc(
                                -50% +
                                var(--milad-fire-y)
                            )
                        )
                        scale(1.18);
                }

            }


            @keyframes miladPanelAppear{

                from{
                    opacity:0;

                    transform:
                        translateY(35px)
                        scale(.92);
                }

                to{
                    opacity:1;

                    transform:
                        translateY(0)
                        scale(1);
                }

            }


            @keyframes miladOverlayAppear{

                from{
                    opacity:0;
                }

                to{
                    opacity:1;
                }

            }


            @keyframes miladPanelGlow{

                0%,
                100%{
                    box-shadow:
                        0 30px 90px rgba(0,0,0,.75),
                        0 0 38px rgba(193,45,74,.24),
                        inset 0 0 28px rgba(255,190,120,.05);
                }

                50%{
                    box-shadow:
                        0 30px 90px rgba(0,0,0,.75),
                        0 0 58px rgba(228,47,82,.42),
                        inset 0 0 36px rgba(255,187,105,.09);
                }

            }


            @keyframes miladFlameRise{

                0%{
                    opacity:0;

                    transform:
                        translateY(22px)
                        scale(.7);
                }

                25%{
                    opacity:.85;
                }

                100%{
                    opacity:0;

                    transform:
                        translateY(-72px)
                        scale(1.3);
                }

            }


            #miladSignatureContainer{
                position:fixed;

                left:-90px;
                bottom:-110px;

                width:auto;
                height:auto;

                display:block;

                z-index:2147482500;

                pointer-events:auto;

                user-select:none;
            }


            .milad-signature-wrap{
                position:relative;

                display:inline-flex;

                align-items:center;
                justify-content:center;

                padding:
                    9px 13px;

                cursor:pointer;
            }


.milad-signature-image{
    position:relative;

    width:500px;
    height:auto;

    display:block;

    object-fit:contain;

    filter:
        brightness(.92)
        saturate(.92)

        drop-shadow(
            0 0 4px
            rgba(255,70,45,.20)
        );

    transition:
        filter .35s ease;

    pointer-events:none;

    user-select:none;
    -webkit-user-drag:none;

    z-index:10;
}


            .milad-signature-particles{
                position:absolute;

                inset:-25px;

                overflow:visible;

                pointer-events:none;

                z-index:5;
            }


            .milad-signature-particle{
                position:absolute;

                left:
                    var(--milad-fire-left);

                top:
                    var(--milad-fire-top);

                width:
                    var(--milad-fire-size);

                height:
                    var(--milad-fire-size);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(255,250,205,1) 0%,
                        rgba(255,178,74,.98) 28%,
                        rgba(255,55,48,.92) 65%,
                        transparent 100%
                    );

                box-shadow:
                    0 0 7px
                    rgba(255,224,145,.9),

                    0 0 14px
                    rgba(255,78,39,.72);

                animation:
                    miladFireParticle
                    var(--milad-fire-duration)
                    ease-out
                    both;

                pointer-events:none;
            }


#miladSignatureContainer.milad-hovered
.milad-signature-image{
    filter:
        brightness(1.22)
        saturate(1.18)

        drop-shadow(
            0 0 6px
            rgba(255,235,190,.82)
        )

        drop-shadow(
            0 0 14px
            rgba(255,70,45,.96)
        )

        drop-shadow(
            0 0 28px
            rgba(255,30,30,.68)
        )

        drop-shadow(
            0 0 42px
            rgba(255,120,35,.42)
        );
}


            /*==========================================
            MESSAGE OVERLAY
            ==========================================*/

            #miladSignatureOverlay{
                position:fixed;

                inset:0;

                display:flex;

                align-items:center;
                justify-content:center;

                padding:30px;

                background:
                    radial-gradient(
                        circle at 50% 58%,
                        rgba(111,25,43,.42),
                        rgba(30,10,28,.78) 50%,
                        rgba(3,2,9,.96)
                    );

                backdrop-filter:
                    blur(10px);

                -webkit-backdrop-filter:
                    blur(10px);

                opacity:0;
                visibility:hidden;
                pointer-events:none;

                transition:
                    opacity .34s ease,
                    visibility .34s ease;

                z-index:2147483700;
            }


            #miladSignatureOverlay.milad-panel-opened{
                opacity:1;
                visibility:visible;
                pointer-events:auto;

                animation:
                    miladOverlayAppear
                    .35s
                    ease
                    both;
            }


            .milad-signature-panel{
                position:relative;

                width:
                    min(760px, 90vw);

                min-height:390px;

                display:flex;

                flex-direction:column;

                align-items:center;
                justify-content:center;

                gap:25px;

                padding:
                    65px 60px 58px;

                overflow:visible;

                border:
                    1px solid
                    rgba(255,194,112,.43);

                border-radius:30px;

                background:
                    radial-gradient(
                        circle at 50% 40%,
                        rgba(99,29,55,.96),
                        rgba(50,18,45,.98) 52%,
                        rgba(18,10,27,.99)
                    );

                animation:
                    miladPanelGlow
                    3.8s
                    ease-in-out
                    infinite;

                isolation:isolate;
            }


            #miladSignatureOverlay.milad-panel-opened
            .milad-signature-panel{
                animation:
                    miladPanelAppear
                    .55s
                    cubic-bezier(.2,.8,.25,1)
                    both,

                    miladPanelGlow
                    3.8s
                    ease-in-out
                    .55s
                    infinite;
            }


            .milad-signature-panel::before{
                content:"";

                position:absolute;

                inset:13px;

                border:
                    1px solid
                    rgba(255,213,158,.17);

                border-radius:22px;

                pointer-events:none;
            }


            .milad-signature-panel::after{
                content:"";

                position:absolute;

                left:10%;
                right:10%;
                bottom:-18px;

                height:72px;

                background:
                    radial-gradient(
                        ellipse,
                        rgba(255,63,38,.42),
                        rgba(255,133,43,.20) 35%,
                        transparent 72%
                    );

                filter:
                    blur(18px);

                pointer-events:none;

                z-index:-1;
            }


.milad-signature-english{
    position:relative;

    max-width:650px;

    margin:0;

    padding:0 18px;

    color:
        #fff4ea;

    font-family:
        "BaninDream",
        "Segoe Script",
        "Brush Script MT",
        Georgia,
        serif;

    font-size:
        clamp(27px, 3.2vw, 42px);

    font-style:italic;
    font-weight:500;

    line-height:1.6;

    letter-spacing:.7px;

    text-align:center;

    text-shadow:
        0 0 5px
        rgba(255,255,255,.75),

        0 0 14px
        rgba(255,205,172,.46),

        0 0 28px
        rgba(255,78,91,.28),

        0 0 44px
        rgba(174,58,111,.18);

    filter:
        drop-shadow(
            0 4px 8px
            rgba(0,0,0,.28)
        );

    z-index:5;
}


.milad-signature-divider{
    position:relative;

    width:68%;
    height:2px;

    margin:
        4px 0 2px;

    border-radius:50%;

    background:
        linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,205,142,.28) 15%,
            rgba(255,226,184,.90) 43%,
            rgba(255,96,105,.96) 50%,
            rgba(255,226,184,.90) 57%,
            rgba(255,205,142,.28) 85%,
            transparent 100%
        );

    box-shadow:
        0 0 7px
        rgba(255,232,199,.52),

        0 0 18px
        rgba(255,78,87,.44);

    z-index:5;
}


.milad-signature-divider::before{
    content:"♥";

    position:absolute;

    left:50%;
    top:50%;

    transform:
        translate(-50%,-50%);

    padding:
        0 12px;

    background:
        #571d36;

    color:
        #ffd4ca;

    font-family:
        Georgia,
        serif;

    font-size:18px;

    text-shadow:
        0 0 8px
        rgba(255,81,91,.85),

        0 0 17px
        rgba(255,56,45,.55);
}


.milad-signature-persian{
    position:relative;

    margin:0;

    padding:
        7px 24px 10px;

    color:
        #fff1ea;

    font-family:
        "BaninDream",
        "Vazirmatn",
        serif;

    font-size:
        clamp(36px, 4.5vw, 58px);

    font-weight:700;

    direction:rtl;

    line-height:1.5;

    text-align:center;

    letter-spacing:.3px;

    text-shadow:
        0 0 5px
        rgba(255,255,255,.92),

        0 0 12px
        rgba(255,190,178,.70),

        0 0 24px
        rgba(255,68,81,.76),

        0 0 42px
        rgba(255,66,37,.40),

        0 5px 12px
        rgba(0,0,0,.33);

    filter:
        brightness(1.07);

    z-index:5;
}


            .milad-signature-close{
                position:absolute;

                right:18px;
                top:17px;

                width:42px;
                height:42px;

                display:flex;

                align-items:center;
                justify-content:center;

                padding:0;

                border:
                    1px solid
                    rgba(255,214,163,.33);

                border-radius:50%;

                background:
                    rgba(28,12,28,.75);

                color:
                    rgba(255,237,216,.96);

                font-family:
                    Georgia,
                    serif;

                font-size:28px;

                cursor:pointer;

                transition:
                    transform .25s ease,
                    background .25s ease,
                    box-shadow .25s ease;

                z-index:20;
            }


            .milad-signature-close:hover{
                transform:
                    rotate(8deg)
                    scale(1.08);

                background:
                    rgba(139,33,54,.86);

                box-shadow:
                    0 0 18px
                    rgba(255,58,61,.52);
            }


            .milad-signature-flames{
                position:absolute;

                left:12%;
                right:12%;
                bottom:-26px;

                height:100px;

                overflow:visible;

                pointer-events:none;

                z-index:4;
            }


            .milad-signature-flame{
                position:absolute;

                bottom:0;

                width:
                    var(--milad-panel-fire-size);

                height:
                    calc(
                        var(--milad-panel-fire-size) *
                        1.45
                    );

                border-radius:
                    50% 50% 45% 45%;

                background:
                    radial-gradient(
                        ellipse at 50% 75%,
                        rgba(255,245,190,.98) 0%,
                        rgba(255,175,53,.93) 27%,
                        rgba(255,55,45,.80) 58%,
                        transparent 78%
                    );

                filter:
                    blur(.5px);

                animation:
                    miladFlameRise
                    var(--milad-panel-fire-duration)
                    ease-out
                    infinite;

                animation-delay:
                    var(--milad-panel-fire-delay);

                opacity:0;
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

        this.container.innerHTML =
            "";


        if(
            this.container.parentElement !==
            document.body
        ){
            document.body.appendChild(
                this.container
            );
        }


        this.container.classList.remove(
            "milad-hovered"
        );


        this.hovered = false;
        this.opened = false;
        this.particles = [];

    },


    /*==================================================
    BUILD SIGNATURE
    ==================================================*/

buildSignature(){

    const wrap =
        document.createElement(
            "div"
        );

    const image =
        document.createElement(
            "img"
        );

    const particles =
        document.createElement(
            "div"
        );


    wrap.className =
        "milad-signature-wrap";

    image.className =
        "milad-signature-image";

    particles.className =
        "milad-signature-particles";


    image.src =
        "assets/world/milad-signature.webp";

    image.alt =
        "Milad Signature";

    image.draggable =
        false;


    image.addEventListener(
        "error",
        () => {

            console.warn(
                "❌ Milad signature artwork not found"
            );

        },
        {
            once:true
        }
    );


    wrap.appendChild(
        particles
    );

    wrap.appendChild(
        image
    );


    this.container.appendChild(
        wrap
    );


    this.signature =
        wrap;

    this.particleLayer =
        particles;

},


    /*==================================================
    BUILD PANEL
    ==================================================*/

    buildPanel(){

        this.overlay =
            document.createElement(
                "div"
            );

        this.panel =
            document.createElement(
                "div"
            );

        const english =
            document.createElement(
                "p"
            );

        const divider =
            document.createElement(
                "div"
            );

        const persian =
            document.createElement(
                "p"
            );

        const flames =
            document.createElement(
                "div"
            );

        this.closeButton =
            document.createElement(
                "button"
            );


        this.overlay.id =
            "miladSignatureOverlay";

        this.panel.className =
            "milad-signature-panel";

        english.className =
            "milad-signature-english";

        divider.className =
            "milad-signature-divider";

        persian.className =
            "milad-signature-persian";

        flames.className =
            "milad-signature-flames";

        this.closeButton.className =
            "milad-signature-close";


        english.textContent =
            "I made this little universe just to show you how deeply I love you.";

        persian.textContent =
            "بنین تو مال منی";


        this.closeButton.type =
            "button";

        this.closeButton.textContent =
            "×";


        this.createPanelFlames(
            flames,
            20
        );


        this.panel.appendChild(
            this.closeButton
        );

        this.panel.appendChild(
            english
        );

        this.panel.appendChild(
            divider
        );

        this.panel.appendChild(
            persian
        );

        this.panel.appendChild(
            flames
        );


        this.overlay.appendChild(
            this.panel
        );


        document.body.appendChild(
            this.overlay
        );

    },


    /*==================================================
    EVENTS
    ==================================================*/

    bindEvents(){

        this.signature.addEventListener(
            "mouseenter",
            () => {

                this.hovered = true;

                this.container.classList.add(
                    "milad-hovered"
                );

                this.startParticles();

                this.createParticleBurst(
                    10
                );

            }
        );


        this.signature.addEventListener(
            "mouseleave",
            () => {

                this.hovered = false;

                this.container.classList.remove(
                    "milad-hovered"
                );

                this.stopParticles();

            }
        );


        this.signature.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.open();

            }
        );


        this.closeButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.close();

            }
        );


        this.panel.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );


        this.overlay.addEventListener(
            "click",
            event => {

                if(event.target === this.overlay){
                    this.close();
                }

            }
        );


        window.addEventListener(
            "keydown",
            event => {

                if(
                    event.key === "Escape" &&
                    this.opened
                ){
                    this.close();
                }

            }
        );

    },


    /*==================================================
    OPEN / CLOSE
    ==================================================*/

    open(){

        if(
            this.opened ||
            !this.overlay
        ){
            return;
        }


        this.opened = true;


        this.overlay.classList.add(
            "milad-panel-opened"
        );


        document.body.style.overflow =
            "hidden";

    },


    close(){

        if(
            !this.opened ||
            !this.overlay
        ){
            return;
        }


        this.opened = false;


        this.overlay.classList.remove(
            "milad-panel-opened"
        );


        document.body.style.overflow =
            "";

    },


    /*==================================================
    SIGNATURE PARTICLES
    ==================================================*/

    startParticles(){

        this.stopParticles();


        this.particleTimer =
            window.setInterval(
                () => {

                    if(!this.hovered){
                        return;
                    }


                    this.createParticle();


                    if(Math.random() > .55){
                        this.createParticle();
                    }

                },
                95
            );

    },


    stopParticles(){

        if(this.particleTimer){

            window.clearInterval(
                this.particleTimer
            );

            this.particleTimer = null;

        }

    },


    createParticleBurst(count){

        for(
            let index = 0;
            index < count;
            index += 1
        ){

            window.setTimeout(
                () => {

                    this.createParticle();

                },
                index * 32
            );

        }

    },


    createParticle(){

        if(!this.particleLayer){
            return;
        }


        if(this.particles.length > 30){
            return;
        }


        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "milad-signature-particle";


        const left =
            12 +
            Math.random() *
            76;


        const top =
            35 +
            Math.random() *
            48;


        const x =
            -28 +
            Math.random() *
            56;


        const y =
            -35 -
            Math.random() *
            52;


        const size =
            3 +
            Math.random() *
            6;


        const duration =
            .75 +
            Math.random() *
            .8;


        particle.style.setProperty(
            "--milad-fire-left",
            left + "%"
        );


        particle.style.setProperty(
            "--milad-fire-top",
            top + "%"
        );


        particle.style.setProperty(
            "--milad-fire-x",
            x + "px"
        );


        particle.style.setProperty(
            "--milad-fire-y",
            y + "px"
        );


        particle.style.setProperty(
            "--milad-fire-size",
            size + "px"
        );


        particle.style.setProperty(
            "--milad-fire-duration",
            duration + "s"
        );


        this.particleLayer.appendChild(
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
            1800
        );

    },


    /*==================================================
    PANEL FLAMES
    ==================================================*/

    createPanelFlames(
        container,
        count
    ){

        for(
            let index = 0;
            index < count;
            index += 1
        ){

            const flame =
                document.createElement(
                    "span"
                );


            flame.className =
                "milad-signature-flame";


            const left =
                (
                    index /
                    Math.max(
                        1,
                        count - 1
                    )
                ) *
                100;


            const size =
                18 +
                Math.random() *
                28;


            const duration =
                1.5 +
                Math.random() *
                1.5;


            const delay =
                -Math.random() *
                2.5;


            flame.style.left =
                left + "%";


            flame.style.setProperty(
                "--milad-panel-fire-size",
                size + "px"
            );


            flame.style.setProperty(
                "--milad-panel-fire-duration",
                duration + "s"
            );


            flame.style.setProperty(
                "--milad-panel-fire-delay",
                delay + "s"
            );


            container.appendChild(
                flame
            );

        }

    },


    /*==================================================
    DESTROY
    ==================================================*/

    destroy(){

        this.stopParticles();


        for(const particle of this.particles){

            if(particle){
                particle.remove();
            }

        }


        this.particles = [];


        if(this.overlay){
            this.overlay.remove();
        }


        if(this.container){
            this.container.innerHTML = "";
        }


        const style =
            document.getElementById(
                "miladSignatureStyles"
            );


        if(style){
            style.remove();
        }


        this.initialized = false;
        this.opened = false;
        this.hovered = false;

        this.container = null;
        this.signature = null;
        this.particleLayer = null;

        this.overlay = null;
        this.panel = null;
        this.closeButton = null;

    }

};


window.MiladSignature =
    MiladSignature;