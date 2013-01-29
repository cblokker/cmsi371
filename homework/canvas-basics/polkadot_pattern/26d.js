/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 26(d):  A polka-dot pattern with pink dots on a brown background
 * 01/29/13
 *
 */

(function () {
    var canvas = document.getElementById('canvas');
        var renderingContext = canvas.getContext("2d");

        // Background color
        renderingContext.fillStyle = 'brown';
        renderingContext.fillRect (0, 0, 512, 512);

        renderingContext.translate(256,256);

        // Loop through rings
        for (var i = 1; i < 39; i++) {

            // slowly increase the size of the circular dots for every ring itteration
            renderingContext.scale(1.05,1.05);

            // Draw individual dots
            for (var j = 4; j < (i * 6); j++) {

                // create rainbow appearance for dots
                if (j <= 16) {
                    renderingContext.fillStyle = 'red';
                } else if ((j > 14) && (j <= 34)) {
                    renderingContext.fillStyle = 'orange';
                } else if ((j > 34) && (j <= 54)) {
                    renderingContext.fillStyle = 'yellow';
                } else if ((j > 54) && (j <= 74)) {
                    renderingContext.fillStyle = 'green';
                } else if ((j > 74) && (j <= 94)) {
                    renderingContext.fillStyle = 'blue';
                } else if ((j > 94) && (j <= 114)) {
                    renderingContext.fillStyle = 'indigo';
                } else if ((j > 114) && (j <= 150)) {
                    renderingContext.fillStyle = 'violet';
                } else {
                    renderingContext.fillStyle = 'pink';
                };

                renderingContext.rotate(Math.PI * 2 / (i * 6));
                renderingContext.beginPath();
                renderingContext.arc(0, i, 0.5, 0, Math.PI * 2, true);
                renderingContext.fill();
                
            }
        }
}());