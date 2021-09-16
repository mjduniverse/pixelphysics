/**
 * Set level
 * @param {*} level 
 * @this PPGSploderEmulator
 */

function setLevel(level) {

    if(typeof this.timeLimitCount === "number") {
        clearInterval(this.timeLimitCount);
    }

    this.playing = false;

    this.phsim.pause();

    this.currentLevel = level; 

    this.currentLevelIndex = this.pixelPhysicsParser.levels.indexOf(level);

    this.descTxt.innerText = this.currentLevel.description;
    this.descDiv.style.display = "block";
    
    this.currentGame.time = this.currentLevel.time_limit;
    this.currentGame.score = 0;
    this.currentGame.penalty = 0;
    this.currentGame.lives = this.currentLevel.starting_lives;

    let topClr = this.currentLevel.gradient.top;
    let botClr = this.currentLevel.gradient.bottom;

    // Gradient

    let grad = this.phsim.ctx.createLinearGradient(0,0,0,this.phsim.canvas.height);

    grad.addColorStop(0,topClr);
    grad.addColorStop(1,botClr);

    this.grad = grad;

    this.implementExtensions(this.currentLevel);

    for(let i = 0; i < this.currentLevel.bodies.length; i++) {
        this.implementEvents(this.currentLevel.bodies[i]);
    }

    this.canvasIntervals = [];

    for(let i = 0; i < this.phsim.objUniverse.length; i++) {

        if(this.phsim.objUniverse[i].sprite) {

            let self = this;

            let f = function() {

                var obj = self.phsim.objUniverse[i];
                var o = self;

                return function() {
                    if(o.playing) {
                        o.updatePhSimSprite(obj.sprite)
                    }
                }

            }

            this.canvasIntervals.push(setInterval( f() , 250 ));

        }

    }

    
    if(this.currentLevel.level_size === 1 || this.currentLevel.level_size === 2) {
        this.phsim.camera.zoomIn(0.5);
    }

}

module.exports = setLevel;