/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */

 // TODO:  Add normals arrays to shapes
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    /*
     * Returns the vertices for a small cube.  Note the breakdown into triangles.
     */
    cube: function () {
        return {
            vertices: [
                [ 0.5, 0.5, 0.5 ],
                [ 0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, 0.5 ],
                [ 0.5, -0.5, 0.5 ],
                [ 0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, 0.5 ]
            ],

            indices: [
                [ 0, 1, 3 ],
                [ 2, 3, 1 ],
                [ 0, 3, 4 ],
                [ 7, 4, 3 ],
                [ 0, 4, 1 ],
                [ 5, 1, 4 ],
                [ 1, 5, 6 ],
                [ 2, 1, 6 ],
                [ 2, 7, 3 ],
                [ 6, 7, 2 ],
                [ 4, 7, 6 ],
                [ 5, 4, 6 ]
            ],

            normals: [].concat(
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],
                [ 0.0, 1.0, 0.0 ],

                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],
                [ 0.0, 0.0, 1.0 ],

                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],
                [ 1.0, 0.0, 0.0 ],

                [ 0.0, 0.0, -1.0 ],
                [ 0.0, 0.0, -1.0 ],
                [ 0.0, 0.0, -1.0 ],
                [ 0.0, 0.0, -1.0 ],
                [ 0.0, 0.0, -1.0 ],
                [ 0.0, 0.0, -1.0 ],

                [ -1.0, 0.0, 0.0 ],
                [ -1.0, 0.0, 0.0 ],
                [ -1.0, 0.0, 0.0 ],
                [ -1.0, 0.0, 0.0 ],
                [ -1.0, 0.0, 0.0 ],
                [ -1.0, 0.0, 0.0 ],

                [ 0.0, -1.0, 0.0 ],
                [ 0.0, -1.0, 0.0 ],
                [ 0.0, -1.0, 0.0 ],
                [ 0.0, -1.0, 0.0 ],
                [ 0.0, -1.0, 0.0 ],
                [ 0.0, -1.0, 0.0 ]
            )
        };
    },

    /*
     * Returns vertices for a 3D polygon in an order intended for gl.TRIANGLE_STRIP.  
     * Default value makes it a pentagon. Some of the given parameters for this shape 
     * function may be unnessisary if matrix transforms can be applied to the shape. 
     * But it does allow for easy customization, especially when it comes to the subshapes!
     */
    polygon: function (ringRadius, ringWidth, ringHeight, numOfSides, zPos, xPos, yPos) {
        var vertices = [],
            indices = [],
            colors = [],
            normals = [],
            x = [],
            y = [],

            // Default parameters
            xPos = xPos || 0.0,
            yPos = yPos || 0.0,
            zPos = zPos || 0.0,
            ringRadius = ringRadius || 1.0,
            ringWidth = ringWidth || 0.5,
            ringHeight = ringHeight || 0.5,
            numOfSides = numOfSides || 30,

            // Reusable loop variables
            i;

        // Add error control

        // Set up x and y arrays to be used in circle computation
        for (i = 0; i <= numOfSides; i += 1) {
            x.push(Math.sin((2 * Math.PI * i) / numOfSides));
            y.push(Math.cos((2 * Math.PI * i) / numOfSides));
        }

        // Inner ring
        for (i = 0; i <= numOfSides; i += 1) {
            vertices.push(
                [
                    x[i] * (ringRadius - ringWidth) + xPos,
                    y[i] * (ringRadius - ringWidth) + yPos,
                    -(ringHeight / 2) + zPos
                ],

                [
                    x[i] * (ringRadius - ringWidth) + xPos,
                    y[i] * (ringRadius - ringWidth) + yPos,
                    (ringHeight / 2) + zPos
                ]
            );
        }

        console.log(vertices.length);

        // // indices Array
        for (i = 0; i < vertices.length; i += 1) {
            indices.push(
                [i, i + 1, i + 2],
                [i + 1, i + 2, i + 3]
            );
        }        
        // Outer ring
        // for (i = 0; i <= numOfSides; i += 1) {
        //     vertices.push(
        //         x[i] * ringRadius + xPos,
        //         y[i] * ringRadius + yPos,
        //         -(ringHeight / 2) + zPos,

        //         x[i] * ringRadius + xPos,
        //         y[i] * ringRadius + yPos,
        //         (ringHeight / 2) + zPos
        //     );
        // }

        // // Bottom of ring
        // for (i = 0; i <= numOfSides; i += 1) {
        //     vertices.push(
        //         x[i] * ringRadius + xPos,
        //         y[i] * ringRadius + yPos,
        //         -(ringHeight / 2) + zPos,

        //         x[i] * (ringRadius - ringWidth) + xPos,
        //         y[i] * (ringRadius - ringWidth) + yPos,
        //         -(ringHeight / 2) + zPos
        //     );
        // }

        // // Top of ring
        // for (i = 0; i <= numOfSides; i += 1) {
        //     vertices.push(
        //         x[i] * ringRadius + xPos,
        //         y[i] * ringRadius + yPos,
        //         (ringHeight / 2) + zPos,

        //         x[i] * (ringRadius - ringWidth) + xPos,
        //         y[i] * (ringRadius - ringWidth) + yPos,
        //         (ringHeight / 2) + zPos
        //     );
        // }
 
        // Color gradient
        for (i = 0; i < (vertices.length / 3); i += 1) {
            colors.push((0.9 * i) / (vertices.length / 3), 0.5, 0.0)
        }

        // Set up indices Array
        // for (i = 0; i < vertices.length; i += 1) {
        //     [],
        //     []
        // }

        // Set up normal array for inner ring
        // for (i = 0; i < vertices.length / 4; i += 1) {
        //     normals.push(
        //         [i, i + 1, i - iNext],
        //         [i + 1, i - iNext, i - iNext + 1]
        //     );
        // }

        // Set up normal array for outer ring
        // for (i = 0; i <= 1; i += 1) {
            normals.push(
                1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,
                1.0, 1.0, 0.0,

                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,
                1.0, 0.0, 0.0,

                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,
                1.0, -1.0, 0.0,

                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,
                -1.0, -1.0, 0.0,

                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,
                -1.0, 0.0, 0.0,

                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,
                -1.0, 1.0, 0.0,

                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0,
                0.0, 1.0, 0.0
            );
        // }

        // // Set up normal array for bottom
        // for (i = 0; i < vertices.length / 4; i += 1) {
        //     normals.push(

        //     );
        // }

        // // Set up normal array for top
        // for (i = 0; i < vertices.length / 4; i += 1) {
        //     normals.push(

        //     );
        // }


        return {
            vertices: vertices,
            indices: indices,
            normals: normals,
            colors: colors
        }
    },

    /*
     * A function that returns an object for a klein shape to be passed in
     * the parametric generator function.
     */
    kleinEquation: function(u, v) {
        var r = 2 + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v);

        return {
            equation  : [
                (r * Math.cos(u)) / 4,
                (r * Math.sin(u)) / 4,
                (Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v)) / 4,
            ],
            uStart    : 0.0,
            uEnd      : 2.01 * Math.PI,
            uInterval : 0.3,
            vStart    : - Math.PI / 2,
            vEnd      : (3.1 / 2) * Math.PI,
            vInterval : 0.3,
            colorStart: [1.0, 0.0, 0.0],
            colorEnd  : [0.0, 1.0, 0.0],
            colorDivs : 4
        };
    },

    /*
     * A function that returns an object for a mobius shape to be passed in
     * the parametric generator function.
     */
    mobiusEquation: function(u, v) {
        return {
            equation : [
                (0.5 + u * Math.cos(v / 2)) * Math.cos(v),
                (0.5 + u * Math.cos(v / 2)) * Math.sin(v),
                u * Math.sin(v / 2)
            ],
            uStart    : -0.5,
            uEnd      : 0.5,
            uInterval : 0.1,
            vStart    : 0.0,
            vEnd      : 2.1 * Math.PI,
            vInterval : 0.1,
            colorStart: [1.0, 0.0, 1.0],
            colorEnd  : [0.0, 1.0, 0.75],
            colorDivs : 2
        };
    },

    /*
     * The all powerful parametricGenerator function. Now, I can make a function
     * that returns an object for any set of 3D parametric functions I may find.
     * This function uses indices, so a general mesh can be applied to the shapes.
     */
    parametricGenerator: function(parametric) {
        var vertices = [],
            indices = [],
            colors = [],

            U_START = parametric().uStart,
            U_END = parametric().uEnd,
            U_INTERVAL = parametric().uInterval,
            V_START = parametric().vStart,
            V_END = parametric().vEnd,
            V_INTERVAL = parametric().vInterval,
            colors = colors.concat(parametric().colorStart, parametric().colorEnd),
            colorDivs = parametric().colorDivs,

            iNext = iNext = Math.floor(((U_START - U_END) / U_INTERVAL)) - 1;

        // Set up vertices array
        for (v = V_START; v <= V_END; v += V_INTERVAL) {
            for (u = U_START; u <= U_END; u += U_INTERVAL) {
                vertices.push(
                    parametric(u, v).equation
                );
            }
        }

        // Set up indices array
        for (i = 0; i < vertices.length; i += 1) {
            indices.push(
                [i, i + 1, i - iNext],
                [i + 1, i - iNext, i - iNext + 1]
            );
        }

        return {
            vertices: vertices,
            indices: indices,
            colors: colors,
            colorDivs: colorDivs
        };
    },

    /* 
     * Returns vertices for a sphere in an order intended for gl.TRIANGLE_STRIP
     * where color stops are at equator and poles. Adapted from http://learningwebgl.com/blog/?p=1253
     */
    sphere: function () {
        var vertices = [],
            indices = [],
            colors = [],

            latitudeBands = 20,
            longitudeBands = latitudeBands,
            i,
            j;

        for (var latNumber = 0; latNumber <= latitudeBands; latNumber += 1) {
            var theta = latNumber * Math.PI / latitudeBands,
                sinTheta = Math.sin(theta),
                cosTheta = Math.cos(theta);

            for (var longNumber = 0; longNumber <= longitudeBands; longNumber += 1) {
                var phi = longNumber * 2 * Math.PI / longitudeBands,
                    sinPhi = Math.sin(phi),
                    cosPhi = Math.cos(phi);

                vertices.push([cosPhi * sinTheta, cosTheta, sinPhi * sinTheta]);
            }
        }

        // Set up indices array
        for (i = 0; i <= vertices.length; i += 1) {
            indices.push(
                [i, i + 1, i + latitudeBands + 1],
                [i + 1, i + latitudeBands + 1, i + latitudeBands + 2]
            );
        }

        return {
            vertices: vertices,
            indices: indices,
            colors: colors
        }
    },
 
    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
     // Might want to factor out generating color arrays into separate functions
     // if they're the same for both toRawTriangleArray and toRawLineArray
    toRawTriangleArray: function (indexedVertices) {
        var vertices = [],
            colors = [],
            i,
            j,
            maxi,
            maxj;
            
            // rStart = indexedVertices.colors[0],
            // gStart = indexedVertices.colors[1],
            // bStart = indexedVertices.colors[2],

            // rEnd = indexedVertices.colors[3],
            // gEnd = indexedVertices.colors[4],
            // bEnd = indexedVertices.colors[5],

            // colorDivs = indexedVertices.colorDivs;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                vertices = vertices.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        // Color gradient
        // for (i = 0; i < colorDivs; i += 1) {
        //     if (i % 2 == 0) {
        //         for (j = 0; j < vertices.length / (3 * colorDivs); j += 1) {
        //             colors.push(
        //                 rStart - (rStart - rEnd) * (j / (vertices.length / (3 * colorDivs))),
        //                 gStart - (gStart - gEnd) * (j / (vertices.length / (3 * colorDivs))),
        //                 bStart - (bStart - bEnd) * (j / (vertices.length / (3 * colorDivs)))
        //             );
        //         }
        //     } else {
        //         for (j = vertices.length / (3 * colorDivs); j > 0; j -= 1) {
        //             colors.push(
        //                 rStart - (rStart - rEnd) * (j / (vertices.length / (3 * colorDivs))),
        //                 gStart - (gStart - gEnd) * (j / (vertices.length / (3 * colorDivs))),
        //                 bStart - (bStart - bEnd) * (j / (vertices.length / (3 * colorDivs)))
        //             );
        //         }
        //     }
        // }

        return {
            vertices: vertices,
            colors: colors
        };
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var vertices = [],
            colors = [],
            i,
            j,
            maxi,
            maxj,

            rStart = indexedVertices.colors[0],
            gStart = indexedVertices.colors[1],
            bStart = indexedVertices.colors[2],

            rEnd = indexedVertices.colors[3],
            gEnd = indexedVertices.colors[4],
            bEnd = indexedVertices.colors[5],

            colorDivs = indexedVertices.colorDivs;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                vertices = vertices.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        // Color gradient
        for (i = 0; i < colorDivs; i += 1) {
            if (i % 2 == 0) {
                for (j = 0; j < vertices.length / (3 * colorDivs); j += 1) {
                    colors.push(
                        rStart - (rStart - rEnd) * (j / (vertices.length / (3 * colorDivs))),
                        gStart - (gStart - gEnd) * (j / (vertices.length / (3 * colorDivs))),
                        bStart - (bStart - bEnd) * (j / (vertices.length / (3 * colorDivs)))
                    );
                }
            } else {
                for (j = vertices.length / (3 * colorDivs); j > 0; j -= 1) {
                    colors.push(
                        rStart - (rStart - rEnd) * (j / (vertices.length / (3 * colorDivs))),
                        gStart - (gStart - gEnd) * (j / (vertices.length / (3 * colorDivs))),
                        bStart - (bStart - bEnd) * (j / (vertices.length / (3 * colorDivs)))
                    );
                }
            }
        }

        return {
            vertices: vertices,
            colors: colors
        };
    },
}