/*==================================================
BANIN UNIVERSE
DIARY SYSTEM
Two Page Journal + Artwork Viewer
==================================================*/

"use strict";


const DiarySystem = {

    initialized: false,
    opened: false,
    pageTurning: false,

    currentIndex: 0,

    overlay: null,
    book: null,

    leftPage: null,
    rightPage: null,

    noteList: null,

    currentDate: null,
    currentTitle: null,

    artworkFrame: null,
    artworkImage: null,
    artworkPlaceholder: null,

    noteTitle: null,
    noteText: null,
    noteSignature: null,

    previousButton: null,
    nextButton: null,
    closeButton: null,
    pageNumber: null,

    viewerOpened: false,
    viewerIndex: 0,

    viewerOverlay: null,
    viewerStage: null,
    viewerImage: null,
    viewerTitle: null,
    viewerCounter: null,
    viewerPreviousButton: null,
    viewerNextButton: null,
    viewerCloseButton: null,


    /*==================================================
    INITIALIZE
    ==================================================*/

    initialize(){

        if(this.initialized){
            return;
        }

        this.injectStyles();
        this.build();
        this.bindDiaryObject();

        this.renderNote(
            0,
            false
        );

        this.initialized = true;

        console.log(
            "📔 DiarySystem initialized"
        );

    },


    /*==================================================
    STYLES
    ==================================================*/

    injectStyles(){

        const previousStyle =
            document.getElementById(
                "baninDiarySystemStyles"
            );

        if(previousStyle){
            previousStyle.remove();
        }


        const style =
            document.createElement(
                "style"
            );

        style.id =
            "baninDiarySystemStyles";


        style.textContent = `

            /*==========================================
            ANIMATIONS
            ==========================================*/

            @keyframes diaryOverlayAppear{

                from{
                    opacity:0;
                }

                to{
                    opacity:1;
                }

            }


            @keyframes diaryBookAppear{

                from{
                    opacity:0;

                    transform:
                        translateY(42px)
                        scale(.91)
                        rotateX(9deg);
                }

                to{
                    opacity:1;

                    transform:
                        translateY(0)
                        scale(1)
                        rotateX(0);
                }

            }


            @keyframes diaryPageChange{

                0%{
                    opacity:1;

                    transform:
                        perspective(1200px)
                        translateX(0)
                        rotateY(0);
                }

                45%{
                    opacity:.15;

                    transform:
                        perspective(1200px)
                        translateX(-18px)
                        rotateY(-15deg);
                }

                58%{
                    opacity:.22;

                    transform:
                        perspective(1200px)
                        translateX(13px)
                        rotateY(10deg);
                }

                100%{
                    opacity:1;

                    transform:
                        perspective(1200px)
                        translateX(0)
                        rotateY(0);
                }

            }


            @keyframes diaryDustFloat{

                0%,
                100%{
                    opacity:.25;

                    transform:
                        translateY(0)
                        rotate(0deg)
                        scale(.84);
                }

                50%{
                    opacity:.76;

                    transform:
                        translateY(-8px)
                        rotate(8deg)
                        scale(1.08);
                }

            }


            @keyframes diaryActiveHeart{

                0%,
                100%{
                    transform:
                        translateY(-50%)
                        scale(1);
                }

                50%{
                    transform:
                        translateY(-50%)
                        scale(1.16);
                }

            }


            @keyframes diaryViewerAppear{

                from{
                    opacity:0;
                }

                to{
                    opacity:1;
                }

            }


            @keyframes diaryViewerStageAppear{

                from{
                    opacity:0;

                    transform:
                        translateY(22px)
                        scale(.94);
                }

                to{
                    opacity:1;

                    transform:
                        translateY(0)
                        scale(1);
                }

            }


            /*==========================================
            DIARY OVERLAY
            ==========================================*/

            #baninDiaryOverlay{
                position:fixed;

                inset:0;

                display:flex;
                align-items:center;
                justify-content:center;

                padding:30px;

                background:
                    radial-gradient(
                        circle at 50% 42%,
                        rgba(91,48,100,.46),
                        rgba(28,15,43,.74) 48%,
                        rgba(5,4,12,.94)
                    );

                backdrop-filter:
                    blur(9px);

                -webkit-backdrop-filter:
                    blur(9px);

                opacity:0;
                visibility:hidden;
                pointer-events:none;

                transition:
                    opacity .38s ease,
                    visibility .38s ease;

                z-index:2147483000;
            }


            #baninDiaryOverlay.diary-opened{
                opacity:1;
                visibility:visible;
                pointer-events:auto;

                animation:
                    diaryOverlayAppear
                    .4s
                    ease
                    both;
            }


            /*==========================================
            BOOK
            ==========================================*/

            .banin-diary-book{
                position:relative;

                width:
                    min(1080px, 93vw);

                height:
                    min(670px, 86vh);

                display:grid;

                grid-template-columns:
                    1fr 1fr;

                opacity:0;

                overflow:hidden;

                border:
                    2px solid
                    rgba(232,183,92,.70);

                border-radius:
                    30px 32px 32px 30px;

                background:
                    linear-gradient(
                        90deg,

                        #261426 0%,
                        #3f2039 1.4%,
                        #6c3a57 3%,

                        #b98b51 3.65%,
                        #efd8a1 4.35%,

                        #ead7a8 48.1%,
                        #8f673d 49.35%,
                        #4b2d25 50%,
                        #92683c 50.65%,

                        #ead7a8 51.9%,
                        #efd8a1 95.65%,

                        #b98b51 96.35%,
                        #6c3a57 97%,
                        #3f2039 98.6%,
                        #261426 100%
                    );

                box-shadow:
                    0 38px 100px
                    rgba(0,0,0,.76),

                    0 8px 25px
                    rgba(0,0,0,.46),

                    0 0 52px
                    rgba(184,105,255,.20),

                    inset 0 0 32px
                    rgba(255,226,164,.18);

                transform-style:
                    preserve-3d;

                perspective:
                    1500px;
            }


            #baninDiaryOverlay.diary-opened
            .banin-diary-book{
                animation:
                    diaryBookAppear
                    .65s
                    cubic-bezier(.18,.84,.24,1)
                    both;
            }


            .banin-diary-book::before{
                content:"";

                position:absolute;

                left:50%;
                top:0;

                width:42px;
                height:100%;

                transform:
                    translateX(-50%);

                background:
                    linear-gradient(
                        90deg,
                        transparent,
                        rgba(72,39,25,.25),
                        rgba(52,29,22,.48),
                        rgba(255,235,181,.22),
                        rgba(52,29,22,.48),
                        rgba(72,39,25,.25),
                        transparent
                    );

                box-shadow:
                    inset 9px 0 12px
                    rgba(54,31,22,.18),

                    inset -9px 0 12px
                    rgba(54,31,22,.18);

                pointer-events:none;

                z-index:30;
            }


            .banin-diary-book::after{
                content:"";

                position:absolute;

                inset:0;

                background-image:
                    repeating-linear-gradient(
                        0deg,
                        rgba(82,57,37,.022) 0,
                        rgba(82,57,37,.022) 1px,
                        transparent 1px,
                        transparent 4px
                    );

                mix-blend-mode:multiply;

                pointer-events:none;

                z-index:40;
            }


            /*==========================================
            PAGES
            ==========================================*/

            .banin-diary-page{
                position:relative;

                min-width:0;
                min-height:0;

                padding:
                    55px 50px 48px;

                overflow:hidden;

                color:
                    #513b2e;

                background:
                    radial-gradient(
                        circle at 50% 42%,
                        rgba(255,252,226,.96),
                        rgba(244,229,190,.97) 57%,
                        rgba(222,194,139,.99)
                    );
            }


            .banin-diary-left-page{
                border-radius:
                    25px 0 0 25px;

                box-shadow:
                    inset -18px 0 24px
                    rgba(79,50,29,.16),

                    inset 5px 0 9px
                    rgba(255,255,255,.20);
            }


            .banin-diary-right-page{
                border-radius:
                    0 25px 25px 0;

                box-shadow:
                    inset 18px 0 24px
                    rgba(79,50,29,.16),

                    inset -5px 0 9px
                    rgba(255,255,255,.20);

                transform-origin:
                    left center;
            }


            .banin-diary-page::before{
                content:"";

                position:absolute;

                inset:18px;

                border:
                    1px solid
                    rgba(139,91,45,.31);

                border-radius:
                    15px;

                box-shadow:
                    inset 0 0 0 4px
                    rgba(255,247,214,.09);

                pointer-events:none;
            }


            .banin-diary-page::after{
                content:"❦";

                position:absolute;

                bottom:27px;

                color:
                    rgba(145,94,43,.46);

                font-family:
                    Georgia,
                    serif;

                font-size:21px;

                animation:
                    diaryDustFloat
                    3.8s
                    ease-in-out
                    infinite;

                pointer-events:none;
            }


            .banin-diary-left-page::after{
                left:31px;
            }


            .banin-diary-right-page::after{
                right:31px;

                animation-delay:.7s;
            }


            .banin-diary-page.diary-changing{
                animation:
                    diaryPageChange
                    .58s
                    cubic-bezier(.3,.15,.3,1)
                    both;
            }


            /*==========================================
            CLOSE BUTTON
            ==========================================*/

            .banin-diary-close{
                position:absolute;

                right:21px;
                top:18px;

                width:40px;
                height:40px;

                display:flex;
                align-items:center;
                justify-content:center;

                padding:0;

                border:
                    1px solid
                    rgba(112,66,36,.48);

                border-radius:50%;

                background:
                    linear-gradient(
                        145deg,
                        rgba(255,243,205,.93),
                        rgba(213,177,111,.88)
                    );

                color:
                    #633b2d;

                font-family:
                    Georgia,
                    serif;

                font-size:27px;

                cursor:pointer;

                box-shadow:
                    0 5px 15px
                    rgba(73,43,24,.22),

                    inset 0 1px 0
                    rgba(255,255,255,.58);

                transition:
                    transform .25s ease,
                    box-shadow .25s ease;

                z-index:100;
            }


            .banin-diary-close:hover{
                transform:
                    rotate(9deg)
                    scale(1.09);

                box-shadow:
                    0 0 20px
                    rgba(181,114,48,.34);
            }


            /*==========================================
            LEFT PAGE
            ==========================================*/

            .banin-diary-small-label{
                display:inline-block;

                margin-bottom:9px;

                padding:
                    4px 10px;

                border:
                    1px solid
                    rgba(125,78,44,.22);

                border-radius:
                    20px;

                background:
                    rgba(126,76,57,.055);

                font-family:
                    Georgia,
                    serif;

                font-size:13px;
                font-style:italic;

                letter-spacing:2.3px;

                color:
                    rgba(100,63,40,.69);

                text-transform:uppercase;
            }


            .banin-diary-date{
                margin:
                    4px 0 7px;

                font-family:
                    "Vazirmatn",
                    Georgia,
                    serif;

                font-size:15px;

                color:
                    #835339;

                text-align:left;
            }


            .banin-diary-left-title{
                position:relative;

                margin:
                    0 0 25px;

                padding-bottom:9px;

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    Georgia,
                    serif;

                font-size:
                    clamp(27px, 3vw, 40px);

                color:
                    #58342d;

                text-align:left;
            }


            .banin-diary-left-title::after{
                content:"";

                position:absolute;

                left:0;
                bottom:0;

                width:74%;
                height:1px;

                background:
                    linear-gradient(
                        90deg,
                        rgba(143,88,43,.62),
                        transparent
                    );
            }


            .banin-diary-divider{
                width:100%;
                height:1px;

                margin-bottom:21px;

                background:
                    rgba(136,84,46,.14);
            }


            .banin-diary-list-title{
                margin:
                    0 0 13px 5px;

                font-family:
                    Georgia,
                    serif;

                font-size:18px;
                font-style:italic;

                color:
                    rgba(99,61,39,.79);
            }


            .banin-diary-note-list{
                display:flex;

                flex-direction:column;

                gap:8px;

                max-height:
                    calc(100% - 215px);

                padding:
                    4px 9px 16px 0;

                overflow-y:auto;
            }


            .banin-diary-note-list::-webkit-scrollbar{
                width:5px;
            }


            .banin-diary-note-list::-webkit-scrollbar-thumb{
                border-radius:10px;

                background:
                    rgba(110,72,45,.33);
            }


            .banin-diary-list-button{
                position:relative;

                width:100%;

                padding:
                    12px 16px 12px 38px;

                border:
                    1px solid
                    transparent;

                border-radius:10px;

                background:
                    transparent;

                color:
                    rgba(80,51,40,.79);

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    serif;

                font-size:16px;

                text-align:left;

                cursor:pointer;

                transition:
                    color .25s ease,
                    background .25s ease,
                    transform .25s ease;
            }


            .banin-diary-list-button::before{
                content:"♡";

                position:absolute;

                left:11px;
                top:50%;

                transform:
                    translateY(-50%);

                color:
                    rgba(145,79,67,.50);

                font-family:
                    Georgia,
                    serif;

                font-size:18px;
            }


            .banin-diary-list-button:hover{
                color:
                    #633a34;

                background:
                    rgba(151,95,57,.075);

                transform:
                    translateX(5px);
            }


            .banin-diary-list-button.active{
                color:
                    #6b303d;

                background:
                    linear-gradient(
                        90deg,
                        rgba(161,82,96,.18),
                        transparent
                    );

                box-shadow:
                    inset 3px 0 0
                    rgba(153,69,87,.50);

                font-weight:700;
            }


            .banin-diary-list-button.active::before{
                content:"♥";

                color:
                    #a94c61;

                animation:
                    diaryActiveHeart
                    1.8s
                    ease-in-out
                    infinite;
            }


            /*==========================================
            RIGHT PAGE
            ==========================================*/

            .banin-diary-right-content{
                position:relative;

                height:100%;

                display:flex;

                flex-direction:column;

                min-height:0;

                direction:rtl;
            }


            .banin-diary-artwork-frame{
                position:relative;

                width:
                    min(85%, 380px);

                height:
                    clamp(178px, 30vh, 243px);

                flex-shrink:0;

                margin:
                    1px auto 22px;

                padding:
                    11px 11px 31px;

                border:
                    1px solid
                    rgba(126,84,50,.16);

                border-radius:4px;

                background:
                    linear-gradient(
                        145deg,
                        rgba(255,251,230,.98),
                        rgba(236,218,180,.96)
                    );

                box-shadow:
                    0 14px 28px
                    rgba(74,45,25,.24),

                    inset 0 0 0 1px
                    rgba(255,255,255,.45);

                transform:
                    rotate(-1.8deg);

                transition:
                    transform .35s ease,
                    box-shadow .35s ease;
            }


            .banin-diary-artwork-frame.has-artwork{
                cursor:
                    zoom-in;
            }


            .banin-diary-artwork-frame.has-artwork:hover{
                transform:
                    rotate(-.7deg)
                    translateY(-3px)
                    scale(1.015);

                box-shadow:
                    0 17px 33px
                    rgba(74,45,25,.28),

                    0 0 22px
                    rgba(185,112,66,.15);
            }


            .banin-diary-artwork-frame::before{
                content:"";

                position:absolute;

                left:50%;
                top:-13px;

                width:92px;
                height:27px;

                transform:
                    translateX(-50%)
                    rotate(1.5deg);

                background:
                    linear-gradient(
                        90deg,
                        rgba(188,147,87,.47),
                        rgba(228,193,128,.67),
                        rgba(186,143,83,.48)
                    );

                box-shadow:
                    0 3px 6px
                    rgba(73,48,25,.15);

                z-index:5;
            }


            .banin-diary-artwork-frame::after{
                content:"♡";

                position:absolute;

                right:18px;
                bottom:6px;

                color:
                    rgba(122,70,56,.48);

                font-family:
                    Georgia,
                    serif;

                font-size:17px;
            }


            .banin-diary-artwork-image{
                width:100%;
                height:100%;

                display:none;

                object-fit:cover;

                border-radius:2px;

                filter:
                    sepia(.065)
                    saturate(.96)
                    contrast(1.02);

                user-select:none;
                -webkit-user-drag:none;
            }


            .banin-diary-artwork-placeholder{
                width:100%;
                height:100%;

                display:flex;

                flex-direction:column;

                align-items:center;
                justify-content:center;

                gap:9px;

                border-radius:2px;

                background:
                    radial-gradient(
                        circle,
                        rgba(176,128,143,.47),
                        rgba(93,55,87,.89)
                    );

                color:
                    rgba(255,234,193,.93);

                text-align:center;
            }


            .banin-diary-artwork-placeholder span{
                font-size:39px;
            }


            .banin-diary-artwork-placeholder small{
                font-family:
                    Georgia,
                    serif;

                font-style:italic;
            }


            .banin-diary-note-title{
                position:relative;

                flex-shrink:0;

                margin:
                    0 0 10px;

                padding:
                    0 4px 8px;

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    Georgia,
                    serif;

                font-size:
                    clamp(23px, 2.3vw, 31px);

                color:
                    #653a37;

                text-align:right;
            }


            .banin-diary-note-title::after{
                content:"";

                position:absolute;

                right:0;
                bottom:0;

                width:57%;
                height:1px;

                background:
                    linear-gradient(
                        270deg,
                        rgba(150,82,72,.48),
                        transparent
                    );
            }


            .banin-diary-writing{
                position:relative;

                flex:1;

                min-height:0;

                padding:
                    7px 38px 11px 11px;

                overflow-y:auto;

                background:
                    repeating-linear-gradient(
                        to bottom,
                        transparent 0,
                        transparent 33px,
                        rgba(102,77,58,.19) 34px
                    );

                border-radius:4px;
            }


            .banin-diary-writing::before{
                content:"";

                position:absolute;

                right:25px;
                top:0;
                bottom:0;

                width:1px;

                background:
                    rgba(172,86,87,.25);
            }


            .banin-diary-writing::-webkit-scrollbar{
                width:5px;
            }


            .banin-diary-writing::-webkit-scrollbar-thumb{
                border-radius:10px;

                background:
                    rgba(110,72,45,.30);
            }


            .banin-diary-note-text{
                position:relative;

                margin:0;

                padding-bottom:16px;

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    sans-serif;

                font-size:
                    clamp(15px, 1.45vw, 18px);

                font-weight:500;

                line-height:1.9;

                color:
                    rgba(70,48,39,.92);

                white-space:pre-line;

                text-align:right;

                z-index:2;
            }


            .banin-diary-signature{
                position:relative;

                margin:
                    12px 5px 6px;

                font-family:
                    "BaninDream",
                    Georgia,
                    serif;

                font-size:21px;

                color:
                    #79433f;

                text-align:left;

                transform:
                    rotate(-2deg);

                z-index:2;
            }


            /*==========================================
            DIARY NAVIGATION
            ==========================================*/

            .banin-diary-navigation{
                position:absolute;

                left:50%;
                bottom:12px;

                display:flex;

                align-items:center;

                gap:11px;

                transform:
                    translateX(-50%);

                z-index:80;
            }


            .banin-diary-nav-button{
                width:39px;
                height:33px;

                display:flex;

                align-items:center;
                justify-content:center;

                border:
                    1px solid
                    rgba(111,69,39,.38);

                border-radius:50%;

                background:
                    linear-gradient(
                        145deg,
                        rgba(255,242,204,.91),
                        rgba(215,181,119,.82)
                    );

                color:
                    #704934;

                font-family:
                    Georgia,
                    serif;

                font-size:18px;

                cursor:pointer;

                transition:
                    transform .22s ease,
                    opacity .22s ease;
            }


            .banin-diary-nav-button:hover{
                transform:
                    translateY(-2px)
                    scale(1.07);
            }


            .banin-diary-nav-button:disabled{
                opacity:.30;

                cursor:default;

                transform:none;
            }


            .banin-diary-page-number{
                min-width:54px;

                padding:
                    3px 8px;

                border-radius:20px;

                background:
                    rgba(125,79,46,.055);

                font-family:
                    Georgia,
                    serif;

                font-size:14px;

                color:
                    rgba(88,55,38,.72);

                text-align:center;
            }


            /*==========================================
            ARTWORK VIEWER
            ==========================================*/

            #baninDiaryArtworkViewer{
                position:fixed;

                inset:0;

                display:flex;

                align-items:center;
                justify-content:center;

                padding:
                    32px 90px;

                background:
                    radial-gradient(
                        circle,
                        rgba(39,20,52,.72),
                        rgba(2,2,8,.96)
                    );

                backdrop-filter:
                    blur(12px);

                -webkit-backdrop-filter:
                    blur(12px);

                opacity:0;
                visibility:hidden;
                pointer-events:none;

                transition:
                    opacity .32s ease,
                    visibility .32s ease;

                z-index:2147483600;
            }


            #baninDiaryArtworkViewer.viewer-opened{
                opacity:1;
                visibility:visible;
                pointer-events:auto;

                animation:
                    diaryViewerAppear
                    .32s
                    ease
                    both;
            }


            .banin-diary-viewer-stage{
                position:relative;

                width:
                    min(1320px, 88vw);

                height:
                    min(820px, 86vh);

                display:flex;

                flex-direction:column;

                align-items:center;
                justify-content:center;

                gap:14px;

                padding:
                    25px 25px 20px;

                border:
                    1px solid
                    rgba(255,218,151,.36);

                border-radius:24px;

                background:
                    linear-gradient(
                        145deg,
                        rgba(32,18,42,.96),
                        rgba(15,11,28,.98)
                    );

                box-shadow:
                    0 35px 100px
                    rgba(0,0,0,.75),

                    0 0 50px
                    rgba(188,109,255,.20),

                    inset 0 0 26px
                    rgba(255,220,160,.06);

                overflow:hidden;
            }


            #baninDiaryArtworkViewer.viewer-opened
            .banin-diary-viewer-stage{
                animation:
                    diaryViewerStageAppear
                    .42s
                    cubic-bezier(.18,.84,.24,1)
                    both;
            }


            .banin-diary-viewer-image{
                max-width:100%;
                max-height:
                    calc(100% - 70px);

                display:block;

                object-fit:contain;

                border-radius:12px;

                box-shadow:
                    0 18px 55px
                    rgba(0,0,0,.65),

                    0 0 24px
                    rgba(255,203,124,.12);

                user-select:none;
                -webkit-user-drag:none;
            }


            .banin-diary-viewer-caption{
                width:100%;

                display:flex;

                align-items:center;
                justify-content:space-between;

                gap:20px;

                padding:
                    0 12px;

                color:
                    rgba(255,235,199,.94);
            }


            .banin-diary-viewer-title{
                overflow:hidden;

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    Georgia,
                    serif;

                font-size:
                    clamp(18px, 2vw, 25px);

                text-overflow:ellipsis;
                white-space:nowrap;
            }


            .banin-diary-viewer-counter{
                flex-shrink:0;

                padding:
                    5px 12px;

                border:
                    1px solid
                    rgba(255,219,151,.20);

                border-radius:20px;

                background:
                    rgba(255,255,255,.05);

                font-family:
                    Georgia,
                    serif;

                font-size:14px;
            }


            .banin-diary-viewer-close{
                position:absolute;

                right:17px;
                top:15px;

                width:42px;
                height:42px;

                display:flex;

                align-items:center;
                justify-content:center;

                padding:0;

                border:
                    1px solid
                    rgba(255,220,172,.36);

                border-radius:50%;

                background:
                    rgba(18,11,27,.72);

                color:
                    rgba(255,241,211,.96);

                font-family:
                    Georgia,
                    serif;

                font-size:28px;

                cursor:pointer;

                transition:
                    transform .22s ease,
                    background .22s ease;

                z-index:10;
            }


            .banin-diary-viewer-close:hover{
                transform:
                    rotate(8deg)
                    scale(1.08);

                background:
                    rgba(101,49,83,.86);
            }


            .banin-diary-viewer-arrow{
                position:absolute;

                top:50%;

                width:54px;
                height:70px;

                display:flex;

                align-items:center;
                justify-content:center;

                padding:0;

                border:
                    1px solid
                    rgba(255,220,172,.30);

                border-radius:50%;

                background:
                    rgba(19,12,30,.72);

                color:
                    rgba(255,239,205,.96);

                font-family:
                    Georgia,
                    serif;

                font-size:38px;

                cursor:pointer;

                transform:
                    translateY(-50%);

                transition:
                    transform .22s ease,
                    background .22s ease;

                z-index:10;
            }


            .banin-diary-viewer-arrow:hover{
                background:
                    rgba(104,52,91,.88);
            }


            .banin-diary-viewer-previous{
                left:18px;
            }


            .banin-diary-viewer-previous:hover{
                transform:
                    translateY(-50%)
                    translateX(-3px)
                    scale(1.05);
            }


            .banin-diary-viewer-next{
                right:18px;
            }


            .banin-diary-viewer-next:hover{
                transform:
                    translateY(-50%)
                    translateX(3px)
                    scale(1.05);
            }

        `;


        document.head.appendChild(
            style
        );

    },


    /*==================================================
    BUILD
    ==================================================*/

    build(){

        this.overlay =
            document.createElement(
                "div"
            );

        this.book =
            document.createElement(
                "div"
            );

        this.leftPage =
            document.createElement(
                "section"
            );

        this.rightPage =
            document.createElement(
                "section"
            );

        this.closeButton =
            document.createElement(
                "button"
            );


        this.overlay.id =
            "baninDiaryOverlay";

        this.book.className =
            "banin-diary-book";

        this.leftPage.className =
            "banin-diary-page banin-diary-left-page";

        this.rightPage.className =
            "banin-diary-page banin-diary-right-page";

        this.closeButton.className =
            "banin-diary-close";

        this.closeButton.type =
            "button";

        this.closeButton.textContent =
            "×";


        this.buildLeftPage();
        this.buildRightPage();
        this.buildNavigation();


        this.book.appendChild(
            this.leftPage
        );

        this.book.appendChild(
            this.rightPage
        );

        this.book.appendChild(
            this.closeButton
        );


        this.overlay.appendChild(
            this.book
        );


        document.body.appendChild(
            this.overlay
        );


        this.buildArtworkViewer();


        this.closeButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.close();

            }
        );


        this.overlay.addEventListener(
            "click",
            event => {

                if(event.target === this.overlay){
                    this.close();
                }

            }
        );


        window.addEventListener(
            "keydown",
            event => {

                if(this.viewerOpened){

                    if(event.key === "Escape"){
                        this.closeArtworkViewer();
                        return;
                    }

                    if(event.key === "ArrowLeft"){
                        this.showPreviousArtwork();
                        return;
                    }

                    if(event.key === "ArrowRight"){
                        this.showNextArtwork();
                    }

                    return;
                }


                if(
                    event.key === "Escape" &&
                    this.opened
                ){
                    this.close();
                }

            }
        );

    },


    /*==================================================
    BUILD LEFT PAGE
    ==================================================*/

    buildLeftPage(){

        const smallLabel =
            document.createElement(
                "div"
            );

        this.currentDate =
            document.createElement(
                "div"
            );

        this.currentTitle =
            document.createElement(
                "h2"
            );

        const divider =
            document.createElement(
                "div"
            );

        const listTitle =
            document.createElement(
                "div"
            );

        this.noteList =
            document.createElement(
                "div"
            );


        smallLabel.className =
            "banin-diary-small-label";

        this.currentDate.className =
            "banin-diary-date";

        this.currentTitle.className =
            "banin-diary-left-title";

        divider.className =
            "banin-diary-divider";

        listTitle.className =
            "banin-diary-list-title";

        this.noteList.className =
            "banin-diary-note-list";


        smallLabel.textContent =
            "Private pages";

        listTitle.textContent =
            "Little notes";


        this.leftPage.appendChild(
            smallLabel
        );

        this.leftPage.appendChild(
            this.currentDate
        );

        this.leftPage.appendChild(
            this.currentTitle
        );

        this.leftPage.appendChild(
            divider
        );

        this.leftPage.appendChild(
            listTitle
        );

        this.leftPage.appendChild(
            this.noteList
        );


        this.buildNoteList();

    },


    buildNoteList(){

        this.noteList.innerHTML =
            "";


        const notes =
            this.getNotes();


        notes.forEach(
            (note, index) => {

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "banin-diary-list-button";

                button.textContent =
                    note.title || "Diary Note";


                button.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();

                        this.changeNote(
                            index
                        );

                    }
                );


                this.noteList.appendChild(
                    button
                );

            }
        );

    },


    /*==================================================
    BUILD RIGHT PAGE
    ==================================================*/

    buildRightPage(){

        const content =
            document.createElement(
                "div"
            );

        this.artworkFrame =
            document.createElement(
                "div"
            );

        this.artworkImage =
            document.createElement(
                "img"
            );

        this.artworkPlaceholder =
            document.createElement(
                "div"
            );

        const placeholderIcon =
            document.createElement(
                "span"
            );

        const placeholderText =
            document.createElement(
                "small"
            );

        this.noteTitle =
            document.createElement(
                "h3"
            );

        const writing =
            document.createElement(
                "div"
            );

        this.noteText =
            document.createElement(
                "p"
            );

        this.noteSignature =
            document.createElement(
                "div"
            );


        content.className =
            "banin-diary-right-content";

        this.artworkFrame.className =
            "banin-diary-artwork-frame";

        this.artworkImage.className =
            "banin-diary-artwork-image";

        this.artworkPlaceholder.className =
            "banin-diary-artwork-placeholder";

        this.noteTitle.className =
            "banin-diary-note-title";

        writing.className =
            "banin-diary-writing";

        this.noteText.className =
            "banin-diary-note-text";

        this.noteSignature.className =
            "banin-diary-signature";


        this.artworkImage.alt =
            "Diary memory";

        this.artworkImage.draggable =
            false;


        this.artworkFrame.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                const notes =
                    this.getNotes();

                const currentNote =
                    notes[this.currentIndex];


                if(
                    currentNote &&
                    typeof currentNote.artwork === "string" &&
                    currentNote.artwork.trim() !== ""
                ){
                    this.openArtworkViewer(
                        this.currentIndex
                    );
                }

            }
        );


        placeholderIcon.textContent =
            "♡";

        placeholderText.textContent =
            "A little memory will live here";


        this.artworkPlaceholder.appendChild(
            placeholderIcon
        );

        this.artworkPlaceholder.appendChild(
            placeholderText
        );


        this.artworkFrame.appendChild(
            this.artworkImage
        );

        this.artworkFrame.appendChild(
            this.artworkPlaceholder
        );


        writing.appendChild(
            this.noteText
        );

        writing.appendChild(
            this.noteSignature
        );


        content.appendChild(
            this.artworkFrame
        );

        content.appendChild(
            this.noteTitle
        );

        content.appendChild(
            writing
        );


        this.rightPage.appendChild(
            content
        );

    },


    /*==================================================
    BUILD DIARY NAVIGATION
    ==================================================*/

    buildNavigation(){

        const navigation =
            document.createElement(
                "div"
            );

        this.previousButton =
            document.createElement(
                "button"
            );

        this.nextButton =
            document.createElement(
                "button"
            );

        this.pageNumber =
            document.createElement(
                "div"
            );


        navigation.className =
            "banin-diary-navigation";

        this.previousButton.className =
            "banin-diary-nav-button";

        this.nextButton.className =
            "banin-diary-nav-button";

        this.pageNumber.className =
            "banin-diary-page-number";


        this.previousButton.type =
            "button";

        this.nextButton.type =
            "button";


        this.previousButton.textContent =
            "‹";

        this.nextButton.textContent =
            "›";


        this.previousButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.changeNote(
                    this.currentIndex - 1
                );

            }
        );


        this.nextButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.changeNote(
                    this.currentIndex + 1
                );

            }
        );


        navigation.appendChild(
            this.previousButton
        );

        navigation.appendChild(
            this.pageNumber
        );

        navigation.appendChild(
            this.nextButton
        );


        this.book.appendChild(
            navigation
        );

    },


    /*==================================================
    BUILD ARTWORK VIEWER
    ==================================================*/

    buildArtworkViewer(){

        this.viewerOverlay =
            document.createElement(
                "div"
            );

        this.viewerStage =
            document.createElement(
                "div"
            );

        this.viewerImage =
            document.createElement(
                "img"
            );

        this.viewerCloseButton =
            document.createElement(
                "button"
            );

        this.viewerPreviousButton =
            document.createElement(
                "button"
            );

        this.viewerNextButton =
            document.createElement(
                "button"
            );

        const caption =
            document.createElement(
                "div"
            );

        this.viewerTitle =
            document.createElement(
                "div"
            );

        this.viewerCounter =
            document.createElement(
                "div"
            );


        this.viewerOverlay.id =
            "baninDiaryArtworkViewer";

        this.viewerStage.className =
            "banin-diary-viewer-stage";

        this.viewerImage.className =
            "banin-diary-viewer-image";

        this.viewerCloseButton.className =
            "banin-diary-viewer-close";

        this.viewerPreviousButton.className =
            "banin-diary-viewer-arrow banin-diary-viewer-previous";

        this.viewerNextButton.className =
            "banin-diary-viewer-arrow banin-diary-viewer-next";

        caption.className =
            "banin-diary-viewer-caption";

        this.viewerTitle.className =
            "banin-diary-viewer-title";

        this.viewerCounter.className =
            "banin-diary-viewer-counter";


        this.viewerCloseButton.type =
            "button";

        this.viewerPreviousButton.type =
            "button";

        this.viewerNextButton.type =
            "button";


        this.viewerCloseButton.textContent =
            "×";

        this.viewerPreviousButton.textContent =
            "‹";

        this.viewerNextButton.textContent =
            "›";


        this.viewerImage.alt =
            "Diary artwork";

        this.viewerImage.draggable =
            false;


        caption.appendChild(
            this.viewerTitle
        );

        caption.appendChild(
            this.viewerCounter
        );


        this.viewerStage.appendChild(
            this.viewerImage
        );

        this.viewerStage.appendChild(
            caption
        );

        this.viewerStage.appendChild(
            this.viewerCloseButton
        );

        this.viewerStage.appendChild(
            this.viewerPreviousButton
        );

        this.viewerStage.appendChild(
            this.viewerNextButton
        );


        this.viewerOverlay.appendChild(
            this.viewerStage
        );


        document.body.appendChild(
            this.viewerOverlay
        );


        this.viewerCloseButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.closeArtworkViewer();

            }
        );


        this.viewerPreviousButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.showPreviousArtwork();

            }
        );


        this.viewerNextButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.showNextArtwork();

            }
        );


        this.viewerStage.addEventListener(
            "click",
            event => {

                event.stopPropagation();

            }
        );


        this.viewerOverlay.addEventListener(
            "click",
            event => {

                if(
                    event.target ===
                    this.viewerOverlay
                ){
                    this.closeArtworkViewer();
                }

            }
        );

    },


    /*==================================================
    OBJECT BINDING
    ==================================================*/

    bindDiaryObject(){

        const diaryObject =
            document.getElementById(
                "diaryContainer"
            );


        if(!diaryObject){

            console.warn(
                "❌ DiarySystem: diaryContainer not found"
            );

            return;
        }


        diaryObject.style.pointerEvents =
            "auto";

        diaryObject.style.cursor =
            "pointer";


        diaryObject.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                this.open();

            }
        );

    },


    /*==================================================
    DATA
    ==================================================*/

    getNotes(){

        if(
            window.DiaryData &&
            Array.isArray(
                window.DiaryData.notes
            )
        ){
            return window.DiaryData.notes;
        }

        return [];

    },


    getArtworkNotes(){

        return this.getNotes()
            .map(
                (note, noteIndex) => ({
                    note,
                    noteIndex
                })
            )
            .filter(
                item =>
                    item.note &&
                    typeof item.note.artwork ===
                        "string" &&
                    item.note.artwork.trim() !==
                        ""
            );

    },


    /*==================================================
    OPEN / CLOSE DIARY
    ==================================================*/

    open(){

        if(
            !this.overlay ||
            this.opened
        ){
            return;
        }


        this.opened =
            true;


        this.overlay.classList.add(
            "diary-opened"
        );


        document.body.style.overflow =
            "hidden";


        this.renderNote(
            this.currentIndex,
            false
        );

    },


    close(){

        if(this.viewerOpened){
            this.closeArtworkViewer();
        }


        if(
            !this.overlay ||
            !this.opened
        ){
            return;
        }


        this.opened =
            false;


        this.overlay.classList.remove(
            "diary-opened"
        );


        document.body.style.overflow =
            "";

    },


    /*==================================================
    NOTE CHANGE
    ==================================================*/

    changeNote(index){

        const notes =
            this.getNotes();


        if(
            this.pageTurning ||
            index < 0 ||
            index >= notes.length ||
            index === this.currentIndex
        ){
            return;
        }


        this.pageTurning =
            true;


        this.rightPage.classList.remove(
            "diary-changing"
        );


        void this.rightPage.offsetWidth;


        this.rightPage.classList.add(
            "diary-changing"
        );


        window.setTimeout(
            () => {

                this.renderNote(
                    index,
                    true
                );

            },
            245
        );


        window.setTimeout(
            () => {

                this.rightPage.classList.remove(
                    "diary-changing"
                );

                this.pageTurning =
                    false;

            },
            590
        );

    },


    /*==================================================
    RENDER NOTE
    ==================================================*/

    renderNote(
        index,
        scrollList = true
    ){

        const notes =
            this.getNotes();


        if(notes.length === 0){

            this.currentDate.textContent =
                "";

            this.currentTitle.textContent =
                "Diary";

            this.noteTitle.textContent =
                "No notes yet";

            this.noteText.textContent =
                "";

            this.noteSignature.textContent =
                "";

            this.renderArtwork(
                ""
            );

            return;
        }


        const safeIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    notes.length - 1
                )
            );


        const note =
            notes[safeIndex];


        this.currentIndex =
            safeIndex;


        this.currentDate.textContent =
            note.date || "";

        this.currentTitle.textContent =
            note.title || "Diary";

        this.noteTitle.textContent =
            note.title || "";

        this.noteText.textContent =
            note.text || "";

        this.noteSignature.textContent =
            note.signature || "";


        this.renderArtwork(
            note.artwork
        );


        const buttons =
            this.noteList.querySelectorAll(
                ".banin-diary-list-button"
            );


        buttons.forEach(
            (button, buttonIndex) => {

                button.classList.toggle(
                    "active",
                    buttonIndex === safeIndex
                );


                if(
                    scrollList &&
                    buttonIndex === safeIndex
                ){
                    button.scrollIntoView({
                        block:
                            "nearest",

                        behavior:
                            "smooth"
                    });
                }

            }
        );


        this.previousButton.disabled =
            safeIndex === 0;


        this.nextButton.disabled =
            safeIndex ===
            notes.length - 1;


        this.pageNumber.textContent =
            `${safeIndex + 1} / ${notes.length}`;

    },


    renderArtwork(path){

        const validPath =
            typeof path === "string" &&
            path.trim() !== "";


        if(!validPath){

            this.artworkFrame.classList.remove(
                "has-artwork"
            );

            this.artworkImage.style.display =
                "none";

            this.artworkImage.removeAttribute(
                "src"
            );

            this.artworkPlaceholder.style.display =
                "flex";

            return;
        }


        this.artworkImage.onload =
            () => {

                this.artworkFrame.classList.add(
                    "has-artwork"
                );

                this.artworkImage.style.display =
                    "block";

                this.artworkPlaceholder.style.display =
                    "none";

            };


        this.artworkImage.onerror =
            () => {

                this.artworkFrame.classList.remove(
                    "has-artwork"
                );

                this.artworkImage.style.display =
                    "none";

                this.artworkPlaceholder.style.display =
                    "flex";

            };


        this.artworkImage.src =
            path;

    },


    /*==================================================
    ARTWORK VIEWER
    ==================================================*/

    openArtworkViewer(
        noteIndex =
            this.currentIndex
    ){

        if(
            !this.viewerOverlay ||
            !this.viewerImage
        ){
            return;
        }


        const artworkNotes =
            this.getArtworkNotes();


        if(
            artworkNotes.length === 0
        ){
            return;
        }


        let artworkIndex =
            artworkNotes.findIndex(
                item =>
                    item.noteIndex ===
                    noteIndex
            );


        if(artworkIndex < 0){
            artworkIndex = 0;
        }


        this.viewerOpened =
            true;


        this.viewerOverlay.classList.add(
            "viewer-opened"
        );


        this.showArtworkAt(
            artworkIndex
        );

    },


    closeArtworkViewer(){

        if(
            !this.viewerOverlay ||
            !this.viewerOpened
        ){
            return;
        }


        this.viewerOpened =
            false;


        this.viewerOverlay.classList.remove(
            "viewer-opened"
        );

    },


    showArtworkAt(index){

        const artworkNotes =
            this.getArtworkNotes();


        if(
            artworkNotes.length === 0
        ){
            return;
        }


        const safeIndex =
            (
                index %
                    artworkNotes.length +
                artworkNotes.length
            ) %
            artworkNotes.length;


        const item =
            artworkNotes[safeIndex];


        this.viewerIndex =
            safeIndex;


        this.viewerImage.src =
            item.note.artwork;


        this.viewerImage.alt =
            item.note.title ||
            "Diary artwork";


        this.viewerTitle.textContent =
            item.note.title ||
            "Diary memory";


        this.viewerCounter.textContent =
            `${safeIndex + 1} / ${artworkNotes.length}`;


        const hasMultipleArtworks =
            artworkNotes.length > 1;


        this.viewerPreviousButton.style.display =
            hasMultipleArtworks
                ? "flex"
                : "none";


        this.viewerNextButton.style.display =
            hasMultipleArtworks
                ? "flex"
                : "none";

    },


    showPreviousArtwork(){

        if(!this.viewerOpened){
            return;
        }


        this.showArtworkAt(
            this.viewerIndex - 1
        );

    },


    showNextArtwork(){

        if(!this.viewerOpened){
            return;
        }


        this.showArtworkAt(
            this.viewerIndex + 1
        );

    },


    /*==================================================
    DESTROY
    ==================================================*/

    destroy(){

        if(this.overlay){
            this.overlay.remove();
        }


        if(this.viewerOverlay){
            this.viewerOverlay.remove();
        }


        const style =
            document.getElementById(
                "baninDiarySystemStyles"
            );


        if(style){
            style.remove();
        }


        this.initialized =
            false;

        this.opened =
            false;

        this.viewerOpened =
            false;

        this.pageTurning =
            false;


        this.currentIndex =
            0;

        this.viewerIndex =
            0;


        this.overlay =
            null;

        this.book =
            null;

        this.leftPage =
            null;

        this.rightPage =
            null;

        this.viewerOverlay =
            null;

        this.viewerStage =
            null;

        this.viewerImage =
            null;

    }

};


window.DiarySystem =
    DiarySystem;


/*==================================================
MAIN.JS COMPATIBILITY
==================================================*/

function initializeDiary(){

    DiarySystem.initialize();

}


window.initializeDiary =
    initializeDiary;