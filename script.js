/* =====================================================
   MILAN BIRTHDAY CINEMATIC MOVIE
   FINAL AUTOMATIC MOVIE ENGINE
   8 SCENES
===================================================== */


/* =====================================================
   GET ALL SCENES
===================================================== */

const scenes = document.querySelectorAll(".scene");

const progressDots =
    document.querySelectorAll(".progress-dot");


/* =====================================================
   AUDIO
===================================================== */

const openingMusic =
    document.getElementById("openingMusic");

const partOneMusic =
    document.getElementById("partOneMusic");

const partTwoMusic =
    document.getElementById("partTwoMusic");

const voiceNote =
    document.getElementById("voiceNote");

const partThreeMusic =
    document.getElementById("partThreeMusic");

const birthdayMusic =
    document.getElementById("birthdayMusic");


/* =====================================================
   SCENE TIMINGS
=====================================================

   Scene 1  Opening       8 sec
   Scene 2  Part 1       12 sec
   Scene 3  Memory       10 sec
   Scene 4  Part 2       12 sec
   Scene 5  Promise      14 sec
   Scene 6  Birthday     12 sec
   Scene 7  Letter       45 sec
   Scene 8  Credits      12 sec
===================================================== */

const sceneDuration = [

    8000,    // Scene 1
    12000,   // Scene 2
    10000,   // Scene 3
    12000,   // Scene 4
    14000,   // Scene 5
    12000,   // Scene 6
    45000,   // Scene 7
    12000    // Scene 8

];


/* =====================================================
   CURRENT SCENE
===================================================== */

let currentScene = 0;

let movieTimer = null;


/* =====================================================
   AUDIO VOLUME
===================================================== */

if (openingMusic)
    openingMusic.volume = 0.35;

if (partOneMusic)
    partOneMusic.volume = 0.40;

if (partTwoMusic)
    partTwoMusic.volume = 0.40;

if (voiceNote)
    voiceNote.volume = 0.65;

if (partThreeMusic)
    partThreeMusic.volume = 0.40;

if (birthdayMusic)
    birthdayMusic.volume = 0.45;


/* =====================================================
   STOP ALL AUDIO
===================================================== */

function stopAllAudio() {

    const audios = [

        openingMusic,
        partOneMusic,
        partTwoMusic,
        voiceNote,
        partThreeMusic,
        birthdayMusic

    ];

    audios.forEach(audio => {

        if (!audio) return;

        audio.pause();

        audio.currentTime = 0;

    });

}


/* =====================================================
   PLAY AUDIO SAFELY
===================================================== */

function playAudio(audio) {

    if (!audio) return;

    audio.play().catch(() => {

        console.log(
            "Browser blocked autoplay audio."
        );

    });

}


/* =====================================================
   PLAY AUDIO FOR EACH SCENE
===================================================== */

function playSceneAudio(index) {

    stopAllAudio();


    /* -------------------------
       SCENE 1
    ------------------------- */

    if (index === 0) {

        playAudio(openingMusic);

    }


    /* -------------------------
       SCENE 2
       PART 1
    ------------------------- */

    else if (index === 1) {

        playAudio(partOneMusic);

    }


    /* -------------------------
       SCENE 3
       MEMORY
    ------------------------- */

    else if (index === 2) {

        playAudio(partOneMusic);

    }


    /* -------------------------
       SCENE 4
       PART 2
    ------------------------- */

    else if (index === 3) {

        playAudio(partTwoMusic);

    }


    /* -------------------------
       SCENE 5
       PROMISE

       Voice note plays here
    ------------------------- */

    else if (index === 4) {

        playAudio(partThreeMusic);

        setTimeout(() => {

            playAudio(voiceNote);

        }, 2500);

    }


    /* -------------------------
       SCENE 6
       BIRTHDAY
    ------------------------- */

    else if (index === 5) {

        playAudio(birthdayMusic);

    }


    /* -------------------------
       SCENE 7
       LETTER
    ------------------------- */

    else if (index === 6) {

        playAudio(birthdayMusic);

    }


    /* -------------------------
       SCENE 8
       CREDITS
    ------------------------- */

    else if (index === 7) {

        playAudio(birthdayMusic);

    }

}


/* =====================================================
   SHOW SCENE
===================================================== */

function showScene(index) {

    if (index < 0 || index >= scenes.length) {

        return;

    }


    /* Remove active from every scene */

    scenes.forEach(scene => {

        scene.classList.remove("active");

    });


    /* Activate selected scene */

    scenes[index].classList.add("active");


    /* Update progress dots */

    progressDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });


    currentScene = index;


    /* Play correct music */

    playSceneAudio(index);


    console.log(
        "Playing Scene:",
        index + 1
    );

}


/* =====================================================
   NEXT SCENE
===================================================== */

function nextScene() {

    if (currentScene >= scenes.length - 1) {

        endMovie();

        return;

    }


    showScene(currentScene + 1);

    scheduleNextScene();

}


/* =====================================================
   AUTOMATIC TIMER
===================================================== */

function scheduleNextScene() {

    clearTimeout(movieTimer);


    movieTimer = setTimeout(() => {

        nextScene();

    }, sceneDuration[currentScene]);

}


/* =====================================================
   START MOVIE
===================================================== */

function startMovie() {

    console.log(
        "MILAN BIRTHDAY MOVIE STARTED"
    );


    currentScene = 0;


    showScene(0);


    scheduleNextScene();

}


/* =====================================================
   END MOVIE
===================================================== */

function endMovie() {

    clearTimeout(movieTimer);


    /* Keep final credits on screen */

    showScene(
        scenes.length - 1
    );


    console.log(
        "THE END — MILAN'S BIRTHDAY MOVIE"
    );

}


/* =====================================================
   PREVENT SCROLLING
===================================================== */

document.addEventListener(
    "wheel",
    function(event) {

        event.preventDefault();

    },
    {
        passive: false
    }
);


document.addEventListener(
    "touchmove",
    function(event) {

        event.preventDefault();

    },
    {
        passive: false
    }
);


/* =====================================================
   PREVENT KEYBOARD SCROLL
===================================================== */

window.addEventListener(
    "keydown",
    function(event) {

        const blockedKeys = [

            "ArrowUp",
            "ArrowDown",
            "ArrowLeft",
            "ArrowRight",
            "PageUp",
            "PageDown",
            "Home",
            "End",
            " "

        ];


        if (
            blockedKeys.includes(
                event.key
            )
        ) {

            event.preventDefault();

        }

    }
);


/* =====================================================
   START WHEN PAGE LOADS
===================================================== */

window.addEventListener(
    "load",
    function() {

        setTimeout(() => {

            startMovie();

        }, 800);

    }
);
