const PPGSploderEmulator = require("./index");
const createPhSimInstance = require("./parser2phsim/createPhSimInstance");
const PixelPhysicsParser = require("./pixelphysics-parser");
const dictionary = require("./pixelphysics-parser/dictionary.json");

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
    
        // Creating PhSim instance

        self.pixelPhysicsParser = new PixelPhysicsParser(self.xmlTree);
        self.phsim = createPhSimInstance(self.pixelPhysicsParser);
        self.phsim.container.appendChild(self.createDescDiv());
        self.setLevel(self.pixelPhysicsParser.levels[0]);

        self.phsim.on("beforefirstslupdate",function(e){

            self.phsim.on("aftercanvasclear",function(e){
                self.renderGradient();
                self.renderExtensions();  
            });

            self.phsim.on("objupdate",function(event){

                var currentObj = event.target
                var currentObjData2 = self.currentLevel.bodyIds[currentObj.name];

                if(currentObjData2 && currentObjData2.builtInGraphicOnly) {
                    this.phRender.dynamicRenderDraw({
                        ...currentObj,
                        strokeStyle: "white",
                        lineWidth: 1
                    });
                }

                if(currentObjData2 && currentObjData2.built_in_graphic) {
                    this.ctx.textAlign = "center";
                    this.ctx.fillStyle = "white";
                    this.ctx.fillText(dictionary.built_in_graphics[currentObjData2.built_in_graphic],currentObj.matter.position.x,currentObj.matter.position.y);
                }
            })

            self.phsim.on("afterupdate",function(event){
                self.renderGameData();
            });


            //console.log(this.objUniverse);

            //console.log(ppgSploderEmulator);
            
            debugger;
        });

        resolve();

    }).then(function(){
        return new Promise(function(resolve,reject){

            // Decompose Graphics

            var graphicCount = 0;
            var graphicsArr = Object.values(self.pixelPhysicsParser.graphics);

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