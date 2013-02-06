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
        // JD: When do you use ' vs. "?  ^^^^^^^^ (no right/wrong answer,
        //     but ideally whatever you choose, it is consistent)
        renderingContext = canvas.getContext("2d"),

        // Cube variables
        topLeftBackCoordinate = [300, 250],
        topLeftFrontCoordinate = [350, 300],
        cubeLength = 150;
    
    // Do the front and back of the cube (two overlapping sqaures)
    renderingContext.strokeStyle = 'green';
    renderingContext.strokeRect (topLeftBackCoordinate[0], topLeftBackCoordinate[1], cubeLength, cubeLength);
    renderingContext.strokeRect (topLeftFrontCoordinate[0], topLeftFrontCoordinate[1], cubeLength, cubeLength);

    // Connect the corners of the two squares to form a wireframe cube
    for (var i = 0; i <= 1; i++) {
        // JD: Strictly speaking, even the "i" should be declared up top.
        //     Also, i += 1 is preferred in JavaScript over i++.
        renderingContext.translate(cubeLength * i, 0);
        renderingContext.beginPath();
        renderingContext.moveTo(topLeftBackCoordinate[0], topLeftBackCoordinate[1]);
        renderingContext.lineTo(topLeftFrontCoordinate[0], topLeftFrontCoordinate[1]);
        renderingContext.moveTo(topLeftFrontCoordinate[0], topLeftFrontCoordinate[1] + cubeLength);
        renderingContext.lineTo(topLeftBackCoordinate[0], topLeftBackCoordinate[1] + cubeLength);
        renderingContext.stroke();
    };
}());