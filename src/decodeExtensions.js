const PPGSploderEmulator = require(".");
const dictionary = require("./dictionary.json");

function decodeExtensions(extensionData) {

    var a = extensionData.split(";");

    var o = {
        extension: dictionary.extensions[a[0]],
        objectA: a[1],
        pointA: PPGSploderEmulator.parseVector(a[2]),
        objectB: a[3],
        pointB: PPGSploderEmulator.parseVector(a[4]),
    }

    if(o.extension === "motor") {
        o.radians = Number.parseFloat(a[5]);
    }

    if(o.extension === "arcade_mover") {
        o.arrowKeysOnly  = !!Number.parseFloat(a[8]);
        o.wasdKeysOnly = !!Number.parseFloat(a[9]);
    }

    if(o.extension === "mover") {
        o.arrowKeysOnly  = !!Number.parseFloat(a[8]);
        o.wasdKeysOnly = !!Number.parseFloat(a[9]);
    }

    if(o.extension === "adder") {
        o.lifespan = Number.parseFloat(a[7]);
    }


}

module.exports = decodeExtensions;