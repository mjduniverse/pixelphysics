/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 1458:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * @namespace
 * @memberof PhSim
 */

var Audio = {}

/**
 * @constructor
 * @param {Object} p_audio - Static Audio Object
 * @param {Function} onload 
 */

Audio.AudioArray = function(p_audio,onload) {

	// force load function if audio list is empty
	
	this.array = [];
	this.loaded_n = 0;
	this.loaded = false;
	this.onload = onload;

	var self = this;

	
	if(p_audio.length === 0) {
		self.loaded = true;
		self.onload();
	}

	for(var i = 0; i < p_audio.length; i++) {

		var audio = document.createElement("audio");

		var f = function() {
			self.loaded_n++;

			if(self.array.length === self.loaded_n) {
				self.loaded = true;
				self.onload();
				audio.removeEventListener("canplaythrough",f);
			}

		}

		audio.addEventListener("canplaythrough",f)

		audio.src = p_audio[i].src;
		audio.loop = p_audio[i].loop

		this.array.push(audio);

	}

}

/**
 * Play audio by index.
 * Alternative function: {@link PhSim#playAudioByIndex}
 * 
 * @function 
 * @param {PhSim} phsim - PhSim instance.
 * @param {Number} i - Index in audio array.
 * @returns {Promise} - Promise that is fulfilled when the audio is played. 
 */

Audio.playAudioByIndex = function(phsim,i) {
	return phsim.audioArray.array[i].play();
}

/**
 * Play audio by index
 * Alternative function: {@link PhSim.Audio#playAudioByIndex}
 * 
 * @function 
 * @param {PhSim} phsim - PhSim instance.
 * @param {Number} i - Index in audio array.
 * @returns {Promise} - Promise that is fulfilled when the audio is played.  
 */

PhSim.prototype.playAudioByIndex = function(i) {
	Audio.playAudioByIndex(this,i);
};

/**
 * Pause audio by index.
 * Alternative function: {@link PhSim#pauseAudioByIndex}
 * @function
 * @param {PhSim} phsim - PhSim instance.
 * @param {Number} i 
 */

Audio.pauseAudioByIndex = function(phsim,i) {
	return phsim.audioArray.array[i].pause();
}

/**
 * Pause audio by index.
 * Alternative function: {@link PhSim.Audio#pauseAudioByIndex}
 * @function
 * @param {Number} i 
 */

PhSim.prototype.pauseAudioByIndex = function(i) {
	return Audio.pauseAudioByIndex(this,i);
}

/**
 * Set volume by index
 * Alternative function: {@link PhSim#setAudioVolByIndex}
 * @function
 * @param {PhSim} phsim - PhSim instance
 * @param {Number} i - Index
 * @param {Number} v - Volume
 */

Audio.setAudioVolByIndex = function(phsim,i,v) {
	return phsim.audioArray.array[i].volume = v;
}

/**
 * Set volume by index
 * Alternative function: {@link PhSim.Audio#setAudioVolByIndex}
 * @function
 * @param {Number} i - Index
 * @param {Number} v - Volume
 */

PhSim.prototype.setAudioVolByIndex = function(i,v) {
	return Audio.setAudioVolByIndex(this,i,v);
}


/**
 * 
 * Mute the `i`th element of the audio array.
 * 
 * Alternative function: {@link PhSim#setAudioMuteByIndex}
 * 
 * @function
 * @param {Number} i
 * @param {PhSim} phsim - PhSim instance 
 */

Audio.setAudioMuteByIndex = function(phsim,i) {
	return phsim.audioArray.array[i].muted = true;
}

/**
 * 
 * Mute the `i`th element of the audio array.
 * 
 * Alternative function: {@link PhSim.Audio#setAudioMuteByIndex}
 * 
 * @function
 * @param {PhSim} phsim - PhSim instance 
 */

PhSim.prototype.setAudioMuteByIndex = function(i) {
	return Audio.setAudioMuteByIndex(this,i);
}

/**
 * @function
 * @param {PhSIm} phsim - PhSim instance
 * @param {Number} i - Index number
 * @returns {Boolean} - True if paused, false otherwise.
 */


Audio.toggleAudioByIndex = function(phsim,i) {
	return phsim.audioArray.array[i].muted = !phsim.audioArray.array[i].muted;
}

/**
 * @function
 * @param {Number} i
 * @returns {Boolean} - True if paused, false otherwise.
 */

PhSim.prototype.toggleAudioByIndex = function(i) {
	return Audio.toggleAudioByIndex(this,i);
}

module.exports = Audio;

/***/ }),

/***/ 3499:
/***/ (() => {



/***/ }),

/***/ 1800:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * 
 * Calculate DynObject skinmesh
 * 
 * @function
 * @memberof PhSim
 * @param {PhSim.DynObject} dynObject 
 */

// Try to import matter.js as a commonJS module

var calc_skinmesh = function(dynObject) {

	/** Vector defining transformation */
	
	dynObject.transformVector = {
		x: (dynObject.matter.position.x - dynObject.matter.positionPrev.x),
		y: (dynObject.matter.position.y - dynObject.matter.positionPrev.y),
	}

	/** Number defining rotation */

	var transformAngle = dynObject.matter.angle - dynObject.matter.anglePrev 

	Matter.Vertices.translate(dynObject.skinmesh,Matter.Vertices.centre(dynObject.skinmesh),-1);
	Matter.Vertices.rotate(dynObject.skinmesh,transformAngle,{x: 0, y: 0});
	Matter.Vertices.translate(dynObject.skinmesh,dynObject.matter.position,1);

	dynObject.verts = dynObject.skinmesh;
	dynObject.verts = dynObject.skinmesh;

}

module.exports = calc_skinmesh;

/***/ }),

/***/ 390:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Static = __webpack_require__(2094);
const PhSim = __webpack_require__(8138);
const Vertices = __webpack_require__(9153);
const PhSimEventTarget = __webpack_require__(4956);
const EventStack = __webpack_require__(1010);

// Try to import matter.js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * 
 * Create Dynamic Object from static object
 * @constructor
 * @memberof PhSim
 * @param {PhSimObject} staticObject - Static Object
 * @param {Matter.Body} [matterBody] - Matter Body
 * 
 * @mixes PhSim.PhSimEventTarget
 * @mixes StaticObject
 * 
 * @property {Number} x - x position
 * @property {Number} y - y position
 * 
 */

var DynObject = function(staticObject,matterBody) {

	Object.assign(this,PhSimEventTarget);

	Object.assign(this,PhSim.Query.deepClone(staticObject));

	/**
	 * DynObject name
	 * @type {String}
	 */

	this.name = staticObject.name;

	/**
	 * Array of connected Dynamic Objects
	 * @type {PhSim.DynObject[]}
	 *
	 */

	this.connectedDynObjects = [];

	/**
	 * DynObject type
	 * @type {"circle" | "polygon" | "rectangle" | "regPolygon"}
	 * 
	 */

	this.shape = staticObject.shape;

	// Apply Shape Specific Constructor

	if(this.shape === "circle") {
		Static.Circle.call(this,staticObject.x,staticObject.y,staticObject.radius);
	}

	if(this.shape === "regPolygon") {
		Static.RegPolygon.call(this,staticObject.x,staticObject.y,staticObject.radius,staticObject.sides)
	}

	if(this.shape === "rectangle") {
		Static.Rectangle.call(this,staticObject.x,staticObject.y,staticObject.w,staticObject.h);
	}

	if(this.shape === "polygon") {
		Static.Polygon.call(this,staticObject.verts);
	}

	this.widgets = staticObject.widgets;

	/**
	 * Matter Body
	 * @type {Object}
	 */

	this.matter = matterBody || PhSim.DynObject.createMatterObject(staticObject);

	if(this.shape === "polygon") {
		this.skinmesh = JSON.parse(JSON.stringify(staticObject.verts));
	}

	/**
	 * Inital angle of object
	 * @type {Number}
	 */

	this.firstCycle = staticObject.cycle || 0;

	if(this.shape === "composite") {
		this.flattenedParts = DynObject.flattenComposite();
	}

	/** 
	 * Reference to static object used to create the DynObject
	 * @type {StaticObject}
	 */

	this.static = staticObject;

	/** 
	 * Object ID 
	 * @type {String}
	 * */

	this.id = DynObject.nextId;
	DynObject.nextId++;

	/**
	 * Custom properties that can be added by the user to extend the DynObject.
	 * This property is not deep cloned, but assigned to `staticObject.data`.
	 * 
	 * @type {Object}
	 */

	this.data = staticObject.data || {}
	
	/**
	 * Reference to parent simulation
	 * @type {null|PhSim}
	 */

	this.phSim;

	/**
	 * Boolean that makes a dynamic object not collide with anything.
	 * @type {boolean}
	 * @default false
	 */

	this.noCollision = this.noCollision || false;

	/**
 	 * Object containing array functions to be called.
 	 * @type {PhSim.EventStack}
 	 */

	this.eventStack = new EventStack();

	/** 
	 * Reference of DynObject in matter object 
	 * @type {PhSim.DynObject}
	 * */

	this.matter.plugin.dynObject = this;


	if(DynObject.keepInstances) {
		DynObject.instances.push(this);
	}

}

/**
 * If set to `true`, all DynObject instances are put into the 
 * {@link PhSim.DynObject.instances} array. By default, this is `false`.
 * Do not use unless you want to risk memory leaks. This is primarily for debugging 
 * purposes.
 * 
 * @memberof PhSim.DynObject
 * @type {Boolean}
 * @default false
 */

DynObject.keepInstances = false;

/**
 * If set to true, the `staticObject` is cloned before Object.assign is applied to 
 * the DynObject to clone it.
 */

DynObject.deepCloneStaticObject = false;

/**
 * Array of instances if {@link PhSim.DynObject.keepInstances} is set to true
 * @type {PhSim.DynObject[]}
 */

DynObject.instances = [];

/**
 * Set color for dynObject.
 * This can be done alternatively by setting `dynObject.fillStyle` directly.
 * 
 * @param {PhSim.DynObject} dyn_object - Dynamic Object
 * @param {String} colorStr - Color String
 */

DynObject.setColor = function(dyn_object,colorStr) {
	dyn_object.fillStyle = colorStr;
}

/**
 * Set color for dynObject.
 * This can be done alternatively by setting `dynObject.fillStyle` directly.
 * 
 * @param {String} colorStr - Color String
 */

DynObject.prototype.setColor = function(colorStr) {
	return DynObject.setColor(this,colorStr)
}

/**
 * Set border color.
 * @param {PhSim.DynObject} dyn_object 
 * @param {String} colorStr 
 */

DynObject.setBorderColor = function(dyn_object,colorStr) {
	dyn_object.strokeStyle = colorStr;
}

/**
 * Set border color.
 * @param {String} colorStr 
 */

DynObject.prototype.setBorderColor = function(colorStr) {
	return DynObject.setBorderColor(this,colorStr);
}

/**
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @param {Number} lineWidth 
 */

DynObject.setLineWidth = function(dyn_object,lineWidth) {
	dyn_object.lineWidth = lineWidth;
}


/**
 * 
 * @function
 * @param {PhSimObject} composite - The composite to be flattened.
 * @returns {PhSimObject[]} - The array of objects found in the composites. 
 */

DynObject.flattenComposite = function(composite) {

	var a = [];

	/**
	 * 
	 * @param {*} composite
	 * @inner
	 */
	
	var __f = function(composite) {

		for(var i = 0; i < composite.parts.length; i++) {

			if(composite.parts[i].shape === "composite") {
				DynObject.flattenComposite(composite.parts[i].shape === "composite");
			}

			else {
				a.push(composite.parts[i]);
			}

		}


	}

	__f(composite);

	return a;

}

/**
 * 
 * Create path
 * 
 * @function
 * @param {Vector[]} vectorSet 
 * @param {Path} options 
 */

DynObject.createPath = function(vectorSet,options) {
	var o = new Static.Polygon(vectorSet);
	Object.assign(o,options);
	return new DynObject(o);
}

/**
 * Create circle
 * 
 * @function
 * @param {Number} x - x-coordinate of center
 * @param {Number} y - y-coordinate of center
 * @param {Number} r - radius
 * @param {Circle} options - options
 * @returns {PhSim.DynObject}
 */

DynObject.createCircle = function(x,y,r,options = {}) {
	var o = new Static.Circle(x,y,r);
	Object.assign(o,options);
	return new DynObject(o);
}

/**
 * 
 * Create rectangle
 * 
 * @function
 * @param {Number} x - x-coordinate of upper left corner 
 * @param {Number} y - y-coordinate of upper left corner 
 * @param {Number} w - Width
 * @param {Number} h - Height
 * @param {Rectangle} options 
 * @returns {PhSim.DynObject} - The rectangle
 */

DynObject.createRectangle = function(x,y,w,h,options = {}) {
	var o = new Static.Rectangle(x,y,w,h);
	Object.assign(o,options);
}

/**
 * Create regular polgyon.
 * 
 * @function
 * @param {Number} x - x-coordinate of center
 * @param {Number} y - y-coordinate of center
 * @param {Number} r - radius
 * @param {Number} n - number of sides
 * @param {RegPolygon} options - options
 * @returns {PhSim.DynObject}
 */

DynObject.createRegPolygon = function(x,y,r,n,options = {}) {
	var o = new Static.RegPolygon(x,y,r,n);
	Object.assign(o,options);
	return new DynObject(o);
}

/**
 * 
 * Create a matter.js object from a DynSim static object
 * 
 * @function
 * @param {StaticObject} staticObject
 * @returns {MatterBody} 
 */

DynObject.createMatterObject = function(staticObject) {

	var shape = staticObject.shape;

	var opts = staticObject.matter || {}

	opts.label = staticObject.name || "Untitled Object";

	opts.isStatic = staticObject.locked || staticObject.semiLocked;

	var set;

	if(typeof staticObject.density === "number") {
		opts.density = staticObject.density;

	}

	else {
		opts.density = 0.001;
	}

	if(typeof staticObject.mass === "number") {
		opts.mass = staticObject.mass;
		opts.inverseMass = 1/staticObject.mass;
	}

	if(typeof staticObject.airFriction === "number") {
		opts.airFriction = staticObject.airFriction;
	}

	if(Number.isInteger(staticObject.collisionNum)) {
		opts.collisionFilter = staticObject.collisionNum;
	}


	if(shape === "polygon") {
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(staticObject.verts).x, Matter.Vertices.centre(staticObject.verts).y, staticObject.verts, opts);
	}

	
	else if(shape === "circle") {
		return Matter.Bodies.circle(staticObject.x, staticObject.y, staticObject.radius,opts);
	}


	else if(shape === "rectangle") {
		set = Vertices.rectangle(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
	}

	else if(shape === "regPolygon") {
		set = Vertices.regPolygon(staticObject);
		return Matter.Bodies.fromVertices(Matter.Vertices.centre(set).x, Matter.Vertices.centre(set).y, set, opts); 
	}


}

DynObject.nextId = 0;

/**
 * A PhSimObject is either a static object or a dynamic object.
 * 
 * @typedef {PhSim.DynObject|StaticObject} PhSimObject
 * 
 */

 /**
  * A PhSimObject array is an array of PhSimObject objects
  * @typedef {PhSimObject[]} PhSimObjectArr
  */

module.exports = DynObject;

/***/ }),

/***/ 9662:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Vector = __webpack_require__(2450)
const Motion = __webpack_require__(341);

/**
 * @constructor
 * @memberof PhSim
 * @param {*} dynSim 
 */

var Camera = function(dynSim) {

	/**
	 * Dynamic Simulation
	 * @type {PhSim}
	 */

	this.dynSim = dynSim;

}

/**
 * Camera scale
 * @type {Number}
 */

Camera.prototype.scale = 1;

/**
 * Camera offset x 
 * @type {Number}
 */

Camera.prototype.x = 0;

/**
 * Camera offset y
 * @type {Number}
 */

Camera.prototype.y = 0;

/**
 * Target object
 * @type {StaticObject}
 */

Camera.prototype.targetObj = null;

/**
 * Objects that will transform with the camera
 * @type {StaticObject[]}
 */

Camera.prototype.transformingObjects = []

Camera.prototype.zoomIn = function(scaleFactor) {
	this.scale = this.scale * scaleFactor;
	this.dynSim.ctx.scale(scaleFactor,scaleFactor);
}

/**
 * Translate camera by the vector `(dx,dy)`.
 * 
 * @param {Number} dx - Amount to transform camera in `x` direction.
 * @param {Number} dy - Amount to transform camera in `y` direction.
 * 
 */

Camera.prototype.translate = function(dx,dy) {

	dx = dx || 0
	dy = dy || 0

	this.x = this.x + dx;
	this.y = this.y + dy;
	this.dynSim.ctx.translate(dx,dy);

	for(var i = 0; i < this.transformingObjects.length; i++) {
		Motion.translate(this.transformingObjects[i],new Vector(-dx,-dy));
	}
}

Camera.prototype.setPosition = function(x,y) {
	this.dynSim.ctx.translate(-this.x,-this.y)
	this.x = x;
	this.y = y;
}

module.exports = Camera;

/***/ }),

/***/ 4956:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * @mixin
 * @memberof PhSim
 */

const PhSimEventTarget = {}

/**
 * 
 * Used to add events to a PhSim simulation
 * 
 * @function
 * @param {string} eventStr - String representing the event.
 * @param {PhSimEventCall} call - Function to run when event is executed.
 * @param {object} [options = {}] - Event Listener Options.
 * @param {boolean} [options.once] - If true, the function is executed only once.
 * @param {boolean} [options.slEvent] - If true, the event will be removed when the simulation changes
 * 
 */

PhSimEventTarget.on = function(eventStr,call,options = {}) {
	
	if(options && options.slEvent === true) {
		if(this.simulationEventStack[eventStr]) {
			this.simulationEventStack[eventStr].push(call);
		}
	}

	else {
		if(this.eventStack[eventStr]) {
			this.eventStack[eventStr].push(call);
		}
	}


	if(options) {
		if(options === true) {
			if(options.once) {
	
				var f = function() {
					this.off(eventStr,call)
					this.off(eventStr,f)
				}
	
				this.on(eventStr,f);

			}
		}

	}


	else {
		throw new Error("Event Target Not Available")
	}

}

/**
 * @function 
 * @param {String} eventStr 
 * @param {PhSimEventCall} call 
 */


PhSimEventTarget.off = function(eventStr,call) {

	var callIndex;
	
	if(this.eventStack[eventStr] && this.eventStack[eventStr].includes(call)) {
		callIndex = this.eventStack[eventStr].indexOf(call);
		this.eventStack[eventStr].splice(callIndex,1);
	}

	if(this.simulationEventStack[eventStr] && this.simulationEventStack[eventStr].includes(call)) {
		callIndex = this.simulationEventStack[eventStr].indexOf(call);
		this.simulationEventStack[eventStr].splice(callIndex,1);
	}

}

/**
 * @function
 * @param {PhSim.Events.PhSimEvent} event - Event Object
 */

PhSimEventTarget.callEventClass = function(eventStr,thisArg,eventArg) {

	var func;

	if(this.eventStack[eventStr]) {
		for(let i = 0; i < this.eventStack[eventStr].length; i++) {
			func = this.eventStack[eventStr][i]
			eventArg.func = func;
			func.call(thisArg,eventArg);

		}
	}

	if(this instanceof PhSim) {

		if(this.simulationEventStack[eventStr]) {
			for(let j = 0; j < this.simulationEventStack[eventStr].length; j++) {
	
				func = this.simulationEventStack[eventStr][j]
				eventArg.func = func;
				func.call(thisArg,eventArg);
	
			}
		}

	}
	
}

module.exports = PhSimEventTarget;

/***/ }),

/***/ 1448:
/***/ ((module) => {

/**
 * Namespace for event objects
 * @memberof PhSim
 * @namespace
 */

const Events = {}

/**
 * @constructor
 * 
 * 
 */

Events.PhSimEvent = function(type) {
	this.target = null; 
	this.timestamp = null;
	this.type = type;
}

/**
 * @constructor
 */

Events.PhSimDynEvent = function() {
	Events.PhSimEvent.call(this);
	this.layer = null;
	this.simulation = null;
	this.object = null;
}

Events.PhSimDynEvent.prototype = Object.create(Events.PhSimEvent.prototype);

/**
 * @constructor
 * @extends PhSim.Events.PhSimEvent
 */


Events.PhSimEventKey = function() {
	Events.PhSimDynEvent.call(this);
	this.key = null;
	this.domEvent = null;
}

Events.PhSimEventKey.prototype = Object.create(Events.PhSimDynEvent.prototype);

/**
 * Event object for mouse events.
 * 
 * @constructor
 * @extends PhSim.Events.PhSimDynEvent
 */


Events.PhSimMouseEvent = function() {
	Events.PhSimDynEvent.call(this);
	this.x = null;
	this.y = null;
	this.domEvent = null;
	this.dynArr = null;
}

Events.PhSimMouseEvent.prototype = Object.create(Events.PhSimDynEvent.prototype);

/**
 * 
 * Event fired whenever the mouse is pressed down on an object.
 * 
 * @event PhSim.Events#objmousedown
 * @type {PhSim.Events.PhSimMouseEvent}
 */

/**
 * Event fired whenever the mouse is let go of while over an object
 * 
 * @event PhSim.Events#objmouseup
 * @type {PhSim.Events.PhSimMouseEvent}
 */

/**
 * @constructor
 */


Events.PhSimCollision = function() {
	this.bodyA = null;
	this.bodyB = null;
	this.matter = null;
}

module.exports = Events;

/***/ }),

