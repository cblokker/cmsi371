/*
 * A matrix library for Matrix4x4 objects.
 */
var Matrix4x4 = (function () {
    // Define the constructor.
    var matrix4x4 = function () {
        this.elements = arguments.length ?
            [].slice.call(arguments) :

            [1, 0, 0, 0,
             0, 1, 0, 0,
             0, 0, 1, 0,
             0, 0, 0, 1];
    };

    /*
     * Multiply function which multiplies two Matrix4x4 objects and returns the result
     */
    matrix4x4.prototype.multiply = function (m) {
        var mRow,
            thisCollumn,
            mCollumn,
            sum,
            count = 0,
            result = new Matrix4x4(),
            mDimention = m.elements.length / 4,
            thisDimention = this.elements.length / 4;

        for (mRow = 0; mRow < mDimention; mRow += 1) {
            for (thisCollumn = 0; thisCollumn < thisDimention; thisCollumn += 1) {
                sum = 0;

                for (mCollumn = 0; mCollumn < mDimention; mCollumn += 1) {
                    sum += m.elements[mCollumn + (mRow * mDimention)] *
                        this.elements[(mCollumn * thisDimention) + thisCollumn];
                }
                result.elements[count] = sum;
                count += 1;
            }    
        }

        return result;
    };

    /* 
     * A translation function which takes three parameters dx, dy, and dz, returning a
     * Matrix4x4 object that accurately represents this transformation.
     */
    matrix4x4.translate = function (tx, ty, tz) {
        return new Matrix4x4(
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        );
    };

    /*
     * A scale function which takes three parameters sx, sy, and sz, returning a
     * Matrix4x4 object that accurately represents this transformation.
     */
    matrix4x4.scale = function (sx, sy, sz) {
        return new Matrix4x4(
            sx,  0,  0, 0,
             0, sy,  0, 0,
             0,  0, sz, 0,
             0,  0,  0, 1
        );
    };

    /*
     * The rotate funtion given in the sample code, but refactored to fit the
     * Matrix4x4 object.
     */
    matrix4x4.rotate = function (angle, x, y, z) {
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

    /* 
     * The ortho projection function given in the sample code, but refactored to fit
     * the Matrix4x4 object.
     */
    matrix4x4.ortho = function (left, right, bottom, top, zNear, zFar) {
        var width = right - left,
            height = top - bottom,
            depth = zFar - zNear;

        return new Matrix4x4(
            2.0 / width,          0.0,          0.0,  -(right + left) / width,
                    0.0, 2.0 / height,          0.0, -(top + bottom) / height,
                    0.0,          0.0, -2.0 / depth,  -(zFar + zNear) / depth,
                    0.0,          0.0,          0.0,                      1.0
        );
    };

    /*
     * A frustum projection function based on the matrix derived from the course handout.
     */
    matrix4x4.frustum = function (left, right, bottom, top, zNear, zFar) {
        var N = zNear,
            F = zFar,
            width = right - left,
            height = top - bottom,
            depth = zFar - zNear,
            alpha = -(F + N) / (F - N),
            beta = -(2 * N * F) / (F - N);
            
        return new Matrix4x4(
            (2.0 * N)/ width,                0.0,  (right + left) / width,  0.0,
                         0.0, (2.0 * N) / height, (top + bottom) / height,  0.0, 
                         0.0,                0.0,                   alpha, beta,
                         0.0,                0.0,                    -1.0,  0.0
        );
    };

    /*
     * Conversion/convenience function to prepare the matrix data afor direct consumption
     * by WebGL and GLSL.
     */
    matrix4x4.prototype.toWebGLMatrix = function () {
        var result = new Matrix4x4(),
            i,
            j,
            count = 0;

        for (j = 0; j < 4; j += 1) {
            for (i = 0; i < 4; i += 1) {
                result.elements[count] = this.elements[i * 4 + j];
                count += 1;
            }
        }

        return result;
    };

    /* 
     * Combine the scale, rotate, and translate matrix transforms into one.
     */
    matrix4x4.instanceTransform = function (transform) {
        var translate = new Matrix4x4(),
            scale = new Matrix4x4(),
            rotate = new Matrix4x4();

        translate = Matrix4x4.translate(
            transform.tx || 0,
            transform.ty || 0,
            transform.tz || 0
        );

        scale = Matrix4x4.scale(
            transform.sx || 1,
            transform.sy || 1,
            transform.sz || 1
        );

        rotate = Matrix4x4.rotate(
            transform.angle || 0,
            transform.rx || 0,
            transform.ry || 0,
            transform.rz || 0
        );

        return translate.multiply(scale.multiply(rotate));
    }

    return matrix4x4;
})();