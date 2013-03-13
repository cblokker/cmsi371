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

    // Some of the given parameters for this shape function may be unnessisary if matrix
    // transforms can be applied to the shape.
    ring: function (xPos, yPos, zPos, ringRadius, ringWidth, ringHeight, numOfSides) {
        var result = [],
            colors = [],
            x = [],
            y = [],

            xPos = xPos || 0.0,
            yPos = yPos || 0.0,
            zPos = zPos || 0.0,
            numOfSides = numOfSides || 10,
            ringRadius = ringRadius || 1.0,
            ringWidth = ringWidth || 0.5,
            ringHeight = ringHeight || 0.5,

            i;

        // Set up x and y arrays to be used in circle computations
        for(i = 0; i <= numOfSides; i += 1) {
            x.push(Math.sin((2 * Math.PI * i) / numOfSides));
            y.push(Math.cos((2 * Math.PI * i) / numOfSides));
        }

        // Inner ring
        for (i = 0; i <= numOfSides; i += 1) {
            result.push(
                x[i] * (ringRadius - ringWidth) + xPos,
                y[i] * (ringRadius - ringWidth) + yPos,
                -(ringHeight / 2) + zPos
            );
            result.push(
                x[i] * (ringRadius - ringWidth) + xPos,
                y[i] * (ringRadius - ringWidth) + yPos,
                (ringHeight / 2) + zPos
            );
        }
        
        // Outer ring
        for (i = 0; i <= numOfSides; i += 1) {
            result.push(
                x[i] * ringRadius + xPos,
                y[i] * ringRadius + yPos,
                -(ringHeight / 2) + zPos
            );
            result.push(
                x[i] * ringRadius + xPos,
                y[i] * ringRadius + yPos,
                (ringHeight / 2) + zPos
            );
        }

        // Bottom
        for (i = 0; i <= numOfSides; i += 1) {
            result.push(
                x[i] * ringRadius + xPos,
                y[i] * ringRadius + yPos,
                -(ringHeight / 2) + zPos
            );
            result.push(
                x[i] * (ringRadius - ringWidth) + xPos,
                y[i] * (ringRadius - ringWidth) + yPos,
                -(ringHeight / 2) + zPos
            );
        }

        // Top 
        for (i = 0; i <= numOfSides; i += 1) {
            result.push(
                x[i] * ringRadius + xPos,
                y[i] * ringRadius + yPos,
                (ringHeight / 2) + zPos
            );
            result.push(
                x[i] * (ringRadius - ringWidth) + xPos,
                y[i] * (ringRadius - ringWidth) + yPos,
                (ringHeight / 2) + zPos
            );
        }
 
        // Color gradient
        for (i = 0; i < (result.length / 3); i += 1) {
            colors.push((0.9 * i) / (result.length / 3), 0.5, 0.0)
        }

        return {
            result: result,
            colors: colors
        }
    },

 
    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    },

};
