/*==================================================
BANIN UNIVERSE
PARTICLES v1.1
Stars + Fireflies + Petals + Shooting Stars
==================================================*/

"use strict";


/*==================================================
PARTICLE SYSTEM
==================================================*/

const Particles = {

    stars: [],
    fireflies: [],
    petals: [],
    meteors: [],

    shootingCanvas: null,
    shootingCtx: null,

    shootingWidth: 0,
    shootingHeight: 0,

    nextMeteorAt: 0,
    resizeHandler: null,

    initialized: false

};


/*==================================================
SETTINGS
==================================================*/

const ParticleSettings = {

    stars: {

        count: 120,
        speed: 0.15

    },

    fireflies: {

        count: 25

    },

    petals: {

        count: 18

    },

    shootingStars: {

        firstDelayMin: 1.5,
        firstDelayMax: 3,

        delayMin: 4.5,
        delayMax: 8.5,

        speedMin: 680,
        speedMax: 980,

        lifeMin: 1.15,
        lifeMax: 1.65,

        lengthMin: 120,
        lengthMax: 210,

        widthMin: 1.7,
        widthMax: 3.1

    }

};


/*==================================================
INIT
==================================================*/

function initializeParticles(){

    if(Particles.initialized){
        return;
    }

    Particles.initialized = true;

    createStars();

    createFireflies();

    createPetals();

    createShootingStarLayer();

    scheduleNextMeteor(true);

}


/*==================================================
STARS
==================================================*/

function createStars(){

    Particles.stars = [];

    for(
        let index = 0;
        index < ParticleSettings.stars.count;
        index += 1
    ){

        Particles.stars.push({

            x:
                Math.random() *
                World.width,

            y:
                Math.random() *
                World.height,

            radius:
                Math.random() *
                1.8 +
                0.2,

            alpha:
                Math.random(),

            speed:
                Math.random() *
                0.3 +
                0.05

        });

    }

}


function drawStars(){

    if(!World.ctx){
        return;
    }

    const ctx =
        World.ctx;

    ctx.clearRect(
        0,
        0,
        World.width,
        World.height
    );

    for(const star of Particles.stars){

        star.y +=
            star.speed;

        if(star.y > World.height){

            star.y = 0;

            star.x =
                Math.random() *
                World.width;

        }

        const glow =
            0.5 +
            Math.sin(
                Engine.elapsed *
                2 +
                star.x
            ) *
            0.5;

        ctx.beginPath();

        ctx.fillStyle =
            `rgba(255,255,255,${glow})`;

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }

}


/*==================================================
FIREFLIES
==================================================*/

function createFireflies(){

    Particles.fireflies = [];

    for(
        let index = 0;
        index < ParticleSettings.fireflies.count;
        index += 1
    ){

        Particles.fireflies.push({

            x:
                Math.random() *
                World.width,

            y:
                Math.random() *
                World.height,

            angle:
                Math.random() *
                Math.PI *
                2,

            speed:
                Math.random() *
                0.4 +
                0.1

        });

    }

}


function updateFireflies(){

    for(const bug of Particles.fireflies){

        bug.angle +=
            0.02;

        bug.x +=
            Math.cos(
                bug.angle
            ) *
            bug.speed;

        bug.y +=
            Math.sin(
                bug.angle
            ) *
            bug.speed;

        if(bug.x < 0){
            bug.x = World.width;
        }

        if(bug.x > World.width){
            bug.x = 0;
        }

        if(bug.y < 0){
            bug.y = World.height;
        }

        if(bug.y > World.height){
            bug.y = 0;
        }

    }

}


/*==================================================
PETALS
==================================================*/

function createPetals(){

    Particles.petals = [];

    for(
        let index = 0;
        index < ParticleSettings.petals.count;
        index += 1
    ){

        Particles.petals.push({

            x:
                Math.random() *
                World.width,

            y:
                Math.random() *
                World.height,

            speed:
                Math.random() *
                0.5 +
                0.2,

            drift:
                Math.random() *
                2 -
                1,

            rotation:
                Math.random() *
                360

        });

    }

}


function updatePetals(){

    for(const petal of Particles.petals){

        petal.y +=
            petal.speed;

        petal.x +=
            petal.drift;

        petal.rotation +=
            0.5;

        if(petal.y > World.height){

            petal.y = -20;

            petal.x =
                Math.random() *
                World.width;

        }

    }

}


/*==================================================
SHOOTING STAR DOM LAYER
==================================================*/

