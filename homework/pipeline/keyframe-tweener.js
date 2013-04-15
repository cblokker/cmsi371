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
    // - sprites: the array of sprites to animate
    // - frameRate: number of frames per second (default 24)
    //
    // In turn, each sprite is a JavaScript object with the following
    // properties:
    //
    // - draw: the function that draws the sprite
    // - keyframes: the array of keyframes that the sprite should follow
    //
    // Finally, each keyframe is a JavaScript object with the following
    // properties.  Unlike the other objects, defaults are provided in
    // case a property is not present:
    //
    // - frame: the global animation frame number in which this keyframe
    //          it to appear
    // - ease: the easing function to use (default is KeyframeTweener.linear)
    // - tx, ty: the location of the sprite (default is 0, 0)
    // - sx, sy: the scale factor of the sprite (default is 1, 1)
    // - rotate: the rotation angle of the sprite (default is 0)
    //
    // Initialization primarily calls setInterval on a custom-built
    // frame-drawing (and updating) function.
    initialize: function (settings) {
        // We need to keep track of the current frame.
        var currentFrame = 0,

            // Avoid having to go through settings to get to the
            // rendering context and sprites.
            renderingContext = settings.renderingContext,
            width = settings.width,
            height = settings.height,
            sprites = settings.sprites;

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

            // Draw the canvas.

            // JD: This wasn't separated right.  Note that this background is specific
            //     to your scene.  This code should actually be in the demo file, then
            //     *passed* into KeyframeTweener as a parameter.  This way, you keep
            //     the animation library reusable and other scenes can be built from
            //     it with different backgrounds.

            linearSkyGradient = renderingContext.createLinearGradient(0, 0, 0, 300);
            linearGrassGradient = renderingContext.createLinearGradient(0, 300, 0, 425);

            linearSkyGradient.addColorStop(1, 'grey');
            linearSkyGradient.addColorStop(0, 'blue');

            linearGrassGradient.addColorStop(0, '#003300');
            linearGrassGradient.addColorStop(1, 'green');

            renderingContext.fillStyle = linearSkyGradient;
            renderingContext.fillRect(0, 0, width, height * ( 2 / 3));

            renderingContext.fillStyle = linearGrassGradient;
            renderingContext.fillRect(0, height * ( 2 / 3), width, height);

            renderingContext.strokeStyle = 'black';
            renderingContext.strokeRect(29, 34, (width / 2) - 66, 12);
            renderingContext.strokeRect(29 + (width / 2), 34, (width / 2) - 66, 12);

            // For every sprite, go to the current pair of keyframes.
            // Then, draw the sprite based on the current frame.
            for (i = 0, maxI = sprites.length; i < maxI; i += 1) {                
                for (j = 0, maxJ = sprites[i].keyframes.length - 1; j < maxJ; j += 1) {
                    // for (var k = 0; k < 2; k++) {
                    // We look for keyframe pairs such that the current
                    // frame is between their frame numbers.
                    if ((sprites[i].keyframes[j].frame <= currentFrame) &&
                            (currentFrame <= sprites[i].keyframes[j + 1].frame)) {
                        // Point to the start and end keyframes.
                        startKeyframe = sprites[i].keyframes[j];
                        endKeyframe = sprites[i].keyframes[j + 1];

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
                        
                        // Draw the sprite.

                        // JD: OK, there is a misunderstanding here in terms of how the draw array
                        //     was to be used.  This also explains why your demo code forced one
                        //     draw function per keyframe.  They should actually be independent,
                        //     the inner animation "looping" on its own while the tweening was
                        //     happening (for reference, see the Pacman cut scene---note how Pacman
                        //     opens/closes his mouth repeatedly even while moving along.
                        //
                        //     It is clear, though, that your code worked as you intended; the
                        //     gap was in understanding the requested functionality.

                        sprites[i].draw[j](renderingContext);

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
