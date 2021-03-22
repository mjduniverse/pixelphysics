function firstRender() {

    this.renderGradient(); 

    for(let i = 0; i < this.phsim.objUniverse.length; i++) {
        this.phsim.phRender.dynamicRenderDraw(this.phsim.objUniverse[i]);
    }

    this.renderGameData();

}

module.exports = firstRender;