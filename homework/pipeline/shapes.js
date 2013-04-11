/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
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


    // JD: Your shapes look and work great, and you should certainly keep them
    //     handy.  However, by restricting all of them to TRIANGLE_STRIP, you
    //     lose a degree of flexibility that a general mesh (i.e., separate,
    //     arbitrary indices) affords.
    //
    //     You should try your hand with at least one generalized mesh in order
    //     to round out your proficiency here.

    /*
     * Returns vertices for a 3D polygon in an order intended for gl.TRIANGLE_STRIP.  
     * Default value makes it a pentagon. Some of the given parameters for this shape 
     * function may be unnessisary if matrix transforms can be applied to the shape. 
     * But it does allow for easy customization, especially when it comes to the subshapes!
     */
    // JD: Agreed: no harm in enabling some customization at the raw vertex level.
    //     Transforms will simply make this just that much more flexible.
    //
    //     One level of customization you might want to add: color choices.  Perhaps
    //     a customizable starting color and/or gradient step---anything that expands
    //     the possibilities without too much effort.
    polygon: function (ringRadius, ringWidth, ringHeight, numOfSides, zPos, xPos, yPos) {
        var vertices = [],
            colors = [],
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
                x[i] * (ringRadius - ringWidth) + xPos,
                y[i] * (ringRadius - ringWidth) + yPos,
                -(ringHeight / 2) + zPos,

                x[i] * (ringRadius - ringWidth) + xPos,
                y[i] * (ringRadius - ringWidth) + yPos,
                (ringHeight / 2) + zPos
            );
        }
        
        // Outer ring
        for (i = 0; i <= numOfSides; i += 1) {
            vertices.push(
                x[i] * ringRadius + xPos,
                y[i] * ringRadius + yPos,
                -(ringHeight / 2) + zPos,

                x[i] * ringRadius + xPos,
                y[i] * ringRadius + yPos,
                (ringHeight / 2) + zPos
            );
        }

        // Bottom of ring
        for (i = 0; i <= numOfSides; i += 1) {
            vertices.push(
                x[i] * ringRadius + xPos,
                y[i] * ringRadius + yPos,
                -(ringHeight / 2) + zPos,

                x[i] * (ringRadius - ringWidth) + xPos,
                y[i] * (ringRadius - ringWidth) + yPos,
                -(ringHeight / 2) + zPos
            );
        }

        // Top of ring
        for (i = 0; i <= numOfSides; i += 1) {
            vertices.push(
                x[i] * ringRadius + xPos,
                y[i] * ringRadius + yPos,
                (ringHeight / 2) + zPos,

                x[i] * (ringRadius - ringWidth) + xPos,
                y[i] * (ringRadius - ringWidth) + yPos,
                (ringHeight / 2) + zPos
            );
        }
 
        // Color gradient
        for (i = 0; i < (vertices.length / 3); i += 1) {
            colors.push((0.9 * i) / (vertices.length / 3), 0.5, 0.0)
        }

        return {
            vertices: vertices,
            colors: colors
        }
    },


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
            vEnd      : (3.01 / 2) * Math.PI,
            vInterval : 0.3
        };
    },


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
            vInterval : 0.1
        };
    },

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
            colors: colors
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

        //Set up indices array
        for (i = 0; i <= vertices.length; i += 1) {
            indices.push(
                [i, i + 1, i + latitudeBands + 1],
                [i + 1, i + latitudeBands + 1, i + latitudeBands + 2]
            );
        }

        // Color gradient: Created for color stops to be at equator and poles.
        // for (i = 0; i < vertices.length / 12; i += 1) {
        //     colors.push(
        //         (1.0 * i) / (vertices.length / 3),
        //         ((0.25 * (vertices.length / 3)) / i),
        //         ((0.5 * (vertices.length / 3)) / i)
        //     );
        // }

        // for (i = (vertices.length / 6); i > 0; i -= 1) {
        //     colors.push(
        //         (1.0 * i) / (vertices.length / 6),
        //         ((0.25 * (vertices.length / 6)) / i),
        //         ((0.5 * (vertices.length / 6)) / i)
        //     );
        // }

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
    toRawTriangleArray: function (indexedVertices) {
        var vertices = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                vertices = vertices.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return vertices;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var vertices = [],
            i,
            j,
            maxi,
            maxj;

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

        return vertices;
    },
}