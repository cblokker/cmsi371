/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 28(e): A simple skyline scene, where black buildings with yellow-lit windows are set 
 * against a dark blue sky
 * 01/29/13
 */

// JD: Comments in 27a.js and 25e.js apply here.

(function () {
    var canvas = document.getElementById('canvas'),
        renderingContext = canvas.getContext("2d"),

        // Skyline variables
        windowWidth = 7,
        windowHeight = 10,
        buildingMinWidth = 50,
        buildingMaxWidth = 150,
        buildingMinHeight = 100,
        buildingMaxHeight = 400;
        
    // Define gradient variables
    linearSkyGradient = renderingContext.createLinearGradient(0, 0, 0, 200);

    // Colorstops for above gradient
    linearSkyGradient.addColorStop(0, '#000088');
    linearSkyGradient.addColorStop(1, '#000022');

    // The sky
    renderingContext.fillStyle = linearSkyGradient;
    renderingContext.fillRect (0, 0, canvas.width, canvas.height);
    
    // Render the buildings with random height and width
    for(var i = 0; i <= 9; i++) {
        buildingWidth = Math.floor(Math.random() * (buildingMaxWidth - buildingMinWidth + 1) + buildingMinWidth);
        buildingHeight = Math.floor(Math.random() * (buildingMaxHeight - buildingMinHeight + 1) + buildingMinHeight);
        renderingContext.fillStyle = 'black';
        renderingContext.strokeStyle = '#077';
        renderingContext.fillRect (50 * i, canvas.height - buildingHeight, buildingWidth, buildingHeight);
        renderingContext.strokeRect(50 * i, canvas.height - buildingHeight, buildingWidth, buildingHeight);

        // variables for windows which depend on random variables buildingWidth and buildingHeight
        numOfWindows = Math.floor(buildingWidth / (windowWidth + 5));
        windowSeperation = (buildingWidth - (numOfWindows * windowWidth)) / (numOfWindows + 1);

        // Add the lights
        for (var windowRow = 0; windowRow < numOfWindows; windowRow++) {
            for (var windowCollumn = 0; windowCollumn < (buildingHeight / 10); windowCollumn++) {
                windowOpacity = Math.random();
                
                renderingContext.fillStyle = 'rgba(200, 200, 75, ' + windowOpacity +')';
                renderingContext.fillRect (windowSeperation * (windowRow + 1) + windowWidth * windowRow + i * 50,
                                          (canvas.height - buildingHeight) + windowCollumn * 20 + windowHeight, windowWidth, windowHeight);
            };
        };
    };
}());