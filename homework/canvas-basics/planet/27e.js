/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 27(e): A ringed planet, painted with gradients for a 3D effect
 * 01/29/13
 *
 */


(function () {
    var canvas = document.getElementById("canvas"),
        // JD: See, now you are using double-quotes above.
        renderingContext = canvas.getContext("2d"),

        // Gradient variables
        radialGradient = renderingContext.createRadialGradient(160, 160, 1, 180, 180, 320);

    // gradient colorstops
    radialGradient.addColorStop(0, "white");
    radialGradient.addColorStop(1, "brown");

    // The planet with a gradient for a 3D effect
    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.arc(256, 256, 200, 0, Math.PI * 2, true);
    renderingContext.fill();

    // Create an oval shape ring around the planet (to be called by the arc function).
    renderingContext.save();
    renderingContext.rotate( - Math.PI / 5);
    renderingContext.scale(1, 0.4);
    
    // The loop to create multiple rings around the planet.
    for (var i = 0; i < 12; i++) {
        // JD: Comments in 27a.js and 25e.js apply here.
        renderingContext.beginPath();
        renderingContext.translate(0,20);
        renderingContext.scale(0.97, 0.97);
        renderingContext.arc(80, 900, 350, 0, Math.PI * 2, true);
        renderingContext.stroke();
    }

    renderingContext.restore();
    
    // To cover up where the rings go behind the planet
    renderingContext.fillStyle = radialGradient;
    renderingContext.beginPath();
    renderingContext.arc(256, 256, 200, -(Math.PI / 4), Math.PI * (3 / 4), true);
    renderingContext.fill();
}());