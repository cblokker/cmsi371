/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient;

    // Adapted from original code by Tyler Nichols.
    gradient = renderingContext.createRadialGradient(120, 120, 15, 120, 120, 75);
    gradient.addColorStop(0, "rgb(255, 102, 102)");
    gradient.addColorStop(1, "red");

    // Draw the sphere with a radial gradient.
    renderingContext.beginPath();
    renderingContext.fillStyle = gradient;
    renderingContext.arc(150, 150, 75, 0, 2 * Math.PI, true);
    renderingContext.shadowColor = "gray";
    renderingContext.shadowBlur = 20;
    renderingContext.shadowOffsetX = 10;
    renderingContext.shadowOffsetY = 15;
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the top of the cube.
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(140, 140, 140)";
    renderingContext.moveTo(300, 300);
    renderingContext.lineTo(335, 265);
    renderingContext.lineTo(435, 265);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(300, 300);
    renderingContext.fill();
    renderingContext.closePath();

    // Draw the face of the cube.
    renderingContext.fillStyle = "rgb(110, 110, 110)";
    renderingContext.fillRect(300, 300, 100, 100);

    // Draw the right side of the cube.
    renderingContext.beginPath();
    renderingContext.fillStyle = "rgb(79, 79, 79)";
    renderingContext.moveTo(435, 265);
    renderingContext.lineTo(435, 355);
    renderingContext.lineTo(400, 400);
    renderingContext.lineTo(400, 300);
    renderingContext.lineTo(435, 265);
    renderingContext.fill();
    renderingContext.closePath();
    // (end of adapted code by Tyler Nichols)

    // Set a little event handler to apply the filter.
    $("#apply-filter-darken").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                // This is a basic "darkener."
                function (r, g, b, a) {
                    return [r / 2, g / 2, b / 2, a];
                }
            ),
            0, 0
        );
    });


    // JD: This is simple and sweet, the only caveat being that these filters
    //     were supposed to be added to the Nanoshop object to build a "library"
    //     of filters, similarly to how NanoshopNeighborhood is set up.
    $("#apply-filter-inverter").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                // This is a basic "inverter."
                function (r, g, b, a) {
                    return [255 - r, 255 - g, 255 - b, a];
                }
            ),
            0, 0
        );
    });




    $("#apply-filter-opacity").click(function () {
                // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                // This is a basic "lightener."
                function (r, g, b, a) {
                    var n = Math.random();
                    return [r, g, b, a / 2];
                }
            ),
            0, 0
        );
    });
}());