/*==================================================
BANIN UNIVERSE
TREE ANCHOR SYSTEM
==================================================*/

"use strict";

const Tree = {

    element: null,
    anchors: {},
    debug: false,

    create(){

        console.log("🌳 Tree.create() called");

        this.element = document.getElementById("treeContainer");

        if(!this.element){

            console.warn("❌ treeContainer not found");
            return;

        }

        this.setup();
        this.createAnchors();
        this.resize();

        console.log(
            "✅ Tree anchors created:",
            this.element.querySelectorAll(".treeAnchor").length
        );

    },

    setup(){

        const worldLayer = document.getElementById("worldLayer");

        if(worldLayer){

            worldLayer.style.position = "absolute";
            worldLayer.style.inset = "0";
            worldLayer.style.display = "block";
            worldLayer.style.visibility = "visible";
            worldLayer.style.opacity = "1";
            worldLayer.style.overflow = "visible";
            worldLayer.style.pointerEvents = "none";
            worldLayer.style.zIndex = "80";

        }

        this.element.style.position = "absolute";
        this.element.style.display = "block";
        this.element.style.visibility = "visible";
        this.element.style.opacity = "1";
        this.element.style.overflow = "visible";

        this.element.style.pointerEvents = "none";
        this.element.style.zIndex = String(WorldConfig.tree.z);

        this.element.style.border = "2px solid rgba(255,120,200,.9)";
        this.element.style.background = "rgba(255,120,200,.08)";
        this.element.style.boxShadow =
            "0 0 35px rgba(255,120,200,.55), inset 0 0 25px rgba(255,120,200,.25)";

        if(!this.debug){

        this.element.style.border = "none";
        this.element.style.outline = "none";
        this.element.style.background = "transparent";
        this.element.style.boxShadow = "none";

}

    },

createAnchors(){

    this.element.innerHTML = "";

    this.anchors = {

        swing:  { x: 22, y: 16 },
        lantern:{ x: 85, y: 42 },

        story:  { x: 28, y: 86 },
        diary:  { x: 44, y: 88 },
        gallery:{ x: 55, y: 58 },
        gifts:  { x: 60, y: 90 },
        music:  { x: 72, y: 82 }

    };

    if(!this.debug) return;

    Object.keys(this.anchors).forEach(name => {

        const anchor = this.anchors[name];

        const marker = document.createElement("div");

        marker.className = "treeAnchor";
        marker.dataset.anchor = name;

        marker.style.position = "absolute";
        marker.style.left = anchor.x + "%";
        marker.style.top = anchor.y + "%";
        marker.style.transform = "translate(-50%,-50%)";
        marker.style.pointerEvents = "none";
        marker.style.zIndex = "999";

        const dot = document.createElement("div");

        dot.style.width = "16px";
        dot.style.height = "16px";
        dot.style.borderRadius = "50%";
        dot.style.background = "rgba(255,120,200,.95)";
        dot.style.boxShadow = "0 0 22px rgba(255,120,200,.95)";

        const label = document.createElement("div");

        label.textContent = name;

        label.style.position = "absolute";
        label.style.left = "50%";
        label.style.top = "22px";
        label.style.transform = "translateX(-50%)";

        label.style.padding = "4px 8px";
        label.style.borderRadius = "999px";

        label.style.fontSize = "11px";
        label.style.fontWeight = "700";
        label.style.color = "#fff";
        label.style.whiteSpace = "nowrap";

        label.style.background = "rgba(20,10,40,.78)";
        label.style.border = "1px solid rgba(255,120,200,.55)";
        label.style.boxShadow = "0 0 14px rgba(255,120,200,.35)";

        marker.appendChild(dot);
        marker.appendChild(label);

        this.element.appendChild(marker);

    });

},

      resize(){

               if(!this.element) return;

               const config = WorldConfig.tree;

               this.element.style.left = config.x + "%";
               this.element.style.top = config.y + "%";

               this.element.style.width = config.width + "px";
               this.element.style.height = config.height + "px";

               this.element.style.right = "auto";
               this.element.style.bottom = "auto";

               this.element.style.transform = "translateX(-50%)";

               this.element.style.zIndex = String(config.z);

},

    update(){

        // future tree wind / glow / leaf motion

    },

    getAnchor(name){

        return this.anchors[name] || null;

    },

    destroy(){

        if(this.element){
            this.element.innerHTML = "";
        }

        this.element = null;
        this.anchors = {};

    }

};