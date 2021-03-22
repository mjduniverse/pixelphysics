/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 476:
/***/ ((module) => {

/**
 * 
 * @param {Object}
 * @returns {Object}
 * 
 * @this PPGSploderEmulator
 * @memberof PPGSploderEmulator.prototype
 */


function createPhSimDynObject(o) {

    var p = {}

    // Widgets Property

    p.widgets = [];

    // Collision Classes

    var collisionClassArr = []

    for(let i = 0; i < 5; i++) {
        if(o.collisionLayers[i]) {
            collisionClassArr.push(i.toString());
        }
    }

    p.collisionClass = collisionClassArr.join(" ");

    if(collisionClassArr.length === 0) {
        p.noCollision = true;
    }

    // Name

    p.name = o.id;

    // Sensor Layers

    var sensorClassArr = [];

    if(o.sensor.ace) {
        sensorClassArr.push("ace");
    }

    if(o.sensor.diamond) {
        sensorClassArr.push("diamond");
    }

    if(o.sensor.heart) {
        sensorClassArr.push("heart");
    }

    if(o.sensor.spade) {
        sensorClassArr.push("spade");
    }

    if(o.sensor.spade) {
        sensorClassArr.push("flower");
    }

    p.sensorClass= sensorClassArr.join(" ");

    // Colors

    p.fillStyle = o.fill;
    p.strokeStyle = o.stroke;
    p.lineWidth = 4;

    // Graphics

    if(o.graphic) {

        p.sprite = {
            src: this.graphics[o.graphic].url,

            data: {
                name_key: Number.parseInt(this.graphics[o.graphic].name),
                index: 0
            }
        }

    }

    // Locks

    if(o.lock || o.constraints === "lock") {
        p.locked = true;
    }

    // No Rotation

    if(o.constraints === "noRotation") {
        p.widgets.push({
            type: "noRotation"
        })
    }

    // Axis Restraint

    if(o.constraints === "axis") {
        p.widgets.push({
            type: "circularConstraint" 
        })
    }

    if(p.cycle) {
        p.cycle = (Math.PI/360) * (o.angle - 90);
    }

    else {
        p.cycle = 0;
    }

    if(o.shape === "circle") {
        p.shape = "circle";
        p.x = o.center.x;
        p.y = o.center.y;
        p.radius = o.width / 2;
        
        if(p.sprite) {
            p.sprite.fit = true;
        }

    }

    if(o.shape === "rectangle") {
        p.x = o.center.x - o.width * 0.5;
        p.y = o.center.y - o.height * 0.5;
        p.w = o.width;
        p.h = o.height;
        p.shape = "rectangle";

        if(p.sprite) {
            p.sprite.fit = true;
        }

    }

    if(o.shape === "square") {
        p.x = o.center.x - o.width * 0.5;
        p.y = o.center.y - o.height * 0.5;
        p.w = o.width;
        p.h = o.width;
        p.shape = "rectangle";

        if(p.sprite) {
            p.sprite.fit = true;
        }

    }

    if(o.shape === "pentagon") {
        p.shape = "regPolygon";
        p.x = o.center.x;
        p.y = o.center.y;
        p.radius = o.width;
        p.sides = 5;

        if(p.sprite) {
            p.sprite.fit = true;
        }
    }
    
    if(o.shape === "hexagon") {
        p.shape = "regPolygon";
        p.x = o.center.x;
        p.y = o.center.y;
        p.radius = o.width;
        p.sides = 6;
 
        if(p.sprite) {
            p.sprite.fit = true;
        }

    }

    if(o.shape === "right_angle_triangle") {

        p.shape = "polygon",

        p.verts = [

            {
                x: o.center.x + 0.5 * o.width,
                y: o.center.y - 0.5 * o.width
            },

            {
                x: o.center.x + 0.5 * o.width,
                y: o.center.y + 0.5 * o.width
            },

            {
                x: o.center.x - 0.5 * o.width,
                y: o.center.y - 0.5 * o.width
            }
        ]

        if(p.sprite) {
            p.sprite.repeat = true;
        }

    }

    if(o.shape === "custom_polygon") {

        p.shape = "polygon";

        let verts = JSON.parse(JSON.stringify(o.path));

        for(let i = 0; i < verts.length; i++) {
            verts[i].x = o.center.x + verts[i].x;
            verts[i].y = o.center.y + verts[i].y;
        }

        p.verts = verts;

        //debugger;

    }

    return p;
    

}

module.exports = createPhSimDynObject;

/***/ }),

