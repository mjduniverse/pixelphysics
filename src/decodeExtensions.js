const EXTENSION_CODES = require("./extensionCodes.json");

function decodeExtensions(extensionData) {

    let objectA = a[1];
    let objectB = a[3];

    let pointA = a[2];
    let pointB = a[4];

    var a = extensionData.split(";");

    if(Number.parseInt(a[0] === EXTENSION_CODES.motor)) {
        return {
            extension: "motor",
            objectA: a[1],
            radians: Number.parseFloat(a[5])
        }
    }

    if(Number.parseInt(a[0] === EXTENSION_CODES.bouncer)) {
        return {
            extension: "bouncer",
            objectA: a[1],
            vector: PPGSploderEmulator.parseVector(a[4])
        }
    }

    if(Number.parseInt(a[0]) === EXTENSION_CODES.pinjoint) {
        return {
            extension: "pinjoint"
        }
    }  

    if(Number.parseInt(a[0]) === EXTENSION_CODES.dragger) {
        return {
            extension: "dragger",
            objectA: a[1]
        }
    } 
    
    if(Number.parseFloat(a[0]) === EXTENSION_CODES.clicker) {
        return {
            extension: "clicker",
            objectA: a[1]
        }
    }

}

module.exports = decodeExtensions;