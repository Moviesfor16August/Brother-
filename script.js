/* =====================================================
   MILAN BIRTHDAY CINEMATIC MOVIE
   FULL SCRIPT — PART 7
===================================================== */


/* =====================================================
   SCENES
===================================================== */

const scenes =
    document.querySelectorAll(".scene");

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
===================================================== */

const sceneDuration = [

    8000,       // 0 Opening
    12000,      // 1 Part 1
    10000,      // 2 Memory
    18000,      // 3 People Who Stay
    20000,      // 4 A Promise
    22000,      // 5 Birthday Reveal
    150000,     // 6 Letter
    14000       // 7 End Credits

];


let currentScene = 0;


/* =====================================================
   RESET AUDIO
===================================================== */

function resetAudio() {

    const audioList = [

        openingMusic,
        partOneMusic,
        partTwoMusic,
        voiceNote,
        partThreeMusic,
        birthdayMusic

    ];


    audioList.forEach(audio => {

        if (!audio) return;

        audio.volume = 0;

    });

}


resetAudio();


/* =====================================================
   FADE IN
===================================================== */

function fadeIn(
    audio,
    targetVolume,
    duration
) {

    if (!audio) return;

    audio.volume = 0;

    const steps = 40;

    const interval =
        duration / steps;

    const step =
        targetVolume / steps;

    let volume = 0;

    const fade =
        setInterval(() => {

            volume += step;

            if (volume >= targetVolume) {

                volume =
                    targetVolume;

                clearInterval(fade);

            }

            audio.volume =
                volume;

        }, interval);

}


/* =====================================================
   FADE OUT
===================================================== */

function fadeOut(
    audio,
    duration
) {

    if (!audio) return;

    if (audio.paused) return;

    const start =
        audio.volume;

    const steps = 40;

    const interval =
        duration / steps;

    const step =
        start / steps;

    let volume = start;

    const fade =
        setInterval(() => {

            volume -= step;

            if (volume <= 0) {

                volume = 0;

                clearInterval(fade);

                audio.pause();

                audio.currentTime = 0;

            }

            audio.volume =
                volume;

        }, interval);

}


/* =====================================================
   STOP ALL AUDIO
===================================================== */

function stopAllAudio() {

    const audioList = [

        openingMusic,
        partOneMusic,
        partTwoMusic,
        voiceNote,
        partThreeMusic,
        birthdayMusic

    ];


    audioList.forEach(audio => {

        if (!audio) return;

        audio.pause();

        audio.currentTime = 0;

        audio.volume = 0;

    });

}


/* =====================================================
   LETTER RESET
===================================================== */

function resetLetter() {

    const letter =
        document.querySelector(
            ".letter-text"
        );

    if (!letter) return;

    letter.style.transition =
        "none";

    letter.style.transform =
        "translateY(0)";

}


/* =====================================================
   LETTER AUTO SCROLL
===================================================== */

function startLetterAnimation() {

    const letter =
        document.querySelector(
            ".letter-text"
        );

    if (!letter) return;


    letter.style.transition =
        "none";

    letter.style.transform =
        "translateY(0)";


    setTimeout(() => {

        if (currentScene !== 6)
            return;


        letter.style.transition =
            "transform 140s linear";


        letter.style.transform =
            "translateY(-65%)";


    }, 8000);

}


/* =====================================================
   OPENING
===================================================== */

function playOpening() {

    stopAllAudio();

    if (!openingMusic) return;

    openingMusic.currentTime = 0;

    openingMusic.play()
        .then(() => {

            fadeIn(
                openingMusic,
                0.35,
                3000
            );

        })
        .catch(() => {

            console.log(
                "Opening music autoplay blocked."
            );

        });

}


/* =====================================================
   PART 1
===================================================== */

function playPartOne() {

    fadeOut(
        openingMusic,
        1800
    );


    setTimeout(() => {

        if (!partOneMusic)
            return;

        partOneMusic.currentTime = 0;

        partOneMusic.play()
            .then(() => {

                fadeIn(
                    partOneMusic,
                    0.45,
                    2500
                );

            })
            .catch(() => {

                console.log(
                    "Part 1 music autoplay blocked."
                );

            });

    }, 1200);

}


/* =====================================================
   PART 2
===================================================== */

function playPartTwo() {

    fadeOut(
        partOneMusic,
        1800
    );


    setTimeout(() => {

        if (!partTwoMusic)
            return;

        partTwoMusic.currentTime = 0;

        partTwoMusic.play()
            .then(() => {

                fadeIn(
                    partTwoMusic,
                    0.28,
                    2500
                );

            })
            .catch(() => {

                console.log(
                    "Part 2 music autoplay blocked."
                );

            });

    }, 1200);


    setTimeout(() => {

        if (!voiceNote)
            return;

        voiceNote.currentTime = 0;

        voiceNote.play()
            .then(() => {

                fadeIn(
                    voiceNote,
                    0.85,
                    1200
                );

            })
            .catch(() => {

                console.log(
                    "Voice note autoplay blocked."
                );

            });

    }, 3500);

}


