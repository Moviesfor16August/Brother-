/* =====================================================
   MILAN BIRTHDAY CINEMATIC MOVIE
   FINAL SCRIPT
   8 SCENES
   AUTO PLAY
   AUTO LETTER SCROLL
   ONE VOICE NOTE
===================================================== */


/* =====================================================
   SCENES
===================================================== */

const scenes = document.querySelectorAll(".scene");

const dots =
    document.querySelectorAll(".progress-dot");


let currentScene = 0;

let sceneTimer = null;

let letterTimer = null;


/* =====================================================
   SCENE DURATIONS
===================================================== */

const durations = [

    8000,    // Scene 1 — Opening

    12000,   // Scene 2 — More Than A Friend

    10000,   // Scene 3 — Memory

    12000,   // Scene 4 — The People Who Stay

    14000,   // Scene 5 — A Promise

    12000,   // Scene 6 — Birthday

    60000,   // Scene 7 — Letter

    15000    // Scene 8 — Credits

];


/* =====================================================
   AUDIO
===================================================== */

const openingMusic =
    document.getElementById("openingMusic");

const partOneMusic =
    document.getElementById("partOneMusic");

const partTwoMusic =
    document.getElementById("partTwoMusic");

const partThreeMusic =
    document.getElementById("partThreeMusic");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const voiceNote =
    document.getElementById("voiceNote");


const allAudio = [

    openingMusic,
    partOneMusic,
    partTwoMusic,
    partThreeMusic,
    birthdayMusic,
    voiceNote

].filter(Boolean);


/* =====================================================
   AUDIO VOLUMES
===================================================== */

allAudio.forEach(audio => {

    audio.volume = 0;

});


/* =====================================================
   STOP ALL AUDIO
===================================================== */

function stopAllAudio() {

    allAudio.forEach(audio => {

        audio.pause();

        audio.currentTime = 0;

        audio.volume = 0;

    });

}


/* =====================================================
   PLAY AUDIO
===================================================== */

function playAudio(audio, volume = 0.4) {

    if (!audio) return;


    stopAllAudio();


    audio.volume = volume;


    audio.play().catch(() => {

        console.log(
            "Audio autoplay blocked by browser."
        );

    });

}


/* =====================================================
   SCENE AUDIO
===================================================== */

function playSceneAudio(index) {


    /* =====================================
       SCENE 1
       OPENING
    ===================================== */

    if (index === 0) {

        playAudio(
            openingMusic,
            0.35
        );

    }


    /* =====================================
       SCENE 2
       PART 1
    ===================================== */

    else if (index === 1) {

        playAudio(
            partOneMusic,
            0.40
        );

    }


    /* =====================================
       SCENE 3
       MEMORY
    ===================================== */

    else if (index === 2) {

        playAudio(
            partOneMusic,
            0.30
        );

    }


    /* =====================================
       SCENE 4
       PART 2
    ===================================== */

    else if (index === 3) {

        playAudio(
            partTwoMusic,
            0.40
        );

    }


    /* =====================================
       SCENE 5
       PROMISE
    ===================================== */

    else if (index === 4) {

        playAudio(
            partThreeMusic,
            0.40
        );

    }


    /* ================================
