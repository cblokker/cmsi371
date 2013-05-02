/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */

 // To do List:
 // * Create relative positioning for children
 // * Add camera movement
 // * Add keyframes/tweening functions to the shapes object
 // * Add JavaScript event handlers for user interaction
 // * Add physics
 // * Think of the entire scene, something like this - http://wxs.ca/iso/

/*
 * JD: The to-do list is a good move and appreciated.  Note that you can also
 *     use the GitHub issue tracker for this.
 *
 *     In addition, I appreciate that you are working on a bunch of things and
 *     so a lot of code is in flux, thus the many commented-out blocks and
 *     exploratory code fragments.  Just remember to clean up in the end!!!
 */

// JD: Why is this variable outside the function?
 var honeyCombFrequency = 0;
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.   Read on to see how they
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
        modelViewMatrix,
        rotationMatrix,
        instanceMatrix,
        orthoMatrix,
        frustumMatrix,
        vertexPosition,
        vertexColor,

        // For emphasis, we separate the variables that involve lighting.
        normalVector,
        lightPosition,
        lightDiffuse,

        currentSinRipple = 0.1,
        // JDsl: This will point to currentSinRipple in the shader.
        currentSinRippleGL,
        displacement,

        currentFrame = 0,

        savedContext = instanceMatrix,

        tweenScene,

        honeyCombGenerator,

        // Event handling for user rotation
        mouseDown = false,
        lastMouseX,
        lastMouseY,
        newX,
        newY,
        deltaX,
        deltaY,
        rotateX = new Matrix4x4(),
        rotateY = new Matrix4x4(),
        rotateXandY = new Matrix4x4(),

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

    // A function that returns a very specific honeycomb shape - maybe I should
    // generalize (pull out the data) for more customizations!
    // JD: ^^^Good idea...and while we're at it, we should find a way to
    //     transfer as many of these computations as possible to the vertex
    //     shader.  Note how the configuration of your objects is almost
    //     entirely dependent on currentSinRipple.  Thus, you can change
    //     currentSinRipple into a uniform variable in your vertex shader,
    //     and transfer the computations that depend on this over there.
    honeyCombGenerator = function (currentSinRipple, xFrequency, yFrequency) {
        var tx,
            ty,
            tz,
            txMax,
            tyMax,
            children = [],

            xFrequency = xFrequency || 0,
            yFrequency = yFrequency || 0,
            currentSinRipple = currentSinRipple || 1;

        for (tx = -2, txMax = 2; tx <= txMax; tx += 0.6) {
            for (ty = -2, tyMax = 2; ty < tyMax; ty += 0.6) {
                children.push({
                    color: {
                        r: 2 * Math.abs(Math.sin(currentSinRipple * Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2) )) * (1 / (Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2))))),
                        g: 1.0,
                        b: 0.1 * Math.abs(Math.sin(currentSinRipple * Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2) )) * (1 / (Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)))))
                    },
                    vertices: Shapes.toRawTriangleArray(Shapes.polygon(0.3, 0.1, 3.0, 6)).vertices,
                    normals: Shapes.polygon(0.3, 0.1, 3.0, 6).normals,
                    mode: gl.TRIANGLE_STRIP,
                    transform: {
                        tx: tx,
                        ty: ty,
                        tz: 3 * Math.sin(currentSinRipple * Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2))) * (1 / (Math.sqrt(Math.pow(tx, 2) + Math.pow(ty, 2)))), //2 * Math.sin(xFrequency * tx / 10) + 2 * Math.cos(yFrequency * ty / 10),
                        angle: 20 * Math.abs(Math.sin(currentSinRipple) + Math.sin(currentSinRipple)),
                        rx: 1,
                        ry: 0,
                        rz: 1
                    }
                });
            }
        }

        return children;
    },

    // telescope constants - make a helper function
    // var RADIUS = [],
    //     WIDTH = 0.05,
    //     HEIGHT = 0.1;

    // for (i = 0.2; i < 20; i += 0.1) {
    //     RADIUS.push(i);
    // }

    // Build the objects to display.
    objectsToDraw = [
        {
            color: {r: 0.0, g: 0.5, b: 0.25},
            vertices: Shapes.toRawTriangleArray(Shapes.cube()).vertices,
            normals: Shapes.cube().normals,
            mode: gl.TRIANGLES,
            transform: {
                tx: 5.2,
                ty: 0.0,
                tz: 0.0,
                angle: 0,
                rx: 1,
                ry: 0,
                rz: 0
            }
        },

        {
            color: {r: 1, g: 1, b: 0.0},
            vertices: Shapes.toRawTriangleArray(Shapes.polygon(1.0, 0.5, 3.0, 6)).vertices,
            normals: Shapes.polygon(1.0, 0.5, 3.0, 6).normals,
            mode: gl.TRIANGLES,
            transform: {
                tx: 0.0,
                ty: 0.0,
                tz: 0.0,
                angle: 0,
                rx: 1,
                ry: 0,
                rz: 0
            },
            children: honeyCombGenerator(currentSinRipple)
        }

        // {
        //     colors: Shapes.toRawTriangleArray(Shapes.parametricGenerator(Shapes.mobiusEquation)).colors,
        //     vertices: Shapes.toRawTriangleArray(Shapes.parametricGenerator(Shapes.mobiusEquation)).vertices,
        //     mode: gl.TRIANGLES,
        //     transform: {
        //         tx: 5.0,
        //         ty: 0.0,
        //         tz: 0.0,
        //         angle: 45,
        //         rx: 0,
        //         ry: 1,
        //         rz: 0
        //     }
        // },

        // {
        //     colors: Shapes.toRawLineArray(Shapes.parametricGenerator(Shapes.kleinEquation)).colors,
        //     vertices: Shapes.toRawLineArray(Shapes.parametricGenerator(Shapes.kleinEquation)).vertices,
        //     mode: gl.LINES,
        //     transform: {
        //         tx: 6.0,
        //         ty: 0.0,
        //         tz: 5.0,
        //         angle: 0,
        //         rx: 1,
        //         ry: 0,
        //         rz: 1
        //     }
        // }

        // {
        //     colors: Shapes.polygon().colors,
        //     vertices: Shapes.polygon(RADIUS[0], WIDTH, HEIGHT, 3).vertices,
        //     mode: gl.TRIANGLE_STRIP,
        //     transform: {
        //         tx: 0.0,
        //         ty: 0.0,
        //         tz: 0.0,
        //         angle: 45,
        //         rx: 1,
        //         ry: 0,
        //         rz: 0
        //     },

        //     children: [
        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[1], WIDTH, HEIGHT, 4).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 45,
        //                 rx: 0,
        //                 ry: 0,
        //                 rz: 1
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[2], WIDTH, HEIGHT, 5).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 45,
        //                 rx: 0,
        //                 ry: 1,
        //                 rz: 0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[3], WIDTH, HEIGHT, 6).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 45,
        //                 rx: 1,
        //                 ry: 0,
        //                 rz: 0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[4], WIDTH, HEIGHT, 7).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 45,
        //                 rx: 0,
        //                 ry: 0,
        //                 rz: 1
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[5], WIDTH, HEIGHT, 8).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 45,
        //                 rx: 0,
        //                 ry: 1,
        //                 rz: 0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[6], WIDTH, HEIGHT, 9).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 45,
        //                 rx: 1,
        //                 ry: 0,
        //                 rz: 0
        //             }
        //         },

        //         {
        //             colors: Shapes.polygon().colors,
        //             vertices: Shapes.polygon(RADIUS[7], WIDTH, HEIGHT, 10).vertices,
        //             mode: gl.TRIANGLE_STRIP,
        //             transform: {
        //                 tx: 0.0,
        //                 ty: 0.0,
        //                 tz: 0.0,
        //                 angle: 45,
        //                 rx: 0,
        //                 ry: 0,
        //                 rz: 1
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
        //                 angle: 45,
        //                 rx: 0,
        //                 ry: 1,
        //                 rz: 0
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
        //                 angle: 45,
        //                 rx: 1,
        //                 ry: 0,
        //                 rz: 0
        //             }
        //         }
        //     ]
        // }
    ];

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

            if (!shape[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                shape[i].colors = [];
                for (j = 0, maxj = shape[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    shape[i].colors = shape[i].colors.concat(
                        shape[i].color.r,
                        shape[i].color.g,
                        shape[i].color.b
                    );
                }
            }

            shape[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    shape[i].colors);

            // One more buffer: normals.
            shape[i].normalBuffer = GLSLUtilities.initVertexBuffer(gl,
                    shape[i].normals);

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
    normalVector = gl.getAttribLocation(shaderProgram, "normalVector");
    gl.enableVertexAttribArray(normalVector);

    // Finally, we come to the typical setup for transformation matrices:
    // model-view and projection, managed separately.
    // modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    frustumMatrix = gl.getUniformLocation(shaderProgram, "frustumMatrix");
    orthoMatrix = gl.getUniformLocation(shaderProgram, "orthoMatrix");
    instanceMatrix = gl.getUniformLocation(shaderProgram, "instanceMatrix");

    // Note the additional variables.
    lightPosition = gl.getUniformLocation(shaderProgram, "lightPosition");
    lightDiffuse = gl.getUniformLocation(shaderProgram, "lightDiffuse");

    // JDsl: Shader demonstration.
    currentSinRippleGL = gl.getUniformLocation(shaderProgram, "currentSinRipple");
    displacement = gl.getUniformLocation(shaderProgram, "displacement");

    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        var i;

        // JDsl: Default values in case there is no translation.
        gl.uniform2fv(displacement, [ 0.0, 0.0 ]);
        if (object.transform) {
            gl.uniformMatrix4fv(instanceMatrix, gl.FALSE, new Float32Array(
                Matrix4x4.instanceTransform(object.transform).toWebGLMatrix().elements
            ));

            // JDsl: Displacement happens per object, so we set the uniform
            //     variables here.
            if (object.transform.tx !== undefined && object.transform.ty !== undefined) {
                gl.uniform2fv(displacement, [ object.transform.tx, object.transform.ty ]);
            }

            // JDsl: What we can't do as easily in the shader (without a lot
            //     of additional code) is the rotation angle, so we just
            //     change that here.  This can be viewed as an alternative
            //     approach for speeding things up *if the change you want
            //     to compute can be reflected in the instance transform*.
            if (object.transform.angle !== undefined) {
                // JD: Just copied from honeyCombGenerator.
                object.transform.angle = 20 * Math.abs(Math.sin(currentSinRipple) +
                        Math.sin(currentSinRipple));
            }
        }

        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
            rotateXandY.toWebGLMatrix().elements)
        );

        // Set the varying normal vectors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.normalBuffer);
        gl.vertexAttribPointer(normalVector, 3, gl.FLOAT, false, 0, 0);

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

        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for(i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // The ortho and frustum matrices
    // JD: Interesting that you have chosen to use two projections.
    //     This is unconventional, but as long as you know what you
    //     are doing that's OK.
    gl.uniformMatrix4fv(orthoMatrix, gl.FALSE, new Float32Array(
        Matrix4x4.ortho(-15, 15, -15, 15, -12, 37).toWebGLMatrix().elements)
    );

    gl.uniformMatrix4fv(frustumMatrix, gl.FALSE, new Float32Array(
        Matrix4x4.frustum(-0.25, 0.25, -0.25, 0.25, 0.2, 100).toWebGLMatrix().elements)
    );

    // Set up our one light source and color.  Note the uniform3fv function.
    gl.uniform3fv(lightPosition, [1.0, 0.0, 0.0]);
    gl.uniform3fv(lightDiffuse, [1.0, 1.0, 1.0]);

    // Draw the initial scene.
    passVertices(objectsToDraw);
    drawScene();

    // Slider
    // var currentValue = $('#currentValue');

    // $('#defaultSlider').change(function(){
    //     currentValue.html(this.value);
    //     // honeyCombFrequency = this.value;
    //     passVertices(objectsToDraw);
    //     drawScene();
    // });

    // $('#defaultSlider').change();

    var updateRipple = 0.1;

    // Animate Button
    // JD: This is called "Frequency" on the web page---intentional?
    $("#animate").click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentSinRipple = currentSinRipple + updateRipple;
                if (currentSinRipple >= 3.0) {
                    updateRipple = -updateRipple;
                } else if (currentSinRipple <= -3.5) {
                    updateRipple = -updateRipple;
                }

                /* JDsl: Not needed when the shader is doing the work!

                // create better stucture
                if (objectsToDraw[1].children) {
                    // JD: Yikes!!!  No wonder you're seeing performance problems---
                    //     not only is JavaScript doing most of the heavy lifting,
                    //     but it's doing a lot of duplicate work!  This definitely
                    //     calls for more vertex shader action.
                    objectsToDraw[1].children = honeyCombGenerator(currentSinRipple);
                }
                
                passVertices(objectsToDraw);
                */

                // JDsl: Note the sole change that we make!  The "|| 1" comes from
                //     the same "|| 1" logic in honeyCombGenerator.
                gl.uniform1f(currentSinRippleGL, currentSinRipple || 1);
                drawScene();
            }, 1);
        } 
    });

    // rotateScene = function (event) {
    //     rotationAroundX = xRotationStart - yDragStart + event.clientY;
    //     rotationAroundY = yRotationStart - xDragStart + event.clientX;
    //     drawScene();
    // };

    // // Instead of animation, we do interaction: let the mouse control rotation.
    // $(canvas).mousedown(function (event) {
    //     xDragStart = event.clientX;
    //     yDragStart = event.clientY;
    //     xRotationStart = rotationAroundX;
    //     yRotationStart = rotationAroundY;
    //     $(canvas).mousemove(rotateScene);
    // }).mouseup(function (event) {
    //     $(canvas).unbind("mousemove");
    // });

    // Rotation event handling
    $(canvas).mousedown(function (event) {
        mouseDown = true;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
        drawScene();
    });

    $(canvas).mousemove(function (event) {
        if (mouseDown) {
            newX = event.clientX,
            newY = event.clientY,
            deltaX = newX - lastMouseX,
            deltaY = newY - lastMouseY,

            rotateX = Matrix4x4.rotate(deltaY, -1, 0, 0);
            rotateY = Matrix4x4.rotate(deltaX, 0, -1, 0);
            rotateXandY = rotateX.multiply(rotateY);

            gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
                rotateXandY.toWebGLMatrix().elements)
            );

            drawScene();
        }
    });

    // JD: In the absence of mouseup behavior, once the user holds the mouse
    //     down to rotate the scene, the mouse then forever rotates it.
    //     Is that really your intent?

    // $(canvas).mouseup(function (event) {
    //     mouseDown = false;
    // });

}(document.getElementById("hello-webgl")));