/***/ 813:
/***/ ((module) => {

/**
 * Create PhSim instance
 * 
 * @function
 * @memberof PPGSploderEmulator.prototype
 * @this PPGSploderEmulator
 */

function createPhSimInstance() {

    var ppgSploderEmulator = this;

    var staticSim = {

        simulations: [],

        box: {
            w: 640,
            h: 480
        }

    }

    for(let i = 0; i < this.levels.length; i++) {

        let level = {

            data: {
                sploder: this.levels[i]
            },

            world: {},

            layers: [
                {
                    objUniverse: [],
                    name: "Layer 5"
                },

                {
                    objUniverse: [],
                    name: "Layer 4"
                },

                {
                    objUniverse: [],
                    name: "Layer 3"
                },

                {
                    objUniverse: [],
                    name: "Layer 2"
                },

                {
                    objUniverse: [],
                    name: "Layer 1"
                },

                {
                    objUniverse: [],
                    name: "bounds"
                }

            ]
        };

        let topRect = {
            shape: "rectangle",
            collisionClass: "0 1 2 3 4",
            locked: true,
            x: 0,
            y: 0,
            w: staticSim.box.w,
            h: 10
        }

        let botomRect = {
            shape: "rectangle",
            collisionClass: "0 1 2 3 4",
            locked: true,
            x: 0,
            y: staticSim.box.h,
            w: staticSim.box.w,
            h: 10
        }

        let leftRect = {
            shape: "rectangle",
            collisionClass: "0 1 2 3 4",
            locked: true,
            x: 0,
            y: 0,
            w: 10,
            h: staticSim.box.h
        }

        let rightRect = {
            shape: "rectangle",
            collisionClass: "0 1 2 3 4",
            x: 0,
            y: staticSim.box.w,
            w: 10,
            locked: true,
            h: staticSim.box.h
        }

        if(this.levels[i].bounds === 0) {
            level.layers[5].objUniverse.push(topRect,botomRect,leftRect,rightRect);
        }

        staticSim.simulations.push(level);

        for(let j = 0; j < this.levels[i].bodies.length; j++) {
            let levelIndex = 4 - (this.levels[i].bodies[j].overlap_layer - 1);
            level.layers[levelIndex].objUniverse.push(this.levels[i].bodies[j].phSimStaticObj); 
        }

        if(this.levels[0].gravity === true) {
            level.world.grav = 0;
        }

        else {
            level.world.grav = 1;
        }

    }

    this.phSimStatic = staticSim;
    this.phsim = new PhSim(staticSim);

    this.phsim.container.appendChild(this.createDescDiv());

    this.setLevel(this.levels[0]);

    this.phsim.on("beforefirstslupdate",function(e){

        ppgSploderEmulator.phsim.on("aftercanvasclear",function(e){
            ppgSploderEmulator.renderGradient();  
        });

        ppgSploderEmulator.phsim.on("afterupdate",function(event){
            ppgSploderEmulator.renderGameData();
        });

        console.log(this.objUniverse);

        console.log(ppgSploderEmulator);
        
        debugger;
    });

}

module.exports = createPhSimInstance;

/***/ }),

/***/ 526:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Module used to parse data for physics, controls and widgets.
 * @module src/decodeExtensions
 */

const PPGSploderEmulator = __webpack_require__(138);
const dictionary = __webpack_require__(280);

function decodeExtensions(extensionData) {

    var a = extensionData.split(";");

    var o = {
        extension: dictionary.extensions[a[0]],
        objectA: Number.parseInt(a[1]),
        pointA: PPGSploderEmulator.parseVector(a[2]),
        objectB: Number.parseInt(a[3]),
        pointB: PPGSploderEmulator.parseVector(a[4]),
    }

    if(o.extension === "motor") {
        o.radians = Number.parseFloat(a[5]);
    }

    if(o.extension === "arcade_mover") {
        o.arrowKeysOnly  = !!Number.parseFloat(a[8]);
        o.wasdKeysOnly = !!Number.parseFloat(a[9]);
    }

    if(o.extension === "jumper") {
        o.arrowKeysOnly  = !!Number.parseFloat(a[8]);
        o.wasdKeysOnly = !!Number.parseFloat(a[9]);
        o.allowAirJumping = !!Number.parseFloat(a[10]);
    }

    if(o.extension === "mover") {
        o.arrowKeysOnly  = !!Number.parseFloat(a[8]);
        o.wasdKeysOnly = !!Number.parseFloat(a[9]);
    }

    if(o.extension === "adder") {
        o.keyDownSpeed = Number.parseInt(a[5]);
        o.lifespan = Number.parseFloat(a[7]);
        o.useMouseClick = !!Number.parseInt(a[8]);
        o.explodeOnExpire = !!Number.parseInt(a[9]);
    }

    return o;

}

module.exports = decodeExtensions;

/***/ }),

