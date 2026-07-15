/*==================================================
BANIN UNIVERSE
STORY BOOK OBJECT
Image Artwork Version + Hanging Rope
==================================================*/

"use strict";

const StoryBookObject = {

    element: null,
    parts: {},
    debug: false,
    initialized: false,
    hovered: false,

    imagePath: "assets/world/story-book.webp",

    create(){

        console.log("📖 StoryBookObject.create() called");

        this.element = document.getElementById("storyBookContainer");

        if(!this.element){

            console.warn("❌ storyBookContainer not found");
            return;

        }

        this.injectStyles();
        this.setup();
        this.build();
        this.bindEvents();
        this.resize();

        this.initialized = true;

        console.log("✅ Story Book image object created");

    },

    injectStyles(){

        if(document.getElementById("storyBookObjectImageStyles")) return;

        const style = document.createElement("style");
        style.id = "storyBookObjectImageStyles";

        style.textContent = `
            @keyframes storyBookObjectSparkleFloat{
                0%{
                    opacity:0;
                    transform:translateY(8px) scale(.4) rotate(0deg);
                }

                20%{
                    opacity:1;
                }

                100%{
                    opacity:0;
                    transform:translateY(-32px) scale(1) rotate(180deg);
                }
            }

            @keyframes storyBookObjectSoftPulse{
                0%,100%{
                    transform:translate(-50%,-50%) scale(.92);
                    opacity:.42;
                }

                50%{
                    transform:translate(-50%,-50%) scale(1.08);
                    opacity:.78;
                }
            }

            .story-book-world-img{
                position:absolute;
                left:50%;
                top:50%;
                width:100%;
                height:100%;
                object-fit:contain;
                transform:translate(-50%,-50%);
                z-index:10;
                pointer-events:none;
                user-select:none;
                -webkit-user-drag:none;
                filter:
                    drop-shadow(0 8px 10px rgba(0,0,0,.42))
                    drop-shadow(0 0 8px rgba(255,130,220,.20));
                transition:
                    filter .28s ease,
                    transform .28s ease;
            }

            .story-book-world-hover-glow{
                position:absolute;
                left:50%;
                top:50%;
                width:112%;
                height:112%;
                transform:translate(-50%,-50%);
                border-radius:28%;
                background:
                    radial-gradient(circle, rgba(255,190,110,.26), rgba(190,70,255,.14) 38%, transparent 70%);
                filter:blur(8px);
                opacity:.35;
                z-index:3;
                pointer-events:none;
                transition:opacity .28s ease, filter .28s ease;
            }

            .story-book-world-aura{
                position:absolute;
                left:50%;
                top:50%;
                width:130%;
                height:130%;
                transform:translate(-50%,-50%);
                border-radius:50%;
                background:
                    radial-gradient(circle, rgba(255,180,90,.16), rgba(175,75,255,.10) 36%, transparent 68%);
                filter:blur(10px);
                opacity:.38;
                z-index:2;
                pointer-events:none;
                animation:storyBookObjectSoftPulse 3.4s ease-in-out infinite;
            }

            .story-book-world-shadow{
                position:absolute;
                left:50%;
                bottom:1%;
                width:70%;
                height:15%;
                transform:translateX(-50%);
                border-radius:50%;
                background:radial-gradient(circle, rgba(0,0,0,.48), transparent 70%);
                filter:blur(4px);
                opacity:.48;
                z-index:1;
                pointer-events:none;
            }

            .story-book-world-sparkle{
                position:absolute;
                width:5px;
                height:5px;
                border-radius:50%;
                background:rgba(255,225,150,.96);
                box-shadow:
                    0 0 7px rgba(255,214,120,.85),
                    0 0 14px rgba(255,120,220,.45);
                opacity:0;
                z-index:14;
                pointer-events:none;
            }

            #storyBookContainer.is-hovered .story-book-world-img{
                transform:translate(-50%,-50%) scale(1.045);
                filter:
                    drop-shadow(0 10px 13px rgba(0,0,0,.46))
                    drop-shadow(0 0 12px rgba(255,190,110,.52))
                    drop-shadow(0 0 22px rgba(200,90,255,.44));
            }

            #storyBookContainer.is-hovered .story-book-world-hover-glow{
                opacity:.88;
                filter:blur(11px);
            }

            #storyBookContainer.is-hovered .story-book-world-sparkle{
                animation:storyBookObjectSparkleFloat 1.45s ease-in-out infinite;
            }

            /*==================================================
            STORY BOOK HANGING ROPE
            ==================================================*/

            .story-book-world-rope{
                position:absolute;
                width:2px;
                height:120px;
                border-radius:999px;
                background:
                    linear-gradient(
                        90deg,
                        rgba(70,42,22,.95),
                        rgba(226,178,105,.95),
                        rgba(80,46,24,.95)
                    );
                box-shadow:
                    0 0 4px rgba(255,196,112,.35),
                    0 0 10px rgba(110,58,255,.16);
                opacity:.82;
                pointer-events:none;
                transform-origin:50% 0%;
                z-index:140;
            }

            .story-book-world-rope::before{
                content:"";
                position:absolute;
                left:50%;
                top:0;
                width:7px;
                height:100%;
                transform:translateX(-50%);
                background:
                    repeating-linear-gradient(
                        180deg,
                        rgba(255,220,150,.22) 0px,
                        rgba(255,220,150,.22) 3px,
                        transparent 3px,
                        transparent 7px
                    );
                border-radius:999px;
                opacity:.7;
            }

            .story-book-world-rope-knot{
                position:absolute;
                width:9px;
                height:9px;
                border-radius:50%;
                background:
                    radial-gradient(circle, rgba(255,220,150,.95), rgba(110,62,30,.95));
                box-shadow:
                    0 0 6px rgba(255,190,110,.45),
                    0 2px 5px rgba(0,0,0,.35);
                pointer-events:none;
                z-index:141;
            }
        `;

        document.head.appendChild(style);

    },

    setup(){

        this.element.innerHTML = "";

        this.element.setAttribute("data-story-book-open", "true");
        

        this.element.style.position = "absolute";
        this.element.style.display = "block";
        this.element.style.visibility = "visible";
        this.element.style.opacity = "1";
        this.element.style.overflow = "visible";

        this.element.style.pointerEvents = "auto";
        this.element.style.cursor = "pointer";

        this.element.style.transformOrigin = "50% 70%";
        this.element.style.willChange = "transform";

        const config =
            (window.WorldConfig && WorldConfig.storyBook) || {};

        this.element.style.zIndex = String(config.z || 145);

        this.element.style.transition = "filter .28s ease";

        if(this.debug){

            this.element.style.border = "1px solid rgba(255,120,200,.6)";
            this.element.style.background = "rgba(255,120,200,.045)";
            this.element.style.boxShadow =
                "0 0 18px rgba(255,120,200,.25)";

        }else{

            this.element.style.border = "none";
            this.element.style.background = "transparent";
            this.element.style.boxShadow = "none";

        }

    },

    build(){

        this.parts = {
            rope: document.createElement("div"),
            ropeTopKnot: document.createElement("span"),
            ropeBottomKnot: document.createElement("span"),
            shadow: document.createElement("div"),
            aura: document.createElement("div"),
            glow: document.createElement("div"),
            image: document.createElement("img"),
            sparkles: []
        };

        this.parts.rope.className = "story-book-world-rope";
        this.parts.ropeTopKnot.className = "story-book-world-rope-knot";
        this.parts.ropeBottomKnot.className = "story-book-world-rope-knot";

        this.parts.shadow.className = "story-book-world-shadow";
        this.parts.aura.className = "story-book-world-aura";
        this.parts.glow.className = "story-book-world-hover-glow";

        this.parts.image.className = "story-book-world-img";
        this.parts.image.src = this.imagePath;
        this.parts.image.alt = "Milad and Banin Our Story";
        this.parts.image.draggable = false;

        this.parts.image.onerror = () => {
            console.warn("❌ Story book artwork not found:", this.imagePath);
        };

        const worldLayer = document.getElementById("worldLayer");

        if(worldLayer){
            worldLayer.appendChild(this.parts.rope);
            worldLayer.appendChild(this.parts.ropeTopKnot);
            worldLayer.appendChild(this.parts.ropeBottomKnot);
        }

        this.element.appendChild(this.parts.shadow);
        this.element.appendChild(this.parts.aura);
        this.element.appendChild(this.parts.glow);
        this.element.appendChild(this.parts.image);

        this.createSparkles();

    },

    createSparkles(){

        const positions = [
            { x: 15, y: 18, delay: 0.00 },
            { x: 82, y: 16, delay: 0.18 },
            { x: 93, y: 42, delay: 0.36 },
            { x: 12, y: 54, delay: 0.54 },
            { x: 74, y: 78, delay: 0.72 },
            { x: 32, y: 86, delay: 0.90 },
            { x: 55, y: 10, delay: 1.08 },
            { x: 5,  y: 35, delay: 1.26 },
            { x: 96, y: 67, delay: 1.44 },
            { x: 45, y: 96, delay: 1.62 }
        ];

        for(const item of positions){

            const sparkle = document.createElement("span");

            sparkle.className = "story-book-world-sparkle";
            sparkle.style.left = item.x + "%";
            sparkle.style.top = item.y + "%";
            sparkle.style.animationDelay = item.delay + "s";

            this.parts.sparkles.push(sparkle);
            this.element.appendChild(sparkle);

        }

    },

    bindEvents(){

        this.element.addEventListener("mouseenter", () => {

            this.hovered = true;
            this.element.classList.add("is-hovered");

        });

        this.element.addEventListener("mouseleave", () => {

            this.hovered = false;
            this.element.classList.remove("is-hovered");

        });

    },

    getLanternElement(){

        return (
            document.getElementById("lanternContainer") ||
            document.getElementById("lanternObject") ||
            document.querySelector("[data-world-object='lantern']") ||
            (
                typeof LanternObject !== "undefined" &&
                LanternObject.element
                    ? LanternObject.element
                    : null
            ) ||
            (
                typeof Lantern !== "undefined" &&
                Lantern.element
                    ? Lantern.element
                    : null
            )
        );

    },

    positionRope(){

        if(!this.element || !this.parts.rope) return;

        const worldLayer = document.getElementById("worldLayer");

        if(!worldLayer) return;

        const worldRect = worldLayer.getBoundingClientRect();
        const bookRect = this.element.getBoundingClientRect();

        const config =
            (window.WorldConfig && WorldConfig.storyBook) || {};

        const lanternElement = this.getLanternElement();

        const bookAttachX =
            bookRect.left +
            bookRect.width * 0.50 -
            worldRect.left +
            (config.ropeBookOffsetX || 0);

        const bookAttachY =
            bookRect.top -
            worldRect.top +
            10 +
            (config.ropeBookOffsetY || 0);

        let lanternAttachX = bookAttachX;

        let lanternAttachY =
            bookAttachY -
            (config.ropeHeight || 135);

        if(lanternElement){

            const lanternRect = lanternElement.getBoundingClientRect();

            lanternAttachX =
                lanternRect.left +
                lanternRect.width * 0.50 -
                worldRect.left +
                (config.ropeLanternOffsetX || 0);

            lanternAttachY =
                lanternRect.top +
                lanternRect.height * 0.92 -
                worldRect.top +
                (config.ropeLanternOffsetY || 0);

        }

        const dx = bookAttachX - lanternAttachX;
        const dy = bookAttachY - lanternAttachY;

        const length = Math.max(
            18,
            Math.sqrt(dx * dx + dy * dy)
        );

        const angle =
            Math.atan2(-dx, dy) * 180 / Math.PI;

        const ropeZ =
            Math.max(1, (config.z || 145) - 1);

        this.parts.rope.style.left =
            (lanternAttachX - 1) + "px";

        this.parts.rope.style.top =
            lanternAttachY + "px";

        this.parts.rope.style.height =
            length + "px";

        this.parts.rope.style.transform =
            `rotate(${angle}deg)`;

        this.parts.rope.style.zIndex =
            String(ropeZ);

        if(this.parts.ropeTopKnot){

            this.parts.ropeTopKnot.style.left =
                (lanternAttachX - 4.5) + "px";

            this.parts.ropeTopKnot.style.top =
                (lanternAttachY - 4.5) + "px";

            this.parts.ropeTopKnot.style.zIndex =
                String(ropeZ + 1);

        }

        if(this.parts.ropeBottomKnot){

            this.parts.ropeBottomKnot.style.left =
                (bookAttachX - 4.5) + "px";

            this.parts.ropeBottomKnot.style.top =
                (bookAttachY - 4.5) + "px";

            this.parts.ropeBottomKnot.style.zIndex =
                String(ropeZ + 1);

        }

    },

    resize(){

        if(!this.element) return;

        if(typeof Tree === "undefined" || !Tree.getAnchor || !Tree.element){
            return;
        }

        const anchor = Tree.getAnchor("story");

        if(!anchor) return;

        const treeRect = Tree.element.getBoundingClientRect();
        const worldLayer = document.getElementById("worldLayer");

        if(!worldLayer) return;

        const worldRect = worldLayer.getBoundingClientRect();

        const config =
            (window.WorldConfig && WorldConfig.storyBook) || {};

        const width = config.width || 105;
        const height = config.height || 92;

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
            (anchorY - height / 2 + offsetY) + "px";

        this.element.style.width = width + "px";
        this.element.style.height = height + "px";

        this.element.style.zIndex = String(config.z || 145);

        this.applyTransform();
        this.positionRope();

    },

    applyTransform(){

        if(!this.element) return;

        const config =
            (window.WorldConfig && WorldConfig.storyBook) || {};

        const baseRotate = config.rotate || 0;

        const time =
            (window.Engine && Number.isFinite(Engine.elapsed))
                ? Engine.elapsed
                : performance.now() / 1000;

        /*
            Since the book is hanging from the lantern,
            it should gently swing left and right,
            not float up and down.
        */
        const swingX =
            Math.sin(time * 0.9) * 7;

        const swingRotate =
            Math.sin(time * 0.9) * 2.2;

        const hoverLift = this.hovered ? -2 : 0;
        const hoverScale = this.hovered ? 1.08 : 1;

        this.element.style.transform =
            `translate(${swingX}px, ${hoverLift}px) rotate(${baseRotate + swingRotate}deg) scale(${hoverScale})`;

    },

    update(){

        if(!this.initialized || !this.element) return;

        this.applyTransform();
        this.positionRope();

        const time =
            (window.Engine && Number.isFinite(Engine.elapsed))
                ? Engine.elapsed
                : performance.now() / 1000;

        const baseGlow =
            0.36 + Math.sin(time * 2.2) * 0.10;

        const hoverGlow =
            this.hovered ? 0.92 : baseGlow;

        if(this.parts.glow){
            this.parts.glow.style.opacity = String(hoverGlow);
        }

        if(this.parts.aura){
            this.parts.aura.style.opacity =
                this.hovered ? ".72" : ".38";
        }

    },

    destroy(){

        const ropeParts = [
            this.parts.rope,
            this.parts.ropeTopKnot,
            this.parts.ropeBottomKnot
        ];

        for(const part of ropeParts){

            if(part && part.parentNode){
                part.parentNode.removeChild(part);
            }

        }

        if(this.element){
            this.element.innerHTML = "";
            this.element.classList.remove("is-hovered");
            this.element.removeAttribute("data-story-book-open");
        }

        this.element = null;
        this.parts = {};
        this.initialized = false;
        this.hovered = false;

    }

};

window.StoryBookObject = StoryBookObject;