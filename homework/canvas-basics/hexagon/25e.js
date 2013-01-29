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
        Xcenter = 200,
        Ycenter = 200;
        
    // Itterative formula for polygon
    for (var i = 1; i <= numberOfSides; i++) {
        renderingContext.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
    }

    renderingContext.fillStyle = "#802A2A";
    renderingContext.fill();

}());