/***/ 942:
/***/ ((module) => {

function createDescDiv() {

    var self = this;

    // Description

    var descDiv = document.createElement("div");

    descDiv.style = `position: relative;
    bottom: 387px;
    background: rgba(0,0,0,0.8);
    left: 129px;
    height: 243px;
    color: lightblue;
    border-radius: 10px;
    padding: 20px;
    width: 345px;`

    // Description Text

    var descTxt = document.createElement("p");
    descDiv.appendChild(descTxt);
    this.descTxt = descTxt;

    // Play button

    var playButton = document.createElement("span");
    playButton.className = "ppg-sploder-emulator-play-button";
    playButton.innerText = "Play";

    playButton.style = `float: right;
    background-color: #ffb700;
    color: #000000;
    border-radius: 10px;
    padding: 10px;
    position: absolute;
    bottom: 0px;
    right: 0;
    margin: 20px;
    cursor: pointer;`

    playButton.addEventListener("click",function(){

        self.phsim.play().then(function(){

            self.playing = true;

            self.timeLimitCount = setInterval(function(){
                if(self.playing) {
                    self.currentGame.time--;
                }
            },1000);

            if(self.currentLevel.time_limit) {

                self.timeLimitTimeout = setTimeout(function(){

                    if(self.currentLevel.goal_score) {
                        self.endGame();
                    }
    
                    else {
                        self.incrementLevel();
                    }
    
                },self.currentLevel.time_limit * 1000);

            }

        });

        self.descDiv.style.display = "none";

    })

    descDiv.appendChild(playButton);

    this.descDiv = descDiv;

    return descDiv;

}

module.exports = createDescDiv;

/***/ }),

/***/ 280:
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"extensions":{"25":"bouncer","26":"pinjoint","28":"spring_t","29":"spring_l","30":"grove","31":"motor","33":"mover","34":"slider","35":"launcher","36":"selector","37":"adder","38":"elevator","39":"spawner","42":"factory","43":"eventLink","44":"switcher","45":"jumper","46":"e_magnet","47":"gear_joint","48":"aimer","49":"pointer","50":"dragger","53":"propeller","54":"clicker","55":"arcade_mover"},"strength":{"21":"unbreakable","22":"barely_unbreakable","23":"average","24":"brittle"},"constraints":{"8":"lock","9":"no_rotation","10":"axis","11":null},"shapes":{"1":"custom_polygon","2":"hexagon","3":"pentagon","4":"rectangle","5":"right_angle_triangle","6":"circle","7":"square"},"material":{"12":"tire","13":"glass","14":"rubber","15":"ice","16":"steel","17":"wood","18":"nogravity","19":"antigravity","21":"magnet","51":"bouncy"}}');

/***/ }),

/***/ 653:
/***/ ((module) => {

function firstRender() {

    this.renderGradient(); 

    for(let i = 0; i < this.phsim.objUniverse.length; i++) {
        this.phsim.phRender.dynamicRenderDraw(this.phsim.objUniverse[i]);
    }

    this.renderGameData();

}

module.exports = firstRender;

/***/ }),

/***/ 785:
/***/ ((module) => {

function implementEvents(obj) {

    var dynObject = this.phsim.getObjectByName(obj.id);
    var emulatorInstance = this;

    // Score events

    if(obj.events.score.onsensor) {

        let f = function(){
            emulatorInstance.currentGame.score++;
        };

        obj.on("sensor",f);

    }

    if(obj.events.score.oncrush) {
        
        obj.on("crush",function(){
            emulatorInstance.currentGame.score++;
        });

    }

    if(obj.events.score.onclone) {

        obj.on("clone",function(){
            emulatorInstance.currentGame.score++;
        });
        
    }

    if(obj.events.score.onboundsout) {

        obj.on("boundsout",function(){
            emulatorInstance.currentGame.score++;
        });
        
    }

    // Penalty events

    if(obj.events.penalty.onsensor) {

        let f = function(){
            emulatorInstance.currentGame.penalty++;
        };

        obj.on("sensor",f);

    }

    if(obj.events.penalty.oncrush) {
        
        obj.on("crush",function(){
            emulatorInstance.currentGame.penalty++;
        });

    }

    if(obj.events.penalty.onclone) {

        obj.on("clone",function(){
            emulatorInstance.currentGame.penalty++;
        });
        
    }

    if(obj.events.penalty.onboundsout) {

        obj.on("boundsout",function(){
            emulatorInstance.currentGame.penalty++;
        });
        
    }

    this.phsim.on("collisionstart",function(){
        if(this.inSensorCollision(dynObject)) {
            obj.callEventClass("sensor",emulatorInstance,{});
        }
    });

}

module.exports = implementEvents;

/***/ }),

/***/ 254:
/***/ ((module) => {

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

            Matter.Constraint.create(opts)

        }

        // Implement Clicker

        if(o.extension === "clicker") {

            var f = function() {

                var obj = bodyA;

                return function() {
                    for(var i = 0; i < obj.eventStack.sensor.length; i++) {
                        obj.eventStack.sensor[i]();
                    }
                }
            }

            emulatorInstance.phsim.getObjectByName(o.objectA).on("objclick",f());

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
                    x: o.pointB.x,
                    y: o.pointB.y,
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

/***/ }),

