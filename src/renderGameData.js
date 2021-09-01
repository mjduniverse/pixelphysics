/**
 * Render game data
 * @this PPGSploderEmulator
 */

function renderGameData() {

    this.phsim.ctx.textAlign = "left";
    this.phsim.ctx.fillStyle = "white";
    this.phsim.ctx.fillText("Lives: " + this.currentGame.lives + " Penalty: " + this.currentGame.penalty + " / " + this.currentLevel.max_penalty + " Score: " + this.currentGame.score + "/" + this.currentLevel.score_goal,10,19);

    this.phsim.ctx.fillText(this.currentGame.time,400,400);

}

module.exports= renderGameData;