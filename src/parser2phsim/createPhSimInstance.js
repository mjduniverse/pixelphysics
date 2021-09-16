const dictionary = require("../pixelphysics-parser/dictionary.json");
const createPhSimDynObject = require("./createPhSimDynObject");

/**
 * 
 * @param {PixelPhysicsParser} pixelPhysicsParser 
 */

function createPhSimInstance(pixelPhysicsParser) {
    
    var staticSim = {

        simulations: [],

        box: {
            w: 640,
            h: 480
        }

    }

    for(let i = 0; i < pixelPhysicsParser.levels.length; i++) {

        let level = {

            data: {
                sploder: pixelPhysicsParser.levels[i]
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

        if(pixelPhysicsParser.levels[i].bounds === 0) {
            level.layers[5].objUniverse.push(topRect,botomRect,leftRect,rightRect);
        }

        staticSim.simulations.push(level);

        for(let j = 0; j < pixelPhysicsParser.levels[i].bodies.length; j++) {

            let levelIndex = 4 - (pixelPhysicsParser.levels[i].bodies[j].overlap_layer - 1);

            let o = pixelPhysicsParser.levels[i].bodies[j];
            let p = createPhSimDynObject(o,pixelPhysicsParser);

            level.layers[levelIndex].objUniverse.push(p); 
        }

        if(pixelPhysicsParser.levels[0].gravity === true) {
            level.world.grav = 0;
        }

        else {
            level.world.grav = 1;
        }

        
        var phsim = new PhSim(staticSim);

    }
    
    return phsim;

}

module.exports = createPhSimInstance;