/***/ 1010:
/***/ ((module) => {

/**
 * 
 * The event stack is an object that is used to store event listeners.
 * @constructor
 * @memberof PhSim
 * @enum {PhSimEventCall[]}
 * 
 */

const EventStack = function() {

	/** 
	 * 
	 * Array of functions to be executed whenever two or more objects contact each other
	 * This array represents {@link event:contact} 
	 * @type {PhSimEventCall[]}
	 * 
	*/

	this.contact = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation updates 
	 * This array represents {@link event:beforeupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforeupdate = [];

	/** 
	 * 
	 * Array of functions to be exected when PhSim.updateDynObject is called 
	 * This array represents {@link event:objupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.objupdate = [];


	/** 
	 * 
	 * Array of functions to be executed after the simulation updates 
	 * This array represents {@link event:afterupdate} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.afterupdate = [];

	/** 
	 * 
	 * Array of functions to be executed before the simulation is changed 
	 * This array represents {@link event:beforeslchange} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforeslchange = [];

	/** 
	 * 
	 * Array of functions to be executed after the simulation is changed 
	 * This array represents {@link event:afterslchange} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.afterslchange = [];

	/** 
	 * 
	 * Array of functions to be executed before the Sprite Image Array loads 
	 * This array represents {@link event:beforespriteimgload} 
	 * 
	 * @type {PhSimEventCall[]}
	 * 
	 */

	this.beforespriteimgload = [];

	/** Array of functions to be executed after the Sprite Image Array loads */

	this.afterspriteimgload = [];
	this.beforeforcekey = [];

	/** 
	 * Array of functions to be executed when mouse is let go while over simulation 
	 * canvas 
	 * 
	 * This array represents {@link event:mouseup} 
	 * 
	 */

	this.mouseup = [];

	/** 
	 * Array of functions to be executed when mouse leaves simulation canvas 
	 * 
	 * This array represents {@link event:mouseout} 
	 *
	 */

	this.mouseout = [];

	/** 
	 * Array of functions to be executed when the mouse moves
	 * This array represents {@link event:mousemove} 
	 * 
	 */

	this.mousemove = [];

	/** Array of functions to be executed when at least one key is pressed */

	this.keydown = [];

	/** Array of functions to be executed when a new collision is created */

	this.collisionstart = [];

	/** Array of functions to be executed during an active collision */

	this.collisionactive = [];

	/** Array of functions to be executed when a new collision is deleted */

	this.collisionend = [];

	this.beforecounterset = [];

	this.aftercounterset = [];

	this.collisionchange = [];

	this.load = [];

	this.matterJSLoad = [];

	/** Array of functions to be executed when an object is cloned */

	this.clone = [];

	/** Array of functions to be executed when the mouse is down on an object */

	this.objmousedown = [];

	/** Array of functions to be executed when the mouse is over an object */

	this.objmouseover = [];

	/** Array of functions to be executed when the mouse is over an object */

	this.objmouseout = [];

	/** Array of functions  */

	this.firstslupdate = [];

	this.beforefirstslupdate = [];

	/** Array of functions to be executed before the simulation exit */

	this.exit = []

	/** Array of functions to be executed when the canvas is clicked down on */

	this.mousedown = [];

	/** Array of functions to be executed when the canvas is clicked on */

	this.click = [];

	this.objclick = [];

	this.objmousemove = [];

	this.objmouseup = [];

	this.score = [];

	this.hazard = [];

	this.gamewin = [];

	this.levelwin = [];

	this.levelloss = [];

	/**
	 * Array of functions to be executed when an wFunction body makes an error.
	 */

	this.wfunctionerror = [];

	/**
	 * Array of functions to be executed after the canvas are cleared.
	 */

	this.aftercanvasclear = [];


}

module.exports = EventStack;

/***/ }),

/***/ 1844:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * Fire the mousedown event for PhSim.
 * If {@link PhSim#objMouseArr} length is greater than zero, 
 * this also executes the objmousedown event
 *
 * @listens objmousedown
 * @function
 * @param {MouseEvent} e - Mouse Event Object
 */

/**
 * The standard object for mouse related DOM events
 * @external MouseEvent
 * @type {MouseEvent} 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
 */


/**
 * Listens click event
 * @function
 * @listens MouseEvent
 * @param {MouseEvent} e 
 */

/**
 * Fire the mousedown event for PhSim.
 * If {@link PhSim#objMouseArr} length is greater than zero, 
 * this also executes the objmousedown event
 *
 * @listens MouseEvent
 * @function
 * @param {MouseEvent} e - Mouse Event Object
 */

/**
 * @function
 * @param {MouseEvent} e 
 */

/**
 * @function
 * @param {MouseEvent} e 
 */



/**
 * 
 * Create a wrapping function that is used for events.
 * 
 * @param {Function} f - Function
 * 
 */

PhSim.prototype.getEventBridge = function(f) {

	var self = this;

	return function(e) {
		f.call(self,e);
	}
}

/**
 * 
 * Used to set event listeners for a canvas.
 * This function works if {@link PhSim.prototype#ctx} 
 * and {@link PhSim.prototype#canvas} are set.
 * 
 * @function
 * @this PhSim
 *  
 */

PhSim.prototype.registerCanvasEvents = function() {

	var self = this;

	/**
	 * @function 
	 * @this HTMLCanvasElement
	 * @param {external:MouseEvent} e - MouseEvent object
	 * 
	 * @fires Events#mousedown
	 * @fires Events#objmousedown
	 * 
	 */


	this.dispatchMouseDown = function(e) {

		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		eventObj.domEvent = e;
		eventObj.x =  self.mouseX
		eventObj.y = self.mouseY
		eventObj.type = "mousedown";
		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(!self.paused) {
			if(self.objMouseArr && self.objMouseArr.length > 0) {
				
				eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

				self.callEventClass("objmousedown",canvas,eventObj);

				for(var i = 0; i < eventObj.dynArr.length; i++) {
					eventObj.dynArr[i].callEventClass("objmousedown",eventObj.dynArr[i],eventObj);
				}

			}
		}

		/**
		 * PhSim `mousedown` event.
		 * @event mousedown
		 * @type {PhSim.Events.PhSimMouseEvent}
		 */
	
		self.callEventClass("mousedown",canvas,eventObj);
	}

	this.canvas.addEventListener("mousedown",this.dispatchMouseDown);

	/**
	 * @function
	 * @param {external:MouseEvent} e 
	 * 
	 * @fires Events#click
	 * @fires Events#objclick
	 * 
	 */

	this.dispatchClick = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		eventObj.domEvent = e;
		eventObj.x =  self.mouseX
		eventObj.y = self.mouseY
		eventObj.type = "click";
		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);

		if(self.objMouseArr.length > 0) {

			eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

			self.callEventClass("objclick",canvas,eventObj);

			for(var i = 0; i < eventObj.dynArr.length; i++) {
				eventObj.dynArr[i].callEventClass("objclick",eventObj.dynArr[i],eventObj);
			}

		}
	
		self.callEventClass("click",canvas,eventObj);
	}

	this.canvas.addEventListener("click",this.dispatchClick);

	/**
	 * 
	 * Dispatch `mousemove` event.
	 * 
	 * @function
	 * @param {external:MouseEvent} e - Standard MouseEvent Javascript object 
	 * 
	 * @fires PhSim.Events#objmousemove
	 * @fires PhSim.Events#objmouseover
	 * @fires PhSim.Events#objmouseout
	 * @fires PhSim.Events#mousemove
	 */

	this.dispatchMouseMove = function(e) {

		var perform_i = performance.now()

		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		var rect = canvas.getBoundingClientRect();
		eventObj.domEvent = e;
	
		eventObj.x =  e.clientX - rect.left - self.camera.x;
		eventObj.y = e.clientY - rect.top - self.camera.y;

		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(self.mouseX && self.mouseY) {
			self.prevMouseX = self.mouseX;
			self.prevMouseY = self.mouseY;
		}
	
		self.prevObjMouseArr = [];
	
		if(self.objMouseArr) {
			self.prevObjMouseArr = [...self.objMouseArr];
		}
	
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
	
		self.dynArr = self.objMouseArr;
	
		self.objMouseArr = [];
		self.formerMouseObjs = [];
		self.newMouseObjs = [];
	
		if(self.init) {
	
			for(var i = 0; i < self.objUniverse.length; i++) {
	
				if(self.pointInObject(self.objUniverse[i],self.mouseX,self.mouseY)) {
					self.objMouseArr.push(self.objUniverse[i]);
					self.objUniverse[i].callEventClass("objmousemove",self.objUniverse[i],eventObj);
				}
	
				if(!self.objMouseArr.includes(self.objUniverse[i]) && self.prevObjMouseArr.includes(self.objUniverse[i])) {
					self.formerMouseObjs.push(self.objUniverse[i]);
					self.objUniverse[i].callEventClass("objmouseover",self.objUniverse[i],eventObj);
				}
	
				if(self.objMouseArr.includes(self.objUniverse[i]) && !self.prevObjMouseArr.includes(self.objUniverse[i])) {
					self.newMouseObjs.push(self.objUniverse[i]);
					self.objUniverse[i].callEventClass("objmouseout",self.objUniverse[i],eventObj);
				}
	
			}
	
			if(self.objMouseArr && self.objMouseArr.length > 0) {

				eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

				self.callEventClass("objmousemove",canvas,eventObj);

			}
	
			if(self.newMouseObjs && self.newMouseObjs.length > 0) {

				eventObj.newMouseObjs = self.newMouseObjs;

				eventObj.target = eventObj.newMouseObjs[eventObj.dynArr.length - 1];

				self.callEventClass("objmouseover",canvas,eventObj);

			}
	
			if(self.formerMouseObjs && self.formerMouseObjs.length > 0) {

				eventObj.formerMouseObjs = self.formerMouseObjs;

				eventObj.target = eventObj.formerMouseObjs[eventObj.dynArr.length - 1];

				self.callEventClass("objmouseout",canvas,eventObj);

			}
		}
	
		/**
		 * @event mousemove
		 */
	
		self.callEventClass("mousemove",canvas,eventObj);
	
		//console.log(eventObj);

		if(self.debugging.logMouseMovePerformance) {

			var perform_f = performance.now() - perform_i;
			
			self.debuggingData.mouseMovePerformance = self.debuggingData.mouseMovePerformance || [];
			
			self.debuggingData.mouseMovePerformance.push({
				delta: perform_f,
				perform_i: perform_i,
				x: eventObj.x,
				y: eventObj.y
			});

		}

	}

	this.canvas.addEventListener("mousemove",this.dispatchMouseMove);

	this.dispatchMouseUp = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		eventObj.domEvent = e;
		eventObj.x =  self.mouseX
		eventObj.y = self.mouseY
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;

		eventObj.dynArr = self.pointObjArray(eventObj.x,eventObj.y);
	
		if(self.objMouseArr.length > 0) {

			eventObj.target = eventObj.dynArr[eventObj.dynArr.length - 1];

			self.callEventClass("objmouseup",canvas,eventObj);

			for(var i = 0; i < eventObj.dynArr.length; i++) {
				eventObj.dynArr[i].callEventClass("objmouseup",eventObj.dynArr[i],eventObj);
			}

		}
	
		self.callEventClass("mouseup",canvas,eventObj);
	}

	this.canvas.addEventListener("mouseup",this.getEventBridge(self.dispatchMouseUp));

	self.dispatchMouseOut = function(e) {
		var eventObj = new PhSim.Events.PhSimMouseEvent();
		var canvas = self.ctx.canvas;
		eventObj.domEvent = e;
		eventObj.x =  self.mouseX
		eventObj.y = self.mouseY
		self.mouseX = eventObj.x;
		self.mouseY = eventObj.y;
		self.callEventClass("mouseout",canvas,eventObj);
	}

	this.canvas.addEventListener("mouseout",this.dispatchMouseOut);

}

PhSim.prototype.deregisterCanvasEvents = function() {
	//self.canvas.removeEventListener("mousedown",self.getEventBridge(self.mousedownListener));
	//self.canvas.removeEventListener("click",self.getEventBridge(self.clickListener));
	//self.canvas.removeEventListener("mousemove",self.getEventBridge(self.mousemoveListener));
	//self.canvas.removeEventListener("mouseup",self.getEventBridge(self.mouseupListener));
	//self.canvas.removeEventListener("mouseout",self.getEventBridge(self.mouseoutListener));

}

PhSim.prototype.registerKeyEvents = function() {

	var self = this;

	self.windowObj = self.windowObj || window;

	self.keydownBridge = function(e) {
		var eventObj = new PhSim.Events.PhSimEventKey();
		eventObj.domEvent = e;
		eventObj.key = e.key;
		eventObj.code = e.code;
		eventObj.type = "keydown";
		self.callEventClass("keydown",this,eventObj);
	}

	self.keydownBridgeWrapper = function(e) {
		if(!self.filter) {
			self.keydownBridge(e);
		}
	}

	self.windowObj.addEventListener("keydown",self.keydownBridgeWrapper);
}

PhSim.prototype.deregisterKeyEvents = function() {
	this.windowObj.removeEventListener("keydown",self.keydownBridgeWrapper);
}

/***/ }),

/***/ 4468:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * Config filter
 * @function
 * @param {HTMLElement} container 
 */

PhSim.prototype.configFilter = function(container) {
	this.htmlFilter = document.createElement("div");
	this.htmlFilter.style.background = "rgba(3,3,3,0.7)";
	this.htmlFilter.style.position = "absolute";
	this.htmlFilter.style.display = "none";
	this.htmlFilter.classList.add("dynsim-filter");
	container.appendChild(this.htmlFilter);
}

/**
 * Enable filter
 * @function
 */

PhSim.prototype.enableFilter = function() {
	var elmBox = this.canvas.getBoundingClientRect();
	this.htmlFilter.style.display = "inline-block";
	this.htmlFilter.style.left = "0px";
	this.htmlFilter.style.position = "absolute";
	//this.htmlFilter.style.top = elmBox.top + "px";
	this.htmlFilter.style.width = Math.floor(elmBox.width) + "px";
	this.htmlFilter.style.height = Math.floor(elmBox.height) + "px";
}

/**
 * Disable filter
 * @function
 */

PhSim.prototype.disableFilter = function() {
	this.htmlFilter.style.display = "none";
}

/**
 * Toggle filter
 * @function
 */

PhSim.prototype.toggleFilter = function() {

	if(this.htmlFilter.style.display === "none") {
		this.enableFilter();
	}

	else {
		this.disableFilter();
	}
}

/**
 * @function
 * @param {Object} options - Options
 * @param {String} options.msg - The message
 * @param {String} options.closeButtonTxt - Inner text for closing button
 * @param {String} options.bgColor - Background Color
 * @param {String} options.txtColor - Text Color
 * @param {Number} options.w - Width
 * @param {Number} options.h - Height
 * @param {Function} options.onok - Function to call when alert is closed
 *  
 */

PhSim.prototype.alert = function(options) {
	
	var alertBox = document.createElement("div");
	alertBox.style.backgroundColor = options.bgColor;
	alertBox.style.color = options.txtColor;
	alertBox.style.textAlign = "center";
	alertBox.style.width = options.w + "px";
	alertBox.style.height = options.h + "px";
	alertBox.style.fontSize = "20px";

	var elmBox = this.canvas.getBoundingClientRect();

	var alertBoxMsg = document.createElement("div");
	alertBoxMsg.className = "phsim-alertbox-msg"
	alertBoxMsg.innerText = options.msg;
	alertBoxMsg.style.textAlign = "left";
	alertBoxMsg.style.padding = "20px";

	alertBox.appendChild(alertBoxMsg);

	var closeButton = document.createElement("div");

	var f = function() {
		options.onok();
		closeButton.removeEventListener("click",f);
	}

	closeButton.addEventListener("click",f);

	closeButton.innerText = options.closeButtonTxt;
	alertBox.appendChild(closeButton);

	this.container.appendChild(alertBox);

	alertBox.style.position = "absolute";
	alertBox.style.left = (elmBox.width * 0.5 - alertBox.offsetWidth * 0.5) + "px";
	alertBox.style.top = (elmBox.height * 0.5 - alertBox.offsetHeight * 0.5) + "px";

	return alertBox;

}

/***/ }),

/***/ 1417:
/***/ ((module) => {

/**
 * 
 * PhSim game constructor.
 * 
 * @constructor
 * @memberof PhSim
 * @param {PhSim} phSim 
 * @param {PhSim.Game.Options} options 
 */

var Game = function(phSim,options) {

	/**
     * Inital Life
	 * @type {Number}
	 */

	this.intLife = options.life;

	/**
     * Game goal
	 * @type {Number}
	 */

	this.goal = options.goal;

	/**
     * Inital Score
	 * @type {Number}
	 */
	
	this.intScore = options.score;

	/**
     * 
     * Options passed into the constructor
	 * @type {Number}
	 */

	this.options = options;

	/**
     * Life
	 * @type {Number}
     * 
	 */

	this.life = options.life;

	/**
     * Score
	 * @type {Number}
	 */

	this.score = options.score;

	/**
     * Reference to the parent PhSim simulation
	 * @type {PhSim}
	 */

	this.phSim = phSim;

	// Adding arrays to phSim eventstack

}

/**
 * Game Options
 * @constructor
 * @param {Number} goal 
 * @param {Number} life 
 * @param {Number} score 
 */

Game.Options = function(goal,life,score) {

	/**
     * Game Goal
	 * @type {Number}
	 */

	this.goal = goal;

	/**
     * Game goal
	 * @type {Number}
	 */

	this.life = life;

	/**
     * Game score
	 * @type {Number}
     * 
	 */

	this.score = score;
}

/**
 * Enable default modal for game wins
 * @default true
 * @type {Boolean}
 */

Game.prototype.defaultGameWinModal = true;

/**
 * Enable default modal for level wins
 * @default true
 * @type {Boolean}
 */

Game.prototype.defaultLevelWinModal = true;

/**
 * Set score
 * @function
 * @param {Number} c - Score
 */

Game.prototype.setScore = function(c) {

    var self = this;

	this.score = c;

	if(this.score >= this.goal && Number.isInteger(this.score) && Number.isInteger(this.goal)) {
	
		this.phSim.pause();
		this.phSim.enableFilter();

		// Code to execute 

		if(this.phSim.simulationIndex + 1 === this.phSim.simulations.length) {

			if(this.defaultGameWinModal) {

                this.phSim.callEventClass("gamewin",this,{});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

				var a = self.phSim.alert({
					msg:"You Win!",
					closeButtonTxt:"Play again",
					bgColor:"#333",
					txtColor:"#fff",
					w:300,
					h:100,
					onok: function() {
						self.phSim.disableFilter();
						a.parentNode.removeChild(a);
						self.phSim.gotoSimulationIndex(0);
						self.phSim.play();
					}
				});

			}

		}

		// If not the final simulation

		else {

			this.phSim.callEventClass("levelwin",this,{}); 

			clearInterval(this.phSim.intervalLoop);
			this.phSim.disableFilter();
			this.phSim.gotoSimulationIndex(this.phSim.simulationIndex + 1);
			self.phSim.play();
		}


	}

	this.phSim.callEventClass("score",this,{}); 
},

/**
 * Set life
 * @function
 * @param {Number} c - Life value
 */

Game.prototype.setLife = function(c) {
	this.life = c;

	if(this.life === 0) {
		this.end();
	}
}

/**
 * Increment life (add 1 to the current life)
 * @function
 */

Game.prototype.incrementLife = function() {
	this.setLife(this.life + 1);
}

/**
 * Decrement life (subtract 1 from life)
 * @function
 */

Game.prototype.decrementLife = function() {
	this.setLife(this.life - 1);
}

/**
 * End game
 * @function
 */

Game.prototype.end = function() {

	this.phSim.pause();
	this.phSim.enableFilter();

	var self = this;


	var a = this.phSim.alert({
		msg:"Game Over",
		closeButtonTxt:"Try again",
		bgColor:"#333",
		txtColor:"#fff",
		w:300,
		h:100,
		onok: function() {
			self.phSim.gotoSimulationIndex(self.phSim.simulationIndex);
			self.phSim.play();
			self.phSim.disableFilter();
			a.parentNode.removeChild(a);	
		}
	});

	this.phSim.callEventClass("levelloss",this,{}); 

}

/**
 * Namespace for game widgets
 * @mixin
 * 
 */

Game.Widgets = {

}

/**
 * Coin widget. Works if game widget is enabled. If not enabled, it throws an exception.
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Widget options
 * @param {Number} [widget.value] - Value of coin. If undefined, the value of the coin is 1.
 * @this PhSim
 */

Game.Widgets.coin = function(dyn_object,widget) {

	widget = widget || {};

	var value = widget.value || 1;

	var self = this;

	var func = function() {

		var obj1 = dyn_object;

		var a = function() {

			if(self.inSensorCollision(obj1) && self.lclGame) {
				self.lclGame.setScore(self.lclGame.score + value);
				self.off("collisionstart",a);	
			}

		}

		return a;

	}

	self.on("collisionstart",func());


}

/**
 * Hazard Widget
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget
 * @param {Number} [widget.damage] - Quantity of life lost. By default, it is equal to 1.
 */

Game.Widgets.hazard = function(dyn_object,widget) {

	widget = widget || {};

	widget.damage = widget.damage || 1;

	var self = this;

	var func = function() {

		var obj1 = dyn_object;

		var a = function() {

			if(self.inSensorCollision(obj1) && self.lclGame) {
				self.lclGame.setLife(self.lclGame.life - widget.damage);
				self.off("collisionstart",a);
			}

		}

		return a;

	}

	self.on("collisionstart",func());

}

/**
 * 
 * @param {PhSim} dyn_object 
 * @param {Object} [widget] - Widget configuration
 * @param {Number} [widget.lives] - Lives to be gained.
 */

Game.Widgets.health = function(dyn_object,widget) {

	widget = widget || {};
	widget.lives = widget.lives || 1;

	var self = this;

	var func = function() {

		var obj1 = dyn_object;

		var a = function() {

			if(self.inSensorCollision(obj1) && self.lclGame) {
				self.lclGame.setLife(self.lclGame.life + widget.lives);
				self.off("collisionstart",a);	
			}

		}

		return a;

	}

	self.on("collisionstart",func());

}

Game.Widgets.endGame = function(dyn_object,widget) {
	var f = this.createMotionFunction("position",dyn_object,widget.vector);
	this.createWFunction(dyn_object,f,widget);
}

module.exports = Game;

/***/ }),

/***/ 8132:
/***/ ((module) => {

/**
 * Get widget by name
 * @memberof PhSim
 * @param {String} nameStr 
 */

function getWidgetByName(nameStr) {
	for(var i = 0; i < this.objUniverse.length; i++) {
		this.objUniverse[i].getWidgetByName(nameStr);
	}
}

module.exports = getWidgetByName;

/***/ }),

/***/ 5258:
/***/ ((module) => {


/**
 * Gradient Namespace
 * @memberof PhSim
 * @namespace
 */

var Gradients = {}

/**
 * @function
 * @param {CanvasRenderingContext2D} ctx 
 * @param {PhSim.Static.Gradient} jsObject 
 */

Gradients.extractGradient = function(ctx,jsObject) {

	var gradient = ctx.createLinearGradient(jsObject.limits.start.x,jsObject.limits.start.y,jsObject.limits.end.x,jsObject.limits.end.y);

	for(var i = 0; i < jsObject.stops.length; i++) {
		gradient.addColorStop(jsObject.stops[i].pos,jsObject.stops[i].color);
	}
	
	return gradient;

}

module.exports = Gradients;

/***/ }),

/***/ 3333:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * Apply Newtonian gravity field.
 * @function
 */

PhSim.prototype.applyGravitationalField = function() {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		for(var j = 0; j < a.length; j++) {
			if(i !== j && !this.isNonDyn(a[i]) && !this.isNonDyn(a[j]) && !a[i].matter.isStatic && !a[j].matter.isStatic) {
				var a1 = PhSim.Vector.scale(PhSim.Vector.subtract(a[j].matter.position,a[i].matter.position),6.67 * Math.pow(10,-11) * a[i].matter.mass * a[j].matter.mass * -1)
				var b1 = Math.pow(PhSim.Vector.distance(a[j].matter.position,a[i].matter.position),3);
				var c = PhSim.Vector.divide(a1,b1);
				PhSim.Motion.applyForce(a[j],a[i].matter.position,c);
			}
		}	
	}

}


/***/ }),

/***/ 8138:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * @author Mjduniverse
 * @copyright 2020 Mjduniverse 
 * @license
 *
 * Physics Simulator Class Library
 *
 * Copyright 2020 Mjduniverse.com
 * 
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
 * and associated documentation files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
  * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial 
 * portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
 * LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
  * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * 
 * The options that can be used to create a dynamic simulation could be a 
 * CompositeSimulation object, a simulation object or an array 
 * of static objects.
 * 
 * If an array is chosen, then it is used to create
 * 
 * @typedef {PhSim.Static|PhSim.Static.Simulation|StaticObject[]} DynSimOptions
 * @property {HTMLCanvas} canvas - Simulation canvas
 * @property {Number} initSimIndex - The inital simulation index. If undefined, the simulation index is 0.
 * @property {HTMLElement} container - The container 
 * 
 */

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/** 
 * Dynamic Simulation Instance Object 
 * 
 * @constructor
 * @param {DynSimOptions} [dynSimOptions] - The simulation object
 * @mixes PhSim.PhSimEventTarget
 * 
 */

function PhSim(dynSimOptions) {

	PhSim.Static.call(this);

	if(typeof dynSimOptions === "object") {
		Object.assign(this,dynSimOptions);
	}

	if(Array.isArray(dynSimOptions.simulations)) {
		this.simulations = dynSimOptions.simulations;
	}

	else if(Array.isArray(dynSimOptions.layers)) {
		this.simulations[0] = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions.objUniverse)) {
		this.simulations[0].layers[0] = dynSimOptions;
	}

	else if(Array.isArray(dynSimOptions)) {
		this.simulations[0].layers[0].objUniverse = [];
	}

	if(typeof dynSimOptions.wFunctions === "object") {
		this.wFunctions = dynSimOptions.wFunctions
	}

	// Register Plugin
	
	if(!dynSimOptions.noUse) {
		Matter.use(PhSim.matterPlugin);
	}

	/**
	 * The static simulation object
	 * @typedef {DynSimOptions}
	 */

	this.options = dynSimOptions;

	/**
	 * Debugging Configuration
	 * @type {Object}
	 */

	this.debugging = this.debugging || {
		logMouseMovePerformance: true
	}

	/**
	 * Debugging data
	 * @type {Object}
	 */
	
	this.debuggingData = {}

	// Configure canvas

	if(dynSimOptions.canvas) {
		this.connectCanvas(dynSimOptions.canvas)
	}

	else {
		var newCanvas = document.createElement("canvas");
		this.connectCanvas(newCanvas);
	}

	// Configure container

	if(dynSimOptions.container) {
		this.connectContainer(dynSimOptions.container);
	}

	else {
		var newContainer = document.createElement("div");
		this.connectContainer(newContainer);
	}

	// Register event keys

	this.registerKeyEvents();

	// Inital Simulation

	if(dynSimOptions.initSimIndex) {
		this.gotoSimulationIndex(dynSimOptions.initSimIndex);
	}

	else {
		this.gotoSimulationIndex(0);
	}

}

/**
 * Connect an HTML canvas to the PhSim simulation object.
 * 
 * @function
 * @param {HTMLCanvasElement} canvas 
 */

PhSim.prototype.connectCanvas = function(canvas) {

	/**
	 * Simulation canvas
	 * @type {HTMLCanvasElement}
	 */

	this.canvas = canvas;

	/**
	 * Simulation context for the canvas
	 * @type {CanvasRenderingContext2D}
	 */

	this.ctx = canvas.getContext("2d");

	
	this.canvas.width = this.box.w || this.box.width;
	this.canvas.height = this.box.h || this.box.height;
	this.registerCanvasEvents();
	this.configRender(this.ctx);
}

/**
 * Connect a container for the PhSim simulation object. The PhSim canvas is supposed to be 
 * the only child element of the container.
 * 
 * When set, the container has the simulation canvas appened as a child.
 * 
 * @function
 * @param {HTMLElement} c - Container
 */

PhSim.prototype.connectContainer = function(c) {
	
	/**
	 * The simulation container.
	 * This is is supposed to be the wrapping element of the {@link PhSim#canvas|PhSim canvas}.
	 * @type {HTMLElement}
	 */

	this.container = c;

	c.appendChild(this.canvas);
	c.classList.add("phsim-container");

	this.configFilter(c);

}

/**
 * Number of frames per second
 */

