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
            
            // Center the spiral
            renderingContext.translate(256,256);

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

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.

        sprites = [

            {
                draw: cube,
                keyframes: [
                    {
                        frame: 0,
                        tx: 100,
                        ty: 100,
                        sy: 0.25,
                        sx: 0.25,
                        ease: KeyframeTweener.quadEaseIn
                    },

                    {
                        frame: 50,
                        tx: 500,
                        ty: 250,
                        sy: 1,
                        sx: 1,
                        rotate: 90,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 1000,
                        ty: 100,
                        sy: 0.25,
                        sx: 0.25,
                        rotate: 180,
                    },
                ]
            },

            {
                draw: spiral,
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 300,
                        opacity: 0.2,
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 300,
                        rotate: 180,
                        opacity: 1,
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 300,
                        rotate: 360,
                        opacity: 0.2,
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