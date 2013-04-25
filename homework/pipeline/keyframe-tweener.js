/*
 * A simple keyframe-tweening animation module for 2D
 * canvas elements.
 */
var KeyframeTweener = {
    // The module comes with a library of common easing functions.
    linear: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete + start;
    },

    quadEaseIn: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return distance * percentComplete * percentComplete + start;
    },

    quadEaseOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / duration;
        return -distance * percentComplete * (percentComplete - 2) + start;
    },

    quadEaseInAndOut: function (currentTime, start, distance, duration) {
        var percentComplete = currentTime / (duration / 2);
        return (percentComplete < 1) ?
                (distance / 2) * percentComplete * percentComplete + start :
                (-distance / 2) * ((percentComplete - 1) * (percentComplete - 3) - 1) + start;
    },

    // Adaptation of https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
    easeOutElastic: function (currentTime, start, distance, duration) {
        var s = 1.70158,
            p = 0,
            a = distance;
        if (currentTime == 0) return start;
        if ((currentTime /= duration) == 1) return (start + distance);
        if (!p) p = duration * 0.3;
        if (a < Math.abs(distance)) { 
            a = distance;
            var s = (p / 4);
        }
        else var s = p / (2 * Math.PI) * Math.asin (distance / a);
        return a * Math.pow(2, -10 * currentTime) * Math.sin((currentTime * duration - s) * (2 * Math.PI) / p) + distance + start;
    },

    // Adaptation of https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
    easeInElastic: function (currentTime, start, distance, duration) {
        var s = 1.70158;
            p = 0;
            a = distance;
        if (currentTime == 0) return start;
        if ((currentTime /= duration) == 1) return start + distance;
        if (!p) p = duration * 0.3;
        if (a < Math.abs(distance)) {
            a = distance;
            var s = (p / 4);
        }
        else var s = p / (2 * Math.PI) * Math.asin (distance / a);
        return -(a * Math.pow(2, 10 * (currentTime -= 1)) * Math.sin((currentTime * duration - s) * (2 * Math.PI) / p)) + start;
    },

    // Adaptation of https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
    easeOutBounce: function (currentTime, start, distance, duration) {
        if ((currentTime /= duration) < (1 / 2.75)) {
            return distance * (7.5625 * currentTime * currentTime) + start;
        } else if (currentTime < (2/2.75)) {
            return distance * (7.5625 * (currentTime -= (1.5 / 2.75)) * currentTime + 0.75) + start;
        } else if (currentTime < (2.5/2.75)) {
            return distance * (7.5625 * (currentTime -= (2.25 / 2.75)) * currentTime + 0.9375) + start;
        } else {
            return distance * (7.5625 * (currentTime -= (2.625 / 2.75)) * currentTime + 0.984375) + start;
        }
    },


    // The big one: animation initialization.  The settings parameter
    // is expected to be a JavaScript object with the following
    // properties:
    //
    // - renderingContext: the 2D canvas rendering context to use
    // - width: the width of the canvas element
    // - height: the height of the canvas element
    // - objectsToDraw: the array of objectsToDraw to animate
    // - frameRate: number of frames per second (default 24)
    //
    // In turn, each objectsToDrawis a JavaScript object with the following
    // properties:
    //
    // - draw: the function that draws the objectsToDraw    // - keyframes: the array of keyframes that the objectsToDrawshould follow
    //
    // Finally, each keyframe is a JavaScript object with the following
    // properties.  Unlike the other objects, defaults are provided in
    // case a property is not present:
    //
    // - frame: the global animation frame number in which this keyframe
    //          it to appear
    // - ease: the easing function to use (default is KeyframeTweener.linear)
    // - tx, ty: the location of the objectsToDraw(default is 0, 0)
    // - sx, sy: the scale factor of the objectsToDraw(default is 1, 1)
    // - rotate: the rotation angle of the objectsToDraw(default is 0)
    //
    // Initialization primarily calls setInterval on a custom-built
    // frame-drawing (and updating) function.
    initialize: function (settings) {
        // We need to keep track of the current frame.
        var currentFrame = 0,

            // Avoid having to go through settings to get to the
            // rendering context and objectsToDraw.
            renderingContext = settings.renderingContext,
            width = settings.width,
            height = settings.height,
            objectsToDraw = settings.objectsToDraw;

        setInterval(function () {
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
                    // for (var k = 0; k < 2; k++) {
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
                        txStart = startKeyframe.tx || 0;
                        txDistance = (endKeyframe.tx || 0) - txStart;
                        tyStart = startKeyframe.ty || 0;
                        tyDistance = (endKeyframe.ty || 0) - tyStart;
                        sxStart = startKeyframe.sx || 1;
                        sxDistance = (endKeyframe.sx || 1) - sxStart;
                        syStart = startKeyframe.sy || 1;
                        syDistance = (endKeyframe.sy || 1) - syStart;
                        rotateStart = (startKeyframe.rotate || 0) * Math.PI / 180;
                        rotateDistance = (endKeyframe.rotate || 0) * Math.PI / 180 - rotateStart;
                        currentTweenFrame = currentFrame - startKeyframe.frame;
                        duration = endKeyframe.frame - startKeyframe.frame + 1;
                        opacityStart = startKeyframe.opacity || 1;
                        opacityEnd = (endKeyframe.opacity || 1) - opacityStart;
                        opacityDistance = (endKeyframe.opacity || 1) - opacityStart;

                        // Build our transform according to where we should be.
                        renderingContext.translate(
                            ease(currentTweenFrame, txStart, txDistance, duration),
                            ease(currentTweenFrame, tyStart, tyDistance, duration)
                        );
                        renderingContext.scale(
                            ease(currentTweenFrame, sxStart, sxDistance, duration),
                            ease(currentTweenFrame, syStart, syDistance, duration)
                        );
                        renderingContext.rotate(
                            ease(currentTweenFrame, rotateStart, rotateDistance, duration)
                        );
                        renderingContext.globalAlpha = ease(currentTweenFrame, opacityStart, opacityDistance, duration);
                        
                        // Draw the objectsToDraw
                        objectsToDraw[i].draw(renderingContext);

                        // Clean up.
                        renderingContext.restore();
                    }
                }
            }

            // Move to the next frame.
            currentFrame += 1;

        }, 1000 / (settings.frameRate || 30));
    }
};
