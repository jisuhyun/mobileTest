DoData = function(){
    this.type = enumUserOperationType.ERASE;
    this.doList = [];
}

DoData.prototype.setType = function(type){
    undoData.type = type;
}

DoData.prototype.pushDoObject = function(object){
    if(null != object)
        this.doList.push(object);
}

DoData.prototype.pushDoObjects = function(objects){
    if(null == objects) return;
    for(let object of objects) {
        if(null != object) this.doList.push(object);
    }
}

doManager = new DoManager();

function DoManager () {
    this.doList = [];
    this.redoList = [];
    this.isReplay = false;
}

DoManager.prototype.init = function(){
    this.doList = [];
    this.redoList = [];
    this.isReplay = false;
}

DoManager.prototype.pushDoData = function(undoDatas){
    if(null != undoDatas)
        this.doList.push(undoDatas);
}

DoManager.prototype.undo = function(){
    if(this.isReplay)
        return false;
    let doData = this.doList.pop();
    if(null == doData ) return false;
    switch(doData.type) {
        case enumUserOperationType.BUILD:
            deleteVoxels(doData.doList);
            this.redoList.push(doData);
        break;
        case enumUserOperationType.ERASE:
            for(let voxel of doData.doList)
                addVoxel(voxel);
            this.redoList.push(doData);
        break;
        case enumUserOperationType.COLOR:
        case enumUserOperationType.SHAPE:
        case enumUserOperationType.TEXTURE:
        {
            return this.do_(doData, this.redoList);
        }
    }
    render();
    return true;
}

DoManager.prototype.redo = function(){
    let doData = this.redoList.pop();
    if(null == doData) {
        return false;
    }
    switch(doData.type) {
        case enumUserOperationType.BUILD:
            for(let voxel of doData.doList)
                addVoxel(voxel);
            this.doList.push(doData);
        break;       
        case enumUserOperationType.ERASE:
            deleteVoxels(doData.doList);
            this.doList.push(doData);
        break;
        case enumUserOperationType.COLOR:
        case enumUserOperationType.SHAPE:
        case enumUserOperationType.TEXTURE:
        {
            return this.do_(doData, this.doList);
        }
    }
    render();
    return true;
}

DoManager.prototype.do_ = function(doData, listDesc){
    if(null == doData )
        return false;
    let doData_ = new DoData();
    doData_.type = doData.type;
    let data;
    let func = null;
    if(doData.type == enumUserOperationType.COLOR) {
        func = this.changeColor;
    } else if(doData.type == enumUserOperationType.SHAPE) {
        func = this.changeShape;
    }else if(doData.type == enumUserOperationType.TEXTURE) {
        func = this.changeTexture;
    }
    if(null == func )
        return false;
    for(let i=doData.doList.length -1; i>= 0; --i) {
        data = func(doData.doList[i].voxel, doData.doList[i].data);
        if(null != data)
            doData_.doList.push(data);
    }
    if(doData_.doList.length > 0)
        listDesc.push(doData_);
    render();
    return true;
}


DoManager.prototype.changeColor = function(voxel_, newColor){
    if(voxel_.name == objectNames[enumObjectNames.CUBE]) {
        if(voxel_.material.color.getHexString() != newColor) {
            let data = {
                voxel: voxel_
                , data: voxel_.material.color.getHexString()
            };
            voxel_.material.color.set( "#" + newColor);
            return data;
        }
    }
    return null;
}

DoManager.prototype.changeShape = function(voxel_, newGeometryIndex){
    if(voxel_.name == objectNames[enumObjectNames.CUBE]) {
        if(voxel_.geometry.name != geometrys[newGeometryIndex].name) {
            let data = {
                voxel: voxel_
                , data: geometryIndexMap.get(voxel_.geometry.name)
            };            
            voxel_.geometry = geometrys[newGeometryIndex]
            return data;
        }
    }
    return null;
}

DoManager.prototype.changeTexture = function(voxel_, newTextureIndex){
    if(voxel_.name == objectNames[enumObjectNames.CUBE]) {
        if(voxel_.material.map.name != textures[newTextureIndex].name) {
            let data = {
                voxel: voxel_
                , data: textureIndexMap.get(voxel_.material.map.name)
            };
            voxel_.material.map = textures[newTextureIndex]
            return data;
        }
    }
    return null;
}


DoManager.prototype.prepareReplay = function(){
    if (this.doList.length <= 0) return false;
    this.replayList = [];
    this.isReplay = true;

    for(let i=this.doList.length - 1; i>=0; --i) {
        let doData = this.doList[i];
        switch(doData.type) {
            case enumUserOperationType.BUILD:
                deleteVoxels(doData.doList);
                this.replayList.push(doData);
            break;
            case enumUserOperationType.ERASE:
                for(let voxel of doData.doList){
                    addVoxel(voxel);
                }
                this.replayList.push(doData);
            break;
            case enumUserOperationType.COLOR:
            case enumUserOperationType.SHAPE:
            case enumUserOperationType.TEXTURE:
            {
                this.do_(doData, this.replayList);
            }
            break;            
        }
    }
    return true;
}

DoManager.prototype.replay = function() {
    let doData = this.replayList.pop();
    if(null == doData) {
        this.isReplay = false;
        this.replayList = null;
        return false;
    }
    switch(doData.type) {
        case enumUserOperationType.BUILD:
            for(let voxel of doData.doList){
                addVoxel(voxel);
            }
        break;
        case enumUserOperationType.COLOR:
            for(let i=doData.doList.length -1; i>= 0; --i){
                doData.doList[i].voxel.material.color.set( "#" + doData.doList[i].data );
            }
        break;
        case enumUserOperationType.ERASE:
            deleteVoxels(doData.doList);
        break;
        case enumUserOperationType.SHAPE:{
            for(let i=doData.doList.length -1; i>= 0; --i){                
                doData.doList[i].voxel.geometry = geometrys[doData.doList[i].data];
            }
        }
        break;
        case enumUserOperationType.TEXTURE:{
            for(let i=doData.doList.length -1; i>= 0; --i){
                doData.doList[i].voxel.material.map = textures[doData.doList[i].data]                
            }
        }
        break;
    }    
    return true;
}

