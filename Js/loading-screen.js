/*==================================================
BANIN UNIVERSE
CINEMATIC LOADING SCREEN
Real Progress + Click To Enter
==================================================*/

"use strict";

const LoadingScreen = {

    initialized: false,
    ready: false,
    entering: false,

    element: null,
    status: null,
    progressBar: null,
    percentage: null,
    enterButton: null,

    progress: 0,

    /*
        These handlers block every interaction
        during Loading except the Enter button.
    */
    blockedClickHandler: null,
    blockedPointerHandler: null,
    blockedContextHandler: null,

    create(){

        if(this.initialized){
            return;
        }

        this.element =
            document.getElementById(
                "loadingScreen"
            );

        this.status =
            document.getElementById(
                "loadingStatus"
            );

        this.progressBar =
            document.getElementById(
                "loadingProgressBar"
            );

        this.percentage =
            document.getElementById(
                "loadingPercentage"
            );

        this.enterButton =
            document.getElementById(
                "enterUniverseButton"
            );

        if(
            !this.element ||
            !this.status ||
            !this.progressBar ||
            !this.percentage ||
            !this.enterButton
        ){

            console.warn(
                "❌ Loading Screen elements not found"
            );

            return;
        }

        /*
            Reset initial state.
        */
        this.ready = false;
        this.entering = false;

        this.element.classList.remove(
            "hidden",
            "loading-ready",
            "loading-entering"
        );

        this.element.setAttribute(
            "aria-hidden",
            "false"
        );

        this.enterButton.disabled = true;

        this.enterButton.textContent =
            "برای ورود کلیک کنید";

        document.body.classList.add(
            "universe-loading-active"
        );

        this.bindEvents();
        this.setProgress(0);

        this.initialized = true;

        console.log(
            "🌙 Loading Screen ready"
        );

    },

    bindEvents(){

        /*
            Only a direct left-click on the
            Enter button may call enter().
        */
        this.enterButton.addEventListener(
            "click",
            event => {

                if(event.button !== 0){
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                this.enter();

            }
        );

        /*
            Block all click events while Loading
            except events targeting Enter button.
        */
        this.blockedClickHandler =
            event => {

                if(
                    !this.initialized ||
                    this.entering
                ){
                    return;
                }

                if(
                    event.target ===
                    this.enterButton
                ){
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

            };

        /*
            Block pointer presses everywhere
            except the Enter button.
        */
        this.blockedPointerHandler =
            event => {

                if(
                    !this.initialized ||
                    this.entering
                ){
                    return;
                }

                if(
                    event.target ===
                    this.enterButton
                ){
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

            };

        /*
            Disable right-click during Loading.
        */
        this.blockedContextHandler =
            event => {

                if(
                    !this.initialized ||
                    this.entering
                ){
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

            };

        /*
            Capture events at document level before
            world objects or old music handlers.
        */
        document.addEventListener(
            "click",
            this.blockedClickHandler,
            true
        );

        document.addEventListener(
            "pointerdown",
            this.blockedPointerHandler,
            true
        );

        document.addEventListener(
            "contextmenu",
            this.blockedContextHandler,
            true
        );

    },

    removeInteractionBlockers(){

        if(this.blockedClickHandler){

            document.removeEventListener(
                "click",
                this.blockedClickHandler,
                true
            );

        }

        if(this.blockedPointerHandler){

            document.removeEventListener(
                "pointerdown",
                this.blockedPointerHandler,
                true
            );

        }

        if(this.blockedContextHandler){

            document.removeEventListener(
                "contextmenu",
                this.blockedContextHandler,
                true
            );

        }

        this.blockedClickHandler = null;
        this.blockedPointerHandler = null;
        this.blockedContextHandler = null;

    },

    setProgress(value){

        const safeValue =
            Math.max(
                0,
                Math.min(
                    100,
                    Math.round(
                        Number(value) || 0
                    )
                )
            );

        this.progress =
            safeValue;

        if(this.element){

            this.element.style.setProperty(
                "--loading-progress",
                safeValue + "%"
            );

        }

        if(this.progressBar){

            this.progressBar.style.width =
                safeValue + "%";

        }

        if(this.percentage){

            this.percentage.textContent =
                safeValue + "%";

        }

    },

    setStatus(message){

        if(!this.status){
            return;
        }

        this.status.style.opacity =
            "0";

        this.status.style.transform =
            "translateY(4px)";

        window.setTimeout(
            () => {

                if(!this.status){
                    return;
                }

                this.status.textContent =
                    message;

                this.status.style.opacity =
                    "1";

                this.status.style.transform =
                    "translateY(0)";

            },
            150
        );

    },

    markReady(){

        if(
            !this.initialized ||
            this.ready
        ){
            return;
        }

        this.ready = true;

        this.setProgress(100);

        this.setStatus(
            "همه‌چیز آماده‌ست؛ برای ورود کلیک کنید."
        );

        this.enterButton.disabled =
            false;

        this.element.classList.add(
            "loading-ready"
        );

        window.setTimeout(
            () => {

                if(
                    this.ready &&
                    !this.entering
                ){

                    this.enterButton.focus({
                        preventScroll:true
                    });

                }

            },
            520
        );

    },

    async enter(){

        if(
            !this.ready ||
            this.entering
        ){
            return;
        }

        this.entering = true;

        this.enterButton.disabled =
            true;

        this.enterButton.textContent =
            "در حال ورود...";

        this.setStatus(
            "به دنیای بنین خوش اومدی..."
        );

        /*
            Music starts only here, after clicking
            the Enter button.
        */
        await this.startMusic();

        /*
            World interactions remain locked until
            Loading begins fading out.
        */
        this.element.classList.add(
            "loading-entering"
        );

        document.body.classList.remove(
            "universe-loading-active"
        );

        this.removeInteractionBlockers();

        window.setTimeout(
            () => {

                this.element.classList.add(
                    "hidden"
                );

                this.element.setAttribute(
                    "aria-hidden",
                    "true"
                );

            },
            1000
        );

    },

    async startMusic(){

        const audio =
            document.getElementById(
                "bgMusic"
            );

        if(!audio){
            return;
        }

        /*
            Do not start the same audio twice.
        */
        if(!audio.paused){

            console.log(
                "🎵 Background music is already playing"
            );

            return;

        }

        try{

            audio.volume = .35;

            const playPromise =
                audio.play();

            if(
                playPromise &&
                typeof playPromise.then ===
                "function"
            ){

                await playPromise;

            }

        }catch(error){

            console.warn(
                "⚠️ Background music could not start:",
                error
            );

        }

    }

};

window.LoadingScreen =
    LoadingScreen;