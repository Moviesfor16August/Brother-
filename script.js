/* =====================================================
   MILAN BIRTHDAY CINEMATIC MOVIE
   FINAL SCRIPT
   8 SCENES + AUTO LETTER SCROLL
===================================================== */


/* =====================================================
   SCENES
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
   MOVIE SETTINGS
===================================================== */

/*
   Scene 1  = Opening
   Scene 2  = More Than A Friend
   Scene 3  = Memory
   Scene 4  = The People Who Stay
   Scene 5  = A Promise
   Scene 6  = Birthday
   Scene 7  = Letter
   Scene 8  = End Credits
*/

const sceneDuration = [

    8000,    // 1 — Opening

    12000,   // 2 — More Than A Friend

    10000,   // 3 — Memory

    12000,   // 4 — The People Who Stay

    14000,   // 5 — A Promise

    12000,   // 6 — Birthday

    60000,   // 7 — Letter

    15000    // 8 — End Credits

];


let currentScene = 0;

let movieTimer = null;

let letterAnimation = null;

let voiceTimer = null;


/* =====================================================
   AUDIO VOLUMES
===================================================== */

if (openingMusic)
    openingMusic.volume = 0.35;

if (partOneMusic)
    partOneMusic.volume = 0.40;

if (partTwoMusic)
    partTwoMusic.volume = 0.40;

if (partThreeMusic)
    partThreeMusic.volume = 0.40;

if (birthdayMusic)
    birthdayMusic.volume = 0.45;

if (voiceNote)
    voiceNote.volume = 0.70;


/* =====================================================
   STOP ALL AUDIO
===================================================== */

function stopAllAudio() {

    const audioList = [

        openingMusic,
        partOneMusic,
        partTwoMusic,
        partThreeMusic,
        birthdayMusic,
        voiceNote

    ];


    audioList.forEach(audio => {

        if (!audio) return;

        audio.pause();

        audio.currentTime = 0;

    });

}


/* =====================================================
   SAFE AUDIO PLAY
===================================================== */

function playAudio(audio) {

    if (!audio) return;


    const promise = audio.play();


    if (promise !== undefined) {

        promise.catch(() => {

            console.log(
                "Audio autoplay blocked by browser."
            );

        });

    }

}


/* =====================================================
   RESET LETTER
===================================================== */

function resetLetter() {

    const letterText =
        document.querySelector(".letter-text");


    if (!letterText) return;


    /* Stop previous animation */

    if (letterAnimation) {

        cancelAnimationFrame(
            letterAnimation
        );

        letterAnimation = null;

    }


    /* Always return letter to top */

    letterText.scrollTop = 0;

}


/* =====================================================
   AUTOMATIC LETTER SCROLL
===================================================== */

function startLetterScroll() {

    const letterText =
        document.querySelector(".letter-text");


    if (!letterText) {

        console.log(
            "Letter text element not found."
        );

        return;

    }


    /* Reset first */

    resetLetter();


    /*
       Give the opening of the letter
       a few seconds to appear.
    */

    const delay = 3000;


    setTimeout(() => {

        /*
           Make sure we are still
           on the Letter scene.
        */

        if (currentScene !== 6) {

            return;

        }


        const maxScroll =
            letterText.scrollHeight -
            letterText.clientHeight;


        /*
           If everything already fits
           on the screen, no scrolling
           is necessary.
        */

        if (maxScroll <= 0) {

            return;

        }


        /*
           Letter scrolling duration.

           50 seconds gives a slow,
           cinematic reading effect.
        */

        const scrollDuration = 50000;


        const startTime =
            performance.now();


        function animateLetter(currentTime) {

            /*
               Stop if user has moved
               to another scene.
            */

            if (currentScene !== 6) {

                return;

            }


            const elapsed =
                currentTime - startTime;


            let progress =
                elapsed / scrollDuration;


            if (progress > 1) {

                progress = 1;

            }


            /*
               Smooth cinematic easing.
            */

            const eased =
                progress *
                progress *
                (3 - 2 * progress);


            letterText.scrollTop =
                maxScroll * eased;


            if (progress < 1) {

                letterAnimation =
                    requestAnimationFrame(
                        animateLetter
                    );

            }
            else {

                letterAnimation = null;

            }

        }


        letterAnimation =
            requestAnimationFrame(
                animateLetter
            );


    }, delay);

}


/* =====================================================
   PLAY MUSIC FOR SCENE
===================================================== */

