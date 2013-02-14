/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        square = function (renderingContext) {
            renderingContext.fillStyle = "blue";
            renderingContext.fillRect(-20, -20, 40, 40);
        },

        circle = function (renderingContext) {
            renderingContext.filleStyle = "blue";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.fill();
        },

        cube = function (renderingContext) {

        var topLeftBackCoordinate = [50, 0],
            topLeftFrontCoordinate = [100, 50],
            cubeLength = 150;

            renderingContext.strokeStyle = 'green';
            renderingContext.strokeRect (topLeftBackCoordinate[0], topLeftBackCoordinate[1], cubeLength, cubeLength);
            renderingContext.strokeRect (topLeftFrontCoordinate[0], topLeftFrontCoordinate[1], cubeLength, cubeLength);

            // Connect the corners of the two squares to form a wireframe cube
            for (var i = 0; i <= 1; i++) {
                renderingContext.translate(cubeLength * i, 0);
                renderingContext.beginPath();
                renderingContext.moveTo(topLeftBackCoordinate[0], topLeftBackCoordinate[1]);
                renderingContext.lineTo(topLeftFrontCoordinate[0], topLeftFrontCoordinate[1]);
                renderingContext.moveTo(topLeftFrontCoordinate[0], topLeftFrontCoordinate[1] + cubeLength);
                renderingContext.lineTo(topLeftBackCoordinate[0], topLeftBackCoordinate[1] + cubeLength);
                renderingContext.stroke();
            }
        },

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

        kanjiLove = function (renderingContext) {
            var kanjiLove = new Image();
            kanjiLove.src = 'kanji_love.png';
            renderingContext.drawImage(kanjiLove, 0, 0);
        },

        healthBar = function (renderingContext) {
            renderingContext.fillStyle = 'red';
            renderingContext.fillRect (0, 0, 188, 10);            
        }

        kilt1 = function (renderingContext) {
            var kilt1 = new Image();
            kilt1.src = 'kilt_fireball_1.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(12, 10);
            renderingContext.drawImage(kilt1, 0, 0);
        },

        kilt2 = function (renderingContext) {
            var kilt2 = new Image();
            kilt2.src = 'kilt_fireball_2.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(12, 10);
            renderingContext.drawImage(kilt2, 0, 0);
        },

        kilt3 = function (renderingContext) {
            var kilt3 = new Image();
            kilt3.src = 'kilt_fireball_3.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(12, 10);
            renderingContext.drawImage(kilt3, 0, 0);
        },

        kilt4 = function (renderingContext) {
            var kilt4 = new Image();
            kilt4.src = 'kilt_fireball_4.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(12, 10);
            renderingContext.drawImage(kilt4, 0, 0);
        },

        fireball = function (renderingContext) {

            radialGradient = renderingContext.createRadialGradient(0, 0, 1, 0, 0, 10);
            radialGradient.addColorStop(0, "red");
            radialGradient.addColorStop(1, "yellow");
            
            renderingContext.fillStyle = radialGradient;
            renderingContext.beginPath();
            renderingContext.scale(1.75, 1);
            renderingContext.arc(0, 0,  7, 0, Math.PI * 2);
            renderingContext.fill();
        },

        kiltwalk1 = function (renderingContext) {
            var kiltwalk1 = new Image();
            kiltwalk1.src = 'kiltwalk_1.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(5, 5);
            renderingContext.drawImage(kiltwalk1, 0, 0);
        },

        kiltwalk2 = function (renderingContext) {
            var kiltwalk2 = new Image();
            kiltwalk2.src = 'kiltwalk_2.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(5, 5);
            renderingContext.drawImage(kiltwalk2, 0, 0);
        },

        kiltwalk3 = function (renderingContext) {
            var kiltwalk3 = new Image();
            kiltwalk3.src = 'kiltwalk_3.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(5, 5);
            renderingContext.drawImage(kiltwalk3, 0, 0);
        },

        kiltwalk4 = function (renderingContext) {
            var kiltwalk4 = new Image();
            kiltwalk4.src = 'kiltwalk_4.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, 5);
            renderingContext.drawImage(kiltwalk4, 0, 0);
        },

        streetFighter1 = function (renderingContext) {
            var streetFighter1 = new Image();
            streetFighter1.src = 'street_fighter_standing_1.png';
            renderingContext.drawImage(streetFighter1, 0, 0);
        },

        streetFighter2 = function (renderingContext) {
            var streetFighter2= new Image();
            streetFighter2.src = 'street_fighter_standing_2.png';
            renderingContext.drawImage(streetFighter2, 0, 0);
        },

        streetFighter3 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'street_fighter_standing_3.png';
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        streetFighterFall1 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'streetfighter_fall_1.png';
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        streetFighterFall2 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'streetfighter_fall_2.png';
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        streetFighterFall3 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'streetfighter_fall_3.png';
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        streetFighterFall4 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'streetfighter_fall_4.png';
            renderingContext.translate(0, 20);
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        streetFighterGetup1 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'streetfighter_getup_1.png';
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        streetFighterGetup2 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'streetfighter_getup_2.png';
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        streetFighterGetup3 = function (renderingContext) {
            var streetFighter3 = new Image();
            streetFighter3.src = 'streetfighter_getup_3.png';
            renderingContext.drawImage(streetFighter3, 0, 0);
        },

        kiltStanding1 = function (renderingContext) {
            var kiltStanding1 = new Image();
            kiltStanding1.src = 'kilt_standing_1.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, 5);
            renderingContext.drawImage(kiltStanding1, 0, 0);
            
        },

        kiltStanding2 = function (renderingContext) {
            var kiltStanding2 = new Image();
            kiltStanding2.src = 'kilt_standing_2.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltStanding2, 0, 0);
            
        },

        kiltStanding3 = function (renderingContext) {
            var kiltStanding3 = new Image();
            kiltStanding3.src = 'kilt_standing_3.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, -3);
            renderingContext.drawImage(kiltStanding3, 0, 0);
            
        },

        kiltStanding4 = function (renderingContext) {
            var kiltStanding4 = new Image();
            kiltStanding4.src = 'kilt_standing_4.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltStanding4, 0, 0);
            
        },

        kiltStanding5 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'kilt_standing_5.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        streetFighterLowKick1 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'streetfighter_low_kick_1.png';
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        streetFighterLowKick2 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'streetfighter_low_kick_2.png';
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        streetFighterSlide1 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'streetfighter_slide_1.png';
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        streetFighterSlide2 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'streetfighter_slide_2.png';
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        streetFighterSlide3 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'streetfighter_slide_3.png';
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        kiltJump1 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'kilt_jump_1.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, 15);
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        kiltJump2 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'kilt_jump_2.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, 15);
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        kiltJump3 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'kilt_jump_3.png';
            renderingContext.scale(0.75, 0.75);
            //renderingContext.translate(0, -10);
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        kiltJump4 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'kilt_jump_4.png';
            renderingContext.scale(0.75, 0.75);
            //renderingContext.translate(0, -30);
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        kiltJump5 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'kilt_jump_5.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        kiltJump6 = function (renderingContext) {
            var kiltStanding5 = new Image();
            kiltStanding5.src = 'kilt_jump_6.png';
            renderingContext.scale(0.75, 0.75);
            renderingContext.translate(0, -20);
            renderingContext.drawImage(kiltStanding5, 0, 0);
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [

            // healthBar left
            {
                draw: [healthBar, healthBar],
                keyframes: [
                    {
                        frame: 0,
                        tx: 30,
                        ty: 35,
                    },

                    {
                        frame: 500,
                        tx: 30,
                        ty: 35,
                    },
                ]
            },

            // healthBar right
            {
                draw: [healthBar, healthBar, healthBar],
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
                        frame: 500,
                        tx: 286,
                        ty: 35,
                        sx: 0.8,
                        sy: 1
                    },
                ]
            },

            // Streetfighter standing
            {
                draw: [streetFighter1, streetFighter2, streetFighter3, streetFighter2, 
                       streetFighter1, streetFighter2, streetFighter3, streetFighter2,
                       streetFighter1, streetFighter2, streetFighter3, streetFighter2,
                       streetFighter1, streetFighter2, streetFighter3, streetFighter2,
                       streetFighter1, streetFighter2, streetFighter3, streetFighter2,
                       streetFighter1, streetFighter2, streetFighter3, streetFighter2,
                       streetFighter1, streetFighter2, streetFighter3, streetFighter2,
                       streetFighter1, streetFighter2, streetFighter3, streetFighter2],
                keyframes: [
                    {
                        frame: 0,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 5,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 10,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 15,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 20,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 25,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 30,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 35,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 40,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 45,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 50,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 55,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 60,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 65,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 70,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 75,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 80,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 85,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 90,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 95,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 100,
                        tx: 330,
                        ty: 380,
                    },

                    {
                        frame: 105,
                        tx: 330,
                        ty: 380,
                    },
                ]
            },

           // Kilt guy standing
            {
                draw: [kiltStanding1, kiltStanding2, kiltStanding3, kiltStanding4, kiltStanding5,
                       kiltStanding1, kiltStanding2, kiltStanding3, kiltStanding4, kiltStanding5,
                       kiltStanding1, kiltStanding2, kiltStanding3, kiltStanding4, kiltStanding5,
                       kiltStanding1, kiltStanding2, kiltStanding3, kiltStanding4, kiltStanding5],
                keyframes: [
                    {
                        frame: 0,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 5,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 10,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 15,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 20,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 25,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 30,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 35,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 40,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 45,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 50,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 55,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 60,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 65,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 70,
                        tx: 130,
                        ty: 380,
                    },
                ]
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
                draw: [kiltwalk1, kiltwalk2, kiltwalk3, kiltwalk4,
                       kiltwalk1, kiltwalk2, kiltwalk3, kiltwalk4,
                       kiltwalk1, kiltwalk2, kiltwalk3, kiltwalk4,
                       kiltwalk1, kiltwalk2, kiltwalk3, kiltwalk4,
                       kiltwalk1, kiltwalk2, kiltwalk3, kiltwalk4,],
                keyframes: [
                    {
                        frame: 125,
                        tx: 130,
                        ty: 380,
                    },

                    {
                        frame: 130,
                        tx: 140,
                        ty: 380,
                    },

                    {
                        frame: 135,
                        tx: 150,
                        ty: 380,
                    },

                    {
                        frame: 140,
                        tx: 160,
                        ty: 380,
                    },

                    {
                        frame: 145,
                        tx: 170,
                        ty: 380,
                    },


                    {
                        frame: 150,
                        tx: 180,
                        ty: 380,
                    },

                    {
                        frame: 155,
                        tx: 190,
                        ty: 380,
                    },

                    {
                        frame: 160,
                        tx: 200,
                        ty: 380,
                    },

                    {
                        frame: 165,
                        tx: 210,
                        ty: 380,
                    },

                    {
                        frame: 170,
                        tx: 220,
                        ty: 380,
                    },

                    {
                        frame: 175,
                        tx: 230,
                        ty: 380,
                    },

                    {
                        frame: 180,
                        tx: 240,
                        ty: 380,
                    },


                    {
                        frame: 185,
                        tx: 250,
                        ty: 380,
                    },
                ]
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
                    },

                    {
                        frame: 230,
                        tx: 280,
                        ty: 400,
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
                        // ease: KeyframeTweener.quadEaseOut
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