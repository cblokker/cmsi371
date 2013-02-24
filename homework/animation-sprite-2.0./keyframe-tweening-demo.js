/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // For the animated characters, each image lasts for below length
        CHARACTER_FRAME_INTERVAL = 5;

        // Below consists of the image functions for drawing the kilt guy.
        // Note that some images are scaled and/or translated specific amounts
        // for smooth transitions between animated images.
        //
        // JD: I can understand why your applied sort of "universal" transforms
        //     to your sprites at this level, and that works out fine for the
        //     scope of your scene.  Just keep in mind that when performance is
        //     truly an issue, you will probably want to (a) pre-scale your image
        //     assets to begin with, so that they don't need to be scaled every
        //     time, and (b) pre-load them into Image objects beforehand, so
        //     that you don't have to recreate them at every frame (which is
        //     what you are effectively doing here).
        //
        //     This stuff adds up more quickly than it might seem.
        kilt1 = function (renderingContext) {
            var kilt1 = new Image();
            kilt1.src = 'kilt_pictures/kilt_fireball_1.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(12, 10);
            renderingContext.drawImage(kilt1, 0, 0);
        },

        kilt2 = function (renderingContext) {
            var kilt2 = new Image();
            kilt2.src = 'kilt_pictures/kilt_fireball_2.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(12, 10);
            renderingContext.drawImage(kilt2, 0, 0);
        },

        kilt3 = function (renderingContext) {
            var kilt3 = new Image();
            kilt3.src = 'kilt_pictures/kilt_fireball_3.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(12, 10);
            renderingContext.drawImage(kilt3, 0, 0);
        },

        kilt4 = function (renderingContext) {
            var kilt4 = new Image();
            kilt4.src = 'kilt_pictures/kilt_fireball_4.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(12, 10);
            renderingContext.drawImage(kilt4, 0, 0);
        },

        kiltwalk1 = function (renderingContext) {
            var kiltwalk1 = new Image();
            kiltwalk1.src = 'kilt_pictures/kiltwalk_1.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(5, 5);
            renderingContext.drawImage(kiltwalk1, 0, 0);
        },

        kiltwalk2 = function (renderingContext) {
            var kiltwalk2 = new Image();
            kiltwalk2.src = 'kilt_pictures/kiltwalk_2.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(5, 5);
            renderingContext.drawImage(kiltwalk2, 0, 0);
        },

        kiltwalk3 = function (renderingContext) {
            var kiltwalk3 = new Image();
            kiltwalk3.src = 'kilt_pictures/kiltwalk_3.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(5, 5);
            renderingContext.drawImage(kiltwalk3, 0, 0);
        },

        kiltwalk4 = function (renderingContext) {
            var kiltwalk4 = new Image();
            kiltwalk4.src = 'kilt_pictures/kiltwalk_4.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, 5);
            renderingContext.drawImage(kiltwalk4, 0, 0);
        },

        kiltStanding1 = function (renderingContext) {
            var kiltStanding1 = new Image();
            kiltStanding1.src = 'kilt_pictures/kilt_standing_1.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, 5);
            renderingContext.drawImage(kiltStanding1, 0, 0);
            
        },

        kiltStanding2 = function (renderingContext) {
            var kiltStanding2 = new Image();
            kiltStanding2.src = 'kilt_pictures/kilt_standing_2.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltStanding2, 0, 0);
            
        },

        kiltStanding3 = function (renderingContext) {
            var kiltStanding3 = new Image();
            kiltStanding3.src = 'kilt_pictures/kilt_standing_3.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, -3);
            renderingContext.drawImage(kiltStanding3, 0, 0);
            
        },

        kiltStanding4 = function (renderingContext) {
            var kiltStanding4 = new Image();
            kiltStanding4.src = 'kilt_pictures/kilt_standing_4.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltStanding4, 0, 0);
            
        },

        kiltStanding5 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'kilt_pictures/kilt_standing_5.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        kiltJump1 = function (renderingContext) {
            var kiltJump1 = new Image();
            kiltJump1.src = 'kilt_pictures/kilt_jump_1.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, 15);
            renderingContext.drawImage(kiltJump1, 0, 0);
        },

        kiltJump2 = function (renderingContext) {
            var kiltJump2 = new Image();
            kiltJump2.src = 'kilt_pictures/kilt_jump_2.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, 15);
            renderingContext.drawImage(kiltJump2, 0, 0);
        },

        kiltJump3 = function (renderingContext) {
            var kiltJump3 = new Image();
            kiltJump3.src = 'kilt_pictures/kilt_jump_3.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltJump3, 0, 0);
        },

        kiltJump4 = function (renderingContext) {
            var kiltJump4 = new Image();
            kiltJump4.src = 'kilt_pictures/kilt_jump_4.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltJump4, 0, 0);
        },

        kiltJump5 = function (renderingContext) {
            var kiltJump5 = new Image();
            kiltJump5.src = 'kilt_pictures/kilt_jump_5.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltJump5, 0, 0);
        },

        kiltJump6 = function (renderingContext) {
            var kiltJump6 = new Image();
            kiltJump6.src = 'kilt_pictures/kilt_jump_6.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, -20);
            renderingContext.drawImage(kiltJump6, 0, 0);
        },


        // Below consists of the image functions for drawing the street fighter guy.
        streetFighter1 = function (renderingContext) {
            var streetFighter1 = new Image();
            streetFighter1.src = 'streetfighter_pictures/street_fighter_standing_1.png';
            renderingContext.drawImage(streetFighter1, 0, 0);
        },

        streetFighter2 = function (renderingContext) {
            var streetFighter2= new Image();
            streetFighter2.src = 'streetfighter_pictures/street_fighter_standing_2.png';
            renderingContext.drawImage(streetFighter2, 0, 0);
        },

        streetFighter3 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'streetfighter_pictures/street_fighter_standing_3.png';
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        streetFighterFall1 = function (renderingContext) {
            var streetFighterFall1 = new Image();
            streetFighterFall1.src = 'streetfighter_pictures/streetfighter_fall_1.png';
            renderingContext.drawImage(streetFighterFall1, 0, 0);
        },

        streetFighterFall2 = function (renderingContext) {
            var streetFighterFall2 = new Image();
            streetFighterFall2.src = 'streetfighter_pictures/streetfighter_fall_2.png';
            renderingContext.drawImage(streetFighterFall2, 0, 0);
        },

        streetFighterFall3 = function (renderingContext) {
            var streetFighterFall3 = new Image();
            streetFighterFall3.src = 'streetfighter_pictures/streetfighter_fall_3.png';
            renderingContext.drawImage(streetFighterFall3, 0, 0);
        },

        streetFighterFall4 = function (renderingContext) {
            var streetFighterFall4 = new Image();
            streetFighterFall4.src = 'streetfighter_pictures/streetfighter_fall_4.png';
            renderingContext.translate(0, 20);
            renderingContext.drawImage(streetFighterFall4, 0, 0);
        },

        streetFighterGetup1 = function (renderingContext) {
            var streetFighterGetup1 = new Image();
            streetFighterGetup1.src = 'streetfighter_pictures/streetfighter_getup_1.png';
            renderingContext.drawImage(streetFighterGetup1, 0, 0);
        },

        streetFighterGetup2 = function (renderingContext) {
            var streetFighterGetup2 = new Image();
            streetFighterGetup2.src = 'streetfighter_pictures/streetfighter_getup_2.png';
            renderingContext.drawImage(streetFighterGetup2, 0, 0);
        },

        streetFighterGetup3 = function (renderingContext) {
            var streetFighterGetup3 = new Image();
            streetFighterGetup3.src = 'streetfighter_pictures/streetfighter_getup_3.png';
            renderingContext.drawImage(streetFighterGetup3, 0, 0);
        },

        streetFighterSlide1 = function (renderingContext) {
            var streetFighterSlide1 = new Image();
            streetFighterSlide1.src = 'streetfighter_pictures/streetfighter_slide_1.png';
            renderingContext.drawImage(streetFighterSlide1, 0, 0);
        },

        streetFighterSlide2 = function (renderingContext) {
            var streetFighterSlide2 = new Image();
            streetFighterSlide2.src = 'streetfighter_pictures/streetfighter_slide_2.png';
            renderingContext.drawImage(streetFighterSlide2, 0, 0);
        },

        streetFighterSlide3 = function (renderingContext) {
            var streetFighterSlide3 = new Image();
            streetFighterSlide3.src = 'streetfighter_pictures/streetfighter_slide_3.png';
            renderingContext.drawImage(streetFighterSlide3, 0, 0);
        },


        // And here are some miscellaneous image functions
        fight = function (renderingContext) {
            var fight = new Image();
            fight.src = 'misc_pictures/fight.png';
            renderingContext.drawImage(fight, 0, 0);
        },

        kanjiLove = function (renderingContext) {
            var kanjiLove = new Image();
            kanjiLove.src = 'misc_pictures/kanji_love.png';
            renderingContext.scale(0.7, 0.7);
            renderingContext.drawImage(kanjiLove, 0, 0);
        },
        
        // This drawing function was taken from the previous assignment (0129)
        spiral = function (renderingContext) {

            var numOfRings = 55,
                colorStop = [0, 25, 50, 75, 100, 125, 150, 175],
                colorName = ['red','orange','yellow','green','blue','indigo','violet'];

            // Background color
            renderingContext.fillStyle = 'transparent';
            renderingContext.fillRect (0, 0, 512, 512);

            // Loop through rings
            for (var i = 0; i < numOfRings; i++) {

                // slowly increase the size of the circular dots for every ring itteration
                renderingContext.scale(1.05,1.05);

                // Draw individual dots
                for (var j = 4; j < (i * 6); j++) {

                    //create rainbow appearance for dots
                    for (var k = 0; k <= colorName.length; k++) {
                        if ((j > colorStop[k]) && (j <= colorStop[k + 1])) {
                            renderingContext.fillStyle = colorName[k];
                        }
                    }

                    renderingContext.rotate(Math.PI * 2 / (i * 6));
                    renderingContext.beginPath();
                    renderingContext.arc(0, i, 0.5, 0, Math.PI * 2, true);
                    renderingContext.fill();
                }
            }
        }

        // JD: Missed some commas here.  Fortunately, JavaScript recovers fine,
        //     but remember to keep track of this.

        healthBar = function (renderingContext) {
            renderingContext.fillStyle = 'red';
            renderingContext.fillRect (0, 0, 188, 10);            
        }

        fireball = function (renderingContext) {
            radialGradient = renderingContext.createRadialGradient(0, 0, 1, 0, 0, 10);
            radialGradient.addColorStop(0, "red");
            radialGradient.addColorStop(1, "yellow");
            
            renderingContext.beginPath();
            renderingContext.scale(1.75, 1);
            renderingContext.arc(0, 0,  7, 0, Math.PI * 2);
            renderingContext.fillStyle = radialGradient;
            renderingContext.fill();
        },

        // I decided to break up the sprites into "moves" for easy manipulation, where each move
        // is to be called by its corresponding "move" function.

        // Since the draw arrays and keyframe object arrays of the sprites are inherently linked together,
        // I decided to create functions that returns both .draw and .keyFrame for specific sprite "moves".

        // JD: Nice approach; good move.

        streetFighterStanding = function (startFrame, endFrame, tx, ty) {
            var draw = [],
                keyFrame = [],
                frameNumber,
                i;

            // each image lasts for lenght of CHARACTER_FRAME_INTERVAL
            startFrame = startFrame / CHARACTER_FRAME_INTERVAL;
            endFrame = endFrame / CHARACTER_FRAME_INTERVAL;

            for (frameNumber = startFrame; frameNumber < endFrame; frameNumber += 1) {
                keyFrame.push({frame: frameNumber * CHARACTER_FRAME_INTERVAL, tx: tx, ty: ty});

            }

            // append the streetfigherStanding image fucntions to draw array
            for(i = 0; i < 10; i += 1) {
                draw.push(streetFighter1, streetFighter2, streetFighter3, streetFighter2);
            }

            return {
                draw: draw, 
                keyFrame: keyFrame
            };
        },

        kiltGuyStanding = function (startFrame, endFrame, tx, ty) {
            var draw = [],
                keyFrame = [],
                frameNumber,
                i;

            // each image lasts for lenght of CHARACTER_FRAME_INTERVAL
            startFrame = startFrame / CHARACTER_FRAME_INTERVAL;
            endFrame = endFrame / CHARACTER_FRAME_INTERVAL;

            for (frameNumber = startFrame; frameNumber < endFrame; frameNumber += 1) {
                keyFrame.push({frame: frameNumber * CHARACTER_FRAME_INTERVAL, tx: tx, ty: ty});

            }

            // append the streetfigherStanding image fucntions to draw array
            for(i = 0; i < 10; i += 1) {
                draw.push(kiltStanding1, kiltStanding2, kiltStanding3, kiltStanding4, kiltStanding5);
            }

            return {
                draw: draw, 
                keyFrame: keyFrame
            };
        },

        kiltGuyWalking = function (startFrame, endFrame, tx, ty) {
            var draw = [],
                keyFrame = [],
                frameNumber,
                i;

            // each image lasts for lenght of CHARACTER_FRAME_INTERVAL
            startFrame = startFrame / CHARACTER_FRAME_INTERVAL;
            endFrame = endFrame / CHARACTER_FRAME_INTERVAL;

            for (frameNumber = startFrame, i = 0; frameNumber < endFrame; frameNumber += 1, i += 1) {
                keyFrame.push({frame: frameNumber * CHARACTER_FRAME_INTERVAL, tx: tx + i * 10, ty: ty});

            }

            // append the streetfigherStanding image fucntions to draw array
            for(i = 0; i <= 10; i += 1) {
                draw.push(kiltwalk1, kiltwalk2, kiltwalk3, kiltwalk4);
            }

            return {
                draw: draw, 
                keyFrame: keyFrame
            };
        },


        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [

            // Initial Kanji symbols
            // JD: I'm not clear about this---why the repeated draw functions when they
            //     are all the same?  It appears that you think the inner animation must
            //     match the number of keyframes; they should actually be independent.
            {
                draw: [fight, fight, fight],
                keyframes: [
                    {
                        frame: 0,
                        tx: 50,
                        ty: 50,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.easeOutElastic
                    },

                    {
                        frame: 50,
                        tx: 200,
                        ty: 60,
                        sx: 1,
                        sy: 1,
                        ease: KeyframeTweener.easeInElastic
                    },

                    {
                        frame: 100,
                        tx: 50,
                        ty: 50,
                        sx: 0.5,
                        sy: 0.5,
                    },
                ]
            },

            // Left health bar
            {
                draw: [healthBar, healthBar, healthBar],
                keyframes: [
                    {
                        frame: 0,
                        tx: 30,
                        ty: 35,
                    },

                    {
                        frame: 325,
                        tx: 30,
                        ty: 35,
                        ease: KeyframeTweener.easeOutBounce
                    },

                    {
                        frame: 500,
                        tx: 30,
                        ty: 35,
                        opacity: 0.01,
                    },
                ]
            },

            // Right health bar
            {
                draw: [healthBar, healthBar, healthBar, healthBar],
                keyframes: [
                    {
                        frame: 0,
                        tx: 286,
                        ty: 35,
                    },

                    {
                        frame: 110,
                        tx: 286,
                        ty: 35,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 130,
                        tx: 286,
                        ty: 35,
                        sx: 0.8,
                        sy: 1
                    },

                    {
                        frame: 325,
                        tx: 286,
                        ty: 35,
                        sx: 0.8,
                        sy: 1,
                        ease: KeyframeTweener.easeOutBounce
                    },

                    {
                        frame: 500,
                        tx: 286,
                        ty: 35,
                        sx: 0.8,
                        sy: 1,
                        opacity: 0.01
                    },

                ]
            },

            // Streetfighter standing
            {
                draw:  streetFighterStanding().draw,
                keyframes: streetFighterStanding(0, 110, 330, 380).keyFrame
            },


            // Kilt guy standing
            {
                draw:  kiltGuyStanding().draw,
                keyframes: kiltGuyStanding(0, 75, 130, 380).keyFrame
            },

            //KiltLift fireball move 
            {
                draw: [fireball, fireball, kilt1, kilt2, kilt3, kilt4, kilt3, kilt2, kilt1],
                keyframes: [
                    {
                        frame: 85,
                        tx: 180,
                        ty: 440,
                        ease: KeyframeTweener.quadEaseIn
                    },

                    {
                        frame: 105,
                        tx: 340,
                        ty: 440,
                    },

                    {
                        frame: 115,
                        tx: 340,
                        ty: 440,
                        sx: 0.1,
                        sy: 3
                    },

                    {
                        frame: 70,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 75,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 80,
                        tx: 130,
                        ty: 380,
                    },
                    
                    {
                        frame: 110,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 115,
                        tx: 130,
                        ty: 380,
                    },
                    
                    {
                        frame: 120,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 125,
                        tx: 130,
                        ty: 380,
                    },
                ]
            },

            // Kilt guy walking left to right
            {
                draw: kiltGuyWalking().draw,
                keyframes: kiltGuyWalking(125, 190, 130, 380).keyFrame
            },

            // Streetfighter falling
            {
                draw: [streetFighterFall2, streetFighterFall3, streetFighterFall4, streetFighterFall4],
                keyframes: [
                    {
                        frame: 105,
                        tx: 330,
                        ty: 380,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 110,
                        tx: 350,
                        ty: 380,
                    },

                    {
                        frame: 115,
                        tx: 370,
                        ty: 390,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 130,
                        tx: 400,
                        ty: 400,
                    },

                    {
                        frame: 165,
                        tx: 400,
                        ty: 400,
                    },
                ]
            },

            // Streetfighter getting up
            {
                draw: [streetFighterGetup1, streetFighterGetup2, streetFighterGetup3],
                keyframes: [
                    {
                        frame: 165,
                        tx: 400,
                        ty: 400,
                    },

                    {
                        frame: 170,
                        tx: 400,
                        ty: 400,
                    },

                    {
                        frame: 175,
                        tx: 400,
                        ty: 400,
                    },

                    {
                        frame: 190,
                        tx: 400,
                        ty: 400,
                    },
                ]
            },

            // Streetfighter low kick
            {
                draw: [streetFighterSlide1, streetFighterSlide2, streetFighterSlide3, streetFighterSlide3, streetFighterSlide1],
                keyframes: [
                    {
                        frame: 190,
                        tx: 400,
                        ty: 400,
                    },

                    {
                        frame: 195,
                        tx: 380,
                        ty: 400,
                    },

                    {
                        frame: 200,
                        tx: 360,
                        ty: 400,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 215,
                        tx: 280,
                        ty: 400,
                    },

                    {
                        frame: 225,
                        tx: 280,
                        ty: 400,
                        ease: KeyframeTweener.easeOutBounce
                    },

                    {
                        frame: 300,
                        tx: 280,
                        ty: 400,
                        opacity: 0.01
                    },
                ]
            },

            // Kilt guy jumps
            {
                draw: [kiltJump1, kiltJump2, kiltJump3, kiltJump4, kiltJump5, kiltJump6,
                kiltJump1, kiltJump2, kiltJump2, kiltStanding1],
                keyframes: [
                    {
                        frame: 185,
                        tx: 250,
                        ty: 380,
                    },

                    {
                        frame: 190,
                        tx: 250,
                        ty: 380,
                    },

                    {
                        frame: 195,
                        tx: 250,
                        ty: 380,
                    },

                    {
                        frame: 200,
                        tx: 250,
                        ty: 380,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 210,
                        tx: 300,
                        ty: 300,
                        
                    },

                    {
                        frame: 215,
                        tx: 310,
                        ty: 300,
                        ease: KeyframeTweener.quadEaseIn
                    },

                    {
                        frame: 225,
                        tx: 360,
                        ty: 380,
                    },

                    {
                        frame: 230,
                        tx: 370,
                        ty: 380,
                    },

                    {
                        frame: 235,
                        tx: 370,
                        ty: 380,
                    },

                    {
                        frame: 240,
                        tx: 370,
                        ty: 380,
                    },

                    {
                        frame: 245,
                        tx: 370,
                        ty: 380,
                    },
                ]
            },

            // Kilt guy walks off screen
            {
                draw: kiltGuyWalking().draw,
                keyframes: kiltGuyWalking(245, 320, 370, 380).keyFrame
            },

            {
                draw: [spiral, spiral, kanjiLove, kanjiLove, kanjiLove, kanjiLove, kanjiLove, kanjiLove],
                keyframes: [
                    {
                        frame: 275,
                        tx: 256,
                        ty: 256,
                        sx: 0.01,
                        sy: 0.01,
                        opacity: 0.01,
                        ease: KeyframeTweener.quadEaseIn
                    },

                    {
                        frame: 300,
                        tx: 256,
                        ty: 256,
                        sx: 1,
                        sy: 1,
                        rotate: 360 * 2,
                        opacity: 1,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 325,
                        tx: 256,
                        ty: 256,
                        sx: 0.01,
                        sy: 0.01,
                        rotate: 360 * 2 + 360 * 2,
                        opacity: 0.01,
                    },

                    {
                        frame: 275,
                        tx: 256,
                        ty: 256,
                        sx: 0.01,
                        sy: 0.01,
                        opacity: 0.01,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 325,
                        tx: 256,
                        ty: 256,
                        rotate: 360 * 3,
                        ease: KeyframeTweener.easeInElastic
                    },

                    {
                        frame: 500,
                        tx: 150,
                        ty: 150,
                        sx: 0.2,
                        sy: 0.2,
                        rotate: 360 * 3.8,
                        opacity: 0.01
                    },
                ]
            },
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites
    });
}());