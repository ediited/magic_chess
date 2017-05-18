var singleField = 50;
var scribble = new Scribble();   
var magnet = new partMover(200,200);
var rook_blk ;
var piecesArray = [];




function setup(){
  	
	createCanvas(singleField*10,singleField*10);
	rectMode(CENTER,CENTER);
	rook_blk = new chessPiece(100,100,loadImage("assets/Chess_pdt60.png"));

	
}


function draw(){
	background(255);
 	drawField();
 	magnet.move();
 	magnet.draw();
 	rook_blk.draw();
}

function drawField(){
	var  colorCounter = 0;
	for (var i = 1; i< 9; i++){
		for (var j = 1; j < 9;j++){
			
			fill(100);
			if(colorCounter%2==0){
				fill(255)
			}
			rect(i*singleField+singleField/2,j*singleField+singleField/2,singleField,singleField);
			//scribble.scribbleRect(i*singleField+singleField/2,j*singleField+singleField/2,singleField,singleField);
			colorCounter++;
		}	
		colorCounter++;
	}

}


function partMover(startPosX,startPosY){
	this.currentX = startPosX;	
	this.currentY = startPosY;
	this.targetX  = this.currentX;
	this.targetY   = this.currentY;
	this.directionX = 0.5;
	this.directionY = 0.5;
	this.isMagnetic = false;



	this.draw = function(){	
		rectMode(CENTER,TOP);
		fill(220,220,220);
		rect(this.currentX,0,4,height*2);
		rectMode(LEFT,CENTER);
		rect(0,this.currentY,width*2,4);
		fill(0,200,0);
		ellipse(this.currentX,this.currentY,30,30);
	}	


	this.move = function(){

			if(this.currentX>this.targetX){
				this.currentX-=this.directionX;
			}
			if(this.currentX<this.targetX){
				this.currentX+=this.directionX;
			}
			if(this.currentY>this.targetY){
				this.currentY-=this.directionY;
			}
			if(this.currentY<this.targetY){
				this.currentY+=this.directionY;
			}
		}
	
	this.reachedMove = function(){
		if((abs(this.currentX-this.targetX)<1)&&(abs(this.targetY-this.currentY)<1)){
			return true;
		}
	}

	this.startMove = function(moveToX,moveToY){
		this.targetX = moveToX;
		this.targetY = moveToY;

	}



}

function mouseDragged(){
	magnet.startMove(mouseX,mouseY);
}

function chessPiece (startX,startY,startImage){
	this.moveSheme;
	this.image = startImage;
	this.startPosX = startX;
	this.startPosY = startY;
	this.currentX = this.startPosX;
	this.currentY = this.startPosY;


	this.draw = function(){
		imageMode(CENTER,CENTER);
		image(this.image,this.currentX,this.currentY);
	
	}

}