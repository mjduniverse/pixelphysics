'use strict';

const dictionary = require("./dictionary.json");

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

PPGSploderEmulator.prototype.load = require("./load");
PPGSploderEmulator.prototype.createPhSimInstance = require("./createPhSimInstance");
PPGSploderEmulator.prototype.createPhSimDynObject = require("./createPhSimDynObject")
PPGSploderEmulator.decodeExtensions = require("./decodeExtensions")
PPGSploderEmulator.prototype.implementExtensions = require("./implementExtensions");
PPGSploderEmulator.prototype.implementEvents = require("./implementEvents");
PPGSploderEmulator.prototype.renderGameData = require("./renderGameData");
PPGSploderEmulator.prototype.setLevel = require("./setLevel");
PPGSploderEmulator.prototype.firstRender = require("./firstRender");
PPGSploderEmulator.prototype.createDescDiv = require("./descDiv");
PPGSploderEmulator.prototype.incrementLevel = require("./incrementLevel");