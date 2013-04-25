var Animator = {

	hover: function (shapes, dy, rotation) {
        var i;

        for (i = 0; i < shapes.length; i += 1) {
            shapes[i].transform.angle = rotation;
            shapes[i].transform.dy = dy;
        }
	},

	orbit: function (shapes, rotation, horizontalRadius, verticalRadius) {
	    var i;


	    for (i = 0; i < shapes.length; i += 1) {


	    }

	    return
	},

	getRadii: function (horizontalRadius, verticalRadius) {
		var radii {
			horizontalRadius: horizontalRadius;
			verticalRadius: verticalRadius;
		}

	    if (!(horizontalRadius || verticalRadius)) {
            radii.horizontalRadius = 1;
            radii.verticalRadius = 1;
	    } else if (horizontalRadius && !verticalRadius))  {
	        radii.verticalRadius = radii.horizontalRadius;
        }

		return radii
	}
};