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

    // Lose Life

    if(obj.events.loseLife.onsensor) {

        let f = function(){
            emulatorInstance.currentGame.lives--;
        };

        obj.on("sensor",f);

    }

    if(obj.events.loseLife.oncrush) {
        
        obj.on("crush",function(){
            emulatorInstance.currentGame.lives--;
        });

    }

    if(obj.events.loseLife.onclone) {

        obj.on("clone",function(){
            emulatorInstance.currentGame.lives--;
        });
        
    }

    if(obj.events.loseLife.onboundsout) {

        obj.on("boundsout",function(){
            emulatorInstance.currentGame.lives--;
        });
        
    }

    // Add Life

    if(obj.events.addLife.onsensor) {

        let f = function(){
            emulatorInstance.currentGame.lives++;
        };

        obj.on("sensor",f);

    }

    if(obj.events.addLife.oncrush) {
        
        obj.on("crush",function(){
            emulatorInstance.currentGame.lives++;
        });

    }

    if(obj.events.addLife.onclone) {

        obj.on("clone",function(){
            emulatorInstance.currentGame.lives++;
        });
        
    }

    if(obj.events.addLife.onboundsout) {

        obj.on("boundsout",function(){
            emulatorInstance.currentGame.lives++;
        });
        
    }

    // Unlock

    if(obj.events.unlock.onsensor) {

        let f = function(){
            emulatorInstance.phsim.setLock(dynObject,false);
        };

        obj.on("sensor",f);

    }

    if(obj.events.unlock.oncrush) {
        
        obj.on("crush",function(){
            emulatorInstance.phsim.setLock(dynObject,false);
        });

    }

    if(obj.events.unlock.onclone) {

        obj.on("clone",function(){
            emulatorInstance.phsim.setLock(dynObject,false);
        });
        
    }

    if(obj.events.unlock.onboundsout) {

        obj.on("boundsout",function(){
            emulatorInstance.phsim.setLock(dynObject,false);
        });
        
    }

    // remove

    if(obj.events.remove.onsensor) {

        let f = function(){
            emulatorInstance.phsim.removeDynObj(dynObject);
        };

        obj.on("sensor",f);

    }

    if(obj.events.remove.oncrush) {
        
        obj.on("crush",function(){
            emulatorInstance.phsim.removeDynObj(dynObject);
        });

    }

    if(obj.events.remove.onclone) {

        obj.on("clone",function(){
            emulatorInstance.phsim.removeDynObj(dynObject);
        });
        
    }

    if(obj.events.remove.onboundsout) {

        obj.on("boundsout",function(){
            emulatorInstance.phsim.removeDynObj(dynObject);
        });
        
    }


    this.phsim.on("collisionstart",function(){
        if(this.inSensorCollision(dynObject)) {
            obj.callEventClass("sensor",emulatorInstance,{});
        }
    });

}

module.exports = implementEvents;