/* =====================================================
   PART 3 — A PROMISE
===================================================== */

function playPartThree() {

    fadeOut(
        partTwoMusic,
        1800
    );


    fadeOut(
        voiceNote,
        1200
    );


    setTimeout(() => {

        if (!partThreeMusic)
            return;

        partThreeMusic.currentTime = 0;

        partThreeMusic.play()
            .then(() => {

                fadeIn(
                    partThreeMusic,
                    0.30,
                    2500
                );

            })
            .catch(() => {

                console.log(
                    "Part 3 music autoplay blocked."
                );

            });

    }, 1500);

}


/* =====================================================
   PART 4 — BIRTHDAY REVEAL
===================================================== */

function playBirthdayReveal() {

    fadeOut(
        partThreeMusic,
        2500
    );


    setTimeout(() => {

        if (!birthdayMusic)
            return;

        birthdayMusic.currentTime = 0;

        birthdayMusic.play()
            .then(() => {

                fadeIn(
                    birthdayMusic,
                    0.38,
                    3500
                );

            })
            .catch(() => {

                console.log(
                    "Birthday music autoplay blocked."
                );

            });

    }, 2200);

}


/* =====================================================
   PART 6 — LETTER
===================================================== */

function playLetter() {

    if (birthdayMusic) {

        birthdayMusic.volume =
            0.22;

    }


    startLetterAnimation();

}


/* =====================================================
   PART 7 — END CREDITS
===================================================== */

function playCredits() {

    /*
       Birthday music slowly fades.
    */

    fadeOut(
        birthdayMusic,
        4000
    );

}


/* =====================================================
   SHOW SCENE
===================================================== */

function showScene(index) {

    scenes.forEach(
        (scene, i) => {

            scene.classList.remove(
                "active"
            );


            if (i === index) {

                scene.classList.add(
                    "active"
                );

            }

        }
    );


    /*
       Progress dots
    */

    progressDots.forEach(
        (dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        }
    );


    currentScene = index;


    /*
       AUDIO
    */

    if (index === 0) {

        playOpening();

    }


    if (index === 1) {

        playPartOne();

    }


    if (index === 2) {

        if (partOneMusic) {

            partOneMusic.volume =
                0.32;

        }

    }


    if (index === 3) {

        playPartTwo();

    }


    if (index === 4) {

        playPartThree();

    }


    if (index === 5) {

        playBirthdayReveal();

    }


    if (index === 6) {

        playLetter();

    }


    if (index === 7) {

        playCredits();

    }

}


/* =====================================================
   START MOVIE
===================================================== */

function startMovie() {

    showScene(0);


    /*
       0 → 1
    */

    setTimeout(() => {

        showScene(1);

    }, sceneDuration[0]);


    /*
       1 → 2
    */

    setTimeout(() => {

        showScene(2);

    },
        sceneDuration[0]
        +
        sceneDuration[1]
    );


    /*
       2 → 3
    */

    setTimeout(() => {

        showScene(3);

    },
        sceneDuration[0]
        +
        sceneDuration[1]
        +
        sceneDuration[2]
    );


    /*
       3 → 4
    */

    setTimeout(() => {

        showScene(4);

    },
        sceneDuration[0]
        +
        sceneDuration[1]
        +
        sceneDuration[2]
        +
        sceneDuration[3]
    );


    /*
       4 → 5
    */

    setTimeout(() => {

        showScene(5);

    },
        sceneDuration[0]
        +
        sceneDuration[1]
        +
        sceneDuration[2]
        +
        sceneDuration[3]
        +
        sceneDuration[4]
    );


    /*
       5 → 6
    */

    setTimeout(() => {

        showScene(6);

    },
        sceneDuration[0]
        +
        sceneDuration[1]
        +
        sceneDuration[2]
        +
        sceneDuration[3]
        +
        sceneDuration[4]
        +
        sceneDuration[5]
    );


    /*
       6 → 7
    */

    setTimeout(() => {

        showScene(7);

    },
        sceneDuration[0]
        +
        sceneDuration[1]
        +
        sceneDuration[2]
        +
        sceneDuration[3]
        +
        sceneDuration[4]
        +
        sceneDuration[5]
        +
        sceneDuration[6]
    );


    /*
       Movie ends after credits.

       NO RESTART.
    */

}


/* =====================================================
   START WEBSITE
===================================================== */

window.addEventListener(
    "load",
    () => {

        setTimeout(() => {

            startMovie();

        }, 800);

    }
);


/* =====================================================
   PREVENT SCROLLING
===================================================== */

document.addEventListener(
    "wheel",
    event => {

        event.preventDefault();

    },
    {
        passive: false
    }
);


document.addEventListener(
    "touchmove",
    event => {

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
    event => {

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
