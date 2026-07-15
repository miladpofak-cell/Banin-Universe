/*==================================================
BANIN UNIVERSE
WORLD INTERACTIONS
Music popup disabled / MusicPlayerPanel handles music
==================================================*/

"use strict";

const WorldInteractions = {

    initialized: false,

    overlay: null,
    panel: null,
    title: null,
    text: null,
    closeButton: null,

    visual: null,
    textBox: null,
    sparkleLayer: null,

    panelSparkles: [],
    lastPanelSparkleTime: 0,
    sparkleLoopStarted: false,

    activeTheme: null,

    data: {

        gift: {
            title: "🎁 برای بنین",
            text: "این هدیه فقط یه تصویر یا یه صفحه نیست...\nیه تیکه کوچیک از دنیاییه که برای تو ساختم، چون تو قشنگ‌ترین بخش دنیای منی.",
            theme: "gift"
        },



        story: {
            title: "📖 داستان ما",
            text: "یه داستان آروم، از همون جایی که حس من به تو شروع شد..."
        }

        /*
            Music is intentionally removed from this old interaction panel.
            Music is now handled by:
            js/world/music-player-panel.js
        */

    },

    create(){

        if(this.initialized) return;

        console.log("✨ WorldInteractions.create() called");

        this.buildOverlay();
        this.bindObjects();
        this.startSparkleLoop();

        this.initialized = true;

        console.log("✅ World interactions ready");

    },

    buildOverlay(){

        this.overlay = document.createElement("div");
        this.panel = document.createElement("div");
        this.visual = document.createElement("div");
        this.textBox = document.createElement("div");
        this.sparkleLayer = document.createElement("div");
        this.title = document.createElement("div");
        this.text = document.createElement("div");
        this.closeButton = document.createElement("button");

        this.overlay.id = "worldInteractionOverlay";

        this.styleOverlay(this.overlay);
        this.stylePanel(this.panel);
        this.styleVisual(this.visual);
        this.styleTextBox(this.textBox);
        this.styleSparkleLayer(this.sparkleLayer);
        this.styleTitle(this.title);
        this.styleText(this.text);
        this.styleCloseButton(this.closeButton);

        this.closeButton.textContent = "×";
        this.closeButton.type = "button";

        this.textBox.appendChild(this.title);
        this.textBox.appendChild(this.text);

        this.panel.appendChild(this.visual);
        this.panel.appendChild(this.textBox);
        this.panel.appendChild(this.sparkleLayer);
        this.panel.appendChild(this.closeButton);

        this.overlay.appendChild(this.panel);
        document.body.appendChild(this.overlay);

        this.closeButton.addEventListener("click", () => {
            this.close();
        });

        this.overlay.addEventListener("click", event => {

            if(event.target === this.overlay){
                this.close();
            }

        });

        window.addEventListener("keydown", event => {

            if(event.key === "Escape"){
                this.close();
            }

        });

    },

    styleOverlay(part){

        part.style.position = "fixed";
        part.style.left = "0";
        part.style.top = "0";
        part.style.width = "100vw";
        part.style.height = "100vh";

        part.style.display = "flex";
        part.style.alignItems = "center";
        part.style.justifyContent = "center";

        part.style.background =
            "radial-gradient(circle, rgba(30,20,60,.35), rgba(0,0,0,.58))";

        part.style.backdropFilter = "blur(5px)";
        part.style.webkitBackdropFilter = "blur(5px)";

        part.style.opacity = "0";
        part.style.pointerEvents = "none";
        part.style.transition = "opacity .35s ease";

        part.style.zIndex = "999999";

    },

    stylePanel(part){

        part.style.position = "relative";
        part.style.width = "min(520px, 86vw)";
        part.style.minHeight = "220px";
        part.style.padding = "34px 34px 30px";

        part.style.borderRadius = "28px";

        part.style.background =
            "linear-gradient(135deg, rgba(30,22,58,.92), rgba(65,32,95,.9), rgba(24,18,48,.94))";

        part.style.border =
            "1px solid rgba(255,210,245,.28)";

        part.style.boxShadow =
            "0 24px 70px rgba(0,0,0,.55), inset 0 0 24px rgba(255,185,235,.08), 0 0 38px rgba(180,120,255,.18)";

        part.style.transform = "translateY(22px) scale(.96)";
        part.style.transition =
            "transform .38s cubic-bezier(.2,.9,.2,1), opacity .35s ease";

        part.style.opacity = "0";
        part.style.direction = "rtl";
        part.style.textAlign = "center";
        part.style.overflow = "hidden";

    },

    styleVisual(part){

        part.style.position = "relative";
        part.style.display = "none";

        part.style.width = "100%";
        part.style.height = "clamp(380px, 50vh, 450px)";

        part.style.borderRadius = "24px 24px 12px 12px";

        part.style.backgroundImage =
            "url('assets/world/gift-panel-bg.webp')";

        part.style.backgroundSize = "cover";
        part.style.backgroundPosition = "center top";
        part.style.backgroundRepeat = "no-repeat";

        part.style.boxShadow =
            "inset 0 -30px 45px rgba(255,210,235,.18), inset 0 0 35px rgba(255,160,230,.12)";

        part.style.overflow = "hidden";

    },

    styleTextBox(part){

        part.style.position = "relative";
        part.style.display = "block";

        part.style.marginTop = "0";
        part.style.padding = "0";

        part.style.minHeight = "auto";
        part.style.borderRadius = "0";

        part.style.background = "transparent";
        part.style.borderTop = "none";
        part.style.boxShadow = "none";

    },

    styleSparkleLayer(part){

        part.style.position = "absolute";
        part.style.left = "0";
        part.style.top = "0";
        part.style.width = "100%";
        part.style.height = "100%";

        part.style.pointerEvents = "none";
        part.style.overflow = "hidden";

        part.style.zIndex = "20";

    },

    styleTitle(part){

        part.style.fontFamily = "Vazirmatn, sans-serif";
        part.style.fontSize = "26px";
        part.style.fontWeight = "800";
        part.style.color = "rgba(255,230,250,.96)";

        part.style.textShadow =
            "0 0 14px rgba(255,165,235,.55)";

        part.style.marginBottom = "18px";

    },

    styleText(part){

        part.style.fontFamily = "Vazirmatn, sans-serif";
        part.style.fontSize = "17px";
        part.style.lineHeight = "2";
        part.style.fontWeight = "400";
        part.style.color = "rgba(245,230,255,.9)";
        part.style.whiteSpace = "pre-line";

        part.style.textShadow =
            "0 0 10px rgba(120,90,180,.35)";

    },

    styleCloseButton(part){

        part.style.position = "absolute";
        part.style.right = "18px";
        part.style.top = "16px";

        part.style.width = "36px";
        part.style.height = "36px";

        part.style.border = "1px solid rgba(255,210,245,.38)";
        part.style.borderRadius = "50%";

        part.style.background =
            "rgba(255,255,255,.08)";

        part.style.color = "rgba(255,235,250,.95)";
        part.style.fontSize = "24px";
        part.style.lineHeight = "30px";
        part.style.cursor = "pointer";

        part.style.boxShadow =
            "0 0 14px rgba(255,160,230,.22)";

        part.style.zIndex = "50";

    },

bindObjects(){

    this.bindObject("giftContainer", "gift");
    

    /*
        Gallery is handled directly by:
        js/world/gallery-panel.js

        Music is handled directly by:
        js/world/music-player-panel.js
    */

},

    bindObject(id, type){

        const element = document.getElementById(id);

        if(!element){
            console.warn("⚠️ interaction target not found:", id);
            return;
        }

        element.style.pointerEvents = "auto";
        element.style.cursor = "pointer";

        element.addEventListener("click", event => {

            event.stopPropagation();
            this.open(type);

        });

    },

    open(type){

        /*
            Safety guard:
            If anything old still tries to open "music",
            redirect it to the real MusicPlayerPanel instead of this old popup.
        */
        if(type === "music"){

            if(
                window.MusicPlayerPanel &&
                typeof MusicPlayerPanel.open === "function"
            ){
                MusicPlayerPanel.open();
            }else{
                console.warn("❌ MusicPlayerPanel is not loaded");
            }

            return;

        }

        const item = this.data[type];

        if(!item || !this.overlay || !this.panel) return;

        this.clearPanelSparkles();

        this.activeTheme = item.theme || type;

        this.title.textContent = item.title;
        this.text.textContent = item.text;

        this.panel.setAttribute("data-theme", this.activeTheme);

        this.applyTheme(this.activeTheme);

        if(this.activeTheme === "gift"){

            this.prepareGiftTextFade();

        }else{

            this.resetTextFade();

        }

        this.overlay.style.opacity = "1";
        this.overlay.style.pointerEvents = "auto";

        requestAnimationFrame(() => {

            this.panel.style.opacity = "1";
            this.panel.style.transform =
                "translateY(0) scale(1)";

            if(this.activeTheme === "gift"){
                this.playGiftTextFade();
            }

        });

    },

    applyTheme(theme){

        if(theme === "gift"){

            this.panel.style.width =
                "min(880px, 94vw)";

            this.panel.style.minHeight =
                "auto";

            this.panel.style.padding =
                "12px";

            this.panel.style.borderRadius =
                "30px";

            this.panel.style.background =
                "linear-gradient(135deg, rgba(38,20,58,.96), rgba(95,36,88,.92), rgba(25,16,45,.98))";

            this.panel.style.border =
                "1px solid rgba(255,190,230,.38)";

            this.panel.style.boxShadow =
                "0 26px 80px rgba(0,0,0,.62), inset 0 0 28px rgba(255,180,235,.10), 0 0 48px rgba(255,125,220,.28)";

            if(this.visual){
                this.visual.style.display = "block";
            }

            if(this.textBox){

                this.textBox.style.display = "block";
                this.textBox.style.marginTop = "-8px";
                this.textBox.style.padding = "26px 30px 30px";
                this.textBox.style.minHeight = "160px";
                this.textBox.style.borderRadius = "0 0 24px 24px";

                this.textBox.style.background =
                    "linear-gradient(to bottom, rgba(255,222,235,.86), rgba(255,205,230,.78), rgba(60,28,72,.38))";

                this.textBox.style.borderTop =
                    "1px solid rgba(255,225,245,.35)";

                this.textBox.style.boxShadow =
                    "inset 0 0 22px rgba(255,255,255,.12)";

            }

            this.title.style.fontFamily =
                "'BaninDream', 'Vazirmatn', 'Segoe UI', sans-serif";

            this.title.style.fontSize =
                "28px";

            this.title.style.fontWeight =
                "800";

            this.title.style.color =
                "rgba(95,32,75,.96)";

            this.title.style.textShadow =
                "0 0 10px rgba(255,255,255,.65), 0 0 18px rgba(255,145,220,.35)";

            this.title.style.letterSpacing =
                "0";

            this.title.style.wordSpacing =
                "3px";

            this.text.style.fontFamily =
                "'BaninDream', 'Vazirmatn', 'Segoe UI', sans-serif";

            this.text.style.fontSize =
                "18px";

            this.text.style.lineHeight =
                "2.15";

            this.text.style.fontWeight =
                "500";

            this.text.style.whiteSpace =
                "pre-line";

            this.text.style.color =
                "rgba(82,36,70,.92)";

            this.text.style.textShadow =
                "0 0 8px rgba(255,255,255,.55)";

            this.text.style.letterSpacing =
                "0";

            this.text.style.wordSpacing =
                "2px";

            this.text.style.opacity =
                "0.96";

            return;

        }

        this.panel.style.width = "min(520px, 86vw)";
        this.panel.style.minHeight = "220px";
        this.panel.style.padding = "34px 34px 30px";
        this.panel.style.borderRadius = "28px";

        this.panel.style.background =
            "linear-gradient(135deg, rgba(30,22,58,.92), rgba(65,32,95,.9), rgba(24,18,48,.94))";

        this.panel.style.border =
            "1px solid rgba(255,210,245,.28)";

        this.panel.style.boxShadow =
            "0 24px 70px rgba(0,0,0,.55), inset 0 0 24px rgba(255,185,235,.08), 0 0 38px rgba(180,120,255,.18)";

        if(this.visual){
            this.visual.style.display = "none";
        }

        if(this.textBox){

            this.textBox.style.display = "block";
            this.textBox.style.marginTop = "0";
            this.textBox.style.padding = "0";
            this.textBox.style.minHeight = "auto";
            this.textBox.style.borderRadius = "0";
            this.textBox.style.background = "transparent";
            this.textBox.style.borderTop = "none";
            this.textBox.style.boxShadow = "none";

        }

        this.title.style.fontFamily =
            "'Vazirmatn', 'Segoe UI', sans-serif";

        this.title.style.fontSize =
            "26px";

        this.title.style.fontWeight =
            "800";

        this.title.style.color =
            "rgba(255,230,250,.96)";

        this.title.style.textShadow =
            "0 0 14px rgba(255,165,235,.55)";

        this.text.style.fontFamily =
            "'Vazirmatn', 'Segoe UI', sans-serif";

        this.text.style.fontSize =
            "17px";

        this.text.style.lineHeight =
            "2";

        this.text.style.fontWeight =
            "400";

        this.text.style.whiteSpace =
            "pre-line";

        this.text.style.color =
            "rgba(245,230,255,.9)";

        this.text.style.textShadow =
            "0 0 10px rgba(120,90,180,.35)";

    },

    createPanelSparkle(){

        if(!this.sparkleLayer) return;
        if(this.activeTheme !== "gift") return;

        if(this.panelSparkles.length >= 30) return;

        const sparkle = document.createElement("div");

        const size =
            4 + Math.random() * 7;

        const startX =
            8 + Math.random() * 84;

        const startY =
            8 + Math.random() * 78;

        const driftX =
            -18 + Math.random() * 36;

        const driftY =
            -24 - Math.random() * 26;

        const life =
            1.1 + Math.random() * 0.8;

        sparkle.textContent =
            Math.random() > 0.45 ? "✦" : "•";

        sparkle.style.position = "absolute";
        sparkle.style.left = startX + "%";
        sparkle.style.top = startY + "%";

        sparkle.style.fontSize = size + "px";
        sparkle.style.lineHeight = "1";

        sparkle.style.color =
            Math.random() > 0.5
                ? "rgba(255,225,150,.95)"
                : "rgba(255,165,235,.95)";

        sparkle.style.textShadow =
            "0 0 8px rgba(255,220,155,.95), 0 0 16px rgba(255,120,220,.48)";

        sparkle.style.opacity = "0";
        sparkle.style.transform =
            "translate(-50%,-50%) scale(.55)";

        sparkle.style.pointerEvents = "none";
        sparkle.style.userSelect = "none";

        this.sparkleLayer.appendChild(sparkle);

        this.panelSparkles.push({
            element: sparkle,
            age: 0,
            life,
            driftX,
            driftY,
            spin: -40 + Math.random() * 80
        });

    },

    updatePanelSparkles(){

        if(!this.overlay) return;
        if(this.overlay.style.pointerEvents === "none") return;
        if(this.activeTheme !== "gift") return;

        const time = performance.now() / 1000;

        if(time - this.lastPanelSparkleTime > 0.18){

            this.lastPanelSparkleTime = time;
            this.createPanelSparkle();

        }

        for(let i = this.panelSparkles.length - 1; i >= 0; i--){

            const sparkle = this.panelSparkles[i];

            sparkle.age += 1 / 60;

            const progress =
                Math.min(sparkle.age / sparkle.life, 1);

            const ease =
                1 - Math.pow(1 - progress, 3);

            const opacity =
                progress < 0.2
                    ? progress / 0.2
                    : 1 - progress;

            const scale =
                0.55 + ease * 0.75;

            sparkle.element.style.opacity =
                String(Math.max(0, opacity));

            sparkle.element.style.transform =
                `translate(calc(-50% + ${sparkle.driftX * ease}px), calc(-50% + ${sparkle.driftY * ease}px)) scale(${scale}) rotate(${sparkle.spin * ease}deg)`;

            if(progress >= 1){

                sparkle.element.remove();
                this.panelSparkles.splice(i, 1);

            }

        }

    },

    clearPanelSparkles(){

        for(const sparkle of this.panelSparkles){

            if(sparkle.element){
                sparkle.element.remove();
            }

        }

        this.panelSparkles = [];
        this.lastPanelSparkleTime = 0;

    },

    startSparkleLoop(){

        if(this.sparkleLoopStarted) return;

        this.sparkleLoopStarted = true;

        const loop = () => {

            this.updatePanelSparkles();
            requestAnimationFrame(loop);

        };

        loop();

    },

    prepareGiftTextFade(){

        if(!this.title || !this.text) return;

        this.title.style.transition = "none";
        this.text.style.transition = "none";

        this.title.style.opacity = "0";
        this.text.style.opacity = "0";

        this.title.style.transform =
            "translateY(10px)";

        this.text.style.transform =
            "translateY(14px)";

    },

    playGiftTextFade(){

        if(!this.title || !this.text) return;

        requestAnimationFrame(() => {

            this.title.style.transition =
                "opacity 1s ease, transform 1s ease";

            this.text.style.transition =
                "opacity 2.6s ease .35s, transform 1.6s ease .25s";

            this.title.style.opacity = "1";
            this.text.style.opacity = "1";

            this.title.style.transform =
                "translateY(0)";

            this.text.style.transform =
                "translateY(0)";

        });

    },

    resetTextFade(){

        if(!this.title || !this.text) return;

        this.title.style.transition = "none";
        this.text.style.transition = "none";

        this.title.style.opacity = "1";
        this.text.style.opacity = "1";

        this.title.style.transform = "none";
        this.text.style.transform = "none";

    },

    close(){

        if(!this.overlay || !this.panel) return;

        this.panel.style.opacity = "0";
        this.panel.style.transform =
            "translateY(22px) scale(.96)";

        this.overlay.style.opacity = "0";
        this.overlay.style.pointerEvents = "none";

        this.activeTheme = null;
        this.clearPanelSparkles();

    }

};

window.WorldInteractions = WorldInteractions;