PhSim.prototype.delta = 50/3; // 16 frames per second, or 16 frames per 1000ms

/**
 * Boolean property for telling if the simulation has loaded a simulation at least one time.
 * @type {Boolean}
 */

PhSim.prototype.init = false;

/**
 * Time for inside the world
 * @type {Number}
 */

PhSim.prototype.sl_time = 0;

/**
 * Index of the current simulation.
 * @default 0
 * @type {Number}
 */

PhSim.prototype.simulationIndex = 0;

/**
 * PhSim status codes for loading simulations.
 * @readonly
 * @namespace
 */

PhSim.statusCodes = {

	/**
	 * Inital loading status
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	INT: 0,

	/**
	 * This status means that the DynObjects have been loaded.
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	LOADED_DYN_OBJECTS: 1,

	/**
	 * This status means that the sprites have been loaded, if there are any. 
	 * If there are no sprites, then this status is set anyway.
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	LOADED_SPRITES: 2,

	/**
	 * This status means that the audio has loaded.
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	LOADED_AUDIO: 3,

	/**
	 * This status means that the simulation is done configuring.
	 * @readonly
	 * @default
	 * @type {Number}
	 */

	LOADED_SIMULATION: 4
}

/**
 * Loading status of the dynamic simulation
 * @type {Number}
 */

PhSim.prototype.status = 0;

/**
 * x-coordinate of the mouse
 * @type {Number}
 */

PhSim.prototype.mouseX = null;

/**
 * y-coordinate of the mouse
 * @type {Number}
 */

PhSim.prototype.mouseY = null;

/**
 * Simulation options
 * @deprecated Due to confusing name.
 */

PhSim.prototype.sim = null;

/**
 * Current simulation options
 * @deprecated Due to confusing name.
 */

PhSim.prototype.simulation = null;

/**
 * Boolean property to tell if the simulation is paused or not.
 * @type {Boolean}
 */

PhSim.prototype.paused = true;

/**
  * 
  * @callback PhSimEventCall
  * @param {PhSim.Events.PhSimEvent} phEvent
  * 
  */


/**
 * The matter.js world
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {Object}
 */

PhSim.prototype.matterJSWorld = null;

/**
 * The matter.js engine 
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {Object}
 */

PhSim.prototype.matterJSEngine = null;

/**
 * An tree that is used to preserve layer distinctions.
 * It is an array of arrays. The arrays in this array have {@link PhSimObject} objects.
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {PhSimObjectArr[]} 
 */

PhSim.prototype.dynTree = [];

/**
 * Array of objects in the PhSim simulation
 * Resets when {@link PhSim#gotoSimulationIndex} is executed.
 * @type {PhSimObjectArr} 
 */

PhSim.prototype.objUniverse = [];

/**
 * Array of static sprite objects that are to be extracted by 
 */

PhSim.prototype.staticSprites = [];

PhSim.prototype.staticAudio = [];

/**
 * Number of audio players.
 * This is reset to 0 whenever {@link PhSim#gotoSimulationIndex} is executed.
 * @type {Number}
 */

PhSim.prototype.audioPlayers = 0;


/**
 * Classes
 * When {@link PhSim#gotoSimulationIndex} is run, this is blanked and repopulated.
 * @type {Object}
 */

PhSim.prototype.classes = {};

/**
 * Background fill style for rendering.
 * When {@link PhSim#gotoSimulationIndex} is run, the function sets this value to the
 * value of {@link PhSim.simOptions.box.bgColor} if it is not a {@link Falsey} value;
 * 
 * @type {String}
 */

PhSim.prototype.bgFillStyle = "white";

/**
 * PhSim version
 * @type {String}
 */

PhSim.version = "0.1.0-alpha"

/**
 * Loading screen properties
 * @type {Object}
 * @property {String} [bgColor = "black"] - Background Color
 * @property {String} [txtColor = "white"] - Text Color
 * @property {String} [txtFace = "arial"] - Text Face
 * @property {String} [txtAlign = "center"] - Text align
 * @property {String} [txt = "Loading..."] - Loading text
 * @property {String} [yPos = "center"] - y-position
 * @property {Number} [txtSize = 20] -  Text size
 */

PhSim.prototype.loading = {
	bgClr: "black",
	txtClr: "white",
	txtFace: "arial",
	txtAlign: "center",
	txt: "Loading...",
	yPos: "center",
	txtSize: 20
}

/**
 * The `drawLoadingScreen` function draws the loading screen for a simulation change.
 * The behaviour of the loading screen can be customized by modifing the properties of
 * {@link PhSim#loading}.
 * 
 * @function
 */

PhSim.prototype.drawLoadingScreen = function() {
	this.ctx.fillStyle = this.loading.bgClr;
	this.ctx.fillRect(0,0,this.camera.scale,this.canvas.height);
	this.ctx.fillStyle = this.loading.txtClr;
	this.ctx.textAlign = this.loading.txtAlign;
	this.ctx.font = this.loading.txtSize + "px " + this.loading.txtFace;
	this.ctx.fillText(this.loading.txt,this.canvas.width / 2,this.canvas.height / 2)
}

if(typeof window === "object") {
	window.PhSim = PhSim;
}

if(true) {
    module.exports = PhSim;
}

PhSim.Static = __webpack_require__(2094 );

__webpack_require__(4941 );

PhSim.EventStack = __webpack_require__(1010 );

/**
 * Object containing array functions to be called.
 * @type {PhSim.EventStack}
 */

PhSim.prototype.eventStack = new PhSim.EventStack();

/**
 * An array stack that is cleared each time the main simulation is changed.
 * @type {PhSim.EventStack}
 */

PhSim.prototype.simulationEventStack = new PhSim.EventStack();

PhSim.prototype.getWidgetByName = __webpack_require__(8132);

PhSim.PhRender = __webpack_require__(3811);
PhSim.Sprites = __webpack_require__(8313);
PhSim.Audio = __webpack_require__(1458);
PhSim.Vector = __webpack_require__(2450);
PhSim.diagRect = __webpack_require__(4035);
PhSim.Vertices = __webpack_require__(9153);

PhSim.Centroid = __webpack_require__(209);

// Bounding box functions

PhSim.BoundingBox = __webpack_require__(6254);
PhSim.DynObject = __webpack_require__(390);
PhSim.Events = __webpack_require__(1448);

__webpack_require__(6396);
__webpack_require__(8569);
__webpack_require__(4468);
__webpack_require__(8175);
__webpack_require__(1320);
__webpack_require__(3499);
__webpack_require__(1844);

PhSim.PhSimEventTarget =  __webpack_require__(4956);

Object.assign(PhSim.prototype,PhSim.PhSimEventTarget);

__webpack_require__(447);
__webpack_require__(3333);
__webpack_require__(6367);

PhSim.prototype.gotoSimulationIndex = __webpack_require__(6949);
PhSim.Motion = __webpack_require__(341);

__webpack_require__(4045);
__webpack_require__(1768);
__webpack_require__(2841);

PhSim.Camera = __webpack_require__(9662);
PhSim.Game = __webpack_require__(1417);
PhSim.Gradients = __webpack_require__(5258);

PhSim.Widget = __webpack_require__(5203);

__webpack_require__(4836);

PhSim.calc_skinmesh = __webpack_require__(1800);

__webpack_require__(7529);

PhSim.ObjLoops = __webpack_require__(3065);


/**
 * Global event stack
 * @type {PhSim.EventStack}
 */

PhSim.prototype.eventStack = new PhSim.EventStack();


/**
 * Event stack for simulation specfic events
 * @type {PhSim.EventStack}
 */

PhSim.prototype.simulationEventStack = new PhSim.EventStack();

 

/**
 * Structure giving more human-readable meaning to PhSim status.
 * @type {String[]}
 */

PhSim.statusStruct = {
	0: "Unloaded",
	1: "Initalized",
	2: "Loaded Images",
	3: "Loaded Audio",
	4: "Loaded Simulation"
}

/***/ }),

/***/ 6396:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * @function
 * @param {Number} L 
 */

PhSim.prototype.L = function(L) {
	return this.dynTree[L];
}

/**
 * @function
 * @param {Number} L 
 * @param {Number} O 
 */

PhSim.prototype.LO = function(L,O) {
	return this.dynTree[L][O];
}

/**
 * A Layer-Object string (LOStr) is a string specifying the layer and object indexes
 * of an object in the DynTree.'
 * 
 * The form of the LOStr is:
 * `<layer_index>,<object_index>`
 * 
 * @typedef {String} LOStr
 */

/**
 * @function
 * @param {LOStr} str
 * @returns {PhSimObject} 
 */

PhSim.prototype.getObjectFromLOStr = function(str) {
	str.split(",");
	return this.LO(str[1],str[2])
}

/***/ }),

/***/ 6949:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const DynObject = __webpack_require__(390);
const PhSim = __webpack_require__(8138);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}


/**
 * Go to simulation in the composite simulation
 * 
 * In a PhSim object, there is a property known as PhSim.prototype.sim. 
 * This property is used to define a simulation.
 * 
 * When PhSim.prototype.gotoSimulationIndex is used, it resets 
 * 
 * @function
 * @param {Number} i
 * @this PhSim
 * @memberof PhSim
 * @returns {Promise} - A promise that is fulfiled if the loading is successful.
 * 
 */

var gotoSimulationIndex = function (i) {

	var self = this;

	return new Promise(function(resolve){

		self.status = PhSim.statusCodes.INT;

		var optionMap = new Map();  

		self.firstSlUpdate = false;

		var event = new PhSim.Events.PhSimEvent("slchange");

		event.type = "slchange";

		self.callEventClass("beforeslchange",self,event);

		if(!self.noCamera) {
			self.camera.translate(-self.camera.x,-self.camera.y);
		}

		if(self.ctx) {
			self.drawLoadingScreen();
		}

		self.simulation = self.simulations[i];
		self.simOptions = self.simulations[i];

		self.simulationIndex = i;

		if(self.ctx) {
			self.width = self.ctx.canvas.width;
			self.height = self.ctx.canvas.height;
		}

		self.paused = false;

		self.matterJSWorld = Matter.World.create();

		self.matterJSEngine = Matter.Engine.create({
			world: self.matterJSWorld
		});

		self.dynTree = [];
		self.objUniverse = [];
		self.staticSprites = [];
		self.spriteUrls = new Set();
		self.staticAudio = [];
		self.audioPlayers = 0;
		self.simulationEventStack = new PhSim.EventStack();


		if(self.sprites) {
			self.staticSprites.concat(self.sprites);
		}


		if(self.simOptions && self.simOptions.world && self.simOptions.world.bg) {
			self.bgFillStyle = self.simOptions.world.bg;
		}

		if(self.world && self.world && self.world.bg) {
			self.bgFillStyle = self.world.bg;
		}

		if(self.world) {

			if(typeof self.world.grav === "number") {
				self.matterJSWorld.gravity.y = self.world.grav;
			}

			if(typeof self.world.grav === "object" && typeof self.world.grav.x === "number" && typeof self.world.grav.y === "number") {
				self.matterJSWorld.gravity.x = self.world.grav.x;
				self.matterJSWorld.gravity.y = self.world.grav.y;
			}


		}

		if(self.simulations) {

			for(let i = 0; i < self.simOptions.layers.length; i++) {

				self.dynTree.push([]);

				for(let j = 0; j < self.simOptions.layers[i].objUniverse.length; j++) {

					var o = self.simOptions.layers[i].objUniverse[j];

					if(o.sprite) {
						self.staticSprites.push(o.sprite);
						self.spriteUrls.add(o.sprite.src);	
					}
					
					if(o instanceof DynObject && !o.noDyn) {
						self.addObject(o,{
							layer: i
						});
					}

					else {
						var dynObject = new DynObject(o);

						self.addObject(dynObject,{
							layer: i
						});

						optionMap.set(o,dynObject);
					}

				}

				var phSimDynEvent = new PhSim.Events.PhSimDynEvent();
				self.callEventClass("matterJSLoad",self,phSimDynEvent);

			}

		}

		Matter.Events.on(self.matterJSEngine,"collisionStart",function(event) {
			
			var a = new PhSim.Events.PhSimDynEvent();
			a.matterEvent = event;
			self.callEventClass("collisionstart",self,a);

		});

		if(self.simOptions.game) {
			self.lclGame = new PhSim.Game(self,self.simOptions.game);
		}

		if(self.simulation.widgets) {

			for(var C = 0; C < self.simulation.widgets.length; C++) {
				var widget = self.simulation.widgets[C];

				if(widget.type === "setImgSrc") {
					this.spriteUrls.add(widget.src);
				}

				self.extractWidget(self,widget);
			}

		}

		self.status = PhSim.statusCodes.LOADED_DYN_OBJECTS;

		resolve();

	})
	.then(function(){

		return new Promise(function(resolve){

			if(self.phRender && self.staticSprites.length) {
				self.phRender.spriteImgObj = new PhSim.Sprites.spriteImgObj(Array.from(self.spriteUrls.values()),function() {
					self.status = PhSim.statusCodes.LOADED_SPRITES;
					resolve();
				});
			}
	
			else {
				self.status = PhSim.statusCodes.LOADED_SPRITES;
				resolve();
			}
	
		});

	})
	.then(function() {
		
		return new Promise(function(resolve){

			if(self.staticAudio.length) {
				self.audioArray = new PhSim.Audio.AudioArray(self.staticAudio,function(){
					self.status = PhSim.statusCodes.LOADED_AUDIO;
					resolve();
				});
			}

			else {
				self.status = PhSim.statusCodes.LOADED_AUDIO;
				resolve();
			}

		});
		
	}).then(function(){
		self.init = true;

		self.status = PhSim.statusCodes.LOADED_SIMULATION;

		var e = new PhSim.Events.PhSimDynEvent();
	
		self.callEventClass("load",self,e);

	}).catch(function(e){
		self.callEventClass("error",self,e);
		throw e;
	});

}

module.exports = gotoSimulationIndex;

/***/ }),

/***/ 6367:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * Play simulation
 * 
 * @function
 * @memberof PhSim
 * @this PhSim
 * @returns {Promise} - A promise that is fulfilled if the playing the simulation is sucessful. 
 * If resolved, the promise is fullfilled with the `PhSim` instance as its value.
 */

PhSim.prototype.play = function() {

	var self = this;

	return new Promise(function(resolve){
		self.paused = false;
		self.intervalLoop = setInterval(self.loopFunction.bind(self),self.delta);
		resolve(self);
	});
}

/**
 * Pause simulation
 * @function
 * @returns {Promise} - A promise that is fulfilled if the pausing the simulation is sucessful. 
 * If resolved, the promise is fullfilled with the `PhSim` instance as its value.
 */

PhSim.prototype.pause = function() {

	var self = this;

	return new Promise(function(resolve){
		clearInterval(self.intervalLoop);
		self.paused = true;
		resolve(self);
	});

}

/**
 * Toggle Simulation
 * 
 * @function
 * @returns {Promise}
 */

PhSim.prototype.toggle = function() {

	var self = this;

	return new Promise(function(resolve,reject){

		if(self.paused) {

			self.play().then(function(phsim){
				resolve(phsim);
			}).catch(function(e){
				reject(e);
			});

		}

		else {

			self.pause().then(function(phsim){
				resolve(phsim)
			}).catch(function(e){
				reject(e)
			});

		}
	});


}

/**
 * Exit simulation
 * @function
 */

PhSim.prototype.exitSl = function() {

	var self = this;

	return new Promise(function(resolve){
		self.callEventClass("beforeslchange",self,new PhSim.Events.PhSimEvent("beforeslchange"));
		self.paused = false;
		clearInterval(self.intervalLoop);
		resolve(self);
	});

}

/**
 * 
 * Completely reset PhSim object. That is, make it as if it is a new one.
 * @function
 * @returns {Promise}
 */

PhSim.prototype.exit = function() {

	var self = this;

	return new Promise(function(resolve){

		// Remove references to avoid memory leak

		delete self.camera.dynSim
		delete self.phRender.dynSim

		for(var i = 0; i < self.objUniverse.length; i++) {
			delete self.objUniverse[i].phSim;
		}

		self.callEventClass("exit",self,new PhSim.Events.PhSimEvent("exit"));
		self.deregisterCanvasEvents();
		self.deregisterKeyEvents();
		self.exitSl();

		// Erase all things

		Object.assign(self,new PhSim());

		resolve(self);

	});

}

/***/ }),

/***/ 1768:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const Motion = __webpack_require__(341);
const Vector = __webpack_require__(2450);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * 
 * Update a dynamic object.
 * 
 * @function
 * @param {PhSimObject} currentObj - Object to be updated
 * @fires PhSim.Events.PhSimEvent
 * 
 */

PhSim.prototype.updateDynObj = function(currentObj) {


	// Loop must start at index 1 because the first element in the array is a reference to the parent object itself.

	if(currentObj.noDyn) {
		this.phRender.renderStatic(currentObj);	
	}
	
	else {

		if(currentObj.shape === "circle" || currentObj.shape === "regPolygon" || currentObj.shape === "rectangle") {
			currentObj.cycle = currentObj.firstCycle + currentObj.matter.angle;
		}
	
		if(currentObj.shape === "rectangle") {
			currentObj.x = currentObj.matter.position.x - currentObj.w * 0.5
			currentObj.y = currentObj.matter.position.y - currentObj.h * 0.5
		}
	
		if(currentObj.shape === "circle" || currentObj.shape === "regPolygon") {
			currentObj.x = currentObj.matter.position.x;
			currentObj.y = currentObj.matter.position.y;
		}
	
		if(currentObj.shape === "polygon") {
			PhSim.calc_skinmesh(currentObj);
		}

		if(this.phRender) {	
			this.phRender.dynamicRenderDraw(currentObj);
		}

	}

	var event = new PhSim.Events.PhSimEvent("objupdate");
	event.target = currentObj;

	this.callEventClass("objupdate",this,event);

}

/**
 * The loopFunction is a function that is executed over and over again. It is responsible
 * for providing the simulation loop.
 */

PhSim.prototype.loopFunction = function() {

	if(this.paused === false && this.status === PhSim.statusCodes.LOADED_SIMULATION) {

		var beforeUpdateEvent = new PhSim.Events.PhSimDynEvent()

		beforeUpdateEvent.simulation = this.simulation;

		this.prevDate = this.prevDate && this.updateDate;
	
		this.callEventClass("beforeupdate",this,beforeUpdateEvent);

		if(!this.firstSlUpdate) {
			this.callEventClass("beforefirstslupdate",this,new PhSim.Events.PhSimDynEvent());
		}

		this.updateDate = new Date();

		if(this.prevDate) {
			this.updateTimeInterval = this.updateDate - this.prevDate;
		}

		for(let i = 0; i < this.objUniverse.length; i++) {

			let currentObj = this.objUniverse[i];

			if(typeof this.atmosphere === "object" && typeof this.atmosphere.density === "number") {

				let x = -this.matterJSWorld.gravity.x;
				let y = -this.matterJSWorld.gravity.y;
		
				let b = Vector.scale(new Vector(x,y),currentObj.matter.area * this.matterJSWorld.gravity.scale * this.atmosphere.density);
		
				Motion.applyForce(currentObj,currentObj.matter.position,b);
		
			}

			if(this.objUniverse[i].dragCoefficient) {

			}
		}

		Matter.Engine.update(this.matterJSEngine,this.delta);

		if(this.ctx) {

			this.ctx.fillStyle = this.bgFillStyle;

			if(this.noCamera) {
				this.ctx.fillRect(0,0,this.width,this.height);
			}
	
			else {
				this.ctx.fillRect(0 - this.camera.x,0 - this.camera.y,this.width / this.camera.scale,this.height / this.camera.scale);
			}
		}

		this.callEventClass("aftercanvasclear",this,new PhSim.Events.PhSimDynEvent());

		for(let i = 0; i < this.objUniverse.length; i++) {
			this.updateDynObj(this.objUniverse[i]);
		}
	
		this.applyGravitationalField()

		var afterUpdateEvent = new PhSim.Events.PhSimDynEvent()

		afterUpdateEvent.simulation = this.simulation;

		this.sl_time = this.sl_time + this.delta;

		if(this.filter) {
			this.ctx.fillStyle = "rgba(3,3,3,0.7)";
			this.ctx.fillRect(0,0,this.width / this.camera.scale,this.height / this.camera.scale);
		}

		if(!this.firstSlUpdate) {
			this.callEventClass("firstslupdate",this,afterUpdateEvent);
			this.firstSlUpdate = true;
		}

		this.callEventClass("afterupdate",this,afterUpdateEvent);

		//this.renderAllCounters();


	}

}

/***/ }),

/***/ 8569:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * @function
 * @param {Object} sim 
 * @param {HTMLCanvasElement} canvas
 * @memberof PhSim 
 */

PhSim.createFromCanvas = function(sim,canvas) {
	var o = Object.create(sim);
	o.canvas = canvas;
	return new PhSim(o);
}

/**
 * @function
 * @param {Object} sim 
 * @param {HTMLElement} container 
 * @memberof PhSim 
 */

PhSim.createFromContainer = function(sim,container) {
	var o = Object.create(sim);
	o.container = container;
	return new PhSim(o);
}

/**
 * @function
 * @param {*} sim 
 * @memberof PhSim.DymSim 
 */

PhSim.createContainer = function(sim) {
	var container = document.createElement("div");
	return this.createFromContainer(sim,container);
}

/**
 * @function
 * @param {String} jsonURL - URL For JSON File
 * @param {function} onload - Onload function
 * @memberof PhSim 
 */

PhSim.loadFromJSON = function(jsonURL,onload) {

	var x = new XMLHttpRequest();
	x.open("GET",jsonURL);

	var f = function(){
		var o = PhSim.createContainer(JSON.parse(x.responseText));
		onload(o);
		x.removeEventListener("load",f);
	}

	x.addEventListener("load",f)

	x.send();

}

/**
 * @function
 * @memberof PhSim 
 */

PhSim.prototype.configRender = function() {
	
	this.assignPhRender(new PhSim.PhRender(this.ctx));
	
	if(!this.noCamera) {
		this.camera = new PhSim.Camera(this);
		this.camera.translate(-this.camera.x,-this.camera.y);
	}

}

/***/ }),

/***/ 4941:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const DynObject = __webpack_require__(390);
const PhSim = __webpack_require__(8138);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * Object that registers PhSim as a Matter.js plugin.
 * The modified matter.js object is stored in {@link Matter}
 * @namespace
 * 
 */

const matterPlugin = {

    name: "phsim",

    version: "0.1.0",

    /**
     * Installation function for plugin
     * @param {Matter} matter 
     */

    install: function(matter) {

        matter.after('Detector.collisions',function(){
            matterPlugin.Detector.collisions.call(this,arguments);
        });

        //matter.after('Body.create',function(options){
          //  matterPlugin.Body.init(options)
        //});

    },

    /**
     * Detector patch for Matter.js.
     * 
     * 
     */

    Detector: {

        /**
         * Matter.Detector.collisions patch for Matter.js.
         * This modifies the function for checking collisions in Matter.js.
         * @function 
         */

        collisions: function() {

            for(var i = 0; i < this.length; i++) {

                var bodyA = this[i].bodyA;
                var bodyB = this[i].bodyB;
                var c_classesA;
                var c_classesB;

                if( (bodyA.parent === bodyA && bodyA.plugin.dynObject.noCollision) || (bodyB.parent === bodyB && bodyB.plugin.dynObject.noCollision) ) {
                    this.splice(this.indexOf(this[i]),1);
                }

                if(bodyA.parent === bodyA) {
                    if(bodyA.plugin.dynObject instanceof DynObject) {
                        c_classesA = PhSim.Query.getCollisionClasses(bodyA.plugin.dynObject);
                    }
                }
                
                else {
                    c_classesA = PhSim.Query.getCollisionClasses(bodyA.parent.plugin.dynObject);
                }

                if(bodyB.parent === bodyB) {
                    if(bodyB.plugin.dynObject instanceof DynObject) {
                        c_classesB = PhSim.Query.getCollisionClasses(bodyB.plugin.dynObject);
                    }    
                }

                else {
                    c_classesB = PhSim.Query.getCollisionClasses(bodyB.parent.plugin.dynObject);                    
                }

                if(c_classesA.length > 0 && c_classesB.length > 0) {
                    if(!PhSim.Query.intersectionExists(c_classesA,c_classesB)) {

                        this.splice(this.indexOf(this[i]),1);

                        // Reset index to zero to make sure all collisions
                        // that have no collision classes in common get removed

                        i = 0;
                    }
                }


            }

        }
    }

}

PhSim.matterPlugin = matterPlugin;

Matter.Plugin.register(PhSim.matterPlugin); 

/***/ }),

/***/ 341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const DynObject = __webpack_require__(390);
const Centroid = __webpack_require__(209);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * Namespace of functions used to move objects in various ways.
 * @memberof PhSim
 * @namespace
 * 
 */

var Motion = {}

/**
 * 
 * Apply force to a dynamic object.
 * Force is ineffective against locked, semi-locked and permanetly static objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} position 
 * @param {Vector} forceVector
 *   
 */

