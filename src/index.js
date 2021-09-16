'use strict';

const dictionary = require("./pixelphysics-parser/dictionary.json");

/**
 * Constructor for an instance of the emulator
 * @param {*} xmlTree - XML Document tree for the game
 */

function PPGSploderEmulator(xmlTree) {

    var self = this;

    this.xmlTree = xmlTree;

    this.currentGame = new Proxy(this.currentGameTarget,{

        set: function(target,key,value) {

            if(key === "lives" && value === 0 && target.lives > 0) {
                self.endGame();
            }

            target[key] = value;

            if(key === "score" && self.currentLevel.score_goal && self.currentLevel.score_goal === target.score) {
                self.incrementLevel();
            }

            if(key === "penalty" && self.currentLevel.max_penalty && self.currentLevel.max_penalty === target.penalty) {
                target.lives--;
            }

        }

    });

}

module.exports = PPGSploderEmulator;

PPGSploderEmulator.prototype.objectIds = {};

PPGSploderEmulator.prototype.elevators = []; 

/**
 * 
 * @param {*} str 
 * @returns 
 */



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

    var graphicObj = this.pixelPhysicsParser.graphics[spriteObj.data.name_key];

    if(spriteObj.data.index === graphicObj.frameArr.length) {
        spriteObj.data.index = 0;
    }

    spriteObj.src = graphicObj.frameArr[spriteObj.data.index].canvas;

    spriteObj.data.index++;

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
PPGSploderEmulator.prototype.implementExtensions = require("./implementExtensions");
PPGSploderEmulator.prototype.implementEvents = require("./implementEvents");
PPGSploderEmulator.prototype.renderGameData = require("./renderGameData");
PPGSploderEmulator.prototype.setLevel = require("./setLevel");
PPGSploderEmulator.prototype.firstRender = require("./firstRender");
PPGSploderEmulator.prototype.createDescDiv = require("./descDiv");
PPGSploderEmulator.prototype.incrementLevel = require("./incrementLevel");
PPGSploderEmulator.prototype.renderExtensions = require("./renderExtensions");

// Check for chrome extension

if(chrome && chrome.extension) {
    window.PPGSploderEmulator = PPGSploderEmulator;
}