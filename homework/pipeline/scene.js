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
        rotationMatrix,
        instanceMatrix,
        orthoMatrix,
        frustumMatrix,
        vertexPosition,
        vertexColor,

        tweenedValue = 0.0,

        currentFrame = 0,

        savedContext = instanceMatrix,

        tweenScene,

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

        // updateSlider,

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
    // var RADIUS = [],
    //     WIDTH = 0.05,
    //     HEIGHT = 0.1;

    // for (i = 0.2; i < 20; i += 0.1) {
    //     RADIUS.push(i);
    // }

    // Build the objects to display.
    objectsToDraw = [

        // {
        //     colors: Shapes.toRawTriangleArray(Shapes.parametricGenerator(Shapes.mobiusEquation)).colors,
        //     vertices: Shapes.toRawTriangleArray(Shapes.parametricGenerator(Shapes.mobiusEquation)).vertices,
        //     mode: gl.TRIANGLES,
        //     transform: {
        //         tx: 2.0,
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
        //         tx: 0.0,
        //         ty: 2.0,
        //         tz: 0.0,
        //         angle: 0,
        //         rx: 1,
        //         ry: 0,
        //         rz: 1
        //     }
        // },

        {
            color: {r: 1, g: 1, b: 0.0},
            vertices: Shapes.polygon(0.4, 0.1, 2.0, 6).vertices,
            mode: gl.TRIANGLE_STRIP,
            transform: {
                tx: 0.0,
                ty: 0.0,
                tz: 0.0,
                angle: 0,
                rx: 0,
                ry: 0,
                rz: 0
            },
            // keyframes: [
            //     {
            //         frame: 0,
            //         ease: keyframeTweener.quadEaseOut,
            //         tx: 0.0,
            //         ty: 0.0,
            //         tz: 0.0
            //     },
            //     {
            //         frame: 50,
            //         ease: keyframeTweener.quadEaseIn,
            //         tx: 0.0
            //         ty: 0.5
            //         tz: 0.5
            //     }
            // ]
            children: Shapes.honeyCombGenerator(gl.TRIANGLE_STRIP, tweenedValue, 5, 7)
        },

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

        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
            rotateXandY.toWebGLMatrix().elements)
        );

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

    createTween = function (start, startDistance, end) {

    };

    tweenScene = function () {
        // Some reusable loop variables.
        var i,
            j,
            maxI,
            maxJ,
            ease,
            startKeyframe,
            endKeyframe,
            txStart,
            txDistance,
            tyStart,
            tyDistance,
            sxStart,
            sxDistance,
            syStart,
            syDistance,
            rotateStart,
            rotateDistance,
            currentTweenFrame,
            numOfRingsStart,
            numOfRingsEnd,
            opacityStart,
            opacityEnd,
            opacityDistance,
            duration;

        // For every objectsToDraw go to the current pair of keyframes.
        // Then, draw the objectsToDrawbased on the current frame.
        for (i = 0, maxI = objectsToDraw.length; i < maxI; i += 1) {                
            for (j = 0, maxJ = objectsToDraw[i].keyframes.length - 1; j < maxJ; j += 1) { 
                // We look for keyframe pairs such that the current
                // frame is between their frame numbers.
                if ((objectsToDraw[i].keyframes[j].frame <= currentFrame) &&
                        (currentFrame <= objectsToDraw[i].keyframes[j + 1].frame)) {
                    // Point to the start and end keyframes.
                    startKeyframe = objectsToDraw[i].keyframes[j];
                    endKeyframe = objectsToDraw[i].keyframes[j + 1];

                    // Save the rendering context state.
                    renderingContext.save();

                    // Set up our start and distance values, using defaults
                    // if necessary.
                    ease = startKeyframe.ease || KeyframeTweener.linear;

                }
            }
        }
    };

    // The ortho and frustum matrices
    gl.uniformMatrix4fv(orthoMatrix, gl.FALSE, new Float32Array(
        Matrix4x4.ortho(-10, 10, -10, 10, -12, 24).toWebGLMatrix().elements)
    );

    gl.uniformMatrix4fv(frustumMatrix, gl.FALSE, new Float32Array(
        Matrix4x4.frustum(-0.5, 0.5, -0.5, 0.5, 0.2, 100).toWebGLMatrix().elements)
    );

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

    // frequency buttons
    $("#add").click(function () {
        honeyCombFrequency += 20;
        passVertices(objectsToDraw);
        drawScene();
    });

    // $(canvas).mousedown(function (event) {
    //     mouseDown = true;
    //     lastMouseX = event.clientX;
    //     lastMouseY = event.clientY;
    //     drawScene();
    // });

    // $(canvas).mousemove(function (event) {
    //     if (mouseDown) {
    //         newX = event.clientX,
    //         newY = event.clientY,
    //         deltaX = newX - lastMouseX,
    //         deltaY = newY - lastMouseY,

    //         rotateX = Matrix4x4.rotate(deltaY, -1, 0, 0);
    //         rotateY = Matrix4x4.rotate(deltaX, 0, -1, 0);
    //         rotateXandY = rotateX.multiply(rotateY);

    //         gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(
    //             rotateXandY.toWebGLMatrix().elements)
    //         );
    //         // passVertices(objectsToDraw);
    //         drawScene();
    //     }
    // });

    // $(canvas).mouseup(function (event) {
    //     mouseDown = false;
    // });
console.log(tweenedValue);

    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                tweenedValue += 0.1;
                passVertices(objectsToDraw);
                drawScene();
            }, 100);
        }
    });

}(document.getElementById("hello-webgl")));