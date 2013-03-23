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
    });

/*
    test("Addition and Subtraction", function () {
        var v1 = new Vector(4, 5),
            v2 = new Vector(-10, 4),
            vresult = v1.add(v2);

        equal(vresult.dimensions(), 2, "Vector sum size check");
        equal(vresult.x(), -6, "Vector sum first element");
        equal(vresult.y(), 9, "Vector sum second element");

        v1 = new Vector(0, -2, 3, 5);
        v2 = new Vector(-2, 1, 0, 7);
        vresult = v1.subtract(v2);
        equal(vresult.dimensions(), 4, "Vector difference size check");
        equal(vresult.x(), 2, "Vector difference first element");
        equal(vresult.y(), -3, "Vector difference second element");
        equal(vresult.z(), 3, "Vector difference third element");
        equal(vresult.w(), -2, "Vector difference fourth element");

        // Check for errors.
        v1 = new Vector(5, 8, 10, 2);
        v2 = new Vector(1, 2, 2);

        // We can actually check for a *specific* exception, but
        // we won't go that far for now.
        raises(
            function () {
                return v1.add(v2);
            },
            "Check for vectors of different sizes"
        );
    });

    test("Scalar Multiplication and Division", function () {
        var v = new Vector(8, 2, 3),
            vresult = v.multiply(2);

        equal(vresult.x(), 16, "Vector scalar multiplication first element");
        equal(vresult.y(), 4, "Vector scalar multiplication second element");
        equal(vresult.z(), 6, "Vector scalar multiplication third element");

        vresult = vresult.divide(4);

        equal(vresult.x(), 4, "Vector scalar division first element");
        equal(vresult.y(), 1, "Vector scalar division second element");
        equal(vresult.z(), 1.5, "Vector scalar division third element");
    });

    test("Dot Product", function () {
        var v1 = new Vector(-5, -2),
            v2 = new Vector(-3, 4);

        equal(v1.dot(v2), 7, "2D dot product");

        // Try for a perpendicular.
        v1 = new Vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2);
        v2 = new Vector(-Math.sqrt(2) / 2, Math.sqrt(2) / 2);
        equal(v1.dot(v2), 0, "Perpendicular 2D dot product");

        // Try 3D.
        v1 = new Vector(3, 2, 5);
        v2 = new Vector(4, -1, 3);
        equal(v1.dot(v2), 25, "3D dot product");

        // Check for errors.
        v1 = new Vector(4, 2);
        v2 = new Vector(3, 9, 1);

        // We can actually check for a *specific* exception, but
        // we won't go that far for now.
        raises(
            function () {
                return v1.dot(v2);
            },
            "Check for vectors of different sizes"
        );
    });

    test("Cross Product", function () {
        var v1 = new Vector(3, 4),
            v2 = new Vector(1, 2),
            vresult;

        // The cross product is restricted to 3D, so we start
        // with an error check.
        raises(
            function () {
                return v1.cross(v2);
            },
            "Check for non-3D vectors"
        );

        // Yeah, this is a bit of a trivial case.  But it at least
        // establishes the right-handedness of a cross-product.
        v1 = new Vector(1, 0, 0);
        v2 = new Vector(0, 1, 0);
        vresult = v1.cross(v2);

        equal(vresult.x(), 0, "Cross product first element");
        equal(vresult.y(), 0, "Cross product second element");
        equal(vresult.z(), 1, "Cross product third element");

        // This one shows that switching vector order produces
        // the opposite-pointing normal.
        vresult = v2.cross(v1);

        equal(vresult.x(), 0, "Cross product first element");
        equal(vresult.y(), 0, "Cross product second element");
        equal(vresult.z(), -1, "Cross product third element");
    });

    test("Magnitude and Unit Vectors", function () {
        var v = new Vector(3, 4);

        // The classic example.
        equal(v.magnitude(), 5, "2D magnitude check");

        // Kind of a cheat, but still tests the third dimension.
        v = new Vector(5, 0, 12);
        equal(v.magnitude(), 13, "3D magnitude check");

        // Now for unit vectors.
        v = (new Vector(3, 4)).unit();

        equal(v.magnitude(), 1, "2D unit vector check");
        equal(v.x(), 3 / 5, "2D unit vector first element");
        equal(v.y(), 4 / 5, "2D unit vector second element");

        v = (new Vector(0, -7, 24)).unit();

        equal(v.magnitude(), 1, "3D unit vector check");
        equal(v.x(), 0, "3D unit vector first element");
        equal(v.y(), -7 / 25, "3D unit vector second element");
        equal(v.z(), 24 / 25, "3D unit vector third element");
    });

    test("Projection", function () {
        var v = new Vector(3, 3, 0),
            vresult = v.projection(new Vector(5, 0, 0));

        equal(vresult.magnitude(), 3, "3D vector projection magnitude check");
        equal(vresult.x(), 3, "3D vector projection first element");
        equal(vresult.y(), 0, "3D vector projection second element");
        equal(vresult.z(), 0, "3D vector projection third element");

        // Error check: projection only applies to vectors with the same
        // number of dimensions.
        raises(
            function () {
                (new Vector(5, 2)).projection(new Vector(9, 8, 1));
            },
            "Ensure that projection applies only to vectors with the same number of dimensions"
        );
    });
*/
});
