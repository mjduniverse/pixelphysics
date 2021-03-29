function renderExtensions() {

    this.phsim.ctx.strokeStyle = "rgba(0,0,0,0.5)";

    for(var i = 0; i < this.phsim.matterJSWorld.constraints.length; i++) {
        
        let constraint = this.phsim.matterJSWorld.constraints[i];
        let pointA = Matter.Constraint.pointAWorld(constraint);
        let pointB = Matter.Constraint.pointBWorld(constraint);


        this.phsim.moveTo(pointA.x,pointA.y);
        this.phsim.lineTo(pointB.x,pointB.y);

    }
}