function createShootingStarLayer(){

    const oldCanvas =
        document.getElementById(
            "shootingStarCanvas"
        );

    if(oldCanvas){
        oldCanvas.remove();
    }


    const oldLayer =
        document.getElementById(
            "shootingStarLayer"
        );

    if(oldLayer){
        oldLayer.remove();
    }


    const oldStyles =
        document.getElementById(
            "shootingStarStyles"
        );

    if(oldStyles){
        oldStyles.remove();
    }


    const style =
        document.createElement("style");


    style.id =
        "shootingStarStyles";


    style.textContent = `

        @keyframes baninShootingStarMove{

            0%{
                opacity:0;

                transform:
                    translate3d(
                        0,
                        0,
                        0
                    )
                    rotate(
                        var(
                            --shooting-angle,
                            24deg
                        )
                    )
                    scaleX(.45);
            }

            8%{
                opacity:1;
            }

            88%{
                opacity:1;
            }

            100%{
                opacity:0;

                transform:
                    translate3d(
                        var(
                            --shooting-travel-x,
                            700px
                        ),
                        var(
                            --shooting-travel-y,
                            300px
                        ),
                        0
                    )
                    rotate(
                        var(
                            --shooting-angle,
                            24deg
                        )
                    )
                    scaleX(1);
            }

        }


        #shootingStarLayer{

            position:fixed;

            inset:0;

            width:100vw;
            height:100vh;

            overflow:hidden;

            pointer-events:none;

            background:transparent;

            isolation:isolate;

            z-index:2147482000;
        }


        .banin-shooting-star{

            position:absolute;

            left:
                var(
                    --shooting-start-x,
                    0px
                );

            top:
                var(
                    --shooting-start-y,
                    100px
                );

            width:
                var(
                    --shooting-length,
                    190px
                );

            height:
                var(
                    --shooting-width,
                    2.5px
                );

            border-radius:999px;

            transform-origin:
                100% 50%;

            background:
                linear-gradient(
                    90deg,
                    transparent 0%,
                    rgba(
                        67,
                        102,
                        225,
                        .08
                    ) 23%,
                    rgba(
                        107,
                        169,
                        255,
                        .28
                    ) 48%,
                    rgba(
                        173,
                        219,
                        255,
                        .72
                    ) 74%,
                    rgba(
                        255,
                        239,
                        185,
                        .96
                    ) 92%,
                    rgba(
                        255,
                        255,
                        250,
                        1
                    ) 100%
                );

            filter:
                drop-shadow(
                    0 0 4px
                    rgba(
                        176,
                        220,
                        255,
                        .95
                    )
                )
                drop-shadow(
                    0 0 11px
                    rgba(
                        102,
                        159,
                        255,
                        .75
                    )
                )
                drop-shadow(
                    0 0 22px
                    rgba(
                        56,
                        85,
                        210,
                        .45
                    )
                );

            opacity:0;

            pointer-events:none;

            will-change:
                transform,
                opacity;

            animation:
                baninShootingStarMove
                var(
                    --shooting-duration,
                    1.4s
                )
                cubic-bezier(
                    .15,
                    .58,
                    .28,
                    1
                )
                forwards;
        }


        .banin-shooting-star::before{

            content:"";

            position:absolute;

            right:-4px;
            top:50%;

            width:
                var(
                    --shooting-head-size,
                    10px
                );

            height:
                var(
                    --shooting-head-size,
                    10px
                );

            border-radius:50%;

            transform:
                translateY(-50%);

            background:
                radial-gradient(
                    circle,
                    rgba(
                        255,
                        255,
                        250,
                        1
                    ) 0%,
                    rgba(
                        255,
                        237,
                        180,
                        .98
                    ) 24%,
                    rgba(
                        162,
                        213,
                        255,
                        .73
                    ) 52%,
                    rgba(
                        77,
                        116,
                        230,
                        .18
                    ) 75%,
                    transparent 100%
                );

            box-shadow:
                0 0 7px
                rgba(
                    255,
                    250,
                    218,
                    .98
                ),
                0 0 17px
                rgba(
                    164,
                    211,
                    255,
                    .88
                ),
                0 0 30px
                rgba(
                    67,
                    99,
                    225,
                    .55
                );
        }


        .banin-shooting-star::after{

            content:"✦";

            position:absolute;

            right:-9px;
            top:50%;

            color:
                rgba(
                    255,
                    249,
                    214,
                    .96
                );

            font-family:
                Georgia,
                serif;

            font-size:
                var(
                    --shooting-spark-size,
                    13px
                );

            line-height:1;

            transform:
                translateY(-50%);

            text-shadow:
                0 0 8px
                rgba(
                    255,
                    246,
                    207,
                    .95
                ),
                0 0 17px
                rgba(
                    157,
                    210,
                    255,
                    .85
                );

            opacity:.92;
        }

    `;


    document.head.appendChild(
        style
    );


    const layer =
        document.createElement("div");


    layer.id =
        "shootingStarLayer";


    layer.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.appendChild(
        layer
    );


    Particles.shootingLayer =
        layer;


    Particles.shootingCanvas =
        null;

    Particles.shootingCtx =
        null;


    console.log(
        "✅ Shooting Star DOM layer created"
    );

}


/*==================================================
SHOOTING STAR RESIZE
==================================================*/

function resizeShootingStarCanvas(){

    /*
    DOM overlay automatically follows
    viewport size.
    */

}