/***/ 554:
/***/ ((module) => {

function incrementLevel() {

    var self = this;

    return new Promise(function(resolve,reject){

        if(self.levels[self.currentLevelIndex + 1]) {
            setTimeout(function(){

                self.setLevel(self.levels[self.currentLevelIndex + 1]);

                self.phsim.gotoSimulationIndex(self.phsim.simulationIndex + 1).then(function(){
                    self.firstRender();
                    resolve();
                });

            },1000);
        }

        else {
            reject()
        }
        
    });

}

module.exports = incrementLevel;

/***/ }),

/***/ 138:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


const dictionary = __webpack_require__(280);

/**
 * Constructor for an instance of the emulator
 * @param {*} xmlTree - XML Document tree for the game
 */

function PPGSploderEmulator(xmlTree) {

    var self = this;

    this.xmlTree = xmlTree;

    this.currentGame = new Proxy(this.currentGameTarget,{

        set: function(target,key,value) {

            target[key] = value;

            if(key === "score" && self.currentLevel.score_goal && self.currentLevel.score_goal === target.score) {
                self.incrementLevel();
            }

            if(key === "penalty" && self.currentLevel.max_penalty && self.currentLevel.max_penalty === target.penalty) {
                target.lives--;
            }

            if(key === "lives" && target.lives === 0) {
                self.endGame();
            }

        }

    });

}

module.exports = PPGSploderEmulator;

PPGSploderEmulator.prototype.objectIds = {};

/**
 * 
 * Decode a unsigned 5 bit field and turn it into an object.
 * For information, a 5 bit number is a number consisting of 5 bits and could be any value between
 * 0 and 31.
 * 
 * @function
 * @returns {Object}
 * 
 */

PPGSploderEmulator.u5bitfieldDecode = function(bitfield) {

    if(bitfield < 32) {

        return {
            0: !!(bitfield & Math.pow(2,4)),
            1: !!(bitfield & Math.pow(2,3)),
            2: !!(bitfield & Math.pow(2,2)),
            3: !!(bitfield & Math.pow(2,1)),
            4: !!(bitfield & Math.pow(2,0)),
        }

    }

}

/**
 * Decode material
 * @param {Number} n - Material number
 * @returns {String} - String naming the material 
 */

PPGSploderEmulator.decodeMaterial = function(n) {

    n = Number.parseInt(n);

    if(n === 17) {
        return "wood";
    }

    if(n === 16) {
        return "steel"
    }

    if(n === 15) {
        return "ice";
    }

    if(n === 14) {
        return "rubber"
    }

    if(n === 13) {
        return "glass";
    }

    if(n === 12) {
        return "tire"
    }
    
    if(n === 18) {
        return "nogravity"
    }

    if(n === 19) {
        return "antigravity"
    }

    if(n === 21) {
        return "magnet"
    }

    if(n === 51) {
        return "bouncy"
    }
}

PPGSploderEmulator.decodeSensorLayers = function(bitfield) {

    bitfield = PPGSploderEmulator.u5bitfieldDecode(bitfield)

    return {
        "ace": bitfield[0],
        "diamond": bitfield[1],
        "heart": bitfield[2],
        "spade": bitfield[3],
        "flower": bitfield[4]
    }
}



PPGSploderEmulator.decodeConstraints = function(n) {

    n = Number.parseInt(n);

    if(n === 11) {
        return null
    }

    if(n === 10) {
        return "axis"
    }

    if(n === 9) {
        return "no_rotation"
    }

    if(n === 8) {
        return "lock"
    }
}


/**
 * Decode shape type
 */

PPGSploderEmulator.decodeShapeType = function(n) {

    n = Number.parseInt(n);

    if(n === 6) {
        return "circle"
    }

    if(n === 7) {
        return "square"
    }

    if(n === 4) {
        return "rectangle"
    }

    if(n === 5) {
        return "right_angle_triangle"
    }

    if(n === 3) {
        return "pentagon"
    }

    if(n === 2) {
        return "hexagon"
    }

    if(n === 1) {
        return "custom_polygon"
    }

}

/**
 * Convert vector from string form to JavaScript object form
 * @param {String} str 
 * @returns {Object} - Vector Object
 * 
 */

PPGSploderEmulator.parseVector = function(str) {

    if(typeof str === "undefined") {
        debugger;
    }

    var a = str.split(":");

    return {
        x: Number.parseFloat(a[0]),
        y: Number.parseFloat(a[1])
    }

}

/**
 * Parse vector collection for custom polygons.
 * @function
 * @param {String} str - String representing vector set 
 * @returns {Object[]}
 */

PPGSploderEmulator.parseVectorSet = function(str) {

    var a = str.split(",");

    if(a.length > 0) {
        return a.map(function(v){
            return PPGSploderEmulator.parseVector(v);
        });
    }

}

