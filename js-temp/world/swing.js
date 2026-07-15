/*==================================================
BANIN UNIVERSE
SWING + GIRL ARTWORK OBJECT
Temporary Artwork Version
==================================================*/

"use strict";

const Swing = {

    element: null,
    parts: {},

    initialized: false,
    hovered: false,

    imagePath: "assets/world/girl-swing.webp",

    create(){

        console.log("🪢 Swing.create() artwork version called");

        this.element = document.getElementById("swingContainer");

        if(!this.element){

            console.warn("❌ swingContainer not found");
            return;

        }

        this.injectStyles();
        this.setup();
        this.build();
        this.bindEvents();
        this.resize();

        this.initialized = true;

        console.log("✅ Girl + Swing artwork created");

    },

    getWorldConfig(){

        return (
            window.WorldConfig ||
            (
                typeof WorldConfig !== "undefined"
                    ? WorldConfig
                    : {}
            )
        );

    },

    injectStyles(){

        const oldStyle = document.getElementById("girlSwingArtworkStyles");
        if(oldStyle) oldStyle.remove();

        const style = document.createElement("style");
        style.id = "girlSwingArtworkStyles";

        style.textContent = `
            @keyframes girlSwingArtworkGlowPulse{
                0%,100%{
                    opacity:.22;
                    transform:translate(-50%,-50%) scale(.94);
                }

                50%{
                    opacity:.42;
                    transform:translate(-50%,-50%) scale(1.06);
                }
            }

            @keyframes girlSwingArtworkFirefly{
                0%{
                    opacity:0;
                    transform:translate(0, 10px) scale(.45);
                }

                20%{
                    opacity:1;
                }

                55%{
                    opacity:.95;
                    transform:translate(10px, -16px) scale(1);
                }

                100%{
                    opacity:0;
                    transform:translate(-8px, -38px) scale(.62);
                }
            }

            @keyframes girlSwingArtworkButterfly{
                0%{
                    opacity:0;
                    transform:translate(0, 12px) rotate(-10deg) scale(.45);
                }

                18%{
                    opacity:1;
                }

                50%{
                    opacity:1;
                    transform:translate(18px, -12px) rotate(8deg) scale(.9);
                }

                82%{
                    opacity:.85;
                    transform:translate(-12px, -30px) rotate(-6deg) scale(1);
                }

                100%{
                    opacity:0;
                    transform:translate(8px, -46px) rotate(12deg) scale(.55);
                }
            }

            @keyframes girlSwingArtworkWing{
                0%,100%{
                    transform:scaleX(.72);
                }

                50%{
                    transform:scaleX(1.08);
                }
            }

            .girl-swing-artwork-shadow{
                position:absolute;
                left:50%;
                bottom:2%;
                width:54%;
                height:6%;
                transform:translateX(-50%);
                border-radius:50%;
                background:radial-gradient(circle, rgba(0,0,0,.46), transparent 72%);
                filter:blur(8px);
                opacity:.42;
                pointer-events:none;
                z-index:1;
            }

            .girl-swing-artwork-aura{
                position:absolute;
                left:50%;
                top:61%;
                width:82%;
                height:54%;
                transform:translate(-50%,-50%);
                border-radius:50%;
                background:
                    radial-gradient(circle,
                        rgba(255,196,130,.24),
                        rgba(226,100,255,.13) 36%,
                        rgba(95,95,255,.06) 58%,
                        transparent 74%
                    );
                filter:blur(18px);
                opacity:.28;
                pointer-events:none;
                z-index:2;
                animation:girlSwingArtworkGlowPulse 4.8s ease-in-out infinite;
            }

            .girl-swing-artwork-hover-glow{
                position:absolute;
                left:50%;
                top:61%;
                width:88%;
                height:58%;
                transform:translate(-50%,-50%);
                border-radius:50%;
                background:
                    radial-gradient(circle,
                        rgba(255,222,160,.38),
                        rgba(255,120,224,.20) 34%,
                        rgba(145,92,255,.08) 58%,
                        transparent 76%
                    );
                filter:blur(18px);
                opacity:0;
                pointer-events:none;
                z-index:3;
                transition:opacity .34s ease, filter .34s ease;
            }

            .girl-swing-artwork-img{
                position:absolute;
                left:50%;
                top:50%;
                width:100%;
                height:100%;
                object-fit:contain;
                transform:translate(-50%,-50%);
                pointer-events:none;
                user-select:none;
                -webkit-user-drag:none;
                z-index:10;
                filter:
                    drop-shadow(0 16px 18px rgba(0,0,0,.36))
                    drop-shadow(0 0 12px rgba(255,135,220,.16));
                transition:
                    filter .32s ease,
                    transform .32s ease;
            }

.girl-swing-artwork-hitbox{
    position:absolute;

    left:31%;
    top:37%;

    width:38%;
    height:43%;

    background:transparent;

    pointer-events:auto;
    cursor:pointer;

    z-index:200;
}

            .girl-swing-artwork-firefly{
                position:absolute;
                width:5px;
                height:5px;
                border-radius:50%;
                background:rgba(255,226,150,.96);
                box-shadow:
                    0 0 7px rgba(255,226,150,.95),
                    0 0 16px rgba(255,171,90,.62),
                    0 0 24px rgba(190,96,255,.32);
                opacity:0;
                pointer-events:none;
                z-index:80;
            }

            .girl-swing-artwork-butterfly{
                position:absolute;
                width:16px;
                height:12px;
                opacity:0;
                pointer-events:none;
                z-index:81;
                filter:
                    drop-shadow(0 0 6px rgba(255,160,235,.52))
                    drop-shadow(0 0 10px rgba(170,110,255,.34));
            }

            .girl-swing-artwork-butterfly::before,
            .girl-swing-artwork-butterfly::after{
                content:"";
                position:absolute;
                top:1px;
                width:8px;
                height:11px;
                border-radius:80% 20% 80% 35%;
                background:
                    radial-gradient(circle at 50% 35%,
                        rgba(255,212,246,.96),
                        rgba(216,98,230,.86) 48%,
                        rgba(120,68,190,.78)
                    );
                animation:girlSwingArtworkWing .42s ease-in-out infinite;
            }

            .girl-swing-artwork-butterfly::before{
                left:0;
                transform-origin:100% 55%;
            }

            .girl-swing-artwork-butterfly::after{
                right:0;
                transform-origin:0% 55%;
                border-radius:20% 80% 35% 80%;
            }

            #swingContainer.is-hovered .girl-swing-artwork-hover-glow{
                opacity:.9;
                filter:blur(20px);
            }

            #swingContainer.is-hovered .girl-swing-artwork-img{
                transform:translate(-50%,-50%) scale(1.018);
                filter:
                    drop-shadow(0 18px 20px rgba(0,0,0,.38))
                    drop-shadow(0 0 16px rgba(255,170,230,.32))
                    drop-shadow(0 0 24px rgba(170,120,255,.20));
            }

            #swingContainer.is-hovered .girl-swing-artwork-firefly{
                animation:girlSwingArtworkFirefly 1.7s ease-in-out infinite;
            }

            #swingContainer.is-hovered .girl-swing-artwork-butterfly{
                animation:girlSwingArtworkButterfly 2.25s ease-in-out infinite;
            }

            @keyframes girlHairWindStrand{
                0%,100%{
                    opacity:.34;
                    transform:
                        rotate(var(--base-rotate))
                        translateX(0px)
                        skewX(0deg);
                }

                38%{
                    opacity:.68;
                    transform:
                        rotate(calc(var(--base-rotate) + var(--wind-rotate)))
                        translateX(9px)
                        skewX(8deg);
                }

                68%{
                    opacity:.48;
                    transform:
                        rotate(calc(var(--base-rotate) + var(--wind-rotate-soft)))
                        translateX(5px)
                        skewX(4deg);
                }
            }

            @keyframes girlHairWindPetal{
                0%{
                    opacity:0;
                    transform:translate(0, 10px) rotate(0deg) scale(.55);
                }

                18%{
                    opacity:.75;
                }

                70%{
                    opacity:.55;
                    transform:translate(18px, -20px) rotate(28deg) scale(.9);
                }

                100%{
                    opacity:0;
                    transform:translate(30px, -36px) rotate(48deg) scale(.45);
                }
            }

            .girl-swing-hair-wind-layer{
                position:absolute;
                left:32%;
                top:30%;
                width:36%;
                height:28%;
                pointer-events:none;
                z-index:95;
                overflow:visible;
            }

            .girl-swing-hair-strand{
                position:absolute;
                width:24px;
                height:62px;
                border-radius:48% 52% 60% 40%;
                background:transparent;
                border-right:2px solid rgba(42,24,48,.72);
                border-bottom:1px solid rgba(150,85,175,.34);
                box-shadow:
                    3px 0 7px rgba(150,80,180,.28);
                filter:blur(.12px);
                opacity:.55;
                transform-origin:50% 6%;
                animation:girlHairWindStrand 3.4s ease-in-out infinite;
            }

            .girl-swing-hair-petal{
                position:absolute;
                width:7px;
                height:5px;
                border-radius:70% 30% 70% 30%;
                background:
                    radial-gradient(circle at 35% 35%,
                        rgba(255,220,245,.95),
                        rgba(230,128,210,.72),
                        rgba(160,80,180,.28)
                    );
                box-shadow:
                    0 0 6px rgba(255,160,230,.34);
                opacity:0;
                pointer-events:none;
                animation:girlHairWindPetal 4.6s ease-in-out infinite;
            }
        `;

        document.head.appendChild(style);

    },

    setup(){

        this.element.innerHTML = "";

        this.element.style.position = "absolute";
        this.element.style.display = "block";
        this.element.style.visibility = "visible";
        this.element.style.opacity = "1";
        this.element.style.overflow = "visible";

        /*
            Container must receive mouse events.
            Visual layers remain pointer-events:none,
            and only the invisible hitbox handles hover.
        */
        /*
The large transparent swing container must not block
Gift or other objects behind it.
Only the dedicated girl hitbox receives mouse events.
*/
this.element.style.pointerEvents = "none";

        this.element.style.transformOrigin = "50% 5%";
        this.element.style.willChange = "transform";
        this.element.style.backfaceVisibility = "hidden";

        const worldConfig = this.getWorldConfig();
        const config = worldConfig.swing || {};

        this.element.style.zIndex = String(config.z || 120);

        this.hovered = false;
        this.element.classList.remove("is-hovered");

    },

    build(){

this.parts = {
    shadow: document.createElement("div"),
    aura: document.createElement("div"),
    hoverGlow: document.createElement("div"),
    image: document.createElement("img"),
    hairWindLayer: document.createElement("div"),
    hitbox: document.createElement("div"),
    fireflies: [],
    butterflies: [],
    hairStrands: [],
    hairPetals: []
};

        this.parts.shadow.className = "girl-swing-artwork-shadow";
        this.parts.aura.className = "girl-swing-artwork-aura";
        this.parts.hoverGlow.className = "girl-swing-artwork-hover-glow";

        this.parts.image.className = "girl-swing-artwork-img";
        this.parts.image.src = this.imagePath;
        this.parts.image.alt = "Girl sitting on a swing";
        this.parts.image.draggable = false;

        this.parts.image.onerror = () => {
            console.warn("❌ Girl swing artwork not found:", this.imagePath);
        };

        this.parts.hitbox.className = "girl-swing-artwork-hitbox";
        this.parts.hairWindLayer.className = "girl-swing-hair-wind-layer";

        this.element.appendChild(this.parts.shadow);
        this.element.appendChild(this.parts.aura);
        this.element.appendChild(this.parts.hoverGlow);
        this.element.appendChild(this.parts.image);
        this.element.appendChild(this.parts.hairWindLayer);

this.createFireflies();
this.createButterflies();
this.createHairWind();

this.element.appendChild(this.parts.hitbox);

    },

    createFireflies(){

        const delays = [
            0.00,
            0.18,
            0.36,
            0.54,
            0.72,
            0.90,
            1.08,
            1.26,
            1.44,
            1.62,
            1.80,
            1.98
        ];

        delays.forEach(delay => {

            const firefly = document.createElement("span");

            firefly.className = "girl-swing-artwork-firefly";
            firefly.style.animationDelay = delay + "s";

            this.parts.fireflies.push(firefly);
            this.element.appendChild(firefly);

        });

    },

    createButterflies(){

        const delays = [
            0.00,
            0.42,
            0.84
        ];

        delays.forEach(delay => {

            const butterfly = document.createElement("span");

            butterfly.className = "girl-swing-artwork-butterfly";
            butterfly.style.animationDelay = delay + "s";

            this.parts.butterflies.push(butterfly);
            this.element.appendChild(butterfly);

        });

    },

    createHairWind(){

        if(!this.parts.hairWindLayer) return;

        /*
            Curved hair wisps:
            These are not glowing lines.
            They should feel like dark hair strands moving softly in the wind.
        */
        const strands = [
            { x: 22, y: 8,  h: 54, base: -20, wind: 8, delay: 0.0 },
            { x: 30, y: 14, h: 66, base: -14, wind: 7, delay: 0.35 },
            { x: 40, y: 18, h: 74, base: -8,  wind: 6, delay: 0.70 },
            { x: 52, y: 16, h: 72, base: 4,   wind: 7, delay: 1.05 },
            { x: 62, y: 12, h: 62, base: 10,  wind: 8, delay: 1.40 },
            { x: 36, y: 36, h: 58, base: -10, wind: 6, delay: 1.75 },
            { x: 50, y: 38, h: 56, base: 2,   wind: 6, delay: 2.10 },
            { x: 66, y: 28, h: 48, base: 14,  wind: 7, delay: 2.45 }
        ];

        strands.forEach(item => {

            const strand = document.createElement("span");

            strand.className = "girl-swing-hair-strand";

            strand.style.left = item.x + "%";
            strand.style.top = item.y + "%";
            strand.style.height = item.h + "px";
            strand.style.animationDelay = item.delay + "s";

            strand.style.setProperty(
                "--base-rotate",
                item.base + "deg"
            );

            strand.style.setProperty(
                "--wind-rotate",
                item.wind + "deg"
            );

            strand.style.setProperty(
                "--wind-rotate-soft",
                Math.round(item.wind * 0.55) + "deg"
            );

            this.parts.hairStrands.push(strand);
            this.parts.hairWindLayer.appendChild(strand);

        });

        /*
            Very subtle petals near hair.
            Not too many, because fireflies already exist.
        */
        const petals = [
            { x: 10, y: 72, delay: 0.0 },
            { x: 82, y: 64, delay: 2.2 }
        ];

        petals.forEach(item => {

            const petal = document.createElement("span");

            petal.className = "girl-swing-hair-petal";

            petal.style.left = item.x + "%";
            petal.style.top = item.y + "%";
            petal.style.animationDelay = item.delay + "s";

            this.parts.hairPetals.push(petal);
            this.parts.hairWindLayer.appendChild(petal);

        });

    },

    bindEvents(){

        if(!this.parts.hitbox) return;

        this.parts.hitbox.addEventListener("mouseenter", () => {

            this.hovered = true;
            this.element.classList.add("is-hovered");

        });

        this.parts.hitbox.addEventListener("mouseleave", () => {

            this.hovered = false;
            this.element.classList.remove("is-hovered");

        });

    },

    resize(){

        if(!this.element) return;

        if(typeof Tree === "undefined" || !Tree.getAnchor || !Tree.element){
            return;
        }

        const anchor = Tree.getAnchor("swing");

        if(!anchor) return;

        const worldLayer = document.getElementById("worldLayer");

        if(!worldLayer) return;

        const treeRect = Tree.element.getBoundingClientRect();
        const worldRect = worldLayer.getBoundingClientRect();

        const worldConfig = this.getWorldConfig();
        const config = worldConfig.swing || {};

        const width = config.artworkWidth || config.width || 310;
        const height = config.artworkHeight || config.height || 465;

        const offsetX = config.offsetX || 0;
        const offsetY = config.offsetY || 0;

        const anchorX =
            treeRect.left +
            (anchor.x / 100) * treeRect.width -
            worldRect.left;

        const anchorY =
            treeRect.top +
            (anchor.y / 100) * treeRect.height -
            worldRect.top;

        this.element.style.left =
            (anchorX - width / 2 + offsetX) + "px";

        this.element.style.top =
            (anchorY + offsetY) + "px";

        this.element.style.width = width + "px";
        this.element.style.height = height + "px";

        this.element.style.zIndex = String(config.z || 120);

        this.layoutEffects();

    },

    layoutEffects(){

        if(!this.element) return;

        const width = this.element.offsetWidth;
        const height = this.element.offsetHeight;

        if(this.parts.hairWindLayer){

            this.parts.hairWindLayer.style.left = "28%";
            this.parts.hairWindLayer.style.top = "40%";
            this.parts.hairWindLayer.style.width = "36%";
            this.parts.hairWindLayer.style.height = "28%";

        }

        const fireflyPositions = [
            { x: 20, y: 48 },
            { x: 80, y: 47 },
            { x: 27, y: 60 },
            { x: 73, y: 61 },
            { x: 36, y: 72 },
            { x: 64, y: 73 },
            { x: 18, y: 78 },
            { x: 82, y: 78 },
            { x: 44, y: 42 },
            { x: 56, y: 41 },
            { x: 30, y: 86 },
            { x: 70, y: 86 }
        ];

        this.parts.fireflies.forEach((firefly, index) => {

            const pos =
                fireflyPositions[index % fireflyPositions.length];

            firefly.style.left =
                (width * pos.x / 100) + "px";

            firefly.style.top =
                (height * pos.y / 100) + "px";

        });

        const butterflyPositions = [
            { x: 18, y: 54, scale: .88 },
            { x: 78, y: 56, scale: .78 },
            { x: 52, y: 38, scale: .70 }
        ];

        this.parts.butterflies.forEach((butterfly, index) => {

            const pos =
                butterflyPositions[index % butterflyPositions.length];

            butterfly.style.left =
                (width * pos.x / 100) + "px";

            butterfly.style.top =
                (height * pos.y / 100) + "px";

            butterfly.style.scale =
                String(pos.scale);

        });

    },

    applyTransform(){

        if(!this.element) return;

        const worldConfig = this.getWorldConfig();
        const config = worldConfig.swing || {};
        const motion = config.motion || {};

        const speed = motion.speed ?? 0.55;

        /*
            Real swing feeling:
            no left/right movement.
            The artwork gently moves forward/backward by:
            - slight rotateX
            - tiny vertical movement
            - tiny scale change
        */
        const angle = motion.angle ?? 2.2;
        const vertical = motion.vertical ?? 1.2;
        const scaleAmount = motion.scale ?? 0.018;

        const time =
            (
                typeof Engine !== "undefined" &&
                Number.isFinite(Engine.elapsed)
            )
                ? Engine.elapsed * speed
                : performance.now() / 1000 * speed;

        const wave = Math.sin(time);

        const swingAngle = wave * angle;
        const swingVertical = Math.abs(wave) * vertical;
        const swingScale = 1 + (Math.cos(time) * scaleAmount);

        const baseRotate = config.rotate || 0;

        this.element.style.transform =
            `perspective(1200px) rotateX(${swingAngle}deg) translateY(${swingVertical}px) rotate(${baseRotate}deg) scale(${swingScale})`;

    },

    update(){

        if(!this.initialized || !this.element) return;

        this.applyTransform();

    },

    destroy(){

        if(this.element){
            this.element.innerHTML = "";
            this.element.classList.remove("is-hovered");
        }

        this.element = null;
        this.parts = {};
        this.initialized = false;
        this.hovered = false;

    }

};

window.Swing = Swing;