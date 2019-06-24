function MissionMakeTheSame() {
    this.goal;
    Mission.call(this);
}

MissionMakeTheSame.prototype = Object.create(Mission.prototype);
MissionMakeTheSame.prototype.constructor = MissionMakeTheSame;

MissionMakeTheSame.prototype.setGoal = function(objects) {
    this.goal = [];
    for(let o of objects){
        if(objectNames[enumObjectNames.CUBE] == o.name) {
            this.goal.push(o.clone());
        }
    }
}

MissionMakeTheSame.prototype.missionStart = function() {    
    doManager.init();
    deleteAllVoxels();

    alert("mission start!\n\n" 
    +"time limit: " + (this.timeLimit/1000).toString() + " seconds\n\n" 
    +"block Count: " + this.goal.length.toString() );

    Mission.prototype.missionStart.call(this);
    render();
}

MissionMakeTheSame.prototype.process = function(objects) {    
    if(this.goal.length != objects.length ) return this.process_;
    let goal = this.goal.slice(0, this.goal.length);
    let cube1;
    let cube2;    
    for(let i=goal.length - 1; i>=0; --i){
        cube1 = goal[i];
        let samePosition = false;
        for(let j=objects.length - 1; j>=0; --j) {
            cube2 = objects[j];
            if(cube1.position.equals(cube2.position)) {
                samePosition = true;
                if(cube1.material.map.name != cube2.material.map.name){
                    return this.process_;
                }
                if(cube1.geometry.name != cube2.geometry.name){
                    return this.process_;
                }
                if(cube1.material.color.getHexString() != cube2.material.color.getHexString()){
                    return this.process_;
                }
                goal.splice(i, 1);
                objects.splice(j, 1);
                break;
            }
        }        
        if(false == samePosition){
            return this.process_;
        }
    }    
    
    this.process_ = enumMissionStatus.SUCCESS;    
    this.missionEnd();    
    alert("mission success!\n\n"
    + "usageTime: " + this.getUsageTime() + " seconds");
    return this.process_;
}