PPGSploderEmulator.decodePassthrough = function(n) {

    n = Number.parseInt(n);

    if(n === 0) {
        return  "A"
    }

    if(n === 1) {
        return "B"
    }

    if(n === 2) {
        return "C"
    }

    if(n === 3) {
        return "D"
    }

    if(n === 4) {
        return "E"
    }
    
}

PPGSploderEmulator.prototype.renderGradient = function() {
    this.phsim.ctx.fillStyle = this.grad;
    this.phsim.ctx.fillRect(0 - this.phsim.camera.x,0 - this.phsim.camera.y,this.phsim.width / this.phsim.camera.scale,this.phsim.height / this.phsim.camera.scale);              
}

PPGSploderEmulator.prototype.currentGameTarget = {
    score: null,
    penalty: null,
    lives: null,
}

/**
 * 
 * Decode event information from bitfield.
 * 
 * @function
 * @param {Number} n - An unsigned 32 bit integer used as a bitfield to configure events.
 * @returns {Object} - An object containing information about the events
 */


PPGSploderEmulator.decodeEvents = function(n) {

    n = Number.parseInt(n);

    return {

        score: {
            onsensor: !!(n & Math.pow(2,31)),
            oncrush: !!(n & Math.pow(2,30)),
            onclone: !!(n & Math.pow(2,29)),
            onboundsout: !!(n & Math.pow(2,28)),
        },

        penalty: {
            onsensor: !!(n & Math.pow(2,27)),
            oncrush: !!(n & Math.pow(2,26)),
            onclone: !!(n & Math.pow(2,25)),
            onboundsout: !!(n & Math.pow(2,24))
        },

        loose_score: {
            onsensor: !!(n & Math.pow(2,23)),
            oncrush: !!(n & Math.pow(2,22)),
            onclone: !!(n & Math.pow(2,21)),
            onboundsout: !!(n & Math.pow(2,20))
        },

        addLife: {
            onsensor: !!(n & Math.pow(2,19)),
            oncrush: !!(n & Math.pow(2,18)),
            onclone: !!(n & Math.pow(2,17)),
            onboundsout: !!(n & Math.pow(2,16))
        },

        unlock: {
            onsensor: !!(n & Math.pow(2,15)),
            oncrush: !!(n & Math.pow(2,14)),
            onclone: !!(n & Math.pow(2,13)),
            onboundsout: !!(n & Math.pow(2,12))
        },

        remove: {
            onsensor: !!(n & Math.pow(2,11)),
            oncrush: !!(n & Math.pow(2,10)),
            onclone: !!(n & Math.pow(2,9)),
            onboundsout: !!(n & Math.pow(2,8))
        },

        explode: {
            onsensor: !!(n & Math.pow(2,7)),
            oncrush: !!(n & Math.pow(2,6)),
            onclone: !!(n & Math.pow(2,5)),
            onboundsout: !!(n & Math.pow(2,4))
        },

        endGame: {
            onsensor: !!(n & Math.pow(2,3)),
            oncrush: !!(n & Math.pow(2,2)),
            onclone: !!(n & Math.pow(2,1)),
            onboundsout: !!(n & Math.pow(2,0))
        }

    }
}

PPGSploderEmulator.decodeStrength = function(n) {

    n = Number.parseInt(n);

    if(n === 21) {
        return "unbreakable";
    }

    if(n === 22) {
        return "barely_breakable";
    }

    if(n === 23) {
        return "average";
    }

    if(n === 24) {
        return "brittle";
    }

}

PPGSploderEmulator.decodeColor = function(v) {

    v = Number.parseInt(v);

    if(v === -1) {
        return "transparent";
    }

    if(v > -1) {

        let r = v >>> 16;
        let g = (v >>> 8) & 0b0000000011111111;
        let b = v & 0b000000000000000011111111;
    
        return "rgb(" + r + "," + g + "," + b + ")";

    }

}

// 11111#x:y#0:0#angle#0#shape;rad_x;rad_y;shape_custom_path;movement_constraints;material;strength;lock_movement;collision;passthru;sensor;fill;stroke;graphic;overlap_layer;1;scribble;events;0;0;0;0;texture_settings

/**
 * Parse object data to create object.
 * @param {string} dataStr -  String representing object 
 */

