function setup(){
    ww = windowWidth;
    wh = windowHeight;
    canvas = createCanvas(ww,wh);
}

function tree(rootX,rootY, endX, endY, height, angle, occerance) {
    this.rootX = rootX;
    this.rootY =  rootY;
    this.endX = endX;
    this.endY = endY;
    this.height = height;
    this.angle = angle; 
    this.occerance = occerance
}

tree.prototype.lengthFunc = function() {
    return Math.sqrt((this.endX-this.rootX)**2 + (this.endY-this.rootY)**2)
}

tree.prototype.show = function(){
    if (this.occerance > 0) {
        line(this.rootX, this.rootY, this.endX, this.endY);
        var [leftChild, rightChild]= this.spawn();
        leftChild.show();
        rightChild.show();
    }
    
}

tree.prototype.spawn = function() {
    var childLength = this.height*this.lengthFunc();
    var childX = Math.sin(((this.angle-30)*PI)/180)*childLength;
    var childY = Math.cos(((this.angle+30)*PI)/180)*childLength;
    var leftChild = new tree(this.endX, this.endY, this.endX-childX, this.endY-childY,0.8,this.angle+30,this.occerance-1);
    var rightChild = new tree(this.endX, this.endY, this.endX+childX, this.endY-childY,0.8,this.angle-30,this.occerance-1);
    return [leftChild, rightChild];
}

function draw(){
    var root = new tree(ww/2, wh, ww/2, wh-250, 0.8,30,10);
    root.show()

}

