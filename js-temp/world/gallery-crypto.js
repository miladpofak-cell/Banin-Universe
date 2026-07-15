/*==================================================
BANIN UNIVERSE
GALLERY CRYPTO
Password-Based Gallery Decryption
Phase 2 - Real Password Validation
==================================================*/

"use strict";


const GalleryCrypto = {

    /*
        Encrypted test package.

        This file will be generated in the next step.
        It will contain no visible password.
    */
    encryptedTestFilePath:
        "assets/gallery/encrypted/gallery-test.json",


    /*
        Signature expected inside the decrypted data.

        This is not a password.
        It only confirms that the decrypted file belongs
        to Banin Universe Gallery.
    */
    expectedSignature:
        "BANIN_UNIVERSE_GALLERY_V1",


    /*
        Prevent extremely weak or corrupted iteration values.
    */
    minimumIterations:
        100000,

    maximumIterations:
        2000000,


    /*==================================================
    PUBLIC UNLOCK METHOD
    ==================================================*/

    async unlockTestGallery(password){

        if(
            typeof password !== "string" ||
            !password.trim()
        ){

            throw this.createError(
                "EMPTY_PASSWORD",
                "Gallery password is empty."
            );

        }


        if(
            !window.crypto ||
            !window.crypto.subtle
        ){

            throw this.createError(
                "CRYPTO_UNAVAILABLE",
                "Web Crypto API is not available."
            );

        }


        /*
            Password is only used inside this method.
            It is never saved in:

            - localStorage
            - sessionStorage
            - cookies
            - window
            - GalleryCrypto
        */

        const encryptedPackage =
            await this.loadEncryptedPackage();


        const decryptedPayload =
            await this.decryptPackage(
                encryptedPackage,
                password
            );


        this.validateDecryptedPayload(
            decryptedPayload
        );


        return decryptedPayload;

    },


    /*==================================================
    LOAD ENCRYPTED FILE
    ==================================================*/

    async loadEncryptedPackage(){

        let response;


        try{

            response =
                await fetch(
                    this.encryptedTestFilePath,
                    {
                        method:
                            "GET",

                        cache:
                            "no-store",

                        credentials:
                            "same-origin"
                    }
                );

        }catch(error){

            throw this.createError(
                "ENCRYPTED_FILE_NOT_FOUND",
                "The encrypted Gallery file could not be loaded.",
                error
            );

        }


        if(!response.ok){

            throw this.createError(
                "ENCRYPTED_FILE_NOT_FOUND",
                (
                    "Encrypted Gallery file request failed: " +
                    response.status
                )
            );

        }


        let encryptedPackage;


        try{

            encryptedPackage =
                await response.json();

        }catch(error){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Encrypted Gallery file is not valid JSON.",
                error
            );

        }


        this.validateEncryptedPackage(
            encryptedPackage
        );


        return encryptedPackage;

    },


    /*==================================================
    VALIDATE ENCRYPTED PACKAGE
    ==================================================*/

    validateEncryptedPackage(encryptedPackage){

        if(
            !encryptedPackage ||
            typeof encryptedPackage !== "object" ||
            Array.isArray(encryptedPackage)
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Encrypted Gallery package is invalid."
            );

        }


        const version =
            Number(
                encryptedPackage.version
            );


        const iterations =
            Number(
                encryptedPackage.iterations
            );


        if(version !== 1){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Unsupported encrypted Gallery version."
            );

        }


        if(
            encryptedPackage.algorithm !==
            "AES-GCM"
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Invalid Gallery encryption algorithm."
            );

        }


        if(
            encryptedPackage.kdf !==
            "PBKDF2"
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Invalid Gallery key derivation method."
            );

        }


        if(
            encryptedPackage.hash !==
            "SHA-256"
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Invalid Gallery hash algorithm."
            );

        }


        if(
            !Number.isInteger(iterations) ||
            iterations <
                this.minimumIterations ||
            iterations >
                this.maximumIterations
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Invalid Gallery PBKDF2 iteration count."
            );

        }


        const requiredBase64Fields = [

            "salt",
            "iv",
            "ciphertext"

        ];


        requiredBase64Fields.forEach(
            fieldName => {

                const value =
                    encryptedPackage[
                        fieldName
                    ];


                if(
                    typeof value !== "string" ||
                    !value.trim()
                ){

                    throw this.createError(
                        "INVALID_ENCRYPTED_FILE",
                        (
                            "Encrypted Gallery field is missing: " +
                            fieldName
                        )
                    );

                }

            }
        );

    },


    /*==================================================
    DECRYPT PACKAGE
    ==================================================*/

    async decryptPackage(
        encryptedPackage,
        password
    ){

        let salt;
        let iv;
        let ciphertext;


        try{

            salt =
                this.base64ToBytes(
                    encryptedPackage.salt
                );


            iv =
                this.base64ToBytes(
                    encryptedPackage.iv
                );


            ciphertext =
                this.base64ToBytes(
                    encryptedPackage.ciphertext
                );

        }catch(error){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Encrypted Gallery contains invalid Base64 data.",
                error
            );

        }


        /*
            PBKDF2 salt should normally be at least 16 bytes.
            AES-GCM IV should normally be exactly 12 bytes.
        */

        if(
            salt.byteLength < 16 ||
            iv.byteLength !== 12 ||
            ciphertext.byteLength < 17
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Encrypted Gallery byte lengths are invalid."
            );

        }


        const key =
            await this.deriveKey(
                password,
                salt,
                encryptedPackage.iterations
            );


        let decryptedBuffer;


        try{

            decryptedBuffer =
                await window.crypto.subtle.decrypt(
                    {
                        name:
                            "AES-GCM",

                        iv:
                            iv,

                        tagLength:
                            128
                    },
                    key,
                    ciphertext
                );

        }catch(error){

            /*
                AES-GCM authentication fails when:

                - password is wrong
                - encrypted data was changed
                - salt or IV is wrong

                For the password window this is treated
                as a wrong password.
            */

            throw this.createError(
                "WRONG_PASSWORD",
                "Gallery password is incorrect.",
                error
            );

        }


        let decryptedText;


        try{

            decryptedText =
                new TextDecoder(
                    "utf-8",
                    {
                        fatal:
                            true
                    }
                ).decode(
                    decryptedBuffer
                );

        }catch(error){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Decrypted Gallery text is invalid.",
                error
            );

        }


        let decryptedPayload;


        try{

            decryptedPayload =
                JSON.parse(
                    decryptedText
                );

        }catch(error){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Decrypted Gallery data is not valid JSON.",
                error
            );

        }


        return decryptedPayload;

    },


    /*==================================================
    DERIVE AES KEY FROM PASSWORD
    ==================================================*/

    async deriveKey(
        password,
        salt,
        iterations
    ){

        const passwordBytes =
            new TextEncoder().encode(
                password
            );


        let passwordKey;


        try{

            passwordKey =
                await window.crypto.subtle.importKey(
                    "raw",
                    passwordBytes,
                    {
                        name:
                            "PBKDF2"
                    },
                    false,
                    [
                        "deriveKey"
                    ]
                );

        }catch(error){

            throw this.createError(
                "CRYPTO_FAILED",
                "Gallery password key could not be imported.",
                error
            );

        }


        try{

            return await window.crypto.subtle.deriveKey(
                {
                    name:
                        "PBKDF2",

                    salt:
                        salt,

                    iterations:
                        Number(
                            iterations
                        ),

                    hash:
                        "SHA-256"
                },
                passwordKey,
                {
                    name:
                        "AES-GCM",

                    length:
                        256
                },
                false,
                [
                    "decrypt"
                ]
            );

        }catch(error){

            throw this.createError(
                "CRYPTO_FAILED",
                "Gallery decryption key could not be derived.",
                error
            );

        }

    },


    /*==================================================
    VALIDATE DECRYPTED DATA
    ==================================================*/

    validateDecryptedPayload(
        decryptedPayload
    ){

        if(
            !decryptedPayload ||
            typeof decryptedPayload !==
                "object" ||
            Array.isArray(
                decryptedPayload
            )
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Decrypted Gallery payload is invalid."
            );

        }


        if(
            decryptedPayload.signature !==
            this.expectedSignature
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Decrypted Gallery signature is invalid."
            );

        }


        if(
            decryptedPayload.authorized !==
            true
        ){

            throw this.createError(
                "INVALID_ENCRYPTED_FILE",
                "Decrypted Gallery authorization is invalid."
            );

        }

    },


    /*==================================================
    BASE64 CONVERSION
    ==================================================*/

    base64ToBytes(base64Value){

        const cleanedValue =
            String(
                base64Value
            )
            .replace(
                /\s+/g,
                ""
            );


        const binaryString =
            window.atob(
                cleanedValue
            );


        const bytes =
            new Uint8Array(
                binaryString.length
            );


        for(
            let index = 0;
            index <
                binaryString.length;
            index++
        ){

            bytes[index] =
                binaryString.charCodeAt(
                    index
                );

        }


        return bytes;

    },


    /*==================================================
    ERROR CREATOR
    ==================================================*/

    createError(
        code,
        message,
        originalError = null
    ){

        const error =
            new Error(
                message
            );


        error.name =
            "GalleryCryptoError";


        error.code =
            code;


        if(originalError){

            error.originalError =
                originalError;

        }


        return error;

    }

};


window.GalleryCrypto =
    GalleryCrypto;