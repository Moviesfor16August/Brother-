/* =====================================================
   MILAN BIRTHDAY MOVIE
   FINAL SIMPLE MOVIE ENGINE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const scenes = document.querySelectorAll(".scene");
    const dots = document.querySelectorAll(".progress-dot");

    const openingMusic = document.getElementById("openingMusic");
    const partOneMusic = document.getElementById("partOneMusic");
    const partTwoMusic = document.getElementById("partTwoMusic");
    const partThreeMusic = document.getElementById("partThreeMusic");
    const birthdayMusic = document.getElementById("birthdayMusic");
    const voiceNote = document.getElementById("voiceNote");

    let currentScene = 0;
    let sceneTimer = null;
    let letterAnimation = null;


    /* =================================================
       SCENE TIME
    ================================================= */

    const sceneTime = [
        8000,    // 1 Opening
        12000,   // 2 More Than A Friend
        10000,   // 3 Memory
        12000,   // 4 People Who Stay
        12000,   // 5 Promise
        12000,   // 6 Birthday
        60000,   // 7 Letter
        15000    // 8 Credits
    ];


    /* =================================================
       ALL AUDIO
    ================================================= */

    const audios = [
        openingMusic,
        partOneMusic,
        partTwoMusic,
        partThreeMusic,
        birthdayMusic,
        voiceNote
    ];


    /* =================================================
       STOP AUDIO
    ================================================= */

    function stopAudio() {

        audios.forEach(audio => {

            if (!audio) return;

            audio.pause();
            audio.currentTime = 0;
            audio.volume = 0;

        });

    }


    /* =================================================
       PLAY AUDIO
    ================================================= */

    function playAudio(audio, volume) {

        if (!audio) return;

        audio.volume = volume;

        audio.play().catch(error => {

            console.log(
                "Audio blocked:",
                error
            );

        });

    }


    /* =================================================
       AUDIO FOR EACH SCENE
    ================================================= */

    function sceneAudio(sceneNumber) {

        stopAudio();


        /* Scene 1 */

        if (sceneNumber === 0) {

            playAudio(
                openingMusic,
                0.35
            );

        }


        /* Scene 2 */

        if (sceneNumber === 1) {

            playAudio(
                partOneMusic,
                0.40
            );

        }


        /* Scene 3 */

        if (sceneNumber === 2) {

            playAudio(
                partOneMusic,
                0.28
            );

        }


        /* Scene 4 */

        if (sceneNumber === 3) {

            playAudio(
                partTwoMusic,
                0.40
            );

        }


        /* Scene 5 */

        if (sceneNumber === 4) {

            playAudio(
                partThreeMusic,
                0.40
            );

        }


        /* Scene 6 */

        if (sceneNumber === 5) {

            playAudio(
                birthdayMusic,
                0.45
            );

        }


        /* Scene 7 — LETTER */

        if (sceneNumber === 6) {

            playAudio(
                birthdayMusic,
                0.18
            );


            /* Voice note starts after 2 seconds */

            setTimeout(() => {

                if (currentScene === 6) {

                    stopAudio();

                    playAudio(
                        voiceNote,
                        0.75
                    );

                }

            }, 2000);


            startLetterScroll();

        }


        /* Scene 8 — CREDITS */

        if (sceneNumber === 7) {

            playAudio(
                birthdayMusic,
                0.15
            );

        }

    }


    /* =================================================
       SHOW SCENE
    ================================================= */

    function showScene(number) {

        clearTimeout(sceneTimer);

        stopLetterScroll();


        if (number < 0) {
            number = 0;
        }

        if (number >= scenes.length) {
            number = scenes.length - 1;
        }


        scenes.forEach((scene, index) => {

            scene.classList.toggle(
                "active",
                index === number
            );

        });


        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === number
            );

        });


        currentScene = number;


        console.log(
            "Now playing Scene:",
            number + 1
        );


        sceneAudio(number);

        // Ensure the movie container is visible at top (helps when browser scrolled)
        // If the design uses fixed positioning, this is harmless.
        try {
            const movie = document.getElementById('movie');
            if (movie) movie.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (e) { /* ignore */ }


        /*
           Automatically move forward
        */

        sceneTimer = setTimeout(() => {

            if (currentScene < scenes.length - 1) {

                showScene(
                    currentScene + 1
                );

            } else {

                console.log(
                    "MOVIE FINISHED"
                );

            }

        }, sceneTime[number]);

    }


    /* =================================================
       LETTER AUTO SCROLL
    ================================================= */

    function startLetterScroll() {

        const letter =
            document.querySelector(
                ".letter-content"
            );


        if (!letter) {

            console.log(
                "Letter content not found"
            );

            return;

        }


        /* Start at top */

        letter.scrollTop = 0;


        /*
           Wait 2 seconds before
           starting the scroll.
        */

        setTimeout(() => {

            if (currentScene !== 6) {
                return;
            }


            const maximumScroll =
                letter.scrollHeight -
                letter.clientHeight;


            if (maximumScroll <= 0) {

                console.log(
                    "No letter scrolling required"
                );

                return;

            }


            /*
               52 seconds scrolling
            */

            const duration = 52000;

            const start =
                performance.now();


            function scroll(currentTime) {

                if (currentScene !== 6) {
                    return;
                }


                const elapsed =
                    currentTime - start;


                let progress =
                    elapsed / duration;


                if (progress > 1) {
                    progress = 1;
                }


                /*
                   Smooth cinematic movement
                */

                const smooth =
                    progress * progress *
                    (3 - 2 * progress);


                letter.scrollTop =
                    maximumScroll * smooth;


                if (progress < 1) {

                    letterAnimation =
                        requestAnimationFrame(
                            scroll
                        );

                } else {
                    // When letter finishes scrolling, move to next scene
                    letterAnimation = null;
                    console.log('Letter scroll complete — advancing to next scene');
                    if (currentScene === 6 && currentScene < scenes.length - 1) {
                        // small delay to allow voice note to finish UI
                        setTimeout(() => {
                            if (currentScene === 6) showScene(currentScene + 1);
                        }, 300);
                    }
                }

            }


            letterAnimation =
                requestAnimationFrame(
                    scroll
                );

        }, 2000);

    }


    /* =================================================
       STOP LETTER SCROLL
    ================================================= */

    function stopLetterScroll() {

        if (letterAnimation) {

            cancelAnimationFrame(
                letterAnimation
            );

            letterAnimation = null;

        }

    }


    /* =================================================
       AUDIO 'ENDED' HANDLERS
       - Advance the scene when the currently playing audio ends.
    ================================================= */

    audios.forEach((audio) => {
        if (!audio) return;
        audio.addEventListener('ended', () => {
            console.log('Audio ended event fired');
            // advance to next scene if movie is still running
            if (currentScene < scenes.length - 1) {
                // small timeout to avoid racing with other handlers
                setTimeout(() => {
                    if (currentScene < scenes.length - 1) showScene(currentScene + 1);
                }, 250);
            }
        });
    });


    /* =================================================
       BLOCK MANUAL PAGE SCROLL
    ================================================= */

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


    window.addEventListener(
        "keydown",
        event => {

            const keys = [
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


            if (keys.includes(event.key)) {

                event.preventDefault();

            }

        }
    );


    /* =================================================
       START MOVIE
    ================================================= */

    console.log(
        "Milan Birthday Movie Loaded"
    );


    console.log(
        "Total scenes:",
        scenes.length
    );


    /*
       Start immediately.
    */

    showScene(0);

});
