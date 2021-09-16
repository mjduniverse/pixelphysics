/**
 * 
 * @param {Object}
 * @returns {Object}
 * 
 * @this PPGSploderEmulator
 * @memberof PPGSploderEmulator.prototype
 */


function createPhSimDynObject(o,pixelPhysicsParser) {

    var p = {}

    o.phSimStaticObj = p;

    // Widgets Property

    p.widgets = [];

    // Collision Classes

    var collisionClassArr = []

    for(let i = 0; i < 5; i++) {
        if(o.collisionLayers[i]) {
            collisionClassArr.push(i.toString());
        }
    }

    p.collisionClass = collisionClassArr.join(" ");

    if(collisionClassArr.length === 0) {
        p.noCollision = true;
    }

    // Name

    p.name = o.id;

    // Sensor Layers

    var sensorClassArr = [];

    if(o.sensor.ace) {
        sensorClassArr.push("ace");
    }

    if(o.sensor.diamond) {
        sensorClassArr.push("diamond");
    }

    if(o.sensor.heart) {
        sensorClassArr.push("heart");
    }

    if(o.sensor.spade) {
        sensorClassArr.push("spade");
    }

    if(o.sensor.spade) {
        sensorClassArr.push("flower");
    }

    p.sensorClass= sensorClassArr.join(" ");

    // Colors

    p.fillStyle = o.fill;
    p.strokeStyle = o.stroke;
    p.lineWidth = 4;

    // Graphics

    if(o.graphic) {

        p.sprite = {
            src: pixelPhysicsParser.graphics[o.graphic].url,

            data: {
                name_key: Number.parseInt(pixelPhysicsParser.graphics[o.graphic].name),
                index: 0
            }
        }

    }

    // Locks

    if(o.lock || o.constraints === "lock") {
        p.locked = true;
    }

    // No Rotation

    if(o.constraints === "noRotation") {
        p.widgets.push({
            type: "noRotation"
        })
    }

    // Axis Restraint

    if(o.constraints === "axis") {
        p.widgets.push({
            type: "circularConstraint" 
        })
    }

    if(p.cycle) {
        p.cycle = (Math.PI/360) * (o.angle - 90);
    }

    else {
        p.cycle = 0;
    }

    if(o.shape === "circle") {
        p.shape = "circle";
        p.x = o.center.x;
        p.y = o.center.y;
        p.radius = o.width / 2;
        
        if(p.sprite) {
            p.sprite.fit = true;
        }

    }

    if(o.shape === "rectangle") {
        p.x = o.center.x - o.width * 0.5;
        p.y = o.center.y - o.height * 0.5;
        p.w = o.width;
        p.h = o.height;
        p.shape = "rectangle";

        if(p.sprite) {
            p.sprite.fit = true;
        }

    }

    if(o.shape === "square") {
        p.x = o.center.x - o.width * 0.5;
        p.y = o.center.y - o.height * 0.5;
        p.w = o.width;
        p.h = o.width;
        p.shape = "rectangle";

        if(p.sprite) {
            p.sprite.fit = true;
        }

    }

    if(o.shape === "pentagon") {
        p.shape = "regPolygon";
        p.x = o.center.x;
        p.y = o.center.y;
        p.radius = o.width;
        p.sides = 5;

        if(p.sprite) {
            p.sprite.fit = true;
        }
    }
    
    if(o.shape === "hexagon") {
        p.shape = "regPolygon";
        p.x = o.center.x;
        p.y = o.center.y;
        p.radius = o.width;
        p.sides = 6;
 
        if(p.sprite) {
            p.sprite.fit = true;
        }

    }

    if(o.shape === "right_angle_triangle") {

        p.shape = "polygon",

        p.verts = [

            {
                x: o.center.x + 0.5 * o.width,
                y: o.center.y - 0.5 * o.width
            },

            {
                x: o.center.x + 0.5 * o.width,
                y: o.center.y + 0.5 * o.width
            },

            {
                x: o.center.x - 0.5 * o.width,
                y: o.center.y - 0.5 * o.width
            }
        ]

        if(p.sprite) {
            p.sprite.repeat = true;
        }

    }

    if(o.shape === "custom_polygon") {

        p.shape = "polygon";

        let verts = JSON.parse(JSON.stringify(o.path));

        for(let i = 0; i < verts.length; i++) {
            verts[i].x = o.center.x + verts[i].x;
            verts[i].y = o.center.y + verts[i].y;
        }

        p.verts = verts;

        //debugger;

    }

    return p;
    

}

module.exports = createPhSimDynObject;