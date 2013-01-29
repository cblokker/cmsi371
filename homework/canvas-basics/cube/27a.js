/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 27(a): A “fake 3D” green wireframe cube at the bottom right of the canvas
 * 01/29/13
 *
 */

(function () {
    var canvas = document.getElementById('canvas'),
        renderingContext = canvas.getContext("2d"),
        topLeftBackCoordinate = [300, 250],
        topLeftFrontCoordinate = [350, 300],
        cubeLength = 150;
    
    renderingContext.strokeStyle = 'green';
    renderingContext.strokeRect (topLeftBackCoordinate[0], topLeftBackCoordinate[1], cubeLength, cubeLength);
    renderingContext.strokeRect (topLeftFrontCoordinate[0], topLeftFrontCoordinate[1], cubeLength, cubeLength);

    for (var i = 0; i <= 1; i++) {
        renderingContext.translate(cubeLength * i, 0);
        renderingContext.beginPath();
        renderingContext.moveTo(topLeftBackCoordinate[0], topLeftBackCoordinate[1]);
        renderingContext.lineTo(topLeftFrontCoordinate[0], topLeftFrontCoordinate[1]);
        renderingContext.moveTo(topLeftFrontCoordinate[0], topLeftFrontCoordinate[1] + cubeLength);
        renderingContext.lineTo(topLeftBackCoordinate[0], topLeftBackCoordinate[1] + cubeLength);
        renderingContext.stroke();
    };
}());