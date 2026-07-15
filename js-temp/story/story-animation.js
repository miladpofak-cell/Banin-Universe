/*==================================================
🌙 BANIN UNIVERSE
Story Animation System
==================================================*/

"use strict";

const StoryAnimation = {

    duration: 700,

    /*==============================
    Open Book
    ==============================*/

    open(book){

        if(!book) return;

        book.animate(

            [

                {
                    opacity:0,
                    transform:"scale(.8) rotateY(-35deg)"
                },

                {
                    opacity:1,
                    transform:"scale(1) rotateY(0deg)"
                }

            ],

            {

                duration:this.duration,

                easing:"ease-out",

                fill:"forwards"

            }

        );

    },

    /*==============================
    Close Book
    ==============================*/

    close(book){

        if(!book) return;

        book.animate(

            [

                {
                    opacity:1,
                    transform:"scale(1)"
                },

                {
                    opacity:0,
                    transform:"scale(.85)"
                }

            ],

            {

                duration:500,

                easing:"ease-in",

                fill:"forwards"

            }

        );

    },

    /*==============================
    Next Page
    ==============================*/

    next(page){

        if(!page) return;

        page.animate(

            [

                {

                    opacity:1,

                    transform:"rotateY(0deg)"

                },

                {

                    opacity:0,

                    transform:"rotateY(-90deg)"

                }

            ],

            {

                duration:600,

                easing:"ease-in-out"

            }

        );

    },

    /*==============================
    Previous Page
    ==============================*/

    previous(page){

        if(!page) return;

        page.animate(

            [

                {

                    opacity:1,

                    transform:"rotateY(0deg)"

                },

                {

                    opacity:0,

                    transform:"rotateY(90deg)"

                }

            ],

            {

                duration:600,

                easing:"ease-in-out"

            }

        );

    },

    /*==============================
    Fade In
    ==============================*/

    fadeIn(element){

        if(!element) return;

        element.animate(

            [

                {

                    opacity:0

                },

                {

                    opacity:1

                }

            ],

            {

                duration:500,

                fill:"forwards"

            }

        );

    },

    /*==============================
    Fade Out
    ==============================*/

    fadeOut(element){

        if(!element) return;

        element.animate(

            [

                {

                    opacity:1

                },

                {

                    opacity:0

                }

            ],

            {

                duration:500,

                fill:"forwards"

            }

        );

    },

    /*==============================
    Title Animation
    ==============================*/

    title(title){

        if(!title) return;

        title.animate(

            [

                {

                    opacity:0,

                    transform:"translateY(-20px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],

            {

                duration:700,

                easing:"ease-out"

            }

        );

    },

    /*==============================
    Text Animation
    ==============================*/

    text(text){

        if(!text) return;

        text.animate(

            [

                {

                    opacity:0,

                    transform:"translateY(10px)"

                },

                {

                    opacity:1,

                    transform:"translateY(0)"

                }

            ],

            {

                duration:600,

                easing:"ease-out"

            }

        );

    },

    /*==============================
    Button Pulse
    ==============================*/

    pulse(button){

        if(!button) return;

        button.animate(

            [

                {

                    transform:"scale(1)"

                },

                {

                    transform:"scale(1.08)"

                },

                {

                    transform:"scale(1)"

                }

            ],

            {

                duration:700

            }

        );

    }

};