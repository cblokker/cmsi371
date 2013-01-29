/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 27(a): A “fake 3D” green wireframe cube at the bottom right of the canvas
 * 01/29/13
 *
 */

(function () {
    var canvas = document.getElementById('canvas');
        var renderingContext = canvas.getContext("2d");
    
    renderingContext.strokeStyle = "rgba(0, 200, 0, 0.99)";
    renderingContext.strokeRect (300, 250, 150, 150);
    renderingContext.strokeRect (350, 300, 150, 150);

    for (var i = 0; i <= 1; i++) {
        renderingContext.translate(150*i,0);
        renderingContext.beginPath();
        renderingContext.moveTo(300, 250);
        renderingContext.lineTo(350, 300);
        renderingContext.moveTo(350, 450);
        renderingContext.lineTo(300, 400);
        renderingContext.stroke();
    };

}());