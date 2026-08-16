/* =====================================================
   MILAN — CINEMATIC BIRTHDAY MOVIE
   AUTOMATIC MOVIE ENGINE
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const loader =
    document.getElementById("loader");

const music =
    document.getElementById("music");

const birthdayVideo =
    document.getElementById("birthdayVideo");

const progressBar =
    document.getElementById("progressBar");

const chapterLabel =
    document.getElementById("chapterLabel");

const timeLabel =
    document.getElementById("timeLabel");

const chapters =
    Array.from(
        document.querySelectorAll(".chapter")
    );


/* =====================================================
   MOVIE SETTINGS
===================================================== */

const SETTINGS = {

    /* Music volume */
    musicVolume: 0.65,

    /* Fade duration */
    fadeDuration: 1800,

    /* Delay before movie starts */
    openingDelay: 2200,

    /* Smooth transition time */
    scrollDuration: 1200

};


/* =====================================================
   CHAPTER NAMES
===================================================== */

const chapterNames = [

    "CHAPTER I",

    "CHAPTER I",

    "FRAME 01",

    "CHAPTER II",

    "FRAME 02",

    "CHAPTER III",

    "FRAME 03",

    "CHAPTER IV",

    "FRAME 04",

    "CHAPTER V",

    "FINALE"

];


/* =====================================================
   MOVIE STATE
===================================================== */

let currentChapter = 0;

let movieRunning = false;

let animationFrame = null;

let chapterStartTime = 0;

let currentDuration = 0;


/* =====================================================
   FORMAT TIME
===================================================== */

function formatTime(seconds) {

    seconds =
        Math.max(
            0,
            Math.floor(seconds)
        );

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;

    return (

        String(minutes)
            .padStart(2, "0")

        +

        ":" +

        String(remainingSeconds)
            .padStart(2, "0")

    );

}


/* =====================================================
   AUDIO FADE
===================================================== */

function fadeMusic(targetVolume, duration) {

    if (!music) return;

    const startVolume =
        music.volume;

    const startTime =
        performance.now();


    function fadeStep(now) {

        const progress =
            Math.min(
                1,
                (now - startTime) / duration
            );


        music.volume =
            startVolume +

            (
                targetVolume -
                startVolume
            ) *

            progress;


        if (progress < 1) {

            requestAnimationFrame(
                fadeStep
            );

        }

    }


    requestAnimationFrame(
        fadeStep
    );

}


/* =====================================================
   START MUSIC
===================================================== */

function startMusic() {

    if (!music) return;


    music.volume = 0;


    const playPromise =
        music.play();


    if (playPromise) {

        playPromise

            .then(() => {

                fadeMusic(
                    SETTINGS.musicVolume,
                    SETTINGS.fadeDuration
                );

            })

            .catch(() => {

                /*
                    Some mobile browsers block
                    autoplay audio.

                    The movie itself continues
                    automatically.
                */

                console.log(
                    "Audio autoplay blocked by browser."
                );

            });

    }

}


/* =====================================================
   RESUME MUSIC AFTER USER INTERACTION
===================================================== */

function unlockAudio() {

    if (!music) return;


    if (music.paused) {

        music.play()

            .then(() => {

                fadeMusic(
                    SETTINGS.musicVolume,
                    1200
                );

            })

            .catch(() => {});

    }

}


/* =====================================================
   SCROLL TO CHAPTER
===================================================== */

function moveToChapter(index) {

    if (
        index < 0 ||
        index >= chapters.length
    ) {

        finishMovie();

        return;

    }


    currentChapter =
        index;


    const chapter =
        chapters[index];


    /* ---------------------------------------------
       Update chapter name
    --------------------------------------------- */

    chapterLabel.textContent =
        chapterNames[index] ||
        `CHAPTER ${index + 1}`;


    /* ---------------------------------------------
       Reset progress
    --------------------------------------------- */

    progressBar.style.width =
        "0%";


    timeLabel.textContent =
        "00:00";


    /* ---------------------------------------------
       Stop previous video
    --------------------------------------------- */

    if (birthdayVideo) {

        birthdayVideo.pause();

        birthdayVideo.currentTime = 0;

    }


    /* ---------------------------------------------
       Cinematic scroll
    --------------------------------------------- */

    chapter.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });


    /* ---------------------------------------------
       Check if this chapter contains video
    --------------------------------------------- */

    if (
        birthdayVideo &&
        chapter.contains(
            birthdayVideo
        )
    ) {

        birthdayVideo.currentTime = 0;

        birthdayVideo.play()

            .catch(() => {

                /*
                    Video is muted,
                    so autoplay normally works.
                */

            });

    }


    /* ---------------------------------------------
       Duration
    --------------------------------------------- */

    currentDuration =
        Number(
            chapter.dataset.duration
        ) || 9000;


    chapterStartTime =
        performance.now();


    cancelAnimationFrame(
        animationFrame
    );


    animationFrame =
        requestAnimationFrame(
            updateMovie
        );

}