Motion.applyForce = function(dynObject,position,forceVector) {
	if(!dynObject.locked && !dynObject.noDyn) {
		return Matter.Body.applyForce(dynObject.matter,position,forceVector);
	}
}


/**
 * 
 * Apply velocity to a dynamic object.
 * Velocity does not effect locked, semi-locked objects or static objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} velocityVector 
 */

Motion.setVelocity = function(dynObject,velocityVector) {
	if(!dynObject.locked) {
		return Matter.Body.setVelocity(dynObject.matter,velocityVector);
	}

}

/**
 * 
 * Apply a transformation to a dynamic object.
 * Transformation does not move locked objects.
 * However, it moves semi-locked objects and static objects.
 * 
 * @function
 * @param {PhSimObject} o 
 * @param {Vector} translationVector 
 */

Motion.translate = function(o,translationVector) {
	if(!o.locked) {

		if(o.shape === "polygon") {
			for(let i = 0; i < o.verts.length; i++) {
				o.verts[i].x = o.verts[i].x + translationVector.x;
				o.verts[i].y = o.verts[i].y + translationVector.y;
			}
		}

		if(o.shape === "circle" || o.shape === "rectangle" || o.shape === "regPolygon") {
				o.x = o.x + translationVector.x;
				o.y = o.y + translationVector.y;
		}

		if(o instanceof DynObject) {
			return Matter.Body.translate(o.matter,translationVector);
		}

	}
	
}

/**
 * Apply a transformation to a dynamic object.
 * Setting positions is ineffective against locked and permanetly static objects.
 * 
 * @function
 * @param {PhSim.DynObject} o 
 * @param {Vector} position 
 */

Motion.setPosition = function(o,position) {

	var c;

	if(!o.locked) {

		if(o.shape === "circle" || o.shape === "regPolygon") {
			o.x = position.x;
			o.y = position.y;
		}

		if(o.shape === "rectangle") {
			c = Centroid.rectangle(o);
			o.x = (o.x - c.x) + position.x;
			o.y = (o.y - c.y) + position.y;
		}

		if(o.shape === "polygon") {

			c = Centroid.polygon(o)

			for(var i = 0; i < o.verts.length; i++) {
				o.verts[i].x = (o.verts[i].x - c.x) + position.x;
				o.verts[i].y = (o.verts[i].y - c.y) + position.y;
			}

		}

		if(o instanceof DynObject) {
			Matter.Body.setPosition(o.matter,position);
		}

	}
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 * @param {Vector} point 
 */

Motion.rotate = function(dynObject,angle,point) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,angle,point);
		}

		return Matter.Body.rotate(dynObject.matter, angle, point)

	}
}

/**
 * Rotate dynamic object towards point
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Vector} point 
 */

Motion.rotateTowards = function(dynObject,point) {

	var a = Math.atan2(point.y - dynObject.matter.position.y ,point.x - dynObject.matter.position.x)

	Motion.rotate(dynObject,a,dynObject.matter.position);
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} angle 
 */

Motion.setAngle = function(dynObject,angle) {

	if(!dynObject.locked) {

		if(dynObject.skinmesh) {
			Matter.Vertices.rotate(dynObject.skinmesh,-dynObject.cycle,dynObject);
			Matter.Vertices.rotate(dynObject.skinmesh,angle,dynObject);
		}

		return Matter.Body.setAngle(dynObject.matter,angle);

	}
}

module.exports = Motion;

/***/ }),

/***/ 3065:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * @namespace
 * @memberof PhSim
 */

const ObjLoops = {}

/**
 * Execute function on all members of a PhSim simulation or PhSim options.
 * @function
 * @param {PhSim|PhSimOptions} sim 
 * @param {Function} method 
 */

ObjLoops.global = function(sim,method) {

    if(sim instanceof PhSim) {
        for(let i = 0; i < sim.objUniverse.length; i++) {
            method(sim.objUniverse[i]);
        }
    }

    else {

        for(let i = 0; i < sim.simulations.length; i++) {
            for(let j = 0; j < sim.simulations[i].layers.length; j++) {
                for(let k = 0; k < sim.simulations[i].layers[j].objUniverse.length; k++) {
                    method(sim.simulations[i].layers[j].objUniverse[k]);
                }
            }
        }

    }

}

/**
 * Execute function on all members of a simulation object.
 * @function
 * @param {Object} simulation 
 * @param {Function} method 
 */

ObjLoops.simulation = function(simulation,method) {
    for(let j = 0; j < simulation.layers.length; j++) {
        for(let k = 0; k < simulation.layers[j].objUniverse.length; k++) {
            method(simulation.layers[j].objUniverse[k]);
        }
    }
}

/**
 * Execute function on all members of an layer
 * @function
 * @param {Object} layer
 * @param {Function} method
 */

ObjLoops.layer = function(layer,method) {
    for(let k = 0; k < layer.objUniverse.length; k++) {
        method(layer.objUniverse[k]);
    }
}

module.exports = ObjLoops;

/***/ }),

/***/ 1320:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const DynObject = __webpack_require__(390);

/**
 * 
 * Add Object to PhSim simulation
 * 
 * @function
 * @param {PhSimObject} o 
 * @param {Object} options
 * @param {Number} options.layer 
 * @returns {PhSim.DynObject} - The added dynObject. 
 */

PhSim.prototype.addObject = function(o,options = {}) {

	if(typeof options.layer === "number") {
		this.dynTree[options.layer].push(o);

		if(o instanceof DynObject) {
			o.layerBranch = this.dynTree[options.layer];
		}

	}

	this.objUniverse.push(o);

	if(o instanceof DynObject) {

		o.phSim = this;

		Matter.World.add(this.matterJSWorld,o.matter);

		if(o.static.widgets) {
			this.extractWidgets(o);
		}

	}

	return o;
}


/**
 * Add object to over layer.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.addToOverlayer = function(o) {
	
	if(o instanceof DynObject) {
		Matter.World.add(this.matterJSWorld, o.matter);
	}

	this.objUniverse.push(o);

}

/**
 * Remove dynamic object
 * 
 * @function
 * @param {PhSim.DynObject}  dynObject - Dynamic Object
 * @returns {PhSim.DynObject} - The removed Dynamic Object
 */

PhSim.prototype.removeDynObj = function(dynObject) {

	Matter.Composite.remove(this.matterJSWorld,dynObject.matter);

	this.objUniverse.splice(this.objUniverse.indexOf(dynObject),1);

	if(dynObject.layerBranch) {
		var i = dynObject.layerBranch.indexOf(dynObject);
		dynObject.layerBranch.splice(i,1);
		dynObject.layerBranch = undefined;
	}

	return dynObject;

}

/***/ }),

/***/ 2094:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * A static object is an object that is not simulated by the PhSim simulation.
 * The PhSim.Static namespace is used for storing Static Objects or constructors for 
 * parts of static objects.
 * 
 * A static simulation is an object that 
 * @namespace
 * @constructor
 * @memberof PhSim
 * 
 * 
 */


var Static = function() {

	/**
	 * PhSim version
	 * @type {Number}
	 */

	this.version = PhSim.version;

	/** 
	 * PhSim Static simulation Array 
	 * @type {PhSim.Static.Simulation[]}
	 */

	this.simulations = [];
	
	this.simulations.push(new PhSim.Static.Simulation());
	this.simulations[0].layers[0].name = "Untitled Layer"
	this.simulations[0].name = "Untitled simulation";

	/** PhSim Box Settings */

	this.box = new PhSim.Static.Rectangle(0,0,800,600);

}

/**
 * 
 * @typedef {PhSim.Vector|Circle|Rectangle|RegPolygon} Vector
 * 
 * In PhSim, a vector is any object with the properties `x` and `y` 
 * such that both are of the Number type.
 * 
 * In a {@link Circle}, the `x` and `y` coordinates refer to the center of the circle and the
 * same goes for the {@link RegPolygon|Regular Polygon}. In a {@link Rectangle}, it refers to the upper left
 * corner of the rectangle.
 * 
 */

/**
 * Gradient limits
 * @constructor
 * @param {Number} x0 - x coordinate of the first point
 * @param {Number} y0 - y coordinate of the first point
 * @param {Number} x1 - x coordinate of the second point
 * @param {Number} y1 - y coordinate of the second point
 */

Static.GradientLimits = function(x0,y0,x1,y1) {

	/**
	 * Start vector
	 * @type {Vector}
	 */

	this.start = new PhSim.Vector(x0,y0);
	
	/**
	 * End vector
	 * @type {Vector}
	 */

	this.end = new PhSim.Vector(x1,y1);
}

/**
 * @constructor
 * @param {Number} pos - Position of the gradient stop
 * @param {String} color - String denoting the color of the stop
 */

Static.GradientStop = function(pos,color) {
	
	/**
	 * Gradient Color
	 * @type {String}
	 */
	
	this.color = color;

	/**
	 * Gradient position
	 * @type {Number}
	 */

	this.pos = pos;
}

/**
 * Static gradient object constructor
 * @constructor
 */

Static.Gradient = function() {

	/**
	 * Gradient Stops
	 * @type {PhSim.Static.GradientStop[]}
	 */

	this.stops = [];

	/**
	 * Gradient name
	 * @type {String}
	 */
	
	this.name = "";

	/**
	 * Limits
	 * @type {Object}
	 */

	this.limits = {



		start: {
			x: null,
			y: null
		},

		end: {
			x: null,
			y: null
		}

	};
}

Static.lclGradient = function() {
	this.src = null;
	this.limits = new PhSim.Static.GradientLimits(arguments[0],arguments[1],arguments[2],arguments[3]);
	this.type = "linear";
}

/**
 * Constuctor defining the minimal requirements for a {@link Path}.
 * @constructor
 * @param {PhSim.Vector[]} verts -  Vertcies
 */

Static.Polygon = function(verts) {

	/**
	 * Array of vectors defining a path or a polygon
	 * @type {PhSim.Vector[]}
	 */

	this.verts;

	if(Array.isArray(verts)) {
		this.verts = verts;
	}

	else {
		throw "Expecting array in argument 1"
	}

	/**
	 * Boolean indicating it is a path
	 * @type {Boolean}
	 */

	this.shape = "polygon";
}

/**
 * 
 * A path is defined by vertices. They can be used as a regular polygon.
 * Any object that contains an array of vectors and has the boolean property ``path`` set to ``true`` is reconized as a path.
 * Paths can be used to define any polygon in general.
 * 
 * In PhSim, a path is any object `obj` such that the following is true:
 * 
 * `Array.isArray(obj) === true`
 * `obj.shape === "polygon"`
 * 
 * If a path is used as a polygon, it must have at least three vectors in the `verts` property. 
 * 
 * @typedef {PhSim.Static.Polygon} Polygon
 * 
 */
 

/**
 * Constructor for the minimal requirements for a {@link Circle}.
 * @constructor
 */

Static.Circle = function(x,y,r) {

	/**
	 * Boolean indicating a circle
	 * @type {Boolean}
	 */

	this.shape = "circle";

	/**
	 * x-coordinate of the center
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate of the center
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * Radius of the circle
	 * @type {Number}
	 */

	this.radius = r

	/**
	 * Angle of the circle
	 * @type {Number}
	 */

	this.cycle = null;
}

/** 
 * A circle is a set all points equidistant from some point known as the center.
 * 
 * In PhSim, a circle is any object `obj` such that the following are all true:
 * `obj.shape === "circle"`;
 * `typeof obj.x === number`;
 * `typeof obj.y === number`;
 * `typeof obj.radius === number`;
 * `typeof obj.cycle === number || obj.cycle`;
 * 
 * @typedef {PhSim.Static.Circle} Circle
 */

/**
 * A regular polygon is a polygon that has all of its sides equal in length.
 * 
 * In PhSim, a regular polgon is any object `obj` such that the following are true:
 * 
 * `this.shape === "regPolygon"`
 * 
 * 
 * @constructor
 * @param {Number} x - x-coordinate of the center
 * @param {Number} y - y-coordinate of the center
 * @param {Number} r - radius of the regular polygon
 * @param {Number} n - sides of the regular polygon
 */

Static.RegPolygon = function(x,y,r,n) {

	/**
	 * Boolean for indicating a regular polygon
	 * @type {Boolean}
	 */

	this.shape = "regPolygon";

	/**
	 * x-coordinate of the center of the regular polygon
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate for the center of the regular polygon
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * The radius of the regular polygon
	 * @type {Number}
	 */

	this.radius = r;

	/**
	 * The angle of the regular polygon
	 * @type {Number}
	 */

	this.cycle = null;

	/**
	 * The number of sides the regular polygon has
	 * @type {Number}
	 */

	this.sides = n;
}

/**
 * 
 * Constructor for a static Rectangle
 * 
 * @constructor
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * 
 */

Static.Rectangle = function(x,y,w,h) {

	/**
	 * Boolean for indicating a rectangle
	 * @type {Boolean}
	 */

	this.shape = "rectangle";

	/**
	 * x-coordinate of the upper left corner of the rectangle
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate of the upper left corner of the rectangle
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * Width of rectangle
	 * @type {Number}
	 */

	this.w = w;

	/**
	 * Height of rectangle
	 * @type {Number}
	 */

	this.h = h;

	/**
	 * Angle of rectangle
	 * @type {Number}
	 */

	this.cycle = 0;
}

/**
 * 
 * Static Object Type
 * 
 * @typedef {PhSim.Static.Rectangle | PhSim.Static.Circle | PhSim.Static.RegPolygon | PhSim.Static.Polygon} StaticObject
 * @property {Number} [mass] - The mass of the object.
 * @property {Number} [density] - The density of the object
 * @property {Boolean} [locked] - A boolean deterimining the lock status of the object
 * @property {Boolean} [semiLocked] - A boolean deteriming the semi-lock status of the object
 * @property {String} [name] - The name of the object
 * @property {String} [fillStyle] -  Fill Color 
 * @property {String} [strokeStyle] - Stroke Color
 * @property {String} [lineWidth] - Stroke Width
 * @property {PhSim.Sprites.Sprite} [sprite] - Sprite Object
 * @property {Array} [widgets] - {@link PhSim.Widgets|Static Widget Objects}.
 * 
 */

 /**
 * Composite Object 
 */

Static.Composite = function() {
	this.shape = "composite";
	this.name = "Untitled";
}

/**
 * Simulation Box Object 
 * 
 * @constructor
 * @param {Number} w
 * @param {Number} h
 * 
 */

Static.SimBox = function(w,h) {
	
	/**
	 * Simulation Width
	 * @type {Number}
	 */

	this.width = w;

	/**
	 * Simulation Height
	 * @type {Number}
	 */

	this.height = h;
}

/** 
 * Simulation Camera 
 * @constructor
 * 
 *
 */

Static.Camera = function(x,y,scale) {

	/**
	 * x-coordinate vector of camera
	 * @type {Number}
	 */

	this.x = x;

	/**
	 * y-coordinate vector of camera
	 * @type {Number}
	 */

	this.y = y;

	/**
	 * Scaling factor of camera
	 */

	this.c = scale;
}

/**
 * Layer constructor
 * @constructor
 */

Static.Layer = function() {

	/**
	 * The array of objects
	 * @type {StaticObject[]}
	 */

	this.objUniverse = [];

	/**
	 * The name of the layer
	 * @type {String}
	 */

	this.name = null;
}

/**
 * @typedef {Object} Layer
 * @property {PhSimObjects[]} objUniverse - The array of objects.
 * @property {String} name - The name of the layer
 */

/** 
 * simulation Object 
 * @constructor
 */

Static.Simulation = function() {

	/**
	 * Array of layers
	 * @type {PhSim.Static.Layer[]}
	 */

	this.layers = [];

	this.layers.push(new PhSim.Static.Layer())
	this.world = {
		grav: 1,
		bg: "white",
		border: null,
		unit: 1
	}

	/**
	 * Property indicating a simulation
	 * @type {Boolean}
	 * 
	 */

	this.simulation = true;
	this.widgets = [];
}

/**
 * 
 * @typedef {Object} Simulation
 * @property {Layer[]} layers - An array of layers
 * @property {Object} world - World Object
 * @property {Boolean} simulation - Boolean indicating a simulation
 * @property {WidgetOptions} widgets - Array of array options
 */

/**
 * 
 * @param {Simulation} L 
 * @param {*} O 
 */

Static.LO = function(L,O) {
	L.layers[O].objUniverse
}

/**
 * 
 * Specify object location by layer and object indexes.
 * 
 * @typedef LOAddress
 * @property {Number} L - layer
 * @property {Number} O - object
 * 
 */

Static.SLO = function(S,L,O) {
	return {
		S: S,
		L: L,
		O: O
	}
}

 /**
  * Specify object location by superlayer, layer and object indexes.
  * 
  * @typedef SLOAddress
  * @property {Number} S - superlayer
  * @property {Number} L - layer
  * @property {Number} O - object
  */


/**
 * Matter.js body
 * @external MatterBody
 * @see {@link https://brm.io/matter-js/docs/classes/Body.html|MatterBody} 
 */

module.exports = Static;

/***/ }),

/***/ 3811:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Gradients = __webpack_require__(5258);
const BoundingBox = __webpack_require__(6254);
const Centroid = __webpack_require__(209);
const Vertices = __webpack_require__(9153);

/** 
 * 
 * PhRender constructor
 * PhRender is the rendering engine for PhSim.
 * 
 * @constructor
 * @memberof PhSim
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * 
 */

var PhRender = function(ctx) {

	/**
	 * PhRender Context
	 * @type {CanvasRenderingContext2D}
	 */

	this.ctx = ctx;
}

/**
 * Default Alpha
 * This the alpha of an object that has no alpha defined.
 * 
 * @type {Number}
 */

PhRender.prototype.defaultAlpha = 1;

/**
 * Default stroke style.
 * This is the stroke style of an object that has no stroke style defined.
 * 
 * @type {String}
 */

PhRender.prototype.defaultStrokeStyle = "transparent";

/**
 * Default fill style
 * This is the default fill style of an object.
 * 
 * @type {String}
 */

PhRender.prototype.defaultFillStyle = "transparent";

/**
 * Setting context
 * That is, this function sets the `globalAlpha`, `strokeStyle`, `fillStyle` and `lineWidth`
 * properties of the {@link PhRender#ctx} member of the {@link PhRender} object
 * using a {@link PhSimObject} object.
 * 
 * @function
 * @param {PhSimObject} object 
 */

PhRender.prototype.setCtx = function(object) {
	
	this.ctx.lineCap = "round";

	if(typeof this.ctx.globalAlpha === "number") {
		this.ctx.globalAlpha = object.globalAlpha
	}

	else {
		this.ctx.globalAlpha = this.defaultAlpha;
	}

	this.ctx.strokeStyle = object.strokeStyle || this.defaultStrokeStyle;
	this.ctx.fillStyle = object.fillStyle || this.defaultFillStyle;

	if(object.lineWidth) {

		if(object.lineWidth === 0) {
			this.ctx.strokeStyle = "transparent"
		}

		else {
			this.ctx.lineWidth = object.lineWidth;
		}

	}

	else {
		this.ctx.strokeStyle = "transparent"
	}
	
}

PhRender.prototype.unsetCtx = function() {
	this.ctx.globalAlpha = 1;
}

/**
 * 
 * Render a a {@link polygon}.
 * 
 * @function
 * @param {Path} path 
 */

