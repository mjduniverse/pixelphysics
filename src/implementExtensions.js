/**
 * 
 * @param {*} level
 * @this PPGSploderEmulator 
 */

function implementExtensions(levelObject) {

    var emulatorInstance = this;

    for(let i = 0; i < levelObject.extensions.length; i++) {

        let o = levelObject.extensions[i];
        let bodyA = levelObject.bodyIds[o.objectA];
        let bodyB = levelObject.bodyIds[o.objectB];

        // Implement pinjoint

        if(o.extension === "pinjoint") {

            let opts = {
                pointA: o.pointA,
                pointB: o.pointB,
                stiffness: 1,
            }

            if(bodyA) {
                opts.bodyA = emulatorInstance.phsim.getObjectByName(o.objectA).matter;
            }

            if(bodyB) {
                opts.bodyB = emulatorInstance.phsim.getObjectByName(o.objectB).matter;
            }

            Matter.World.addConstraint(emulatorInstance.phsim.matterJSWorld,Matter.Constraint.create(opts));

        }

        // Implement Clicker

        if(o.extension === "clicker") {

            var f = function() {

                var obj = bodyA;
                var dynObject = emulatorInstance.phsim.getObjectByName(o.objectA);

                return function() {

                    var x = emulatorInstance.phsim.mouseX / emulatorInstance.phsim.camera.scale;
                    var y = emulatorInstance.phsim.mouseY / emulatorInstance.phsim.camera.scale

                    if(emulatorInstance.phsim.pointInObject(dynObject,x,y)) {
        
                        for(var i = 0; i < obj.eventStack.sensor.length; i++) {
                            obj.eventStack.sensor[i]();
                        }

                    }

                }
            }

            emulatorInstance.phsim.on("click",f());

        }

        // Implement eventLink

        if(o.extension === "eventLink" && o.objectA && o.objectB) {

            let f = function(){

                var objectB = bodyB;

                var g = function() {

                    for(let j = 0; j < objectB.eventStack.sensor.length; j++) {
                        bodyA.off("sensor",g)
                        objectB.eventStack.sensor[j]();
                    }

                }

                return g;

            };

            bodyA.on("sensor",f())
        }

        // Implement jumper

        if(o.extension === "jumper") {

            window.addEventListener("keydown",(function(){

                var up = {
                    x: o.pointB.x / 100,
                    y: o.pointB.y / 100,
                }

                var object = emulatorInstance.phsim.getObjectByName(o.objectA);

                var upArrow = /KeyW|ArrowUp/;

                if(o.arrowKeysOnly) {
                    upArrow = "ArrowUp";
                }

                if(o.wasdKeysOnly) {
                    upArrow = "KeyW";
                }

                return function(event) {

                    if(event.code.match(upArrow)) {
                        PhSim.Motion.setVelocity(object,up);
                    }
                                        
                }

            })());

        }

        // Implement mover

        if(o.extension === "mover") {

            window.addEventListener("keydown",(function(){

                var up = {
                    x: o.pointB.x,
                    y: o.pointB.y,
                }

                var down = {
                    x: -o.pointB.x,
                    y: -o.pointB.y,
                }

                var object = emulatorInstance.phsim.getObjectByName(o.objectA);

                var upArrow = /KeyW|ArrowUp/;
                var downArrow = /keyS|ArrowDown/;

                if(o.arrowKeysOnly) {
                    upArrow = "ArrowUp";
                    downArrow = "ArrowDown"
                }

                if(o.wasdKeysOnly) {
                    upArrow = "KeyW";
                    downArrow = "KeyS";
                }

                return function(event) {

                    if(event.code.match(upArrow)) {
                        PhSim.Motion.setVelocity(object,up);
                    }
                    
                    if(event.code.match(downArrow)) {
                        PhSim.Motion.setVelocity(object,down);
                    }
                    
                }

            })());

        }

        // Implement Elevator

        if(o.extension.elevator) {

            

        }

        // Implement slider

        if(o.extension === "slider") {

            window.addEventListener("keydown",(function(){

                var left = {
                    x: o.pointB.x / 1000,
                    y: o.pointB.y / 1000,
                }

                var right = {
                    x: -o.pointB.x / 1000,
                    y: -o.pointB.y / 1000,
                }

                var object = emulatorInstance.phsim.getObjectByName(o.objectA);

                var leftArrow = /KeyA|ArrowLeft/;
                var rightArrow = /keyD|ArrowRight/;

                if(o.arrowKeysOnly) {
                    leftArrow = "ArrowLeft";
                    rightArrow = "ArrowRight"
                }

                if(o.wasdKeysOnly) {
                    leftArrow = "KeyA";
                    rightArrow = "KeyD";
                }

                return function(event) {

                    if(event.code.match(leftArrow)) {
                        PhSim.Motion.applyForce(object,object.matter.position,left);
                    }
                    
                    if(event.code.match(rightArrow)) {
                        PhSim.Motion.applyForce(object,object.matter.position,right);
                    }
                    
                }

            })());

        }

    }

}

module.exports = implementExtensions;