PPGSploderEmulator.prototype.extractObject = function(dataStr) {

    var a = dataStr.split(/#|;/);

    var o = {
        bodyData: dataStr,
        id: Number.parseFloat(a[0]),
        center: PPGSploderEmulator.parseVector(a[1]),
        axis: PPGSploderEmulator.parseVector(a[2]),
        angle: Number.parseFloat(a[3]),
        group: Number.parseInt(a[4]),
        shape: dictionary.shapes[a[5]],
        width: Number.parseFloat(a[6]),
        height: Number.parseFloat(a[7]),
        path: PPGSploderEmulator.parseVectorSet(a[8]),
        constraints: dictionary.constraints[a[9]],
        material: dictionary.material[a[10]],
        strength: dictionary.strength[a[11]],
        lock: !!Number.parseInt(a[12]),
        collisionBitField: a[13],
        collisionLayers: PPGSploderEmulator.u5bitfieldDecode(a[13]),
        passthru: PPGSploderEmulator.decodePassthrough(a[14]),
        sensorBitField: a[15],
        sensor: PPGSploderEmulator.decodeSensorLayers(a[15]),
        fill: PPGSploderEmulator.decodeColor(a[16]),
        stroke: PPGSploderEmulator.decodeColor(a[17]),
        built_in_graphic: Number.parseInt(a[18]),
        overlap_layer: Number.parseInt(a[19]),
        transparent: !Number.parseInt(a[20]),
        scribble: !!Number.parseInt(a[21]),
        events: PPGSploderEmulator.decodeEvents(a[22]),
        graphic: Number.parseInt(a[23]),
        texture: a[27],
    }

    this.objectIds[o.id] = o;

    o.phSimStaticObj = this.createPhSimDynObject(o);

    o.eventStack = {
        sensor: [],
        crush: [],
        clone: [],
        boundsout: []
    }

    o.simulationEventStack = o.eventStack;

    Object.assign(o,PhSim.PhSimEventTarget);

    return o;

}

/**
 * Get XML Tree for project
 * @function
 * @returns {Promise}
 *
 */

PPGSploderEmulator.getProjectXMLTree = function() {

    return new Promise(function(resolve,reject){

        var xhr = new XMLHttpRequest();

        xhr.open("GET",PPGSploderEmulator.getProjectUrlXMLFromImgElm());
    
        xhr.addEventListener("load",function(){
            var domParser = new DOMParser();
            var xmlDoc = domParser.parseFromString(xhr.response,"text/xml");
            resolve(xmlDoc);
        });

        xhr.addEventListener("error",function(e){
            reject(e);
        })
    
        xhr.send();

    });

}

/**
 * Get Project XML URL from thumbnail
 *
 * @function
 * @param {*} thumbnailUrl - Thumbnail url when Sploder page loads.
 */

PPGSploderEmulator.getProjectXMLUrlFromThumbnail = function(thumbnailUrl) {

    var urlParts = thumbnailUrl.split("/");

    var group = urlParts[4];
    var user = urlParts[5];
    var projectId = urlParts[7].split(".")[0];

    return `https://cdn.sploder.com/users/${group}/${user}/projects/${projectId}/game.xml`;

}

PPGSploderEmulator.getProjectUrlXMLFromImgElm = function() {
    return PPGSploderEmulator.getProjectXMLUrlFromThumbnail(document.querySelector(".game_preview").src);
}

/**
 * Create PPGSploderEmulator
 * @returns {Promise}
 */

PPGSploderEmulator.createInstanceByPage = function() {

    return new Promise(function(resolve,reject){

        PPGSploderEmulator.getProjectXMLTree().then(function(xmlTree){

            var ppgSploderEmulator = new PPGSploderEmulator(xmlTree);

            ppgSploderEmulator.load().then(function(){
                resolve(ppgSploderEmulator);
            });

        }).catch(function(e){
            reject(e);
            console.error(e);
        });

    });

}

PPGSploderEmulator.prototype.updatePhSimSprite = function(spriteObj) {

    var graphicObj = this.graphics[spriteObj.data.name_key];

    if(spriteObj.data.index === graphicObj.frameArr.length) {
        spriteObj.data.index = 0;
    }

    spriteObj.src = graphicObj.frameArr[spriteObj.data.index].canvas;

    spriteObj.data.index++;

}

PPGSploderEmulator.prototype.updateAllPhSimSprites = function() {
    for(var i = 0; i < this.phsim.objUniverse.length; i++) {
        if(this.phsim.objUniverse[i].sprite) {
            this.updatePhSimSprite(this.phsim.objUniverse[i].sprite);
        }
    }
}


/**
 * Decode graphics from base64
 * @function
 *
 */

PPGSploderEmulator.prototype.decodeGraphics = function() {
    this.xmlTree
}

const PPG_INFO = "This is a game made with Sploder's physics game creator."

window.addEventListener("load",function(){

    if(document.querySelector(".gametypeinfo") && window.document.querySelector(".gametypeinfo").children[0].innerText === PPG_INFO) {

        PPGSploderEmulator.createInstanceByPage().then(function(o){

            o.phsim.data = o.phsim.data || {};

            window.document.querySelector(".game_preview").style.display = "none";
    
            var gameLoadingDiv = window.document.querySelector(".game_loading");
            gameLoadingDiv.parentElement.removeChild(gameLoadingDiv);
        
    
            window.document.getElementById("flashcontent").appendChild(o.phsim.container);

            // Background Gradient
    
            window.ppgSploderEmulatorInstance = o;

            // Description

            o.firstRender();

            debugger;

        }).catch(function(e){
            console.error(e);
        });

    }

    

});

// Loading modules

PPGSploderEmulator.prototype.load = __webpack_require__(169);
PPGSploderEmulator.prototype.createPhSimInstance = __webpack_require__(813);
PPGSploderEmulator.prototype.createPhSimDynObject = __webpack_require__(476)
PPGSploderEmulator.decodeExtensions = __webpack_require__(526)
PPGSploderEmulator.prototype.implementExtensions = __webpack_require__(254);
PPGSploderEmulator.prototype.implementEvents = __webpack_require__(785);
PPGSploderEmulator.prototype.renderGameData = __webpack_require__(28);
PPGSploderEmulator.prototype.setLevel = __webpack_require__(574);
PPGSploderEmulator.prototype.firstRender = __webpack_require__(653);
PPGSploderEmulator.prototype.createDescDiv = __webpack_require__(942);
PPGSploderEmulator.prototype.incrementLevel = __webpack_require__(554);

/***/ }),

