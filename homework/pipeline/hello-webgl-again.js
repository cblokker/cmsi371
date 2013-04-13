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

        passVertices,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        rotationMatrix,
        instanceMatrix,
        orthoMatrix,
        frustumMatrix,
        vertexPosition,
        vertexColor,

        savedContext = instanceMatrix,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // A boolean array for shape toggling
        isShapeVisible = [];

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
            // colors: Shapes.parametricGenerator(Shapes.mobiusEquation).colors,
            colors: Shapes.toRawTriangleArray(Shapes.parametricGenerator(Shapes.mobiusEquation)).colors,
            vertices: Shapes.toRawTriangleArray(Shapes.parametricGenerator(Shapes.mobiusEquation)).vertices,
            mode: gl.TRIANGLES,
            transform: {
                tx: 0.0,
                ty: 0.0,
                tz: 0.0,
                angle: 0,
                rx: 1,
                ry: 0,
                rz: 0
            }

            // children: [
            //     {
            //         color: {r: 0.5, g: 0.0, b: 0.5},
            //         vertices: Shapes.toRawTriangleArray(Shapes.parametricGenerator(Shapes.kleinEquation)),
            //         mode: gl.TRIANGLES,
            //         transform: {
            //             tx: -0.7,
            //             ty: 0.0,
            //             tz: 0.0,
            //             angle: 0,
            //             rx: 1,
            //             ry: 10,
            //             rz: 1
            //         }
            //     },

            //     {
            //         color: {r: 1.0, g: 0.0, b: 1.0},
            //         vertices: Shapes.toRawTriangleArray(Shapes.parametricGenerator(Shapes.kleinEquation)),
            //         mode: gl.TRIANGLES,
            //         transform: {
            //             tx: 0.9,
            //             ty: 0.0,
            //             tz: 0.0
            //         }
            //     }
            // ]
        }

        // {
        //     color: {r: 0.0, g: 0.5, b: 0.5},
        //     vertices: Shapes.toRawTriangleArray(Shapes.sphere()),
        //     mode: gl.TRIANGLES,
        //     transform: {
        //         tx: 0.0,
        //         ty: 0.0,
        //         tz: 0.0,
        //         angle: 180,
        //         rx: 1,
        //         ry: 0,
        //         rz: 0
        //     }
        // },

        // {
        //     colors: Shapes.polygon().colors,
        //     vertices: Shapes.polygon(RADIUS[0], WIDTH, HEIGHT, 3).vertices,
        //     mode: gl.TRIANGLE_STRIP,
        //     transform: {
        //         tx: 0.0,
        //         ty: 0.0,
        //         tz: 0.0
        //     },

        //     children: [
        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[1], WIDTH, HEIGHT, 4).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[2], WIDTH, HEIGHT, 5).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[3], WIDTH, HEIGHT, 6).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[4], WIDTH, HEIGHT, 7).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[5], WIDTH, HEIGHT, 8).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[6], WIDTH, HEIGHT, 9).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[7], WIDTH, HEIGHT, 10).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0
        //             }
        //         },
                
        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[8], WIDTH, HEIGHT, 11).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //                 transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 0
        //             }
        //         },
                
        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[9], WIDTH, HEIGHT, 12).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //                 transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 0
        //             }
        //         }
        //     ]
        // },
    ];

    save = function () {
        savedContext = defaultTransform;
    };

    restore = function () {
        gl.uniformMatrix4fv(instanceMatrix, gl.FALSE, new Float32Array(
            savedContext
        ));

        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
            new Matrix4x4().elements
        ));
    };
        

    /* 
     * Pass the vertices to WebGL.
     */
    passVertices = function (shape) {
        var i,
            maxi,
            j,
            maxj;

        for (i = 0, maxi =  shape.length; i < maxi; i += 1) {
            shape[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                     shape[i].vertices);

            // if (!shape[i].colors) {
            //     console.log("hi");
            //     // If we have a single color, we expand that into an array
            //     // of the same color over and over.
            //     shape[i].colors = [];
            //     for (j = 0, maxj = shape[i].vertices.length / 3;
            //             j < maxj; j += 1) {
            //         shape[i].colors = shape[i].colors.concat(
            //             shape[i].color.r,
            //             shape[i].color.g,
            //             shape[i].color.b
            //         );
            //     }
            // }

            shape[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    shape[i].colors);

            if (shape[i].children && shape[i].children.length !== 0) {
                passVertices(shape[i].children);
            }
        }
    };

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
    instanceMatrix = gl.getUniformLocation(shaderProgram, "instanceMatrix");

    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        var i;

        if (object.transform) {
            gl.uniformMatrix4fv(instanceMatrix, gl.FALSE, new Float32Array(
                Matrix4x4.instanceTransform(object.transform).toWebGLMatrix().elements
            ));
        }

        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);
        
        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);

        if (object.children) {
            for (i = 0; i < object.children.length; i += 1) {
                drawObject(object.children[i]);
            }
        }
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        var i,
            maxi;

        defaultTransform = Matrix4x4.instanceTransform({
            tx:0,
            ty:0,
            tz:0,
            sx:1,
            sy:1,
            sz:1,
            angle:0,
            rx:0,
            ry:0,
            rz:1
        }).toWebGLMatrix().elements;

        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(Matrix4x4.rotate(currentRotation, 10, 0, 0).toWebGLMatrix().elements));

        for(i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            save();
            drawObject(objectsToDraw[i]);
            restore();
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
    passVertices(objectsToDraw);
    drawScene();

    var isMoving = false;

    $(canvas).mousedown(function () {
        console.log("mousedown");
        isMoving = false;
    });

    $(canvas).mousemove(function () {
        console.log("mousemove");
        isMoving = true;
    });

    $(canvas).mouseup(function () {
        console.log("mouseup");
    });


    // Set a little event handler toggling to display shapes
    // $("#telescope").click(function () {
    //     isShapeVisible[0] = !isShapeVisible[0];
    //     drawScene();
    // });

    // $("#mobius").click(function () {
    //     isShapeVisible[1] = !isShapeVisible[1];
    //     drawScene();
    // });

    // $("#sphere").click(function () {
    //     isShapeVisible[2] = !isShapeVisible[2];
    //     drawScene();
    // });

    // $("#klein").click(function () {
    //     isShapeVisible[3] = !isShapeVisible[3];
    //     drawScene();
    // });

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
            drawScene();
        } else {
            currentInterval = setInterval(function () {
                var updateRotation = function (objects) {
                    for (var i = 0; i < objects.length; i += 1) {
                        if (objects[i].transform) {
                            objects[i].transform.angle += 1.0;
                            if (objects[i].transform.angle >= 360.0) {
                                currentRotation -= 360.0;
                            }
                        }
                        if (objects[i].children) {
                            updateRotation(objects[i].children);
                        }
                    }
                };
                updateRotation(objectsToDraw);
                drawScene();
            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));