const PPGSploderEmulator = require("./index.js");
const dictionary = require("./dictionary.json");

/**
 * Parse object data to create object.
 * @param {string} dataStr -  String representing object
 * @function
 * @memberof 
 */

function extractObject(dataStr) {

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
        passthru: dictionary.passthrough_layers[a[14]],
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

    o.builtInGraphicOnly = o.built_in_graphic && (o.stroke === "transparent") && (o.fill === "transparent")

    this.objectIds[o.id] = o;

    o.eventStack = {
        sensor: [],
        crush: [],
        clone: [],
        boundsout: []
    }

    o.simulationEventStack = o.eventStack;

    o.extensions = [];

    Object.assign(o,PhSim.PhSimEventTarget);

    return o;

}

module.exports = extractObject;