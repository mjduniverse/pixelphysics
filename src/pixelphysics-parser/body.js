const PPGSploderEmulator = require("../index.js");
const dictionary = require("./dictionary.json");
const dataTypes = require("./datatypes.js");

/**
 * Parse object data to create object.
 * @param {string} dataStr -  String representing object
 * @function
 * @memberof 
 */

function extractObject(dataStr) {




}

function Body(dataStr) {

    var a = dataStr.split(/#|;/);


    this.bodyData = dataStr,
    this.id = Number.parseFloat(a[0]),
    this.center = dataTypes.parseVector(a[1]),
    this.axis = dataTypes.parseVector(a[2]),
    this.angle = Number.parseFloat(a[3]),
    this.group = Number.parseInt(a[4]),
    this.shape = dictionary.shapes[a[5]],
    this.width = Number.parseFloat(a[6]),
    this.height = Number.parseFloat(a[7]),
    this.path = dataTypes.parseVectorSet(a[8]),
    this.constraints = dictionary.constraints[a[9]],
    this.material = dictionary.material[a[10]],
    this.strength = dictionary.strength[a[11]],
    this.lock = !!Number.parseInt(a[12]),
    this.collisionBitField = a[13],
    this.collisionLayers = dataTypes.u5bitfieldDecode(a[13]),
    this.passthru = dictionary.passthrough_layers[a[14]],
    this.sensorBitField = a[15],
    this.sensor = dataTypes.decodeSensorLayers(a[15]),
    this.fill = dataTypes.decodeColor(a[16]),
    this.stroke = dataTypes.decodeColor(a[17]),
    this.built_in_graphic = Number.parseInt(a[18]),
    this.overlap_layer = Number.parseInt(a[19]),
    this.transparent = !Number.parseInt(a[20]),
    this.scribble = !!Number.parseInt(a[21]),
    this.events = dataTypes.decodeEvents(a[22]),
    this.graphic = Number.parseInt(a[23]),
    this.texture = a[27],
    
    this.builtInGraphicOnly = this.built_in_graphic && (this.stroke === "transparent") && (this.fill === "transparent")

    //this.objectIds[this.id] = o;

    this.eventStack = {
        sensor: [],
        crush: [],
        clone: [],
        boundsout: []
    }

    this.simulationEventStack = this.eventStack;

    this.extensions = [];

    Object.assign(this,PhSim.PhSimEventTarget);

}

module.exports = Body;