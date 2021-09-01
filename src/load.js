const PPGSploderEmulator = require("./index");
const decodeExtensions = require("./decodeExtensions"); 

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
                self.createPhSimDynObject(body);
                
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
    }).catch(function(o){
        console.error(o);
    })
 
}

module.exports = load;