PhRender.prototype.renderPolygon = function (path) {

	var w;
	var h;

	this.setCtx(path);

	this.ctx.beginPath();

	this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

	for(var j = 0; j < path.verts.length; j++) {
		this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();
	this.ctx.fill();

	if(path.sprite && path.sprite.src) {

		var img = this.getImgObj(path.sprite.src);

		var centroid = Centroid.polygon(path);

		this.ctx.imageSmoothingEnabled = path.sprite.smooth;

		this.ctx.save();

		this.ctx.beginPath();

		this.ctx.moveTo(path.verts[0].x, path.verts[0].y);

		for(let j = 0; j < path.verts.length; j++) {
			this.ctx.lineTo(path.verts[j].x, path.verts[j].y);
		}

		this.ctx.closePath();

		this.ctx.translate(centroid.x,centroid.y);

		if(path.sprite.repeat) {

			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;

			this.ctx.fill();
		}

		else if(path.sprite.fit) {

			this.ctx.clip();

			var box = BoundingBox.fromShape(path);

			h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(path.sprite.src,centroid.x,centroid.y,box.w,h,0);
		}

		else if(typeof path.sprite.w === "number" && typeof path.sprite.h === "number") {

			this.ctx.clip();

			w = path.sprite.w || img.width;
			h = path.sprite.h || img.height;

			this.renderSpriteByCenter(path.sprite.src,0,0,w,h,0);

		}

		else if(typeof path.sprite.w !== "number" && typeof path.sprite.h === "number") {
			
		    this.ctx.clip();

			let w = (img.width/img.height) * path.sprite.h;

			this.renderSpriteByCenter(path.sprite.src,0,0,w,path.sprite.h,0);
		}

		else if(typeof path.sprite.w === "number" && typeof path.sprite.h !== "number") {
			
			this.ctx.clip();

			let h = (img.height/img.width) * path.sprite.w;
			
			this.renderSpriteByCenter(path.sprite.src,0,0,path.sprite.w,h,0);
		}

		else if(typeof path.sprite.w !== "number" && typeof path.sprite.h !== "number") {
			this.ctx.clip();
			this.renderSpriteByCenter(path.sprite.src,0,0,img.width,img.height,0);
		}

	}

	this.ctx.restore();	

	this.unsetCtx();
	
}

/**
 * 
 * Render sprite by center
 * 
 * @function
 * @param {String|HTMLCanvasElement|HTMLImageElement|ImageData} url - URL of object loaded in PhRender.prototype.spriteImgObj
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} w - width
 * @param {Number} h - height
 * @param {Number} a - angle
 */

PhRender.prototype.renderSpriteByCenter = function(url,x,y,w,h,a) {

	var spriteImg;

	if(typeof url === "string") {
		spriteImg = this.spriteImgObj[url];
	}

	if(url instanceof HTMLCanvasElement || url instanceof HTMLImageElement) {
		spriteImg = url;
	}

	this.ctx.save();
	this.ctx.translate(x,y)
	this.ctx.rotate(a)

	if(typeof url === "string" || url instanceof HTMLCanvasElement || url instanceof HTMLImageElement) {
		
		if(h === null) {
			this.ctx.drawImage(spriteImg,0,0,spriteImg.width,spriteImg.height,-w * 0.5 , -h * 0.5,w);
		}

		else {
			this.ctx.drawImage(spriteImg,0,0,spriteImg.width,spriteImg.height,-w * 0.5 , -h * 0.5,w,h);
		}

	}

	if(url instanceof ImageData) {
		this.ctx.putImageData(url, - url.width * 0.5, - url.height * 0.5);
	}

	this.ctx.restore();
}

PhRender.prototype.getImgObj = function(src) {

	if(typeof src === "string") {
		return this.spriteImgObj[src];
	}

	else {
		return src;
	}

}


/**
 * 
 * Render circle
 * 
 * @function
 * @param {PhSim.Static.Circle} circle 
 */

PhRender.prototype.renderCircle = function (circle) {

	var w;
	var h;
	
	this.setCtx(circle);

	this.ctx.beginPath();
	this.ctx.arc(circle.x, circle.y, circle.radius, 0, 2*Math.PI)
	this.ctx.closePath();

	this.ctx.fill();
	this.ctx.stroke();

	if(circle.gradient) {
		this.ctx.save();
		this.ctx.translate(circle.x,circle.y);
		this.ctx.rotate(circle.cycle);
		this.ctx.fillStyle = Gradients.extractGradient(this.ctx,circle.gradient);
		this.ctx.arc(0,0,circle.radius,0,2*Math.PI);
		this.ctx.fill();
		this.ctx.restore();	

	}

	if(circle.sprite && circle.sprite.src) {

		/**
		 * 
		 * @type {HTMLImageElement}
		 */

		var img = this.getImgObj(circle.sprite.src);

		this.ctx.imageSmoothingEnabled = circle.sprite.smooth;

		this.ctx.save();
		this.ctx.translate(circle.x,circle.y);
		this.ctx.rotate(circle.cycle);
		this.ctx.arc(0,0,circle.radius,0,2*Math.PI);

		if(circle.sprite.repeat) {
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.fill();	
		}

		else if(circle.sprite.fit) {

			this.ctx.clip();
			var box = BoundingBox.fromShape(circle);

			h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(circle.sprite.src,0,0,box.w,h);
			this.ctx.restore();	
		}

		else if(typeof circle.sprite.w === "number" && typeof circle.sprite.h === "number") {

			w = circle.sprite.w || img.width;
			h = circle.sprite.h || img.height;

			this.ctx.clip(); 
			this.renderSpriteByCenter(circle.sprite.src,0,0,w,h,0);
		}

		else if(typeof circle.sprite.w !== "number" && typeof circle.sprite.h === "number") {
			
		    this.ctx.clip();

			let w = (img.width/img.height) * circle.sprite.h;

			this.renderSpriteByCenter(circle.sprite.src,0,0,w,circle.sprite.h,0);
		}

		else if(typeof circle.sprite.w === "number" && typeof circle.sprite.h !== "number") {
			
			this.ctx.clip();

			let h = (img.height/img.width) * circle.sprite.w;
			
			this.renderSpriteByCenter(circle.sprite.src,0,0,circle.sprite.w,h,0);
		}

		else if(typeof circle.sprite.w !== "number" && typeof circle.sprite.h !== "number") {
			this.ctx.clip();
			this.renderSpriteByCenter(circle.sprite.src,0,0,img.width,img.height,0);
		}

	}

	this.ctx.restore();

	this.unsetCtx();

}


/**
 * 
 * Render rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle - Rectangle object
 * @param rectangle.sprite - Sprite Object
 */

PhRender.prototype.renderRectangle = function(rectangle) {

	var c = Centroid.rectangle(rectangle);

	var x = -rectangle.w * 0.5;
	var y = -rectangle.h * 0.5;
	
	this.setCtx(rectangle);
	this.ctx.translate(c.x,c.y);
	this.ctx.rotate(rectangle.cycle);
	this.ctx.beginPath();
	this.ctx.rect(x,y,rectangle.w,rectangle.h);
	this.ctx.closePath();
	this.ctx.stroke();
	this.ctx.fill();

	if(rectangle.widgets) {
		for(let i = 0; i < rectangle.widgets.length; i++) {
			if(rectangle.widgets[i].type === "rectText") {
				this.rectText(rectangle.widgets[i],x,y,rectangle.w,rectangle.h,0);
			}
		}
	}

	this.ctx.rotate(-rectangle.cycle);
	this.ctx.translate(-c.x,-c.y);


	if(typeof rectangle.sprite === "object" && rectangle.sprite.src) {

		var img = this.getImgObj(rectangle.sprite.src);

		this.ctx.imageSmoothingEnabled = rectangle.sprite.smooth;

		this.ctx.save();
		this.ctx.translate(c.x,c.y);
		this.ctx.rotate(rectangle.cycle);
		this.ctx.rect(-rectangle.w * 0.5,-rectangle.h * 0.5,rectangle.w,rectangle.h);

		if(rectangle.sprite.repeat) {
	
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.fill();
			this.ctx.restore();	
		}

		else if(rectangle.sprite.fit) {

			this.ctx.clip();

			let h = img.height * (rectangle.w/img.width);

			this.renderSpriteByCenter(rectangle.sprite.src,0,0,rectangle.w,h,0);
		}

		else if(typeof rectangle.sprite.w === "number" && typeof rectangle.sprite.h === "number") { 
			
			this.ctx.clip();
			this.renderSpriteByCenter(rectangle.sprite.src,0,0,rectangle.sprite.w,rectangle.sprite.h,0);
		}

		else if(typeof rectangle.sprite.w !== "number" && typeof rectangle.sprite.h === "number") {
			
			this.ctx.clip();

			let w = (img.width/img.height) * rectangle.sprite.h;

			this.renderSpriteByCenter(rectangle.sprite.src,0,0,w,rectangle.sprite.h,0);
		}

		else if(typeof rectangle.sprite.w === "number" && typeof rectangle.sprite.h !== "number") {
			
			this.ctx.clip();

			let h = (img.height/img.width) * rectangle.sprite.w;
			
			this.renderSpriteByCenter(rectangle.sprite.src,0,0,rectangle.sprite.w,h,0);
		}

		else if(typeof rectangle.sprite.w !== "number" && typeof rectangle.sprite.h !== "number") {
			this.ctx.clip();
			this.renderSpriteByCenter(rectangle.sprite.src,0,0,img.width,img.height,0);
		}

	}

	this.ctx.restore();	
	this.unsetCtx();

}

// Draw text

/**
 * @function
 * @param {*} text
 * @param {String} text.fill - Text Fill Style
 * @param {Number} text.lineWidth - Text border line width
 * @param {String} text.borderColor - Text border color
 * @param {Number} text.size - Text size
 * @param {String} text.font - Text font
 * @param {}
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} w 
 * @param {Number} h 
 * @param {Number} a 
 */

PhRender.prototype.rectText = function(text,x,y,w,h,a) {
	this.ctx.save();
	this.ctx.translate(x,y);
	this.ctx.rotate(a);
	this.ctx.beginPath();
	this.ctx.rect(0,0,w,h);
	this.ctx.clip();
	this.ctx.textAlign = "left";
	this.ctx.fillStyle = text.fill || "#000000";

	// Reset Line Width

	this.ctx.lineWidth = undefined;

	if(text.lineWidth) {
		this.ctx.lineWidth = text.lineWidth;
	}

	this.ctx.strokeStyle = text.borderColor || "#000000";
	this.ctx.font = text.size + "px " + text.font;
	this.ctx.textBaseline = "top";
	var content = text.content || "";

	if(this.dynSim) {
		content = this.dynSim.processVar(content);
	}

	var lineHeight = text.lineHeight || this.ctx.measureText("M").width;

	var lines = content.split("\n");

	for(let i = 0; i < lines.length; i++) {

		this.ctx.fillText(lines[i],0,lineHeight * i);

		if(text.lineWidth) {
			this.ctx.strokeText(lines[i],0,lineHeight * i);
		}

	}

	this.ctx.restore();
}

// Draw a regular polygon

/**
 * @function
 * @param {PhSim.Static.RegPolygon} regPolygon 
 */

PhRender.prototype.renderRegPolygon = function(regPolygon) {

	var vertSet = Vertices.regPolygon(regPolygon);
	
	this.setCtx(regPolygon);

	this.ctx.beginPath();

	this.ctx.moveTo(vertSet[0].x, vertSet[0].y);

	for(let j = 0; j < vertSet.length; j++) {
		this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
	}

	this.ctx.closePath();
	
	this.ctx.stroke();

	this.ctx.globalAlpha = regPolygon.fillAlpha;

	this.ctx.fill();

	if(regPolygon.sprite && regPolygon.sprite.src) {

		var img = this.getImgObj(regPolygon.sprite.src);

		this.ctx.imageSmoothingEnabled = regPolygon.sprite.smooth;

		this.ctx.save();

		this.ctx.beginPath();

		this.ctx.moveTo(vertSet[0].x, vertSet[0].y);
	
		for(let j = 0; j < vertSet.length; j++) {
			this.ctx.lineTo(vertSet[j].x, vertSet[j].y);
		}
	
		this.ctx.closePath();

		this.ctx.translate(regPolygon.x,regPolygon.y);
		this.ctx.rotate(regPolygon.cycle);

		if(regPolygon.sprite.repeat) {
			var pattern = this.ctx.createPattern(img,"repeat");
			this.ctx.fillStyle = pattern;
			this.ctx.fill();
		}

		if(regPolygon.sprite.fit) {

			this.ctx.clip();

			let box = BoundingBox.fromShape(regPolygon);

			let h = img.height * (box.w/img.width);

			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,box.w,h,0);

		}

		else if(typeof regPolygon.sprite.w === "number" && typeof regPolygon.sprite.h === "number") {
			
			this.ctx.clip();

			let w = regPolygon.sprite.w;
			let h = regPolygon.sprite.h;

			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,w,h,0);
		}

        else if(typeof regPolygon.sprite.w !== "number" && typeof regPolygon.sprite.h === "number") {
			
		    this.ctx.clip();

			let w = (img.width/img.height) * regPolygon.sprite.h;

			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,w,regPolygon.sprite.h,0);
		}

		else if(typeof regPolygon.sprite.w === "number" && typeof regPolygon.sprite.h !== "number") {
			
			this.ctx.clip();

			let h = (img.height/img.width) * regPolygon.sprite.w;
			
			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,regPolygon.sprite.w,h,0);
		}

		else if(typeof regPolygon.sprite.w !== "number" && typeof regPolygon.sprite.h !== "number") {
			this.ctx.clip();
			this.renderSpriteByCenter(regPolygon.sprite.src,0,0,img.width,img.height,0);
		}

	}

	this.ctx.restore();	

	this.unsetCtx();

}

// Draw Static object

/**
 * @function
 * @param {PhSimObject} obj 
 */

PhRender.prototype.renderStatic = function(obj) {
				
	if (obj.shape === "polygon")  {
		this.renderPolygon(obj);
	}
	
	if( obj.shape === "circle") {
		this.renderCircle(obj); 
	}

	if( obj.shape === "rectangle") {
		this.renderRectangle(obj);
	}

	if( obj.shape === "regPolygon") {
		this.renderRegPolygon(obj);
	}

	if( obj.shape === "composite") {
		for(var i = 0; i < obj.parts.length; i++) {
			this.renderStatic(obj.parts[i]);
		}
	}

}

// Draws a layer

/**
 * @function
 * @param {*} layer 
 */

PhRender.prototype.renderStaticLayer = function(layer) {

	for(var i = 0; i < layer.objUniverse.length; i++) {

			this.renderStatic(layer.objUniverse[i])
			
	}	
}

/**
 * @function
 * @param {*} simulation 
 */

PhRender.prototype.simulation = function(simulation) {

	for(var i = 0; i < simulation.layers.length; i++) {
		if(!simulation.layers[i].hidden) {
			this.layer(simulation.layers[i])
		}
	}
}

/**
 * @function
 * @param {*} object 
 */

PhRender.prototype.dynamicSkeleton = function(object) {

	if(object.static.shape === "polygon") {
		
		this.ctx.beginPath();

		this.ctx.moveTo(object.skinmesh[0].x, object.skinmesh[0].y);

		for(var j = 0; j < object.skinmesh.length; j++) {
			this.ctx.lineTo(object.skinmesh[j].x, object.skinmesh[j].y);
		}
	
	}

	else {

		this.ctx.beginPath();

		this.ctx.moveTo(object.matter.vertices.x, object.matter.vertices.y);

		for(let j = 0; j < object.matter.vertices.length; j++) {
			this.ctx.lineTo(object.matter.vertices[j].x, object.matter.vertices[j].y);
		}


	}

}

/**
 * @function
 * @param {*} object 
 */

PhRender.prototype.dynamicSkeleton_center = function(object) {

	if(object.static.shape === "polygon") {
		
		this.ctx.beginPath();

		this.ctx.moveTo(object.skinmesh[0].x - object.matter.position.x, object.skinmesh[0].y - object.matter.position.y);

		for(var j = 0; j < object.skinmesh.length; j++) {
			this.ctx.lineTo(object.skinmesh[j].x - object.matter.position.x, object.skinmesh[j].y - object.matter.position.y);
		}
	
	}

	else {

		this.ctx.beginPath();

		this.ctx.moveTo(object.matter.vertices.x - object.matter.position.x, object.matter.vertices.y - object.matter.position.y);

		for(let j = 0; j < object.matter.vertices.length; j++) {
			this.ctx.lineTo(object.matter.vertices[j].x - object.matter.position.x, object.matter.vertices[j].y - object.matter.position.y);
		}


	}

}

/**
 * @function
 * @param {*} object 
 */

PhRender.prototype.drawDynamicSkeleton = function (object) {

	this.dynamicSkeleton(object);
	this.ctx.closePath();
	this.ctx.stroke();

}

/**
 * @function
 * @param {*} dynObject 
 */

PhRender.prototype.dynamicRenderDraw = function (dynObject) {

	this.ctx.lineWidth = dynObject.lineWidth;
	this.ctx.fillStyle = dynObject.fillStyle;
	this.ctx.strokeStyle = dynObject.strokeStyle;

	
	if(dynObject.shape === "polygon") {
		
		this.drawDynamicSkeleton(dynObject);
		
		this.ctx.fill();

		if(dynObject.sprite && dynObject.sprite.src) {

			var img = this.getImgObj(dynObject.sprite.src);

			this.ctx.imageSmoothingEnabled = dynObject.sprite.smooth;

			if(dynObject.sprite.repeat) {

				this.ctx.save();

				this.dynamicSkeleton(dynObject);
				this.ctx.translate(dynObject.matter.position.x,dynObject.matter.position.y);
				this.ctx.rotate(dynObject.matter.angle);
				this.ctx.scale(dynObject.sprite.scale,dynObject.sprite.scale);
		

				var pattern = this.ctx.createPattern(img,"repeat");
				this.ctx.fillStyle = pattern;
				this.ctx.fill();

				this.ctx.restore();
			}

			else if(dynObject.sprite.fit) {

				this.ctx.save();
	
				this.ctx.beginPath();
	
				this.ctx.moveTo(dynObject.verts[0].x, dynObject.verts[0].y);
	
				for(var j = 0; j < dynObject.verts.length; j++) {
					this.ctx.lineTo(dynObject.verts[j].x, dynObject.verts[j].y);
				}
	
				this.ctx.closePath();
	
				this.ctx.clip();
	
				var box = BoundingBox.fromShape(dynObject);
	
				var h = img.height * (box.w/img.width);
	
				this.renderSpriteByCenter(dynObject.sprite.src,dynObject.matter.position.x,dynObject.matter.position.y,box.w,h,dynObject.matter.angle);
	
				this.ctx.restore();	

				//

			}
	
			else {
				this.renderSpriteByCenter(dynObject.sprite.src,dynObject.matter.position.x,dynObject.matter.position.y,img.width,img.height,dynObject.matter.angle);
			}

			//this.ctx.restore();	
	
		}
		
	}

	if(dynObject.shape === "circle") {
		this.renderCircle(dynObject);	
	}
	
	if(dynObject.shape === "regPolygon") {
		this.renderRegPolygon(dynObject);		
	}

	if(dynObject.shape === "rectangle") {
		this.renderRectangle(dynObject);		
	}

	if(dynObject.shape === "composite") {
		for(var i = 1; i < dynObject.parts.length; i++) {
			this.dynamicRenderDraw(dynObject.parts[i]);
		}
	}

}

/**
 * @function
 * @param {*} L 
 */

PhRender.prototype.dynamicDrawLayer = function(L,sim,simulationI) {
	
	for(let i = 0; i < sim.simulations[simulationI].layers[L].length; i++) {
		this.dynamicRenderDraw(L,i);
	}

}

module.exports = PhRender;

/***/ }),

/***/ 7529:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * Object containing variables that can be read by widgets such as
 * the {@link|RectText} widget. 
 */

PhSim.prototype.vars = {}

/**
 * Object containing magic words
 */

PhSim.prototype.magicWords = {}

PhSim.MagicWords = {

	__test1: function() {
		return "4";
	},

	/**
	 * The `__game__score` magical word returns the game score if the game widget is enabled.
	 * @function
	 * @returns {Number} - Game score.
	 */

	__game__score: function() {
		return this.lclGame && this.lclGame.score;
	},

	/**
	 * The `__game__life` magical word returns the live count of the player if the 
	 * game widget is enabled.
	 * 
	 * @function
	 * @returns {Number} - Life count
	 */

	__game__life: function() {
		return this.lclGame && this.lclGame.life; 
	},

	/**
	 * The `__game__goal` magical word returns the goal of the game if the game widget
	 * is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__goal: function() {
		return this.lclGame && this.lclGame.goal;
	},

	/**
	 * The `__game__int_life` magical word returns the intial life count of the game,
	 * given the game widget is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__int_life: function() {
		return this.lclGame && this.lclGame.intLife;
	},

	/**
	 * The `__game__int_score` magical word returns the inital game score given the 
	 * game widget is enabled.
	 * 
	 * @function
	 * @returns {Number}
	 */

	__game__int_score: function() {
		return this.lclGame && this.lclGame.intScore;
	}

}

/**
 * 
 * Adds a global magical word function.
 * 
 * @function
 * @param {String} name - Name of magical word
 * @param {Function} call 
 */

PhSim.addGlobalMagicalWord = function(name,call) {
	
	if(PhSim.MagicWords[name]) {
		throw "Magical word " + name + " already exists."
	}

	else {
		PhSim.MagicWords[name] = call;
	}

}

/**
 * 
 * Adds a local magical word function.
 * 
 * @function
 * @param {String} name - Name of magical word
 * @param {Function} call 
 */

PhSim.prototype.addLocalMagicalWord = function(name,call) {

	if(this.magicWords[name]) {
		throw "Magical word " + name + " already exists."
	}

	else {
		this.magicWords[name] = call;
	}

}

/**
 * 
 * Process string by replacing magical words and the values of elements in
 * {@link PhSim#vars|PhSim.prototype.vars}.
 * 
 * Some of the magic words are the following:
 * 
 * `{__game__score}` - The game score
 * `{__game__life}` -  The game life
 * `{__game__goal}` - The game goal
 * `{__game__int_life}` - The inital life value for the game
 * 
 * The expression `${key}` is replaced by the value of `{@link PhSim#vars |PhSim.prototype.vars[key]}`.
 * 
 * @function
 * @param {String} str 
 * @returns {String}
 * 
 */

PhSim.prototype.processVar = function(str) {

	var magicWordKeys = Object.keys(PhSim.MagicWords);

	for(let i = 0; i < magicWordKeys.length; i++) {

		let magicWord = magicWordKeys[i];
		let mgkWordRegex = new RegExp("{" + magicWord + "}","g");

		if(str.search(mgkWordRegex) !== -1) {

			str = str.replace(mgkWordRegex,PhSim.MagicWords[magicWord].call(this));
		}

	}

	let a = Object.keys(this.vars);

	for(let i = 0; i < a.length; i++) {

		let v = "\\$\\{" + a[i] + "\\}";
		let regex = new RegExp(v,"g");
		let s = str.search(regex);

		if(s !== -1) {
			str = str.replace(regex,this.vars[ a[i] ]);
		}
	}

	return str;

}

/***/ }),

/***/ 447:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { ObjLoops } = __webpack_require__(8138);
const Vector = __webpack_require__(2450);
const PhSim = __webpack_require__(8138);
const Vertices = __webpack_require__(9153);

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}
	
/**
 * @namespace
 * @memberof PhSim
 */

PhSim.Query = {}

/**
 * 
 * Get the special points of a rectangle
 * 
 * @function
 * @param {Object} rectangle 
 */

PhSim.Query.getSpecialRectanglePoints = function(rectangle) {
	
	var o = {

		"center": {
			"rel": {
				"x": 0.5 * rectangle.w,
				"y": 0.5 * rectangle.h
			},
	
			"abs": {
				"x": rectangle.x + o.center.rel.x,
				"y": rectangle.h + o.center.rel.y
			},
		},

		"sidepoint": {

			"rel": {
				"x": rectangle.w,
				"y": 0.5 * rectangle.h
			},

			"abs": {
				"x": o.sidepoint.rel.x + rectangle.x,
				"y": o.sidepoint.rel.y + rectangle.y 
			}

		},

	}

	return o;

}

/**
 * Get the status string of the the dynamic simulation
 * @function
 */

PhSim.prototype.getStatusStr = function() {
	return PhSim.Query.getStatusStr(this);
}

/**
 * Get the status string of a PhSim instance.
 * @param {PhSim} dynObject 
 */

PhSim.Query.getStatusStr = function(phSim) {
	return PhSim.statusStruct[phSim.status];
}

/**
 * 
 * Get collision classes
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @returns {String[]}
 * 
 */

PhSim.Query.getCollisionClasses = function(dynObject) {

	if(dynObject.collisionClass) {
		var a = dynObject.collisionClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

/**
 * @function
 */

PhSim.prototype.getUniversalObjArray = function() {
	
	var array = []
	
	for(let i = 0; i < this.matterJSWorld.composites.length; i++) {
		
		var a = this.matterJSWorld.composites[i].bodies;

		for(let j = 0; j < a.length; j++) {
			array.push(a[j]);
		}

	}

	for(let i = 0; i < this.matterJSWorld.bodies.length; i++) {
		array.push(this.matterJSWorld.bodies[i]);
	}

	return array;

}

/**
 * Check widget type and return the widget type
 * @param {WidgetOptions} widget 
 */

PhSim.Query.chkWidgetType = function(widget) {
	
	for(var i = 0; i < PhSim.boolKey_lc.length; i++) {
		if(widget[PhSim.boolKey_lc[i]]) {
			return PhSim.boolKey_lc[i];
		}
	}

	return "unknown_widget";

}

/**
 * Get static object of a dynamic object
 * @param {PhSim.DynObject} dynObject - The dynamic object
 */

PhSim.prototype.getStatic = function(dynObject) {
	
	if(dynObject.static || dynObject.static) {
		return null;
	}

	else {
		return dynObject.static;
	}
}

/**
 * Get object by name in PhSim simulation
 * 
 * @function
 * @param {String} str - String for the name
 * @returns {PhSimObject|null} -  Returns the object if found, but returns "null" object if not.
 */

PhSim.prototype.getObjectByName = function(str) {

	for(var i = 0; i < this.objUniverse.length; i++) {
		if(this.objUniverse[i].name === str) {
			return this.objUniverse[i];
		}
	}

}

/**
 * Get Object By Name
 * @param {Simulation|Layer|PhSimObject[]} o 
 * @param {string} str - Name of Object
 */

PhSim.Query.getObjectByName = function(o,str) {

	var x;
	
	if(Array.isArray(o)) {
		for(var i = 0; i < o.length; i++) {
			if(o.name === str) {
				return o[i];
			}
		}
	}
	
	// Get object by name in static composite simulation object

	else if(Array.isArray(o.simulations)) {

		ObjLoops.global(o,function(p){
			if(p.name === str) {
				x = p;
			}
		}) 

		return x;
	}

	// Get object by name in simulation object with layers


	else if(Array.isArray(o.layers)) {

		ObjLoops.layer(o,function(p){
			if(p.name === str) {
				x = p;
			}
		}) 

		return x;

	}

	// Get object by name in simulation object with objUniverse

	else if(Array.isArray(o.objUniverse)) {
		PhSim.Query.getObjectByName(o.objUniverse,str); 
	}

}

/**
 * Check if two objects are colliding
 * @function
 * @param {PhSim.DynObject} dynObjectA 
 * @param {PhSim.DynObject} dynObjectB
 * @returns {Boolean} 
 */

PhSim.prototype.collided = function(dynObjectA,dynObjectB) {
	return Matter.SAT.collides(dynObjectA.matter,dynObjectB.matter).collided;
}

/**
 * Check if an object is in a collision
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {Boolean}
 */

PhSim.prototype.isInCollision = function(dynObject) {

	var self = this;

	var returnValue = false;

	this.forAllObjects(function(object) {
		var a = self.collided(dynObject,object);
		if(a === true) {
			returnValue = a;
			return false;
		}	
	});

	return returnValue;
}

/**
 * See if point is contained in shape defined by vertices set.
 * @function
 * @param {Vector[]} a - Set of vertices
 * @param {Vector} v - The vertex to be checked.
 * @return {Boolean} - Returns true if `v` is contained in the shape defined by `a` and false if otherwise.
 */

PhSim.Query.pointInVerts = function(a,v) {

	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");

	ctx.beginPath();
	ctx.moveTo(a[0].x,a[0].y);

	for(var i = 0; i < a.length; i++) {
		ctx.lineTo(a[i].x,a[i].y);
	}

	ctx.closePath();
	var p = ctx.isPointInPath(v.x,v.y);
	ctx.stroke();


	return p;


}

/**
 * 
 * See if point is in vertices border
 * 
 * @function
 * @param {Vector[]} a - Vertices to check
 * @param {Vector} v - Point to check.
 * @param {Number} width - Width of vertices border
 * @returns {Boolean} - Returns `true` if `v` is in the border of the 
 * polygon defined by `a` and false otherwise.
 */

PhSim.Query.pointInVertsBorder = function(a,v,width) {

	if(width) {
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		ctx.lineWidth = width;
		ctx.beginPath();
		ctx.lineTo(a[0].x,a[0].y);

		for(var i = 0; i < a.length; i++) {
			ctx.moveTo(a[i].x,a[i].y);
		}

		ctx.closePath();
		var p = ctx.isPointInPath(v.x,v.y);
		ctx.stroke();


		return p;		
	}

	else {
		return false;
	}

}

PhSim.Query.getMatterPartVertexByVertexPoint = function(dynObject,point,radius) {

	radius = radius || 0;

	for(let i = 0; i < dynObject.matter.parts.length; i++) {

		let part = dynObject.matter.parts[i];

		for(let j = 1; j < part.vertices.length; j++) {

			if(radius) {
				if(Vector.distance(part.vertices[j],point) < radius) {
					return part.vertices[j];
				}
			}

			else {

				if(part.vertices[j].x === point.x && part.vertices[j].y === point.y) {
					return part.vertices[j];
				}

			}	

		}

	}
}

PhSim.Query.getMatterPartByVertexPoint = function(dynObject,point,radius) {
	return PhSim.Query.getMatterPartVertexByVertexPoint(dynObject,point,radius).body;
}

/**
 * 
 * @param {*} dynObjectA 
 * @param {*} dynObjectB 
 */

PhSim.Query.overlaps = function(dynObjectA,dynObjectB) {

	var a = Vertices.object(dynObjectA);
	var b = Vertices.object(dynObjectB);

	for(var i = 0; i < a.length; i++) {
		if(PhSim.Query.pointInVerts(b,a[i])) {
			return true;
		}
	}

	return false;

}

/**
 * Deep clone a JavaScript object.
 * @param {Object} o 
 */

PhSim.Query.deepClone = function(o) {
	return JSON.parse(JSON.stringify(o));
}

/**
 * @function
 * @param {*} o 
 * @param {*} x 
 * @param {*} y 
 */

PhSim.Query.pointInRectangle = function(o,x,y) {
	var a = PhSim.Vertices.rectangle(o);
	return PhSim.Query.pointInVerts(a,new Vector(x,y));
}

/**
 * 
 * Check if a point (x,y) is in a dynamic object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {Boolean}
 */

PhSim.Query.pointInObject = function(o,x,y) {

	if(o.shape === "rectangle") {
		return PhSim.Query.pointInRectangle(o,x,y);
	}

	else if(o.shape === "circle") {

		var d = Vector.distance(o,new Vector(x,y));
		
		if(d < o.radius) {
			return true;
		}

		else {
			return false;
		}

	}  
	
	else if(o.shape === "regPolygon") {
		var a = PhSim.Vertices.regPolygon(o);
		return PhSim.Query.pointInVerts(a,new Vector(x,y));
	}

	else if(o.shape === "polygon") {
		return PhSim.Query.pointInVerts(o.verts,new Vector(x,y));
	}
}

PhSim.prototype.pointInObject = function(o,x,y) {
	return PhSim.Query.pointInObject(o,x,y)
}

/**
 * Get object by ID
 * 
 * @function
 * @param {String} idNum
 * @returns {PhSim.DynObject} 
 * 
 */

PhSim.prototype.getDynObjectByID = function(idNum) {

	var a = this.getUniversalObjArray();

	for(var i = 0; i < a.length; i++) {
		if(a[i].id === idNum) {
			return a[i];
		}
	}

}

/**
 * 
 * Get array of objects that contain a certain point 
 * 
 * @function
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @returns {PhSim.DynObject[]}
 * 
 */

PhSim.prototype.pointObjArray = function(x,y) {

	var b = [];

	var a = this.objUniverse || [];

	for(var i = 0; i < a.length; i++) {
		if(this.pointInObject(a[i],x,y)) {
			b.push(a[i]);
		}
	}

	return b;

}

/** 
 * Get the collison pairs that contain a certain object 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject
 * @returns {PhSim.phSimCollision[]}
 * 
 */

PhSim.prototype.getCollisionList = function(dynObject) {

	var a = [];

	this.matterJSEngine.pairs.list.forEach(function(c){
		if(c.bodyA.plugin.dynObject === dynObject || c.bodyB.plugin.dynObject === dynObject) {
			var p = new PhSim.Events.PhSimCollision();

			p.bodyA = c.bodyA.parent.plugin.dynObject;
			p.bodyB = c.bodyA.parent.plugin.dynObject;

			p.matter = c;
			a.push(p);

			if(!c.bodyA.parent.plugin.dynObject || !c.bodyB.parent.plugin.dynObject) {
				debugger;
			}

		}
	});

	return a;

}

PhSim.prototype.getCollidingMatterBodies = function(body) {

	var a = [];

	for(var i = 0; i < this.matterJSEngine.pairs.list.length; i++) {
		
		var o = this.matterJSEngine.pairs.list[i];

		if(o.bodyA === body) {
			a.push(o.bodyB);
		}

		if(o.bodyB === body) {
			a.push(o.bodyA);
		}
	
	}

	return a;

}

/**
 * 
 * Get array of Dynamic Object colliding some specified colliding object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @returns {PhSim.DynObject[]}
 * 
 */

PhSim.prototype.getCollidingObjects = function(dynObject) {
	
	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		if(a[i].matter.bodyA.plugin.id === dynObject.id) {
			b.push(a[i].bodyB);
		}

		if(a[i].matter.bodyB.plugin.id === dynObject.id) {
			b.push(a[i].bodyA);		
		}

	}

	return b;

}

/**
 * Get senor classes
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {String[]}
 */

PhSim.Query.getSensorClasses = function(dynObject) {

	if(dynObject.sensorClass) {
		var a = dynObject.sensorClass;
		var b = a.split(" ");
		return b;
	}

	else {
		return [];
	}
}

/**
 * 
 * Check if two objects share at least one sensor class
 * 
 * @function
 * @param {PhSim.DynObject} dynObjectA 
 * @param {PhSim.DynObject} dynObjectB 
 * @returns {Boolean}
 */

PhSim.Query.sameSensorClasses = function(dynObjectA,dynObjectB) {
	return PhSim.Query.intersectionExists(PhSim.Query.getSensorClasses(dynObjectA),PhSim.Query.getSensorClasses(dynObjectB));
}

/**
 * Sees if `array1` and `array2` share at least one element.
 * 
 * @param {Array} array1 
 * @param {Array} array2
 * @returns {Boolean} 
 */

PhSim.Query.intersectionExists = function(array1,array2) {

	for(var i = 0; i < array1.length; i++) {
		var a = array2.indexOf(array1[i]);
		if(a !== -1) {
			return true;
		}
	}

	return false;
}

/**
 * 
 * Get objects colliding some object that share the same sensor classes.
 * 
 * @function
 * @param {PhSim} phSim - PhSim instance
 * @param {PhSim.DynObject} dynObject - Object to check for colliding sensor objects
 * @returns {PhSim.DynObject[]} 
 */

PhSim.Query.getCollidingSensorObjects = function(phSim,dynObject) {

	var a = phSim.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		var dynCol = a[i]
		var matterCol = dynCol.matter;

		if(matterCol.bodyA.parent.plugin.dynObject.id === dynObnpject.id && PhSim.Query.sameSensorClasses(dynObject,dynCol.bodyB)) {
			b.push(dynCol.bodyB);
		}

		if(matterCol.bodyB.parent.plugin.dynObject.id === dynObject.id && PhSim.Query.sameSensorClasses(dynObject,dynCol.bodyA)) {
			b.push(dynCol.bodyA);		
		}

	}

	return b;
}

