const PPGSploderEmulator = require(".");
const dictionary = require("./dictionary.json");

function decodeExtensions(extensionData) {

    var a = extensionData.split(";");

    return {
        extension: dictionary.extensions[a[0]],
        objectA: a[1],
        pointA: PPGSploderEmulator.parseVector(a[2]),
        objectB: a[3],
        pointB: PPGSploderEmulator.parseVector(a[4]),
        radians: Number.parseFloat(a[5]),
    }

}

module.exports = decodeExtensions;