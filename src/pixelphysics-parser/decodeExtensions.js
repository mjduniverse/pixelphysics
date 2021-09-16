/**
 * Module used to parse data for physics, controls and widgets.
 * @module src/decodeExtensions
 */

const dictionary = require("./dictionary.json");
const dataTypes = require("./datatypes");

function decodeExtensions(extensionData) {

    var a = extensionData.split(";");

    var o = {
        extension: dictionary.extensions[a[0]],
        objectA: Number.parseInt(a[1]),
        pointA: dataTypes.parseVector(a[2]),
        objectB: Number.parseInt(a[3]),
        pointB: dataTypes.parseVector(a[4]),
    }

    if(o.extension === "motor") {
        o.radians = Number.parseFloat(a[5]);
    }

    if(o.extension === "rotator") {
        o.radians = Number.parseFloat(a[5]);
    }

    if(o.extension === "arcade_mover") {
        o.arrowKeysOnly  = !!Number.parseFloat(a[8]);
        o.wasdKeysOnly = !!Number.parseFloat(a[9]);
        o.distance = Number.parseFloat(a[5]);
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