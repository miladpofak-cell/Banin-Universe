/*==================================================
🌙 BANIN UNIVERSE
Story UI
==================================================*/

"use strict";

const StoryUI = {

    root: null,

    book: null,

    leftPage: null,
    rightPage: null,

    title: null,
    text: null,

    pageNumber: null,

    nextButton: null,
    previousButton: null,
    closeButton: null,

    initialized:false,

    /*==========================================
    INIT
    ==========================================*/

    init(){

        if(this.initialized) return;

        this.initialized = true;

        this.create();

        this.cache();

    },

    /*==========================================
    CREATE
    ==========================================*/

    create(){

        const html = `

<div id="storyOverlay" class="story-overlay hidden">

    <div id="storyBook" class="story-book">

        <button id="storyClose"
                class="story-close">
            ✕
        </button>

        <div class="story-pages">

            <div id="storyLeftPage"
                 class="story-page left">

            </div>

            <div id="storyRightPage"
                 class="story-page right">

                <h1 id="storyTitle"></h1>

                <div id="storyText"></div>

                <div class="story-footer">

                    <button id="storyPrev">

                        ◀

                    </button>

                    <span id="storyPageNumber">

                        1 / 1

                    </span>

                    <button id="storyNext">

                        ▶

                    </button>

                </div>

            </div>

        </div>

    </div>

</div>

`;

        document.body.insertAdjacentHTML(
            "beforeend",
            html
        );

    },

    /*==========================================
    CACHE
    ==========================================*/

    cache(){

        this.root = document.getElementById("storyOverlay");

        this.book = document.getElementById("storyBook");

        this.leftPage =
            document.getElementById("storyLeftPage");

        this.rightPage =
            document.getElementById("storyRightPage");

        this.title =
            document.getElementById("storyTitle");

        this.text =
            document.getElementById("storyText");

        this.pageNumber =
            document.getElementById("storyPageNumber");

        this.nextButton =
            document.getElementById("storyNext");

        this.previousButton =
            document.getElementById("storyPrev");

        this.closeButton =
            document.getElementById("storyClose");

    },

    /*==========================================
    OPEN
    ==========================================*/

    open(){

        this.root.classList.remove("hidden");

        StoryAnimation.open(this.book);

    },

    /*==========================================
    CLOSE
    ==========================================*/

    close(){

        StoryAnimation.close(this.book);

        setTimeout(()=>{

            this.root.classList.add("hidden");

        },500);

    },

    /*==========================================
    SET TITLE
    ==========================================*/

    setTitle(title){

        this.title.innerHTML = title;

        StoryAnimation.title(this.title);

    },

    /*==========================================
    SET TEXT
    ==========================================*/

    setText(text){

        StoryTyping.start(

            this.text,

            text

        );

    },

    /*==========================================
    SET PAGE
    ==========================================*/

    setPage(current,total){

        this.pageNumber.innerHTML =
            `${current} / ${total}`;

    },

    /*==========================================
    BUTTONS
    ==========================================*/

    enableNext(value){

        this.nextButton.disabled = !value;

    },

    enablePrevious(value){

        this.previousButton.disabled = !value;

    }

};