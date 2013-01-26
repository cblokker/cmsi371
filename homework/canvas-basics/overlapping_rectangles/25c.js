/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 25(c): A 50% translucent red rectangle overlapping a 50% translucent green rectangle
 * 01/29/13
 */

(function () {
    var canvas = document.getElementById('canvas');
        var renderingContext = canvas.getContext("2d");
 
        renderingContext.fillStyle = "rgba(200,0,0,0.5)";
        renderingContext.fillRect (10, 10, 150, 150);
 
        renderingContext.fillStyle = "rgba(0, 200, 0,0.5)";
        renderingContext.fillRect (50, 50, 150, 150);
}());