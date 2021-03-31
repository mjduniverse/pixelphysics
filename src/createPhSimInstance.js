const dictionary = require("./dictionary.json");

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
            ppgSploderEmulator.renderExtensions();  
        });

        ppgSploderEmulator.phsim.on("objupdate",function(event){

            var currentObj = event.target
            var currentObjData2 = ppgSploderEmulator.currentLevel.bodyIds[currentObj.name];

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

        ppgSploderEmulator.phsim.on("afterupdate",function(event){
            ppgSploderEmulator.renderGameData();
        });


        console.log(this.objUniverse);

        console.log(ppgSploderEmulator);
        
        debugger;
    });

}

module.exports = createPhSimInstance;