/* =====================================================
   MOVIE TIMER
===================================================== */

function updateMovie(now) {

    if (!movieRunning) {

        return;

    }


    const elapsed =
        now - chapterStartTime;


    const progress =
        Math.min(
            1,
            elapsed / currentDuration
        );


    /* ---------------------------------------------
       Progress bar
    --------------------------------------------- */

    progressBar.style.width =
        `${progress * 100}%`;


    /* ---------------------------------------------
       Time display
    --------------------------------------------- */

    timeLabel.textContent =
        formatTime(
            elapsed / 1000
        );


    /* ---------------------------------------------
       Chapter finished
    --------------------------------------------- */

    if (
        progress >= 1
    ) {

        moveToChapter(
            currentChapter + 1
        );

        return;

    }


    animationFrame =
        requestAnimationFrame(
            updateMovie
        );

}


/* =====================================================
   START MOVIE
===================================================== */

function startMovie() {

    if (movieRunning) {

        return;

    }


    movieRunning = true;


    startMusic();


    moveToChapter(0);

}


/* =====================================================
   FINISH MOVIE
===================================================== */

function finishMovie() {

    movieRunning = false;


    cancelAnimationFrame(
        animationFrame
    );


    progressBar.style.width =
        "100%";


    chapterLabel.textContent =
        "THE END";


    timeLabel.textContent =
        "FIN";


    /* ---------------------------------------------
       Fade music at the end
    --------------------------------------------- */

    fadeMusic(
        0,
        2500
    );

}


/* =====================================================
   LOADER
===================================================== */

window.addEventListener(
    "load",
    () => {

        setTimeout(
            () => {

                loader.classList.add(
                    "hide"
                );


                setTimeout(
                    () => {

                        startMovie();

                    },
                    700
                );

            },
            SETTINGS.openingDelay
        );

    }
);


/* =====================================================
   MOBILE AUDIO UNLOCK
===================================================== */

[
    "touchstart",
    "touchend",
    "click",
    "keydown"
]
.forEach(
    eventName => {

        window.addEventListener(

            eventName,

            unlockAudio,

            {
                once: true,
                passive: true
            }

        );

    }
);


/* =====================================================
   PREVENT MANUAL SCROLL
===================================================== */

window.addEventListener(

    "wheel",

    event => {

        event.preventDefault();

    },

    {
        passive: false
    }

);


window.addEventListener(

    "touchmove",

    event => {

        event.preventDefault();

    },

    {
        passive: false
    }

);


/* =====================================================
   PREVENT SPACE / ARROW SCROLL
===================================================== */

window.addEventListener(

    "keydown",

    event => {

        const blockedKeys = [

            "ArrowUp",
            "ArrowDown",
            "PageUp",
            "PageDown",
            " ",
            "Home",
            "End"

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
   VISIBILITY HANDLING
===================================================== */

document.addEventListener(

    "visibilitychange",

    () => {

        if (
            document.hidden
        ) {

            /*
                Pause movie timing
                when browser is hidden.
            */

            movieRunning = false;

            cancelAnimationFrame(
                animationFrame
            );

        }

        else {

            /*
                Continue movie when
                user returns.
            */

            if (
                currentChapter <
                chapters.length
            ) {

                movieRunning = true;

                chapterStartTime =
                    performance.now();

                animationFrame =
                    requestAnimationFrame(
                        updateMovie
                    );

            }

        }

    }

);


/* =====================================================
   END
===================================================== */

console.log(
    "🎬 Milan Cinematic Birthday Movie Engine Loaded."
);