/***/ 169:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const PPGSploderEmulator = __webpack_require__(138);
const decodeExtensions = __webpack_require__(526); 

/**
 * Module used to load game data
 * @module src/load
 */

/**
 * Loading function for PPGSploderEmulator instances
 * @returns 
 * @this PPGSploderEmulator
 */

function load() {

    var self = this;

    return new Promise(function(resolve,reject){

        var xmlTree = self.xmlTree;
    
        // Get author and title
    
        self.author = self.xmlTree.querySelector("project").getAttribute("author");
        self.title = decodeURI(self.xmlTree.querySelector("project").getAttribute("title"));
    
        // Decode and get graphics
    
        self.base64imgdata = {};
        self.graphics = {}
        self.imgDataURLs = {};
        self.xml_base64imgdata_children;
    
        if(self.xmlTree.querySelector("graphics")) {
    
            self.xml_base64imgdata_children = self.xmlTree.querySelector("graphics").children;
    
            for(let i = 0; i < self.xml_base64imgdata_children.length; i++) {
    
                let name = self.xml_base64imgdata_children[i].getAttribute("name");
                let id = Number.parseInt(name.split("_")[0]);
        
                self.graphics[id] = {
                    name: name,
                    frames: []
                }
        
                let data = self.xml_base64imgdata_children[i].innerHTML;
                self.base64imgdata[name] = data;
        
                let decoded_data = atob(data);
        
                let charPointIntegers = new Uint8Array(decoded_data.length);
        
                for(let j = 0; j < decoded_data.length; j++) {
                    charPointIntegers[j] = decoded_data.charCodeAt(j);
                }
        
                let blob = new Blob([charPointIntegers],{
                    type: "image/png"
                });
        
                let url = URL.createObjectURL(blob);
        
                self.imgDataURLs[name] = url;
        
                // Add graphics url
        
                self.graphics[id].url = url;


            }
    
        }
 
        // Get level information
    
        self.levels = [];
    
        let levelsChildren = self.xmlTree.querySelector("levels").children;
    
        for(let i = 0; i < levelsChildren.length; i++) {
    
            let envArr = levelsChildren[i].getAttribute("env").split(";");
    
            let musicInfo;
    
            if(envArr[12]) {
    
                let musicArr = envArr[12].split("/");
    
                // Old Sploder PPG games from early 2011 do not support music, so checking if music information is an array is necessary.
    
                if(Array.isArray(musicArr) && musicArr[0] !== "0") {
                    musicInfo = {
                        author: musicArr[0],
                        filename: musicArr[1],
                        name: musicArr[1].split(".")[0]
                    }
                }
    
            }
    
            let levelDataStr = levelsChildren[i].innerHTML;
            let entitiesData = levelDataStr.split("$");
    
            // Data for bodies
     
            let bodyData = entitiesData[0];
            let bodyDataParts = bodyData.split("|");
    
            let bodies = [];
            let bodyIds = {}
            let groups = {}
    
            for(let i = 0; i < bodyDataParts.length; i++) {

                let body = self.extractObject(bodyDataParts[i]);
                
                // Body id structure

                bodyIds[body.id] = body;

                // Get object group, if object is grouped

                groups[body.group] = groups[body.group] || [];
                groups[body.group].push(body);

                bodies.push(body);
            }
    
            // Data for physics, controls and widgets

            let extensions = [];
    
            let xData = entitiesData[1]; 
            let xDataParts = xData.split("|");

            if(xData) {
                for(let i = 0; i < xDataParts.length; i++) {
                    extensions.push(decodeExtensions(xDataParts[i]));
                }    
            }

            // Add level data
    
            self.levels.push({

                data: levelDataStr,

                extensions: extensions,
    
                music: musicInfo,

                groups: groups,
    
                gradient: {
                    top: PPGSploderEmulator.decodeColor(envArr[1]),
                    bottom: PPGSploderEmulator.decodeColor(envArr[0])
                },
    
                background: envArr[2],
    
                bounds: Number.parseInt(envArr[3]),
    
                gravity: !!Number.parseInt(envArr[4]),
    
                motionResistance: !!Number.parseInt(envArr[5]),
    
                level_size: Number.parseInt(envArr[6]),
    
                starting_lives: Number.parseInt(envArr[7]),
    
                max_penalty: Number.parseInt(envArr[8]),
    
                score_goal: Number.parseInt(envArr[9]),
    
                time_limit: Number.parseFloat(envArr[10]),
    
                description: envArr[11],
    
                bodies: bodies,

                bodyIds: bodyIds
    
            });
    
        }
    
        // Creating PhSim instance
    
        self.createPhSimInstance();

        resolve();

    }).then(function(){
        return new Promise(function(resolve,reject){

            // Decompose Graphics

            var graphicCount = 0;
            var graphicsArr = Object.values(self.graphics);

            if(graphicsArr.length === 0) {
                resolve();
            }

            for(var i = 0; i < graphicsArr.length; i++) {

                let img = document.createElement("img");
                img._graphicsObj = graphicsArr[i];

                img.addEventListener("load",function(){

                    this._graphicsObj.size = this.height;
                    this._graphicsObj.frames = this.width / this.height;
                    this._graphicsObj.frameArr = [];

                    let canvas = document.createElement("canvas");
                    canvas.width = this.width;
                    canvas.height = this.height;

                    let ctx = canvas.getContext("2d");
                    ctx.drawImage(this,0,0);

                    this._graphicsObj.canvas = canvas;

                    for(let j = 0; j < this._graphicsObj.frames; j++) {

                        let imageData = ctx.getImageData(this._graphicsObj.size * j,0,this._graphicsObj.size,this._graphicsObj.size)

                        let frameData = {
                            imageData: imageData,
                            canvas: document.createElement("canvas")
                        }

                        frameData.canvas.width = this._graphicsObj.size;
                        frameData.canvas.height = this._graphicsObj.size;

                        let ctx2 = frameData.canvas.getContext("2d");
                        ctx2.putImageData(frameData.imageData,0,0);

                        frameData.src = frameData.canvas.toDataURL();

                        this._graphicsObj.frameArr.push(frameData);

                    }

                    graphicCount++;

                    if(graphicCount === graphicsArr.length) {
                        resolve();
                    }
                    
                });

                img.src = graphicsArr[i].url;

            }

        })
    })

  
}

