function Mission () {
    this.goal;
    this.timeLimit = 0;
    this.timeoutID;    
    this.process_ = enumMissionStatus.PREPARE;
    this.startTime = null;
    this.endTime = null;
}

var enumMissionStatus = {
    PREPARE: -1,
    FAIL: 0,
    SUCCESS: 1,
    PROCESS: 2
}

Mission.prototype.setTimeLimit = function(second) {
    this.timeLimit = second * 1000;
}

Mission.prototype.missionStart = function() {
    this.process_ = enumMissionStatus.PROCESS;
    this.startTime = new Date().getTime();
    this.endTime = this.startTime;
    
    if(0 != this.timeLimit) {
        this.timeoutID = setTimeout(() => {
            this.missionTimeOver();
        }, this.timeLimit);
    }
}

Mission.prototype.missionEnd = function() {
    if(null != this.timeoutID){
        clearTimeout(this.timeoutID);
        this.timeoutID = null;
    }
    this.endTime = new Date().getTime();
    // console.log("mission End!");
}

Mission.prototype.missionTimeOver = function(){
    alert("mission fail!");
    this.process_ = enumMissionStatus.FAIL;
    this.missionEnd();
}

Mission.prototype.getUsageTime = function(){
    if(this.process_ > enumMissionStatus.PREPARE) {
        return (this.endTime - this.startTime) / 1000;
    }
}