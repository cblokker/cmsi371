/*
 * Chase Blokker
 * CMSI 371
 * Assignment 0129
 * Problem 28(b): The sun setting into a dark blue “ocean” horizon and with a partial reflection 
 * showing on the ocean surface.
 * 01/29/13
 */


(function () {
    var canvas = document.getElementById('canvas'),
        renderingContext = canvas.getContext("2d"),

        // Sunset variables
        horizonPosition = 200,
        sunRadius = 50;

    // Define gradient variables
    linearSkyGradient = renderingContext.createLinearGradient(0, 0, 0, horizonPosition + 100);
    radialSkyGradient = renderingContext.createRadialGradient((canvas.width / 2), horizonPosition, 1,
                                                              (canvas.width / 2), 200, 200);
    linearOceanGradient = renderingContext.createLinearGradient(0, horizonPosition - 100, 0, horizonPosition + 150);     
    sunReflectionGradient = renderingContext.createLinearGradient((canvas.width / 2) - sunRadius - 2, 0,
                                                                  (canvas.width / 2) + sunRadius + 2, 0);

    // Colorstops for above gradients
    linearSkyGradient.addColorStop(0, '#000077');
    linearSkyGradient.addColorStop(1, "orange");

    radialSkyGradient.addColorStop(1, 'purple');
    radialSkyGradient.addColorStop(0, "orange");

    linearOceanGradient.addColorStop(0, "transparent");
    linearOceanGradient.addColorStop(1, "#000066");

    sunReflectionGradient.addColorStop(0, "transparent")
    sunReflectionGradient.addColorStop(0.15, "orange")
    sunReflectionGradient.addColorStop(0.85, "orange")
    sunReflectionGradient.addColorStop(1, "transparent")

    // The sky: a combination of both radial and linear gradient
    renderingContext.globalAlpha = 0.5;
    renderingContext.fillStyle = radialSkyGradient;
    renderingContext.fillRect (0, 0, canvas.width, canvas.height);
    renderingContext.fillStyle = linearSkyGradient;
    renderingContext.fillRect (0, 0, canvas.width, horizonPosition);

    // Adjust globalAlpha transparency to almost 1 so that the sun reflection still
    // shows up at the bottom of the canvas
    renderingContext.globalAlpha = 0.95;

    // The orange sun
    renderingContext.arc(canvas.width / 2, horizonPosition, sunRadius, 0, Math.PI, true);
    renderingContext.fillStyle = 'orange';
    renderingContext.fill();

    // The sun reflection
    renderingContext.fillStyle = sunReflectionGradient;
    renderingContext.fillRect (0, horizonPosition, canvas.width, canvas.height);
    
    // The Ocean
    renderingContext.fillStyle = linearOceanGradient;
    renderingContext.fillRect(0, horizonPosition, canvas.width, canvas.height - horizonPosition);
}());