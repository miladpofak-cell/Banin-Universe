/*==================================================
BANIN UNIVERSE
GIFT OBJECT
ISOMETRIC 2.5D VERSION
==================================================*/

"use strict";

console.log("🎁 gift-object.js isometric v4 loaded");

const GiftObject = {

element: null,
parts: {},
debug: false,
assetLoaded: false,
hovered: false,

sparkles: [],
lastSparkleTime: 0,

initialized: false,

    create(){

        console.log("🎁 GiftObject.create() called");

        this.element = document.getElementById("giftContainer");

        if(!this.element){

            console.warn("❌ giftContainer not found");
            return;

        }

        this.setup();
        this.build();
        this.resize();

        this.initialized = true;

        console.log("✅ Gift object created");

    },

    setup(){

        this.element.innerHTML = "";

        this.element.style.position = "absolute";
        this.element.style.display = "block";
        this.element.style.visibility = "visible";
        this.element.style.opacity = "1";
        this.element.style.overflow = "visible";
        this.element.style.pointerEvents = "auto";
        this.element.style.cursor = "pointer";
        this.element.style.transformOrigin = "50% 75%";
        this.element.style.willChange = "transform";
        this.element.style.zIndex = String(WorldConfig.gifts.z || 112);
        this.assetLoaded = false;
        this.hovered = false;

        this.element.onmouseenter = () => {
            this.hovered = true;
};

        this.element.onmouseleave = () => {
            this.hovered = false;
};

        if(this.debug){

            this.element.style.border = "1px solid rgba(255,120,200,.45)";
            this.element.style.background = "rgba(255,120,200,.035)";
            this.element.style.boxShadow =
                "0 0 14px rgba(255,120,200,.22)";

        }else{

            this.element.style.border = "none";
            this.element.style.background = "transparent";
            this.element.style.boxShadow = "none";

        }

    },

build(){

    this.parts = {

        shadow: document.createElement("div"),
        glow: document.createElement("div"),
        sparkleLayer: document.createElement("div"),

        body: document.createElement("div"),

        boxTop: document.createElement("div"),
        boxFront: document.createElement("div"),
        boxSide: document.createElement("div"),

        lidTop: document.createElement("div"),
        lidFront: document.createElement("div"),
        lidSide: document.createElement("div"),

        frontRibbonV: document.createElement("div"),
        frontRibbonH: document.createElement("div"),
        sideRibbonV: document.createElement("div"),
        topRibbon: document.createElement("div"),
        lidRibbon: document.createElement("div"),

        bowLeft: document.createElement("div"),
        bowRight: document.createElement("div"),
        bowCenter: document.createElement("div"),
        bowTailLeft: document.createElement("div"),
        bowTailRight: document.createElement("div"),

        asset: document.createElement("img")

    };

    this.styleShadow(this.parts.shadow);
    this.styleGlow(this.parts.glow);
    this.styleSparkleLayer(this.parts.sparkleLayer);
    this.styleBody(this.parts.body);

    this.styleBoxTop(this.parts.boxTop);
    this.styleBoxFront(this.parts.boxFront);
    this.styleBoxSide(this.parts.boxSide);

    this.styleLidTop(this.parts.lidTop);
    this.styleLidFront(this.parts.lidFront);
    this.styleLidSide(this.parts.lidSide);

    this.styleFrontRibbonV(this.parts.frontRibbonV);
    this.styleFrontRibbonH(this.parts.frontRibbonH);
    this.styleSideRibbonV(this.parts.sideRibbonV);
    this.styleTopRibbon(this.parts.topRibbon);
    this.styleLidRibbon(this.parts.lidRibbon);

    this.styleBowLeft(this.parts.bowLeft);
    this.styleBowRight(this.parts.bowRight);
    this.styleBowCenter(this.parts.bowCenter);
    this.styleBowTailLeft(this.parts.bowTailLeft);
    this.styleBowTailRight(this.parts.bowTailRight);

    this.styleAsset(this.parts.asset);

    this.parts.boxFront.appendChild(this.parts.frontRibbonV);
    this.parts.boxFront.appendChild(this.parts.frontRibbonH);
    this.parts.boxSide.appendChild(this.parts.sideRibbonV);
    this.parts.boxTop.appendChild(this.parts.topRibbon);
    this.parts.lidTop.appendChild(this.parts.lidRibbon);

    this.parts.body.appendChild(this.parts.boxTop);
    this.parts.body.appendChild(this.parts.boxFront);
    this.parts.body.appendChild(this.parts.boxSide);

    this.parts.body.appendChild(this.parts.lidTop);
    this.parts.body.appendChild(this.parts.lidFront);
    this.parts.body.appendChild(this.parts.lidSide);

    this.parts.body.appendChild(this.parts.bowTailLeft);
    this.parts.body.appendChild(this.parts.bowTailRight);
    this.parts.body.appendChild(this.parts.bowLeft);
    this.parts.body.appendChild(this.parts.bowRight);
    this.parts.body.appendChild(this.parts.bowCenter);

    this.element.appendChild(this.parts.shadow);
    this.element.appendChild(this.parts.glow);
    this.element.appendChild(this.parts.body);
    this.element.appendChild(this.parts.asset);
    this.element.appendChild(this.parts.sparkleLayer);
},

    styleShadow(part){

        part.style.position = "absolute";
        part.style.left = "48%";
        part.style.bottom = "2%";
        part.style.width = "82%";
        part.style.height = "16%";
        part.style.transform = "translateX(-50%)";

        part.style.borderRadius = "50%";
        part.style.background =
            "radial-gradient(circle, rgba(0,0,0,.48), rgba(0,0,0,0) 72%)";

        part.style.zIndex = "1";

    },

    styleGlow(part){

        part.style.position = "absolute";
        part.style.left = "50%";
        part.style.top = "53%";
        part.style.width = "110%";
        part.style.height = "100%";
        part.style.transform = "translate(-50%,-50%)";

        part.style.borderRadius = "50%";
        part.style.background =
            "radial-gradient(circle, rgba(255,130,210,.22), rgba(255,185,110,.12), rgba(255,130,210,0) 72%)";

        part.style.filter = "blur(10px)";
        part.style.opacity = ".72";
        part.style.zIndex = "2";

    },

    styleBody(part){

        part.style.position = "absolute";
        part.style.left = "0";
        part.style.top = "0";
        part.style.width = "100%";
        part.style.height = "100%";

        part.style.transformOrigin = "50% 75%";
        part.style.zIndex = "5";

    },

styleAsset(part){

    part.alt = "Gift";
    part.draggable = false;

    part.style.position = "absolute";
    part.style.left = "50%";
    part.style.top = "50%";
    part.style.width = "100%";
    part.style.height = "100%";
    part.style.transform = "translate(-50%,-50%)";
    part.style.transformOrigin = "50% 75%";

    part.style.objectFit = "contain";
    part.style.pointerEvents = "none";
    part.style.userSelect = "none";

    part.style.opacity = "0";
    part.style.transition =
        "opacity .45s ease, transform .35s ease, filter .35s ease";

    part.style.filter =
        "drop-shadow(0 10px 14px rgba(0,0,0,.42)) drop-shadow(0 0 12px rgba(255,145,210,.28))";

    part.style.zIndex = "30";

    part.onload = () => {

        console.log("✅ assets/world/gift.webp loaded");
        this.setAssetMode(true);

    };

    part.onerror = () => {

        console.warn("⚠️ assets/world/gift.webp not found — CSS Gift fallback active");
        this.setAssetMode(false);

    };

    part.src = "assets/world/gift.webp";

},

styleSparkleLayer(part){

    part.style.position = "absolute";
    part.style.left = "0";
    part.style.top = "0";
    part.style.width = "100%";
    part.style.height = "100%";

    part.style.pointerEvents = "none";
    part.style.overflow = "visible";

    part.style.zIndex = "45";

},

createSparkle(){

    if(!this.parts.sparkleLayer) return;

    const config = WorldConfig.gifts || {};
    const sparkleConfig = config.sparkle || {};

    const maxSparkles = sparkleConfig.max || 18;

    if(this.sparkles.length >= maxSparkles) return;

    const sparkle = document.createElement("div");

    const size =
        3 + Math.random() * 5;

    const startX =
        18 + Math.random() * 70;

    const startY =
        18 + Math.random() * 68;

    const driftX =
        -10 + Math.random() * 20;

    const driftY =
        -18 - Math.random() * 22;

    const life =
        0.85 + Math.random() * 0.55;

    sparkle.textContent =
        Math.random() > 0.45 ? "✦" : "•";

    sparkle.style.position = "absolute";
    sparkle.style.left = startX + "%";
    sparkle.style.top = startY + "%";

    sparkle.style.fontSize = size + "px";
    sparkle.style.lineHeight = "1";
    sparkle.style.color =
        Math.random() > 0.45
            ? "rgba(255,222,130,.95)"
            : "rgba(255,150,230,.95)";

    sparkle.style.textShadow =
        "0 0 6px rgba(255,210,140,.9), 0 0 12px rgba(255,120,220,.45)";

    sparkle.style.opacity = "0";
    sparkle.style.transform =
        "translate(-50%,-50%) scale(.55)";

    sparkle.style.pointerEvents = "none";
    sparkle.style.userSelect = "none";

    this.parts.sparkleLayer.appendChild(sparkle);

    this.sparkles.push({
        element: sparkle,
        age: 0,
        life,
        startX,
        startY,
        driftX,
        driftY,
        spin: -35 + Math.random() * 70
    });

},

updateSparkles(){

    const config = WorldConfig.gifts || {};
    const sparkleConfig = config.sparkle || {};

    if(sparkleConfig.enabled === false) return;

    const time = Engine.elapsed;

    const hoverRate =
        sparkleConfig.hoverRate || 0.075;

    const idleRate =
        sparkleConfig.idleRate || 0.55;

    const rate =
        this.hovered ? hoverRate : idleRate;

    if(time - this.lastSparkleTime > rate){

        this.lastSparkleTime = time;

        if(this.hovered || Math.random() > 0.45){
            this.createSparkle();
        }

    }

    for(let i = this.sparkles.length - 1; i >= 0; i--){

        const sparkle = this.sparkles[i];

        sparkle.age += 1 / 60;

        const progress =
            Math.min(sparkle.age / sparkle.life, 1);

        const ease =
            1 - Math.pow(1 - progress, 3);

        const x =
            sparkle.driftX * ease;

        const y =
            sparkle.driftY * ease;

        const opacity =
            progress < 0.2
                ? progress / 0.2
                : 1 - progress;

        const scale =
            0.55 + ease * 0.75;

        sparkle.element.style.opacity =
            String(Math.max(0, opacity));

        sparkle.element.style.transform =
            `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${sparkle.spin * ease}deg)`;

        if(progress >= 1){

            sparkle.element.remove();
            this.sparkles.splice(i, 1);

        }

    }

},


setAssetMode(enabled){

    this.assetLoaded = enabled;

    if(this.parts.asset){

        this.parts.asset.style.opacity =
            enabled ? "1" : "0";

    }

    if(this.parts.body){

        this.parts.body.style.opacity =
            enabled ? "0" : "1";

        this.parts.body.style.transition =
            "opacity .35s ease, transform .35s ease";

    }

},

    styleBoxFront(part){

        part.style.position = "absolute";
        part.style.left = "18%";
        part.style.top = "49%";
        part.style.width = "54%";
        part.style.height = "34%";

        part.style.borderRadius = "0 0 10px 10px";

        part.style.background =
            "linear-gradient(135deg, rgba(190,72,135,.98), rgba(105,38,105,.98), rgba(155,52,120,.98))";

        part.style.boxShadow =
            "inset 0 0 16px rgba(255,205,235,.18), 0 9px 15px rgba(0,0,0,.45)";

        part.style.border =
            "1px solid rgba(255,205,240,.32)";

        part.style.overflow = "hidden";
        part.style.zIndex = "8";

    },

    styleBoxSide(part){

        part.style.position = "absolute";
        part.style.left = "72%";
        part.style.top = "39%";
        part.style.width = "20%";
        part.style.height = "44%";

        part.style.clipPath =
            "polygon(0 23%, 100% 0, 100% 78%, 0 100%)";

        part.style.background =
            "linear-gradient(135deg, rgba(78,24,82,.98), rgba(135,45,105,.98), rgba(95,28,88,.98))";

        part.style.boxShadow =
            "inset 7px 0 13px rgba(0,0,0,.38), 0 8px 14px rgba(0,0,0,.35)";

        part.style.border =
            "1px solid rgba(255,180,230,.22)";

        part.style.overflow = "hidden";
        part.style.zIndex = "7";

    },

    styleBoxTop(part){

        part.style.position = "absolute";
        part.style.left = "18%";
        part.style.top = "37%";
        part.style.width = "54%";
        part.style.height = "14%";

        part.style.clipPath =
            "polygon(0 100%, 100% 100%, 137% 0, 36% 0)";

        part.style.background =
            "linear-gradient(135deg, rgba(235,105,165,.98), rgba(135,52,125,.98), rgba(95,38,105,.98))";

        part.style.boxShadow =
            "inset 0 0 14px rgba(255,220,245,.22)";

        part.style.border =
            "1px solid rgba(255,210,245,.30)";

        part.style.overflow = "hidden";
        part.style.zIndex = "6";

    },

    styleLidTop(part){

        part.style.position = "absolute";
        part.style.left = "12%";
        part.style.top = "26%";
        part.style.width = "65%";
        part.style.height = "17%";

        part.style.clipPath =
            "polygon(0 100%, 100% 100%, 128% 0, 32% 0)";

        part.style.background =
            "linear-gradient(135deg, rgba(245,118,178,.98), rgba(150,58,135,.98), rgba(255,150,190,.96))";

        part.style.boxShadow =
            "inset 0 0 14px rgba(255,230,250,.24), 0 4px 8px rgba(0,0,0,.25)";

        part.style.border =
            "1px solid rgba(255,220,245,.42)";

        part.style.overflow = "hidden";
        part.style.zIndex = "12";

    },

    styleLidFront(part){

        part.style.position = "absolute";
        part.style.left = "12%";
        part.style.top = "42%";
        part.style.width = "65%";
        part.style.height = "12%";

        part.style.borderRadius = "0 0 9px 9px";

        part.style.background =
            "linear-gradient(135deg, rgba(215,82,150,.98), rgba(118,42,118,.98), rgba(190,70,140,.98))";

        part.style.boxShadow =
            "0 6px 12px rgba(0,0,0,.36), inset 0 0 9px rgba(255,220,245,.20)";

        part.style.border =
            "1px solid rgba(255,210,245,.35)";

        part.style.zIndex = "13";

    },

    styleLidSide(part){

        part.style.position = "absolute";
        part.style.left = "77%";
        part.style.top = "29%";
        part.style.width = "22%";
        part.style.height = "22%";

        part.style.clipPath =
            "polygon(0 31%, 100% 0, 100% 61%, 0 100%)";

        part.style.background =
            "linear-gradient(135deg, rgba(95,28,90,.98), rgba(165,55,120,.98), rgba(105,32,95,.98))";

        part.style.boxShadow =
            "inset 7px 0 12px rgba(0,0,0,.38)";

        part.style.border =
            "1px solid rgba(255,190,230,.24)";

        part.style.zIndex = "11";

    },

    styleFrontRibbonV(part){

        part.style.position = "absolute";
        part.style.left = "43%";
        part.style.top = "0";
        part.style.width = "18%";
        part.style.height = "100%";

        part.style.background =
            "linear-gradient(to bottom, rgba(255,220,130,.98), rgba(255,140,82,.98), rgba(180,72,45,.98))";

        part.style.boxShadow =
            "0 0 9px rgba(255,170,95,.36)";

        part.style.zIndex = "4";

    },

    styleFrontRibbonH(part){

        part.style.position = "absolute";
        part.style.left = "0";
        part.style.top = "39%";
        part.style.width = "100%";
        part.style.height = "20%";

        part.style.background =
            "linear-gradient(to right, rgba(255,220,130,.98), rgba(255,140,82,.98), rgba(180,72,45,.98))";

        part.style.boxShadow =
            "0 0 9px rgba(255,170,95,.36)";

        part.style.zIndex = "5";

    },

    styleSideRibbonV(part){

        part.style.position = "absolute";
        part.style.left = "28%";
        part.style.top = "8%";
        part.style.width = "22%";
        part.style.height = "88%";

        part.style.transform = "skewY(-21deg)";

        part.style.background =
            "linear-gradient(to bottom, rgba(210,105,70,.98), rgba(255,185,105,.98), rgba(155,58,42,.98))";

        part.style.opacity = ".9";
        part.style.zIndex = "3";

    },

    styleTopRibbon(part){

        part.style.position = "absolute";
        part.style.left = "40%";
        part.style.top = "-5%";
        part.style.width = "18%";
        part.style.height = "130%";

        part.style.transform = "skewX(22deg)";

        part.style.background =
            "linear-gradient(to bottom, rgba(255,230,140,.98), rgba(255,145,85,.98))";

        part.style.boxShadow =
            "0 0 8px rgba(255,170,95,.32)";

        part.style.zIndex = "4";

    },

    styleLidRibbon(part){

        part.style.position = "absolute";
        part.style.left = "43%";
        part.style.top = "-8%";
        part.style.width = "16%";
        part.style.height = "135%";

        part.style.transform = "skewX(22deg)";

        part.style.background =
            "linear-gradient(to bottom, rgba(255,235,150,.98), rgba(255,150,90,.98))";

        part.style.boxShadow =
            "0 0 9px rgba(255,180,95,.38)";

        part.style.zIndex = "5";

    },

    styleBowLeft(part){

        part.style.position = "absolute";
        part.style.left = "31%";
        part.style.top = "13%";
        part.style.width = "24%";
        part.style.height = "19%";

        part.style.transform =
            "rotate(-22deg) skewX(-8deg)";

        part.style.borderRadius =
            "75% 28% 75% 28%";

        part.style.background =
            "radial-gradient(circle at 70% 45%, rgba(255,240,165,.98), rgba(255,145,90,.98), rgba(175,58,48,.98))";

        part.style.boxShadow =
            "0 0 13px rgba(255,175,95,.55), inset -4px -4px 8px rgba(120,35,35,.28)";

        part.style.border =
            "1px solid rgba(255,230,170,.45)";

        part.style.zIndex = "18";

    },

    styleBowRight(part){

        part.style.position = "absolute";
        part.style.left = "49%";
        part.style.top = "13%";
        part.style.width = "24%";
        part.style.height = "19%";

        part.style.transform =
            "rotate(22deg) skewX(8deg)";

        part.style.borderRadius =
            "28% 75% 28% 75%";

        part.style.background =
            "radial-gradient(circle at 30% 45%, rgba(255,240,165,.98), rgba(255,145,90,.98), rgba(175,58,48,.98))";

        part.style.boxShadow =
            "0 0 13px rgba(255,175,95,.55), inset 4px -4px 8px rgba(120,35,35,.28)";

        part.style.border =
            "1px solid rgba(255,230,170,.45)";

        part.style.zIndex = "18";

    },

    styleBowCenter(part){

        part.style.position = "absolute";
        part.style.left = "49%";
        part.style.top = "21%";
        part.style.width = "14%";
        part.style.height = "12%";

        part.style.transform =
            "translateX(-50%)";

        part.style.borderRadius = "50%";

        part.style.background =
            "radial-gradient(circle, rgba(255,242,170,.98), rgba(230,105,65,.98), rgba(145,45,35,.98))";

        part.style.boxShadow =
            "0 0 12px rgba(255,190,95,.78), inset 0 0 6px rgba(255,245,190,.35)";

        part.style.border =
            "1px solid rgba(255,230,170,.5)";

        part.style.zIndex = "20";

    },

    styleBowTailLeft(part){

        part.style.position = "absolute";
        part.style.left = "38%";
        part.style.top = "30%";
        part.style.width = "13%";
        part.style.height = "17%";

        part.style.transform =
            "rotate(15deg)";

        part.style.clipPath =
            "polygon(0 0, 100% 0, 78% 100%, 50% 72%, 20% 100%)";

        part.style.background =
            "linear-gradient(135deg, rgba(255,190,105,.98), rgba(205,80,55,.98))";

        part.style.boxShadow =
            "0 0 8px rgba(255,160,95,.38)";

        part.style.zIndex = "15";

    },

    styleBowTailRight(part){

        part.style.position = "absolute";
        part.style.left = "50%";
        part.style.top = "30%";
        part.style.width = "13%";
        part.style.height = "17%";

        part.style.transform =
            "rotate(-15deg)";

        part.style.clipPath =
            "polygon(0 0, 100% 0, 82% 100%, 52% 72%, 22% 100%)";

        part.style.background =
            "linear-gradient(135deg, rgba(205,80,55,.98), rgba(255,190,105,.98))";

        part.style.boxShadow =
            "0 0 8px rgba(255,160,95,.38)";

        part.style.zIndex = "15";

    },

    resize(){

        if(!this.element) return;

        const anchor = Tree.getAnchor("gifts");

        if(!anchor || !Tree.element) return;

        const treeRect = Tree.element.getBoundingClientRect();
        const worldLayer = document.getElementById("worldLayer");

        if(!worldLayer) return;

        const worldRect = worldLayer.getBoundingClientRect();
        const config = WorldConfig.gifts || {};

        const width = config.width || 112;
        const height = config.height || 105;

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

        this.element.style.zIndex = String(config.z || 112);

        this.element.style.transform = "translateY(0px)";

    },

update(){

    if(!this.initialized || !this.element) return;

    const time = Engine.elapsed;
    const config = WorldConfig.gifts || {};

    const floatY =
        Math.sin(time * 1.08 + 3.2) * 1.2;

    const glow =
        0.58 + Math.sin(time * 2.6) * 0.11;

    const rotate =
        config.rotate || 0;

    const hoverLift =
        this.hovered ? -4 : 0;

    const hoverScale =
        this.hovered ? 1.07 : 1;

    this.element.style.transform =
        `translateY(${floatY}px)`;

    if(this.parts.body){

        this.parts.body.style.transform =
            `translateY(${hoverLift}px) scale(${hoverScale}) rotate(${rotate}deg)`;

    }

    if(this.parts.asset){

        this.parts.asset.style.transform =
            `translate(-50%,-50%) translateY(${hoverLift}px) scale(${hoverScale}) rotate(${rotate}deg)`;

        this.parts.asset.style.filter =
            this.hovered
                ? "drop-shadow(0 13px 18px rgba(0,0,0,.48)) drop-shadow(0 0 18px rgba(255,170,225,.42))"
                : "drop-shadow(0 10px 14px rgba(0,0,0,.42)) drop-shadow(0 0 12px rgba(255,145,210,.28))";

    }

    if(this.parts.glow){

        this.parts.glow.style.opacity =
            String(this.hovered ? glow + 0.16 : glow);

    }

    this.updateSparkles();

},
    destroy(){

        if(this.element){
            this.element.innerHTML = "";
        }

        this.element = null;
        this.parts = {};
        this.initialized = false;

    }

};