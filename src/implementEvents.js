function implementEvents(obj) {

    var dynObject = this.phsim.getObjectByName(obj.id);
    var emulatorInstance = this;

    // Score events

    if(obj.events.score.onsensor) {

        let f = function(){
            emulatorInstance.currentGame.score++;
        };

        obj.on("sensor",f);

    }

    if(obj.events.score.oncrush) {
        
        obj.on("crush",function(){
            emulatorInstance.currentGame.score++;
        });

    }

    if(obj.events.score.onclone) {

        obj.on("clone",function(){
            emulatorInstance.currentGame.score++;
        });
        
    }

    if(obj.events.score.onboundsout) {

        obj.on("boundsout",function(){
            emulatorInstance.currentGame.score++;
        });
        
    }

    // Penalty events

    if(obj.events.penalty.onsensor) {

        let f = function(){
            emulatorInstance.currentGame.penalty++;
        };

        obj.on("sensor",f);

    }

    if(obj.events.penalty.oncrush) {
        
        obj.on("crush",function(){
            emulatorInstance.currentGame.penalty++;
        });

    }

    if(obj.events.penalty.onclone) {

        obj.on("clone",function(){
            emulatorInstance.currentGame.penalty++;
        });
        
    }

    if(obj.events.penalty.onboundsout) {

        obj.on("boundsout",function(){
            emulatorInstance.currentGame.penalty++;
        });
        
    }

    this.phsim.on("collisionstart",function(){
        if(this.inSensorCollision(dynObject)) {
            obj.callEventClass("sensor",emulatorInstance,{});
        }
    });

}

module.exports = implementEvents;