function setup(){
    ww = windowWidth;
    wh = windowHeight;
    canvas = createCanvas(ww,wh);
    rootX = ww/2
    rootY = wh
    endX = ww/2
    endY = wh-250
    rootVector = createVector(ww/2, wh)
    endVector = createVector(0, -150)
}

function tree(rootVector, endVector, height, angle, occerance) {
    this.rootVector = rootVector
    this.endVector = endVector
    this.height = height;
    this.angle = angle; 
    this.occerance = occerance;
}

tree.prototype.lengthFunc = function() {
    return p5.Vector.dist(this.rootVector, this.endVector);
}

tree.prototype.show = function(){
    if (this.occerance > 0) {
        // rotate(this.angle)
        push();
        translate(this.rootVector.x, this.rootVector.y)
        line(0,0, this.endVector.x, this.endVector.y);
        // rotate(-this.angle)
        var [leftChild, rightChild]= this.spawn();
        leftChild.show();
        rightChild.show();
        pop();
    }
    
}

tree.prototype.spawn = function() {
    var childLength = this.height*this.lengthFunc();
    var leftendVector = p5.Vector.mult(this.endVector, this.height)
    leftendVector.rotate(+(this.angle*PI)/180)
    var rightendVector = p5.Vector.mult(this.endVector, this.height)
    rightendVector.rotate(-(this.angle*PI)/180)
    // var childX = Math.sin((this.angle*PI)/180)*childLength;
    // var childY = Math.cos((this.angle*PI)/180)*childLength;
    var leftChild = new tree(this.endVector, leftendVector, this.height, this.angle , this.occerance-1)
    var rightChild = new tree(this.endVector, rightendVector, this.height, this.angle , this.occerance-1)
    // var leftChild = new tree(this.endX, this.endY, this.endX-childX, this.endY-childY,0.8,this.angle,this.occerance-1, this.currentAngle+this.angle);
    // var rightChild = new tree(this.endX, this.endY, this.endX+childX, this.endY-childY,0.8,this.angle,this.occerance-1,this.currentAngle+this.angle);
    return [leftChild, rightChild];
}

function draw(){
    var root = new tree(rootVector, endVector, 0.85, 25, 12);
    root.show()

}