module.exports = load;

/***/ }),

/***/ 28:
/***/ ((module) => {

/**
 * Render game data
 * @this PPGSploderEmulator
 */

function renderGameData() {

    this.phsim.ctx.textAlign = "left";
    this.phsim.ctx.fillStyle = "white";
    this.phsim.ctx.fillText("Lives: " + this.currentGame.lives + " Penalty: " + this.currentGame.penalty + " / " + this.currentLevel.max_penalty + " Score: " + this.currentGame.score + "/" + this.currentLevel.score_goal,10,19);

    this.phsim.ctx.fillText(this.currentGame.time,400,400);

}

module.exports= renderGameData;

/***/ }),

/***/ 574:
/***/ ((module) => {

/**
 * Set level
 * @param {*} level 
 * @this PPGSploderEmulator
 */

function setLevel(level) {

    if(typeof this.timeLimitCount === "number") {
        clearInterval(this.timeLimitCount);
    }

    this.playing = false;

    this.phsim.pause();

    this.currentLevel = level; 

    this.currentLevelIndex = this.levels.indexOf(level);

    this.descTxt.innerText = this.currentLevel.description;
    this.descDiv.style.display = "block";
    
    this.currentGame.time = this.currentLevel.time_limit;
    this.currentGame.score = 0;
    this.currentGame.penalty = 0;
    this.currentGame.lives = this.currentLevel.starting_lives;

    let topClr = this.currentLevel.gradient.top;
    let botClr = this.currentLevel.gradient.bottom;

    let grad = this.phsim.ctx.createLinearGradient(0,0,0,this.phsim.canvas.height);

    grad.addColorStop(0,topClr);
    grad.addColorStop(1,botClr);

    this.grad = grad;

    this.implementExtensions(this.currentLevel);

    for(let i = 0; i < this.currentLevel.bodies.length; i++) {
        this.implementEvents(this.currentLevel.bodies[i]);
    }

    this.canvasIntervals = [];

    for(let i = 0; i < this.phsim.objUniverse.length; i++) {

        if(this.phsim.objUniverse[i].sprite) {

            let self = this;

            let f = function() {

                var obj = self.phsim.objUniverse[i];
                var o = self;

                return function() {
                    o.updatePhSimSprite(obj.sprite)
                }

            }

            this.canvasIntervals.push(setInterval( f() , 250 ));

        }

    }

    
    if(this.currentLevel.level_size === 1 || this.currentLevel.level_size === 2) {
        this.phsim.camera.zoomIn(0.5);
    }

}

module.exports = setLevel;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(138);
/******/ 	
/******/ })()
;