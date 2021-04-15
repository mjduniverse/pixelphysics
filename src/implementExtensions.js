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

            else {
                opts.pointB = {
                    x: opts.pointB.x + bodyA.center.x,
                    y: opts.pointB.y + bodyA.center.y
                }
            }

            Matter.World.addConstraint(emulatorInstance.phsim.matterJSWorld,Matter.Constraint.create(opts));

        }

        // Implement tight spring

        if(o.extension === "spring_t") {

            let opts = {
                pointA: o.pointA,
                pointB: o.pointB,
                stiffness: 0.5,
            }

            if(bodyA) {
                opts.bodyA = emulatorInstance.phsim.getObjectByName(o.objectA).matter;
            }

            if(bodyB) {
                opts.bodyB = emulatorInstance.phsim.getObjectByName(o.objectB).matter;
            }

            else {
                opts.pointB = {
                    x: opts.pointB.x + bodyA.center.x,
                    y: opts.pointB.y + bodyA.center.y
                }
            }

            Matter.World.addConstraint(emulatorInstance.phsim.matterJSWorld,Matter.Constraint.create(opts));

        }

        // Implement loose spring

        if(o.extension === "spring_l") {

            let opts = {
                pointA: o.pointA,
                pointB: o.pointB,
                stiffness: 0.2,
            }

            if(bodyA) {
                opts.bodyA = emulatorInstance.phsim.getObjectByName(o.objectA).matter;
            }

            if(bodyB) {
                opts.bodyB = emulatorInstance.phsim.getObjectByName(o.objectB).matter;
            }

            else {
                opts.pointB = {
                    x: opts.pointB.x + bodyA.center.x,
                    y: opts.pointB.y + bodyA.center.y
                }
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

        // Implement Dragger

        if(o.extension === "dragger") {

            var f = function() {

                var obj = bodyA;
                var dynObject = emulatorInstance.phsim.getObjectByName(o.objectA);

                return function() {

                    var x = emulatorInstance.phsim.mouseX / emulatorInstance.phsim.camera.scale;
                    var y = emulatorInstance.phsim.mouseY / emulatorInstance.phsim.camera.scale

                    if(emulatorInstance.phsim.pointInObject(dynObject,x,y)) {

                        var c = Matter.World.addConstraint(emulatorInstance.phsim.matterJSWorld,Matter.Constraint.create({
                            
                            bodyA: dynObject.matter,

                            pointB: {
                                x: x,
                                y: y
                            }

                        }));

                        var _onmousemove = function() {

                        }

                        var _onmouseup = function() {

                        }

                    }

                }
            }

            emulatorInstance.phsim.on("mousedown",f());

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

        // Implement Grove

        if(o.extension === "grove") {

        }

        if(o.extension === "elevator") {

            emulatorInstance.elevators = emulatorInstance.elevators || []; 

            
            let e = {
                x1: o.pointA.x + bodyA.center.x,
                y1: o.pointA.y + bodyA.center.y,
                x2: o.pointB.x + bodyA.center.x,
                y2: o.pointB.y + bodyA.center.y
            };

            // Intersection 

            let slope = (e.y1 - e.y2) / (e.x1 - e.x2);
            let perpSlope = -1/slope;

            var intersectionX;
            var intersectionY;
            var boundingFunction;

            if(Math.abs(slope) <= 1) {

                if(e.x1 > e.x2) {
                    
                    boundingFunction = function() {
                        return e.x1 > c.pointB.x && c.pointB.x > e.x2;
                    }

                }

                else {
                    
                    boundingFunction = function() {
                        return e.x2 > c.pointB.x && c.pointB.x > e.x1;
                    }

                }

            }

            else {

                if(e.y1 < e.y2) {

                    boundingFunction = function() {
                        return e.y1 > c.pointB.y && c.pointB.y > e.y2;
                    }

                }

                else {

                    boundingFunction = function() {
                        return e.y2 > c.pointB.y && c.pointB.y > e.y1;
                    }

                }
                
            }

            if(slope === Infinity) {
                intersectionX = e.x1;
                intersectionY = bodyA.center.y;
            }

            else if(slope === 0) {
                intersectionX = bodyA.center.x;
                intersectionY = e.y1;
            }

            else {

                let yIntercept = e.y2 - slope * e.x2;
                let perpYIntercept = bodyA.center.y - perpSlope * bodyA.center.x;
    
                intersectionX =  (perpYIntercept - yIntercept) / (slope - perpSlope);
                intersectionY = intersectionX * slope + yIntercept;

            }

            // Unit Vector

            let unitVector = PhSim.Vector.unitVector(PhSim.Vector.subtract(o.pointB,o.pointA));

            // Constraint

            let opts = {

                bodyA: emulatorInstance.phsim.getObjectByName(o.objectA).matter,

                pointB: {
                    x: intersectionX,
                    y: intersectionY
                }

            }

            let c = Matter.Constraint.create(opts);

            Matter.World.addConstraint(emulatorInstance.phsim.matterJSWorld,c);

            // Center Constraint

            let c_opts = {

                bodyA: emulatorInstance.phsim.getObjectByName(o.objectA).matter,

                pointB: {
                    x: opts.bodyA.position.x,
                    y: opts.bodyA.position.y
                }

            }

            let center_c = Matter.Constraint.create(c_opts)

            Matter.World.addConstraint(emulatorInstance.phsim.matterJSWorld,center_c);

            emulatorInstance.elevators.push(e);

            let direction = -1;

            setInterval(function(){

                if(emulatorInstance.playing) {

                    center_c.pointB.x += unitVector.x * direction;
                    center_c.pointB.y += unitVector.y * direction;

                    c.pointB.x += unitVector.x * direction;
                    c.pointB.y += unitVector.y * direction;

                    if( boundingFunction() ) {
                        direction = -direction;
                    }

                }

            },100)

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