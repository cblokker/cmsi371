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
        var m = Matrix4x4.getTranslationMatrix(5, 9, -1);
        deepEqual(m.elements,
            [1, 0, 0, 5,
             0, 1, 0, 9,
             0, 0, 1, -1,
             0, 0, 0, 1],
            "Pure translation matrix");

        var m1 = Matrix4x4.scale(2, 3, 5);
        deepEqual(m1.elements,
            [2, 0, 0, 0,
             0, 3, 0, 0,
             0, 0, 5, 0,
             0, 0, 0, 1],
            "Pure scale matrix");

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
    }),

    test("Perspective Matrices", function () {
        var m5 = Matrix4x4.ortho(0, 2, 0, 2, 0, 2); //left, right, bottom, top, zNear, zFar
        deepEqual(m5.elements,
            [1, 0,  0, -1,
             0, 1,  0, -1,
             0, 0, -1, -1,
             0, 0,  0,  1],
            "Pure ortho Matrix");

        var m6 = Matrix4x4.frustum(0, 2, 0, 2, 1, 2); //left, right, bottom, top, zNear, zFar
        deepEqual(m6.elements,
            [-1, 0,  1, 0,
             0, -1,  1, 0,
             0, 0,  -3, 4,
             0, 0,  -1, 0],
            "Frustum Matrix");
    });

});
