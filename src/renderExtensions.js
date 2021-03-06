function renderExtensions() {

    this.phsim.ctx.strokeStyle = "rgba(0,0,0,0.5)";
    this.phsim.ctx.lineWidth = 10;

    for(let i = 0; i < this.phsim.matterJSWorld.constraints.length; i++) {
        
        let constraint = this.phsim.matterJSWorld.constraints[i];
        let pointA = Matter.Constraint.pointAWorld(constraint);
        let pointB = Matter.Constraint.pointBWorld(constraint);


        this.phsim.ctx.moveTo(pointA.x,pointA.y);
        this.phsim.ctx.lineTo(pointB.x,pointB.y);

        this.phsim.ctx.stroke();

    }

    
    for(let i = 0; i < this.elevators.length; i++) {
        
        this.phsim.ctx.moveTo(this.elevators[i].x1,this.elevators[i].y1);
        this.phsim.ctx.lineTo(this.elevators[i].x2,this.elevators[i].y2);

        this.phsim.ctx.stroke();

    }
}

module.exports = renderExtensions;