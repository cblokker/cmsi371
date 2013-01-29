/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 26(c): A honeycomb pattern at least three hexagons across and three hexagons down
 * 01/29/13
 */

(function () {
    var canvas = document.getElementById('canvas');
        renderingContext = canvas.getContext("2d");
 
        // Variables for defining polygon shape
        numberOfSides = 6,
        size = 100,
        Xcenter = 200,
        Ycenter = 200,
        Xdimention = 5,
        Ydimention = 4;
        
    //draw collumns
    for (var collumn = 0; collumn < Ydimention; collumn++) {

        //draw rows
        for (var row = 0; row < Xdimention; row++) {

            //Draws the individual polygon
            renderingContext.beginPath();

        	for (var i = 0; i <= numberOfSides; i++) {
                renderingContext.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides) + 150 * row,
                                         Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides) + 173 * collumn + 86 * row);
            }

            renderingContext.strokeStyle = "orange";
            renderingContext.lineWidth = 10;
            renderingContext.fillStyle = "yellow";
            renderingContext.fill();
            renderingContext.stroke();
        }
    }
}());