/**
 * 
 * Get objects colliding some object that share the same sensor classes.
 * 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Object to check for colliding sensor objects
 * @returns {PhSim.DynObject[]} 
 */

PhSim.prototype.getCollidingSensorObjects = function(dynObject) {
	//return PhSim.Query.getCollidingSensorObjects(this,dynObject)

	var a = this.getCollisionList(dynObject);
	var b = []

	for(var i = 0; i < a.length; i++) {

		var dynCol = a[i]
		var matterCol = dynCol.matter;

		if(matterCol.bodyA.parent.plugin.dynObject.id === dynObject.id && PhSim.Query.sameSensorClasses(dynObject,dynCol.bodyB)) {
			b.push(dynCol.bodyB);
		}

		if(matterCol.bodyB.parent.plugin.dynObject.id === dynObject.id && PhSim.Query.sameSensorClasses(dynObject,dynCol.bodyA)) {
			b.push(dynCol.bodyA);		
		}

	}

	return b;
}

/**
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @returns {Boolean}
 */

PhSim.prototype.inSensorCollision = function(dynObject) {
	
	var a = this.getCollidingSensorObjects(dynObject); 
	
	if(a.length > 0) {
		return true;	
	}

	else {
		return false;
	}
}

/**
 * @function
 * @param {Number} cx - x-coordinate of upper left corner.
 * @param {Number} cy - y-coordinate of upper left corner.
 * @param {Number} cw - width of rectangle
 * @param {Number} ch - height of rectangle
 * @param {Number} px - x-coordinate of point to be checked.
 * @param {Number} py - y-coordinate of point to be checked.
 * @returns {Boolean}
 */

PhSim.Query.isPointInRawRectangle = function(cx,cy,cw,ch,px,py) {
	
	var cond = (cx < px) && (px < cx + cw) && (cy < py) && (py < cy + ch) 

	if(cond) {
		return true;
	}

	else {
		return false;
	}
}

/**
 * 
 * Get object that checks the collision relations between two objects
 * 
 * @function
 * @param {PhSim.DynObject} dynObjectA - The first object
 * @param {PhSim.DynObject} dynObjectB - The second object
 * @returns {PhSim.CollisionReport} - A collision report that updates itself after each update
 */

PhSim.prototype.getCollisionChecker = function(dynObjectA,dynObjectB) {

	var self = this;
	var report = new PhSim.CollisionReport();
	report.before = null;
	report.current = null;
	report.difference = null;
	report.objectA = dynObjectA;
	report.objectB = dynObjectB;

	this.on("beforeupdate",function() {
		report.before = self.collided(dynObjectA,dynObjectB);
	});

	this.on("afterupdate",function() {
		report.current = self.collided(dynObjectA,dynObjectB);
		report.difference = report.current - report.before;
		if(report.difference) {
			var eventObj = new PhSim.Events.PhSimDynEvent();
			eventObj.report = report;
			eventObj.difference = report.difference;
			self.callEventClass("collisionchange",self,eventObj);
		}

	})

	return report;
}


/***/ }),

/***/ 4045:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}


/**
 * Assign PhRender to PhSim simulation
 * @param {PhSim.PhRender} phRender 
 */

PhSim.prototype.assignPhRender = function(phRender) {

	/** PhRender object */

	this.phRender = phRender;

	/** Refence to simulation in PhRender */

	this.phRender.sim = this.sim;

	/** Refence to dynamic simulation in PhRender */

	this.phRender.dynSim = this;
	return phRender;
}

PhSim.prototype.setRadius = function(dynObject,radius) {

	var ratio = radius / dynObject.radius;

	if(dynObject.shape === "regPolygon" || dynObject.shape === "circle") {
		Matter.Body.scale(dynObject.object, ratio, ratio);
	}

}

/***/ }),

/***/ 8313:
/***/ ((module) => {

/**
 * Sprites namespace
 * @namespace
 * @memberof PhSim
 */

var Sprites = {
    Calc: {}
}

Sprites.Sprite = function() {
	this.src = null;
	this.w = null;
	this.h = null;
	this.x = null;
	this.y = null;
	this.fit = null;
	this.repeat = null;
	this.object = null;
}

Sprites.renderSprite = function(ctx,sprite) {
	var localElm = document.createElement("img");
	localElm.src = sprite.src;
	if(sprite.spec === true) {
		ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
	}

	if(sprite.auto === true) {
		ctx.drawImage(localElm,sprite.x,sprite.y,sprite.w,sprite.h);
	}
}

Sprites.renderGlobalSprites = function(ctx,simulation) {

	for(let i = 0; i < simulation.sprites.length; i++) {
		Sprites.renderSprite(ctx,simulation.sprites[i]);
	}

}


Sprites.circularSpriteRenderCanvas = function(ctx,canvas,angle) {

	var localElm = document.createElement("canvas");
	var localCtx = localElm.getContext("2d");

	var localImg = document.createElement("img");
	localImg.src = canvas.src;

	localCtx.rotate(angle);

	localCtx.drawImage()


}

/**
 * 
 * The `spriteImgObj` class is used to store catche for sprites.
 * 
 * @constructor
 * @param {String[]} sprites - An array of strings representing sources
 * @param {Function} onload - A function that is executed when all of the images are loaded.
 */

Sprites.spriteImgObj = function(sprites,onload = function() {}) {
	
	// Force load if sprites list is empty

	/**
	 * Array of catched sprites
	 */

	Object.defineProperty(this,"array",{
		enumerable: false,
		value: [],
		writable: true,
	})

	/**
	 * 
	 * Object of static sprite objects
	 * 
	 * @type {Object}
	 * @name PhSim.Sprites.spriteImgObj#static
	 */

	Object.defineProperty(this,"static",{
		enumerable: false,
		value: {},
		writable: true,
	});

	/**
	 * 
	 * Number of loaded sprites
	 * 
	 * @type {Number}
	 * @name PhSim.Sprites.spriteImgObj#loaded_n
	 */

	Object.defineProperty(this,"loaded_n",{
		enumerable: false,
		value: 0,
		writable: true
	});

	/**
	 * 
	 * Boolean telling us if it is loaded or not.
	 * 
	 * @type {Boolean}
	 * @name PhSim.Sprites.spriteImgObj#length
	 */

	Object.defineProperty(this,"loaded",{
		enumerable: false,
		value: false,
		writable: true,
	});

	/**
	 * 
	 * Function to call if loaded.
	 * 
	 * @type {Function}
	 * @name PhSim.Sprites.spriteImgObj#onload
	 */

	Object.defineProperty(this,"onload",{
		enumerable: false,
		value: onload,
		writable: true
	});

	/**
	 * 
	 * URL List
	 * 
	 * @type {Object}
	 * @name PhSim.Sprites.spriteImgObj#urls
	 */

	Object.defineProperty(this,"urls",{
		enumerable: false,
		value: [],
		writable: true
	});

	/**
	 * 
	 * Image List
	 * 
	 * @type {Array}
	 * @name PhSim.Sprites.spriteImgObj#urls
	 */

	Object.defineProperty(this,"img",{
		enumerable: false,
		value: [],
		writable: true
	});

	/**
	 * 
	 * Image List
	 * 
	 * @type {Array}
	 * @name PhSim.Sprites.spriteImgObj#urls
	 */

	Object.defineProperty(this,"loadedImg",{
		enumerable: false,
		value: [],
		writable: true
	});

	/**
	 * 
	 * Length
	 * 
	 * @type {Number}
	 * @name PhSim.Sprites.spriteImgObj#length
	 */

	Object.defineProperty(this,"length",{
		enumerable: false,
		value: 0,
		writable: true,
	})

	var self = this;

	for(var i = 0; i < sprites.length; i++) {
		self.addSprite(sprites[i],function(){
			if(self.loadedImg.length === self.img.length) {
				onload();
			}
		})
	}

	if(sprites.length === 0) {
		self.onload();
		self.loaded = true;
	}

}

/**
 * 
 * Add sprite to the Sprite Image Array.
 * 
 * @function
 * @this Sprites.spriteImgObj
 * 
 * @param {string|Object} src - Source of sprite. If ```src``` is a string representing 
 * a url, then the image added has its source as ```src```. If ```src``` is an object, 
 * then the source is ```src.src```. This means that any object with an ```src``` property
 * can be added.
 * 
 * @param {Function} [onload] - a function that is executed when the image loads.
 * 
 * @returns {Image}
 */

Sprites.spriteImgObj.prototype.addSprite = function(src,onload = function() {} ) {

	// Insuring that the sprite src stays a string.

	if(typeof src === "object" && typeof src.src === "string") {
		src = src.src;
	}

	var self = this;

	let img = document.createElement("img");

	let f = function() {

		self[src] = img;
		self.urls.push(src);
		self.loadedImg.push(this);
		self.length++;

		onload();

		img.removeEventListener("load",f);

	}

	img.addEventListener("load",f);

	this.img.push(img);

	img.src = src;

	return img;

}

module.exports = Sprites;

/***/ }),

/***/ 6254:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const diagRect = __webpack_require__(4035);
const Static = __webpack_require__(2094);
const Vertices = __webpack_require__(9153);

/**
 * Get bounding box from an array of vectors.
 * 
 * @constructor
 * @memberof PhSim
 * @extends PhSim.Options.Rectangle
 * @param {Vector[]} verts 
 */

const BoundingBox = function(verts) {

	verts = Object.assign([],verts);

	verts.sort(function(a,b){
		return a.x - b.x;
	});

	/**
	 * The x coordinate of the left most vertex of `verts`.
	 * @type {Number}
	 */

	this.smallX = verts[0].x;

	/**
	 * The x coordinate of the right most vertex of `verts`.
	 * @type {Number}
	 */

	this.largeX = verts[verts.length - 1].x;

	verts.sort(function(a,b){
		return a.y - b.y;
	});

	this.smallY = verts[0].y;
	this.largeY = verts[verts.length - 1].y;

	var w = this.largeX - this.smallX;
	var h = this.largeY - this.smallY;
	var x = this.smallX;
	var y = this.smallY;

	Static.Rectangle.call(this,w,h,x,y);

}

/**
 * Get bounding box of PhSim shape.
 * @param {PhSimObject} object - The Static Object
 * @returns {PhSim.BoundingBox} 
 */

BoundingBox.fromShape = function(object) {
	
	if(object.shape === "polygon") {
		return new BoundingBox(object.verts);
	}

	if(object.shape === "regPolygon") {
		return new BoundingBox(Vertices.regPolygon(object));
	}

	if(object.shape === "rectangle") {
		return new BoundingBox(Vertices.rectangle(object,true));
	}

	if(object.shape === "circle") {

		var ax = object.x - object.radius;
		var ay = object.y - object.radius;
		var bx = object.x + object.radius;
		var by = object.y + object.radius;

		return diagRect(ax,ay,bx,by,0);
	}

	if(object.composite) {
		
		var a = [];

		for(var i = 0; i < object.objUniverse.length; i++) {
			a.push( Vertices.rectangle( this.getStaticBoundingBox(object.objUniverse[i]) ) );
		}

		a = a.flat(Infinity);

		return new BoundingBox(a);

	}
}

module.exports = BoundingBox;

/***/ }),

/***/ 209:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Vector = __webpack_require__(2450);

/**
 * Namespace for functions that get the centroid (the center) of a {@link PhSimObject}.
 * @memberof PhSim
 * @namespace
 */

const Centroid = {}

/**
 * Get centroid of any shape.
 * If it is a circle or a regPolygon, then `o` is returned because the properties `x` and
 * `y` already define the centroid of the object.
 * 
 * @param {PhSimObject} o 
 * @returns {Vector}
 */

Centroid.shape = function(o) {
	
	if(o.shape === "rectangle") {
		return Centroid.rectangle(o);
	}

	if(o.shape === "polygon") {
		return Centroid.polygon(o)
	}

	if(o.shape === "circle" || o.shape === "regPolygon") {
		return o;
	}

}

/**
 * 
 * Get centroid of a rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle
 * @returns {Vector}
 *  
 */

Centroid.rectangle = function(rectangle) {
	return {
		"x": rectangle.x + 0.5 * rectangle.w,
		"y": rectangle.y + 0.5 * rectangle.h
	}
}


/** 
 * Find Centroid of a polygon
 * @function
 * @param {Polygon} a - Path
 * @returns {Vector}
 */

Centroid.polygon = function(a) {
		
	var v = new Vector(0,0);
	
	for(var j = 0; j < a.verts.length; j++) { 
		v.x += a.verts[j].x;
		v.y += a.verts[j].y;
	}
	
	v.x = (1/a.verts.length) * v.x;
	v.y = (1/a.verts.length) * v.y;
	
	return v;

}

module.exports = Centroid;

/***/ }),

/***/ 4035:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Static = __webpack_require__(2094);

/**
 * 
 * Get Rectangle by diagonal with points (x1,y1) and (x2,y2);
 * 
 * @function
 * @memberof PhSim
 * 
 * @param {Number} x1
 * @param {Number} y1
 * @param {Number} x2
 * @param {Number} y2 
 * @returns {PhSim.Static.Rectangle} - Rectangle Object
 * 
 */

var diagRect = function(x1,y1,x2,y2) {

	var w = x2 - x1;
	var h = y2 - y1;

    return new Static.Rectangle(x1,y1,w,h);
    
 }

module.exports = diagRect;


/***/ }),

/***/ 2450:
/***/ ((module) => {

/** 
 * Constructor for the minimal requirements for being a {@link Vector}.
 *  
 * @memberof PhSim
 * @constructor
 * @param {Number} x 
 * @param {Number} y
 * 
 */

var Vector = function(x,y) {
	
	/**
	 * x-coordinate of the vector
	 * @type {Number}
	 */
	
	this.x;

	/**
	 * y-coordinate of the vector
	 * @type {Number}
	 */
	
	this.y;

	if(typeof x === "number") {
		this.x = x;
	}

	else {
		console.trace();
		throw "Expecting a number in argument 1";
	}

	if(typeof y === "number") {
		this.y = y;
	}

	else {
		console.trace()
		throw "Expecting a number in argument 2"
	}

}

/**
 * 
 * Perform vector addition
 * 
 * @function
 * @param {Vector} vector1 - The first vector
 * @param {Vector} vector2 - The second vector
 * 
 * @param {Boolean} [newObj = true] - Boolean that determines the return value. 
 * If true, then it returns a new Vector object `vector` such that 
 * `vector.x === vector1.x + vector2.x` and `vector.x === vector1.y + vector2.y`
 * 
 * If false, then `vector2.x` is added to `vector1.x`, `vector2.y` is added to `vector1.y`
 * and then `vector1` is returned.
 * 
 * @returns {Vector} - The sum of the two vectors. New object if `newObj` is true. Returns
 * `vector1` otherwise. 
 */

Vector.add = function(vector1,vector2,newObj = true) {
	
	if(newObj) {
		return new Vector(vector1.x + vector2.x, vector1.y + vector2.y);
	}

	else {
		vector1.x = vector1.x + vector2.x;
		vector1.y = vector1.y + vector2.y;
		return vector1;
	}

}

/**
 * 
 * Perform vector subtraction
 * 
 * @function
 * @param {Vector} vector1 
 * @param {Vector} vector2 
 * 
 * * @param {Boolean} [newObj = true] - Boolean that determines the return value. 
 * If true, then it returns a new Vector object `vector` such that 
 * `vector.x === vector1.x - vector2.x` and `vector.x === vector1.y - vector2.y`
 * 
 * If false, then `vector2.x` is subtracted from `vector1.x`, `vector2.y` is subtracted 
 * from `vector1.y` and then `vector1` is returned.
 * 
 * @returns {Vector} - The difference between the two vectors. New object if `newObj` is true. Returns
 * `vector1` otherwise. 
 */

Vector.subtract = function(vector1,vector2,newObj = true) {

	if(newObj) {
		return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);	}

	else {
		vector1.x = vector1.x - vector2.x;
		vector1.y = vector1.y - vector2.y;
		return vector1;
	}

}

/**
 * 
 * Multiply a vector by a scalar
 * 
 * @function
 * @param {Vector} vector 
 * @param {Number} scalar
 * @returns {Vector} 
 * 
 */

Vector.scale = function(vector,scalar) {
	return new Vector(vector.x * scalar,vector.y * scalar)
}

/**
 * Returns a new Vector object `vector` such that `vector.x === o.x` and 
 * `vector.y === o.y`.
 * 
 * @function
 * @param {Object} o
 * @param {Number} o.x
 * @param {Number} o.y 
 * @returns {Vector} 
 */

Vector.extract = function(o) {
	return new Vector(o.x,o.y);
}

/**
 * Returns a vector equal in magnitude of `vector` but opposite in direction of `vector`.
 * @param {Vector} vector 
 * @returns {PhSim.Vector} -  The reversed vector.
 */

Vector.neg = function(vector) {
	return new Vector(-vector.x,-vector.y);
}

/**
 * 
 * Divide a vector by a scalar
 * 
 * @function
 * @param {Vector} vector 
 * @param {Number} scalar
 * @returns {Vector} 
 *  
 */

Vector.divide = function(vector,scalar) {
	return new Vector(vector.x * (1/scalar),vector.y * (1/scalar));
}

/**
 * 
 * Get distance between two vectors.
 * 
 * @function
 * @param {Vector} vector1 
 * @param {Vector} vector2
 * @returns - The vector distance
 *  
 */

Vector.distance = function(vector1,vector2) {
	
	var l1 = Math.pow(vector1.x - vector2.x,2);
	var l2 = Math.pow(vector1.y - vector2.y,2);

	return Math.sqrt(l1+l2);

}

/**
 * 
 * Get length of the vector
 * 
 * @function
 * @param {Vector} vector 
 * @returns {Number} - The length of the vector
 */

Vector.getLength = function(vector) {
	return Math.sqrt(Math.pow(vector.x,2)+Math.pow(vector.y,2))
}

/**
 * 
 * Get normalized vector of some vector.
 * 
 * @function
 * @param {Vector} vector - Vector to normalize.
 * @returns {Vector} -  The Unit Vector
 */

Vector.unitVector = function(vector) {
	return Vector.scale(vector,1/Vector.getLength(vector));
}

/**
 * Apply a linear transformation defined by a 2x2 matrix to a vector.
 * 
 * @function
 * @param {Number} a11 - Element found in row 1, column 1
 * @param {Number} a12 - Element found in row 1, column 2
 * @param {Number} a21 - Element found in row 2, column 1
 * @param {Number} a22 - Element found in row 2, column 2
 * @param {Number} x - x-coordinate of vector to be transformed
 * @param {Number} y - y-coordinate of vector to be transformed
 * @returns - The transformed vector 
 */

Vector.applyTransformation = function(a11,a12,a21,a22,x,y) {
	return new Vector(a11 * x + a12 * y,a21 * x + a22 * y);
}

/**
 * 
 * Rotate a vector (x,y) by angle a
 * 
 * @function
 * @param {Number} x - x-coordinate
 * @param {Number} y - y-coordinate
 * @param {Number} a - Angle in radians
 * @returns {Vector}
 */

Vector.rotate = function(x,y,a) {
	return Vector.applyTransformation(Math.cos(a),Math.sin(a),-Math.cos(a),Math.sin(a),x,y);
}

/**
 * Get SVG point
 * @param {Number} x 
 * @param {Number} y
 * @returns {String} - SVG Vector String 
 */

Vector.svgVector = function(x,y) {
	return x + "," + y;
}

/**
 * Calculate dot product of `vector1` and `vector2`.
 * 
 * @function
 * @since 0.2.0-alpha
 * @param {Vector} vector1
 * @param {Vector} vector2
 * @returns {Number} - The dot product 
 */

Vector.dotProduct = function(vector1,vector2) {
	return vector1.x * vector2.x + vector1.y * vector2.y;
}

/**
 * 
 * Gets angle between two lines that both end at `vertex`.
 * 
 * That is, suppose that `A` is the point `ray1`, `B` is the point `ray2` and that
 * `C` is the point `vertex`. Then, `vectorToArray` returns the angle between the lines
 * `AC` and `BC`.
 * 
 * @function
 * @since 0.2.0-alpha
 * @param {Vector} vertex 
 * @param {Vector} ray1 
 * @param {Vector} ray2
 * @returns {Number} - The angle 
 */

Vector.vectorToArray = function(vertex,ray1,ray2) {

	ray1.x = ray1.x - vertex.x;
	ray1.y = ray1.y - vertex.y;

	ray2.x = ray2.x - vertex.x;
	ray2.y = ray2.y - vertex.y;

	return Math.acos(Vector.dotProduct(ray1,ray2));

}

module.exports = Vector;

/***/ }),

