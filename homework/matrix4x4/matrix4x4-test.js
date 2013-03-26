/*
 * Unit tests for our Matrix4x4 object.
 */
$(function () {

    // This suite checks instantiation basics.
    test("Creation and Data Access", function () {
        var m1 = new Matrix4x4();
        deepEqual(m1.elements,
            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1],
            "Default matrix constructor");
    });

    test("Pure Transformation Matrices", function () {
        // Test translation matrix transformations
        var m = Matrix4x4.getTranslationMatrix(5, 9, -1);
        deepEqual(m.elements,
            [1, 0, 0, 5,
             0, 1, 0, 9,
             0, 0, 1, -1,
             0, 0, 0, 1],
            "Pure translation matrix");

        // Test scale matrix transformations
        var m1 = Matrix4x4.scale(2, 3, 5);
        deepEqual(m1.elements,
            [2, 0, 0, 0,
             0, 3, 0, 0,
             0, 0, 5, 0,
             0, 0, 0, 1],
            "Pure scale matrix");

        // Test rotation matrix transformations
        var m2 = Matrix4x4.rotate(30, 1, 0, 0);
        deepEqual(m2.elements,
            [1,                     0,                      0, 0,
             0, Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6), 0,
             0, Math.sin(Math.PI / 6),  Math.cos(Math.PI / 6), 0,
             0,                     0,                      0, 1],
            "Pure rotation matrix about x axis");

        var m3 = Matrix4x4.rotate(30, 0, 1, 0);
        deepEqual(m3.elements,
            [Math.cos(Math.PI / 6), 0, Math.sin(Math.PI / 6), 0,
                                 0, 1,                     0, 0,
            -Math.sin(Math.PI / 6), 0, Math.cos(Math.PI / 6), 0,
                                 0, 0,                     0, 1],
            "Pure rotation matrix about y axis");

        var m4 = Matrix4x4.rotate(30, 0, 0, 1);
        deepEqual(m4.elements,
            [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6), 0, 0,
             Math.sin(Math.PI / 6),  Math.cos(Math.PI / 6), 0, 0,
                                 0,                      0, 1, 0,
                                 0,                      0, 0, 1],
            "Pure rotation matrix about z axis");

        // Test multimplication matrix
        var m5 = new Matrix4x4(
                2, 1,  2, 1,
                3, 2, 10, 5,
                1, 2,  2, 2,
                3, 4,  5, 1);
            m6 = new Matrix4x4(
                0,  3, 0, 0,
                3,  2, 1, 5,
                2, 60, 4, 9,
                0,  0, 4, 2);
            m7 = m6.multiply(m5);

        deepEqual(m7.elements,
            [ 7, 128, 13,  25,
             26, 613, 62, 110,
             10, 127, 18,  32,
             22, 317, 28,  67],
            "Pure multiplication matrix");
    });

    test("Perspective Matrices", function () {
        // Test ortho transform
        var m5 = Matrix4x4.ortho(0, 2, 0, 2, 0, 2); //left, right, bottom, top, zNear, zFar
        deepEqual(m5.elements,
            [1, 0,  0, -1,
             0, 1,  0, -1,
             0, 0, -1, -1,
             0, 0,  0,  1],
            "Pure ortho Matrix");

        // Test frustum transform
        var m6 = Matrix4x4.frustum(0, 2, 0, 2, 1, 2); //left, right, bottom, top, zNear, zFar
        deepEqual(m6.elements,
            [-1, 0,  1, 0,
             0, -1,  1, 0,
             0, 0,  -3, 4,
             0, 0,  -1, 0],
            "Frustum Matrix");
    });

    // Test conversion transform for toWebGLMatrix
    test("WebGL Matrix conversions", function () {
        var m5 = new Matrix4x4(
                 0,  1,  2,  3,
                 4,  5,  6,  7,
                 8,  9, 10, 11,
                12, 13, 14, 15
            );
            m6 = Matrix4x4.toWebGLMatrix(m5);
        deepEqual(m6.elements,
            [0, 4,  8, 12,
             1, 5,  9, 13,
             2, 6, 10, 14,
             3, 7, 11, 15],
            "to WebGL matrix transformation");

        var m7 = new Matrix4x4(
                0, 4,  8, 12,
                1, 5,  9, 13,
                2, 6, 10, 14,
                3, 7, 11, 15
            );
            m8 = Matrix4x4.toWebGLMatrix(m7);
        deepEqual(m8.elements,
            [0,  1,  2,  3,
             4,  5,  6,  7,
             8,  9, 10, 11,
            12, 13, 14, 15],
            "to Matrix4x4 matrix transformation");
    });
});
