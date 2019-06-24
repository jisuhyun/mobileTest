function MissionSdoku() {
    Mission.call(this);
}

MissionSdoku.prototype = Object.create(Mission.prototype);
MissionSdoku.prototype.constructor = MissionSdoku;

MissionSdoku.prototype.missionStart = function() {  
    alert("mission start!\n\n" 
    + "make Sdoku!" ); 
    Mission.prototype.missionStart.call(this);
}

MissionSdoku.prototype.process = function(objects) {
    let maxNumber = gridCount;
    let sodokuBlockCount = maxNumber * maxNumber;
    if( objects.length != sodokuBlockCount){
        return this.process_;
    }
    let axisMaxValue = (voxelSize * Math.floor((gridCount-1) * 0.5))
    let absMaxX = cubeOriginPosition.x + axisMaxValue;
    let absMaxZ = cubeOriginPosition.z + axisMaxValue;

    for(let o of objects) {
        if(o.position.y != cubeOriginPosition.y) return this.process_;
        if(o.position.x > absMaxX || o.position.x < -absMaxX) return this.process_;
        if(o.position.z > absMaxZ || o.position.z < -absMaxZ) return this.process_;
        if(false == o.material.map.name.includes(objectNames[enumObjectNames.NUMBER])) return this.process_;
    }
    
    let sdokuMatrix = [];
    let row;
    for(let i=0; i<maxNumber; ++i) {
        row = [];
        sdokuMatrix.push(row);
    }
    let coordOffset = Math.floor(gridCount * 0.5);    
    let col;
    for(let o of objects) {
        col = ((o.position.x - cubeOriginPosition.x) / voxelSize) + coordOffset;
        row = ((o.position.z - cubeOriginPosition.z) / voxelSize) + coordOffset;
        sdokuMatrix[row][col] = parseInt(o.material.map.name[o.material.map.name.length-1]);
        if(sdokuMatrix[row][col] > maxNumber || sdokuMatrix[row][col] <= 0 ) return this.process_;
    }

    let set;
    let rowArray;
    for(row=0; row<sdokuMatrix.length; ++row) { // row same value check
        rowArray = sdokuMatrix[row];
        set = new Set(rowArray);
        if(set.size != maxNumber) return this.process_;
    }
    
    for(col=0; col<sdokuMatrix.length; ++col) { // col same Value check
        set.clear();
        for(row=0; row<sdokuMatrix.length; ++row) {
            set.add(sdokuMatrix[row][col]);
        }
        if(set.size != maxNumber) return this.process_;
    }
    
    this.process_ = enumMissionStatus.SUCCESS;    
    this.missionEnd();    
    alert("mission success!\n\n"
    + "usageTime: " + this.getUsageTime() + " seconds");
    return this.process_;
}
