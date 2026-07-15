/*==================================================
BANIN UNIVERSE
MUSIC OBJECT
Artwork Note Version
==================================================*/

"use strict";

const MusicObject = {

    element: null,
    parts: {},

    initialized: false,
    hovered: false,

    imagePath: "assets/world/music-object.webp",

    create(){

        console.log("🎵 MusicObject.create() called");

        this.element =
            document.getElementById("musicObjectContainer") ||
            document.getElementById("musicContainer") ||
            document.getElementById("musicBoxContainer");

        if(!this.element){

            console.warn("❌ Music object container not found");
            return;

        }

        this.injectStyles();
        this.setup();
        this.build();
        this.bindEvents();
        this.resize();

        this.initialized = true;

        console.log("✅ Music object created");

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

        const oldStyle = document.getElementById("musicObjectArtworkStyles");
        if(oldStyle) oldStyle.remove();

        const style = document.createElement("style");
        style.id = "musicObjectArtworkStyles";

        style.textContent = `
            @keyframes musicObjectAuraPulse{
                0%,100%{
                    opacity:.30;
                    transform:translate(-50%,-50%) scale(.92);
                }

                50%{
                    opacity:.72;
                    transform:translate(-50%,-50%) scale(1.08);
                }
            }

            @keyframes musicObjectNoteFloat{
                0%{
                    opacity:0;
                    transform:translateY(10px) scale(.45) rotate(-8deg);
                }

                18%{
                    opacity:1;
                }

                62%{
                    opacity:.85;
                    transform:translateY(-26px) translateX(8px) scale(.95) rotate(7deg);
                }

                100%{
                    opacity:0;
                    transform:translateY(-52px) translateX(-8px) scale(.55) rotate(16deg);
                }
            }

            @keyframes musicObjectIdleFloat{
                0%,100%{
                    transform:translate(-50%,-50%) translateY(0px);
                }

                50%{
                    transform:translate(-50%,-50%) translateY(-3px);
                }
            }

            .music-object-shadow{
                position:absolute;
                left:50%;
                bottom:2%;
                width:62%;
                height:12%;
                transform:translateX(-50%);
                border-radius:50%;
                background:radial-gradient(circle, rgba(0,0,0,.46), transparent 72%);
                filter:blur(7px);
                opacity:.44;
                pointer-events:none;
                z-index:1;
            }

            .music-object-aura{
                position:absolute;
                left:50%;
                top:54%;
                width:125%;
                height:125%;
                transform:translate(-50%,-50%);
                border-radius:50%;
                background:
                    radial-gradient(circle,
                        rgba(255,205,120,.30),
                        rgba(212,90,255,.18) 34%,
                        rgba(110,80,255,.08) 58%,
                        transparent 76%
                    );
                filter:blur(13px);
                opacity:.42;
                pointer-events:none;
                z-index:2;
                animation:musicObjectAuraPulse 3.8s ease-in-out infinite;
            }

            .music-object-hover-glow{
                position:absolute;
                left:50%;
                top:54%;
                width:145%;
                height:145%;
                transform:translate(-50%,-50%);
                border-radius:50%;
                background:
                    radial-gradient(circle,
                        rgba(255,230,150,.42),
                        rgba(255,120,235,.26) 34%,
                        rgba(160,100,255,.12) 58%,
                        transparent 78%
                    );
                filter:blur(16px);
                opacity:0;
                pointer-events:none;
                z-index:3;
                transition:opacity .28s ease, filter .28s ease;
            }

            .music-object-img{
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
                    drop-shadow(0 10px 12px rgba(0,0,0,.42))
                    drop-shadow(0 0 10px rgba(255,170,90,.28))
                    drop-shadow(0 0 16px rgba(190,80,255,.20));
                animation:none;
                transition:
                    filter .28s ease,
                    transform .28s ease;
            }

            .music-object-hitbox{
                position:absolute;
                left:20%;
                top:16%;
                width:60%;
                height:70%;
                background:transparent;
                pointer-events:auto;
                cursor:pointer;
                z-index:80;
            }

            .music-object-note{
                position:absolute;
                font-family:Georgia, "Times New Roman", serif;
                font-weight:bold;
                color:rgba(255,220,140,.96);
                text-shadow:
                    0 0 8px rgba(255,210,120,.88),
                    0 0 16px rgba(220,90,255,.42);
                opacity:0;
                pointer-events:none;
                z-index:70;
            }

            #musicObjectContainer.is-hovered .music-object-hover-glow,
            #musicContainer.is-hovered .music-object-hover-glow,
            #musicBoxContainer.is-hovered .music-object-hover-glow{
                opacity:.94;
                filter:blur(18px);
            }

            #musicObjectContainer.is-hovered .music-object-img,
            #musicContainer.is-hovered .music-object-img,
            #musicBoxContainer.is-hovered .music-object-img{
                transform:translate(-50%,-50%) scale(1.07);
                filter:
                    drop-shadow(0 12px 15px rgba(0,0,0,.46))
                    drop-shadow(0 0 14px rgba(255,210,120,.52))
                    drop-shadow(0 0 26px rgba(205,90,255,.46));
            }

            #musicObjectContainer.is-hovered .music-object-note,
            #musicContainer.is-hovered .music-object-note,
            #musicBoxContainer.is-hovered .music-object-note{
                animation:musicObjectNoteFloat 1.85s ease-in-out infinite;
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

        this.element.style.pointerEvents = "none";
        this.element.style.transformOrigin = "50% 70%";
        this.element.style.willChange = "transform";

        const worldConfig = this.getWorldConfig();
        const config = worldConfig.music || {};

        this.element.style.zIndex = String(config.z || 113);

        this.hovered = false;
        this.element.classList.remove("is-hovered");

    },

    build(){

        this.parts = {
            shadow: document.createElement("div"),
            aura: document.createElement("div"),
            hoverGlow: document.createElement("div"),
            image: document.createElement("img"),
            hitbox: document.createElement("div"),
            notes: []
        };

        this.parts.shadow.className = "music-object-shadow";
        this.parts.aura.className = "music-object-aura";
        this.parts.hoverGlow.className = "music-object-hover-glow";

        this.parts.image.className = "music-object-img";
        this.parts.image.src = this.imagePath;
        this.parts.image.alt = "Suzume music object";
        this.parts.image.draggable = false;

        this.parts.image.onerror = () => {
            console.warn("❌ Music object artwork not found:", this.imagePath);
        };

        this.parts.hitbox.className = "music-object-hitbox";

        this.element.appendChild(this.parts.shadow);
        this.element.appendChild(this.parts.aura);
        this.element.appendChild(this.parts.hoverGlow);
        this.element.appendChild(this.parts.image);

        this.createNotes();

        this.element.appendChild(this.parts.hitbox);

    },

    createNotes(){

        const notes = [
            { text: "♪", x: 14, y: 36, size: 22, delay: 0.0 },
            { text: "♫", x: 78, y: 28, size: 25, delay: 0.22 },
            { text: "♪", x: 70, y: 70, size: 18, delay: 0.44 },
            { text: "♬", x: 22, y: 72, size: 21, delay: 0.66 },
            { text: "♪", x: 50, y: 12, size: 19, delay: 0.88 },
            { text: "♫", x: 88, y: 52, size: 20, delay: 1.10 }
        ];

        notes.forEach(item => {

            const note = document.createElement("span");

            note.className = "music-object-note";
            note.textContent = item.text;

            note.style.left = item.x + "%";
            note.style.top = item.y + "%";
            note.style.fontSize = item.size + "px";
            note.style.animationDelay = item.delay + "s";

            this.parts.notes.push(note);
            this.element.appendChild(note);

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

this.parts.hitbox.addEventListener("click", event => {

    event.preventDefault();
    event.stopPropagation();

    if(typeof event.stopImmediatePropagation === "function"){
        event.stopImmediatePropagation();
    }

    console.log("🎵 Music object clicked");

    this.element.classList.add("is-clicked");

    if(
        window.MusicPlayerPanel &&
        typeof MusicPlayerPanel.open === "function"
    ){
        MusicPlayerPanel.open();
    }else{
        console.warn("❌ MusicPlayerPanel is not loaded");
    }

});

    },

    resize(){

        if(!this.element) return;

        if(typeof Tree === "undefined" || !Tree.getAnchor || !Tree.element){
            return;
        }

        const anchor = Tree.getAnchor("music");

        if(!anchor) return;

        const worldLayer = document.getElementById("worldLayer");

        if(!worldLayer) return;

        const treeRect = Tree.element.getBoundingClientRect();
        const worldRect = worldLayer.getBoundingClientRect();

        const worldConfig = this.getWorldConfig();
        const config = worldConfig.music || {};

        const width = config.width || 80;
        const height = config.height || 120;

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

        this.element.style.zIndex = String(config.z || 113);

    },

    applyTransform(){

        if(!this.element) return;

        const worldConfig = this.getWorldConfig();
        const config = worldConfig.music || {};

        const rotate = config.rotate || 0;

        /*
            Music note is resting on the tree branch,
            so it should not float up/down.
            It only gets a tiny magical scale on hover.
        */
        const hoverScale = this.hovered ? 1.035 : 1;

        this.element.style.transform =
            `rotate(${rotate}deg) scale(${hoverScale})`;

    },

    update(){

        if(!this.initialized || !this.element) return;

        this.applyTransform();

    },

    destroy(){

        if(this.element){
            this.element.innerHTML = "";
            this.element.classList.remove("is-hovered", "is-clicked");
        }

        this.element = null;
        this.parts = {};
        this.initialized = false;
        this.hovered = false;

    }

};

window.MusicObject = MusicObject;