/*==================================================
SHOOTING STAR SCHEDULE
==================================================*/

function scheduleNextMeteor(
    isFirstMeteor
){

    const settings =
        ParticleSettings.shootingStars;


    const minimumDelay =
        isFirstMeteor
            ? settings.firstDelayMin
            : settings.delayMin;


    const maximumDelay =
        isFirstMeteor
            ? settings.firstDelayMax
            : settings.delayMax;


    const delay =
        minimumDelay +
        Math.random() *
        (
            maximumDelay -
            minimumDelay
        );


    const currentTime =
        (
            typeof Engine !==
            "undefined"
        )
            ? Engine.elapsed
            : performance.now() /
                1000;


    Particles.nextMeteorAt =
        currentTime +
        delay;

}


/*==================================================
CREATE SHOOTING STAR
==================================================*/

function spawnShootingStar(){

    const layer =
        Particles.shootingLayer ||
        document.getElementById(
            "shootingStarLayer"
        );


    if(!layer){

        console.warn(
            "❌ Shooting Star layer not found"
        );

        return;
    }


    const viewportWidth =
        window.innerWidth;


    const viewportHeight =
        window.innerHeight;


    const star =
        document.createElement(
            "span"
        );


    star.className =
        "banin-shooting-star";


    /*
Starts from the upper-right side
and moves diagonally toward
the lower-left side.
*/

/*
Starts near the upper-left corner
and travels diagonally toward
the lower-right corner.
*/

/*
Starts near the upper-right corner
and travels diagonally toward
the lower-left corner.
*/

const startX =
    randomBetween(
        viewportWidth * 0.70,
        viewportWidth * 0.84
    );


const startY =
    randomBetween(
        -80,
        viewportHeight * 0.06
    );


const travelX =
    -randomBetween(
        viewportWidth * 1.05,
        viewportWidth * 1.25
    );


const travelY =
    randomBetween(
        viewportHeight * 0.72,
        viewportHeight * 0.95
    );


const angle =
    Math.atan2(
        travelY,
        travelX
    ) *
    180 /
    Math.PI;


const duration =
    randomBetween(
        2.8,
        3.5
    );


    const length =
        randomBetween(
            150,
            245
        );


    const lineWidth =
        randomBetween(
            2,
            3.3
        );


    const headSize =
        randomBetween(
            8,
            13
        );


    star.style.setProperty(
        "--shooting-start-x",
        startX + "px"
    );


    star.style.setProperty(
        "--shooting-start-y",
        startY + "px"
    );


    star.style.setProperty(
        "--shooting-travel-x",
        travelX + "px"
    );


    star.style.setProperty(
        "--shooting-travel-y",
        travelY + "px"
    );


    star.style.setProperty(
        "--shooting-angle",
        angle + "deg"
    );


    star.style.setProperty(
        "--shooting-duration",
        duration + "s"
    );


    star.style.setProperty(
        "--shooting-length",
        length + "px"
    );


    star.style.setProperty(
        "--shooting-width",
        lineWidth + "px"
    );


    star.style.setProperty(
        "--shooting-head-size",
        headSize + "px"
    );


    star.style.setProperty(
        "--shooting-spark-size",
        (
            headSize +
            4
        ) +
        "px"
    );


    layer.appendChild(
        star
    );


    Particles.meteors.push(
        star
    );


    console.log(
        "🌠 Shooting Star visible"
    );


    const removeStar =
        () => {

            const meteorIndex =
                Particles.meteors.indexOf(
                    star
                );


            if(meteorIndex !== -1){

                Particles.meteors.splice(
                    meteorIndex,
                    1
                );

            }


            star.remove();

        };


    star.addEventListener(
        "animationend",
        removeStar,
        {
            once:true
        }
    );


    window.setTimeout(
        removeStar,
        2300
    );

}


/*==================================================
UPDATE SHOOTING STARS
==================================================*/

function updateShootingStars(){

    const currentTime =
        (
            typeof Engine !==
            "undefined"
        )
            ? Engine.elapsed
            : performance.now() /
                1000;


    if(
        currentTime >=
        Particles.nextMeteorAt
    ){

        spawnShootingStar();

        scheduleNextMeteor(
            false
        );

    }

}


/*==================================================
DRAW SHOOTING STARS
==================================================*/

function drawShootingStars(){

    /*
    Shooting Stars are animated
    by CSS instead of Canvas.
    */

}


/*==================================================
HELPER
==================================================*/

function randomBetween(
    minimum,
    maximum
){

    return (
        minimum +
        Math.random() *
        (
            maximum -
            minimum
        )
    );

}


/*==================================================
MAIN UPDATE
==================================================*/

function updateParticles(){

    drawStars();

    updateFireflies();

    updatePetals();

    updateShootingStars();

    drawShootingStars();

}


/*==================================================
EXPORT
==================================================*/

window.Particles =
    Particles;