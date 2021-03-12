const EXTENSION_CODES = {
    motor: 31,
    bouncer: 25,
    pinjoint: 26,
    dragger: 50,
}

PPGSploderEmulator.decodeExtensions = function(extensionData) {

    let objectA = a[1];
    let objectB = a[3];

    let pointA = a[2];
    let pointB = a[4];

    var a = extensionData.split(";");

    if(Number.parseInt(a[0] === EXTENSION_CODES.motor)) {
        return {
            extension: "Motor",
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

}