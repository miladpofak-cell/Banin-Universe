/*
=========================================
 Banin Universe
 World Configuration
=========================================
*/

const WorldConfig = {

    /*
    =========================================
    Background
    =========================================
    */

    background: {
        width: 100,
        height: 100,
        scale: 1
    },

    /*
    =========================================
    Banin Universe Logo
    =========================================
    */

    baninUniverseLogo: {

        x: 50,
        y: 50,

        width: 1250,
        height: 725,

        z: 10020,

        particle: {
            max: 34,
            minDelay: 0.055,
            maxDelay: 0.11
        }

    },



    /*
    =========================================
    Moon
    =========================================
    */

    moon: {
        x: 8,
        y: 12,
        width: 170,
        height: 170,
        z: 20
    },



    /*
    =========================================
    Tree
    =========================================
    */

    tree: {
        x: 32,
        y: 1,
        width: 540,
        height: 760,
        z: 9999
    },



    /*
    =========================================
    Girl
    =========================================
    */

    girl: {
        offsetX: 0,
        offsetY: -18,

        width: 198,
        height: 274,

        sitPoint: 0.72,

        shoulderY: 0.49,
        leftShoulderX: 0.36,
        rightShoulderX: 0.64,

        leftElbowX: 0.22,
        rightElbowX: 0.78,
        elbowY: 0.70,

        gripY: 0.48,

        leftKneeX: 0.46,
        rightKneeX: 0.54,
        kneeY: 0.76,

        leftAnkleX: 0.42,
        rightAnkleX: 0.58,
        ankleY: 0.92,

        footY: 0.955,

        motion: {
            sway: 0.18,
            speed: 0.75
        },

        z: 140
    },



    /*
    =========================================
    Swing
    =========================================
    */

swing: {
    offsetX: -40,
    offsetY: -191,

    artworkWidth: 450,
    artworkHeight: 1000,

    rotate: 0,

    motion: {
        speed: 0.55,
        angle: 2.2,
        vertical: 1.2,
        scale: 0.018
    },

    z: 120
},



    /*
    =========================================
    Lantern
    =========================================
    */

    lantern: {
        offsetX: 0,
        offsetY: -10,

        width: 145,
        height: 195,

        glowSize: 235,

        z: 126
    },



    /*
    =========================================
    River
    =========================================
    */

    river: {
        x: 50,
        y: 64,

        width: 100,
        height: 240,

        z: 10
    },



    /*
    =========================================
    Story Book
    =========================================
    */

storyBook: {
    offsetX: 305,
    offsetY: -35,

    width: 170,
    height: 250,

    rotate: 0,

    z: 200,

    ropeLanternOffsetY: 10,
    ropeBookOffsetY: 25
},


    /*
    =========================================
    Diary
    =========================================
    */

    diary: {
        offsetX: 130,
        offsetY: 140,

        width: 130,
        height: 200,

        rotate: 0,
        faceYaw: -17,
        facePitch: 18,
        faceTilt: 13,

        z: 111
},



    /*
    =========================================
    Gallery
    =========================================
    */

    gallery: {
        offsetX: 65,
        offsetY: -80,

        width: 110,
        height: 135,

        rotate: 5,
        faceYaw: -30,
        faceTilt: -3,

        z: 113
    },



    /*
    =========================================
    Gifts
    =========================================
    */

    gifts: {
        offsetX: -200,
        offsetY: 160,

        width: 150,
        height: 150,

        rotate: 0,

        sparkle: {
            enabled: true,
            max: 24,
            hoverRate: 0.05,
            idleRate: 0.55
        },

        z: 112
    },



    /*
    =========================================
    Music
    =========================================
    */

    music: {
        offsetX: -50,
        offsetY: -550,

        width: 90,
        height: 170,

        rotate: 8,

        z: 113
    }

};

Object.freeze(WorldConfig);

window.WorldConfig = WorldConfig;