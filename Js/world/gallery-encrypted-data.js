/*==================================================
BANIN UNIVERSE
ENCRYPTED GALLERY DATA
Manifest + Photo Decryption
==================================================*/

"use strict";


const GalleryEncryptedData = (() => {

    const CONFIG = {

        encryptedBasePath:
            "assets/gallery/encrypted/",

        manifestFilename:
            "gallery-manifest.json",

        manifestType:
            "BANIN_UNIVERSE_GALLERY_MANIFEST",

        manifestSignature:
            "BANIN_UNIVERSE_GALLERY_MANIFEST_V1",

        manifestContext:
            "BANIN_UNIVERSE_MANIFEST_V1",

        photoMagic:
            "BUGIMG01",

        photoContextPrefix:
            "BANIN_UNIVERSE_PHOTO_V1|",

        minimumIterations:
            100000,

        maximumIterations:
            2000000,

        magicLength:
            8,

        ivLength:
            12

    };


    let activeKey =
        null;

    let activeManifest =
        null;

    const photoObjectUrls =
        new Map();


    /*==================================================
    OPEN ENCRYPTED GALLERY
    ==================================================*/

    async function open(password){

        if(
            typeof password !== "string" ||
            !password.trim()
        ){

            throw createError(
                "EMPTY_PASSWORD",
                "Gallery password is empty."
            );

        }


        ensureCryptoAvailable();

        close();


        const encryptedPackage =
            await loadManifestPackage();


        validateManifestPackage(
            encryptedPackage
        );


        const salt =
            base64ToBytes(
                encryptedPackage.salt
            );


        const iv =
            base64ToBytes(
                encryptedPackage.iv
            );


        const ciphertext =
            base64ToBytes(
                encryptedPackage.ciphertext
            );


        if(
            salt.byteLength < 16 ||
            iv.byteLength !== 12 ||
            ciphertext.byteLength < 17
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Encrypted Gallery manifest byte lengths are invalid."
            );

        }


        const galleryKey =
            await deriveKey(
                password,
                salt,
                Number(
                    encryptedPackage.iterations
                )
            );


        const manifestPayload =
            await decryptManifest(
                galleryKey,
                iv,
                ciphertext
            );


        validateManifestPayload(
            manifestPayload
        );


        activeKey =
            galleryKey;

        activeManifest =
            manifestPayload;


        return getManifest();

    }


    /*==================================================
    LOAD MANIFEST FILE
    ==================================================*/

    async function loadManifestPackage(){

        const manifestPath =
            CONFIG.encryptedBasePath +
            CONFIG.manifestFilename;


        let response;


        try{

            response =
                await fetch(
                    manifestPath,
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

            throw createError(
                "MANIFEST_NOT_FOUND",
                "Gallery manifest could not be loaded.",
                error
            );

        }


        if(!response.ok){

            throw createError(
                "MANIFEST_NOT_FOUND",
                (
                    "Gallery manifest request failed: " +
                    response.status
                )
            );

        }


        try{

            return await response.json();

        }catch(error){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest is not valid JSON.",
                error
            );

        }

    }


    /*==================================================
    VALIDATE ENCRYPTED MANIFEST PACKAGE
    ==================================================*/

    function validateManifestPackage(
        encryptedPackage
    ){

        if(
            !encryptedPackage ||
            typeof encryptedPackage !== "object" ||
            Array.isArray(encryptedPackage)
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Encrypted Gallery manifest package is invalid."
            );

        }


        const iterations =
            Number(
                encryptedPackage.iterations
            );


        if(
            Number(
                encryptedPackage.version
            ) !== 1
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Unsupported Gallery manifest version."
            );

        }


        if(
            encryptedPackage.type !==
            CONFIG.manifestType
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest type is invalid."
            );

        }


        if(
            encryptedPackage.algorithm !==
            "AES-GCM"
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest algorithm is invalid."
            );

        }


        if(
            encryptedPackage.kdf !==
            "PBKDF2"
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest KDF is invalid."
            );

        }


        if(
            encryptedPackage.hash !==
            "SHA-256"
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest hash is invalid."
            );

        }


        if(
            encryptedPackage.context !==
            CONFIG.manifestContext
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest context is invalid."
            );

        }


        if(
            !Number.isInteger(iterations) ||
            iterations <
                CONFIG.minimumIterations ||
            iterations >
                CONFIG.maximumIterations
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest iteration count is invalid."
            );

        }


        [
            "salt",
            "iv",
            "ciphertext"
        ].forEach(
            fieldName => {

                if(
                    typeof encryptedPackage[
                        fieldName
                    ] !== "string" ||
                    !encryptedPackage[
                        fieldName
                    ].trim()
                ){

                    throw createError(
                        "INVALID_MANIFEST",
                        (
                            "Gallery manifest field is missing: " +
                            fieldName
                        )
                    );

                }

            }
        );

    }


    /*==================================================
    DECRYPT MANIFEST
    ==================================================*/

    async function decryptManifest(
        galleryKey,
        iv,
        ciphertext
    ){

        const additionalData =
            new TextEncoder().encode(
                CONFIG.manifestContext
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

                        additionalData:
                            additionalData,

                        tagLength:
                            128
                    },
                    galleryKey,
                    ciphertext
                );

        }catch(error){

            throw createError(
                "MANIFEST_DECRYPT_FAILED",
                "Gallery manifest could not be decrypted.",
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

            throw createError(
                "INVALID_MANIFEST",
                "Decrypted Gallery manifest text is invalid.",
                error
            );

        }


        try{

            return JSON.parse(
                decryptedText
            );

        }catch(error){

            throw createError(
                "INVALID_MANIFEST",
                "Decrypted Gallery manifest is not valid JSON.",
                error
            );

        }

    }


    /*==================================================
    VALIDATE DECRYPTED MANIFEST
    ==================================================*/

    function validateManifestPayload(
        manifestPayload
    ){

        if(
            !manifestPayload ||
            typeof manifestPayload !== "object" ||
            Array.isArray(manifestPayload)
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Decrypted Gallery manifest payload is invalid."
            );

        }


        if(
            manifestPayload.signature !==
            CONFIG.manifestSignature
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest signature is invalid."
            );

        }


        if(
            Number(
                manifestPayload.version
            ) !== 1
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest payload version is invalid."
            );

        }


        if(
            manifestPayload.photoFormat !==
            CONFIG.photoMagic
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery photo format is invalid."
            );

        }


        if(
            !Array.isArray(
                manifestPayload.photos
            ) ||
            !manifestPayload.photos.length
        ){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest contains no photos."
            );

        }


        const usedIds =
            new Set();


        manifestPayload.photos.forEach(
            (photo, index) => {

                validatePhotoMetadata(
                    photo,
                    index,
                    usedIds
                );

            }
        );

    }


    function validatePhotoMetadata(
        photo,
        index,
        usedIds
    ){

        if(
            !photo ||
            typeof photo !== "object" ||
            Array.isArray(photo)
        ){

            throw createError(
                "INVALID_MANIFEST",
                (
                    "Gallery photo metadata is invalid at index " +
                    index
                )
            );

        }


        if(
            typeof photo.id !== "string" ||
            !/^photo-\d{3,}$/.test(
                photo.id
            )
        ){

            throw createError(
                "INVALID_MANIFEST",
                (
                    "Gallery photo ID is invalid at index " +
                    index
                )
            );

        }


        if(usedIds.has(photo.id)){

            throw createError(
                "INVALID_MANIFEST",
                (
                    "Duplicate Gallery photo ID: " +
                    photo.id
                )
            );

        }


        usedIds.add(
            photo.id
        );


        if(
            photo.file !==
            `${photo.id}.enc`
        ){

            throw createError(
                "INVALID_MANIFEST",
                (
                    "Gallery photo filename is invalid: " +
                    photo.id
                )
            );

        }


        if(
            ![
                "image/jpeg",
                "image/png",
                "image/webp"
            ].includes(
                photo.mimeType
            )
        ){

            throw createError(
                "INVALID_MANIFEST",
                (
                    "Gallery photo MIME type is invalid: " +
                    photo.id
                )
            );

        }


        if(
            !Number.isInteger(
                Number(
                    photo.byteLength
                )
            ) ||
            Number(
                photo.byteLength
            ) <= 0
        ){

            throw createError(
                "INVALID_MANIFEST",
                (
                    "Gallery photo byte length is invalid: " +
                    photo.id
                )
            );

        }

    }


    /*==================================================
    GET DECRYPTED PHOTO URL
    ==================================================*/

    async function getPhotoUrl(photoId){

        if(
            !activeKey ||
            !activeManifest
        ){

            throw createError(
                "GALLERY_NOT_OPEN",
                "Encrypted Gallery has not been opened."
            );

        }


        if(
            photoObjectUrls.has(
                photoId
            )
        ){

            return photoObjectUrls.get(
                photoId
            );

        }


        const photo =
            activeManifest.photos.find(
                item => {

                    return item.id ===
                        photoId;

                }
            );


        if(!photo){

            throw createError(
                "PHOTO_NOT_FOUND",
                (
                    "Gallery photo metadata was not found: " +
                    photoId
                )
            );

        }


        const encryptedBytes =
            await loadEncryptedPhoto(
                photo
            );


        const decryptedBuffer =
            await decryptPhoto(
                encryptedBytes,
                photo
            );


        if(
            decryptedBuffer.byteLength !==
            Number(
                photo.byteLength
            )
        ){

            throw createError(
                "INVALID_PHOTO",
                (
                    "Decrypted Gallery photo size is invalid: " +
                    photo.id
                )
            );

        }


        const photoBlob =
            new Blob(
                [
                    decryptedBuffer
                ],
                {
                    type:
                        photo.mimeType
                }
            );


        const objectUrl =
            URL.createObjectURL(
                photoBlob
            );


        photoObjectUrls.set(
            photo.id,
            objectUrl
        );


        return objectUrl;

    }


    /*==================================================
    LOAD ENCRYPTED PHOTO
    ==================================================*/

    async function loadEncryptedPhoto(photo){

        const photoPath =
            CONFIG.encryptedBasePath +
            photo.file;


        let response;


        try{

            response =
                await fetch(
                    photoPath,
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

            throw createError(
                "PHOTO_NOT_FOUND",
                (
                    "Encrypted Gallery photo could not be loaded: " +
                    photo.id
                ),
                error
            );

        }


        if(!response.ok){

            throw createError(
                "PHOTO_NOT_FOUND",
                (
                    "Encrypted Gallery photo request failed: " +
                    photo.id +
                    " — " +
                    response.status
                )
            );

        }


        try{

            return new Uint8Array(
                await response.arrayBuffer()
            );

        }catch(error){

            throw createError(
                "INVALID_PHOTO",
                (
                    "Encrypted Gallery photo could not be read: " +
                    photo.id
                ),
                error
            );

        }

    }


    /*==================================================
    DECRYPT PHOTO
    ==================================================*/

    async function decryptPhoto(
        encryptedBytes,
        photo
    ){

        const minimumLength =
            CONFIG.magicLength +
            CONFIG.ivLength +
            17;


        if(
            encryptedBytes.byteLength <
            minimumLength
        ){

            throw createError(
                "INVALID_PHOTO",
                (
                    "Encrypted Gallery photo is too small: " +
                    photo.id
                )
            );

        }


        const magicBytes =
            encryptedBytes.slice(
                0,
                CONFIG.magicLength
            );


        const magic =
            new TextDecoder().decode(
                magicBytes
            );


        if(
            magic !==
            CONFIG.photoMagic
        ){

            throw createError(
                "INVALID_PHOTO",
                (
                    "Encrypted Gallery photo signature is invalid: " +
                    photo.id
                )
            );

        }


        const ivStart =
            CONFIG.magicLength;


        const ivEnd =
            ivStart +
            CONFIG.ivLength;


        const iv =
            encryptedBytes.slice(
                ivStart,
                ivEnd
            );


        const ciphertext =
            encryptedBytes.slice(
                ivEnd
            );


        const additionalData =
            new TextEncoder().encode(
                CONFIG.photoContextPrefix +
                photo.id
            );


        try{

            return await window.crypto.subtle.decrypt(
                {
                    name:
                        "AES-GCM",

                    iv:
                        iv,

                    additionalData:
                        additionalData,

                    tagLength:
                        128
                },
                activeKey,
                ciphertext
            );

        }catch(error){

            throw createError(
                "PHOTO_DECRYPT_FAILED",
                (
                    "Gallery photo could not be decrypted: " +
                    photo.id
                ),
                error
            );

        }

    }


    /*==================================================
    PRELOAD ALL PHOTOS
    ==================================================*/

    async function preloadAll(
        onProgress = null
    ){

        if(
            !activeManifest
        ){

            throw createError(
                "GALLERY_NOT_OPEN",
                "Encrypted Gallery has not been opened."
            );

        }


        const results =
            [];


        for(
            let index = 0;
            index <
                activeManifest.photos.length;
            index++
        ){

            const photo =
                activeManifest.photos[index];


            const url =
                await getPhotoUrl(
                    photo.id
                );


            results.push({

                ...photo,
                url:
                    url

            });


            if(
                typeof onProgress ===
                "function"
            ){

                onProgress({

                    current:
                        index + 1,

                    total:
                        activeManifest.photos.length,

                    photo:
                        photo

                });

            }

        }


        return results;

    }


    /*==================================================
    MANIFEST ACCESS
    ==================================================*/

    function getManifest(){

        if(!activeManifest){
            return null;
        }


        return {

            signature:
                activeManifest.signature,

            version:
                activeManifest.version,

            photoFormat:
                activeManifest.photoFormat,

            createdAt:
                activeManifest.createdAt || "",

            photos:
                activeManifest.photos.map(
                    photo => {

                        return {

                            id:
                                photo.id,

                            file:
                                photo.file,

                            mimeType:
                                photo.mimeType,

                            width:
                                Number(
                                    photo.width
                                ) || 0,

                            height:
                                Number(
                                    photo.height
                                ) || 0,

                            byteLength:
                                Number(
                                    photo.byteLength
                                ),

                            caption:
                                typeof photo.caption ===
                                "string"
                                    ? photo.caption
                                    : "",

                            alt:
                                typeof photo.alt ===
                                "string"
                                    ? photo.alt
                                    : ""

                        };

                    }
                )

        };

    }


    /*==================================================
    CLOSE AND CLEAR MEMORY
    ==================================================*/

    function close(){

        photoObjectUrls.forEach(
            objectUrl => {

                try{

                    URL.revokeObjectURL(
                        objectUrl
                    );

                }catch(error){}

            }
        );


        photoObjectUrls.clear();

        activeKey =
            null;

        activeManifest =
            null;

    }


    /*==================================================
    KEY DERIVATION
    ==================================================*/

    async function deriveKey(
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

            throw createError(
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
                        iterations,

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

            throw createError(
                "CRYPTO_FAILED",
                "Gallery decryption key could not be derived.",
                error
            );

        }

    }


    /*==================================================
    BASE64
    ==================================================*/

    function base64ToBytes(base64Value){

        let binaryString;


        try{

            binaryString =
                window.atob(
                    String(
                        base64Value
                    ).replace(
                        /\s+/g,
                        ""
                    )
                );

        }catch(error){

            throw createError(
                "INVALID_MANIFEST",
                "Gallery manifest contains invalid Base64 data.",
                error
            );

        }


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

    }


    /*==================================================
    CRYPTO CHECK
    ==================================================*/

    function ensureCryptoAvailable(){

        if(
            !window.crypto ||
            !window.crypto.subtle
        ){

            throw createError(
                "CRYPTO_UNAVAILABLE",
                "Web Crypto API is not available."
            );

        }

    }


    /*==================================================
    ERROR CREATOR
    ==================================================*/

    function createError(
        code,
        message,
        originalError = null
    ){

        const error =
            new Error(
                message
            );


        error.name =
            "GalleryEncryptedDataError";

        error.code =
            code;


        if(originalError){

            error.originalError =
                originalError;

        }


        return error;

    }


    return {

        open:
            open,

        getManifest:
            getManifest,

        getPhotoUrl:
            getPhotoUrl,

        preloadAll:
            preloadAll,

        close:
            close

    };

})();


window.GalleryEncryptedData =
    GalleryEncryptedData;