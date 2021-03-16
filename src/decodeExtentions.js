const EXTENSION_CODES = {
    motor: 31,
    bouncer: 25,
    pinjoint: 26,
    grove: 30,
    spring_t: 28,
    spring_l: 29,
    gear_joint: 47,
    mover: 33,
    slider: 34,
    jumper: 45,
    aimer: 48,
    dragger: 50,
    clicker: 54,
    arcade_mover: 55,
    selector: 36,
    adder: 37,
    launcher: 35
}

PPGSploderEmulator.decodeExtensions = function(extensionData) {

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

}