/*==================================================
BANIN UNIVERSE
GALLERY PANEL
Our Little Moments
16+ Photos + Individual Rope Controls
==================================================*/

"use strict";

const GalleryPanel = {

    initialized: false,
    isOpen: false,
    viewerOpen: false,

    overlay: null,
    panel: null,
    stage: null,
    grid: null,
    emptyState: null,

        viewerOverlay: null,
    viewerFrame: null,
    viewerMedia: null,
    viewerCaption: null,
    viewerCounter: null,

    closeButton: null,
    viewerCloseButton: null,
    previousButton: null,
    nextButton: null,

    secretStarButton: null,
    secretOverlay: null,
    secretFrame: null,
    secretMedia: null,
    secretCaption: null,
    secretCloseButton: null,
    secretEffectsLayer: null,

    secretClickCount: 0,
    secretRequiredClicks: 7,
    secretOpen: false,
    secretUnlockPending: false,


    items: [],
    currentIndex: 0,
    lastFocusedElement: null,

    rotations: [
        -4.5, 2.8, -2.2, 4.2,
         3.4, -3.8, 1.8, -2.6,
        -3.2, 4.6, -1.4, 2.1,
         3.8, -4.1, 1.2, -2.9
    ],

    create(){

        if(this.initialized) return;

        console.log("🖼 GalleryPanel.create() called");

this.injectStyles();
this.build();
this.bindEvents();
this.loadGalleryData();
this.renderGallery();

        this.initialized = true;

        console.log("✅ Gallery Panel ready");

    },

    injectStyles(){

        const oldStyle =
            document.getElementById("galleryPanelV3Styles");

        if(oldStyle){
            oldStyle.remove();
        }

        const style = document.createElement("style");
        style.id = "galleryPanelV3Styles";

        style.textContent = `

            @keyframes galleryPanelAppearV3{
                from{
                    opacity:0;
                    transform:translateY(24px) scale(.96);
                }

                to{
                    opacity:1;
                    transform:translateY(0) scale(1);
                }
            }

            @keyframes galleryStarTwinkleV3{
                0%,100%{
                    opacity:.28;
                    transform:scale(.75);
                }

                50%{
                    opacity:1;
                    transform:scale(1.18);
                }
            }

            @keyframes galleryLightPulseV3{
                0%,100%{
                    opacity:.62;
                    filter:brightness(.92);
                }

                50%{
                    opacity:1;
                    filter:brightness(1.28);
                }
            }

@keyframes galleryButterflyFloatV3{

    0%,
    100%{
        transform:
            translate(0,0)
            rotate(-8deg);
    }

    35%{
        transform:
            translate(10px,-9px)
            rotate(5deg);
    }

    70%{
        transform:
            translate(-7px,-16px)
            rotate(-3deg);
    }

}

@keyframes galleryAmbientFireflyV3{

    0%,
    100%{
        opacity:.18;

        transform:
            translate(0,0)
            scale(.65);
    }

    25%{
        opacity:1;

        transform:
            translate(
                var(--gallery-firefly-mid-x),
                var(--gallery-firefly-mid-y)
            )
            scale(1.15);
    }

    55%{
        opacity:.42;

        transform:
            translate(
                var(--gallery-firefly-end-x),
                var(--gallery-firefly-end-y)
            )
            scale(.78);
    }

    80%{
        opacity:.92;

        transform:
            translate(
                var(--gallery-firefly-return-x),
                var(--gallery-firefly-return-y)
            )
            scale(1);
    }

}

            @keyframes galleryPolaroidFloatV3{
                0%,100%{
                    translate:0 0;
                }

                50%{
                    translate:0 -4px;
                }
            }

            @keyframes galleryHeartPulseV3{
                0%,100%{
                    opacity:.58;
                    transform:translate(-50%,-50%) scale(.94);
                }

                50%{
                    opacity:1;
                    transform:translate(-50%,-50%) scale(1.08);
                }
            }

@keyframes galleryTitleDreamV3{

    0%{
        background-position:
            0% 50%;
    }

    50%{
        background-position:
            100% 50%;
    }

    100%{
        background-position:
            0% 50%;
    }

}

@keyframes galleryTitleStarV3{

    0%,
    100%{
        opacity:.42;

        transform:
            translateY(-50%)
            scale(.72)
            rotate(0deg);
    }

    50%{
        opacity:1;

        transform:
            translateY(-50%)
            scale(1.15)
            rotate(90deg);
    }

}

@keyframes gallerySubtitleDreamV3{

    0%,
    100%{

        background-position:
            0% 50%;

        opacity:.86;

        transform:
            translateY(0);

    }

    50%{

        background-position:
            100% 50%;

        opacity:1;

        transform:
            translateY(-1px);

    }

}

            @keyframes gallerySecretStarIdleV3{

    0%,
    100%{
        transform:
            translateX(-50%)
            rotate(-7deg)
            scale(1);

        opacity:.72;
    }

    50%{
        transform:
            translateX(-50%)
            rotate(7deg)
            scale(1.12);

        opacity:1;
    }

}

@keyframes gallerySecretStarTapV3{

    0%{
        transform:
            translateX(-50%)
            scale(1);
    }

    45%{
        transform:
            translateX(-50%)
            scale(1.38)
            rotate(18deg);
    }

    100%{
        transform:
            translateX(-50%)
            scale(1);
    }

}

@keyframes gallerySecretSparkV3{

    0%{
        opacity:1;

        transform:
            translate(-50%,-50%)
            scale(.3);
    }

    100%{
        opacity:0;

        transform:
            translate(
                calc(-50% + var(--spark-x)),
                calc(-50% + var(--spark-y))
            )
            scale(1.25);
    }

}

@keyframes gallerySecretFrameGlowV3{

    0%,
    100%{
        opacity:.40;

        transform:
            scale(.97);
    }

    50%{
        opacity:.92;

        transform:
            scale(1.025);
    }

}

@keyframes gallerySecretFireflyV3{

    0%{
        opacity:0;

        transform:
            translate(-50%,-50%)
            scale(.2);
    }

    18%{
        opacity:1;
    }

    72%{
        opacity:.85;
    }

    100%{
        opacity:0;

        transform:
            translate(
                calc(-50% + var(--secret-dx)),
                calc(-50% + var(--secret-dy))
            )
            scale(.12);
    }

}

@keyframes gallerySecretButterflyV3{

    0%{
        opacity:0;

        transform:
            translate(-50%,-50%)
            rotate(var(--secret-rotation))
            scale(.35);
    }

    20%{
        opacity:1;
    }

    75%{
        opacity:.9;
    }

    100%{
        opacity:0;

        transform:
            translate(
                calc(-50% + var(--secret-dx)),
                calc(-50% + var(--secret-dy))
            )
            rotate(
                calc(
                    var(--secret-rotation) + 35deg
                )
            )
            scale(1.12);
    }

}

#galleryPanelOverlayV2{
                position:fixed;
                inset:0;

                display:flex;
                align-items:center;
                justify-content:center;

                padding:22px;

                background:
                    radial-gradient(
                        circle at 50% 42%,
                        rgba(91,46,145,.30),
                        transparent 48%
                    ),
                    rgba(3,2,12,.72);

                backdrop-filter:blur(9px);
                -webkit-backdrop-filter:blur(9px);

                opacity:0;
                visibility:hidden;
                pointer-events:none;

                transition:
                    opacity .42s ease,
                    visibility .42s ease;

                z-index:999980;
            }

            #galleryPanelOverlayV2.gallery-visible-v2{
                opacity:1;
                visibility:visible;
                pointer-events:auto;
            }

            .gallery-panel-v2{
                position:relative;

                width:min(1180px, calc(100vw - 36px));
                height:min(760px, calc(100vh - 36px));

                overflow:hidden;
                border-radius:34px;
                isolation:isolate;

                background:
                    radial-gradient(
                        circle at 50% 12%,
                        rgba(195,116,255,.15),
                        transparent 34%
                    ),
                    radial-gradient(
                        circle at 84% 72%,
                        rgba(255,139,216,.10),
                        transparent 32%
                    ),
                    linear-gradient(
                        145deg,
                        rgba(29,13,54,.98),
                        rgba(11,7,29,.99) 55%,
                        rgba(40,17,64,.98)
                    );

                border:
                    1px solid rgba(255,218,145,.44);

                box-shadow:
                    0 35px 100px rgba(0,0,0,.72),
                    0 0 48px rgba(171,82,255,.28),
                    0 0 26px rgba(255,200,120,.14),
                    inset 0 0 0 1px rgba(255,255,255,.06),
                    inset 0 0 60px rgba(151,76,255,.08);

                animation:
                    galleryPanelAppearV3
                    .55s
                    cubic-bezier(.2,.9,.2,1)
                    both;
            }

            .gallery-panel-v2::before{
                content:"";

                position:absolute;
                inset:13px;

                border-radius:25px;

                border:
                    1px solid rgba(255,222,155,.15);

                box-shadow:
                    inset 0 0 26px rgba(255,201,125,.04);

                pointer-events:none;
                z-index:20;
            }

            .gallery-panel-v2::after{
                content:"";

                position:absolute;
                inset:0;

                background-image:
                    radial-gradient(
                        circle,
                        rgba(255,245,220,.88) 0 1px,
                        transparent 1.8px
                    );

                background-size:53px 53px;
                background-position:17px 24px;

                opacity:.12;

                pointer-events:none;
                z-index:1;
            }

            .gallery-background-glow-v2{
                position:absolute;

                left:50%;
                top:48%;

                width:78%;
                height:82%;

                transform:translate(-50%,-50%);

                border-radius:50%;

                background:
                    radial-gradient(
                        circle,
                        rgba(126,70,225,.16),
                        rgba(64,29,117,.06) 48%,
                        transparent 72%
                    );

                filter:blur(28px);

                pointer-events:none;
                z-index:0;
            }

            .gallery-header-v2{
                position:relative;

                z-index:30;

                padding:36px 100px 14px;

                text-align:center;

                pointer-events:none;
            }

            .gallery-kicker-v2{
                margin:0 0 4px;

                font-family:
                    "BaninDream",
                    "Cormorant Garamond",
                    Georgia,
                    serif;

                color:
                    rgba(216,181,255,.82);

                font-size:13px;
                font-weight:600;
                font-style:italic;

                letter-spacing:3px;
                text-transform:uppercase;

                text-shadow:
                    0 0 12px rgba(160,91,255,.34);
            }

.gallery-title-v2{

    position:relative;

    display:inline-block;

    margin:0;

    padding:
        0 8px 5px;

    font-family:
        "BaninDream",
        "Cormorant Garamond",
        Georgia,
        serif;

    font-size:
        clamp(35px, 4vw, 56px);

    line-height:1.08;

    font-weight:800;
    font-style:italic;

    letter-spacing:1.8px;

    background:
        linear-gradient(
            105deg,
            rgba(255,226,158,1) 0%,
            rgba(255,250,220,1) 22%,
            rgba(233,184,255,1) 44%,
            rgba(255,218,142,1) 65%,
            rgba(255,247,207,1) 82%,
            rgba(203,145,255,1) 100%
        );

    background-size:
        220% auto;

    background-position:
        0% 50%;

    background-clip:text;
    -webkit-background-clip:text;

    color:transparent;
    -webkit-text-fill-color:transparent;

    text-shadow:none;

filter:
    drop-shadow(
        0 4px 10px rgba(0,0,0,.62)
    )
    drop-shadow(
        0 0 11px rgba(255,213,140,.48)
    )
    drop-shadow(
        0 0 23px rgba(180,92,255,.28)
    );

transform:
    translateZ(0);

backface-visibility:
    hidden;

-webkit-font-smoothing:
    antialiased;

will-change:
    background-position;

animation:
    galleryTitleDreamV3
    11s
    ease-in-out
    infinite;

}

.gallery-title-v2::before,
.gallery-title-v2::after{

    position:absolute;

    top:52%;

    color:
        rgba(255,227,165,.96);

    font-family:
        Georgia,
        serif;

    font-size:18px;
    font-style:normal;

    -webkit-text-fill-color:
        rgba(255,227,165,.96);

    text-shadow:
        0 0 8px rgba(255,221,153,.88),
        0 0 17px rgba(182,95,255,.56);

    animation:
        galleryTitleStarV3
        3.2s
        ease-in-out
        infinite;

    pointer-events:none;

}

.gallery-title-v2::before{

    content:"✦";

    left:-38px;

}

.gallery-title-v2::after{

    content:"✧";

    right:-38px;

    animation-delay:
        1.1s;

}

.gallery-subtitle-v2{

    position:relative;

    display:block;

    width:max-content;
    max-width:
        calc(100% - 110px);

    margin:
        10px auto 0;

    padding:
        3px 22px 7px;

    font-family:
        "BaninDream",
        "Vazirmatn",
        sans-serif;

    font-size:16px;
    line-height:1.9;
    font-weight:500;

    direction:rtl;
    text-align:center;

    letter-spacing:.2px;

    background:
        linear-gradient(
            90deg,
            rgba(221,185,255,.88),
            rgba(255,238,202,.96),
            rgba(239,210,255,.94),
            rgba(255,225,173,.94)
        );

    background-size:
        220% auto;

    background-position:
        0% 50%;

    background-clip:text;
    -webkit-background-clip:text;

    color:transparent;
    -webkit-text-fill-color:transparent;

    filter:
        drop-shadow(
            0 2px 8px rgba(0,0,0,.72)
        )
        drop-shadow(
            0 0 8px rgba(194,116,255,.30)
        )
        drop-shadow(
            0 0 12px rgba(255,205,135,.16)
        );

    animation:
        gallerySubtitleDreamV3
        7s
        ease-in-out
        infinite;

}

.gallery-subtitle-v2::before,
.gallery-subtitle-v2::after{

    content:"";

    position:absolute;

    top:50%;

    width:40px;
    height:1px;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(255,218,151,.72),
            rgba(203,137,255,.56)
        );

    box-shadow:
        0 0 7px rgba(255,205,135,.32);

    pointer-events:none;

}

.gallery-subtitle-v2::before{

    right:100%;

    transform:
        translateY(-50%);

}

.gallery-subtitle-v2::after{

    left:100%;

    transform:
        translateY(-50%)
        scaleX(-1);

}

            .gallery-close-v2{
                position:absolute;

                top:22px;
                right:24px;

                width:44px;
                height:50px;

                border:none;
                outline:none;

                cursor:pointer;

                clip-path:
                    polygon(
                        0 0,
                        100% 0,
                        100% 78%,
                        50% 100%,
                        0 78%
                    );

                background:
                    linear-gradient(
                        145deg,
                        rgba(59,27,86,.98),
                        rgba(16,9,31,.98)
                    );

                color:
                    rgba(255,225,164,.98);

                font-family:
                    "BaninDream",
                    Georgia,
                    serif;

                font-size:27px;
                font-weight:900;
                line-height:42px;

                border:
                    1px solid rgba(255,219,145,.52);

                box-shadow:
                    0 10px 24px rgba(0,0,0,.42),
                    0 0 20px rgba(255,203,126,.16),
                    inset 0 0 18px rgba(160,83,255,.12);

                transition:
                    transform .22s ease,
                    filter .22s ease,
                    box-shadow .22s ease;

                z-index:100;
            }

            .gallery-close-v2:hover{
                transform:
                    translateY(-2px)
                    scale(1.06);

                filter:
                    brightness(1.14);

                box-shadow:
                    0 12px 28px rgba(0,0,0,.46),
                    0 0 28px rgba(255,209,132,.26),
                    0 0 30px rgba(170,85,255,.20);
            }

            .gallery-string-lights-v2{
                position:absolute;

                left:5%;
                right:5%;
                top:164px;

                height:58px;

                z-index:40;

                pointer-events:none;
            }

            .gallery-string-wire-v2{
                position:absolute;

                left:0;
                top:5px;

                width:100%;
                height:33px;

                border-top:
                    2px solid rgba(199,147,90,.68);

                border-radius:50%;

                transform:
                    rotate(-.7deg);

                filter:
                    drop-shadow(
                        0 0 5px rgba(255,190,105,.25)
                    );
            }

            .gallery-string-light-v2{
                position:absolute;

                top:5px;

                width:8px;
                height:12px;

                border-radius:
                    50% 50% 55% 55%;

                background:
                    radial-gradient(
                        circle at 42% 32%,
                        #fff7c9,
                        #ffd884 46%,
                        #d58640 100%
                    );

                box-shadow:
                    0 0 7px rgba(255,219,135,.96),
                    0 0 15px rgba(255,181,84,.62),
                    0 0 24px rgba(255,159,71,.28);

                animation:
                    galleryLightPulseV3
                    2.4s
                    ease-in-out
                    infinite;
            }

            .gallery-string-light-v2::before{
                content:"";

                position:absolute;

                left:50%;
                top:-6px;

                width:3px;
                height:7px;

                transform:
                    translateX(-50%);

                border-radius:999px;

                background:
                    rgba(111,70,43,.92);
            }

            .gallery-memory-stage-v2{
                position:relative;

                z-index:25;

                height:
                    calc(100% - 245px);

                margin:
                    -12px 46px 0;

                padding:
                    66px 22px 110px;

                overflow-y:auto;
                overflow-x:hidden;

                scrollbar-width:thin;

                scrollbar-color:
                    rgba(170,102,255,.66)
                    rgba(24,11,47,.42);
            }

            .gallery-memory-stage-v2::-webkit-scrollbar{
                width:7px;
            }

            .gallery-memory-stage-v2::-webkit-scrollbar-track{
                border-radius:999px;

                background:
                    rgba(24,11,47,.42);
            }

            .gallery-memory-stage-v2::-webkit-scrollbar-thumb{
                border-radius:999px;

                background:
                    linear-gradient(
                        to bottom,
                        rgba(194,126,255,.82),
                        rgba(102,55,185,.82)
                    );

                border:
                    1px solid rgba(255,219,150,.22);
            }

            .gallery-polaroid-grid-v2{
                display:grid;

                grid-template-columns:
                    repeat(4, minmax(0,1fr));

                gap:
                    72px 32px;

                align-items:start;

                padding:
                    18px 18px 48px;
            }

.gallery-polaroid-v2{

    position:relative;

    display:block;

    width:100%;
    min-width:0;

    padding:0;

    border:none;
    outline:none;

    background:transparent;

    cursor:pointer;

    overflow:visible;

    z-index:3;

}

/*
    Longer ropes only for the first row:
    photos 1, 2, 3 and 4.
*/
.gallery-polaroid-v2:nth-child(-n + 4){

    --gallery-rope-length:
        90px !important;

}

/*
    The rope stays fixed.
    Only the Polaroid content moves on hover.
*/
.gallery-polaroid-v2::before{

    content:"";

    position:absolute;

    left:
        var(--gallery-rope-x, 50%);

    top:
        calc(
            0px -
            var(
                --gallery-rope-length,
                58px
            )
        );

    width:1px;

    height:
        calc(
            var(
                --gallery-rope-length,
                58px
            ) + 3px
        );

    transform:
        translateX(-50%)
        rotate(
            var(
                --gallery-rope-angle,
                0deg
            )
        );

    transform-origin:
        50% 100%;

    background:
        linear-gradient(
            to bottom,
            rgba(194,145,89,.92),
            rgba(230,184,112,.72)
        );

    box-shadow:
        0 0 5px
        rgba(255,189,100,.30);

    pointer-events:none;

    z-index:0;

}

.gallery-polaroid-content-v2{

    position:relative;

    z-index:2;

    display:block;

    width:100%;

    padding:
        11px 11px 17px;

    background:
        linear-gradient(
            145deg,
            rgba(255,247,232,.98),
            rgba(224,205,210,.98)
        );

    border-radius:5px;

    box-shadow:
        0 16px 28px rgba(0,0,0,.38),
        0 0 0 1px rgba(255,255,255,.56),
        0 0 18px rgba(170,91,255,.08);

    transform:
        rotate(
            var(--gallery-rotation, 0deg)
        );

    transform-origin:
        50% 10%;

    transition:
        transform .34s
        cubic-bezier(.2,.9,.2,1),
        box-shadow .34s ease,
        filter .34s ease;

    animation:
        galleryPolaroidFloatV3
        var(--gallery-float-duration, 5s)
        ease-in-out
        infinite;

}

/*
    Clip belongs to the photo frame,
    so it moves together with the frame.
*/
.gallery-polaroid-content-v2::after{

    content:"";

    position:absolute;

    left:
        var(--gallery-clip-x, 50%);

    top:-8px;

    width:20px;
    height:13px;

    transform:
        translateX(-50%)
        rotate(
            var(
                --gallery-clip-tilt,
                -2deg
            )
        );

    border-radius:3px;

    background:
        linear-gradient(
            145deg,
            rgba(222,168,92,.98),
            rgba(105,63,35,.98)
        );

    border:
        1px solid rgba(255,219,152,.40);

    box-shadow:
        0 3px 7px rgba(0,0,0,.38),
        0 0 8px rgba(255,190,105,.18);

    pointer-events:none;

    z-index:5;

}

.gallery-polaroid-v2:hover
.gallery-polaroid-content-v2,

.gallery-polaroid-v2:focus-visible
.gallery-polaroid-content-v2{

    transform:
        rotate(0deg)
        translateY(-10px)
        scale(1.075);

    filter:
        brightness(1.045);

    box-shadow:
        0 24px 44px rgba(0,0,0,.48),
        0 0 0 1px rgba(255,245,220,.76),
        0 0 28px rgba(255,201,121,.24),
        0 0 38px rgba(179,92,255,.25);

}

            .gallery-polaroid-image-v2{
                position:relative;

                width:100%;

                aspect-ratio:4 / 3;

                overflow:hidden;

                border-radius:2px;

                background:
                    linear-gradient(
                        145deg,
                        rgba(37,20,66,.98),
                        rgba(82,39,110,.96),
                        rgba(19,13,40,.98)
                    );

                box-shadow:
                    inset 0 0 18px rgba(0,0,0,.38);
            }

            .gallery-polaroid-image-v2 img{
                width:100%;
                height:100%;

                display:block;

                object-fit:cover;

                pointer-events:none;
                user-select:none;
                -webkit-user-drag:none;
            }

            .gallery-placeholder-art-v2{
                position:absolute;
                inset:0;

                overflow:hidden;

                background:
                    radial-gradient(
                        circle at 72% 26%,
                        rgba(255,233,174,.92) 0 5%,
                        rgba(255,211,136,.34) 6%,
                        transparent 21%
                    ),
                    radial-gradient(
                        circle at 40% 75%,
                        rgba(221,115,255,.24),
                        transparent 31%
                    ),
                    linear-gradient(
                        155deg,
                        #15102e,
                        #39205c 53%,
                        #17102c
                    );
            }

            .gallery-placeholder-art-v2::before{
                content:"";

                position:absolute;

                left:12%;
                right:12%;
                bottom:13%;

                height:27%;

                border-radius:
                    60% 60% 15% 15%;

                background:
                    linear-gradient(
                        to top,
                        rgba(19,10,35,.98),
                        rgba(62,26,83,.94)
                    );

                box-shadow:
                    0 -8px 18px rgba(203,105,255,.12);
            }

            .gallery-placeholder-art-v2::after{
                content:"♡";

                position:absolute;

                left:50%;
                top:52%;

                transform:
                    translate(-50%,-50%);

                color:
                    rgba(255,190,229,.92);

                font-family:
                    Georgia,
                    serif;

                font-size:32px;

                text-shadow:
                    0 0 9px rgba(255,145,218,.82),
                    0 0 22px rgba(177,88,255,.54);

                animation:
                    galleryHeartPulseV3
                    3.3s
                    ease-in-out
                    infinite;
            }

            .gallery-placeholder-stars-v2{
                position:absolute;
                inset:0;

                pointer-events:none;
            }

            .gallery-placeholder-stars-v2 span{
                position:absolute;

                color:
                    rgba(255,241,205,.90);

                font-size:10px;

                text-shadow:
                    0 0 8px rgba(255,225,158,.82);

                animation:
                    galleryStarTwinkleV3
                    2.8s
                    ease-in-out
                    infinite;
            }

            .gallery-polaroid-caption-v2{
                display:block;

                min-height:43px;

                padding:
                    11px 5px 0;

                font-family:
                    "BaninDream",
                    "Cormorant Garamond",
                    Georgia,
                    serif;

                color:
                    rgba(72,42,75,.94);

                font-size:14px;
                line-height:1.45;
                font-weight:700;
                font-style:italic;

                text-align:center;

                overflow-wrap:anywhere;
            }

            .gallery-empty-state-v2{
                display:none;

                min-height:390px;

                align-items:center;
                justify-content:center;
                flex-direction:column;

                padding:
                    42px 26px;

                text-align:center;

                border-radius:28px;

                background:
                    radial-gradient(
                        circle at 50% 40%,
                        rgba(157,83,245,.14),
                        transparent 45%
                    ),
                    rgba(14,8,31,.38);

                border:
                    1px dashed rgba(255,216,145,.28);

                box-shadow:
                    inset 0 0 32px rgba(165,90,255,.06);
            }

            .gallery-empty-state-v2.visible{
                display:flex;
            }

            .gallery-empty-icon-v2{
                margin-bottom:20px;

                color:
                    rgba(255,205,231,.94);

                font-family:
                    Georgia,
                    serif;

                font-size:58px;

                text-shadow:
                    0 0 16px rgba(255,136,212,.56),
                    0 0 38px rgba(167,83,255,.38);
            }

            .gallery-empty-title-v2{
                margin:0;

                max-width:520px;

                font-family:
                    "BaninDream",
                    "Cormorant Garamond",
                    Georgia,
                    serif;

                color:
                    rgba(255,229,179,.98);

                font-size:27px;
                line-height:1.5;
                font-style:italic;

                white-space:pre-line;

                text-shadow:
                    0 0 14px rgba(255,205,125,.28);
            }

            .gallery-empty-text-v2{
                margin:
                    14px 0 0;

                max-width:620px;

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    sans-serif;

                color:
                    rgba(235,218,249,.90);

                font-size:16px;
                line-height:2;

                direction:rtl;
            }

            .gallery-footer-v2{
    position:absolute;

    left:70px;
    right:70px;
    bottom:20px;

    z-index:35;

    display:flex;
    align-items:center;
    justify-content:center;

    min-height:38px;

    font-family:
        "BaninDream",
        "Cormorant Garamond",
        Georgia,
        serif;

    color:
        rgba(255,221,165,.84);

    font-size:14px;
    line-height:1.5;
    font-style:italic;

    letter-spacing:.5px;

    text-align:center;

    text-shadow:
        0 0 12px rgba(255,201,120,.22);

    pointer-events:none;
}

.gallery-footer-v2::before,
.gallery-footer-v2::after{
    content:"✦";

    margin:
        0 14px;

    color:
        rgba(211,160,255,.72);

    font-size:11px;

    text-shadow:
        0 0 8px rgba(179,97,255,.46);
}

.gallery-secret-star-v3{
    position:absolute;

    left:50%;
    bottom:61px;

    width:54px;
    height:54px;

    padding:0;

    border:none;
    outline:none;

    background:transparent;

    color:
        rgba(255,225,145,.98);

    font-family:
        Georgia,
        serif;

    font-size:39px;
    line-height:54px;

    text-align:center;

    cursor:pointer;

    text-shadow:
        0 0 7px rgba(255,246,205,.98),
        0 0 var(--secret-glow, 14px)
            rgba(255,201,105,.92),
        0 0 28px rgba(198,105,255,.64),
        0 0 46px rgba(124,67,222,.38);

    filter:
        drop-shadow(
            0 0 8px rgba(255,210,120,.78)
        );

    animation:
        gallerySecretStarIdleV3
        3.4s
        ease-in-out
        infinite;

    transition:
        filter .25s ease,
        text-shadow .25s ease;

    z-index:75;
}

.gallery-secret-star-v3:hover{
    filter:
        brightness(1.2);

    text-shadow:
        0 0 9px rgba(255,252,224,1),
        0 0 25px rgba(255,207,111,.98),
        0 0 40px rgba(205,111,255,.82),
        0 0 58px rgba(128,69,230,.52);
}

.gallery-secret-star-v3.secret-tapped-v3{
    animation:
        gallerySecretStarTapV3
        .42s
        cubic-bezier(.2,.85,.25,1)
        both;
}

.gallery-secret-star-v3.secret-unlocked-v3{
    color:#fff7ca;

    filter:
        brightness(1.6);

    text-shadow:
        0 0 10px rgba(255,255,234,1),
        0 0 30px rgba(255,210,110,1),
        0 0 52px rgba(219,122,255,.98),
        0 0 80px rgba(138,73,245,.78);
}

.gallery-secret-tap-spark-v3{
    position:absolute;

    left:50%;
    top:50%;

    color:
        rgba(255,237,175,.98);

    font-size:11px;

    pointer-events:none;

    text-shadow:
        0 0 8px rgba(255,213,120,.96),
        0 0 16px rgba(202,108,255,.76);

    animation:
        gallerySecretSparkV3
        .72s
        ease-out
        both;
}

.gallery-secret-overlay-v3{
    position:absolute;
    inset:0;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:34px;

    background:
        radial-gradient(
            circle at 50% 46%,
            rgba(132,66,207,.32),
            transparent 46%
        ),
        rgba(3,2,12,.91);

    backdrop-filter:
        blur(10px);

    -webkit-backdrop-filter:
        blur(10px);

    opacity:0;
    visibility:hidden;
    pointer-events:none;

    transition:
        opacity .55s ease,
        visibility .55s ease;

    z-index:260;
}

.gallery-secret-overlay-v3.visible{
    opacity:1;
    visibility:visible;
    pointer-events:auto;
}

.gallery-secret-frame-v3{
    position:relative;

    width:
        min(790px, 88%);

    height:
        min(560px, 82%);

    display:flex;
    flex-direction:column;

    padding:
        17px 17px 61px;

    border-radius:18px;

    background:
        linear-gradient(
            145deg,
            rgba(30,14,49,.99),
            rgba(10,6,24,.99),
            rgba(43,19,66,.99)
        );

    border:
        1px solid rgba(255,221,148,.72);

    box-shadow:
        0 32px 100px rgba(0,0,0,.78),
        0 0 34px rgba(255,207,119,.30),
        0 0 70px rgba(183,86,255,.44),
        inset 0 0 36px rgba(188,96,255,.12);

    opacity:0;

    transform:
        translateY(24px)
        scale(.90);

    transition:
        opacity .55s ease,
        transform .65s
        cubic-bezier(.2,.9,.2,1);

    z-index:8;
}

.gallery-secret-overlay-v3.visible
.gallery-secret-frame-v3{
    opacity:1;

    transform:
        translateY(0)
        scale(1);
}

.gallery-secret-frame-v3::before,
.gallery-secret-frame-v3::after{
    content:"";

    position:absolute;

    pointer-events:none;

    border-radius:25px;

    animation:
        gallerySecretFrameGlowV3
        3.2s
        ease-in-out
        infinite;
}

.gallery-secret-frame-v3::before{
    inset:-13px;

    border:
        1px solid rgba(255,213,126,.42);

    box-shadow:
        0 0 24px rgba(255,202,111,.28),
        0 0 50px rgba(180,86,255,.28);
}

.gallery-secret-frame-v3::after{
    inset:-25px;

    border:
        1px solid rgba(204,126,255,.18);

    box-shadow:
        0 0 35px rgba(181,87,255,.20);

    animation-delay:
        1.1s;
}

.gallery-secret-media-v3{
    position:relative;

    flex:1;
    min-height:0;

    overflow:hidden;

    border-radius:10px;

    background:
        radial-gradient(
            circle at 50% 44%,
            rgba(130,67,200,.28),
            transparent 48%
        ),
        rgba(10,6,24,.98);

    border:
        1px solid rgba(255,223,159,.40);

    box-shadow:
        inset 0 0 28px rgba(0,0,0,.58),
        0 0 22px rgba(255,204,122,.17);
}

.gallery-secret-media-v3 img{
    width:100%;
    height:100%;

    display:block;

    object-fit:contain;

    background:
        rgba(8,5,20,.96);

    pointer-events:none;
    user-select:none;
    -webkit-user-drag:none;
}

.gallery-secret-placeholder-v3{
    position:absolute;
    inset:0;

    display:flex;
    align-items:center;
    justify-content:center;

    background:
        radial-gradient(
            circle at 50% 45%,
            rgba(219,112,255,.28),
            transparent 37%
        ),
        linear-gradient(
            145deg,
            #17102f,
            #4a246e,
            #140d28
        );

    color:
        rgba(255,191,228,.98);

    font-family:
        Georgia,
        serif;

    font-size:92px;

    text-shadow:
        0 0 18px rgba(255,135,215,.88),
        0 0 46px rgba(176,83,255,.72);
}

.gallery-secret-caption-v3{
    position:absolute;

    left:64px;
    right:64px;
    bottom:17px;

    color:
        rgba(255,229,178,.96);

    font-family:
        "BaninDream",
        "Cormorant Garamond",
        Georgia,
        serif;

    font-size:17px;
    line-height:1.5;
    font-weight:700;
    font-style:italic;

    text-align:center;

    text-shadow:
        0 0 12px rgba(255,205,126,.28),
        0 0 18px rgba(190,101,255,.24);
}

.gallery-secret-close-v3{
    position:absolute;

    top:-18px;
    right:-18px;

    width:44px;
    height:44px;

    border-radius:50%;

    border:
        1px solid rgba(255,224,154,.68);

    background:
        linear-gradient(
            145deg,
            rgba(57,25,86,.99),
            rgba(13,7,27,.99)
        );

    color:
        rgba(255,237,194,.98);

    font-size:25px;

    cursor:pointer;

    box-shadow:
        0 12px 28px rgba(0,0,0,.52),
        0 0 24px rgba(255,204,125,.24),
        0 0 28px rgba(178,87,255,.20);

    transition:
        transform .22s ease,
        filter .22s ease;

    z-index:25;
}

.gallery-secret-close-v3:hover{
    transform:
        scale(1.09)
        rotate(7deg);

    filter:
        brightness(1.16);
}

.gallery-secret-effects-v3{
    position:absolute;
    inset:0;

    overflow:hidden;

    pointer-events:none;

    z-index:18;
}

.gallery-secret-firefly-v3{
    position:absolute;

    left:
        var(--secret-start-x);

    top:
        var(--secret-start-y);

    width:
        var(--secret-size);

    height:
        var(--secret-size);

    border-radius:50%;

    background:
        radial-gradient(
            circle,
            #fffbd5 0 22%,
            #ffd77c 35%,
            rgba(255,177,67,.22) 68%,
            transparent 74%
        );

    box-shadow:
        0 0 8px rgba(255,222,134,.98),
        0 0 17px rgba(255,184,79,.72);

    opacity:0;

    animation:
        gallerySecretFireflyV3
        var(--secret-duration)
        ease-out
        var(--secret-delay)
        both;
}

.gallery-secret-butterfly-v3{
    position:absolute;

    left:
        var(--secret-start-x);

    top:
        var(--secret-start-y);

    width:28px;
    height:20px;

    opacity:0;

    filter:
        drop-shadow(
            0 0 9px rgba(221,117,255,.68)
        );

    animation:
        gallerySecretButterflyV3
        var(--secret-duration)
        ease-out
        var(--secret-delay)
        both;
}

.gallery-secret-butterfly-v3::before,
.gallery-secret-butterfly-v3::after{
    content:"";

    position:absolute;

    top:2px;

    width:14px;
    height:18px;

    background:
        radial-gradient(
            circle at 45% 35%,
            rgba(255,233,252,.98),
            rgba(212,110,239,.94) 48%,
            rgba(105,57,170,.88)
        );

    box-shadow:
        inset 0 0 5px
        rgba(255,255,255,.32);
}

.gallery-secret-butterfly-v3::before{
    left:0;

    border-radius:
        82% 18% 72% 30%;

    transform:
        rotate(-15deg);

    transform-origin:
        100% 60%;
}

.gallery-secret-butterfly-v3::after{
    right:0;

    border-radius:
        18% 82% 30% 72%;

    transform:
        rotate(15deg);

    transform-origin:
        0 60%;
}

.gallery-star-v2{
    position:absolute;

    color:
        rgba(255,236,197,.90);

    font-size:10px;

    text-shadow:
        0 0 8px rgba(255,219,148,.82),
        0 0 15px rgba(176,90,255,.40);

    pointer-events:none;

    animation:
        galleryStarTwinkleV3
        var(--gallery-star-duration, 3s)
        ease-in-out
        infinite;

    z-index:10;
}

.gallery-ambient-firefly-v3{
    position:absolute;

    left:
        var(--gallery-firefly-left);

    top:
        var(--gallery-firefly-top);

    width:
        var(--gallery-firefly-size, 5px);

    height:
        var(--gallery-firefly-size, 5px);

    border-radius:50%;

    background:
        radial-gradient(
            circle,
            rgba(255,255,220,1) 0 20%,
            rgba(255,222,137,.96) 32%,
            rgba(255,178,78,.38) 58%,
            transparent 74%
        );

    box-shadow:
        0 0 6px rgba(255,241,184,.96),
        0 0 13px rgba(255,198,105,.76),
        0 0 22px rgba(190,106,255,.30);

    opacity:0;

    pointer-events:none;

    animation:
        galleryAmbientFireflyV3
        var(--gallery-firefly-duration, 6s)
        ease-in-out
        var(--gallery-firefly-delay, 0s)
        infinite;

    will-change:
        transform,
        opacity;

    z-index:28;
}

.gallery-ambient-firefly-v3::after{
    content:"";

    position:absolute;

    inset:-7px;

    border-radius:50%;

    background:
        radial-gradient(
            circle,
            rgba(255,218,137,.20),
            transparent 70%
        );

    pointer-events:none;
}

            .gallery-butterfly-v2{
                position:absolute;

                width:28px;
                height:20px;

                pointer-events:none;

                z-index:15;

                animation:
                    galleryButterflyFloatV3
                    var(--gallery-butterfly-duration, 6s)
                    ease-in-out
                    infinite;

                filter:
                    drop-shadow(
                        0 0 8px rgba(219,117,255,.48)
                    );
            }

            .gallery-butterfly-v2::before,
            .gallery-butterfly-v2::after{
                content:"";

                position:absolute;

                top:2px;

                width:14px;
                height:18px;

                background:
                    radial-gradient(
                        circle at 45% 35%,
                        rgba(255,222,250,.96),
                        rgba(203,104,233,.88) 48%,
                        rgba(104,58,168,.82)
                    );

                box-shadow:
                    inset 0 0 5px rgba(255,255,255,.28);
            }

            .gallery-butterfly-v2::before{
                left:0;

                border-radius:
                    82% 18% 72% 30%;

                transform:
                    rotate(-12deg);

                transform-origin:
                    100% 60%;
            }

            .gallery-butterfly-v2::after{
                right:0;

                border-radius:
                    18% 82% 30% 72%;

                transform:
                    rotate(12deg);

                transform-origin:
                    0 60%;
            }

            .gallery-flower-cluster-v2{
                position:absolute;

                display:flex;
                align-items:flex-end;

                gap:4px;

                pointer-events:none;

                z-index:14;

                filter:
                    drop-shadow(
                        0 0 8px rgba(191,94,255,.32)
                    );
            }

            .gallery-flower-v2{
                color:
                    rgba(204,115,231,.92);

                font-family:
                    Georgia,
                    serif;

                text-shadow:
                    0 0 7px rgba(222,124,255,.56),
                    0 0 13px rgba(123,76,206,.36);
            }

            .gallery-viewer-overlay-v2{
                position:absolute;
                inset:0;

                display:flex;
                align-items:center;
                justify-content:center;

                padding:34px;

                background:
                    radial-gradient(
                        circle at 50% 44%,
                        rgba(102,51,161,.28),
                        transparent 48%
                    ),
                    rgba(4,2,13,.88);

                backdrop-filter:blur(8px);
                -webkit-backdrop-filter:blur(8px);

                opacity:0;
                visibility:hidden;
                pointer-events:none;

                transition:
                    opacity .34s ease,
                    visibility .34s ease;

                z-index:180;
            }

            .gallery-viewer-overlay-v2.visible{
                opacity:1;
                visibility:visible;
                pointer-events:auto;
            }

            .gallery-viewer-frame-v2{
                position:relative;

                width:
                    min(850px, 91%);

                height:
                    min(600px, 88%);

                display:flex;
                flex-direction:column;

                padding:
                    22px 22px 20px;

                border-radius:12px;

                background:
                    linear-gradient(
                        145deg,
                        rgba(255,247,232,.98),
                        rgba(220,202,210,.98)
                    );

                border:
                    1px solid rgba(255,255,255,.74);

                box-shadow:
                    0 30px 90px rgba(0,0,0,.68),
                    0 0 36px rgba(255,206,130,.20),
                    0 0 48px rgba(171,84,255,.26);

                transform:
                    translateY(18px)
                    scale(.95);

                transition:
                    transform .38s
                    cubic-bezier(.2,.9,.2,1);
            }

            .gallery-viewer-overlay-v2.visible
            .gallery-viewer-frame-v2{
                transform:
                    translateY(0)
                    scale(1);
            }

            .gallery-viewer-media-v2{
                position:relative;

                flex:1;
                min-height:0;

                overflow:hidden;

                border-radius:5px;

                background:
                    linear-gradient(
                        145deg,
                        #17102f,
                        #432267,
                        #151029
                    );

                box-shadow:
                    inset 0 0 26px rgba(0,0,0,.38);
            }

            .gallery-viewer-media-v2 img{
                width:100%;
                height:100%;

                display:block;

                object-fit:contain;

                background:
                    rgba(12,7,26,.98);

                pointer-events:none;
                user-select:none;
                -webkit-user-drag:none;
            }

            .gallery-viewer-placeholder-v2{
                position:absolute;
                inset:0;

                display:flex;
                align-items:center;
                justify-content:center;

                background:
                    radial-gradient(
                        circle at 70% 25%,
                        rgba(255,231,169,.94) 0 5%,
                        rgba(255,207,128,.28) 6%,
                        transparent 20%
                    ),
                    radial-gradient(
                        circle at 44% 66%,
                        rgba(214,111,255,.24),
                        transparent 28%
                    ),
                    linear-gradient(
                        145deg,
                        #17102f,
                        #48246c,
                        #17102d
                    );

                color:
                    rgba(255,186,227,.96);

                font-family:
                    Georgia,
                    serif;

                font-size:82px;

                text-shadow:
                    0 0 18px rgba(255,131,212,.72),
                    0 0 42px rgba(168,82,255,.56);
            }

            .gallery-viewer-caption-v2{
                min-height:50px;

                padding:
                    15px 72px 0;

                font-family:
                    "BaninDream",
                    "Cormorant Garamond",
                    Georgia,
                    serif;

                color:
                    rgba(74,42,78,.96);

                font-size:18px;
                line-height:1.45;
                font-weight:700;
                font-style:italic;

                text-align:center;
            }

            .gallery-viewer-close-v2{
                position:absolute;

                top:-18px;
                right:-18px;

                width:44px;
                height:44px;

                border-radius:50%;

                border:
                    1px solid rgba(255,224,154,.64);

                background:
                    linear-gradient(
                        145deg,
                        rgba(57,25,86,.98),
                        rgba(14,8,28,.98)
                    );

                color:
                    rgba(255,234,189,.98);

                font-size:25px;

                cursor:pointer;

                box-shadow:
                    0 12px 28px rgba(0,0,0,.48),
                    0 0 20px rgba(255,204,125,.18);

                transition:
                    transform .22s ease,
                    filter .22s ease;

                z-index:20;
            }

            .gallery-viewer-close-v2:hover{
                transform:
                    scale(1.08)
                    rotate(6deg);

                filter:
                    brightness(1.12);
            }

            .gallery-viewer-nav-v2{
                position:absolute;

                top:50%;

                width:48px;
                height:54px;

                transform:
                    translateY(-50%);

                border-radius:11px;

                border:
                    1px solid rgba(255,222,151,.46);

                background:
                    linear-gradient(
                        145deg,
                        rgba(54,24,82,.94),
                        rgba(13,7,27,.96)
                    );

                color:
                    rgba(255,231,181,.98);

                font-family:
                    Georgia,
                    serif;

                font-size:33px;
                line-height:1;

                cursor:pointer;

                box-shadow:
                    0 12px 26px rgba(0,0,0,.38),
                    0 0 18px rgba(170,84,255,.18);

                transition:
                    transform .22s ease,
                    filter .22s ease,
                    opacity .22s ease;

                z-index:18;
            }

            .gallery-viewer-nav-v2.previous{
                left:-70px;
            }

            .gallery-viewer-nav-v2.next{
                right:-70px;
            }

            .gallery-viewer-nav-v2:hover{
                filter:
                    brightness(1.16);
            }

            .gallery-viewer-nav-v2.previous:hover{
                transform:
                    translateY(-50%)
                    translateX(-3px);
            }

            .gallery-viewer-nav-v2.next:hover{
                transform:
                    translateY(-50%)
                    translateX(3px);
            }

            .gallery-viewer-nav-v2.disabled{
                opacity:.26;
                pointer-events:none;
            }

            .gallery-viewer-counter-v2{
                position:absolute;

                left:50%;
                bottom:-19px;

                transform:
                    translateX(-50%);

                min-width:104px;

                padding:
                    8px 20px;

                border-radius:999px;

                background:
                    linear-gradient(
                        145deg,
                        rgba(43,19,67,.98),
                        rgba(14,8,28,.98)
                    );

                border:
                    1px solid rgba(255,222,150,.50);

                color:
                    rgba(255,232,183,.96);

                font-family:
                    "BaninDream",
                    Georgia,
                    serif;

                font-size:13px;
                font-weight:800;

                letter-spacing:1px;
                text-align:center;

                box-shadow:
                    0 10px 22px rgba(0,0,0,.42),
                    0 0 18px rgba(171,84,255,.18);
            }

            @media (max-width:1000px){

                .gallery-polaroid-grid-v2{
                    grid-template-columns:
                        repeat(3, minmax(0,1fr));
                }

                .gallery-memory-stage-v2{
                    margin-left:28px;
                    margin-right:28px;
                }

            }

            @media (max-width:760px){

                #galleryPanelOverlayV2{
                    padding:8px;
                }

                .gallery-panel-v2{
                    width:
                        calc(100vw - 16px);

                    height:
                        calc(100vh - 16px);

                    border-radius:24px;
                }

                .gallery-header-v2{
                    padding:
                        34px 68px 8px;
                }

                .gallery-title-v2{
                    font-size:35px;
                }

                .gallery-subtitle-v2{
                    font-size:14px;
                }

                .gallery-string-lights-v2{
                    top:151px;
                }

                .gallery-memory-stage-v2{
                    height:
                        calc(100% - 230px);

                    margin:
                        0 10px;

                    padding:
                        58px 14px 105px;
                }

                .gallery-polaroid-grid-v2{
                    grid-template-columns:
                        repeat(2, minmax(0,1fr));

                    gap:
                        65px 20px;

                    padding-left:4px;
                    padding-right:4px;
                }

                .gallery-footer-v2{
                    left:20px;
                    right:20px;

                    font-size:12px;
                }

                .gallery-viewer-frame-v2{
                    width:95%;
                    height:80%;

                    padding:
                        13px 13px 17px;
                }

                .gallery-viewer-nav-v2{
                    top:auto;
                    bottom:-64px;
                }

                .gallery-viewer-nav-v2.previous{
                    left:
                        calc(50% - 75px);
                }

                .gallery-viewer-nav-v2.next{
                    right:
                        calc(50% - 75px);
                }

                .gallery-viewer-counter-v2{
                    bottom:-62px;
                }

                .gallery-viewer-caption-v2{
                    padding:
                        12px 10px 0;

                    font-size:15px;
                }

            }

            @media (max-width:460px){

                .gallery-polaroid-grid-v2{
                    grid-template-columns:1fr;

                    max-width:260px;

                    margin:
                        0 auto;
                }

                .gallery-header-v2{
                    padding-left:55px;
                    padding-right:55px;
                }

                .gallery-title-v2{
                    font-size:29px;
                }

                .gallery-close-v2{
                    right:14px;
                    top:16px;
                }

            }

            @media (prefers-reduced-motion:reduce){

                #galleryPanelOverlayV2 *,
                #galleryPanelOverlayV2 *::before,
                #galleryPanelOverlayV2 *::after{
                    animation:none !important;
                    transition:none !important;
                }

            }

        `;

        document.head.appendChild(style);

    },

    build(){

        const oldOverlay =
            document.getElementById(
                "galleryPanelOverlayV2"
            );

        if(oldOverlay){
            oldOverlay.remove();
        }

        this.overlay =
            document.createElement("div");

        this.panel =
            document.createElement("section");

        this.stage =
            document.createElement("div");

        this.grid =
            document.createElement("div");

        this.overlay.id =
            "galleryPanelOverlayV2";

        this.overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        this.panel.className =
            "gallery-panel-v2";

        this.panel.setAttribute(
            "role",
            "dialog"
        );

        this.panel.setAttribute(
            "aria-modal",
            "true"
        );

        this.panel.setAttribute(
            "aria-label",
            "Our Little Moments Gallery"
        );

        const backgroundGlow =
            document.createElement("div");

        backgroundGlow.className =
            "gallery-background-glow-v2";

        const header =
            document.createElement("header");

        header.className =
            "gallery-header-v2";

        const kicker =
            document.createElement("p");

        kicker.className =
            "gallery-kicker-v2";

        kicker.textContent =
            "Banin Universe";

        const title =
            document.createElement("h2");

        title.className =
            "gallery-title-v2";

        title.textContent =
            "Our Little Moments";

        const subtitle =
            document.createElement("p");

        subtitle.className =
            "gallery-subtitle-v2";

        subtitle.textContent =
            "قاب‌های کوچیکی از لحظه‌های قشنگمون";

        header.appendChild(kicker);
        header.appendChild(title);
        header.appendChild(subtitle);

        this.closeButton =
            document.createElement("button");

        this.closeButton.type =
            "button";

        this.closeButton.className =
            "gallery-close-v2";

        this.closeButton.textContent =
            "×";

        this.closeButton.setAttribute(
            "aria-label",
            "Close gallery"
        );

        const stringLights =
            this.createStringLights();

        this.stage.className =
            "gallery-memory-stage-v2";

        this.grid.className =
            "gallery-polaroid-grid-v2";

        this.emptyState =
            this.createEmptyState();

        this.stage.appendChild(
            this.grid
        );

        this.stage.appendChild(
            this.emptyState
        );

        const footer =
            document.createElement("footer");

        footer.className =
            "gallery-footer-v2";

        footer.textContent =
            "Every moment with you is my favorite memory.";

        this.secretStarButton =
            this.createSecretStar();

        this.createViewer();
        this.createSecretMemory();

        this.panel.appendChild(
            backgroundGlow
        );

        this.panel.appendChild(
            header
        );

        this.panel.appendChild(
            this.closeButton
        );

        this.panel.appendChild(
            stringLights
        );

        this.panel.appendChild(
            this.stage
        );

        this.panel.appendChild(
            this.secretStarButton
        );

        this.panel.appendChild(
            footer
        );

        this.panel.appendChild(
            this.viewerOverlay
        );

        this.panel.appendChild(
            this.secretOverlay
        );


        this.createDecorations();

        this.overlay.appendChild(
            this.panel
        );

        document.body.appendChild(
            this.overlay
        );

    },

    createSecretStar(){

        const button =
            document.createElement("button");

        button.type =
            "button";

        button.className =
            "gallery-secret-star-v3";

        button.textContent =
            "✦";

        button.setAttribute(
            "aria-label",
            "A mysterious glowing star"
        );

        return button;

    },

    createSecretMemory(){

        this.secretOverlay =
            document.createElement("div");

        this.secretFrame =
            document.createElement("div");

        this.secretMedia =
            document.createElement("div");

        this.secretCaption =
            document.createElement("div");

        this.secretCloseButton =
            document.createElement("button");

        this.secretEffectsLayer =
            document.createElement("div");

        this.secretOverlay.className =
            "gallery-secret-overlay-v3";

        this.secretFrame.className =
            "gallery-secret-frame-v3";

        this.secretMedia.className =
            "gallery-secret-media-v3";

        this.secretCaption.className =
            "gallery-secret-caption-v3";

        this.secretCloseButton.className =
            "gallery-secret-close-v3";

        this.secretEffectsLayer.className =
            "gallery-secret-effects-v3";

        this.secretOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        this.secretFrame.setAttribute(
            "role",
            "dialog"
        );

        this.secretFrame.setAttribute(
            "aria-modal",
            "true"
        );

        this.secretFrame.setAttribute(
            "aria-label",
            "Secret memory"
        );

        this.secretCloseButton.type =
            "button";

        this.secretCloseButton.textContent =
            "×";

        this.secretCloseButton.setAttribute(
            "aria-label",
            "Close secret memory"
        );

        this.secretCaption.textContent =
            "You found my favorite memory. ♡";

        this.secretFrame.appendChild(
            this.secretMedia
        );

        this.secretFrame.appendChild(
            this.secretCaption
        );

        this.secretFrame.appendChild(
            this.secretCloseButton
        );

        this.secretOverlay.appendChild(
            this.secretEffectsLayer
        );

        this.secretOverlay.appendChild(
            this.secretFrame
        );

    },

    registerSecretClick(){

        if(
            !this.secretStarButton ||
            this.secretOpen ||
            this.secretUnlockPending
        ){
            return;
        }

        this.secretClickCount += 1;

        const glowSize =
            14 +
            this.secretClickCount * 5;

        this.secretStarButton.style
            .setProperty(
                "--secret-glow",
                glowSize + "px"
            );

        this.secretStarButton.classList.remove(
            "secret-tapped-v3"
        );

        void this.secretStarButton.offsetWidth;

        this.secretStarButton.classList.add(
            "secret-tapped-v3"
        );

        const spark =
            document.createElement("span");

        spark.className =
            "gallery-secret-tap-spark-v3";

        spark.textContent =
            this.secretClickCount % 2 === 0
                ? "✧"
                : "✦";

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            22 +
            Math.random() *
            18;

        spark.style.setProperty(
            "--spark-x",
            Math.cos(angle) *
            distance +
            "px"
        );

        spark.style.setProperty(
            "--spark-y",
            Math.sin(angle) *
            distance +
            "px"
        );

        this.secretStarButton.appendChild(
            spark
        );

        window.setTimeout(
            () => {

                spark.remove();

                this.secretStarButton
                    ?.classList.remove(
                        "secret-tapped-v3"
                    );

            },
            740
        );

        if(
            this.secretClickCount <
            this.secretRequiredClicks
        ){
            return;
        }

        this.secretUnlockPending =
            true;

        this.secretClickCount =
            0;

        this.secretStarButton.classList.add(
            "secret-unlocked-v3"
        );

        window.setTimeout(
            () => {

                this.secretUnlockPending =
                    false;

                this.secretStarButton
                    ?.classList.remove(
                        "secret-unlocked-v3"
                    );

                this.secretStarButton
                    ?.style.setProperty(
                        "--secret-glow",
                        "14px"
                    );

                this.openSecretMemory();

            },
            360
        );

    },

    openSecretMemory(){

        if(
            !this.secretOverlay ||
            this.secretOpen
        ){
            return;
        }

        this.closeViewer();

        this.secretOpen =
            true;

        this.renderSecretMemory();
        this.createSecretBurst();

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

    closeSecretMemory(){

        if(!this.secretOverlay){
            return;
        }

        this.secretOpen =
            false;

        this.secretOverlay.classList.remove(
            "visible"
        );

        this.secretOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        window.setTimeout(
            () => {

                if(
                    !this.secretOpen &&
                    this.secretEffectsLayer
                ){

                    this.secretEffectsLayer
                        .innerHTML = "";

                }

            },
            700
        );

    },

    renderSecretMemory(){

        if(!this.secretMedia){
            return;
        }

        this.secretMedia.innerHTML =
            "";

        const image =
            document.createElement("img");

        image.src =
            "assets/gallery/secret-memory.webp";

        image.alt =
            "Our secret favorite memory";

        image.draggable =
            false;

        image.addEventListener(
            "error",
            () => {

                this.secretMedia.innerHTML =
                    "";

                const placeholder =
                    document.createElement("div");

                placeholder.className =
                    "gallery-secret-placeholder-v3";

                placeholder.textContent =
                    "♡";

                this.secretMedia.appendChild(
                    placeholder
                );

            },
            {
                once:true
            }
        );

        this.secretMedia.appendChild(
            image
        );

    },

    createSecretBurst(){

        if(!this.secretEffectsLayer){
            return;
        }

        this.secretEffectsLayer.innerHTML =
            "";

        const fireflyCount =
            32;

        for(
            let index = 0;
            index < fireflyCount;
            index += 1
        ){

            const firefly =
                document.createElement("span");

            firefly.className =
                "gallery-secret-firefly-v3";

            const angle =
                Math.random() *
                Math.PI *
                2;

            const startRadiusX =
                19 +
                Math.random() *
                24;

            const startRadiusY =
                14 +
                Math.random() *
                23;

            const startX =
                50 +
                Math.cos(angle) *
                startRadiusX;

            const startY =
                50 +
                Math.sin(angle) *
                startRadiusY;

            const distance =
                80 +
                Math.random() *
                170;

            firefly.style.setProperty(
                "--secret-start-x",
                startX + "%"
            );

            firefly.style.setProperty(
                "--secret-start-y",
                startY + "%"
            );

            firefly.style.setProperty(
                "--secret-dx",
                Math.cos(angle) *
                distance +
                "px"
            );

            firefly.style.setProperty(
                "--secret-dy",
                Math.sin(angle) *
                distance +
                "px"
            );

            firefly.style.setProperty(
                "--secret-size",
                (
                    4 +
                    Math.random() *
                    5
                ) +
                "px"
            );

            firefly.style.setProperty(
                "--secret-duration",
                (
                    2.1 +
                    Math.random() *
                    2.3
                ) +
                "s"
            );

            firefly.style.setProperty(
                "--secret-delay",
                (
                    Math.random() *
                    .8
                ) +
                "s"
            );

            this.secretEffectsLayer
                .appendChild(
                    firefly
                );

        }

        const butterflyCount =
            8;

        for(
            let index = 0;
            index < butterflyCount;
            index += 1
        ){

            const butterfly =
                document.createElement("span");

            butterfly.className =
                "gallery-secret-butterfly-v3";

            const angle =
                Math.random() *
                Math.PI *
                2;

            const startX =
                50 +
                Math.cos(angle) *
                (
                    19 +
                    Math.random() *
                    23
                );

            const startY =
                50 +
                Math.sin(angle) *
                (
                    15 +
                    Math.random() *
                    21
                );

            const distance =
                115 +
                Math.random() *
                145;

            butterfly.style.setProperty(
                "--secret-start-x",
                startX + "%"
            );

            butterfly.style.setProperty(
                "--secret-start-y",
                startY + "%"
            );

            butterfly.style.setProperty(
                "--secret-dx",
                Math.cos(angle) *
                distance +
                "px"
            );

            butterfly.style.setProperty(
                "--secret-dy",
                Math.sin(angle) *
                distance +
                "px"
            );

            butterfly.style.setProperty(
                "--secret-rotation",
                (
                    -25 +
                    Math.random() *
                    50
                ) +
                "deg"
            );

            butterfly.style.setProperty(
                "--secret-duration",
                (
                    2.8 +
                    Math.random() *
                    2
                ) +
                "s"
            );

            butterfly.style.setProperty(
                "--secret-delay",
                (
                    .15 +
                    Math.random() *
                    .8
                ) +
                "s"
            );

            this.secretEffectsLayer
                .appendChild(
                    butterfly
                );

        }

    },

    createStringLights(){

        const lights =
            document.createElement("div");

        lights.className =
            "gallery-string-lights-v2";

        const wire =
            document.createElement("div");

        wire.className =
            "gallery-string-wire-v2";

        lights.appendChild(wire);

        const positions = [
            3,
            11,
            19,
            27,
            35,
            43,
            51,
            59,
            67,
            75,
            83,
            91,
            98
        ];

        positions.forEach(
            (position, index) => {

                const light =
                    document.createElement("span");

                light.className =
                    "gallery-string-light-v2";

                light.style.left =
                    position + "%";

                light.style.animationDelay =
                    (index * 0.17) + "s";

                light.style.translate =
                    "-50% " +
                    (
                        4 +
                        Math.sin(index * 1.1) * 7
                    ) +
                    "px";

                lights.appendChild(light);

            }
        );

        return lights;

    },

     createDecorations(){

        const stars = [

            {
                left:"5%",
                top:"19%",
                size:"12px",
                delay:"0s"
            },

            {
                left:"12%",
                top:"10%",
                size:"8px",
                delay:".8s"
            },

            {
                left:"91%",
                top:"17%",
                size:"11px",
                delay:"1.4s"
            },

            {
                left:"84%",
                top:"8%",
                size:"7px",
                delay:".3s"
            },

            {
                left:"4%",
                top:"68%",
                size:"9px",
                delay:"1.8s"
            },

            {
                left:"94%",
                top:"72%",
                size:"10px",
                delay:"1.1s"
            }

        ];

        stars.forEach(
            (item, index) => {

                const star =
                    document.createElement("span");

                star.className =
                    "gallery-star-v2";

                star.textContent =
                    index % 2 === 0
                        ? "✦"
                        : "✧";

                star.style.left =
                    item.left;

                star.style.top =
                    item.top;

                star.style.fontSize =
                    item.size;

                star.style.animationDelay =
                    item.delay;

                star.style.setProperty(
                    "--gallery-star-duration",
                    (
                        2.6 +
                        index * 0.21
                    ) +
                    "s"
                );

                this.panel.appendChild(
                    star
                );

            }
        );

        const fireflies = [

            {
                left:"7%",
                top:"25%"
            },

            {
                left:"14%",
                top:"47%"
            },

            {
                left:"22%",
                top:"18%"
            },

            {
                left:"29%",
                top:"69%"
            },

            {
                left:"37%",
                top:"32%"
            },

            {
                left:"44%",
                top:"77%"
            },

            {
                left:"52%",
                top:"24%"
            },

            {
                left:"59%",
                top:"58%"
            },

            {
                left:"67%",
                top:"35%"
            },

            {
                left:"74%",
                top:"72%"
            },

            {
                left:"82%",
                top:"29%"
            },

            {
                left:"91%",
                top:"47%"
            },

            {
                left:"10%",
                top:"81%"
            },

            {
                left:"88%",
                top:"83%"
            }

        ];

        fireflies.forEach(
            (item, index) => {

                const firefly =
                    document.createElement("span");

                firefly.className =
                    "gallery-ambient-firefly-v3";

                const direction =
                    index % 2 === 0
                        ? 1
                        : -1;

                const verticalDirection =
                    index % 3 === 0
                        ? 1
                        : -1;

                firefly.style.setProperty(
                    "--gallery-firefly-left",
                    item.left
                );

                firefly.style.setProperty(
                    "--gallery-firefly-top",
                    item.top
                );

                firefly.style.setProperty(
                    "--gallery-firefly-size",
                    (
                        4 +
                        (index % 3) * 1.2
                    ) +
                    "px"
                );

                firefly.style.setProperty(
                    "--gallery-firefly-duration",
                    (
                        5 +
                        (index % 5) * .65
                    ) +
                    "s"
                );

                firefly.style.setProperty(
                    "--gallery-firefly-delay",
                    (
                        -(index * .41)
                    ) +
                    "s"
                );

                firefly.style.setProperty(
                    "--gallery-firefly-mid-x",
                    (
                        direction *
                        (
                            7 +
                            (index % 4) * 4
                        )
                    ) +
                    "px"
                );

                firefly.style.setProperty(
                    "--gallery-firefly-mid-y",
                    (
                        verticalDirection *
                        (
                            8 +
                            (index % 3) * 5
                        )
                    ) +
                    "px"
                );

                firefly.style.setProperty(
                    "--gallery-firefly-end-x",
                    (
                        -direction *
                        (
                            8 +
                            (index % 5) * 3
                        )
                    ) +
                    "px"
                );

                firefly.style.setProperty(
                    "--gallery-firefly-end-y",
                    (
                        verticalDirection *
                        (
                            15 +
                            (index % 4) * 4
                        )
                    ) +
                    "px"
                );

                firefly.style.setProperty(
                    "--gallery-firefly-return-x",
                    (
                        direction *
                        (
                            4 +
                            (index % 3) * 3
                        )
                    ) +
                    "px"
                );

                firefly.style.setProperty(
                    "--gallery-firefly-return-y",
                    (
                        -verticalDirection *
                        (
                            6 +
                            (index % 4) * 3
                        )
                    ) +
                    "px"
                );

                this.panel.appendChild(
                    firefly
                );

            }
        );

        const butterflies = [

            {
                left:"5%",
                top:"31%",
                duration:"6.4s",
                delay:"0s",
                opacity:".90"
            },

            {
                right:"6%",
                top:"26%",
                duration:"7.2s",
                delay:"1.1s",
                opacity:".92"
            },

            {
                right:"8%",
                bottom:"11%",
                duration:"6.8s",
                delay:".5s",
                opacity:".88"
            },

            {
                left:"24%",
                top:"53%",
                duration:"7.6s",
                delay:"1.7s",
                opacity:".72"
            },

            {
                right:"28%",
                top:"67%",
                duration:"8.1s",
                delay:".9s",
                opacity:".68"
            }

        ];

        butterflies.forEach(item => {

            const butterfly =
                document.createElement("span");

            butterfly.className =
                "gallery-butterfly-v2";

            if(item.left){
                butterfly.style.left =
                    item.left;
            }

            if(item.right){
                butterfly.style.right =
                    item.right;
            }

            if(item.top){
                butterfly.style.top =
                    item.top;
            }

            if(item.bottom){
                butterfly.style.bottom =
                    item.bottom;
            }

            butterfly.style.opacity =
                item.opacity;

            butterfly.style.zIndex =
                "28";

            butterfly.style.animationDelay =
                item.delay;

            butterfly.style.setProperty(
                "--gallery-butterfly-duration",
                item.duration
            );

            this.panel.appendChild(
                butterfly
            );

        });

        const leftFlowers =
            this.createFlowerCluster();

        leftFlowers.style.left =
            "24px";

        leftFlowers.style.bottom =
            "18px";

        const rightFlowers =
            this.createFlowerCluster();

        rightFlowers.style.right =
            "24px";

        rightFlowers.style.bottom =
            "18px";

        rightFlowers.style.transform =
            "scaleX(-1)";

        this.panel.appendChild(
            leftFlowers
        );

        this.panel.appendChild(
            rightFlowers
        );

    },


    createFlowerCluster(){

        const cluster =
            document.createElement("div");

        cluster.className =
            "gallery-flower-cluster-v2";

        const flowers = [

            {
                symbol:"✿",
                size:27,
                translate:4
            },

            {
                symbol:"❀",
                size:38,
                translate:0
            },

            {
                symbol:"✿",
                size:25,
                translate:7
            },

            {
                symbol:"❁",
                size:31,
                translate:3
            }

        ];

        flowers.forEach(item => {

            const flower =
                document.createElement("span");

            flower.className =
                "gallery-flower-v2";

            flower.textContent =
                item.symbol;

            flower.style.fontSize =
                item.size + "px";

            flower.style.transform =
                `translateY(${item.translate}px)`;

            cluster.appendChild(
                flower
            );

        });

        return cluster;

    },

    createEmptyState(){

        const state =
            document.createElement("div");

        state.className =
            "gallery-empty-state-v2";

        const icon =
            document.createElement("div");

        icon.className =
            "gallery-empty-icon-v2";

        icon.textContent =
            "♡";

        const title =
            document.createElement("h3");

        title.className =
            "gallery-empty-title-v2";

        title.textContent =
            "Soon, this place will hold\n" +
            "the little pieces of us.";

        const text =
            document.createElement("p");

        text.className =
            "gallery-empty-text-v2";

        text.textContent =
            "اینجا قراره تکه‌های کوچیکی از قشنگ‌ترین لحظه‌هامون جا بگیره.";

        state.appendChild(icon);
        state.appendChild(title);
        state.appendChild(text);

        return state;

    },

    normalizeItem(item, index){

        const source =
            item &&
            typeof item === "object"
                ? item
                : {};

        const automaticRotation =
            this.rotations[
                index %
                this.rotations.length
            ];

        const hasCustomRotation =
            source.rotation !== null &&
            source.rotation !== "" &&
            Number.isFinite(
                Number(source.rotation)
            );

        const rotation =
            hasCustomRotation
                ? Number(source.rotation)
                : automaticRotation;

        const ropeLength =
            Number.isFinite(
                Number(source.ropeLength)
            )
                ? Math.max(
                    8,
                    Number(source.ropeLength)
                )
                : 58;

        const ropeX =
            Number.isFinite(
                Number(source.ropeX)
            )
                ? Math.min(
                    92,
                    Math.max(
                        8,
                        Number(source.ropeX)
                    )
                )
                : 50;

        const ropeTilt =
            Number.isFinite(
                Number(source.ropeTilt)
            )
                ? Number(source.ropeTilt)
                : 0;

        const clipX =
            Number.isFinite(
                Number(source.clipX)
            )
                ? Math.min(
                    92,
                    Math.max(
                        8,
                        Number(source.clipX)
                    )
                )
                : ropeX;

        const clipTilt =
            Number.isFinite(
                Number(source.clipTilt)
            )
                ? Number(source.clipTilt)
                : -2;

        return {

            image:
                typeof source.image === "string"
                    ? source.image
                    : "",

            caption:
                typeof source.caption === "string"
                    ? source.caption
                    : `Little memory ${index + 1}`,

            placeholder:
                Boolean(source.placeholder),

            rotation,
            ropeLength,
            ropeX,
            ropeTilt,
            clipX,
            clipTilt

        };

    },

    loadGalleryData(){

        if(
            !Array.isArray(
                window.GalleryData
            )
        ){

            console.warn(
                "⚠️ GalleryData was not found"
            );

            this.items = [];

            return;
        }

        this.items =
            window.GalleryData.map(
                (item, index) =>
                    this.normalizeItem(
                        item,
                        index
                    )
            );

        console.log(
            `✅ ${this.items.length} Gallery items loaded`
        );

    },

    renderGallery(){

        if(
            !this.grid ||
            !this.emptyState
        ){
            return;
        }

        this.grid.innerHTML =
            "";

        if(
            !Array.isArray(this.items) ||
            this.items.length === 0
        ){

            this.grid.style.display =
                "none";

            this.emptyState.classList.add(
                "visible"
            );

            this.closeViewer();

            return;
        }

        this.grid.style.display =
            "grid";

        this.emptyState.classList.remove(
            "visible"
        );

        this.items.forEach(
            (item, index) => {

                this.grid.appendChild(
                    this.createPolaroid(
                        item,
                        index
                    )
                );

            }
        );

    },

createPolaroid(item, index){

    const card =
        document.createElement("button");

    card.type =
        "button";

    card.className =
        "gallery-polaroid-v2";

    card.dataset.galleryIndex =
        String(index);

    card.style.setProperty(
        "--gallery-rotation",
        item.rotation + "deg"
    );

    card.style.setProperty(
        "--gallery-rope-length",
        item.ropeLength + "px"
    );

    card.style.setProperty(
        "--gallery-rope-x",
        item.ropeX + "%"
    );

    /*
        The card itself no longer rotates.
        Therefore the rope only uses its own tilt.
    */
    card.style.setProperty(
        "--gallery-rope-angle",
        item.ropeTilt + "deg"
    );

    card.style.setProperty(
        "--gallery-clip-x",
        item.clipX + "%"
    );

    card.style.setProperty(
        "--gallery-clip-tilt",
        item.clipTilt + "deg"
    );

    card.style.setProperty(
        "--gallery-float-duration",
        (
            4.7 +
            (index % 4) * 0.42
        ) +
        "s"
    );

    card.setAttribute(
        "aria-label",
        item.caption ||
        `Open memory ${index + 1}`
    );

    const content =
        document.createElement("div");

    content.className =
        "gallery-polaroid-content-v2";

    content.style.animationDelay =
        -(index * 0.32) + "s";

    const imageShell =
        document.createElement("div");

    imageShell.className =
        "gallery-polaroid-image-v2";

    this.renderCardMedia(
        imageShell,
        item,
        index
    );

    const caption =
        document.createElement("span");

    caption.className =
        "gallery-polaroid-caption-v2";

    caption.textContent =
        item.caption ||
        `Little memory ${index + 1}`;

    content.appendChild(
        imageShell
    );

    content.appendChild(
        caption
    );

    card.appendChild(
        content
    );

    return card;

},

    renderCardMedia(
        container,
        item,
        index
    ){

        container.innerHTML =
            "";

        if(item.image){

            const image =
                document.createElement("img");

            image.src =
                item.image;

            image.alt =
                item.caption ||
                `Gallery memory ${index + 1}`;

            image.draggable =
                false;

            image.addEventListener(
                "error",
                () => {

                    container.innerHTML =
                        "";

                    this.createPlaceholderArtwork(
                        container,
                        index
                    );

                },
                {
                    once:true
                }
            );

            container.appendChild(
                image
            );

            return;
        }

        this.createPlaceholderArtwork(
            container,
            index
        );

    },

    createPlaceholderArtwork(
        container,
        index
    ){

        const placeholder =
            document.createElement("div");

        placeholder.className =
            "gallery-placeholder-art-v2";

        const stars =
            document.createElement("div");

        stars.className =
            "gallery-placeholder-stars-v2";

        const starData = [

            {
                left:16,
                top:19,
                delay:0
            },

            {
                left:36,
                top:13,
                delay:.7
            },

            {
                left:84,
                top:22,
                delay:1.2
            },

            {
                left:72,
                top:49,
                delay:.3
            },

            {
                left:22,
                top:57,
                delay:1.6
            }

        ];

        starData.forEach(
            (item, starIndex) => {

                const star =
                    document.createElement("span");

                star.textContent =
                    starIndex % 2 === 0
                        ? "✦"
                        : "✧";

                star.style.left =
                    item.left + "%";

                star.style.top =
                    item.top + "%";

                star.style.animationDelay =
                    (
                        item.delay +
                        index * 0.08
                    ) +
                    "s";

                stars.appendChild(
                    star
                );

            }
        );

        placeholder.appendChild(
            stars
        );

        container.appendChild(
            placeholder
        );

    },

    createViewer(){

        this.viewerOverlay =
            document.createElement("div");

        this.viewerFrame =
            document.createElement("div");

        this.viewerMedia =
            document.createElement("div");

        this.viewerCaption =
            document.createElement("div");

        this.viewerCounter =
            document.createElement("div");

        this.viewerCloseButton =
            document.createElement("button");

        this.previousButton =
            document.createElement("button");

        this.nextButton =
            document.createElement("button");

        this.viewerOverlay.className =
            "gallery-viewer-overlay-v2";

        this.viewerFrame.className =
            "gallery-viewer-frame-v2";

        this.viewerMedia.className =
            "gallery-viewer-media-v2";

        this.viewerCaption.className =
            "gallery-viewer-caption-v2";

        this.viewerCounter.className =
            "gallery-viewer-counter-v2";

        this.viewerCloseButton.className =
            "gallery-viewer-close-v2";

        this.previousButton.className =
            "gallery-viewer-nav-v2 previous";

        this.nextButton.className =
            "gallery-viewer-nav-v2 next";

        this.viewerCloseButton.type =
            "button";

        this.previousButton.type =
            "button";

        this.nextButton.type =
            "button";

        this.viewerCloseButton.textContent =
            "×";

        this.previousButton.textContent =
            "‹";

        this.nextButton.textContent =
            "›";

        this.viewerCloseButton.setAttribute(
            "aria-label",
            "Close photo viewer"
        );

        this.previousButton.setAttribute(
            "aria-label",
            "Previous photo"
        );

        this.nextButton.setAttribute(
            "aria-label",
            "Next photo"
        );

        this.viewerFrame.appendChild(
            this.viewerMedia
        );

        this.viewerFrame.appendChild(
            this.viewerCaption
        );

        this.viewerFrame.appendChild(
            this.viewerCloseButton
        );

        this.viewerFrame.appendChild(
            this.previousButton
        );

        this.viewerFrame.appendChild(
            this.nextButton
        );

        this.viewerFrame.appendChild(
            this.viewerCounter
        );

        this.viewerOverlay.appendChild(
            this.viewerFrame
        );

    },

    openViewer(index){

        if(
            this.items.length === 0
        ){
            return;
        }

        this.currentIndex =
            this.normalizeIndex(index);

        this.viewerOpen =
            true;

        this.renderViewer();

        this.viewerOverlay.classList.add(
            "visible"
        );

        requestAnimationFrame(() => {

            this.viewerCloseButton.focus({
                preventScroll:true
            });

        });

    },

    closeViewer(){

        if(!this.viewerOverlay){
            return;
        }

        this.viewerOpen =
            false;

        this.viewerOverlay.classList.remove(
            "visible"
        );

    },

    renderViewer(){

        if(
            this.items.length === 0
        ){
            return;
        }

        const item =
            this.items[
                this.currentIndex
            ];

        if(!item){
            return;
        }

        this.viewerMedia.innerHTML =
            "";

        if(item.image){

            const image =
                document.createElement("img");

            image.src =
                item.image;

            image.alt =
                item.caption ||
                `Gallery memory ${this.currentIndex + 1}`;

            image.draggable =
                false;

            image.addEventListener(
                "error",
                () => {

                    this.viewerMedia.innerHTML =
                        "";

                    this.renderViewerPlaceholder();

                },
                {
                    once:true
                }
            );

            this.viewerMedia.appendChild(
                image
            );

        }else{

            this.renderViewerPlaceholder();

        }

        this.viewerCaption.textContent =
            item.caption ||
            `Little memory ${this.currentIndex + 1}`;

        this.viewerCounter.textContent =
            `${this.currentIndex + 1} / ${this.items.length}`;

        const onlyOne =
            this.items.length <= 1;

        this.previousButton.classList.toggle(
            "disabled",
            onlyOne
        );

        this.nextButton.classList.toggle(
            "disabled",
            onlyOne
        );

    },

    renderViewerPlaceholder(){

        const placeholder =
            document.createElement("div");

        placeholder.className =
            "gallery-viewer-placeholder-v2";

        placeholder.textContent =
            "♡";

        this.viewerMedia.appendChild(
            placeholder
        );

    },

    showPrevious(){

        if(
            this.items.length <= 1
        ){
            return;
        }

        this.currentIndex =
            this.normalizeIndex(
                this.currentIndex - 1
            );

        this.renderViewer();

    },

    showNext(){

        if(
            this.items.length <= 1
        ){
            return;
        }

        this.currentIndex =
            this.normalizeIndex(
                this.currentIndex + 1
            );

        this.renderViewer();

    },

    normalizeIndex(index){

        const length =
            this.items.length;

        if(length <= 0){
            return 0;
        }

        return (
            (
                Number(index) %
                length
            ) +
            length
        ) %
        length;

    },

    bindEvents(){

        this.closeButton.addEventListener(
            "click",
            () => {

                this.close();

            }
        );

        this.overlay.addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    this.overlay
                ){

                    this.close();

                }

            }
        );

        this.grid.addEventListener(
            "click",
            event => {

                const card =
                    event.target.closest(
                        "[data-gallery-index]"
                    );

                if(!card){
                    return;
                }

                this.openViewer(
                    Number(
                        card.dataset
                            .galleryIndex
                    )
                );

            }
        );

        this.viewerCloseButton.addEventListener(
            "click",
            () => {

                this.closeViewer();

            }
        );

        this.previousButton.addEventListener(
            "click",
            () => {

                this.showPrevious();

            }
        );

        this.nextButton.addEventListener(
            "click",
            () => {

                this.showNext();

            }
        );

        this.secretStarButton.addEventListener(
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

                this.closeSecretMemory();

            }
        );

        this.secretOverlay.addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    this.secretOverlay
                ){

                    this.closeSecretMemory();

                }

            }
        );

        this.viewerOverlay.addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    this.viewerOverlay
                ){

                    this.closeViewer();

                }

            }
        );

        document.addEventListener(
            "keydown",
            event => {

                if(!this.isOpen){
                    return;
                }

                if(
                    event.key ===
                    "Escape"
                ){

                    if(this.secretOpen){

                        this.closeSecretMemory();

                    }else if(this.viewerOpen){

                        this.closeViewer();

                    }else{

                        this.close();

                    }

                    return;
                }

                if(!this.viewerOpen){
                    return;
                }

                if(
                    event.key ===
                    "ArrowLeft"
                ){

                    this.showPrevious();

                    return;
                }

                if(
                    event.key ===
                    "ArrowRight"
                ){

                    this.showNext();

                }

            }
        );

    },


    bindGalleryObject(){

        const galleryObject =
            document.getElementById(
                "galleryContainer"
            );

        if(!galleryObject){

            console.warn(
                "⚠️ galleryContainer not found"
            );

            return;
        }

        if(
            galleryObject.dataset
                .galleryPanelBound ===
            "true"
        ){
            return;
        }

        galleryObject.dataset
            .galleryPanelBound =
            "true";

        galleryObject.style.pointerEvents =
            "auto";

        galleryObject.style.cursor =
            "pointer";

        galleryObject.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                if(
                    typeof event
                        .stopImmediatePropagation ===
                    "function"
                ){

                    event.stopImmediatePropagation();

                }

                this.open();

            },
            true
        );

        console.log(
            "✅ Gallery object connected to GalleryPanel"
        );

    },

    open(){

        if(!this.initialized){
            this.create();
        }

        if(this.isOpen){
            return;
        }

        this.lastFocusedElement =
            document.activeElement;

        this.isOpen =
            true;

        this.overlay.classList.add(
            "gallery-visible-v2"
        );

        this.overlay.setAttribute(
            "aria-hidden",
            "false"
        );

        requestAnimationFrame(() => {

            this.closeButton.focus({
                preventScroll:true
            });

        });

    },

    close(){

        if(
            !this.initialized ||
            !this.isOpen
        ){
            return;
        }

        this.closeViewer();
        this.closeSecretMemory();

        this.isOpen =
            false;

        this.overlay.classList.remove(
            "gallery-visible-v2"
        );

        this.overlay.setAttribute(
            "aria-hidden",
            "true"
        );

        if(
            this.lastFocusedElement &&
            typeof this.lastFocusedElement
                .focus ===
            "function"
        ){

            try{

                this.lastFocusedElement.focus({
                    preventScroll:true
                });

            }catch(error){}

        }

    },

    setItems(items){

        if(!Array.isArray(items)){

            console.warn(
                "GalleryPanel.setItems expects an array"
            );

            return;
        }

        this.items =
            items.map(
                (item, index) =>
                    this.normalizeItem(
                        item,
                        index
                    )
            );

        this.currentIndex =
            0;

        if(this.initialized){
            this.renderGallery();
        }

    },

    clearItems(){

        this.setItems([]);

    },

    destroy(){

        if(this.overlay){
            this.overlay.remove();
        }

        const style =
            document.getElementById(
                "galleryPanelV3Styles"
            );

        if(style){
            style.remove();
        }

        this.overlay = null;
        this.panel = null;
        this.stage = null;
        this.grid = null;
        this.emptyState = null;

        this.viewerOverlay = null;
        this.viewerFrame = null;
        this.viewerMedia = null;
        this.viewerCaption = null;
        this.viewerCounter = null;

        this.closeButton = null;
        this.viewerCloseButton = null;
        this.previousButton = null;
        this.nextButton = null;

        this.secretStarButton = null;
        this.secretOverlay = null;
        this.secretFrame = null;
        this.secretMedia = null;
        this.secretCaption = null;
        this.secretCloseButton = null;
        this.secretEffectsLayer = null;


        this.items = [];
        this.currentIndex = 0;

        this.initialized = false;
        this.isOpen = false;
        this.viewerOpen = false;

        this.secretClickCount = 0;
        this.secretOpen = false;
        this.secretUnlockPending = false;

    }

};

window.GalleryPanel = GalleryPanel;