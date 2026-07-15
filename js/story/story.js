/*==================================================
🌙 BANIN UNIVERSE
Story Manager
==================================================*/

"use strict";

const Story = {

    initialized:false,

    currentPage:0,

    totalPages:0,

    isOpen:false,

    /*==========================================
    INIT
    ==========================================*/

    init(){

        if(this.initialized) return;

        this.initialized = true;

        StoryUI.init();

        StoryAudio.init();

        StoryEffects.init();

        this.totalPages = StoryPages.length;

        this.bindEvents();

    },

    /*==========================================
    EVENTS
    ==========================================*/

    bindEvents(){

        const bookButton =
            document.getElementById("storyBookContainer");

        const menuButton =
            document.getElementById("btnOurStory");

        if(bookButton){

            bookButton.addEventListener("click",()=>{

                this.open();

            });

        }

        if(menuButton){

            menuButton.addEventListener("click",()=>{

                this.open();

            });

        }

        StoryUI.nextButton.addEventListener("click",()=>{

            this.nextPage();

        });

        StoryUI.previousButton.addEventListener("click",()=>{

            this.previousPage();

        });

        StoryUI.closeButton.addEventListener("click",()=>{

            this.close();

        });

    },

    /*==========================================
    OPEN
    ==========================================*/

    open(){

        if(this.isOpen) return;

        this.isOpen = true;

        const last =
            StoryStorage.getLastPage();

        this.currentPage = last;

        StoryUI.open();

        StoryAudio.playOpen();

        StoryEffects.flash();

        this.render();

    },

    /*==========================================
    CLOSE
    ==========================================*/

    close(){

        if(!this.isOpen) return;

        this.isOpen = false;

        StoryStorage.save(this.currentPage);

        StoryTyping.stop();

        StoryAudio.playClose();

        StoryUI.close();

    },

    /*==========================================
    RENDER
    ==========================================*/

    render(){

        const page =
            StoryPages[this.currentPage];

        if(!page) return;

        StoryUI.setTitle(page.title);

        StoryUI.setText(page.text);

        StoryUI.setPage(

            this.currentPage+1,

            this.totalPages

        );

        StoryUI.enablePrevious(

            this.currentPage>0

        );

        StoryUI.enableNext(

            this.currentPage<this.totalPages-1

        );

        if(page.music){

            StoryAudio.playMusic(

                "assets/audio/story/"+page.music

            );

        }

    },

    /*==========================================
    NEXT
    ==========================================*/

    nextPage(){

        if(this.currentPage>=this.totalPages-1)
            return;

        StoryAudio.playFlip();

        StoryAnimation.next(

            StoryUI.rightPage

        );

        StoryEffects.flash();

        this.currentPage++;

        StoryStorage.save(

            this.currentPage

        );

        setTimeout(()=>{

            this.render();

        },250);

    },

    /*==========================================
    PREVIOUS
    ==========================================*/

    previousPage(){

        if(this.currentPage<=0)
            return;

        StoryAudio.playFlip();

        StoryAnimation.previous(

            StoryUI.rightPage

        );

        StoryEffects.flash();

        this.currentPage--;

        StoryStorage.save(

            this.currentPage

        );

        setTimeout(()=>{

            this.render();

        },250);

    },

    /*==========================================
    GOTO
    ==========================================*/

    goTo(page){

        if(page<0) return;

        if(page>=this.totalPages) return;

        this.currentPage=page;

        StoryStorage.save(page);

        this.render();

    },

    /*==========================================
    RESET
    ==========================================*/

    reset(){

        StoryStorage.clear();

        this.currentPage=0;

    }

};