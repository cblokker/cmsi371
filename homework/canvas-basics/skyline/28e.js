/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 28(e): A simple skyline scene, where black buildings with yellow-lit windows are set 
 * against a dark blue sky
 * 01/29/13
 */


(function () {
    var canvas = document.getElementById('canvas');

    var renderingContext = canvas.getContext("2d");
        yBottom = 400;
        xRight = 630;
        
    // Define gradient variables
    linearSkyGradient = renderingContext.createLinearGradient(0, 0, 0, 200);

    // Colorstops for above gradients
    linearSkyGradient.addColorStop(0, '#000088');
    linearSkyGradient.addColorStop(1, '#000022');

    // The sky
    renderingContext.fillStyle = linearSkyGradient;
    renderingContext.fillRect (0, 0, xRight, yBottom);
    
    // Render the buildings
    for(var i = 0; i <= 9; i++) {
        buildingWidth = Math.floor((Math.random() * 100) + 50);
        buildingHeight = Math.floor((Math.random() * 200) + 100);
        renderingContext.fillStyle = 'black';
        renderingContext.strokeStyle = "green";
        renderingContext.fillRect (50 * i + 10, yBottom - buildingHeight, buildingWidth, buildingHeight);
        renderingContext.strokeRect(50 * i + 10, yBottom - buildingHeight, buildingWidth, buildingHeight);

        // Add the lights
        for (var j = 1; j <= buildingWidth / 10; j++) {
            for (var k = 0; k <= buildingHeight / 25; k++) {
                renderingContext.fillStyle = 'yellow';
                renderingContext.fillRect (6 + (50 * i) + (10 * j), 6 + (yBottom - buildingHeight) + k*20, 4, 10)
            }
        }
    }
}());