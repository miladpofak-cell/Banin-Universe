/*==================================================
BANIN UNIVERSE
GALLERY LOCK
Password Window Controller
Phase 1 - UI Connection
==================================================*/

"use strict";

const GalleryLock = {

    initialized: false,
    isOpen: false,
    isUnlocking: false,
    unlockAttemptId: 0,

    modal: null,
    box: null,
    input: null,
    unlockButton: null,
    error: null,

    lastFocusedElement: null,

    create(){

        if(this.initialized){
            return;
        }

        this.modal =
            document.getElementById(
                "galleryLockModal"
            );

        this.box =
            this.modal?.querySelector(
                ".lockBox"
            ) || null;

        this.input =
            document.getElementById(
                "galleryPassword"
            );

        this.unlockButton =
            document.getElementById(
                "unlockGalleryBtn"
            );

        this.error =
            document.getElementById(
                "lockError"
            );

        if(
            !this.modal ||
            !this.box ||
            !this.input ||
            !this.unlockButton ||
            !this.error
        ){

            console.warn(
                "❌ Gallery Lock HTML elements were not found"
            );

            return;
        }

        this.injectStyles();
        this.bindEvents();

        this.modal.setAttribute(
            "aria-hidden",
            "true"
        );

        this.initialized = true;

        console.log(
            "🔐 Gallery Lock ready"
        );

    },

    injectStyles(){

        const oldStyle =
            document.getElementById(
                "galleryLockSystemStyles"
            );

        if(oldStyle){
            oldStyle.remove();
        }

        const style =
            document.createElement("style");

        style.id =
            "galleryLockSystemStyles";

        style.textContent = `

            @keyframes galleryLockBoxAppear{

                from{
                    opacity:0;

                    transform:
                        translateY(24px)
                        scale(.92);
                }

                to{
                    opacity:1;

                    transform:
                        translateY(0)
                        scale(1);
                }

            }

            @keyframes galleryLockShake{

                0%,
                100%{
                    transform:
                        translateX(0);
                }

                20%{
                    transform:
                        translateX(-9px);
                }

                40%{
                    transform:
                        translateX(8px);
                }

                60%{
                    transform:
                        translateX(-6px);
                }

                80%{
                    transform:
                        translateX(4px);
                }

            }

            #galleryLockModal{

                position:fixed !important;

                inset:0 !important;

                display:flex;

                align-items:center;
                justify-content:center;

                padding:24px;

                background:
                    radial-gradient(
                        circle at 50% 42%,
                        rgba(107,55,170,.30),
                        transparent 48%
                    ),
                    rgba(3,2,12,.82) !important;

                backdrop-filter:
                    blur(12px) !important;

                -webkit-backdrop-filter:
                    blur(12px) !important;

                opacity:0;

                visibility:hidden;

                pointer-events:none !important;

                transition:
                    opacity .38s ease,
                    visibility .38s ease;

                z-index:1000000 !important;

            }

            #galleryLockModal.gallery-lock-visible{

                opacity:1;

                visibility:visible;

                pointer-events:auto !important;

            }

            #galleryLockModal .lockBox{

                position:relative;

                width:
                    min(
                        430px,
                        calc(100vw - 38px)
                    );

                padding:
                    44px 38px 38px;

                border-radius:26px;

                direction:ltr;

                text-align:center;

                background:
                    radial-gradient(
                        circle at 50% 0%,
                        rgba(184,104,255,.14),
                        transparent 44%
                    ),
                    linear-gradient(
                        145deg,
                        rgba(37,18,61,.98),
                        rgba(12,8,29,.99),
                        rgba(44,20,67,.98)
                    ) !important;

                border:
                    1px solid
                    rgba(255,218,145,.52) !important;

                box-shadow:
                    0 30px 90px
                    rgba(0,0,0,.72),

                    0 0 42px
                    rgba(171,82,255,.28),

                    0 0 25px
                    rgba(255,200,120,.13),

                    inset 0 0 35px
                    rgba(177,90,255,.09) !important;

                animation:
                    galleryLockBoxAppear
                    .48s
                    cubic-bezier(.2,.9,.2,1)
                    both;

            }

            #galleryLockModal .lockBox::before{

                content:"";

                position:absolute;

                inset:10px;

                border-radius:19px;

                border:
                    1px solid
                    rgba(255,224,164,.14);

                pointer-events:none;

            }

            #galleryLockModal .lockBox h2{

                position:relative;

                margin:
                    0 0 25px;

                color:
                    rgba(255,228,174,.98);

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    Georgia,
                    serif;

                font-size:30px;

                font-weight:800;

                text-shadow:
                    0 0 12px
                    rgba(255,205,125,.34),

                    0 0 25px
                    rgba(176,88,255,.30);

            }

            #galleryPassword{

                position:relative;

                width:100%;

                height:53px;

                margin:
                    0 0 17px;

                padding:
                    0 18px;

                border-radius:13px;

                border:
                    1px solid
                    rgba(255,221,153,.30) !important;

                outline:none;

                background:
                    rgba(10,7,25,.72) !important;

                color:
                    rgba(255,241,217,.98) !important;

                font-size:17px;

                text-align:center;

                letter-spacing:2px;

                box-shadow:
                    inset 0 0 18px
                    rgba(0,0,0,.38),

                    0 0 15px
                    rgba(168,82,255,.08);

                transition:
                    border-color .25s ease,
                    box-shadow .25s ease,
                    background .25s ease;

                user-select:text;

                -webkit-user-select:text;

            }

            #galleryPassword::placeholder{

                color:
                    rgba(220,201,236,.52);

                letter-spacing:.5px;

            }

            #galleryPassword:focus{

                border-color:
                    rgba(255,218,143,.72) !important;

                background:
                    rgba(19,10,39,.90) !important;

                box-shadow:
                    inset 0 0 18px
                    rgba(0,0,0,.38),

                    0 0 20px
                    rgba(255,203,119,.15),

                    0 0 28px
                    rgba(177,89,255,.18);

            }

            #unlockGalleryBtn{

                position:relative;

                width:100%;

                height:51px;

                padding:0;

                border-radius:13px;

                cursor:pointer;

                background:
                    linear-gradient(
                        135deg,
                        rgba(127,72,194,.98),
                        rgba(87,49,157,.98),
                        rgba(179,104,205,.94)
                    ) !important;

                border:
                    1px solid
                    rgba(255,225,164,.34) !important;

                color:
                    rgba(255,245,224,.98);

                font-family:
                    "BaninDream",
                    "Vazirmatn",
                    sans-serif;

                font-size:17px;

                font-weight:800;

                letter-spacing:.5px;

                box-shadow:
                    0 12px 27px
                    rgba(0,0,0,.35),

                    0 0 20px
                    rgba(176,86,255,.20),

                    inset 0 0 15px
                    rgba(255,228,175,.07);

                transition:
                    transform .24s ease,
                    filter .24s ease,
                    box-shadow .24s ease;

            }

            #unlockGalleryBtn:hover{

                transform:
                    translateY(-2px);

                filter:
                    brightness(1.13);

                box-shadow:
                    0 15px 31px
                    rgba(0,0,0,.40),

                    0 0 28px
                    rgba(255,205,128,.18),

                    0 0 30px
                    rgba(178,88,255,.27);

            }

            #unlockGalleryBtn:disabled{

                cursor:wait;

                opacity:.60;

                transform:none;

            }

            #lockError{

                position:relative;

                min-height:24px;

                margin-top:15px;

                color:
                    rgba(255,147,164,.96);

                font-family:
                    "Vazirmatn",
                    sans-serif;

                font-size:14px;

                direction:rtl;

                text-align:center;

                text-shadow:
                    0 0 10px
                    rgba(255,80,110,.20);

            }

            #galleryLockModal.gallery-lock-error
            .lockBox{

                animation:
                    galleryLockShake
                    .42s
                    ease;

            }
#baninUniverseLogoContainer.gallery-lock-logo-hidden{

    opacity:0 !important;

    visibility:hidden !important;

    pointer-events:none !important;

    transition:
        opacity .28s ease,
        visibility .28s ease !important;

}

        `;

        document.head.appendChild(
            style
        );

    },

    bindEvents(){

        this.unlockButton.addEventListener(
            "click",
            () => {

                this.tryUnlock();

            }
        );

        this.input.addEventListener(
            "keydown",
            event => {

                if(event.key === "Enter"){

                    event.preventDefault();

                    this.tryUnlock();

                }

            }
        );

        this.input.addEventListener(
            "input",
            () => {

                this.clearError();

            }
        );

        this.modal.addEventListener(
            "click",
            event => {

                if(event.target === this.modal){

                    this.close();

                }

            }
        );

        document.addEventListener(
            "keydown",
            event => {

                if(
                    !this.isOpen ||
                    event.key !== "Escape"
                ){
                    return;
                }

                event.preventDefault();

                this.close();

            }
        );

    },

    open(){

        if(!this.initialized){
            this.create();
        }

        if(
            !this.initialized ||
            this.isOpen
        ){
            return;
        }

this.lastFocusedElement =
    document.activeElement;

const baninLogo =
    document.getElementById(
        "baninUniverseLogoContainer"
    );

if(baninLogo){

    baninLogo.classList.add(
        "gallery-lock-logo-hidden"
    );

}

this.isOpen = true;
this.isUnlocking = false;

        this.input.value = "";

        this.unlockButton.disabled =
            false;

        this.unlockButton.textContent =
            "Unlock";

        this.clearError();

        this.modal.classList.remove(
            "hidden"
        );

        this.modal.setAttribute(
            "aria-hidden",
            "false"
        );

        requestAnimationFrame(
            () => {

                this.modal.classList.add(
                    "gallery-lock-visible"
                );

                window.setTimeout(
                    () => {

                        if(this.isOpen){

                            this.input.focus({
                                preventScroll:true
                            });

                        }

                    },
                    80
                );

            }
        );

    },

    close(){

        if(
            !this.initialized ||
            !this.isOpen
        ){
            return;
        }

this.isOpen = false;
this.isUnlocking = false;
this.unlockAttemptId += 1;

const baninLogo =
    document.getElementById(
        "baninUniverseLogoContainer"
    );

if(baninLogo){

    baninLogo.classList.remove(
        "gallery-lock-logo-hidden"
    );

}

this.modal.classList.remove(
    "gallery-lock-visible",
    "gallery-lock-error"
);

        this.modal.setAttribute(
            "aria-hidden",
            "true"
        );

        window.setTimeout(
            () => {

                if(this.isOpen){
                    return;
                }

                this.modal.classList.add(
                    "hidden"
                );

                this.input.value = "";

                this.clearError();

            },
            390
        );

        if(
            this.lastFocusedElement &&
            typeof this.lastFocusedElement
                .focus === "function"
        ){

            try{

                this.lastFocusedElement.focus({
                    preventScroll:true
                });

            }catch(error){}

        }

    },

async tryUnlock(){

    if(this.isUnlocking){
        return;
    }

    const enteredPassword =
        this.input.value;

    if(!enteredPassword.trim()){

        this.showError(
            "اول رمز Gallery رو وارد کن."
        );

        return;
    }

    if(
        !window.GalleryCrypto ||
        typeof GalleryCrypto
            .unlockTestGallery !==
            "function"
    ){

        console.warn(
            "❌ GalleryCrypto is not loaded"
        );

        this.showError(
            "سیستم بررسی رمز Gallery لود نشده."
        );

        return;
    }

    if(
        !window.GalleryEncryptedData ||
        typeof GalleryEncryptedData.open !==
            "function" ||
        typeof GalleryEncryptedData.preloadAll !==
            "function"
    ){

        console.warn(
            "❌ GalleryEncryptedData is not loaded"
        );

        this.showError(
            "سیستم عکس‌های رمزگذاری‌شده لود نشده."
        );

        return;
    }

    this.clearError();

    this.isUnlocking =
        true;

    const currentAttempt =
        ++this.unlockAttemptId;

    this.unlockButton.disabled =
        true;

    this.unlockButton.textContent =
        "Checking Password...";

    try{

        /*
            Phase 1:
            Validate the password against gallery-test.json.
        */
        await GalleryCrypto
            .unlockTestGallery(
                enteredPassword
            );

        if(
            currentAttempt !==
                this.unlockAttemptId ||
            !this.isOpen ||
            !this.isUnlocking
        ){
            return;
        }

        /*
            Phase 2:
            Decrypt gallery-manifest.json and create
            the temporary Gallery encryption key.
        */
        this.unlockButton.textContent =
            "Opening Gallery...";

        await GalleryEncryptedData.open(
            enteredPassword
        );

        if(
            currentAttempt !==
                this.unlockAttemptId ||
            !this.isOpen ||
            !this.isUnlocking
        ){

            GalleryEncryptedData.close();

            return;
        }

        /*
            Phase 3:
            Load and decrypt every encrypted photo.

            Each returned URL is a temporary Blob URL.
            The original password is not stored.
        */
        const decryptedPhotos =
            await GalleryEncryptedData.preloadAll(
                progress => {

                    if(
                        currentAttempt !==
                            this.unlockAttemptId ||
                        !this.isOpen ||
                        !this.isUnlocking
                    ){
                        return;
                    }

                    this.unlockButton.textContent =
                        (
                            "Decrypting " +
                            progress.current +
                            " / " +
                            progress.total +
                            "..."
                        );

                }
            );

        if(
            currentAttempt !==
                this.unlockAttemptId ||
            !this.isOpen ||
            !this.isUnlocking
        ){

            GalleryEncryptedData.close();

            return;
        }

        /*
            GalleryData keeps the visual controls:

            - rotation
            - rope length
            - rope position
            - clip position
            - captions

            Only the old public image path is replaced
            with the decrypted temporary Blob URL.
        */
        const layoutItems =
            Array.isArray(
                window.GalleryData
            )
                ? window.GalleryData
                : [];

        const galleryItems =
            decryptedPhotos.map(
                (photo, index) => {

                    const layoutItem =
                        (
                            layoutItems[index] &&
                            typeof layoutItems[index] ===
                                "object"
                        )
                            ? layoutItems[index]
                            : {};

                    const layoutCaption =
                        (
                            typeof layoutItem.caption ===
                                "string"
                        )
                            ? layoutItem.caption.trim()
                            : "";

                    const encryptedCaption =
                        (
                            typeof photo.caption ===
                                "string"
                        )
                            ? photo.caption.trim()
                            : "";

                    return {

                        ...layoutItem,

                        image:
                            photo.url,

                        caption:
                            layoutCaption ||
                            encryptedCaption ||
                            `Little memory ${index + 1}`,

                        placeholder:
                            false

                    };

                }
            );

        this.finishUnlock(
            galleryItems,
            currentAttempt
        );

    }catch(error){

        /*
            Remove partially decrypted photos and the
            temporary key after every failed attempt.
        */
        if(
            window.GalleryEncryptedData &&
            typeof GalleryEncryptedData.close ===
                "function"
        ){

            GalleryEncryptedData.close();

        }

        if(
            currentAttempt !==
                this.unlockAttemptId ||
            !this.isOpen
        ){
            return;
        }

        this.isUnlocking =
            false;

        this.unlockButton.disabled =
            false;

        this.unlockButton.textContent =
            "Unlock";

        const errorCode =
            error?.code || "";

        if(
            errorCode ===
            "WRONG_PASSWORD"
        ){

            this.showError(
                "رمز Gallery درست نیست."
            );

            return;
        }

        if(
            errorCode ===
            "ENCRYPTED_FILE_NOT_FOUND"
        ){

            this.showError(
                "فایل بررسی رمز Gallery پیدا نشد."
            );

            console.error(
                "Gallery test file was not found:",
                error
            );

            return;
        }

        if(
            errorCode ===
            "INVALID_ENCRYPTED_FILE"
        ){

            this.showError(
                "فایل بررسی رمز Gallery خراب یا نامعتبره."
            );

            console.error(
                "Gallery test file is invalid:",
                error
            );

            return;
        }

        if(
            errorCode ===
            "MANIFEST_NOT_FOUND"
        ){

            this.showError(
                "فایل gallery-manifest.json پیدا نشد."
            );

            console.error(
                "Gallery manifest was not found:",
                error
            );

            return;
        }

        if(
            errorCode ===
                "INVALID_MANIFEST" ||
            errorCode ===
                "MANIFEST_DECRYPT_FAILED"
        ){

            this.showError(
                "Manifest گالری خراب شده یا با رمز متفاوتی ساخته شده."
            );

            console.error(
                "Gallery manifest is invalid:",
                error
            );

            return;
        }

        if(
            errorCode ===
                "PHOTO_NOT_FOUND"
        ){

            this.showError(
                "یکی از عکس‌های رمزگذاری‌شده پیدا نشد."
            );

            console.error(
                "Encrypted Gallery photo was not found:",
                error
            );

            return;
        }

        if(
            errorCode ===
                "INVALID_PHOTO" ||
            errorCode ===
                "PHOTO_DECRYPT_FAILED"
        ){

            this.showError(
                "یکی از عکس‌های رمزگذاری‌شده خراب یا نامعتبره."
            );

            console.error(
                "Encrypted Gallery photo is invalid:",
                error
            );

            return;
        }

        if(
            errorCode ===
                "CRYPTO_UNAVAILABLE" ||
            errorCode ===
                "CRYPTO_FAILED"
        ){

            this.showError(
                "مرورگر نتونست Gallery رو رمزگشایی کنه."
            );

            console.error(
                "Gallery crypto failed:",
                error
            );

            return;
        }

        this.showError(
            "باز کردن Gallery انجام نشد. دوباره امتحان کن."
        );

        console.error(
            "Unexpected Gallery unlock error:",
            error
        );

    }

},

finishUnlock(
    galleryItems,
    attemptId
){

    if(
        attemptId !==
            this.unlockAttemptId ||
        !this.isOpen ||
        !this.isUnlocking
    ){
        return;
    }

    if(
        !Array.isArray(
            galleryItems
        ) ||
        !galleryItems.length
    ){

        this.isUnlocking =
            false;

        this.unlockButton.disabled =
            false;

        this.unlockButton.textContent =
            "Unlock";

        this.showError(
            "هیچ عکس رمزگشایی‌شده‌ای پیدا نشد."
        );

        GalleryEncryptedData.close();

        return;
    }

    this.isUnlocking =
        false;

    this.close();

    window.setTimeout(
        () => {

            if(
                !window.GalleryPanel ||
                typeof GalleryPanel.open !==
                    "function" ||
                typeof GalleryPanel.setItems !==
                    "function"
            ){

                console.warn(
                    "❌ GalleryPanel is not loaded"
                );

                GalleryEncryptedData.close();

                return;
            }

            /*
                GalleryPanel.create() must run first.

                Otherwise its initial loadGalleryData()
                could overwrite the decrypted items.
            */
            if(
                typeof GalleryPanel.create ===
                    "function"
            ){

                GalleryPanel.create();

            }

            GalleryPanel.setItems(
                galleryItems
            );

            GalleryPanel.open();

        },
        240
    );

},

    showError(message){

        if(!this.error){
            return;
        }

        this.error.textContent =
            message;

        this.modal.classList.remove(
            "gallery-lock-error"
        );

        void this.modal.offsetWidth;

        this.modal.classList.add(
            "gallery-lock-error"
        );

        this.input.focus({
            preventScroll:true
        });

    },

    clearError(){

        if(this.error){

            this.error.textContent =
                "";

        }

        this.modal?.classList.remove(
            "gallery-lock-error"
        );

    }

};

window.GalleryLock =
    GalleryLock;