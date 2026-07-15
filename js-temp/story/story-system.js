/*==================================================
BANIN UNIVERSE
STORY BOOK SYSTEM
Linear Romantic Story Version
==================================================*/

"use strict";

const StoryBookSystem = {

    initialized:false,
    isOpen:false,
    isAnimating:false,

    overlay:null,
    stage:null,
    closedBook:null,
    realBook:null,
    bookBody:null,
    leftPage:null,
    rightPage:null,
    flipPage:null,
    closeButton:null,
    prevButton:null,
    nextButton:null,
    pageCounter:null,

    currentSpreadIndex:0,
    totalSpreads:0,
    openingTimer:null,
    

    create(){
        if(this.initialized) return;

        if(typeof StoryBookPages === "undefined"){
            console.warn("❌ StoryBookPages not found. Load js/story/story-pages.js before story-system.js.");
            return;
        }

        console.log("📖 StoryBookSystem linear create() called");

        this.totalSpreads = Math.ceil(this.getTotalPages() / 2);

        this.injectStyles();
        this.preloadStoryBackgrounds();
        this.buildOverlay();
        this.bindStoryBookObject();

        this.initialized = true;

        console.log("✅ Linear Story Book ready");
    },

    getTotalPages(){
        return Number(
            StoryBookPages?.settings?.totalPages ||
            StoryBookPages?.pages?.length ||
            22
        );
    },

    getClosedBookDuration(){
        return Number(
            StoryBookPages?.settings?.intro?.closedBookDuration ||
            2400
        );
    },

    getTransitionDuration(){
        return Number(
            StoryBookPages?.settings?.transition?.duration ||
            750
        );
    },

    getCoverArtwork(){
        return (
            StoryBookPages?.settings?.intro?.coverArtwork ||
            "assets/story/backgrounds/page-01.webp"
        );
    },


    injectStyles(){
        const oldStyle = document.getElementById("storyBookSystemLinearStyles");
        if(oldStyle) oldStyle.remove();

        const legacyStyle = document.getElementById("storyBookSystemV2Styles");
        if(legacyStyle) legacyStyle.remove();

        const style = document.createElement("style");
        style.id = "storyBookSystemLinearStyles";

        style.textContent = `
            @font-face{
                font-family:"BaninDream";
                src:url("assets/fonts/banin-dream.woff2") format("woff2");
                font-weight:400;
                font-style:normal;
                font-display:swap;
            }

            /*==================================================
            OVERLAY
            ==================================================*/

            #storyBookOverlayV2{
                position:fixed;
                inset:0;
                display:none;
                align-items:center;
                justify-content:center;
                opacity:0;
                pointer-events:none;
                z-index:999999;
                background:
                    radial-gradient(circle at 50% 44%, rgba(48,26,82,.50), rgba(5,4,14,.90));
                backdrop-filter:blur(8px);
                -webkit-backdrop-filter:blur(8px);
                transition:
                    opacity .55s ease,
                    transform .55s ease;
            }

            #storyBookOverlayV2.story-open{
                display:flex;
                opacity:1;
                pointer-events:auto;
            }

            #storyBookOverlayV2.story-closing{
                opacity:0;
                transform:scale(.985);
                pointer-events:none;
            }

            .story-stage-v2{
                position:relative;
                width:min(1520px,99vw);
                height:min(960px,97vh);
                perspective:2100px;
                transform-style:preserve-3d;
            }

            /*==================================================
            CLOSE BUTTON - DARK PURPLE GOLD UI
            ==================================================*/

            .story-close-v2{
                position:absolute;
                right:34px;
                top:40px;
                width:46px;
                height:54px;
                border:none;
                outline:none;
                cursor:pointer;
                z-index:260;
                color:rgba(255,222,155,.98);
                font-family:"BaninDream","Cinzel","Georgia",serif;
                font-size:28px;
                line-height:46px;
                font-weight:900;
                background:
                    linear-gradient(145deg, rgba(48,24,64,.98), rgba(14,10,28,.98));
                clip-path:polygon(0 0, 100% 0, 100% 78%, 50% 100%, 0 78%);
                box-shadow:
                    inset 0 0 0 1px rgba(255,224,150,.38),
                    inset 0 0 22px rgba(255,195,115,.08),
                    0 0 20px rgba(228,174,102,.18),
                    0 12px 24px rgba(0,0,0,.38);
                transition:
                    transform .22s ease,
                    filter .22s ease;
            }

            .story-close-v2::before{
                content:"";
                position:absolute;
                inset:5px;
                clip-path:polygon(0 0, 100% 0, 100% 76%, 50% 100%, 0 76%);
                border:1px solid rgba(228,174,102,.62);
                pointer-events:none;
            }

            .story-close-v2:hover{
                transform:translateY(-1px) scale(1.045);
                filter:brightness(1.12);
            }

            /*==================================================
            CLOSED BOOK INTRO
            ==================================================*/

            .story-closed-book-v2{
                position:absolute;
                left:50%;
                top:50%;
                width:390px;
                height:560px;
                opacity:0;
                display:none;
                z-index:50;
                transform:
                    translate(-50%,-50%)
                    translateY(28px)
                    scale(.84)
                    rotateY(-10deg);
                transform-style:preserve-3d;
                transition:
                    opacity 1.15s ease,
                    transform 1.45s cubic-bezier(.2,.9,.2,1);
                filter:drop-shadow(0 34px 55px rgba(0,0,0,.55));
                pointer-events:none;
            }

            .story-closed-book-v2.visible{
                display:block;
                opacity:1;
                transform:
                    translate(-50%,-50%)
                    translateY(0)
                    scale(1)
                    rotateY(-10deg);
            }

            .story-closed-book-v2.opening{
                opacity:0;
                transform:
                    translate(-50%,-50%)
                    scale(.94)
                    rotateY(-68deg)
                    rotateX(5deg);
            }

            .story-book-cover-v2{
                position:absolute;
                inset:0;
                border-radius:30px 22px 22px 30px;
                background:
                    radial-gradient(circle at 50% 35%, rgba(255,190,110,.16), transparent 30%),
                    linear-gradient(135deg, rgba(70,28,96,.98), rgba(24,13,50,.99), rgba(92,36,108,.98));
                border:2px solid rgba(255,216,145,.58);
                box-shadow:
                    inset 0 0 34px rgba(255,205,160,.13),
                    inset 18px 0 20px rgba(10,4,22,.35),
                    0 0 42px rgba(190,110,255,.22);
                overflow:hidden;
                transform-style:preserve-3d;
            }

            .story-book-cover-art-v2{
                position:absolute;
                inset:0;
                background-size:100% 100%;
                background-position:center center;
                background-repeat:no-repeat;
                z-index:1;
                filter:saturate(1.08) contrast(1.04) brightness(.96);
                transform:translateZ(1px);
            }

            .story-book-cover-v2::before{
                content:"";
                position:absolute;
                inset:20px;
                border:1px solid rgba(255,220,150,.50);
                border-radius:24px;
                box-shadow:
                    inset 0 0 22px rgba(255,180,130,.11),
                    0 0 22px rgba(255,180,120,.13);
                z-index:4;
                pointer-events:none;
            }

            .story-book-cover-v2::after{
                content:"";
                position:absolute;
                inset:0;
                background:
                    radial-gradient(circle at 50% 40%, rgba(255,220,150,.18), transparent 28%),
                    linear-gradient(to bottom, rgba(5,3,12,.12), transparent 40%, rgba(4,3,10,.34));
                z-index:3;
                pointer-events:none;
            }

            .story-book-title-v2{
                position:absolute;
                left:50%;
                top:58%;
                transform:translateX(-50%) translateZ(5px);
                z-index:6;
                font-family:"BaninDream","Cinzel","Georgia",serif;
                font-size:30px;
                font-weight:900;
                color:rgba(255,234,210,.96);
                text-shadow:
                    0 0 14px rgba(255,180,130,.68),
                    0 0 30px rgba(120,70,255,.35);
                white-space:nowrap;
                pointer-events:none;
            }

            .story-book-spine-closed-v2{
                position:absolute;
                left:-23px;
                top:18px;
                width:42px;
                height:calc(100% - 36px);
                border-radius:22px 5px 5px 22px;
                background:linear-gradient(to right, rgba(14,8,32,.98), rgba(88,38,112,.96));
                border:1px solid rgba(255,215,155,.34);
                box-shadow:
                    inset -7px 0 14px rgba(255,220,170,.10),
                    0 16px 32px rgba(0,0,0,.40);
                z-index:-1;
            }

            .story-book-pages-closed-v2{
                position:absolute;
                right:-28px;
                top:30px;
                width:42px;
                height:calc(100% - 60px);
                border-radius:0 20px 20px 0;
                background:
                    repeating-linear-gradient(
                        to bottom,
                        rgba(118,75,80,.32) 0px,
                        rgba(118,75,80,.32) 1px,
                        transparent 2px,
                        transparent 7px
                    ),
                    linear-gradient(to right, rgba(248,226,195,.96), rgba(178,136,118,.94));
                border:1px solid rgba(255,238,210,.36);
                box-shadow:
                    inset 9px 0 13px rgba(0,0,0,.22),
                    0 16px 28px rgba(0,0,0,.32);
                z-index:-2;
            }

            /*==================================================
            OPEN BOOK BASE
            ==================================================*/

            .story-real-book-v2{
                position:absolute;
                inset:0;
                opacity:0;
                display:none;
                transform:translateY(24px) scale(.94);
                transition:
                    opacity .95s ease,
                    transform .95s cubic-bezier(.2,.9,.2,1);
                transform-style:preserve-3d;
            }

            .story-real-book-v2.visible{
                display:block;
                opacity:1;
                transform:translateY(0) scale(1);
            }

            .story-real-book-v2::before{
                content:"";
                position:absolute;
                left:50%;
                top:calc(52% + min(445px, 46.5vh));
                width:min(1320px, 88vw);
                height:72px;
                transform:translateX(-50%);
                border-radius:50%;
                background:
                    radial-gradient(
                        ellipse at center,
                        rgba(0,0,0,.54) 0%,
                        rgba(0,0,0,.34) 38%,
                        rgba(0,0,0,.16) 62%,
                        transparent 76%
                    );
                filter:blur(12px);
                opacity:.78;
                pointer-events:none;
                z-index:-1;
            }

            .story-book-body-v2{
                position:absolute;
                left:50%;
                top:52%;
                width:min(1460px,98vw);
                height:min(890px,93vh);
                transform:translate(-50%,-50%);
                border-radius:36px;
                background:linear-gradient(135deg, rgba(48,24,66,.97), rgba(18,11,34,.98));
                border:2px solid rgba(255,216,150,.44);
                box-shadow:
                    0 42px 110px rgba(0,0,0,.76),
                    0 18px 36px rgba(0,0,0,.46),
                    inset 0 0 34px rgba(255,220,175,.11),
                    0 0 62px rgba(190,115,255,.22);
                overflow:hidden;
                transform-style:preserve-3d;
            }

            .story-book-body-v2::before{
                content:"";
                position:absolute;
                left:50%;
                top:22px;
                bottom:22px;
                width:30px;
                transform:translateX(-50%);
                border-radius:999px;
                background:
                    linear-gradient(
                        to right,
                        rgba(0,0,0,.46),
                        rgba(255,232,188,.12),
                        rgba(0,0,0,.42)
                    );
                box-shadow:
                    0 0 25px rgba(0,0,0,.45),
                    inset 0 0 18px rgba(255,220,170,.08);
                z-index:30;
                pointer-events:none;
            }

            .story-book-body-v2::after{
                content:"";
                position:absolute;
                inset:18px;
                border-radius:28px;
                border:1px solid rgba(255,230,170,.16);
                box-shadow:
                    inset 0 0 24px rgba(255,210,155,.08),
                    inset 0 0 80px rgba(0,0,0,.18);
                pointer-events:none;
                z-index:32;
            }

            .story-page-stack-v2{
                position:absolute;
                top:48px;
                bottom:42px;
                width:34px;
                background:
                    repeating-linear-gradient(
                        to bottom,
                        rgba(255,238,210,.52) 0px,
                        rgba(255,238,210,.52) 1px,
                        rgba(126,86,82,.30) 2px,
                        transparent 7px
                    ),
                    linear-gradient(to right, rgba(128,82,76,.72), rgba(252,231,202,.95), rgba(184,136,112,.88));
                border:1px solid rgba(255,238,210,.26);
                z-index:4;
                opacity:.95;
                pointer-events:none;
            }

            .story-page-stack-v2.left{
                left:14px;
                border-radius:18px 5px 5px 18px;
                box-shadow:inset -10px 0 18px rgba(0,0,0,.28), 7px 0 16px rgba(0,0,0,.18);
            }

            .story-page-stack-v2.right{
                right:14px;
                border-radius:5px 18px 18px 5px;
                transform:scaleX(-1);
                box-shadow:inset -10px 0 18px rgba(0,0,0,.28), 7px 0 16px rgba(0,0,0,.18);
            }

            /*==================================================
            PAGE BASE
            ==================================================*/

            .story-page-v2{
                position:absolute;
                top:34px;
                bottom:34px;
                width:calc(50% - 44px);
                background:
                    radial-gradient(circle at 50% 24%, rgba(255,224,168,.08), transparent 38%),
                    linear-gradient(145deg, rgba(30,16,40,.98), rgba(8,6,18,.99));
                overflow:hidden;
                z-index:10;
                box-shadow:
                    inset 0 0 24px rgba(90,48,32,.14),
                    0 20px 40px rgba(0,0,0,.24);
                transition:filter .35s ease, transform .35s ease;
            }

            .story-page-v2.left{
                left:42px;
                border-radius:30px 10px 10px 30px;
                transform-origin:right center;
            }

            .story-page-v2.right{
                right:42px;
                border-radius:10px 30px 30px 10px;
                transform-origin:left center;
            }

            .story-page-v2::before{
                content:"";
                position:absolute;
                inset:0;
                background:
                    repeating-linear-gradient(
                        to bottom,
                        rgba(94,58,54,.035) 0px,
                        rgba(94,58,54,.035) 1px,
                        transparent 3px,
                        transparent 9px
                    ),
                    radial-gradient(circle at 20% 20%, rgba(255,255,255,.10), transparent 25%),
                    radial-gradient(circle at 80% 70%, rgba(120,65,48,.08), transparent 30%);
                mix-blend-mode:multiply;
                z-index:2;
                pointer-events:none;
            }

            .story-page-v2.left::after,
            .story-page-v2.right::after{
                content:"";
                position:absolute;
                top:0;
                width:38px;
                height:100%;
                z-index:5;
                pointer-events:none;
            }

            .story-page-v2.left::after{
                right:0;
                background:linear-gradient(to left, rgba(0,0,0,.28), transparent);
            }

            .story-page-v2.right::after{
                left:0;
                background:linear-gradient(to right, rgba(0,0,0,.28), transparent);
            }

            .story-page-art-shell-v2{
                position:absolute;
                inset:11px;
                border-radius:24px;
                overflow:hidden;
                z-index:1;
                pointer-events:none;
                background:
                    radial-gradient(circle at 50% 18%, rgba(255,224,170,.08), transparent 34%),
                    linear-gradient(145deg, rgba(18,10,28,.96), rgba(7,6,15,.99));
                border:1px solid rgba(224,172,102,.64);
                box-shadow:
                    inset 0 0 0 1px rgba(255,236,185,.10),
                    inset 0 0 76px rgba(0,0,0,.40),
                    0 0 26px rgba(224,172,102,.14),
                    0 16px 32px rgba(0,0,0,.26);
            }

            .story-page-v2.left .story-page-art-shell-v2{
                box-shadow:
                    inset -42px 0 62px rgba(0,0,0,.32),
                    inset 0 0 52px rgba(0,0,0,.26),
                    0 0 18px rgba(218,164,96,.10);
            }

            .story-page-v2.right .story-page-art-shell-v2{
                box-shadow:
                    inset 42px 0 62px rgba(0,0,0,.32),
                    inset 0 0 52px rgba(0,0,0,.26),
                    0 0 18px rgba(218,164,96,.10);
            }

            .story-page-art-shell-v2::before{
                content:"";
                position:absolute;
                inset:8px;
                border-radius:17px;
                border:1px solid rgba(218,164,96,.28);
                box-shadow:
                    inset 0 0 20px rgba(255,210,140,.05),
                    0 0 14px rgba(218,164,96,.08);
                z-index:5;
                pointer-events:none;
            }

            .story-page-art-shell-v2::after{
                content:"";
                position:absolute;
                inset:0;
                background:
                    radial-gradient(circle at 50% 18%, rgba(255,228,175,.08), transparent 34%),
                    linear-gradient(to bottom, rgba(5,4,12,.04) 0%, rgba(5,4,12,.16) 48%, rgba(5,4,12,.56) 100%);
                z-index:4;
                pointer-events:none;
            }

            .story-page-bg-v2{
                position:absolute;
                inset:0;
                border-radius:0;
                background-size:100% 100%;
                background-position:center center;
                background-repeat:no-repeat;
                z-index:1;
                overflow:hidden;
                pointer-events:none;
                filter:saturate(1.08) contrast(1.04) brightness(.96);
                transform:none;
                transition:filter .8s ease;
            }

            .story-page-v2.panel-visible .story-page-bg-v2{
                filter:saturate(1.1) contrast(1.05) brightness(.99);
            }

            .story-page-art-corner-v2{
                position:absolute;
                width:42px;
                height:42px;
                z-index:8;
                pointer-events:none;
            }

            .story-page-art-corner-v2::before,
            .story-page-art-corner-v2::after{
                content:"";
                position:absolute;
                left:0;
                top:0;
                background:rgba(218,164,96,.86);
                box-shadow:
                    0 0 8px rgba(218,164,96,.46),
                    0 0 18px rgba(218,164,96,.16);
            }

            .story-page-art-corner-v2::before{
                width:34px;
                height:1px;
            }

            .story-page-art-corner-v2::after{
                width:1px;
                height:34px;
            }

            .story-page-art-corner-v2.tl{left:16px;top:16px;}
            .story-page-art-corner-v2.tr{right:16px;top:16px;transform:scaleX(-1);}
            .story-page-art-corner-v2.bl{left:16px;bottom:16px;transform:scaleY(-1);}
            .story-page-art-corner-v2.br{right:16px;bottom:16px;transform:scale(-1);}

            /*==================================================
            TEXT PANEL + NARRATOR
            ==================================================*/

            .story-text-panel-v2{
                position:absolute;
                left:50%;
                bottom:48px;
                width:84%;
                min-height:150px;
                box-sizing:border-box;
                transform:translateX(-50%) translateY(14px);
                opacity:0;
                padding:42px 34px 24px;
                border-radius:10px;
                background:
                    radial-gradient(circle at 50% 0%, rgba(224,172,102,.10), transparent 42%),
                    linear-gradient(145deg, rgba(8,6,16,.90), rgba(22,12,32,.82), rgba(8,6,16,.94));
                border:1px solid rgba(224,172,102,.82);
                box-shadow:
                    0 19px 48px rgba(0,0,0,.56),
                    inset 0 0 0 1px rgba(255,236,185,.09),
                    inset 0 0 24px rgba(224,172,102,.05),
                    0 0 26px rgba(224,172,102,.16);
                backdrop-filter:blur(6px);
                -webkit-backdrop-filter:blur(6px);
                z-index:40;
                direction:ltr;
                text-align:center;
                transition:
                    opacity .85s ease .15s,
                    transform .85s ease .15s;
                overflow:visible;
                pointer-events:auto;
            }

            .story-page-v2.panel-visible .story-text-panel-v2{
                opacity:1;
                transform:translateX(-50%) translateY(0);
            }

            .story-narrator-badge-v2{
                position:absolute;
                left:18px;
                top:-29px;
                width:140px;
                height:31px;
                box-sizing:border-box;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:0 12px;
                border-radius:6px;
                background:
                    linear-gradient(145deg, rgba(18,11,28,.98), rgba(7,6,16,.98));
                border:1px solid rgba(224,172,102,.88);
                color:rgba(245,210,152,.98);
                font-family:"BaninDream","Cinzel","Georgia",serif;
                font-size:13px;
                line-height:1;
                font-weight:900;
                letter-spacing:1px;
                text-shadow:0 0 9px rgba(255,190,120,.52);
                box-shadow:
                    inset 0 0 0 1px rgba(255,232,170,.08),
                    0 7px 16px rgba(0,0,0,.38),
                    0 0 16px rgba(228,174,102,.18);
                white-space:nowrap;
                z-index:120;
                pointer-events:none;
            }

            .story-text-v2{
                margin:0;
                padding:0;
                min-height:0;
                max-height:122px;
                overflow-y:auto;
                overflow-x:hidden;
                color:rgba(255,242,222,.96);
                text-shadow:
                    0 0 9px rgba(0,0,0,.78),
                    0 0 18px rgba(0,0,0,.45);
            }

            .story-text-headline-v2{
                display:block;
                margin:0 0 12px;
                font-family:"BaninDream","Cinzel","Cormorant Garamond","Georgia",serif;
                font-size:18px;
                line-height:1.25;
                font-weight:900;
                letter-spacing:.8px;
                color:rgba(245,204,135,.98);
                text-shadow:
                    0 0 10px rgba(224,172,102,.36),
                    0 0 20px rgba(0,0,0,.62);
            }

            .story-text-body-v2{
                display:block;
                margin:0;
                font-family:"Vazirmatn","Estedad","Shabnam","Segoe UI",sans-serif;
                font-size:15.5px;
                line-height:1.8;
                font-weight:600;
                color:rgba(255,242,222,.96);
                direction:rtl;
                text-align:center;
            }

            .story-text-v2::-webkit-scrollbar{
                width:4px;
            }

            .story-text-v2::-webkit-scrollbar-track{
                background:rgba(255,220,160,.06);
                border-radius:999px;
            }

            .story-text-v2::-webkit-scrollbar-thumb{
                background:rgba(224,172,102,.48);
                border-radius:999px;
            }

            .story-panel-corner-v2{
                position:absolute;
                width:38px;
                height:38px;
                pointer-events:none;
                z-index:3;
            }

            .story-panel-corner-v2::before,
            .story-panel-corner-v2::after{
                content:"";
                position:absolute;
                left:0;
                top:0;
                border-radius:8px;
                background:rgba(224,172,102,.98);
                box-shadow:
                    0 0 9px rgba(224,172,102,.54),
                    0 0 18px rgba(224,172,102,.18);
            }

            .story-panel-corner-v2::before{
                width:30px;
                height:2px;
            }

            .story-panel-corner-v2::after{
                width:2px;
                height:30px;
            }

            .story-panel-corner-v2.tl{left:12px;top:12px;}
            .story-panel-corner-v2.tr{right:12px;top:12px;transform:scaleX(-1);}
            .story-panel-corner-v2.bl{left:12px;bottom:12px;transform:scaleY(-1);}
            .story-panel-corner-v2.br{right:12px;bottom:12px;transform:scale(-1);}

            /*==================================================
            PAGE 22 SKY NAME
            ==================================================*/

            .story-sky-name-v2{
                position:absolute;
                left:50%;
                top:13%;
                transform:translateX(-50%) rotate(-2deg);
                z-index:6;
                font-family:"BaninDream","Cinzel","Georgia",serif;
                font-size:56px;
                line-height:1;
                font-weight:900;
                letter-spacing:5px;
                color:rgba(255,228,170,.94);
                text-shadow:
                    0 0 12px rgba(255,216,150,.95),
                    0 0 28px rgba(255,180,120,.66),
                    0 0 54px rgba(170,110,255,.52);
                opacity:.92;
                pointer-events:none;
                mix-blend-mode:screen;
            }

            .story-sky-name-v2::before,
            .story-sky-name-v2::after{
                content:"✦";
                position:absolute;
                top:50%;
                transform:translateY(-50%);
                font-size:20px;
                color:rgba(255,228,170,.88);
                text-shadow:0 0 18px rgba(255,216,150,.78);
            }

            .story-sky-name-v2::before{left:-34px;}
            .story-sky-name-v2::after{right:-34px;}

            /*==================================================
            NAV + COUNTER + EDGE TURN ZONES
            ==================================================*/

            .story-nav-v2{
                position:absolute;
                top:50%;
                width:40px;
                height:38px;
                border:none;
                outline:none;
                cursor:pointer;
                z-index:170;
                color:rgba(238,190,115,.98);
                font-family:"BaninDream","Cinzel","Georgia",serif;
                font-size:26px;
                font-weight:900;
                line-height:32px;
                background:
                    linear-gradient(145deg, rgba(38,21,54,.98), rgba(10,8,20,.98));
                border:1px solid rgba(228,174,102,.82);
                border-radius:7px;
                box-shadow:
                    inset 0 0 0 1px rgba(255,232,170,.10),
                    inset 0 0 18px rgba(255,190,110,.05),
                    0 0 18px rgba(228,174,102,.15),
                    0 10px 22px rgba(0,0,0,.34);
                transition:
                    opacity .25s ease,
                    filter .25s ease,
                    transform .25s ease;
                pointer-events:auto;
            }

            .story-nav-v2::before{
                content:"";
                position:absolute;
                inset:6px;
                border:1px solid rgba(228,174,102,.42);
                border-radius:4px;
                pointer-events:none;
            }

            .story-nav-v2.prev{
                left:38px;
                transform:translateY(-50%);
            }

            .story-nav-v2.next{
                right:38px;
                transform:translateY(-50%);
            }

            .story-nav-v2:hover{
                filter:brightness(1.12);
            }

            .story-nav-v2.prev:hover{
                transform:translateY(-50%) translateX(-2px);
            }

            .story-nav-v2.next:hover{
                transform:translateY(-50%) translateX(2px);
            }

            .story-nav-v2.disabled{
                opacity:.24;
                pointer-events:none;
            }

            .story-counter-v2{
                position:absolute;
                left:50%;
                bottom:16px;
                transform:translateX(-50%);
                min-width:172px;
                padding:9px 26px;
                border-radius:7px;
                text-align:center;
                border:1px solid rgba(228,174,102,.76);
                background:
                    linear-gradient(145deg, rgba(20,13,30,.94), rgba(8,7,17,.96));
                color:rgba(232,188,118,.98);
                font-family:"BaninDream","Cinzel","Georgia",serif;
                font-size:15px;
                font-weight:900;
                letter-spacing:2px;
                text-shadow:0 0 8px rgba(255,180,120,.36);
                z-index:165;
                backdrop-filter:blur(6px);
                pointer-events:none;
                box-shadow:
                    inset 0 0 0 1px rgba(255,232,170,.10),
                    inset 0 0 16px rgba(255,190,110,.05),
                    0 0 18px rgba(228,174,102,.14),
                    0 9px 20px rgba(0,0,0,.30);
            }

            .story-counter-v2::before{
                content:"";
                position:absolute;
                inset:6px;
                border:1px solid rgba(228,174,102,.36);
                border-radius:4px;
                pointer-events:none;
            }

            .story-page-turn-zone-v2{
                position:absolute;
                top:82px;
                bottom:74px;
                width:82px;
                border:none;
                outline:none;
                background:transparent;
                z-index:150;
                cursor:pointer;
                pointer-events:auto;
                opacity:0;
                transition:
                    opacity .28s ease,
                    transform .28s ease,
                    filter .28s ease;
            }

            .story-page-turn-zone-v2.left{
                left:44px;
                border-radius:28px 8px 8px 28px;
            }

            .story-page-turn-zone-v2.right{
                right:44px;
                border-radius:8px 28px 28px 8px;
            }

            .story-page-turn-zone-v2::before{
                content:"";
                position:absolute;
                top:9%;
                bottom:9%;
                width:28px;
                border-radius:999px;
                background:
                    linear-gradient(
                        to bottom,
                        transparent,
                        rgba(255,226,160,.20),
                        rgba(255,190,120,.34),
                        rgba(255,226,160,.20),
                        transparent
                    );
                filter:blur(.2px);
                box-shadow:
                    0 0 18px rgba(255,190,120,.18),
                    0 0 28px rgba(190,115,255,.10);
            }

            .story-page-turn-zone-v2.left::before{
                left:8px;
            }

            .story-page-turn-zone-v2.right::before{
                right:8px;
            }

            .story-page-turn-zone-v2:hover{
                opacity:1;
                filter:brightness(1.12);
            }

            .story-page-turn-zone-v2.left:hover{
                transform:translateX(-2px);
            }

            .story-page-turn-zone-v2.right:hover{
                transform:translateX(2px);
            }

            .story-page-turn-zone-v2::after{
                position:absolute;
                top:50%;
                transform:translateY(-50%);
                font-family:"BaninDream","Cinzel","Georgia",serif;
                font-size:34px;
                font-weight:900;
                color:rgba(255,238,210,.82);
                text-shadow:
                    0 0 12px rgba(255,190,120,.55),
                    0 0 22px rgba(190,115,255,.20);
            }

            .story-page-turn-zone-v2.left::after{
                content:"‹";
                left:18px;
            }

            .story-page-turn-zone-v2.right::after{
                content:"›";
                right:18px;
            }

            .story-page-turn-zone-v2.disabled{
                opacity:0 !important;
                pointer-events:none !important;
                cursor:default !important;
            }

            .story-page-turn-zone-v2.disabled::before,
            .story-page-turn-zone-v2.disabled::after{
                opacity:0 !important;
            }

            /*==================================================
            PAGE FLIP
            ==================================================*/

            .story-flip-page-v2{
                position:absolute;
                top:34px;
                bottom:34px;
                width:calc(50% - 44px);
                opacity:0;
                pointer-events:none !important;
                z-index:120;
                transform-style:preserve-3d;
                backface-visibility:visible;
                will-change:transform, opacity;
                contain:layout paint;
                transform:translate3d(0,0,0);
            }

            .story-flip-page-v2.next{
                left:calc(50% + 2px);
                right:auto;
                border-radius:10px 30px 30px 10px;
                transform-origin:0% 50%;
                transform:rotateY(0deg) translateZ(18px);
            }

            .story-flip-page-v2.prev{
                right:calc(50% + 2px);
                left:auto;
                border-radius:30px 10px 10px 30px;
                transform-origin:100% 50%;
                transform:rotateY(0deg) translateZ(18px);
            }

            .story-flip-face-v2{
                position:absolute;
                inset:0;
                border-radius:inherit;
                overflow:hidden;
                backface-visibility:hidden;
                background-size:100% 100%;
                background-position:center center;
                background-repeat:no-repeat;
                transform-style:preserve-3d;
                box-shadow:
                    inset 0 0 25px rgba(90,48,32,.16),
                    inset 40px 0 70px rgba(255,236,205,.12),
                    inset -36px 0 70px rgba(0,0,0,.24);
            }

            .story-flip-front-v2::before,
            .story-flip-back-v2::before{
                content:"";
                position:absolute;
                inset:0;
                background:
                    repeating-linear-gradient(
                        to bottom,
                        rgba(255,255,255,.035) 0px,
                        rgba(255,255,255,.035) 1px,
                        transparent 3px,
                        transparent 8px
                    ),
                    radial-gradient(circle at 28% 18%, rgba(255,255,255,.18), transparent 28%),
                    radial-gradient(circle at 74% 82%, rgba(80,42,30,.14), transparent 34%);
                mix-blend-mode:soft-light;
                pointer-events:none;
                z-index:2;
            }

            .story-flip-front-v2::after,
            .story-flip-back-v2::after{
                content:"";
                position:absolute;
                inset:0;
                background:
                    linear-gradient(
                        90deg,
                        rgba(0,0,0,.26),
                        transparent 18%,
                        rgba(255,245,220,.16) 50%,
                        transparent 76%,
                        rgba(0,0,0,.22)
                    );
                pointer-events:none;
                z-index:3;
                opacity:.55;
            }

            .story-flip-back-v2{
                transform:rotateY(180deg);
            }

            .story-flip-curl-v2{
                position:absolute;
                inset:0;
                background:linear-gradient(to right, transparent 0%, rgba(255,245,218,.24) 48%, rgba(0,0,0,.22) 100%);
                mix-blend-mode:soft-light;
                pointer-events:none;
                z-index:4;
                opacity:.25;
                transform:translateX(0) scaleX(.75);
                transform-origin:right center;
            }

            .story-flip-page-v2.prev .story-flip-curl-v2{
                background:linear-gradient(to left, transparent 0%, rgba(255,245,218,.24) 48%, rgba(0,0,0,.22) 100%);
                transform-origin:left center;
            }

            .story-flip-edge-v2{
                position:absolute;
                top:0;
                width:42px;
                height:100%;
                background:
                    repeating-linear-gradient(
                        to bottom,
                        rgba(255,244,220,.70) 0px,
                        rgba(255,244,220,.70) 2px,
                        rgba(128,78,72,.24) 3px,
                        rgba(128,78,72,.24) 7px
                    );
                opacity:.9;
                z-index:5;
            }

            .story-flip-page-v2.next .story-flip-edge-v2{
                right:0;
                box-shadow:
                    -12px 0 32px rgba(0,0,0,.34),
                    inset -5px 0 10px rgba(255,255,255,.22);
            }

            .story-flip-page-v2.prev .story-flip-edge-v2{
                left:0;
                box-shadow:
                    12px 0 32px rgba(0,0,0,.34),
                    inset 5px 0 10px rgba(255,255,255,.22);
            }

            .story-flip-shine-v2{
                position:absolute;
                inset:-4px;
                z-index:6;
                pointer-events:none;
                opacity:0;
                background:
                    linear-gradient(
                        105deg,
                        transparent 0%,
                        rgba(255,248,220,.12) 34%,
                        rgba(255,255,245,.46) 48%,
                        rgba(255,236,200,.16) 60%,
                        transparent 100%
                    );
                mix-blend-mode:screen;
                transform:translateX(35%) skewX(-10deg);
            }

            .story-flip-moving-shadow-v2{
                position:absolute;
                top:0;
                bottom:0;
                width:42%;
                z-index:5;
                pointer-events:none;
                opacity:0;
                background:
                    linear-gradient(
                        to right,
                        rgba(0,0,0,0),
                        rgba(0,0,0,.34),
                        rgba(0,0,0,0)
                    );
                filter:blur(2px);
            }

            .story-flip-page-v2.next .story-flip-moving-shadow-v2{
                left:-10%;
            }

            .story-flip-page-v2.prev .story-flip-moving-shadow-v2{
                right:-10%;
                transform:scaleX(-1);
            }

            .story-flip-page-v2.flipping-next{
                animation:storyRealFlipNextPolished var(--story-flip-duration,750ms) cubic-bezier(.16,.74,.18,1) forwards;
            }

            .story-flip-page-v2.flipping-prev{
                animation:storyRealFlipPrevPolished var(--story-flip-duration,750ms) cubic-bezier(.16,.74,.18,1) forwards;
            }

            .story-flip-page-v2.flipping-next .story-flip-curl-v2{
                animation:storyPaperCurlNextPolished var(--story-flip-duration,750ms) ease forwards;
            }

            .story-flip-page-v2.flipping-prev .story-flip-curl-v2{
                animation:storyPaperCurlPrevPolished var(--story-flip-duration,750ms) ease forwards;
            }

            .story-flip-page-v2.flipping-next .story-flip-shine-v2,
            .story-flip-page-v2.flipping-prev .story-flip-shine-v2{
                animation:storyFlipShinePolished var(--story-flip-duration,750ms) ease forwards;
            }

            .story-flip-page-v2.flipping-next .story-flip-moving-shadow-v2,
            .story-flip-page-v2.flipping-prev .story-flip-moving-shadow-v2{
                animation:storyMovingFlipShadow var(--story-flip-duration,750ms) ease forwards;
            }

            .story-book-body-v2.turning-next .story-page-v2.right,
            .story-book-body-v2.turning-prev .story-page-v2.left{
                filter:none !important;
            }

            .story-book-body-v2.landing .story-page-v2{
                animation:storyPageSoftLanding 260ms ease-out;
            }

            .story-book-body-v2.landing{
                animation:storyBookHeavyLanding 320ms ease-out;
            }

            @keyframes storyRealFlipNextPolished{
                0%{
                    opacity:1;
                    transform:rotateY(0deg) translateZ(18px);
                }

                24%{
                    transform:rotateY(-42deg) translateZ(30px);
                }

                52%{
                    transform:rotateY(-104deg) translateZ(34px);
                }

                78%{
                    transform:rotateY(-158deg) translateZ(24px);
                }

                100%{
                    opacity:1;
                    transform:rotateY(-180deg) translateZ(18px);
                }
            }

            @keyframes storyRealFlipPrevPolished{
                0%{
                    opacity:1;
                    transform:rotateY(0deg) translateZ(18px);
                }

                24%{
                    transform:rotateY(42deg) translateZ(30px);
                }

                52%{
                    transform:rotateY(104deg) translateZ(34px);
                }

                78%{
                    transform:rotateY(158deg) translateZ(24px);
                }

                100%{
                    opacity:1;
                    transform:rotateY(180deg) translateZ(18px);
                }
            }

            @keyframes storyPaperCurlNextPolished{
                0%{opacity:.16;transform:translateX(0) scaleX(.58);}
                24%{opacity:.54;transform:translateX(-4px) scaleX(.86);}
                52%{opacity:.92;transform:translateX(-13px) scaleX(1.22);}
                78%{opacity:.52;transform:translateX(-20px) scaleX(.94);}
                100%{opacity:.20;transform:translateX(-24px) scaleX(.62);}
            }

            @keyframes storyPaperCurlPrevPolished{
                0%{opacity:.16;transform:translateX(0) scaleX(.58);}
                24%{opacity:.54;transform:translateX(4px) scaleX(.86);}
                52%{opacity:.92;transform:translateX(13px) scaleX(1.22);}
                78%{opacity:.52;transform:translateX(20px) scaleX(.94);}
                100%{opacity:.20;transform:translateX(24px) scaleX(.62);}
            }

            @keyframes storyFlipShinePolished{
                0%{opacity:0;transform:translateX(42%) skewX(-10deg);}
                34%{opacity:.42;}
                58%{opacity:.72;transform:translateX(-8%) skewX(-10deg);}
                100%{opacity:0;transform:translateX(-54%) skewX(-10deg);}
            }

            @keyframes storyMovingFlipShadow{
                0%{opacity:0;transform:translateX(0) scaleX(.65);}
                42%{opacity:.58;transform:translateX(34%) scaleX(1.16);}
                76%{opacity:.32;transform:translateX(64%) scaleX(.88);}
                100%{opacity:0;transform:translateX(88%) scaleX(.62);}
            }

            @keyframes storyPageSoftLanding{
                0%{transform:translateY(0) scale(1);filter:brightness(.92);}
                48%{transform:translateY(1px) scale(.998);filter:brightness(.98);}
                100%{transform:translateY(0) scale(1);filter:brightness(1);}
            }

            @keyframes storyBookHeavyLanding{
                0%{transform:translate(-50%,-50%) scale(1.002);}
                44%{transform:translate(-50%,-49.8%) scale(.999);}
                100%{transform:translate(-50%,-50%) scale(1);}
            }

            @media (max-width: 900px){
                .story-stage-v2{
                    width:100vw;
                    height:96vh;
                }

                .story-book-body-v2{
                    width:98vw;
                    height:88vh;
                }

                .story-nav-v2{
                    width:58px;
                    height:44px;
                    font-size:28px;
                }

                .story-text-panel-v2{
                    width:88%;
                    min-height:142px;
                    padding:40px 20px 20px;
                }

                .story-text-headline-v2{
                    font-size:15px;
                }

                .story-text-body-v2{
                    font-size:13px;
                }
            }
        `;

        style.textContent += `
            /*==================================================
            RPG NARRATOR TEXT BOX ORNATE CORNERS
            ==================================================*/

            .story-text-panel-v2{
                border-radius:4px !important;
                border:1px solid rgba(214,160,82,.88) !important;
                background:
                    linear-gradient(180deg, rgba(15,11,23,.92), rgba(22,15,34,.88)) !important;
                box-shadow:
                    0 12px 32px rgba(0,0,0,.52),
                    inset 0 0 18px rgba(255,206,130,.06),
                    0 0 18px rgba(214,160,82,.12) !important;
            }

            .story-text-panel-v2::before{
                content:"";
                position:absolute;
                left:6px;
                right:6px;
                top:6px;
                bottom:6px;
                border:1px solid rgba(214,160,82,.18);
                pointer-events:none;
                z-index:2;
            }

            .story-narrator-badge-v2{
                top:-20px !important;
                left:22px !important;
                height:28px !important;
                min-width:118px !important;
                padding:0 18px !important;
                border-radius:3px !important;
                border:1px solid rgba(214,160,82,.9) !important;
                background:
                    linear-gradient(180deg, rgba(23,13,28,.98), rgba(10,8,18,.96)) !important;
                color:rgba(255,226,178,.98) !important;
                box-shadow:
                    0 7px 15px rgba(0,0,0,.46),
                    inset 0 0 10px rgba(255,205,130,.08),
                    0 0 12px rgba(214,160,82,.18) !important;
            }

            .story-narrator-badge-v2::before,
            .story-narrator-badge-v2::after{
                content:"";
                position:absolute;
                top:50%;
                width:18px;
                height:1px;
                background:rgba(214,160,82,.85);
                box-shadow:0 0 7px rgba(214,160,82,.42);
            }

            .story-narrator-badge-v2::before{
                left:-18px;
            }

            .story-narrator-badge-v2::after{
                right:-18px;
            }

            .story-panel-corner-v2{
                width:44px !important;
                height:44px !important;
                z-index:5 !important;
            }

            .story-panel-corner-v2::before,
            .story-panel-corner-v2::after{
                background:rgba(214,160,82,.98) !important;
                box-shadow:
                    0 0 7px rgba(214,160,82,.66),
                    0 0 14px rgba(214,160,82,.22) !important;
            }

            .story-panel-corner-v2::before{
                width:34px !important;
                height:2px !important;
            }

            .story-panel-corner-v2::after{
                width:2px !important;
                height:34px !important;
            }

            .story-panel-corner-v2.tl{
                left:7px !important;
                top:7px !important;
            }

            .story-panel-corner-v2.tr{
                right:7px !important;
                top:7px !important;
                transform:scaleX(-1) !important;
            }

            .story-panel-corner-v2.bl{
                left:7px !important;
                bottom:7px !important;
                transform:scaleY(-1) !important;
            }

            .story-panel-corner-v2.br{
                right:7px !important;
                bottom:7px !important;
                transform:scale(-1) !important;
            }

            .story-text-v2{
                position:relative;
                z-index:4;
            }
        `;

        document.head.appendChild(style);
    },

    buildOverlay(){
        const oldOverlay = document.getElementById("storyBookOverlayV2");
        if(oldOverlay) oldOverlay.remove();

        this.overlay = document.createElement("div");
        this.stage = document.createElement("div");
        this.closedBook = document.createElement("div");
        this.realBook = document.createElement("div");
        this.bookBody = document.createElement("div");
        this.leftPage = document.createElement("div");
        this.rightPage = document.createElement("div");
        this.flipPage = document.createElement("div");
        this.closeButton = document.createElement("button");
        this.prevButton = document.createElement("button");
        this.nextButton = document.createElement("button");
        this.pageCounter = document.createElement("div");

        this.overlay.id = "storyBookOverlayV2";
        this.stage.className = "story-stage-v2";
        this.closedBook.className = "story-closed-book-v2";
        this.realBook.className = "story-real-book-v2";
        this.bookBody.className = "story-book-body-v2";
        this.leftPage.className = "story-page-v2 left";
        this.rightPage.className = "story-page-v2 right";
        this.flipPage.className = "story-flip-page-v2";
        this.closeButton.className = "story-close-v2";
        this.prevButton.className = "story-nav-v2 prev";
        this.nextButton.className = "story-nav-v2 next";
        this.pageCounter.className = "story-counter-v2";

        this.closeButton.type = "button";
        this.prevButton.type = "button";
        this.nextButton.type = "button";

        this.closeButton.textContent = "×";
        this.prevButton.textContent = "‹";
        this.nextButton.textContent = "›";

        this.buildClosedBook();
        this.buildBookBase();
        this.bindEvents();

        this.stage.appendChild(this.closedBook);
        this.stage.appendChild(this.realBook);
        this.stage.appendChild(this.closeButton);

        this.overlay.appendChild(this.stage);
        document.body.appendChild(this.overlay);
    },

    buildClosedBook(){
        this.closedBook.innerHTML = "";

        const cover = document.createElement("div");
        const coverArt = document.createElement("div");
        const title = document.createElement("div");
        const spine = document.createElement("div");
        const pages = document.createElement("div");

        cover.className = "story-book-cover-v2";
        coverArt.className = "story-book-cover-art-v2";
        title.className = "story-book-title-v2";
        spine.className = "story-book-spine-closed-v2";
        pages.className = "story-book-pages-closed-v2";

        coverArt.style.backgroundImage = `url('${this.getCoverArtwork()}')`;
        title.textContent = StoryBookPages?.settings?.story?.title || "Milad & Banin";

        cover.appendChild(coverArt);

        this.closedBook.appendChild(spine);
        this.closedBook.appendChild(pages);
        this.closedBook.appendChild(cover);
        this.closedBook.appendChild(title);
    },

    buildBookBase(){
        this.bookBody.innerHTML = "";
        this.realBook.innerHTML = "";

        const leftStack = document.createElement("div");
        const rightStack = document.createElement("div");
        const leftTurnZone = document.createElement("button");
        const rightTurnZone = document.createElement("button");

        leftStack.className = "story-page-stack-v2 left";
        rightStack.className = "story-page-stack-v2 right";

        leftTurnZone.type = "button";
        rightTurnZone.type = "button";

        leftTurnZone.className = "story-page-turn-zone-v2 left";
        rightTurnZone.className = "story-page-turn-zone-v2 right";

        leftTurnZone.dataset.storyTurn = "prev";
        rightTurnZone.dataset.storyTurn = "next";

        leftTurnZone.setAttribute("aria-label", "Previous pages");
        rightTurnZone.setAttribute("aria-label", "Next pages");

        this.bookBody.style.setProperty(
            "--story-flip-duration",
            `${this.getTransitionDuration()}ms`
        );

        this.bookBody.appendChild(leftStack);
        this.bookBody.appendChild(rightStack);
        this.bookBody.appendChild(this.leftPage);
        this.bookBody.appendChild(this.rightPage);
        this.bookBody.appendChild(this.flipPage);
        this.bookBody.appendChild(leftTurnZone);
        this.bookBody.appendChild(rightTurnZone);

        this.realBook.appendChild(this.bookBody);
        this.realBook.appendChild(this.prevButton);
        this.realBook.appendChild(this.nextButton);
        this.realBook.appendChild(this.pageCounter);
    },

    bindEvents(){
        this.closeButton.addEventListener("click", () => this.close());

        this.prevButton.addEventListener("click", () => this.goPrevSpread());
        this.nextButton.addEventListener("click", () => this.goNextSpread());

        this.bookBody.addEventListener("click", event => {
            const turnButton = event.target.closest("[data-story-turn]");
            if(!turnButton) return;

            const direction = turnButton.dataset.storyTurn;

            if(direction === "prev") this.goPrevSpread();
            if(direction === "next") this.goNextSpread();
        });

        document.addEventListener("keydown", event => {
            if(!this.isOpen) return;

            if(event.key === "Escape"){
                this.close();
                return;
            }

            if(event.key === "ArrowLeft"){
                this.goPrevSpread();
                return;
            }

            if(event.key === "ArrowRight"){
                this.goNextSpread();
            }
        });
    },
    bindStoryBookObject(){
        const selectors = [
            "#storyBookContainer",
            "#storyBookContainer *",
            "#btnStory",
            "#storyBookObject",
            "#storyBook",
            ".story-book-object",
            "[data-world-object='story']",
            "[data-story-book-open]"
        ];

        const selectorText = selectors.join(",");

        if(this.globalStoryClickBound){
            return;
        }

        this.globalStoryClickBound = true;

        document.addEventListener("click", event => {
            const target = event.target.closest(selectorText);

            if(!target) return;

            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();

            console.log("📖 Story Book click captured:", target);

            this.open();
        }, true);

        console.log("✅ Story Book global click capture bound");
    },


    open(){
        if(this.isAnimating) return;

        clearTimeout(this.openingTimer);

        this.isOpen = true;
        this.isAnimating = true;
        this.currentSpreadIndex = 0;

        this.overlay.style.display = "flex";
        this.overlay.classList.remove("story-closing");

        this.closedBook.style.display = "block";
        this.realBook.style.display = "none";

        this.closedBook.classList.remove("opening");
        this.realBook.classList.remove("visible");

        this.renderSpread(0, false);
        this.updateControls();

        requestAnimationFrame(() => {
            this.overlay.classList.add("story-open");
            this.closedBook.classList.add("visible");
        });

        this.openingTimer = setTimeout(() => {
            this.openBook();
        }, this.getClosedBookDuration());
    },

    openBook(){
        if(!this.isOpen) return;

        /*
            First: animate the closed book.
            Important: realBook must NOT appear yet,
            otherwise closed cover and open pages overlap.
        */
        this.closedBook.classList.add("opening");

        this.realBook.style.display = "none";
        this.realBook.classList.remove("visible");

        setTimeout(() => {
            if(!this.isOpen) return;

            /*
                Hide closed book completely before showing open book.
            */
            this.closedBook.style.display = "none";
            this.closedBook.classList.remove("visible", "opening");

            /*
                Now show the real open book.
            */
            this.realBook.style.display = "block";

            requestAnimationFrame(() => {
                if(!this.isOpen) return;

                this.realBook.classList.add("visible");
                this.playSpreadEntrance();

                this.isAnimating = false;
            });

        }, 900);
    },


    close(){
        if(!this.isOpen && !this.overlay.classList.contains("story-open")) return;

        clearTimeout(this.openingTimer);

        this.isOpen = false;
        this.isAnimating = false;

        this.overlay.classList.add("story-closing");
        this.overlay.classList.remove("story-open");

        this.realBook.classList.remove("visible");
        this.closedBook.classList.remove("visible", "opening");

        setTimeout(() => {
            if(this.isOpen) return;

            this.overlay.style.display = "none";
            this.overlay.classList.remove("story-closing");

            this.closedBook.style.display = "none";
            this.realBook.style.display = "none";

            this.flipPage.style.opacity = "0";
            this.flipPage.innerHTML = "";
        }, 680);
    },

    getPage(id){
        return StoryBookPages.pages.find(page => Number(page.id) === Number(id)) || null;
    },

    getSpreadPageIds(spreadIndex){
        const leftId = spreadIndex * 2 + 1;
        const rightId = leftId + 1;

        return { leftId, rightId };
    },

    getSpreadIndexByPage(pageId){
        return Math.floor((Number(pageId) - 1) / 2);
    },

    renderSpread(spreadIndex, animate = true){
        const safeSpreadIndex =
            Math.max(0, Math.min(Number(spreadIndex), this.totalSpreads - 1));

        const ids = this.getSpreadPageIds(safeSpreadIndex);
        const left = this.getPage(ids.leftId);
        const right = this.getPage(ids.rightId);

        this.currentSpreadIndex = safeSpreadIndex;

        this.renderPage(this.leftPage, left, "left");
        this.renderPage(this.rightPage, right, "right");

        this.updateControls();

        if(animate) this.playSpreadEntrance();
    },

    renderPage(container, page, side){
        container.innerHTML = "";
        container.className = `story-page-v2 ${side}`;

        if(!page){
            container.style.visibility = "hidden";
            return;
        }

        const pageMode = page.mode || "story";
        const backgroundPath = this.getPageBackground(page);

        container.style.visibility = "visible";
        container.dataset.pageId = String(page.id);
        container.dataset.pageMode = pageMode;

        container.classList.add(`mode-${pageMode}`);

        if(page.cinematic){
            container.classList.add("cinematic");
        }

        const artworkShell = document.createElement("div");
        const background = document.createElement("div");
        const panel = document.createElement("div");
        const narrator = document.createElement("div");
        const text = document.createElement("div");

        artworkShell.className = "story-page-art-shell-v2";
        background.className = "story-page-bg-v2";
        panel.className = "story-text-panel-v2";
        narrator.className = "story-narrator-badge-v2";
        text.className = "story-text-v2";

                background.style.backgroundImage =
            `linear-gradient(rgba(20,8,34,.02),rgba(10,4,18,.14)),url('${backgroundPath}')`;

        narrator.textContent = page.narrator || "The Story Book";

        this.renderStoryText(text, page.text || page.title || "");

        artworkShell.appendChild(background);

        if(page.skyName){
            const skyName = document.createElement("div");
            skyName.className = "story-sky-name-v2";
            skyName.textContent = page.skyName;
            artworkShell.appendChild(skyName);
        }

        this.addArtworkCorners(artworkShell);
        this.addGoldenCorners(panel);

        panel.appendChild(narrator);
        panel.appendChild(text);

        container.appendChild(artworkShell);
        container.appendChild(panel);
    },

    renderStoryText(container, rawText){
        container.innerHTML = "";

        const parts = String(rawText || "").split(/\n\s*\n/);
        const headlineText = parts.shift() || "";
        const bodyText = parts.join("\n\n").trim();

        const headline = document.createElement("span");
        const body = document.createElement("span");

        headline.className = "story-text-headline-v2";
        body.className = "story-text-body-v2";

        headline.textContent = headlineText.trim();
        body.textContent = bodyText;

        container.appendChild(headline);

        if(bodyText){
            container.appendChild(body);
        }
    },

    addArtworkCorners(shell){
        for(const name of ["tl", "tr", "bl", "br"]){
            const corner = document.createElement("span");
            corner.className = `story-page-art-corner-v2 ${name}`;
            shell.appendChild(corner);
        }
    },

    addGoldenCorners(panel){
        for(const name of ["tl", "tr", "bl", "br"]){
            const corner = document.createElement("span");
            corner.className = `story-panel-corner-v2 ${name}`;
            panel.appendChild(corner);
        }
    },

    getPageBackground(page){
        const pageId = Math.max(1, Number(page?.id || 1));
        const paddedId = String(pageId).padStart(2, "0");

        const artworkSettings = StoryBookPages?.settings?.artwork || {};
        const basePath = artworkSettings.basePath || "assets/story/backgrounds/";
        const extension = artworkSettings.extension || "webp";

        return `${basePath}page-${paddedId}.${extension}`;
    },

    getFallbackBackground(){
        return "assets/story/backgrounds/page-01.webp";
    },


    preloadStoryBackgrounds(){
        const totalPages = this.getTotalPages();

        this.backgroundCache = [];

        for(let pageId = 1; pageId <= totalPages; pageId++){
            const paddedId = String(pageId).padStart(2, "0");
            const image = new Image();

            image.src =
                `assets/story/backgrounds/page-${paddedId}.webp`;

            this.backgroundCache.push(image);
        }

        const cover = new Image();
        cover.src = this.getCoverArtwork() || this.getFallbackBackground();
        this.backgroundCache.push(cover);
    },

    playSpreadEntrance(){
        this.leftPage.classList.remove("panel-visible");
        this.rightPage.classList.remove("panel-visible");

        requestAnimationFrame(() => {
            setTimeout(() => {
                this.leftPage.classList.add("panel-visible");
                this.rightPage.classList.add("panel-visible");
            }, 80);
        });
    },

    updateControls(){
        const ids = this.getSpreadPageIds(this.currentSpreadIndex);
        const totalPages = this.getTotalPages();

        const firstVisiblePage = Math.min(ids.leftId, totalPages);
        const secondVisiblePage = Math.min(ids.rightId, totalPages);

        const canGoPrev = this.currentSpreadIndex > 0;
        const canGoNext = this.currentSpreadIndex < this.totalSpreads - 1;

        if(secondVisiblePage > firstVisiblePage){
            this.pageCounter.textContent =
                `${firstVisiblePage} - ${secondVisiblePage} / ${totalPages}`;
        }else{
            this.pageCounter.textContent =
                `${firstVisiblePage} / ${totalPages}`;
        }

        this.prevButton.classList.toggle("disabled", !canGoPrev);
        this.nextButton.classList.toggle("disabled", !canGoNext);

        const leftTurnZone =
            this.bookBody.querySelector(".story-page-turn-zone-v2.left");

        const rightTurnZone =
            this.bookBody.querySelector(".story-page-turn-zone-v2.right");

        if(leftTurnZone){
            leftTurnZone.classList.toggle("disabled", !canGoPrev);
        }

        if(rightTurnZone){
            rightTurnZone.classList.toggle("disabled", !canGoNext);
        }
    },

    goPrevSpread(){
        if(this.isAnimating) return;
        if(this.currentSpreadIndex <= 0) return;

        this.goToSpread(this.currentSpreadIndex - 1, "prev");
    },

    goNextSpread(){
        if(this.isAnimating) return;
        if(this.currentSpreadIndex >= this.totalSpreads - 1) return;

        this.goToSpread(this.currentSpreadIndex + 1, "next");
    },

    goToPage(pageId){
        if(this.isAnimating) return;

        const targetPage = Number(pageId);
        if(!Number.isFinite(targetPage)) return;
        if(targetPage < 1 || targetPage > this.getTotalPages()) return;

        const targetSpread = this.getSpreadIndexByPage(targetPage);
        if(targetSpread === this.currentSpreadIndex) return;

        const direction =
            targetSpread > this.currentSpreadIndex ? "next" : "prev";

        this.goToSpread(targetSpread, direction);
    },

    goToSpread(targetSpread, direction){
        if(this.isAnimating) return;
        if(targetSpread < 0 || targetSpread >= this.totalSpreads) return;

        this.isAnimating = true;

        this.bookBody.classList.remove(
            "turning-next",
            "turning-prev",
            "landing"
        );

        this.bookBody.classList.add(
            "turning",
            direction === "next" ? "turning-next" : "turning-prev"
        );


        /*
            Performance fix:
            Do NOT render the next heavy artwork behind the flip.
            We only animate a lightweight paper page,
            then render the real spread after animation finishes.
        */
        this.prepareFlipPage(direction, targetSpread);

        requestAnimationFrame(() => {
            this.flipPage.style.opacity = "1";
            this.flipPage.style.transition = "none";
            this.flipPage.style.transform =
                "rotateY(0deg) translateZ(18px)";

            this.flipPage.classList.remove(
                "flipping-next",
                "flipping-prev"
            );

            this.flipPage.getBoundingClientRect();

            requestAnimationFrame(() => {
                if(!this.isOpen) return;

                this.flipPage.classList.add(
                    direction === "next" ? "flipping-next" : "flipping-prev"
                );
            });
        });

        setTimeout(() => {
            if(!this.isOpen) return;

            this.flipPage.style.opacity = "0";
            this.flipPage.style.transition = "none";
            this.flipPage.style.transform =
                "rotateY(0deg) translateZ(18px)";

            this.flipPage.classList.remove(
                "flipping-next",
                "flipping-prev"
            );

            this.flipPage.innerHTML = "";

            this.renderSpread(targetSpread, true);

            this.bookBody.classList.remove(
                "turning",
                "turning-next",
                "turning-prev"
            );

            this.bookBody.classList.add("landing");

            setTimeout(() => {
                this.bookBody.classList.remove("landing");
                this.isAnimating = false;
            }, 260);

        }, this.getTransitionDuration() + 20);
    },

    renderSpreadBehindFlip(targetSpread, direction){
        const ids = this.getSpreadPageIds(targetSpread);
        const left = this.getPage(ids.leftId);
        const right = this.getPage(ids.rightId);

        if(direction === "next"){
            this.renderPage(this.rightPage, right, "right");
            this.rightPage.classList.add("panel-visible");
        }else{
            this.renderPage(this.leftPage, left, "left");
            this.leftPage.classList.add("panel-visible");
        }
    },
    prepareFlipPage(direction, targetSpread){
        const currentIds = this.getSpreadPageIds(this.currentSpreadIndex);
        const targetIds = this.getSpreadPageIds(targetSpread);

        const sourcePage =
            direction === "next"
                ? this.getPage(currentIds.rightId)
                : this.getPage(currentIds.leftId);

        const backPage =
            direction === "next"
                ? this.getPage(targetIds.leftId)
                : this.getPage(targetIds.rightId);

        this.flipPage.innerHTML = "";
        this.flipPage.className = `story-flip-page-v2 ${direction}`;

        this.flipPage.style.transition = "none";
        this.flipPage.style.opacity = "1";
        this.flipPage.style.width = "calc(50% - 44px)";
        this.flipPage.style.top = "34px";
        this.flipPage.style.bottom = "34px";

        if(direction === "next"){
            this.flipPage.style.left = "calc(50% + 2px)";
            this.flipPage.style.right = "auto";
            this.flipPage.style.transformOrigin = "0% 50%";
            this.flipPage.style.borderRadius = "10px 30px 30px 10px";
        }else{
            this.flipPage.style.right = "calc(50% + 2px)";
            this.flipPage.style.left = "auto";
            this.flipPage.style.transformOrigin = "100% 50%";
            this.flipPage.style.borderRadius = "30px 10px 10px 30px";
        }

        this.flipPage.style.transform =
            "rotateY(0deg) translateZ(18px)";

        const front = document.createElement("div");
        const back = document.createElement("div");
        const curl = document.createElement("div");
        const edge = document.createElement("div");
        const shine = document.createElement("div");
        const movingShadow = document.createElement("div");

        front.className = "story-flip-face-v2 story-flip-front-v2";
        back.className = "story-flip-face-v2 story-flip-back-v2";
        curl.className = "story-flip-curl-v2";
        edge.className = "story-flip-edge-v2";
        shine.className = "story-flip-shine-v2";
        movingShadow.className = "story-flip-moving-shadow-v2";

        if(sourcePage){
            front.style.backgroundImage =
                `linear-gradient(rgba(20,8,34,.04),rgba(10,4,18,.20)),url('${this.getPageBackground(sourcePage)}')`;
        }else{
            front.style.background =
                "linear-gradient(90deg, rgba(30,16,40,.98), rgba(245,219,188,.92), rgba(120,78,90,.92))";
        }

        if(backPage){
            back.style.backgroundImage =
                `linear-gradient(rgba(20,8,34,.04),rgba(10,4,18,.20)),url('${this.getPageBackground(backPage)}')`;
        }else{
            back.style.background =
                "linear-gradient(90deg, rgba(120,78,90,.92), rgba(245,219,188,.92), rgba(30,16,40,.98))";
        }

        front.appendChild(curl);
        front.appendChild(edge);
        front.appendChild(shine);
        front.appendChild(movingShadow);

        this.flipPage.appendChild(front);
        this.flipPage.appendChild(back);
    }

};


window.StoryBookSystem = StoryBookSystem;

/*==================================================
AUTO INITIALIZE STORY BOOK SYSTEM
Safe even if world.js also calls create()
==================================================*/

(function initializeStoryBookSystemSafely(){

    function startStoryBookSystem(){
        if(!window.StoryBookSystem){
            console.warn("❌ StoryBookSystem not found on window.");
            return;
        }

        if(!window.StoryBookPages){
            console.warn("❌ StoryBookPages not found on window.");
            return;
        }

        window.StoryBookSystem.create();

        console.log("✅ StoryBookSystem auto init checked");
    }

    if(document.readyState === "loading"){
        document.addEventListener("DOMContentLoaded", startStoryBookSystem);
    }else{
        startStoryBookSystem();
    }

})();