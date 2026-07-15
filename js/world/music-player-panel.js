/*==================================================
BANIN UNIVERSE
MUSIC PLAYER PANEL
Suzume / RADWIMPS
Clean Overlay + Advanced Controls
==================================================*/

"use strict";

const MusicPlayerPanel = {

    overlay: null,
    panel: null,
    audio: null,

    parts: {},

    isOpen: false,
    isReady: false,
    autoplayArmed: false,
    stoppedByUser: false,

    repeatEnabled: true,
    shuffleEnabled: false,

    audioPath: "assets/audio/music.mp3",
    backgroundPath: "assets/world/music-panel-bg.webp",
whyBackgroundPath: "assets/world/music-why-bg.webp",

whyImageLoaded: false,
whyImageNaturalWidth: 0,
whyImageNaturalHeight: 0,
whyMagnifierZoom: 1.55,
whyMagnifierSize: 190,

title: "Suzume",
artist: "RADWIMPS",

    lyricsMeaningText: `
♫♬♫♬♫♬♫♬♫♬♫♬♫♬♫♬♫♬♫♬

君の中にある 赤と青き線
درون تو، دو خطِ سرخ و آبی هست

それらが結ばれるのは 心の臓
اون دوتا توی قلبت به هم گره می‌خورن

風の中でも負けないような声で
با صدایی که حتی وسط باد هم کم نمیاره

届ける言葉を今は育ててる
دارم کلماتی رو پرورش می‌دم تا یه روز بهت برسونم

時はまくらぎ 風はにきはだ
زمان مثل تیرک راه‌آهنه، باد مثل پوست درخته

星はうぶすな 人はかげろう
ستاره‌ها زادگاه ما هستن، آدما مثل سراب میان و میرن

なんで泣いてるのと聞かれ 答えれる涙なんかじゃ
اگه بپرسن “چرا گریه می‌کنی؟”، این اشک‌ها نمی‌تونن توضیح بدن

僕ら出逢えたことの意味にはまるで追いつかない
چون هیچ اشکی نمی‌تونه معنیِ این آشناییِ ما رو برسونه

この身ひとつじゃ 足りない叫び
یه تنِ تنها برای این فریاد کافی نیست

君の手に触れた時にだけ震えた心があったよ
فقط وقتی دستتو لمس کردم، قلبم شروع کرد به لرزیدن

意味をいくつ越えれば僕らは辿りつけるのかな
از چند تا معنا باید بگذریم تا به هم برسیم؟

愚かさでいい 醜さでいい
حتی اگه احمق یا زشت باشیم، عیبی نداره

正しさのその先で 君と手を取りたい
می‌خوام اون‌ورِ درستی‌ها، دستِ تو رو بگیرم

思い出せない 大切な記憶
یه خاطره‌ی مهم هست که دیگه یادم نمیاد

言葉にならない ここにある想い
یه احساسی توی دلمه که توی کلمه جا نمی‌شه

もしかしたら もしかしたら
شاید… شاید واقعاً…

それだけでこの心はできてる
همین حسا بودن که این دلمو ساخته‌ن

もしかしたら もしかしたら
شاید… شاید هنوزم…

君に「気づいて」と今もその胸を 打ち鳴らす
دلم هنوزم داره می‌کوبه که بهت بگه “منو ببین…”

なんで泣いてるのと聞かれ 答えれる涙なんかじゃ
اگه بپرسن چرا گریه می‌کنی، این اشکا کافی نیستن

僕ら出逢えたことの意味にはまるで追いつかない
برای گفتنِ معنیِ این آشناییِ ما، هیچ اشکی کافی نیست

この身ひとつじゃ 足りない叫び
یه بدنِ تنها برای این فریاد کمه

君の手に触れた時にだけ震えた心があったよ
فقط وقتی دستتو گرفتم، اون دلِ لرزون رو پیدا کردم

意味をいくつ越えれば僕らは辿りつけるのかな
از چند تا معنا باید بگذریم تا به هم برسیم؟

愚かさでいい 醜さでいい
می‌تونه احمقانه باشه، می‌تونه زشت باشه

正しさのその先で 君と生きてきたい
من می‌خوام اون‌ورِ درستی‌ها، کنار تو زندگی کنم

♫♬♫♬♫♬♫♬♫♬♫♬♫♬♫♬♫♬♫♬
`,

    create(){

        if(this.isReady) return;

        this.injectStyles();
        this.build();
        this.createAudio();
        this.bindEvents();

        this.updateModeButtons();
        this.updateRangeFills();

        this.isReady = true;

        console.log("🎧 MusicPlayerPanel ready");

    },

    injectStyles(){

        const oldStyle = document.getElementById("musicPlayerPanelStyles");
        if(oldStyle) oldStyle.remove();

        const style = document.createElement("style");
        style.id = "musicPlayerPanelStyles";

        style.textContent = `
            @keyframes musicPanelFadeIn{
                from{
                    opacity:0;
                    transform:scale(.96) translateY(18px);
                }

                to{
                    opacity:1;
                    transform:scale(1) translateY(0);
                }
            }

            @keyframes musicPanelNoteFloat{
                0%{
                    opacity:0;
                    transform:translateY(18px) scale(.65) rotate(-8deg);
                }

                20%{
                    opacity:.82;
                }

                100%{
                    opacity:0;
                    transform:translateY(-78px) scale(1.05) rotate(16deg);
                }
            }

#baninUniverseLogoContainer.music-panel-logo-hidden{
    opacity:0 !important;
    visibility:hidden !important;
    pointer-events:none !important;

    transition:
        opacity .32s ease,
        visibility .32s ease !important;
}

            #musicPlayerOverlay{
                position:fixed;
                inset:0;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:24px;
                background:
                    radial-gradient(circle at 50% 45%, rgba(80,40,130,.22), transparent 48%),
                    rgba(6,5,18,.62);
                backdrop-filter:blur(7px);
                -webkit-backdrop-filter:blur(7px);
                opacity:0;
                visibility:hidden;
                pointer-events:none;
                transition:
                    opacity .35s ease,
                    visibility .35s ease;
                z-index:9999;
            }

            #musicPlayerOverlay.visible{
                opacity:1;
                visibility:visible;
                pointer-events:auto;
            }

            .music-player-panel{
                position:relative;
                width:min(960px, calc(100vw - 34px));
                height:min(560px, calc(100vh - 34px));
                border-radius:30px;
                overflow:hidden;
                background:
                    linear-gradient(90deg, rgba(8,5,20,.08), rgba(12,5,28,.16)),
                    url("assets/world/music-panel-bg.webp");
                background-size:cover;
                background-position:center;
                border:1px solid rgba(255,220,150,.34);
                box-shadow:
                    0 28px 80px rgba(0,0,0,.62),
                    0 0 38px rgba(180,80,255,.22),
                    inset 0 0 0 1px rgba(255,255,255,.08);
                animation:musicPanelFadeIn .45s ease both;
            }

            .music-player-panel::before{
                content:"";
                position:absolute;
                inset:0;
                background:
                    radial-gradient(circle at 78% 48%, rgba(10,4,24,.18), rgba(10,4,24,.26) 55%, rgba(4,2,12,.18)),
                    linear-gradient(90deg, rgba(0,0,0,.03), rgba(0,0,0,.20));
                pointer-events:none;
                z-index:1;
            }

            .music-player-panel::after{
                content:"";
                position:absolute;
                inset:12px;
                border-radius:24px;
                border:1px solid rgba(255,225,160,.15);
                pointer-events:none;
                z-index:2;
            }

            .music-player-close{
                position:absolute;
                top:18px;
                right:18px;
                width:42px;
                height:42px;
                border-radius:50%;
                border:1px solid rgba(255,230,170,.46);
                background:rgba(18,8,34,.58);
                color:rgba(255,236,190,.96);
                font-size:25px;
                line-height:1;
                cursor:pointer;
                z-index:30;
                box-shadow:
                    0 0 18px rgba(255,180,90,.18),
                    inset 0 0 12px rgba(255,255,255,.08);
                transition:
                    transform .22s ease,
                    background .22s ease,
                    box-shadow .22s ease;
            }

            .music-player-close:hover{
                transform:scale(1.08) rotate(6deg);
                background:rgba(42,16,70,.76);
                box-shadow:
                    0 0 24px rgba(255,205,120,.34),
                    0 0 30px rgba(190,80,255,.22);
            }

            .music-player-content{
                position:relative;
                z-index:10;
                height:100%;
                display:grid;
                grid-template-columns:1fr 380px;
                gap:24px;
                padding:54px 62px 48px 58px;
            }

            .music-player-left-space{
                position:relative;
                min-width:0;
                pointer-events:none;
            }

            .music-panel-floating-note{
                position:absolute;
                color:rgba(255,220,150,.72);
                text-shadow:
                    0 0 10px rgba(255,215,130,.70),
                    0 0 20px rgba(200,90,255,.34);
                opacity:0;
                font-family:Georgia, "Times New Roman", serif;
                font-weight:bold;
                animation:musicPanelNoteFloat 4.2s ease-in-out infinite;
            }

            .music-player-ui{
                align-self:center;
                width:100%;
                background:transparent;
                border:none;
                box-shadow:none;
                padding:0;
            }

.music-player-kicker{
    position:relative;
    left:3px;

    margin:0 0 8px;

    font-family:
        'BaninDream',
        'Cormorant Garamond',
        Georgia,
        "Times New Roman",
        serif;

    color:rgba(255,220,160,.86);

    font-size:16px;
    font-weight:600;
    font-style:italic;

    letter-spacing:1.6px;
    text-transform:none;

    text-shadow:
        0 2px 10px rgba(0,0,0,.72),
        0 0 12px rgba(255,205,120,.34),
        0 0 24px rgba(170,80,255,.18);
}

.music-player-title{
    margin:0;

    font-family:
        'BaninDream',
        'Cormorant Garamond',
        Georgia,
        "Times New Roman",
        serif;

    color:rgba(255,240,205,.98);

    font-size:35px;
    font-weight:700;
    font-style:italic;

    line-height:1.02;
    letter-spacing:1px;

    text-shadow:
        0 4px 12px rgba(0,0,0,.70),
        0 0 16px rgba(255,210,130,.46),
        0 0 34px rgba(185,90,255,.28),
        0 0 48px rgba(255,185,120,.16);
}

.music-player-artist{
    margin:8px 0 30px;

    font-family:
        'BaninDream',
        'Cormorant Garamond',
        Georgia,
        "Times New Roman",
        serif;

    color:rgba(224,196,255,.94);

    font-size:22px;
    font-weight:500;
    font-style:italic;

    letter-spacing:1.4px;

    text-shadow:
        0 3px 10px rgba(0,0,0,.66),
        0 0 14px rgba(170,90,255,.32),
        0 0 22px rgba(255,205,140,.18);
}

.music-progress-wrap{
    position:relative;
    top:8px;

    margin:63px 0 22px;
}

            .music-progress-time{
                display:flex;
                justify-content:space-between;
                margin-top:8px;
                margin-bottom:0;
                color:rgba(235,215,255,.82);
                font-size:12px;
                font-variant-numeric:tabular-nums;
                text-shadow:0 2px 8px rgba(0,0,0,.70);
            }

            .music-range{
                --range-progress:0%;

                width:100%;
                height:18px;
                appearance:none;
                -webkit-appearance:none;
                background:transparent;
                cursor:pointer;
                accent-color:#8e55ff;
            }

            .music-range::-webkit-slider-runnable-track{
                height:7px;
                border-radius:999px;
                background:
                    linear-gradient(
                        90deg,
                        rgba(150,85,255,.96) 0%,
                        rgba(112,55,220,.94) var(--range-progress),
                        rgba(28,14,58,.72) var(--range-progress),
                        rgba(15,7,32,.78) 100%
                    );
                border:1px solid rgba(210,185,255,.24);
                box-shadow:
                    0 0 14px rgba(150,80,255,.32),
                    inset 0 0 8px rgba(0,0,0,.42);
            }

            .music-range::-webkit-slider-thumb{
                appearance:none;
                -webkit-appearance:none;
                width:18px;
                height:18px;
                margin-top:-6px;
                border-radius:50%;
                background:
                    radial-gradient(circle at 35% 30%, rgba(255,240,210,.75), rgba(160,95,255,.96) 42%, rgba(58,20,105,.98));
                border:2px solid rgba(255,224,150,.82);
                box-shadow:
                    0 0 12px rgba(160,90,255,.62),
                    0 0 16px rgba(255,210,130,.34);
            }

            .music-range::-moz-range-track{
                height:7px;
                border-radius:999px;
                background:
                    linear-gradient(
                        90deg,
                        rgba(150,85,255,.96) 0%,
                        rgba(112,55,220,.94) var(--range-progress),
                        rgba(28,14,58,.72) var(--range-progress),
                        rgba(15,7,32,.78) 100%
                    );
                border:1px solid rgba(210,185,255,.24);
                box-shadow:
                    0 0 14px rgba(150,80,255,.32),
                    inset 0 0 8px rgba(0,0,0,.42);
            }

            .music-range::-moz-range-thumb{
                width:18px;
                height:18px;
                border-radius:50%;
                background:
                    radial-gradient(circle at 35% 30%, rgba(255,240,210,.75), rgba(160,95,255,.96) 42%, rgba(58,20,105,.98));
                border:2px solid rgba(255,224,150,.82);
                box-shadow:
                    0 0 12px rgba(160,90,255,.62),
                    0 0 16px rgba(255,210,130,.34);
            }

            .music-play-center{
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
                gap:10px;
                margin:8px 0 22px;
            }

            .music-main-controls{
                display:flex;
                align-items:center;
                justify-content:center;
                gap:15px;
            }

            .music-play-button{
                width:64px;
                height:64px;
                border-radius:50%;
                border:2px solid rgba(255,224,150,.78);
                background:
                    radial-gradient(circle at 35% 28%, rgba(145,85,255,.38), transparent 36%),
                    linear-gradient(135deg, rgba(45,18,82,.96), rgba(13,6,30,.98));
                color:rgba(255,231,178,.96);
                font-size:25px;
                cursor:pointer;
                box-shadow:
                    0 0 20px rgba(255,205,120,.20),
                    0 0 30px rgba(125,75,255,.28),
                    inset 0 0 18px rgba(180,110,255,.20);
                transition:
                    transform .22s ease,
                    filter .22s ease,
                    box-shadow .22s ease,
                    background .22s ease;
            }

            .music-play-icon{
                display:inline-block;
                transform:translate(1px, 1px);
            }

            .music-pause-icon{
                display:inline-flex;
                align-items:center;
                justify-content:center;
                gap:7px;
                transform:translateY(2px);
            }

            .music-pause-icon span{
                display:block;
                width:5px;
                height:22px;
                border-radius:999px;
                background:currentColor;
            }

            .music-play-button:hover{
                transform:scale(1.08);
                filter:brightness(1.08);
                background:
                    radial-gradient(circle at 35% 28%, rgba(170,105,255,.45), transparent 36%),
                    linear-gradient(135deg, rgba(58,22,102,.98), rgba(15,6,34,.98));
                box-shadow:
                    0 0 26px rgba(255,210,120,.34),
                    0 0 42px rgba(150,85,255,.42),
                    inset 0 0 22px rgba(190,120,255,.24);
            }

            .music-side-button{
                width:46px;
                height:46px;
                border-radius:50%;
                border:1px solid rgba(255,224,150,.48);
                background:
                    linear-gradient(135deg, rgba(35,14,68,.82), rgba(10,5,25,.88));
                color:rgba(245,225,180,.94);
                font-size:13px;
                font-weight:800;
                cursor:pointer;
                box-shadow:
                    0 0 16px rgba(130,80,255,.22),
                    inset 0 0 14px rgba(190,120,255,.10);
                transition:
                    transform .22s ease,
                    background .22s ease,
                    box-shadow .22s ease;
            }

            .music-side-button:hover{
                transform:scale(1.08);
                background:
                    linear-gradient(135deg, rgba(56,22,98,.92), rgba(14,6,32,.94));
                box-shadow:
                    0 0 22px rgba(255,210,120,.24),
                    0 0 28px rgba(150,85,255,.30);
            }

            .music-mode-controls{
                display:flex;
                align-items:center;
                justify-content:center;
                gap:10px;
                margin-top:2px;
            }

            .music-mode-button{
                min-width:104px;
                height:32px;
                padding:0 13px;
                border-radius:999px;
                border:1px solid rgba(255,224,150,.30);
                background:
                    linear-gradient(135deg, rgba(28,12,58,.58), rgba(10,5,28,.66));
                color:rgba(226,210,245,.78);
                font-size:11px;
                font-weight:700;
                letter-spacing:.4px;
                cursor:pointer;
                box-shadow:
                    0 0 14px rgba(120,70,255,.12),
                    inset 0 0 12px rgba(255,255,255,.03);
                transition:
                    transform .22s ease,
                    color .22s ease,
                    border-color .22s ease,
                    box-shadow .22s ease,
                    background .22s ease;
            }

            .music-mode-button:hover{
                transform:translateY(-1px);
                color:rgba(255,235,190,.94);
                border-color:rgba(255,224,150,.48);
            }

            .music-mode-button.is-active{
                color:rgba(255,236,190,.98);
                border-color:rgba(255,224,150,.62);
                background:
                    linear-gradient(135deg, rgba(88,38,150,.78), rgba(30,12,72,.82));
                box-shadow:
                    0 0 18px rgba(150,85,255,.34),
                    0 0 20px rgba(255,205,120,.16),
                    inset 0 0 14px rgba(190,120,255,.12);
            }

            .music-status-text{
                min-height:18px;
                color:rgba(235,218,255,.74);
                font-size:12px;
                text-shadow:0 2px 8px rgba(0,0,0,.70);
            }

            .music-volume-row{
                display:flex;
                align-items:center;
                gap:12px;
                margin-top:4px;
            }

            .music-volume-icon{
                width:27px;
                height:27px;
                flex:0 0 27px;
                display:inline-flex;
                align-items:center;
                justify-content:center;
                color:rgba(255,224,150,.92);
                filter:
                    drop-shadow(0 0 8px rgba(255,205,120,.34))
                    drop-shadow(0 0 10px rgba(150,80,255,.24));
            }

            .music-volume-icon svg{
                width:25px;
                height:25px;
                display:block;
            }

            .music-action-row{
                position:relative;
                left:-40px;

                display:flex;
                align-items:center;
                justify-content:flex-end;
                gap:10px;

                margin-top:8px;
            }

            .music-why-button{
                width:210px;
                min-height:44px;
                padding:0 20px;

                border-radius:13px;

                border:1px solid rgba(255,220,150,.36);
                background:
                    linear-gradient(135deg, rgba(44,16,78,.54), rgba(14,6,34,.62));

                color:rgba(255,236,200,.96);
                font-size:15px;
                cursor:pointer;

                box-shadow:
                    0 0 22px rgba(160,80,255,.15),
                    inset 0 0 18px rgba(255,255,255,.04);

                transition:
                    transform .22s ease,
                    background .22s ease,
                    box-shadow .22s ease;

                text-shadow:0 2px 8px rgba(0,0,0,.72);
            }

            .music-why-button:hover{
                transform:translateY(-2px);
                background:
                    linear-gradient(135deg, rgba(72,26,118,.66), rgba(22,8,48,.72));
                box-shadow:
                    0 0 26px rgba(255,205,120,.24),
                    0 0 34px rgba(185,80,255,.22);
            }

            .music-why-heart{
                display:inline-block;
                margin-left:8px;
                color:rgba(255,105,185,.98);
                text-shadow:
                    0 0 8px rgba(255,120,190,.84),
                    0 0 18px rgba(255,80,170,.44);
                transform:translateY(1px);
            }

            .music-meaning-button{
                position:relative;

                width:54px;
                height:44px;

                border-radius:13px;
                border:1px solid rgba(255,220,150,.42);

                background:
                    linear-gradient(135deg, rgba(20,8,36,.28), rgba(14,6,28,.56)),
                    url("assets/world/music-panel-bg.webp");

                background-size:cover;
                background-position:center;

                color:rgba(255,236,200,.98);
                font-size:20px;
                cursor:pointer;

                box-shadow:
                    0 0 18px rgba(150,85,255,.24),
                    0 0 18px rgba(255,205,120,.12),
                    inset 0 0 18px rgba(255,255,255,.05);

                overflow:hidden;

                transition:
                    transform .22s ease,
                    box-shadow .22s ease,
                    filter .22s ease;
            }

            .music-meaning-button::before{
                content:"";
                position:absolute;
                inset:0;

                background:
                    radial-gradient(circle at 45% 35%, rgba(255,230,160,.24), transparent 34%),
                    radial-gradient(circle at 60% 70%, rgba(170,80,255,.22), transparent 46%);

                pointer-events:none;
            }

            .music-meaning-button span{
                position:relative;
                z-index:2;

                text-shadow:
                    0 0 8px rgba(255,225,150,.78),
                    0 0 14px rgba(160,80,255,.48);
            }

            .music-meaning-button:hover{
                transform:translateY(-2px) scale(1.04);
                filter:brightness(1.08);
                box-shadow:
                    0 0 24px rgba(255,205,120,.24),
                    0 0 34px rgba(160,85,255,.32),
                    inset 0 0 20px rgba(255,255,255,.07);
            }

            .music-lyrics-overlay{
                position:absolute;
                inset:0;

                display:flex;
                align-items:center;
                justify-content:center;

                padding:28px;

                opacity:0;
                visibility:hidden;
                pointer-events:none;

                background:
                    radial-gradient(circle at 50% 45%, rgba(95,45,150,.24), transparent 52%),
                    rgba(5,3,14,.58);

                backdrop-filter:blur(4px);
                -webkit-backdrop-filter:blur(4px);

                transition:
                    opacity .32s ease,
                    visibility .32s ease;

                z-index:45;
            }

            .music-lyrics-overlay.visible{
                opacity:1;
                visibility:visible;
                pointer-events:auto;
            }

            .music-lyrics-panel{
                position:relative;

                width:min(720px, 92%);
                height:min(455px, 84%);

                border-radius:26px;
                overflow:hidden;

                background:
                    linear-gradient(135deg, rgba(12,5,26,.36), rgba(8,3,20,.58)),
                    url("assets/world/music-panel-bg.webp");

                background-size:cover;
                background-position:center;

                border:1px solid rgba(255,220,150,.34);

                box-shadow:
                    0 24px 70px rgba(0,0,0,.58),
                    0 0 40px rgba(160,80,255,.28),
                    inset 0 0 0 1px rgba(255,255,255,.08);
            }

            .music-lyrics-panel::before{
                content:"";
                position:absolute;
                inset:0;

                background:
                    radial-gradient(circle at 50% 35%, rgba(32,10,58,.36), rgba(7,3,18,.68) 64%),
                    linear-gradient(180deg, rgba(0,0,0,.18), rgba(0,0,0,.28));

                pointer-events:none;
                z-index:1;
            }

            .music-lyrics-panel::after{
                content:"";
                position:absolute;
                inset:12px;

                border-radius:20px;
                border:1px solid rgba(255,230,170,.13);

                pointer-events:none;
                z-index:3;
            }

            .music-lyrics-close{
                position:absolute;
                top:16px;
                right:16px;

                width:36px;
                height:36px;

                border-radius:50%;
                border:1px solid rgba(255,224,150,.44);

                background:rgba(18,8,34,.64);
                color:rgba(255,236,200,.96);

                font-size:22px;
                line-height:1;

                cursor:pointer;
                z-index:8;

                box-shadow:
                    0 0 16px rgba(255,205,120,.16),
                    0 0 22px rgba(150,80,255,.14);
            }

            .music-lyrics-close:hover{
                transform:scale(1.08);
                background:rgba(48,18,82,.74);
            }

            .music-lyrics-title{
                position:relative;
                z-index:5;

                margin:24px 64px 10px;

                text-align:center;
                color:rgba(255,236,200,.98);

                font-size:24px;
                font-weight:800;

                text-shadow:
                    0 3px 12px rgba(0,0,0,.68),
                    0 0 18px rgba(255,205,120,.28),
                    0 0 28px rgba(160,80,255,.24);
            }

            .music-lyrics-scroll{
                position:relative;
                z-index:5;

                height:calc(100% - 78px);
                margin:0 18px 18px;
                padding:14px 28px 30px;

                overflow-y:auto;
                overflow-x:hidden;

                scrollbar-width:thin;
                scrollbar-color:rgba(160,95,255,.72) rgba(16,7,34,.48);
            }

            .music-lyrics-scroll::-webkit-scrollbar{
                width:8px;
            }

            .music-lyrics-scroll::-webkit-scrollbar-track{
                background:rgba(16,7,34,.48);
                border-radius:999px;
            }

            .music-lyrics-scroll::-webkit-scrollbar-thumb{
                background:
                    linear-gradient(180deg, rgba(160,95,255,.88), rgba(90,45,170,.82));
                border-radius:999px;
                border:1px solid rgba(255,220,150,.24);
            }

            .music-lyrics-text{
                max-width:600px;
                margin:0 auto;

                white-space:pre-line;
                text-align:center;

                color:rgba(248,236,255,.94);

                font-size:16px;
                line-height:2.35;
                font-weight:400;

                text-shadow:
                    0 2px 10px rgba(0,0,0,.76),
                    0 0 16px rgba(150,80,255,.16);
            }

            .music-lyrics-notes-layer{
                position:absolute;
                inset:0;

                pointer-events:none;
                overflow:hidden;

                z-index:4;
            }

            @keyframes musicLyricsNoteRise{
                0%{
                    opacity:0;
                    transform:translateY(34px) scale(.64) rotate(-10deg);
                }

                18%{
                    opacity:.78;
                }

                70%{
                    opacity:.48;
                }

                100%{
                    opacity:0;
                    transform:translateY(-110px) scale(1.1) rotate(18deg);
                }
            }

            .music-lyrics-floating-note{
                position:absolute;

                color:rgba(255,224,150,.74);

                font-family:Georgia, "Times New Roman", serif;
                font-weight:bold;

                text-shadow:
                    0 0 10px rgba(255,215,130,.72),
                    0 0 20px rgba(170,80,255,.42);

                opacity:0;

                animation:musicLyricsNoteRise 4.8s ease-in-out infinite;
            }

.music-why-overlay{
    position:absolute;
    inset:0;

    display:flex;
    align-items:center;
    justify-content:center;

    padding:8px;

    opacity:0;
    visibility:hidden;
    pointer-events:none;

    background:rgba(4,2,12,.72);

    backdrop-filter:blur(5px);
    -webkit-backdrop-filter:blur(5px);

    transition:
        opacity .34s ease,
        visibility .34s ease;

    z-index:48;
}

            .music-why-overlay.visible{
                opacity:1;
                visibility:visible;
                pointer-events:auto;
            }

.music-why-artwork-panel{
    position:relative;

    width:100%;
    height:100%;

    border-radius:28px;
    overflow:hidden;

    background:
        rgba(5,3,14,.92)
        url("assets/world/music-why-bg.webp");

    background-size:contain;
    background-position:center;
    background-repeat:no-repeat;

    border:1px solid rgba(255,220,150,.38);

    box-shadow:
        0 26px 80px rgba(0,0,0,.68),
        0 0 42px rgba(160,80,255,.28),
        0 0 28px rgba(255,205,120,.16),
        inset 0 0 0 1px rgba(255,255,255,.08);

    transform:scale(.96) translateY(18px);
    opacity:0;

    transition:
        transform .38s cubic-bezier(.2,.9,.2,1),
        opacity .34s ease;
}

            .music-why-overlay.visible .music-why-artwork-panel{
                transform:scale(1) translateY(0);
                opacity:1;
            }

            .music-why-artwork-panel::after{
                content:"";
                position:absolute;
                inset:12px;

                border-radius:22px;
                border:1px solid rgba(255,230,170,.16);

                pointer-events:none;
            }

.music-why-magnifier{
    position:absolute;

    width:190px;
    height:190px;

    border-radius:50%;

    opacity:0;
    visibility:hidden;
    pointer-events:none;

    z-index:6;

    background-image:url("assets/world/music-why-bg.webp");
    background-repeat:no-repeat;
    background-color:rgba(5,3,14,.96);

    border:2px solid rgba(255,224,150,.72);

    box-shadow:
        0 0 22px rgba(255,210,120,.34),
        0 0 34px rgba(160,85,255,.32),
        inset 0 0 18px rgba(255,255,255,.10);

    transform:translate(-50%, -50%) scale(.92);

    transition:
        opacity .16s ease,
        visibility .16s ease,
        transform .16s ease;

    overflow:hidden;
}

.music-why-magnifier.visible{
    opacity:1;
    visibility:visible;
    transform:translate(-50%, -50%) scale(1);
}

.music-why-magnifier::after{
    content:"";
    position:absolute;
    inset:0;

    border-radius:50%;

    background:
        radial-gradient(circle at 32% 28%, rgba(255,255,255,.20), transparent 28%),
        radial-gradient(circle at 50% 55%, transparent 58%, rgba(0,0,0,.20) 100%);

    pointer-events:none;
}

            .music-why-close{
                position:absolute;
                top:16px;
                right:16px;

                width:38px;
                height:38px;

                border-radius:50%;
                border:1px solid rgba(255,224,150,.50);

                background:rgba(18,8,34,.64);
                color:rgba(255,236,200,.96);

                font-size:23px;
                line-height:1;

                cursor:pointer;
                z-index:5;

                box-shadow:
                    0 0 16px rgba(255,205,120,.18),
                    0 0 22px rgba(150,80,255,.16);

                transition:
                    transform .22s ease,
                    background .22s ease,
                    box-shadow .22s ease;
            }

            .music-why-close:hover{
                transform:scale(1.08) rotate(5deg);
                background:rgba(48,18,82,.76);
                box-shadow:
                    0 0 24px rgba(255,205,120,.30),
                    0 0 30px rgba(160,85,255,.24);
            }

            .music-player-hint{
                margin:16px 0 0;
                color:rgba(220,200,245,.58);
                font-size:12px;
                line-height:1.65;
                text-shadow:0 2px 8px rgba(0,0,0,.72);
            }

            @media (max-width:760px){
                .music-player-panel{
                    height:min(620px, calc(100vh - 24px));
                }

                .music-player-content{
                    grid-template-columns:1fr;
                    padding:72px 24px 30px;
                }

                .music-player-left-space{
                    display:none;
                }

                .music-player-ui{
                    align-self:end;
                }

                .music-player-title{
                    font-size:40px;
                }

                .music-progress-wrap{
                    margin-top:34px;
                }

                .music-action-row{
                    left:0;
                    justify-content:center;
                }
            }
        `;

        document.head.appendChild(style);

    },

    build(){

        this.overlay = document.createElement("div");
        this.overlay.id = "musicPlayerOverlay";

        this.panel = document.createElement("div");
        this.panel.className = "music-player-panel";

        this.parts.closeButton = document.createElement("button");
        this.parts.closeButton.className = "music-player-close";
        this.parts.closeButton.type = "button";
        this.parts.closeButton.innerHTML = "×";
        this.parts.closeButton.setAttribute("aria-label", "Close music player");

        const content = document.createElement("div");
        content.className = "music-player-content";

        const leftSpace = document.createElement("div");
        leftSpace.className = "music-player-left-space";

        this.createFloatingNotes(leftSpace);

        const ui = document.createElement("div");
        ui.className = "music-player-ui";

        const kicker = document.createElement("p");
        kicker.className = "music-player-kicker";
        kicker.textContent = "Now Playing";

        const title = document.createElement("h2");
        title.className = "music-player-title";
        title.textContent = this.title;

        const artist = document.createElement("p");
        artist.className = "music-player-artist";
        artist.textContent = this.artist;

        const progressWrap = document.createElement("div");
        progressWrap.className = "music-progress-wrap";

        this.parts.progress = document.createElement("input");
        this.parts.progress.className = "music-range";
        this.parts.progress.type = "range";
        this.parts.progress.min = "0";
        this.parts.progress.max = "1000";
        this.parts.progress.value = "0";

        const timeRow = document.createElement("div");
        timeRow.className = "music-progress-time";

        this.parts.currentTime = document.createElement("span");
        this.parts.currentTime.textContent = "0:00";

        this.parts.duration = document.createElement("span");
        this.parts.duration.textContent = "0:00";

        timeRow.appendChild(this.parts.currentTime);
        timeRow.appendChild(this.parts.duration);

        progressWrap.appendChild(this.parts.progress);
        progressWrap.appendChild(timeRow);

        const playCenter = document.createElement("div");
        playCenter.className = "music-play-center";

        const mainControls = document.createElement("div");
        mainControls.className = "music-main-controls";

        this.parts.skipBackButton = document.createElement("button");
        this.parts.skipBackButton.className = "music-side-button";
        this.parts.skipBackButton.type = "button";
        this.parts.skipBackButton.textContent = "↺10";
        this.parts.skipBackButton.setAttribute("aria-label", "Skip back 10 seconds");

        this.parts.playButton = document.createElement("button");
        this.parts.playButton.className = "music-play-button";
        this.parts.playButton.type = "button";
        this.parts.playButton.innerHTML =
            `<span class="music-play-icon">▶</span>`;

        this.parts.skipForwardButton = document.createElement("button");
        this.parts.skipForwardButton.className = "music-side-button";
        this.parts.skipForwardButton.type = "button";
        this.parts.skipForwardButton.textContent = "10↻";
        this.parts.skipForwardButton.setAttribute("aria-label", "Skip forward 10 seconds");

        mainControls.appendChild(this.parts.skipBackButton);
        mainControls.appendChild(this.parts.playButton);
        mainControls.appendChild(this.parts.skipForwardButton);

        const modeControls = document.createElement("div");
        modeControls.className = "music-mode-controls";

        this.parts.repeatButton = document.createElement("button");
        this.parts.repeatButton.className = "music-mode-button";
        this.parts.repeatButton.type = "button";
        this.parts.repeatButton.textContent = "Repeat OFF";

        this.parts.shuffleButton = document.createElement("button");
        this.parts.shuffleButton.className = "music-mode-button";
        this.parts.shuffleButton.type = "button";
        this.parts.shuffleButton.textContent = "Shuffle OFF";

        modeControls.appendChild(this.parts.repeatButton);
        modeControls.appendChild(this.parts.shuffleButton);

        this.parts.statusText = document.createElement("div");
        this.parts.statusText.className = "music-status-text";
        this.parts.statusText.textContent = "Ready";

        playCenter.appendChild(mainControls);
        playCenter.appendChild(modeControls);
        playCenter.appendChild(this.parts.statusText);

        const volumeRow = document.createElement("div");
        volumeRow.className = "music-volume-row";

        const volumeIcon = document.createElement("span");
        volumeIcon.className = "music-volume-icon";
        volumeIcon.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M3 9.5v5h4l5 4.5v-14L7 9.5H3z"></path>
                <path fill="currentColor" d="M15.4 8.2a1 1 0 0 1 1.4 0A5.2 5.2 0 0 1 18.3 12a5.2 5.2 0 0 1-1.5 3.8a1 1 0 0 1-1.4-1.4A3.2 3.2 0 0 0 16.3 12a3.2 3.2 0 0 0-.9-2.4a1 1 0 0 1 0-1.4z"></path>
                <path fill="currentColor" d="M18.2 5.4a1 1 0 0 1 1.4 0A9.2 9.2 0 0 1 22.3 12a9.2 9.2 0 0 1-2.7 6.6a1 1 0 0 1-1.4-1.4A7.2 7.2 0 0 0 20.3 12a7.2 7.2 0 0 0-2.1-5.2a1 1 0 0 1 0-1.4z"></path>
            </svg>
        `;

        this.parts.volume = document.createElement("input");
        this.parts.volume.className = "music-range";
        this.parts.volume.type = "range";
        this.parts.volume.min = "0";
        this.parts.volume.max = "1";
        this.parts.volume.step = "0.01";
        this.parts.volume.value = "0.55";

        volumeRow.appendChild(volumeIcon);
        volumeRow.appendChild(this.parts.volume);

        const actionRow = document.createElement("div");
        actionRow.className = "music-action-row";

        this.parts.meaningButton = document.createElement("button");
        this.parts.meaningButton.className = "music-meaning-button";
        this.parts.meaningButton.type = "button";
        this.parts.meaningButton.title = "Song meaning";
        this.parts.meaningButton.setAttribute("aria-label", "Song meaning");
        this.parts.meaningButton.innerHTML = `<span>♫</span>`;

        this.parts.whyButton = document.createElement("button");
        this.parts.whyButton.className = "music-why-button";
        this.parts.whyButton.type = "button";
        this.parts.whyButton.innerHTML =
            `Why this song <span class="music-why-heart">♥</span>`;

        actionRow.appendChild(this.parts.meaningButton);
        actionRow.appendChild(this.parts.whyButton);

        const hint = document.createElement("p");
        hint.className = "music-player-hint";
        hint.textContent = "A small piece of music for the world of Milad & Banin.";

        ui.appendChild(kicker);
        ui.appendChild(title);
        ui.appendChild(artist);
        ui.appendChild(progressWrap);
        ui.appendChild(playCenter);
        ui.appendChild(volumeRow);
        ui.appendChild(actionRow);
        ui.appendChild(hint);

        content.appendChild(leftSpace);
        content.appendChild(ui);

        this.panel.appendChild(this.parts.closeButton);
        this.panel.appendChild(content);

        this.createLyricsMeaningPanel();
        this.createWhyThisSongPanel();

        this.overlay.appendChild(this.panel);
        document.body.appendChild(this.overlay);

    },

    createFloatingNotes(parent){

        const notes = [
            { text: "♪", left: 18, top: 28, size: 24, delay: 0 },
            { text: "♫", left: 35, top: 50, size: 30, delay: 1.1 },
            { text: "♬", left: 62, top: 34, size: 22, delay: 2.0 },
            { text: "♪", left: 78, top: 68, size: 26, delay: 3.1 }
        ];

        notes.forEach(item => {

            const note = document.createElement("span");
            note.className = "music-panel-floating-note";
            note.textContent = item.text;

            note.style.left = item.left + "%";
            note.style.top = item.top + "%";
            note.style.fontSize = item.size + "px";
            note.style.animationDelay = item.delay + "s";

            parent.appendChild(note);

        });

    },

    createLyricsMeaningPanel(){

        this.parts.lyricsOverlay = document.createElement("div");
        this.parts.lyricsOverlay.className = "music-lyrics-overlay";

        const lyricsPanel = document.createElement("div");
        lyricsPanel.className = "music-lyrics-panel";

        this.parts.lyricsCloseButton = document.createElement("button");
        this.parts.lyricsCloseButton.className = "music-lyrics-close";
        this.parts.lyricsCloseButton.type = "button";
        this.parts.lyricsCloseButton.innerHTML = "×";
        this.parts.lyricsCloseButton.setAttribute("aria-label", "Close song meaning");

        const title = document.createElement("div");
        title.className = "music-lyrics-title";
        title.textContent = "Song Meaning";

        this.parts.lyricsNotesLayer = document.createElement("div");
        this.parts.lyricsNotesLayer.className = "music-lyrics-notes-layer";

        const scroll = document.createElement("div");
        scroll.className = "music-lyrics-scroll";

        this.parts.lyricsText = document.createElement("div");
        this.parts.lyricsText.className = "music-lyrics-text";
        this.parts.lyricsText.textContent = this.lyricsMeaningText.trim();

        scroll.appendChild(this.parts.lyricsText);

        lyricsPanel.appendChild(this.parts.lyricsNotesLayer);
        lyricsPanel.appendChild(this.parts.lyricsCloseButton);
        lyricsPanel.appendChild(title);
        lyricsPanel.appendChild(scroll);

        this.parts.lyricsOverlay.appendChild(lyricsPanel);
        this.panel.appendChild(this.parts.lyricsOverlay);

        this.createLyricsMeaningNotes();

    },

    createLyricsMeaningNotes(){

        if(!this.parts.lyricsNotesLayer) return;

        const notes = [
            { text:"♪", left:12, top:78, size:22, delay:0.0 },
            { text:"♫", left:24, top:64, size:28, delay:0.9 },
            { text:"♬", left:72, top:74, size:24, delay:1.6 },
            { text:"♪", left:84, top:56, size:20, delay:2.3 },
            { text:"♫", left:44, top:86, size:25, delay:3.0 },
            { text:"♩", left:58, top:68, size:19, delay:3.7 }
        ];

        notes.forEach(item => {

            const note = document.createElement("span");

            note.className = "music-lyrics-floating-note";
            note.textContent = item.text;

            note.style.left = item.left + "%";
            note.style.top = item.top + "%";
            note.style.fontSize = item.size + "px";
            note.style.animationDelay = item.delay + "s";

            this.parts.lyricsNotesLayer.appendChild(note);

        });

    },

    openLyricsMeaningPanel(){

        if(!this.parts.lyricsOverlay) return;

        this.parts.lyricsOverlay.classList.add("visible");

    },

    closeLyricsMeaningPanel(){

        if(!this.parts.lyricsOverlay) return;

        this.parts.lyricsOverlay.classList.remove("visible");

    },

createWhyThisSongPanel(){

    this.parts.whyOverlay = document.createElement("div");
    this.parts.whyOverlay.className = "music-why-overlay";

    this.parts.whyPanel = document.createElement("div");
    this.parts.whyPanel.className = "music-why-artwork-panel";

    this.parts.whyMagnifier = document.createElement("div");
    this.parts.whyMagnifier.className = "music-why-magnifier";

    this.parts.whyCloseButton = document.createElement("button");
    this.parts.whyCloseButton.className = "music-why-close";
    this.parts.whyCloseButton.type = "button";
    this.parts.whyCloseButton.innerHTML = "×";
    this.parts.whyCloseButton.setAttribute("aria-label", "Close why this song");

    this.parts.whyPanel.appendChild(this.parts.whyMagnifier);
    this.parts.whyPanel.appendChild(this.parts.whyCloseButton);

    this.parts.whyOverlay.appendChild(this.parts.whyPanel);
    this.panel.appendChild(this.parts.whyOverlay);

    this.loadWhyMagnifierImage();

},

    openWhyThisSongPanel(){

        if(!this.parts.whyOverlay) return;

        this.parts.whyOverlay.classList.add("visible");

    },

    closeWhyThisSongPanel(){

        if(!this.parts.whyOverlay) return;

        this.parts.whyOverlay.classList.remove("visible");

    },

loadWhyMagnifierImage(){

    const image = new Image();

    image.onload = () => {

        this.whyImageLoaded = true;
        this.whyImageNaturalWidth = image.naturalWidth;
        this.whyImageNaturalHeight = image.naturalHeight;

    };

    image.src = this.whyBackgroundPath;

},

showWhyMagnifier(){

    if(!this.parts.whyMagnifier) return;

    this.parts.whyMagnifier.classList.add("visible");

},

hideWhyMagnifier(){

    if(!this.parts.whyMagnifier) return;

    this.parts.whyMagnifier.classList.remove("visible");

},

moveWhyMagnifier(event){

    if(
        !this.parts.whyPanel ||
        !this.parts.whyMagnifier ||
        !this.whyImageLoaded
    ){
        return;
    }

    const panelRect = this.parts.whyPanel.getBoundingClientRect();

    const mouseX = event.clientX - panelRect.left;
    const mouseY = event.clientY - panelRect.top;

    const panelWidth = panelRect.width;
    const panelHeight = panelRect.height;

    const imageRatio =
        this.whyImageNaturalWidth / this.whyImageNaturalHeight;

    const panelRatio =
        panelWidth / panelHeight;

    let imageWidth;
    let imageHeight;
    let imageOffsetX;
    let imageOffsetY;

    /*
        This matches background-size: contain
        so the magnifier zooms the exact same artwork area.
    */
    if(panelRatio > imageRatio){

        imageHeight = panelHeight;
        imageWidth = imageHeight * imageRatio;

        imageOffsetX = (panelWidth - imageWidth) / 2;
        imageOffsetY = 0;

    }else{

        imageWidth = panelWidth;
        imageHeight = imageWidth / imageRatio;

        imageOffsetX = 0;
        imageOffsetY = (panelHeight - imageHeight) / 2;

    }

    const insideImage =
        mouseX >= imageOffsetX &&
        mouseX <= imageOffsetX + imageWidth &&
        mouseY >= imageOffsetY &&
        mouseY <= imageOffsetY + imageHeight;

    if(!insideImage){

        this.hideWhyMagnifier();
        return;

    }

    const lensSize = this.whyMagnifierSize;
    const zoom = this.whyMagnifierZoom;

    const clampedX =
        Math.max(
            lensSize / 2,
            Math.min(panelWidth - lensSize / 2, mouseX)
        );

    const clampedY =
        Math.max(
            lensSize / 2,
            Math.min(panelHeight - lensSize / 2, mouseY)
        );

    const imageX = mouseX - imageOffsetX;
    const imageY = mouseY - imageOffsetY;

    this.parts.whyMagnifier.style.width = lensSize + "px";
    this.parts.whyMagnifier.style.height = lensSize + "px";

    this.parts.whyMagnifier.style.left = clampedX + "px";
    this.parts.whyMagnifier.style.top = clampedY + "px";

    this.parts.whyMagnifier.style.backgroundSize =
        (imageWidth * zoom) + "px " + (imageHeight * zoom) + "px";

    this.parts.whyMagnifier.style.backgroundPosition =
        (
            -(imageX * zoom) + lensSize / 2
        ) + "px " +
        (
            -(imageY * zoom) + lensSize / 2
        ) + "px";

    this.showWhyMagnifier();

},

createAudio(){

    /*
        Music Player and Loading Screen must use
        the exact same audio element.
    */
    this.audio =
        document.getElementById(
            "bgMusic"
        );

    /*
        Emergency fallback only if the HTML audio
        element does not exist.
    */
    if(!this.audio){

        console.warn(
            "⚠️ #bgMusic not found. Creating fallback audio."
        );

        this.audio =
            new Audio(
                this.audioPath
            );

        this.audio.id =
            "bgMusic";

        document.body.appendChild(
            this.audio
        );

    }

    this.audio.preload =
        "auto";

    /*
        Keep the panel volume slider synchronized
        with the audio that is already playing.
    */
    if(this.parts.volume){

        this.parts.volume.value =
            String(
                this.audio.volume
            );

    }

    console.log(
        "🎵 Music Player connected to shared bgMusic"
    );

},

    bindEvents(){

        this.parts.closeButton.addEventListener("click", () => {
            this.close();
        });

        this.overlay.addEventListener("click", event => {
            if(event.target === this.overlay){
                this.close();
            }
        });

        document.addEventListener("keydown", event => {

            if(event.key !== "Escape") return;

            if(
                this.parts.whyOverlay &&
                this.parts.whyOverlay.classList.contains("visible")
            ){
                this.closeWhyThisSongPanel();
                return;
            }

            if(
                this.parts.lyricsOverlay &&
                this.parts.lyricsOverlay.classList.contains("visible")
            ){
                this.closeLyricsMeaningPanel();
                return;
            }

            if(this.isOpen){
                this.close();
            }

        });

        this.parts.playButton.addEventListener("click", () => {
            this.togglePlay();
        });

        this.parts.skipBackButton.addEventListener("click", () => {
            this.skip(-10);
        });

        this.parts.skipForwardButton.addEventListener("click", () => {
            this.skip(10);
        });

        this.parts.repeatButton.addEventListener("click", () => {
            this.toggleRepeat();
        });

        this.parts.shuffleButton.addEventListener("click", () => {
            this.toggleShuffle();
        });

        this.parts.progress.addEventListener("input", () => {
            this.seek();
        });

        this.parts.volume.addEventListener("input", () => {
            this.audio.volume = Number(this.parts.volume.value);
            this.updateRangeFills();
        });

        this.parts.whyButton.addEventListener("click", () => {

            console.log("🎵 Why this song clicked");

            this.openWhyThisSongPanel();

        });

        this.parts.whyCloseButton.addEventListener("click", () => {
            this.closeWhyThisSongPanel();
        });

        this.parts.whyOverlay.addEventListener("click", event => {

            if(event.target === this.parts.whyOverlay){
                this.closeWhyThisSongPanel();
            }

        });

this.parts.whyPanel.addEventListener("mouseenter", () => {
    this.showWhyMagnifier();
});

this.parts.whyPanel.addEventListener("mouseleave", () => {
    this.hideWhyMagnifier();
});

this.parts.whyPanel.addEventListener("mousemove", event => {
    this.moveWhyMagnifier(event);
});

        this.parts.meaningButton.addEventListener("click", () => {
            this.openLyricsMeaningPanel();
        });

        this.parts.lyricsCloseButton.addEventListener("click", () => {
            this.closeLyricsMeaningPanel();
        });

        this.parts.lyricsOverlay.addEventListener("click", event => {

            if(event.target === this.parts.lyricsOverlay){
                this.closeLyricsMeaningPanel();
            }

        });

        this.audio.addEventListener("loadedmetadata", () => {
            this.updateProgress();
            this.updateRangeFills();
        });

        this.audio.addEventListener("timeupdate", () => {
            this.updateProgress();
        });

        this.audio.addEventListener("play", () => {
            this.parts.playButton.innerHTML =
                `<span class="music-pause-icon"><span></span><span></span></span>`;
            this.parts.statusText.textContent = "Playing";
            this.panel.classList.add("is-playing");
            this.stoppedByUser = false;
            this.updateRangeFills();
        });

        this.audio.addEventListener("pause", () => {
            this.parts.playButton.innerHTML =
                `<span class="music-play-icon">▶</span>`;
            this.parts.statusText.textContent =
                this.stoppedByUser ? "Stopped" : "Paused";
            this.panel.classList.remove("is-playing");
            this.updateRangeFills();
        });

        this.audio.addEventListener("ended", () => {

            if(this.repeatEnabled){

                this.audio.currentTime = 0;

                const playPromise = this.audio.play();

                if(playPromise && typeof playPromise.catch === "function"){
                    playPromise.catch(error => {
                        console.warn("Repeat play blocked:", error);
                    });
                }

                return;

            }

            this.parts.playButton.innerHTML =
                `<span class="music-play-icon">▶</span>`;
            this.parts.statusText.textContent = "Finished";
            this.panel.classList.remove("is-playing");
            this.updateRangeFills();

        });

        this.audio.addEventListener("error", () => {
            console.warn("❌ Music file not found:", this.audioPath);
            this.parts.statusText.textContent = "Music file not found";
        });

    },

open(){

    if(!this.isReady){

        this.create();

    }

    const baninUniverseLogo =
        document.getElementById(
            "baninUniverseLogoContainer"
        );

    if(baninUniverseLogo){

        baninUniverseLogo.classList.add(
            "music-panel-logo-hidden"
        );

    }

    this.isOpen =
        true;

    this.overlay.classList.add(
        "visible"
    );

    /*
        The shared audio may already be playing
        since the Enter Universe button was clicked.
        Update the panel to reflect its live state.
    */
    this.syncPlayState();
    this.updateProgress();
    this.updateRangeFills();

},

close(){

    if(!this.isReady){
        return;
    }


    this.closeWhyThisSongPanel();
    this.closeLyricsMeaningPanel();


    this.isOpen = false;

    this.overlay.classList.remove(
        "visible"
    );


    const baninUniverseLogo =
        document.getElementById(
            "baninUniverseLogoContainer"
        );


    if(baninUniverseLogo){

        baninUniverseLogo.classList.remove(
            "music-panel-logo-hidden"
        );

    }

},

    startPageMusic(){

        if(
            !this.audio ||
            this.stoppedByUser
        ){
            return;
        }

        const playPromise =
            this.audio.play();

        if(
            playPromise &&
            typeof playPromise.catch === "function"
        ){

            playPromise.catch(error => {

                console.warn(
                    "Music playback was blocked:",
                    error
                );

                if(this.parts.statusText){

                    this.parts.statusText.textContent =
                        "Press Play";

                }

            });

        }

    },

    togglePlay(){

        if(!this.audio) return;

        if(this.audio.paused){

            this.stoppedByUser = false;

            const playPromise =
                this.audio.play();

            if(
                playPromise &&
                typeof playPromise.catch === "function"
            ){

                playPromise.catch(error => {

                    console.warn(
                        "Music play blocked:",
                        error
                    );

                    this.parts.statusText.textContent =
                        "Press Play again";

                });

            }

        }else{

            this.stoppedByUser = true;

            this.audio.pause();

        }

    },

    skip(seconds){

        if(
            !this.audio ||
            !Number.isFinite(
                this.audio.duration
            )
        ){
            return;
        }

        const nextTime =
            Math.max(
                0,
                Math.min(
                    this.audio.duration,
                    this.audio.currentTime +
                    seconds
                )
            );

        this.audio.currentTime =
            nextTime;

        this.updateProgress();
        this.updateRangeFills();

    },

    toggleRepeat(){

        this.repeatEnabled =
            !this.repeatEnabled;

        this.updateModeButtons();

    },

    toggleShuffle(){

        this.shuffleEnabled =
            !this.shuffleEnabled;

        this.updateModeButtons();

    },

    updateModeButtons(){

        if(this.parts.repeatButton){

            this.parts.repeatButton.textContent =
                this.repeatEnabled
                    ? "Repeat ON"
                    : "Repeat OFF";

            this.parts.repeatButton.classList.toggle(
                "is-active",
                this.repeatEnabled
            );

        }

        if(this.parts.shuffleButton){

            this.parts.shuffleButton.textContent =
                this.shuffleEnabled
                    ? "Shuffle ON"
                    : "Shuffle OFF";

            this.parts.shuffleButton.classList.toggle(
                "is-active",
                this.shuffleEnabled
            );

        }

    },

    seek(){

        if(
            !this.audio ||
            !Number.isFinite(
                this.audio.duration
            )
        ){
            return;
        }

        const percent =
            Number(
                this.parts.progress.value
            ) / 1000;

        this.audio.currentTime =
            this.audio.duration *
            percent;

        this.updateProgress();
        this.updateRangeFills();

    },

    updateProgress(){

        if(
            !this.audio ||
            !this.parts.progress
        ){
            return;
        }

        const duration =
            this.audio.duration;

        const current =
            this.audio.currentTime;

        if(
            Number.isFinite(duration) &&
            duration > 0
        ){

            const progress =
                current / duration;

            this.parts.progress.value =
                String(
                    Math.round(
                        progress * 1000
                    )
                );

            this.parts.currentTime.textContent =
                this.formatTime(current);

            this.parts.duration.textContent =
                this.formatTime(duration);

        }else{

            this.parts.progress.value =
                "0";

            this.parts.currentTime.textContent =
                "0:00";

            this.parts.duration.textContent =
                "0:00";

        }

        this.updateRangeFills();

    },

    updateRangeFills(){

        if(this.parts.progress){

            const progressValue =
                Math.max(
                    0,
                    Math.min(
                        1000,
                        Number(
                            this.parts.progress.value
                        ) || 0
                    )
                );

            const progressPercent =
                (
                    progressValue /
                    1000
                ) * 100;

            this.parts.progress.style.setProperty(
                "--range-progress",
                progressPercent + "%"
            );

        }

        if(this.parts.volume){

            const volumeValue =
                Math.max(
                    0,
                    Math.min(
                        1,
                        Number(
                            this.parts.volume.value
                        ) || 0
                    )
                );

            const volumePercent =
                volumeValue * 100;

            this.parts.volume.style.setProperty(
                "--range-progress",
                volumePercent + "%"
            );

        }

    },

    syncPlayState(){

        if(
            !this.audio ||
            !this.parts.playButton
        ){
            return;
        }

        if(this.audio.paused){

            this.parts.playButton.innerHTML =
                `<span class="music-play-icon">▶</span>`;

            this.parts.statusText.textContent =
                this.stoppedByUser
                    ? "Stopped"
                    : "Ready";

            this.panel.classList.remove(
                "is-playing"
            );

        }else{

            this.parts.playButton.innerHTML =
                `<span class="music-pause-icon"><span></span><span></span></span>`;

            this.parts.statusText.textContent =
                "Playing";

            this.panel.classList.add(
                "is-playing"
            );

        }

        this.updateRangeFills();

    },

    formatTime(seconds){

        if(!Number.isFinite(seconds)){
            return "0:00";
        }

        const mins =
            Math.floor(
                seconds / 60
            );

        const secs =
            Math.floor(
                seconds % 60
            );

        return (
            mins +
            ":" +
            String(secs).padStart(
                2,
                "0"
            )
        );

    }

};

window.MusicPlayerPanel =
    MusicPlayerPanel;