/*==================================================
BANIN UNIVERSE
STORY BOOK PAGES
Linear Romantic Story Version
==================================================*/

"use strict";

window.StoryBookPages = {

    settings: {

        totalPages: 22,

        intro: {
            closedBookDuration: 2400,
            openingDuration: 1800,

                coverArtwork:
                    "assets/story/intro/story-book-cover.webp"
        },

        transition: {
            type: "page-flip",
            duration: 750,
            sound: [
                "assets/story/sfx/page-turn.mp3",
                "assets/story/sfx/page-turn-01.mp3",
                "assets/story/sfx/page-turn-02.mp3",
                "assets/story/sfx/page-turn-soft.mp3"
            ]
        },

        artwork: {
            forceAutoBackgrounds: true,
            basePath: "assets/story/backgrounds/",
            extension: "webp"
        },

        story: {
            type: "linear-romantic",
            title: "Milad & Banin",
            branchingEnabled: false,
            favoritesEnabled: false,
            bookmarksEnabled: false
        }

    },

    chapters: [],

    pages: [

        {
            id: 1,
            mode: "story",
            chapter: "The Book Opens",
            narrator: "The Story Book",

            background:
                "assets/story/backgrounds/page-01.webp",

            title:
                "The Book Opens",

            shortDescription:
                "کتاب داستان عشق باز می‌شود.",

            text:
                "The Love Book Opens\n\nکتاب داستان عشق باز می‌شه.",

            prev: null,
            next: 2,

            cinematic: true
        },

        {
            id: 2,
            mode: "story",
            chapter: "Two Paths, One Destiny",
            narrator: "The Story Book",

            background:
                "assets/story/backgrounds/page-02.webp",

            title:
                "Two Paths, One Destiny",

            shortDescription:
                "دو مسیر جدا، اما هر دو به یک عشق ختم می‌شوند.",

            text:
                "Two Paths, One Destiny\n\nدو مسیر جدا: Light و Darkness، ولی هر دو به یک عشق ختم می‌شن.",

            prev: 1,
            next: 3,

            cinematic: true
        },

        {
            id: 3,
            mode: "story",
            chapter: "The First Step",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-03.webp",

            title:
                "The First Step",

            shortDescription:
                "Milad سفرش را شروع می‌کند.",

            text:
                "The First Step\n\nMilad سفرشو شروع می‌کنه.",

            prev: 2,
            next: 4,

            cinematic: false
        },

        {
            id: 4,
            mode: "story",
            chapter: "The Girl Behind the Broken Window",
            narrator: "Banin",

            background:
                "assets/story/backgrounds/page-04.webp",

            title:
                "The Girl Behind the Broken Window",

            shortDescription:
                "Banin پشت پنجره‌ای شکسته، منتظر نوری ناشناس است.",

            text:
                "The Girl Behind the Broken Window\n\nBanin در یک فضای کلیسا/قصر شکسته، منتظر نوری که نمی‌دونه از کجا میاد.",

            prev: 3,
            next: 5,

            cinematic: true
        },

        {
            id: 5,
            mode: "story",
            chapter: "The Castle Between Us",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-05.webp",

            title:
                "The Castle Between Us",

            shortDescription:
                "یک قلعه و فاصله‌ای بزرگ بین آن‌هاست.",

            text:
                "The Castle Between Us\n\nیک قلعه/فاصله بزرگ بینشونه.",

            prev: 4,
            next: 6,

            cinematic: false
        },

        {
            id: 6,
            mode: "story",
            chapter: "Her Name in the Sky",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-06.webp",

            title:
                "Her Name in the Sky",

            shortDescription:
                "Milad نشانه‌ای از Banin را در آسمان می‌بیند.",

            text:
                "Her Name in the Sky\n\nMilad نشونه‌ای از Banin رو توی آسمون می‌بینه.",

            prev: 5,
            next: 7,

            cinematic: true
        },

        {
            id: 7,
            mode: "story",
            chapter: "The Library of Unsaid Words",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-07.webp",

            title:
                "The Library of Unsaid Words",

            shortDescription:
                "حرف‌هایی که گفته نشدند، مثل کتاب‌هایی بسته باقی مانده‌اند.",

            text:
                "The Library of Unsaid Words\n\nحرف‌هایی که گفته نشدن، مثل کتاب‌های بسته.",

            prev: 6,
            next: 8,

            cinematic: false
        },

        {
            id: 8,
            mode: "story",
            chapter: "A Lantern for the Night",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-08.webp",

            title:
                "A Lantern for the Night",

            shortDescription:
                "Milad با فانوسی کوچک مسیرش را ادامه می‌دهد.",

            text:
                "A Lantern for the Night\n\nMilad با یه فانوس مسیرشو ادامه می‌ده.",

            prev: 7,
            next: 9,

            cinematic: false
        },

        {
            id: 9,
            mode: "story",
            chapter: "The Garden That Remembered Her",
            narrator: "Banin",

            background:
                "assets/story/backgrounds/page-09.webp",

            title:
                "The Garden That Remembered Her",

            shortDescription:
                "باغی که انگار رد Banin هنوز در آن مانده است.",

            text:
                "The Garden That Remembered Her\n\nباغی که انگار رد Banin توش مونده.",

            prev: 8,
            next: 10,

            cinematic: false
        },

        {
            id: 10,
            mode: "story",
            chapter: "When the World Almost Brought Us Close",
            narrator: "The Story Book",

            background:
                "assets/story/backgrounds/page-10.webp",

            title:
                "When the World Almost Brought Us Close",

            shortDescription:
                "لحظه‌ای که نزدیک شدند، اما هنوز به هم نرسیدند.",

            text:
                "When the World Almost Brought Us Close\n\nیه لحظه که نزدیک می‌شن ولی هنوز نمی‌رسن.",

            prev: 9,
            next: 11,

            cinematic: true
        },

        {
            id: 11,
            mode: "story",
            chapter: "Across the Moonlit Bridge",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-11.webp",

            title:
                "Across the Moonlit Bridge",

            shortDescription:
                "پلی میان دو دنیا، زیر نور ماه.",

            text:
                "Across the Moonlit Bridge\n\nپل/مسیر بین دو دنیا.",

            prev: 10,
            next: 12,

            cinematic: false
        },

        {
            id: 12,
            mode: "story",
            chapter: "Almost",
            narrator: "Banin",

            background:
                "assets/story/backgrounds/page-12.webp",

            title:
                "Almost",

            shortDescription:
                "نقطه‌ی میانی داستان؛ خیلی نزدیک، اما هنوز نه.",

            text:
                "Almost\n\nنقطه‌ی نیمه داستان؛ خیلی نزدیک، ولی هنوز نه.",

            prev: 11,
            next: 13,

            cinematic: true
        },

        {
            id: 13,
            mode: "story",
            chapter: "Into the Darker Road",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-13.webp",

            title:
                "Into the Darker Road",

            shortDescription:
                "مسیر سخت‌تر شروع می‌شود.",

            text:
                "Into the Darker Road\n\nمسیر سخت‌تر شروع می‌شه.",

            prev: 12,
            next: 14,

            cinematic: false
        },

        {
            id: 14,
            mode: "story",
            chapter: "The Fear of Losing You",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-14.webp",

            title:
                "The Fear of Losing You",

            shortDescription:
                "ترس از نرسیدن و گم کردن راه.",

            text:
                "The Fear of Losing You\n\nترس از نرسیدن.",

            prev: 13,
            next: 15,

            cinematic: false
        },

        {
            id: 15,
            mode: "story",
            chapter: "The Moon Listens",
            narrator: "The Moon",

            background:
                "assets/story/backgrounds/page-15.webp",

            title:
                "The Moon Listens",

            shortDescription:
                "ماه شاهد هر دو قلب است.",

            text:
                "The Moon Listens\n\nماه شاهد هر دوئه.",

            prev: 14,
            next: 16,

            cinematic: true
        },

        {
            id: 16,
            mode: "story",
            chapter: "The Storm Between Hearts",
            narrator: "The Story Book",

            background:
                "assets/story/backgrounds/page-16.webp",

            title:
                "The Storm Between Hearts",

            shortDescription:
                "طوفان و فاصله میان دو قلب، اما امید هنوز زنده است.",

            text:
                "The Storm Between Hearts\n\nطوفان، قلعه تاریک، فاصله، ولی هنوز امید هست.",

            prev: 15,
            next: 17,

            cinematic: true
        },

        {
            id: 17,
            mode: "story",
            chapter: "Still Walking Toward You",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-17.webp",

            title:
                "Still Walking Toward You",

            shortDescription:
                "Milad هنوز به سمت Banin ادامه می‌دهد.",

            text:
                "Still Walking Toward You\n\nMilad هنوز ادامه می‌ده.",

            prev: 16,
            next: 18,

            cinematic: false
        },

        {
            id: 18,
            mode: "story",
            chapter: "The Stars Made a Promise",
            narrator: "Banin",

            background:
                "assets/story/backgrounds/page-18.webp",

            title:
                "The Stars Made a Promise",

            shortDescription:
                "ستاره‌ها راه را نشان می‌دهند.",

            text:
                "The Stars Made a Promise\n\nستاره‌ها انگار راه رو نشون می‌دن.",

            prev: 17,
            next: 19,

            cinematic: true
        },

        {
            id: 19,
            mode: "story",
            chapter: "If the World Goes Dark",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-19.webp",

            title:
                "If the World Goes Dark",

            shortDescription:
                "وقتی همه‌چیز تاریک شود، یک نور هنوز باقی می‌ماند.",

            text:
                "If the World Goes Dark\n\nحتی اگر همه‌چیز تاریک بشه، یک نور باقی می‌مونه.",

            prev: 18,
            next: 20,

            cinematic: false
        },

        {
            id: 20,
            mode: "story",
            chapter: "I Saw Your Light",
            narrator: "Milad",

            background:
                "assets/story/backgrounds/page-20.webp",

            title:
                "I Saw Your Light",

            shortDescription:
                "اولین نشانه‌ی واقعی از Banin دیده می‌شود.",

            text:
                "I Saw Your Light\n\nاولین نشونه واقعی از Banin.",

            prev: 19,
            next: 21,

            cinematic: true
        },

        {
            id: 21,
            mode: "story",
            chapter: "One Step Before You",
            narrator: "Banin",

            background:
                "assets/story/backgrounds/page-21.webp",

            title:
                "One Step Before You",

            shortDescription:
                "فقط یک قدم تا رسیدن باقی مانده است.",

            text:
                "One Step Before You\n\nفقط یک قدم تا رسیدن.",

            prev: 20,
            next: 22,

            cinematic: true
        },

        {
            id: 22,
            mode: "story",
            chapter: "At Last, I Found You",
            narrator: "Milad & Banin",

            background:
                "assets/story/backgrounds/page-22.webp",

            title:
                "At Last, I Found You",

            shortDescription:
                "Milad و Banin بالاخره زیر ماه به هم می‌رسند.",

            text:
                "At Last, I Found You\n\nبالاخره میلاد و بنین به هم رسیدن.",

            prev: 21,
            next: null,

            cinematic: true,
            finalPage: true,
            
        }

    ]

};