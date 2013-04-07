/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        rotationMatrix,
        vertexPosition,
        vertexColor,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        maxi,
        j,
        maxj,
        k,
        maxk;

        boolSHAPE = [];

    rotate = function (angle, x, y, z) {
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
            s = Math.sin(angle * Math.PI / 180.0),
            c = Math.cos(angle * Math.PI / 180.0),
            oneMinusC = 1.0 - c,

            // We can't calculate this until we have normalized
            // the axis vector of rotation.
            x2, // "2" for "squared."
            y2,
            z2,
            xy,
            yz,
            xz,
            xs,
            ys,
            zs;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // *Now* we can calculate the other terms.
        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        return new Matrix4x4(
             (x2 * oneMinusC) + c, (xy * oneMinusC) - zs, (xz * oneMinusC) + ys, 0.0,
            (xy * oneMinusC) + zs,  (y2 * oneMinusC) + c, (yz * oneMinusC) - xs, 0.0,
            (xz * oneMinusC) - ys, (yz * oneMinusC) + xs,  (z2 * oneMinusC) + c, 0.0,
                              0.0,                   0.0,                   0.0, 1.0    
        );
    };


    // Grab the WebGL rendepolygon context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // telescope contants
    var RADIUS = [],
        WIDTH = 0.05,
        HEIGHT = 0.2;

    for (i = 0.1; i < 10; i += 0.1) {
        RADIUS.push(i);
    }


        
    // Build the objects to display.
    objectsToDraw = [
        
        {
            shapes: [

                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[0], WIDTH, HEIGHT, 3, 0.9).vertices,
                    mode: gl.TRIANGLE_STRIP
                },

                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[1], WIDTH, HEIGHT, 4, 0.8).vertices,
                    mode: gl.TRIANGLE_STRIP
                },

                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[2], WIDTH, HEIGHT, 5, 0.7).vertices,
                    mode: gl.TRIANGLE_STRIP
                },

                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[3], WIDTH, HEIGHT, 6, 0.6).vertices,
                    mode: gl.TRIANGLE_STRIP
                },

                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[4], WIDTH, HEIGHT, 7, 0.5).vertices,
                    mode: gl.TRIANGLE_STRIP
                },

                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[5], WIDTH, HEIGHT, 8, 0.4).vertices,
                    mode: gl.TRIANGLE_STRIP
                },

                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[6], WIDTH, HEIGHT, 9, 0.3).vertices,
                    mode: gl.TRIANGLE_STRIP
                },

                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[7], WIDTH, HEIGHT, 10, 0.2).vertices,
                    mode: gl.TRIANGLE_STRIP
                },
                
                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[8], WIDTH, HEIGHT, 11, 0.1).vertices,
                    mode: gl.TRIANGLE_STRIP
                },
                
                {
                    colors: Shapes.polygon().colors,
                    vertices: Shapes.polygon(RADIUS[9], WIDTH, HEIGHT, 12, 0.0).vertices,
                    mode: gl.TRIANGLE_STRIP
                }
    
            ]
        },

        {
            shapes: [
                {
                    colors: Shapes.mobius().colors,
                    vertices: Shapes.mobius(0.0, 0.3, 0.5, 0.4).vertices,
                    mode: gl.TRIANGLE_STRIP
                }
            ]
        },

        {
            shapes: [
                {
                    colors: Shapes.sphere().colors,
                    vertices: Shapes.sphere().vertices,
                    mode: gl.TRIANGLE_STRIP
                }
            ]
        },

        {
            shapes: [
                {
                    colors: Shapes.klein().colors,
                    vertices: Shapes.klein().vertices,
                    mode: gl.TRIANGLE_STRIP
                }
            ]
        },
    ];

    // Pass the vertices to WebGL.
    for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
        for(k = 0, maxk = objectsToDraw[i].shapes.length; k < maxk; k += 1) {
            subShape = objectsToDraw[i].shapes[k];
            subShape.buffer = GLSLUtilities.initVertexBuffer(gl,
                    subShape.vertices);

            if (!subShape.colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                subShape.colors = [];
                for (j = 0, maxj = objectsToDraw[i][j].vertices.length / 3;
                        j < maxj; j += 1) {
                    subShape.colors = subShape.colors.concat(
                        subShape.color.r,
                        subShape.color.g,
                        subShape.color.b
                    );
                }
            }
            subShape.colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    subShape.colors);
        }
    }

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    frustumMatrix = gl.getUniformLocation(shaderProgram, "frustumMatrix");
    orthoMatrix = gl.getUniformLocation(shaderProgram, "orthoMatrix");

    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);
        
        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(Matrix4x4.rotate(currentRotation, 10, 0, 0).toWebGLMatrix().elements));

        for (i = 0; i < objectsToDraw.length; i += 1) {
            if (boolSHAPE[i]) {
                for(j = 0, maxj = objectsToDraw[i].shapes.length; j < maxj; j += 1) {
                    drawObject(objectsToDraw[i].shapes[j]);
                }
            }
        }

        // All done.
        gl.flush();
    };

    gl.uniformMatrix4fv(orthoMatrix, gl.FALSE, new Float32Array(
        Matrix4x4.ortho(-3, 3, -3, 3, -6, 12).toWebGLMatrix().elements)
    );

    gl.uniformMatrix4fv(frustumMatrix, gl.FALSE, new Float32Array(
        Matrix4x4.frustum(-0.5, 0.5, -0.5, 0.5, 0.2, 100).toWebGLMatrix().elements)
    );

    // Draw the initial scene.
    drawScene();

    // Set a little event handler toggling to display shapes
    // JD: The boolSHAPE array is a nice idea; it can get a better name
    //     though, like isShapeVisible or something that explicitly states
    //     what the boolean means.
    //
    //     Further, it appears that you did not get to the composite object
    //     functionality.  You'll definitely want this; now that you have a
    //     matrix library, this may be more motivational.
    $("#telescope").click(function () {
        boolSHAPE[0] = !boolSHAPE[0];
        drawScene();
    });

    $("#mobius").click(function () {
        boolSHAPE[1] = !boolSHAPE[1];
        drawScene();
    });

    $("#sphere").click(function () {
        boolSHAPE[2] = !boolSHAPE[2];
        drawScene();
    });

    $("#klein").click(function () {
        boolSHAPE[3] = !boolSHAPE[3];
        drawScene();
    });

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
            drawScene();
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));