function playSceneAudio(index) {

    /*
       Stop previous audio.
    */

    stopAllAudio();


    /*
       Clear voice-note timer.
    */

    if (voiceTimer) {

        clearTimeout(voiceTimer);

        voiceTimer = null;

    }


    /* =====================================
       SCENE 1 — OPENING
    ===================================== */

    if (index === 0) {

        playAudio(openingMusic);

    }


    /* =====================================
       SCENE 2 — PART 1
    ===================================== */

    else if (index === 1) {

        playAudio(partOneMusic);

    }


    /* =====================================
       SCENE 3 — MEMORY
    ===================================== */

    else if (index === 2) {

        playAudio(partOneMusic);

    }


    /* =====================================
       SCENE 4 — PART 2
    ===================================== */

    else if (index === 3) {

        playAudio(partTwoMusic);

    }


    /* =====================================
       SCENE 5 — PROMISE
    ===================================== */

    else if (index === 4) {

        playAudio(partThreeMusic);


        /*
           Voice note starts after
           2.5 seconds.
        */

        voiceTimer = setTimeout(() => {

            /*
               Make sure we are still
               in Scene 5.
            */

            if (currentScene === 4) {

                playAudio(voiceNote);

            }

        }, 2500);

    }


    /* =====================================
       SCENE 6 — BIRTHDAY
    ===================================== */

    else if (index === 5) {

        playAudio(birthdayMusic);

    }


    /* =====================================
       SCENE 7 — LETTER
    ===================================== */

    else if (index === 6) {

        /*
           Keep birthday music softly
           playing behind the letter.
        */

        if (birthdayMusic) {

            birthdayMusic.volume = 0.25;

        }

        playAudio(birthdayMusic);


        /*
           Start automatic letter scroll.
        */

        startLetterScroll();

    }


    /* =====================================
       SCENE 8 — END CREDITS
    ===================================== */

    else if (index === 7) {

        if (birthdayMusic) {

            birthdayMusic.volume = 0.20;

        }

        playAudio(birthdayMusic);

    }

}


/* =====================================================
   SHOW SCENE
===================================================== */

function showScene(index) {

    /*
       Safety check
    */

    if (
        index < 0 ||
        index >= scenes.length
    ) {

        return;

    }


    /*
       Stop previous letter animation
       whenever we leave the letter.
    */

    if (index !== 6) {

        if (letterAnimation) {

            cancelAnimationFrame(
                letterAnimation
            );

            letterAnimation = null;

        }

    }


    /*
       Remove active class
       from all scenes.
    */

    scenes.forEach(scene => {

        scene.classList.remove("active");

    });


    /*
       Show selected scene.
    */

    scenes[index].classList.add("active");


    /*
       Update progress dots.
    */

    progressDots.forEach((dot, i) => {

        dot.classList.toggle(
            "active",
            i === index
        );

    });


    /*
       Save current scene.
    */

    currentScene = index;


    /*
       Play correct audio.
    */

    playSceneAudio(index);


    console.log(
        "Now playing Scene:",
        index + 1,
        "/",
        scenes.length
    );

}


/* =====================================================
   NEXT SCENE
===================================================== */

function nextScene() {

    /*
       If final scene reached,
       stop the movie.
    */

    if (
        currentScene >=
        scenes.length - 1
    ) {

        endMovie();

        return;

    }


    /*
       Move to next scene.
    */

    showScene(
        currentScene + 1
    );


    /*
       Schedule the next scene.
    */

    scheduleNextScene();

}


/* =====================================================
   SCHEDULE NEXT SCENE
===================================================== */

function scheduleNextScene() {

    /*
       Clear old timer.
    */

    clearTimeout(movieTimer);


    /*
       Current scene duration.
    */

    const duration =
        sceneDuration[currentScene];


    /*
       Automatically move forward.
    */

    movieTimer = setTimeout(() => {

        nextScene();

    }, duration);

}


/* =====================================================
   START MOVIE
===================================================== */

function startMovie() {

    console.log(
        "MILAN BIRTHDAY MOVIE STARTED"
    );


    /*
       Clear anything from
       previous playback.
    */

    clearTimeout(movieTimer);


    resetLetter();


    /*
       Start from Scene 1.
    */

    currentScene = 0;


    showScene(0);


    /*
       Start automatic sequence.
    */

    scheduleNextScene();

}


/* =====================================================
   END MOVIE
===================================================== */

function endMovie() {

    /*
       Stop movie timer.
    */

    clearTimeout(movieTimer);


    /*
       Stop letter animation.
    */

    if (letterAnimation) {

        cancelAnimationFrame(
            letterAnimation
        );

        letterAnimation = null;

    }


    /*
       Keep End Credits visible.
    */

    showScene(
        scenes.length - 1
    );


    console.log(
        "================================"
    );

    console.log(
        "THE END"
    );

    console.log(
        "Ankur, Milan's Best Friend."
    );

    console.log(
        "================================"
    );

}


/* =====================================================
   PREVENT MANUAL SCROLL
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
   START AFTER PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    function() {

        /*
           Small cinematic opening delay.
        */

        setTimeout(() => {

            startMovie();

        }, 1000);

    }
);
