/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 25(e): A solid, brown hexagon
 * 01/29/13
 */
 
(function () {
    var canvas = document.getElementById('canvas');
        renderingContext = canvas.getContext("2d"),
        
        // Variables for defining polygon shape
        numberOfSides = 6,
        size = 100,
        Xcenter = 200, // JD: Variable names have lowercase preferred,
        Ycenter = 200; //     e.g., xCenter, yCenter
        
    // Iterative formula for polygon
    for (var i = 1; i <= numberOfSides; i++) {
        // JD: See comment in 27a.js
        renderingContext.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
        // JD: ^^^ This line is long enough that you can justify breaking
        //     it into multiple lines for better readability.
    }

    renderingContext.fillStyle = "#802A2A";
    renderingContext.fill();

}());