/***/ 9153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Static = __webpack_require__(2094);
const Centroid = __webpack_require__(209);
const Vector = __webpack_require__(2450);

const Vertices = {}

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * 
 * Get vertices for a static object representing a regular polygon.
 * 
 * @function
 * @param {PhSim.Static.RegPolygon} regularPolygon - The Static Regular Polygon Object
 * @returns {PhSim.Vector[]}
 * 
 */

Vertices.regPolygon = function(regularPolygon) {

	var a = []
	
	var firstAngle = (2*Math.PI)/regularPolygon.sides;

	for(var i = 0; i < regularPolygon.sides; i++) {
		var x = regularPolygon.x + Math.cos(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		var y = regularPolygon.y + Math.sin(firstAngle * i + regularPolygon.cycle) * regularPolygon.radius;
		a.push(new Vector(x,y));
	}

	return a;

}


/**
 * 
 * Get vertices for a rectangle
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle
 * @returns {Object[]} 
 */

Vertices.rectangle = function(rectangle) {

	var a = [

			{
				"x": rectangle.x,
				"y": rectangle.y,
				"topLeft": true
			},
	
			{
				"x": rectangle.x + rectangle.w,
				"y": rectangle.y,
				"topRight": true
			},

			{
				"x": rectangle.x + rectangle.w,
				"y": rectangle.y + rectangle.h,
				"bottomRight": true
			},
	
			{
				"x": rectangle.x,
				"y": rectangle.y + rectangle.h,
				"bottomLeft": true
			}
	
	];

	if(rectangle.cycle) {
		Matter.Vertices.rotate(a, rectangle.cycle, Centroid.rectangle(rectangle));
	}

	return a;

}

/**
 * 
 * Get rectangle corners
 * 
 * @function
 * @param {PhSim.Static.Rectangle} rectangle 
 * @returns {Object}
 */


Vertices.getRectangleCorners = function(rectangle) {


	var a = Vertices.rectangle(rectangle)

	
	var z = {

		"topLeft": a[0],

		"topRight": a[1],

		"bottomLeft": a[3],

		"bottomRight": a[2]

	}

	return z;

}

/**
 * Get vertices for regular polygon inscribed in circle.
 * @param {Circle} circle 
 * @param {Number} sides 
 */

Vertices.inscribedRegPolygonCircle = function(circle,sides) {
	return new Static.RegPolygon(circle.x,circle.y,circle.radius,sides);
}

/**
 * Returns the vertices for a regular polygon inscribed in the circle. It has 25 sides.
 * This is meant to create a regular polygon that is used to create Matter.js circles.
 * 
 * @param {Circle} circle 
 * 
 */

Vertices.inscribedMatterCirclePolygon = function(circle) {
	return Vertices.inscribedRegPolygonCircle(circle,25);
}

/**
 * Get verticles of PhSim objects
 * @param {*} o 
 */

Vertices.object = function(o) {

	if(o.shape === "rectangle") {
		return Vertices.rectangle(o);
	}

	if(o.shape === "regPolygon") {
		return Vertices.regPolygon(o);
	}

	if(o.shape === "polygon") {
		return o.verts;
	}

	if(o.shape === "circle") {
		return Vertices.inscribedMatterCirclePolygon(o);
	}

}

module.exports = Vertices;

/***/ }),

/***/ 5203:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const DynObject = __webpack_require__(390);
const PhSimEventTarget = __webpack_require__(4956);

/**
 * Dynamic Widget Object
 * @param {Object} options 
 */

const Widget = function(target,options) {

	/**
	 * Status of widget
	 * @type {"enabled"|"disabled"|"destroyed"}
	 */

	this.status;

	/**
	 * Thing to be affected by the widget.
	 * @type {PhSim|PhSim.DynObject}
	 */

	
	this.target = target;

	if(typeof options !== "undefined") {
		Object.assign(this,options);
	}

	Object.assign(this,PhSimEventTarget);

	this.enable();

}

Widget.prototype.eventStack = {
	enable: [],
	disable: [],
	destroy: []
}

Widget.prototype.enable = function() {

	if(typeof this.wFunction === "function") {
		this.wFunction.wFunction_enabled = true;

		if(this.wFunction._bodyFunction.motionFunctionEnabled === false) {
			this.wFunction._bodyFunction.motionFunctionEnabled = false;
		}

	}

	this.callEventClass("enable",this,this);

	this.status = "enabled";

}

/**
 * Function for disabling widget
 * @type {Function}
 */

Widget.prototype.disable = function() {

	if(typeof this.wFunction === "function") {

		this.wFunction.wFunction_enabled = false;

		if(this.wFunction._bodyFunction.motionFunctionEnabled === true) {
			this.wFunction._bodyFunction.motionFunctionEnabled = false;
		}

	}

	this.callEventClass("disable",this,this);

	this.status = "disabled";

}

/**
 * Function for destroying widget
 * @type 
 */


Widget.prototype.destroy = function() {

	if(typeof this.wFunction === "function") {

		if(this.wFunction._thisRef instanceof DynObject) {
			wFunction._thisRef.phsim.destroyWFunction(w.wFunction);
		}

		if(this.wFunction._thisRef instanceof PhSim) {
			wFunction._thisRef.destroyWFunction(w.wFunction);	
		}

	}

	delete this.wFunction;

	this.callEventClass("destroy",this,this);

	this.status = "destroyed";

}


/**
 * 
 * @param {PhSimObject} o 
 */

Widget.defineByBoolean = function(o) {

	Object.keys(Widgets).forEach(function(p){
		if(o[p]) {
			o.type = p;
		}
	})

	
}

Widget.WidgetOptions = function(type) {
	this.type = type;
}

module.exports = Widget;

/***/ }),

/***/ 4836:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/*

Constraint types

*/

PhSim.Constraints = {
    Static: {}
}

PhSim.Constraints.Static.Constraint = function() {
	this.objectA = null;
	this.objectB = null;
	this.pointA = null;
	this.pointB = null;
	this.type = "constraint";
}

PhSim.prototype.widgets = {};


/**
 * @typedef {WFunctionOptions|Object} WidgetOptions
 * @property {String} type - Name of widget. 
 */

/**
 * Widget Namespace.
 * @namespace
 * @memberof PhSim
 * @mixes PhSim.Game.Widgets
 */

PhSim.Widgets = {};

__webpack_require__(4757);
__webpack_require__(5496);
__webpack_require__(3648);


const Game = __webpack_require__(1417);

Object.assign(PhSim.Widgets,Game.Widgets);

__webpack_require__(5449);
__webpack_require__(1799);
__webpack_require__(1332);
__webpack_require__(4105);
__webpack_require__(1734);
__webpack_require__(6038);
__webpack_require__(9009);
__webpack_require__(2905);
__webpack_require__(3582);
__webpack_require__(4591);
__webpack_require__(4075);

PhSim.Widgets.constraint = __webpack_require__(3302);

PhSim.Widgets.setImgSrc = __webpack_require__(7326);

PhSim.Widgets.transformAgainstCamera = __webpack_require__(6249);

/**
 * PlayAudio Widget
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget
 * @this PhSim
 */

PhSim.Widgets.playAudio = function(dyn_object,widget) {

    var self = this;

    var i = this.audioPlayers;
    
    this.staticAudio.push(widget);

    var f = function() {
        self.playAudioByIndex(i);
    }

    this.createWFunction(dyn_object,f,widget);

    this.audioPlayers++;
}

/**
 * Make object not rotate
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {*} widget 
 */
    
PhSim.Widgets.noRotation = function(dyn_object) {
    Matter.Body.setInertia(dyn_object.matter, Infinity)
}

/**
 * Get Widget object by name
 * @param {string} name 
 */

PhSim.prototype.getWidgetByName = function(name) {
	for(var i = 0; i < this.objUniverse.length; i++) {
		for(var j = 0; i < this.objUniverse[i].widgets.length; i++) {
			if(this.objUniverse[i].widgets[j].name === name) {
				return this.objUniverse[i].widgets[j];
			}
		}
	}
}

/***/ }),

/***/ 4757:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

const PhSim = __webpack_require__(8138);
const Motion = __webpack_require__(341);

/**
 * Create circular constraint
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Number} [x] - x position of vector.
 * @param {Number} [y] - y position of vector.
 */

PhSim.prototype.createCircularConstraint = function(dynObject,x,y) {

	x = x || dynObject.matter.position.x;
	y = y || dynObject.matter.position.y;
	
	var c = Matter.Constraint.create({
		
		"bodyA": dynObject.matter,
		
		"pointB": {
			"x": x,
			"y": y
		}

	});

	Matter.World.add(this.matterJSWorld,c)

	var relAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x);

	this.on("afterupdate",function(){
		var newAngle = Math.atan2(y - dynObject.matter.position.y,x - dynObject.matter.position.x) - relAngle;
		Motion.setAngle(dynObject,newAngle);
	});


	dynObject.circularConstraintVector = {
		"x": x,
		"y": y
	}

}

/**
 * 
 * The `circularConstraint` widget creates circular constraints.
 * 
 * A circular constraint is a special kind of constraint that is made up of an 
 * object `dyn_object` and a point `(x,y)` in space.
 * 
 * The object rotates around the centroid of `dyn_object` as it rotates around the
 * point `(x,y)`.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Circular Constraint options
 * @param {Number} widget.x - x-coordinate of the other end of the constraint
 * @param {Number} widget.y - y-coordinate of the other end of the constraint 
 */

PhSim.Widgets.circularConstraint = function(dyn_object,widget) {
	this.createCircularConstraint(dyn_object,widget.x,widget.y);
}

/***/ }),

/***/ 5496:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const Motion = __webpack_require__(341);
const Widget = __webpack_require__(5203);

/**
 * 
 * Clone object
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} options - The options used for creating a spawned object
 * @param {Vector} options.velocity -  The velocity to add to an object when it got spawned.
 * @param 
 */

PhSim.prototype.cloneObject = function(dynObject,options = {}) {

    var newObjStatic = Object.assign({},dynObject.static);

    Motion.setPosition(newObjStatic,dynObject.matter.position);
    
    var obj = new PhSim.DynObject(newObjStatic);
    
    /**
     * Property telling if object is cloned.
     * 
     * @type {Boolean|undefined}
     * @memberof PhSim.DynObject
     */

    obj.cloned = true;
    
    /**
     * 
     */


    obj.cloneParent = dynObject;
    
    PhSim.Motion.setVelocity(obj,options.velocity);

	this.addToOverlayer(obj);
	
	var eventObj = new PhSim.Events.PhSimEvent("clone");
	eventObj.target = dynObject;
	eventObj.clonedObj = obj;

	this.callEventClass("clone",this,eventObj);
}

/**
 * 
 * The `clone` widget is a widget that makes copies of an object and inserts them into
 * the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Options.
 * @this PhSim
 */

PhSim.Widgets.clone = function(dyn_object,widget) {
 
    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.cloneObject(dyn_object,{
            velocity: widget.vector
        });
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;

}

/***/ }),

/***/ 4075:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const Motion = __webpack_require__(341);
const Vector = __webpack_require__(2450);

/**
 * Connect two Dynamic Objects
 * @param {PhSim.DynObject} parent 
 * @param {PhSim.DynObject} child 
 */

PhSim.prototype.connectDynObjects = function(parent,child) {

	parent.connectedDynObjects.push(child);

	Matter.Body.setStatic(child.matter,true);

	var vect = Vector.subtract(child,parent);

	var f = function() {
		Motion.setPosition(child,Vector.add(parent.matter.position,vect));
	}

	this.on("afterupdate",f);

	parent.connectedDynObjects.push(child);

	return f;

}

/***/ }),

/***/ 3302:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Vector = __webpack_require__(2450);
const DynObject = __webpack_require__(390);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * 
 * 
 * Constraint Widget
 * 
 * @function
 * @memberof PhSim.Widgets
 * @param {PhSim} phsim 
 * @param {Object} widget - Widget Options
 * @param {LOAddress|PhSim.DynObject} [widget.objectA] - Object A - First point.
 * @param {LOAddress|PhSim.DynObject} [widget.objectB] - Object B - Second Point
 * @param {Vector} [widget.pointA] - First point (see `widget.position` for more information)
 * @param {Vector} [widget.pointB] - Second point (see `widget.position` for more information)
 * @param {"relative"|"absolute"} [widget.position = "absolute"] - Positions of points. 
 * 
 * If set to `"relative"`, then the rules for positioning a point is the following:
 * 
 * * If `widget.objectA` is set, then `widget.pointA` defines the offset from the 
 * centroid of `widget.objectA`. Otherwise, the point is set to a point in the phsim space.
 * 
 * * If `widget.objectB` is set, then `widget.pointB` defines the offset from the centroid
 * of `widget.objectB`. Otherwise, the point is set to a point in the phsim space.
 * 
 * Note: If one is familar with Matter.js, then the rules are simular to rules of making a 
 * constraint are simular to those in Matter.js.
 * 
 * If set to `"absolute"`, then the rules for positioning a point is that the points 
 * are set to points in space. This is the default value.
 */

function constraint(phsim,widget) {

    var position = "absolute";

    if(widget.position === "relative") {
        position = "relative"
    } 
    
    else if(widget.position === "absolute") {
        position = "absolute";
    }
    
    var b = {}

    if(position === "absolute") {

        if(widget.objectA) {

            if(widget.objectA instanceof DynObject) {
                b.bodyA = widget.objectA.matter;
            }
    
            else {
    
                if(typeof widget.objectA.L === "number" && typeof widget.objectA.O === "number") {
                    b.bodyA = phsim.LO(widget.objectA.L,widget.objectA.O).matter;
                }
    
                else {
                    b.bodyA = phsim.optionMap.get(widget.objectA).matter;
                }
    
            }
    
        }
    
        if(widget.objectB) {
            b.bodyB = phsim.LO(widget.objectB.L,widget.objectB.O).matter;
    
            if(widget.objectB instanceof DynObject) {
                b.bodyB = widget.objectB.matter;
            }
    
            else {
    
                if(typeof widget.objectB.L === "number" && typeof widget.objectB.O === "number") {
                    b.bodyB = phsim.LO(widget.objectB.L,widget.objectB.O).matter;
                }
    
                else {
                    b.bodyB = phsim.optionMap.get(widget.objectB).matter;
                }
    
            }
    
        }
    
        if(widget.pointA) {
    
            if(widget.objectA) {
                b.pointA = Vector.subtract(widget.pointA,b.bodyA.position);
            }
    
            else {
                b.pointA = widget.pointA;
            }
    
        }
    
        if(widget.pointB) {
            
            if(widget.objectB) {
                b.pointB = Vector.subtract(widget.pointB,b.bodyB.position);
            }
    
            else {
                b.pointB = widget.pointB;
            }
        }

    }

    if(position === "relative") {
        b.pointA = widget.pointA;
        b.pointB = widget.pointB;
        b.bodyA = widget.objectA.plugin.dynObject;
        b.bodyB = widget.objectB.plugin.dynObject;
    }

    var c = Matter.Constraint.create(b);

    Matter.World.add(phsim.matterJSWorld,c);

}

module.exports = constraint;

/***/ }),

/***/ 3582:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const Widget = __webpack_require__(5203);

/**
 * 
 * The deleteSelf widget makes an object delete itself from the simulation.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The Dynamic Object to be configured.
 * @param {WFunctionOptions} widget - Configuration options
 */

PhSim.Widgets.deleteSelf = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var self = this;
    
    var f = function(){
        self.removeDynObj(dyn_object);
        self.disableWFunction(w.wFunction);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;

}

/***/ }),

/***/ 3648:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const Motion = __webpack_require__(341);
const PhSim = __webpack_require__(8138);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * The `draggable` widget makes {@link PhSim.DynObject} objects draggable.
 * 
 * @param {PhSim.DynObject} dyn_object 
 * @this PhSim
 * @param {*} widget 
 */

PhSim.Widgets.draggable = function(dyn_object) {

    var self = this;
    
    var func = function() {

        // Displacement vector between mouse and centroid of object when the mouse is pushed downwards.

        var delta = {}

        // Mouse Position

        var mV = {
            x: null,
            y: null
        }

        var __onmousemove = function(e) {
            mV.x = e.x - delta.x;
            mV.y = e.y - delta.y;
        }

        var __onmouseup = function() {
            self.off("mousemove",__onmousemove);
            self.off("mouseup",__onmouseup);
            self.off("beforeupdate",__onbeforeupdate);
        }

        var __onbeforeupdate = function() {
            Matter.Body.setVelocity(dyn_object.matter,{x:0,y:0});
            Motion.setPosition(dyn_object,mV);
        }

        var __onmousedown = function(e) {
            if(self.pointInObject(dyn_object,e.x,e.y)) {

                delta.x = e.x - dyn_object.matter.position.x;
                delta.y = e.y - dyn_object.matter.position.y;

                self.on("mousemove",__onmousemove);
                self.on("mouseup",__onmouseup);
                self.on("beforeupdate",__onbeforeupdate);

                __onmousemove(e);
            }
        }
        
        self.on("mouseout",__onmouseup);

        return __onmousedown;

    }

    this.on("mousedown",func());
}

/***/ }),

/***/ 8175:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

// Set Angle to mouse.

const DynObject = __webpack_require__(390);
const PhSim = __webpack_require__(8138);

/**
 * 
 * Run function on all objects.
 * 
 * @function
 * @param {Function} call 
 */

PhSim.prototype.forAllObjects = function(call) {
	
	var a = this.objUniverse;

	for(var i = 0; i < a.length; i++) {
		var z = call(a[i]);
		if(z === false) {
			break;
		}
	}
}


/**
 * Check if the object is a dynamic object.
 * 
 * @function
 * @param {PhSimObject} o 
 */

PhSim.prototype.isNonDyn = function(o) {
	return o.noDyn;
}

/**
 * Set Object Lifespan
 * 
 * @function
 * @param {*} dynObject - Dynamic Object
 * @param {Number} lifespan - Milliseconds 
 * 
 */

PhSim.prototype.setDynObjectLifespan = function(dynObject,lifespan) {

	var self = this;

	setTimeout(lifespan,function(){
		self.removeDynObj(dynObject);
	});

}

PhSim.prototype.renderAllCounters = function() {
	for(var i = 0; i < this.counterArray.length; i++) {
		this.renderCounterByIndex(i);
	}
}

/***/ }),

/***/ 1734:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const Motion = __webpack_require__(341);
const Vector = __webpack_require__(2450);
const PhSim = __webpack_require__(8138);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}
/**
 * 
 * The `elevator` widget makes objects go back and forth within some range.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {Object} widget - Options
 * @param {Vector} widget.pointA - First point of the elevator
 * @param {Vector} widget.pointB - Second point of the elevator
 * @param {"x"|"y"} widget.bounding - Rules for deteriming the range of the elevator. 
 * 
 * If `widget.bounding` is equal to `"x"`, then the elevator switches direction if the
 * `x` value of the position of `dyn_object` is equal to `widget.pointA.x` or `widget.pointB.x`.
 * 
 * If `widget.bounding` is equal to `"y"`, then the elevator switches direction if the
 * `y` value of the position of `dyn_object` is equal to `widget.pointA.y` or `widget.pointB.y`.
 * 
 */

PhSim.Widgets.elevator = function(dyn_object,widget) {
            
    var func = function() {
    
        var bounding = widget.bounding;

        var obj = dyn_object;
        var relVec = Vector.subtract(widget.pointB,widget.pointA);
        
        var u = Vector.unitVector(relVec);
        
        var ax;
        var ay;
        var bx;
        var by;
        
        // Corrections
        
        var reversable = true;
        
        // Condition function for checking if object is in bounds
        
        var cond_f = function() {}
        
        if(bounding === "x") {

            if(widget.pointA.x < widget.pointB.x) {
                ax = widget.pointA.x;
                bx = widget.pointB.x;
            }
            
            if(widget.pointB.x < widget.pointA.x) {
               ax = widget.pointB.x;
               bx = widget.pointA.x;
            }
        
            cond_f = function() {
                return (ax <= obj.matter.position.x) && (obj.matter.position.x <= bx);
            }
        
        }
        
        if(bounding === "y") {

            if(widget.pointA.y < widget.pointB.y) {
                ay = widget.pointA.y;
                by = widget.pointB.y;
            }
            
            if(widget.pointB.y < widget.pointA.y) {
               ay = widget.pointB.y;
               by = widget.pointA.y;
            }
        
            cond_f = function() {
                return (ay <= obj.matter.position.y) && (obj.matter.position.y <= by);
            }
        
        }
        
        // Set body static
        
        Matter.Body.setStatic(dyn_object.matter,true);
        
        // Event function

        var inRange = function() {

        if( cond_f() ) {
        Motion.translate(obj,Vector.scale(u,1));
                reversable = true;
        }
          
            else {
            
                if(reversable) {

                    u = {
                        "x": -u.x,
                        "y": -u.y
                    }

                    reversable = false;
                }

                else {
                    Motion.translate(obj,Vector.scale(u,1));
                }
            
            }
            

        }

        return inRange


    }

    this.on("afterupdate",func());

}

/***/ }),

/***/ 2841:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/** 
 * 
 * Extract Widgets from Dynamic Object.
 * To extract a widget in PhSim is to read all of the objects in the "widgets" array found in each
 * well-formed PhSim object and then translate it into JavaScript.
 * 
 * @function
 * @param {WidgetOptions} widget - The Widget
 * @param {PhSim.DynObject} dyn_object The individual Dynamic Object
 * @returns undefined
 * 
*/

PhSim.prototype.extractWidget = function(dyn_object,widget) {

    if(PhSim.Widgets[widget.type]) {
        PhSim.Widgets[widget.type].call(this,dyn_object,widget);
    }

    if(widget.name) {
        this.widgets[widget.name] = widget;
    }

    var self = this;
    
        if(widget.changeSl) {
    
            var closure = function() {
    
                var i = widget.slIndex;
    
                var f = function() {
                    self.gotoSimulationIndex(i)
                }
    
                return f;
            }
    
            this.createWFunction(widget.trigger,closure(),{
                ...widget,
                wFunctionObj: dyn_object
            });
        }

        if(widget.transformWithCamera) {
            this.camera.transformingObjects.push(dyn_object)
        }

    }

    /**
     * Extract all widgets from a dynamic object.
     * @param {PhSim.DynObject} dyn_object 
     */
    
    
    PhSim.prototype.extractWidgets = function(dyn_object) {
        for(var i = 0; i < dyn_object.widgets.length; i++) {
            this.extractWidget(dyn_object,dyn_object.widgets[i]);
        }
    }



/***/ }),

/***/ 6038:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const Motion = __webpack_require__(341);

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

/**
 * 
 * The `keyboardControls` widget is a widget that makes an object go at a certain velocity
 * if the arrow keys are pressed.
 * 
 * @function
 * @param {PhSim.DynObject} dynObj 
 * @param {Object} keyboardControls - Keyboard Controls options
 * 
 * @param {Number} keyboardControls.right - Velocity in the right direction if the right key is pressed.
 * @param {NUmber} keyboardControls.up - Velocity in the up direction if the up key is pressed.
 * @param {Number} keyboardControls.left - Velocity in the left direction if the left key is pressed.
 * @param {Number} keyboardControls.down - Velocity in the down direction if the down key is pressed.
 */

PhSim.prototype.addKeyboardControls = function(dynObj,keyboardControls) {

	var f = function(event) {
		if(event.code == "ArrowRight") {
			Motion.setVelocity(dynObj, {x: keyboardControls.right, y: 0});
		}
		
		if(event.code == "ArrowUp") {
			Motion.setVelocity(dynObj, {x: 0, y: -keyboardControls.up});
		}
		
		if(event.code == "ArrowLeft") {
			Motion.setVelocity(dynObj, {x: -keyboardControls.left, y: 0});
		}
		
		if(event.code == "ArrowDown") {
			Motion.setVelocity(dynObj, {x: 0, y: keyboardControls.down});
		}
		
	}

	this.on("keydown",f,{
		"slEvent": true
	}); 
4
}

