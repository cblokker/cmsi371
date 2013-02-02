/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 26(d):  A polka-dot pattern with pink dots on a brown background
 * 01/29/13
 *
 */
// JD: ...well, this didn't *quite* turn out to be the polka-dot pattern
//     that was specified, but it still turned out to be pretty nice to
//     look at.  Strictly speaking, you weren't following directions here,
//     but the other exercises do show that you can draw something to-spec
//     when needed.
(function () {
    var canvas = document.getElementById('canvas'),
        renderingContext = canvas.getContext("2d"),

        // Variables for the circular dot pattern
        numOfRings = 39,
        colorStop = [0, 25, 50, 75, 100, 125, 150, 175],
        colorName = ['red','orange','yellow','green','blue','indigo','violet'];

    // Background color
    renderingContext.fillStyle = 'brown';
    renderingContext.fillRect (0, 0, 512, 512);
    
    // Center the spiral
    renderingContext.translate(256,256);

    // Loop through rings
    for (var i = 0; i < numOfRings; i++) {
        // JD: Comments in 27a.js and 25e.js apply here.

        // slowly increase the size of the circular dots for every ring itteration
        renderingContext.scale(1.05,1.05);

        // Draw individual dots
        for (var j = 4; j < (i * 6); j++) {

            //create rainbow appearance for dots
            for (var k = 0; k <= colorName.length; k++) {
                if ((j > colorStop[k]) && (j <= colorStop[k + 1]) ) {
                    renderingContext.fillStyle = colorName[k];
                };
            };

            renderingContext.rotate(Math.PI * 2 / (i * 6));
            renderingContext.beginPath();
            renderingContext.arc(0, i, 0.5, 0, Math.PI * 2, true);
            renderingContext.fill();
        };
    };
}());