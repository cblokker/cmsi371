/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        square = function (renderingContext) {
            renderingContext.fillStyle = "blue";
            renderingContext.fillRect(-20, -20, 40, 40);
        },

        circle = function (renderingContext) {
            renderingContext.filleStyle = "blue";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.fill();
        },

        cube = function (renderingContext) {

        var topLeftBackCoordinate = [50, 0],
            topLeftFrontCoordinate = [100, 50],
            cubeLength = 150;

            renderingContext.strokeStyle = 'green';
            renderingContext.strokeRect (topLeftBackCoordinate[0], topLeftBackCoordinate[1], cubeLength, cubeLength);
            renderingContext.strokeRect (topLeftFrontCoordinate[0], topLeftFrontCoordinate[1], cubeLength, cubeLength);

            // Connect the corners of the two squares to form a wireframe cube
            for (var i = 0; i <= 1; i++) {
                renderingContext.translate(cubeLength * i, 0);
                renderingContext.beginPath();
                renderingContext.moveTo(topLeftBackCoordinate[0], topLeftBackCoordinate[1]);
                renderingContext.lineTo(topLeftFrontCoordinate[0], topLeftFrontCoordinate[1]);
                renderingContext.moveTo(topLeftFrontCoordinate[0], topLeftFrontCoordinate[1] + cubeLength);
                renderingContext.lineTo(topLeftBackCoordinate[0], topLeftBackCoordinate[1] + cubeLength);
                renderingContext.stroke();
            }
        },

        spiral = function (renderingContext) {

            var numOfRings = 55,
                colorStop = [0, 25, 50, 75, 100, 125, 150, 175],
                colorName = ['red','orange','yellow','green','blue','indigo','violet'];

            // Background color
            renderingContext.fillStyle = 'transparent';
            renderingContext.fillRect (0, 0, 512, 512);

            // Loop through rings
            for (var i = 0; i < numOfRings; i++) {

                // slowly increase the size of the circular dots for every ring itteration
                renderingContext.scale(1.05,1.05);

                // Draw individual dots
                for (var j = 4; j < (i * 6); j++) {

                    //create rainbow appearance for dots
                    for (var k = 0; k <= colorName.length; k++) {
                        if ((j > colorStop[k]) && (j <= colorStop[k + 1])) {
                            renderingContext.fillStyle = colorName[k];
                        }
                    }

                    renderingContext.rotate(Math.PI * 2 / (i * 6));
                    renderingContext.beginPath();
                    renderingContext.arc(0, i, 0.5, 0, Math.PI * 2, true);
                    renderingContext.fill();
                }
            }
        }

        kanjiLove = function (renderingContext) {
            var kanjiLove = new Image();
            kanjiLove.src = 'kanji_love.png';
            renderingContext.drawImage(kanjiLove, 0, 0);
        },

        kilt1 = function (renderingContext) {
            var kilt1 = new Image();
            kilt1.src = 'kilt1.png';
            renderingContext.drawImage(kilt1, 0, 0);
        },

        kilt2 = function (renderingContext) {
            var kilt2 = new Image();
            kilt2.src = 'kilt2.png';
            renderingContext.drawImage(kilt2, 0, 0);
        },

        kilt3 = function (renderingContext) {
            var kilt3 = new Image();
            kilt3.src = 'kilt3.png';
            renderingContext.drawImage(kilt3, 0, 0);
        },

        kilt4 = function (renderingContext) {
            var kilt4 = new Image();
            kilt4.src = 'kilt4.png';
            renderingContext.drawImage(kilt4, 0, 0);
        },

        fireball = function (renderingContext) {

            radialGradient = renderingContext.createRadialGradient(0, 0, 1, 0, 0, 10);
            radialGradient.addColorStop(0, "red");
            radialGradient.addColorStop(1, "yellow");
            
            renderingContext.fillStyle = radialGradient;
            renderingContext.beginPath();
            renderingContext.scale(2, 1);
            renderingContext.arc(0, 0,  10, 0, Math.PI * 2);
            renderingContext.fill();
        },

        kiltwalk1 = function (renderingContext) {
            var kiltwalk1 = new Image();
            kiltwalk1.src = 'kiltwalk1.png';
            renderingContext.drawImage(kiltwalk1, 0, 0);
        },

        kiltwalk2 = function (renderingContext) {
            var kiltwalk2 = new Image();
            kiltwalk2.src = 'kiltwalk2.png';
            renderingContext.drawImage(kiltwalk2, 0, 0);
        },

        kiltwalk3 = function (renderingContext) {
            var kiltwalk3 = new Image();
            kiltwalk3.src = 'kiltwalk3.png';
            renderingContext.drawImage(kiltwalk3, 0, 0);
        },

        kiltwalk4 = function (renderingContext) {
            var kiltwalk4 = new Image();
            kiltwalk4.src = 'kiltwalk4.png';
            renderingContext.drawImage(kiltwalk4, 0, 0);
        },

        kiltLift = function () {
            draw = [kilt1, kilt2, kilt3, kilt4, kilt3, kilt2, kilt1];
        },

        kiltWalk = function () {
            draw = [kiltWalk1, kiltWalk2, kiltWialt3, kiltWalk4];
        },

        // kiltDisplay = function (renderingContext) {
        //     var kiltz = new Image();
        //     kiltz.src = 'spritesheet.png';
        //     renderingContext.drawImage(kiltz, 0, 0);
        // },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.

        sprites = [

            {
                draw: fireball,
                keyframes: [
                    {
                        frame: 15,
                        tx: 150,
                        ty: 450,
                    },

                    {
                        frame: 30,
                        tx: 300,
                        ty: 450,
                    },

                    {
                        frame: 35,
                        tx: 320,
                        ty: 450,
                        sx: 0.1,
                        sy: 3
                    },
                ]
            },

            {
                draw: kilt1,
                keyframes: [
                    {
                        frame: 0,
                        tx: 110,
                        ty: 380,
                    },

                    {
                        frame: 3,
                        tx: 110,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kilt2,
                keyframes: [
                    {
                        frame: 3,
                        tx: 110,
                        ty: 380,
                    },

                    {
                        frame: 6,
                        tx: 110,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kilt3,
                keyframes: [
                    {
                        frame: 6,
                        tx: 110,
                        ty: 380,
                    },

                    {
                        frame: 10,
                        tx: 110,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kilt4,
                keyframes: [
                    {
                        frame: 10,
                        tx: 110,
                        ty: 380,
                    },

                    {
                        frame: 50,
                        tx: 110,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kilt3,
                keyframes: [
                    {
                        frame: 50,
                        tx: 110,
                        ty: 380,
                    },

                    {
                        frame: 55,
                        tx: 110,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kilt2,
                keyframes: [
                    {
                        frame: 55,
                        tx: 110,
                        ty: 380,
                    },

                    {
                        frame: 60,
                        tx: 110,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kilt1,
                keyframes: [
                    {
                        frame: 60,
                        tx: 110,
                        ty: 380,
                    },

                    {
                        frame: 65,
                        tx: 110,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kiltwalk1,
                keyframes: [
                    {
                        frame: 65,
                        tx: 110,
                        ty: 380,
                    },

                    {
                        frame: 70,
                        tx: 120,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kiltwalk2,
                keyframes: [
                    {
                        frame: 70,
                        tx: 120,
                        ty: 380,
                    },

                    {
                        frame: 76,
                        tx: 140,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kiltwalk3,
                keyframes: [
                    {
                        frame: 76,
                        tx: 140,
                        ty: 380,
                    },

                    {
                        frame: 81,
                        tx: 160,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kiltwalk4,
                keyframes: [
                    {
                        frame: 81,
                        tx: 160,
                        ty: 380,
                    },

                    {
                        frame: 87,
                        tx: 180,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kiltwalk1,
                keyframes: [
                    {
                        frame: 87,
                        tx: 180,
                        ty: 380,
                    },

                    {
                        frame: 90,
                        tx: 200,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kiltwalk2,
                keyframes: [
                    {
                        frame: 90,
                        tx: 200,
                        ty: 380,
                    },

                    {
                        frame: 94,
                        tx: 220,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kiltwalk3,
                keyframes: [
                    {
                        frame: 94,
                        tx: 220,
                        ty: 380,
                    },

                    {
                        frame: 98,
                        tx: 240,
                        ty: 380,
                    },
                ]
            },

            {
                draw: kiltwalk4,
                keyframes: [
                    {
                        frame: 98,
                        tx: 240,
                        ty: 380,
                    },

                    {
                        frame: 103,
                        tx: 260,
                        ty: 380,
                    },
                ]
            },

            {
                draw: spiral,
                keyframes: [
                    {
                        frame: 75,
                        tx: 512,
                        ty: 512,
                        sx: 0.01,
                        sy: 0.01,
                        opacity: 0.01,
                        ease: KeyframeTweener.quadEaseIn
                    },

                    {
                        frame: 100,
                        tx: 512,
                        ty: 512,
                        sx: 1,
                        sy: 1,
                        rotate: 360 * 2,
                        opacity: 1,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 125,
                        tx: 512,
                        ty: 512,
                        sx: 0.01,
                        sy: 0.01,
                        rotate: 360 * 2 + 360 * 2,
                        opacity: 0.01,
                    },
                ]
            },

            {
                draw: kanjiLove,
                keyframes: [
                    {
                        frame: 75,
                        tx: 512,
                        ty: 512,
                        sx: 0.8,
                        sy: 0.8,
                        opacity: 0.01,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 125,
                        tx: 512,
                        ty: 512,
                        sx: 0.8,
                        sy: 0.8,
                        rotate: 360 * 3,
                    },

                    {
                        frame: 150,
                        tx: 512,
                        ty: 512,
                        sx: 0.8,
                        sy: 0.8,
                        rotate: 360 * 3,
                        opacity: 0.01,
                    },
                ]
            },
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());