PhSim.Widgets.keyboardControls = function(dyn_object,widget) {
    this.addKeyboardControls(dyn_object,widget);
}

/***/ }),

/***/ 5449:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// Try to import matter-js as a commonJS module

var Matter;

if(typeof window === "object") {
	Matter = window.Matter;
}

else {
	Matter = __webpack_require__(8054);
}

const PhSim = __webpack_require__(8138);
const Widget = __webpack_require__(5203);

/**
 * Set lock of the Dynamic Object
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {Boolean} value - If  `true`, lock. Otherwise, unlock.
 */


PhSim.prototype.setLock = function(dynObject,value) {
    dynObject.locked = value;
	Matter.Body.setStatic(dynObject.matter,value);
}

/**
 * Toggle Lock Status of Dynamic Object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleLock = function(dynObject) {
    this.setLock(dynObject,!dynObject.locked);
}

/**
 * Toggle Semi-Lock Status of Dynamic Object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */

PhSim.prototype.toggleSemiLock = function(dynObject) {
	dynObject.locked = !dynObject.locked;
	Matter.Body.setStatic(dynObject.matter,dynObject.locked);
}

/**
 * The `toggleLock` widget toggles the lock status of the Dynamic Object.
 * If locked, the object is unlocked.
 * If unlocked, the object is locked.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Configuration
 */

PhSim.Widgets.toggleLock = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.toggleLock(dyn_object);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
}

/**
 * The `toggleSemiLock` widget toggles the semi-lock status of the Dynamic Object.
 * If semi-locked, the object is semi-unlocked.
 * If semi-unlocked, the object is semi-locked.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Configuration
 */

PhSim.Widgets.toggleSemiLock = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        self.toggleSemiLock(dyn_object);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
    
}

/***/ }),

/***/ 1799:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const Motion = __webpack_require__(341);
const PhSim = __webpack_require__(8138);
const Widget = __webpack_require__(5203);

/** 
 * 
 * Generate a function to put some dynamic object in motion, given some mode and vector or scalar.
 * 
 * @function
 * @param {"setAngle"|"force"|"velocity"|"translate"|"position"|"rotation"|"circular_constraint_rotation"} mode - The possible modes are "force","velocity","translate"
 * @param {PhSim.DynObject} dyn_object - The dynamic object to put in motion.
 * @param {Vector|Number} motion - The vector or scalar that defines the motion.
 * @returns {Function} - A function that makes an object undergo some motion.
 * 
 * 
*/

PhSim.prototype.createMotionFunction = function(mode,dyn_object,motion) {

	var f;

	if(mode === "force") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.applyForce(dyn_object,dyn_object.matter.position,motion);
			}
		}
	}

	if(mode === "velocity") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.setVelocity(dyn_object,motion);
			}
		}
	}

	if(mode === "translate") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.translate(dyn_object,motion);
			}
		}
	}

	if(mode === "position") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.setPosition(dyn_object,motion)
			}
		}
	}

	if(mode === "rotation") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.rotate(dyn_object,motion,dyn_object.matter.position);
			}
		}
	}

	if(mode === "circular_constraint_rotation") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
			}
		}
	}

	if(mode === "setAngle") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				return Motion.setAngle(dyn_object,motion);
			}
		}
	}

	if(mode === "circular_constraint_setAngle") {
		f = function() {
			if(f.motionFunctionEnabled === true) {
				var a = Math.atan2(dyn_object.y - dyn_object.circularConstraintVector.y,dyn_object.x - dyn_object.circularConstraintVector.x)
				Motion.rotate(dyn_object,-a,dyn_object.circularConstraintVector);
				Motion.rotate(dyn_object,motion,dyn_object.circularConstraintVector);
			}
		}
	}


	f.motionFunctionEnabled = true;

	return f;

}

/**
 * 
 * The `velocity` widget makes dynamic objects go at a certain velocity.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {WFunctionOptions} widget
 * @param {Vector} widget.vector - Velocity vector
 * @this {PhSim} 
 */

PhSim.Widgets.velocity = function(dynObject,widget) {

	var w = new Widget(dynObject,widget);

    var f = this.createMotionFunction("velocity",dynObject,widget.vector);

	w.wFunction = f;

    this.createWFunction(dynObject,f,widget);

}

/**
 * 
 * The `translate` widget moves objects.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object to be translated.
 * @param {WFunctionOptions} widget - Widget options.
 * @param {Vector} widget.vector - Translation vector
 * @this {PhSim} 
 */

PhSim.Widgets.translate = function(dynObject,widget) {

	var w = new Widget(dynObject,widget);

    var f = this.createMotionFunction("translate",dynObject,widget.vector);
	
	w.wFunction = f;

    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * The `position` widget sets the position of an object.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic object that will have its position changed.
 * @param {WFunctionOptions} widget - Widget options.
 * @this {PhSim} 
 */

PhSim.Widgets.position = function(dynObject,widget) {

	var w = new Widget(dynObject,widget);

    var f = this.createMotionFunction("position",dynObject,widget.vector);
	w.wFunction = f;

    this.createWFunction(dynObject,f,widget);
}

/**
 * 
 * The `rotation` widget rotates an object. 
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 * @param {WFunctionOptions} widget
 * @this {PhSim} 
 */

PhSim.Widgets.rotation = function(dynObject,widget) {

	var f;

    if(widget.circularConstraintRotation) {
        f = this.createMotionFunction("circular_constraint_rotation",dynObject,widget.cycle);
    }

    else {
		f = this.createMotionFunction("rotation",dynObject,widget.cycle);
    }
    
    this.createWFunction(dynObject,f,widget);
}

/**
 * The `setAngle` widget makes a widget change angle.
 * 
 * @function
 * @param {PhSim.DynObject} dynObject - Dynamic Object
 * @param {WFunctionOptions} widget 
 */

PhSim.Widgets.setAngle = function(dynObject,widget) {

	var f;

    if(widget.circularConstraintRotation) {
        f = this.createMotionFunction("circular_constraint_setAngle",dynObject,widget.cycle);
    }

    else {
		f = this.createMotionFunction("setAngle",dynObject,widget.cycle);
    }
    
    this.createWFunction(dynObject,f,widget);

}

/**
 * The `force` widget exerts a force on an object
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget 
 */

PhSim.Widgets.force = function(dyn_object,widget) {

    var f = this.createMotionFunction("force",dyn_object,widget.vector);

    this.createWFunction(dyn_object,f,widget);
    
}

/***/ }),

/***/ 1332:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const DynObject = __webpack_require__(390)
const PhSim = __webpack_require__(8138);
const Widget = __webpack_require__(5203);
/**
 * 
 * Call ObjLink functions
 * 
 * @function
 * @param {PhSim.DynObject} dynObject 
 */


PhSim.prototype.callObjLinkFunctions = function(dynObject) {
	for(var i = 0; i < dynObject.objLinkFunctions.length; i++) {
		dynObject.objLinkFunctions[i]();
	}
}

/**
 * 
 * The `objLink` widget executes all functions in the {@link PhSim.DynObject#objLinkFunctions}
 * array of `widget.target`. 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Reciever Object
 * @param {WFunctionOptions} widget - Widget options
 * @param {LOAddress|PhSim.DynObject} widget.target -  Target object
 */

PhSim.Widgets.objLink = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var self = this;
    var targetObj;
    var widgetO = widget;

    this.on("load",function(){

        if(typeof widget.target.L === "number" && typeof widget.target.O === "number") {
            targetObj = self.LO(widgetO.target.L,widgetO.target.O);
        }

        else if(widget.target instanceof DynObject) {
            targetObj = widget.target;     
        }
    
        var eventFunc = function(){
            self.callObjLinkFunctions(targetObj);
        } 
    
        w.wFunction = self.createWFunction(dyn_object,eventFunc,widget);

    },{
        slEvent: true
    });
    
    return w;
    
}

/***/ }),

/***/ 7326:
/***/ ((module) => {

/**
 * Widget for changing image sources for sprites.
 * 
 * @param {PhSim.DynObject} dynObject 
 * @param {Object} widget - Widget Object
 * @param {String} widget.src - New Source
 * @this PhSim
 */

function setImgSrc(dynObject,widget) {

    var f = function(){
        dynObject.sprite.src = widget.src;
    }

    this.createWFunction(dynObject,f,widget);
}

module.exports = setImgSrc;

/***/ }),

/***/ 2905:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const Widget = __webpack_require__(5203)

/**
 * 
 * The `setColor` widget changes the color of an object.
 * It utlizies the {@link PhSim.DynObject.setColor} function.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - Dynamic Object that will have it's color changed.
 * @param {WFunctionOptions} widget - Widget Options
 * @param {String} widget.color - The new color of the object.
 * @returns {PhSim.Widget}
 */

PhSim.Widgets.setColor = function(dyn_object,widget) {

    var self = this;

    var w = new Widget(dyn_object,widget);

    var f = function() {
        PhSim.DynObject.setColor(dyn_object,widget.color);
    }

    w.wFunction = self.createWFunction(dyn_object,f,widget);

    dyn_object.test1 = w;

    return w;

}

/**
 * 
 * The `setBorderColor` widget sets the border color of an object.
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object 
 * @param {WFunctionOptions} widget - Widget properties.
 * @param {String} widget.color - The new color of the object border
 * @returns {PhSim.Widget}
 * 
 */
    
PhSim.Widgets.setBorderColor = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var closure = function() {

        var color = widget.color
        var obj = dyn_object;

        var f = function() {
            PhSim.DynObject.setBorderColor(obj,color);
        }

        return f;

    }

    w.wFunction = this.createWFunction(dyn_object,closure(),widget);

    return w;
}

/**
 * 
 * The `setLineWidth` widget sets the line width of an object.
 * 
 * 
 * @function
 * @param {PhSim.DynObject} dyn_object - The object to be affected.
 * @param {WFunctionOptions} widget - Widget options
 * @param {Number} widget.width - New line width
 * @returns {PhSim.Widget}
 * 
 */
        
PhSim.Widgets.setLineWidth = function(dyn_object,widget) {

    var w = new Widget(dyn_object,widget);

    var f = function(){
        PhSim.DynObject.setLineWidth(dyn_object,widget.width);
    }

    w.wFunction = this.createWFunction(dyn_object,f,widget);

    return w;
}

/***/ }),

/***/ 4591:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);

/**
 * 
 * @param {DynSimObject} o 
 * 
 * @param {Object} w -  Widget Options
 * 
 * @param {Number} w.rows -  Widget Rows
 * @param {Number} w.rowDist - Distance between two adjacent objects in a row 
 * 
 * @param {Number} w.columns - Columns
 * @param {Number} w.colDist - Distance between two adjecent objects in the column
 * 
 * @this {PhSim}
 *  
 */

PhSim.Widgets.stack = function(o,w) {

    var a = [];

    for(let i = 1; i <= w.rows; i++) {

        let new_o = this.cloneObject(o);

        PhSim.Motion.transform(new_o,{
            x: w.rowDist * i,
            y: 0
        });

        a.push(new_o);

    }


    for(let i = 1; i <= w.columns; i++) {

        let new_o = this.cloneObject(o);

        PhSim.Motion.transform(new_o,{
            x: 0,
            y: w.colDist * i
        });

        a.push(new_o);

    }
}

/***/ }),

/***/ 6249:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Widget = __webpack_require__(5203);

/**
 * Widget to transform object by camera.
 * @param {Object} dynObject 
 * @this PhSim
 */


function transformAgainstCamera(o) {

    var self = this;

    var w = new Widget(o);

    this.camera.transformingObjects.push(o);

    var destroy = function() {
        var i = self.camera.transformingObjects.indexOf(o); 
        self.camera.transformingObjects.splice(i,1);
    }

    w.on("destroy",destroy);
    w.on("disable",destroy);

    return w;

}

module.exports = transformAgainstCamera;

/***/ }),

/***/ 9009:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const PhSim = __webpack_require__(8138);
const Widget = __webpack_require__(5203);

/**
 * 
 * The `transformCameraByObj` widget transforms the camera by an object.
 * 
 * @function
 * @this PhSim
 * @param {PhSim.DynObject} dyn_object - Object that will transform object.
 */


PhSim.Widgets.transformCameraByObj = function(dyn_object) {

    var w = new Widget(dyn_object);

    var self = this;

    var dx;
    var dy;

    // beforeUpdate

    var beforeUpdate = function(){
        if(w.status === "enabled") {
            dx = dyn_object.matter.position.x;
            dy = dyn_object.matter.position.y;
        }
    }

    this.on("beforeupdate",beforeUpdate,{
        "slEvent": true
    });

    // afterupdate

    var afterUpdate = function(){
        if(w.status === "enabled") {
            dx = dyn_object.matter.position.x - dx;
            dy = dyn_object.matter.position.y - dy;
            self.camera.translate(-dx,-dy);
        }
    }

    this.on("afterupdate",afterUpdate,{
        "slEvent": true
    });

    // Widget Destruction

    w.on("destoy",function(){
        self.off("afterupdate",afterUpdate);
        self.off("beforeupdate",beforeUpdate);
    });

    return w;

}

/***/ }),

/***/ 4105:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { statusCodes } = __webpack_require__(8138);
const PhSim = __webpack_require__(8138);

/**
 * @file File for dealing with wFunctions.
 * @module widgets/wFunction.js
 * @author Mjduniverse
 * 
 */

/**
 * A widget function is a function that used for the `WidgetFunction` widget.
 * The "this" keyword in the body of function usually refers to the current instance of
 * PhSim simulation or references an instance of {@link PhSim.DynObject}.
 * 
 * To learn more, see the {@tutorial Widget Functions}
 * 
 * @module wFunction
 * @typedef {Function} WFunction
 * @property {Function} _options - Options used to create WFunction
 * @property {Function|Number} _ref
 * @property {String} [_name] - WFunction name
 * @property {Function} _bodyFunction - Body Function
 * @property {String} _eventclass - Event class
 * 
 */

/**
 * Array of widget functions
 * @memberof PhSim
 * @type {WFunctions[]}
 */

PhSim.prototype.wFunctions = [];

/**
 * Create a widget function and push it to the wFunctions array.
 * @function
 * @memberof PhSim
 * @param {String|Function} arg - content of function if string, function if function
 * @param {Object} thisRef - 
 * @returns {WFunction}
 */

// Simple Event Reference Array

PhSim.prototype.wFunctionRefs = [];

/** 
 * 
 * @typedef {"key"} keyTriggerString
 * 
 * The "key" trigger means that the simple event will execute if a key is pressed.
 */

/** 
* 
* @typedef {"sensor"|"sensor_global"} sensorTriggerString
* 
* The "sensor" trigger means that the simple event will execute if the trigger object 
* collides with an object that shares at least one of the sensor classes. However, 
* the "sensor_global" trigger means that the function will execute if any two 
* objects that share at least one sensor class collides.
*/

/** 
 * 
 * @typedef {"objclick"|"objclick_global"} objclickTriggerString
 * 
 * The "objclick" trigger means that the simple event will execute if the mouse clicks on the trigger object. 
 * However, the "objclick_global" trigger means that the simple event will execute if the mouse clicks on any
 * object in general.
 */

/**  
 * @typedef {"objMouseDown"|"objmousedown_global"} objMouseDownTriggerString
 * 
 * The "objmousedown" trigger means that the simple event call is executed if the mouse
 * is being pushed down on the object. The "objmousedown_global" trigger means that
 * the simple event will execute if the mouse clicks on any object in general.
 */

/** 
 * @typedef {"firstslupdate"} firstslupdateTriggerString
 * 
 * The "firstslupdate" trigger means that the simple event will execute during the first
 * update of the simulation.
 */

/** 
 * @typedef {"objmouseup"|"objmouseup_global"} objmouseupTriggerString
 * 
 * The "objmouseup" trigger means that the simple event will execute when the
 * mouse is let go of while the mouse is over an object. The "objmouseup_global" trigger
 * means that the simple event will execute if the mouse is let go of while it is 
 * over an object.
 */ 

 /** 
 * @typedef {"objlink"} objlinkTriggerString
 * 
 * The "objlink" trigger means that the simple event will execute if the trigger object
 * is linked to another object by the objlink widget.
 */

/**
 *  @typedef {"afterslchange"} afterslchangeTriggerString
 * 
 * The "afterslchange" trigger means that the simple event will execute after the 
 * superlayer changes.
 * 
 */

/** 
 * @typedef {"time"} timeTriggerString
 * 
 * The "time" trigger means that the simple event will execute by some interval of time.
 */ 

/** 
 * @typedef {keyTriggerString|sensorTriggerString|objclickTriggerString|
 * objMouseDownTriggerString|firstslupdateTriggerString|objmouseupTriggerString|
 * objlinkTriggerString|afterslchangeTriggerString|timeTriggerString} wFunctionTrigger
 *
 * 
 * The simple event trigger string is a string defining {@link WFunctionOptions.trigger}
 */

/** 
 * Properties for a simple event.
 * The simple event options is an Object that is used for the {@link PhSim#createWFunction} function.
 * They are also used to configure various types of widgets. Especially widgets that utilize
 * wFunctions.
 * 
 * @typedef {Object} WFunctionOptions
 * @property {KeyBoard} [key] - The event.key value for triggering a simple event.
 * @property {Number} [time] - The time interval between a repeated event or a delay time for timeouts.
 * @property {Number} [maxN] - The maximum number of times a repeated SimpleEvent can be executed.
 * @property {PhSim.DynObject} [wFunctionObj] - An object being affected by the wFunction.
 * @property {String} [name] - The name of the wFunction
 * 
 */

 /**
  * @callback WFunctionBody
  * @this {PhSim.DynObject}
  * @param {Event} e - event object
  */

/**
 * Function used to generate {@link WFunction|WFunctions.}
 * To learn more, see the {@tutorial Widget Functions} tutorial.
 * 
 * @function
 * @memberof PhSim
 * 
 * @param {wFunctionTrigger} trigger - The type of SimpleEvent.
 * 
 * @param {WFunctionBody|Number} wFunctionBody - The JavaScript function to be wrapped. 
 * If `wFunctionBody` is an integer `i`, the function body is deterimined by the 
 * `{@link PhSim#options.wFunctions}[i]`
 * 
 * @param {WFunctionOptions} options -  [The Simple Event Options Object]{@link WFunctionOptions}.
 * @returns {WFunction} - The wFunction.
 * @this {PhSim}
 * 
 */
 
PhSim.prototype.createWFunction = function(thisRef,wFunctionBody,options) {

	var self = this;

	if(typeof wFunctionBody === "number") {
		wFunctionBody = this.wFunctions[wFunctionBody];
	}

	if(typeof wFunctionBody === "string") {
		wFunctionBody = new Function("e",options.function)
	}

	/**
	 * 
	 * New WFunction
	 * 
	 * @inner
	 * @type {WFunction}
	 */

    var wFunction = function(event) {

		if(wFunction.wFunction_enabled) {

			try {
				return wFunctionBody.apply(thisRef,event);
			}

			catch(e) {
				self.callEventClass("wfunctionerror",self,e);
				console.error(e);
			}

		}

	}

	wFunction._options = options;
	wFunction._bodyFunction = wFunctionBody;
	wFunction._thisRef = thisRef;
	wFunction.wFunction_enabled = options.enabled || true;

	if(options._name) {
		self.wFunctionNames[options._name] = wFunction;
	}
	
	if(options.trigger === "key") {

		if(options.key) {
		
			wFunction._ref = function(e) {
				if( e.key.match( new RegExp("^" + options.key + "$","i") ) ) {
					wFunction(e);
				}
			};

		}

		else {

			wFunction._ref = function(e) {
				wFunction(e);
			}

		}

		wFunction._eventclass = "keydown";
		
	}

	else if(options.trigger === "sensor" || options.trigger === "sensor_global") {

		if(options.trigger === "sensor") {
			
			wFunction._ref = function(e) {

				var m = self.inSensorCollision(thisRef)
	
				if(m) {
					wFunction(e);
				}
	
			}
		}

		else {
			wFunction._ref = function(e) {
				wFunction(e);
			}
		}

		wFunction._eventclass = "collisionstart";

	}

	else if(options.trigger === "update") {
		
		wFunction._ref = function() {
			wFunction();
		}

		wFunction._eventclass = "beforeupdate";

	}

	else if(options.trigger === "objclick" || options.trigger === "objclick_global") {

		var f;

		if(options.trigger === "objclick") {
			wFunction._ref = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					wFunction(e);
				}
			};
		}

		else {
			wFunction._ref = function(e) {
				wFunction(e);
			}
		}

		wFunction._eventclass = "objclick";

	}

	else if(options.trigger === "objmousedown" || options.trigger === "objmousedown_global") {

		if(options.trigger === "objmousedown") {
			wFunction._ref = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					wFunction(e);
				}
			}
		}


		else {
			wFunction._ref = function(e) {
				wFunction(e);
			}
		}

		wFunction._eventclass = "objmousedown";

	}

	else if(options.trigger === "firstslupdate") {
		
		wFunction._ref = function(e) {
			wFunction(e)
		}

		wFunction._eventclass = "firstslupdate";


	}
	
	else if(options.trigger === "objmouseup" || options.trigger === "objmouseup_global") {

		if(options.trigger === "objmouseup") {
			wFunction._ref = function(e) {
				if(self.objMouseArr[self.objMouseArr.length - 1] === thisRef) {
					wFunction(e);
				}
			};
		}

		else {
			wFunction._ref = function(e) {
				wFunction(e);
			}
		}

		wFunction._eventclass = "objmouseup";

	}

	else if(options.trigger === "objlink") {

		thisRef.objLinkFunctions = thisRef.objLinkFunctions || [];
		thisRef.objLinkFunctions.push(wFunction);

		wFunction._ref = f;

		return wFunction;

	}

	else if(options.trigger === "afterslchange") {

		wFunction._ref = function(e) {
			wFunction(e);
		}

		wFunction._eventclass = "afterslchange";

	}

	else if(options.trigger === "time") {

		var getFunction = function() {

			var fn;

			if(Number.isInteger(options.maxN)) {

				fn = function() {

					if(fn.__n === options.maxN) {
						clearInterval(fn.__interN);
					}

					else {
						if(!self.paused) {
							wFunction();
							fn.__n++;
						}
					}

				}

				fn.__n = 0;

			}

			else {

				fn = function() {
					if(!self.paused) {
						wFunction();
					}
				}

			}


			fn.__phtime = options.time;
			fn.__interN = null;

			return fn;

		}

		var refFunc = getFunction();

		// Making sure that the interval starts after the simulation has has it's first
		// Update and not run at the moment the wFunction is created.

		if(this.status === statusCodes.LOADED_SIMULATION) {
			refFunc.__interN = setInterval(refFunc,refFunc.__phtime);
		}

		else if(this.status < statusCodes.LOADED_SIMULATION) {
			self.on("firstslupdate",function(){
				refFunc.__interN = setInterval(refFunc,refFunc.__phtime);
			});
		}

		wFunction._ref = refFunc.__interN;

		return wFunction;
	}

	else {
		wFunction._ref = wFunction;	
		wFunction._eventclass = options.trigger;
	}

	if(typeof wFunction._ref === "function") {
		wFunction._ref._wFunction = wFunction;
	}

	if(typeof wFunction._eventclass === "string") {

		wFunction._listener = wFunction._ref;
		
		self.on(wFunction._eventclass,wFunction._ref,{
			"slEvent": true
		});
	}

	// Return wFunction

	return wFunction

}

/** 
 * 
 * Disable wFunction
 * 
 * @memberof PhSim
 * @function
 * @param {WFunction} wFunction - Reference created by {@link PhSim#createWFunction}.
 * 
*/

PhSim.prototype.disableWFunction = function(wFunction) {
	wFunction.wFunction_enabled = false;
}

/**
 * Make wFunction no longer be able to work.
 * 
 * @memberof PhSim
 * @function
 * @param {WFunction} wFunction - wFunction to destroy.
 */

PhSim.prototype.destroyWFunction = function(wFunction) {

	this.disableWFunction(wFunction);

	if(typeof wFunction._eventclass === "string") {
		this.off(wFunction._eventclass,wFunction._ref);
	}

	else if(wFunction._options.trigger === "time") {
		clearInterval(wFunction._ref)
	}

	else if(wFunction._options.trigger === "objlink") {
		var i = wFunction._thisRef.objLinkFunctions.indexOf(wFunction);
		wFunction._thisRef.objLinkFunctions.splice(i,1);
	}

	if(wFunction._name) {
		delete this.wFunctionNames[wFunction._name];
	}

}

/**
 * 
 * The `wFunction` widget is used to create wFunctions.
 * 
 * @memberof PhSim
 * @function
 * @param {PhSim.DynObject|PhSim} o - Target object or simulation
 * @param {WFunctionOptions} widget - wFunction options
 */

PhSim.Widgets.wFunction = function(o,widget) {
	this.createWFunction(o,widget.function,widget);
}

PhSim.prototype.wFunctionNames = {}

/***/ }),

/***/ 8054:
/***/ ((module) => {

"use strict";
module.exports = require("matter-js");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(8138);
/******/ 	
/******/ })()
;