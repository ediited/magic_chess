var singleField = 52;
var scribble = new Scribble();   
var magnet = new partMover(singleField,singleField);
var piecesArray = [];
var buchs=["a","b","c","d","e","f","g","h","i"];




function setup(){
  	
	createCanvas(singleField*10,singleField*10);
	rectMode(CENTER,CENTER);
	createPieces();	
}


function draw(){

	background(255);
 	drawField();

 	magnet.move();
 	magnet.draw();

 	moveAllPieces();
 	drawAllPieces();


}


function partMover(startPosX,startPosY){	
	this.moveQueue = [0];
	this.currentX = startPosX;	
	this.currentY = startPosY;
	this.targetX  = this.currentX;
	this.targetY   = this.currentY;
	this.directionX = 1;
	this.directionY = 1;
	this.isMagnetic = false;
	this.firstTime = true;
	this.notHomeMove = true;



	this.draw = function(){	
		rectMode(CENTER,TOP);
		fill(220,220,220);
		rect(this.currentX,0,4,height*2);
		rectMode(LEFT,CENTER);
		rect(0,this.currentY,width*2,4);
		fill(0,200,0);
		if(this.isMagnetic){fill(200,0,0);}
		ellipse(this.currentX,this.currentY,30,30);

	}	



	//moves in above stated step size towards the target, does nothing if reached
	//but is called anyway
	this.move = function(){
	
		if(this.moveQueue.length>0){
		
		this.targetX = posToCoord(this.moveQueue[this.moveQueue.length-1][0]);
		this.targetY = posToCoord(this.moveQueue[this.moveQueue.length-1][1]);
		//console.log("this should trigger");
		
		if (this.firstTime){

			this.moveQueue.pop();
			this.firstTime = false;
		}

		}

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
		
			if (this.currentX == this.targetX && this.currentY == this.targetY&&magnet.moveQueue.length>0){
				moveAllPieces();
				magnet.moveQueue.pop();
				
				console.log("finished move");
			
			if (this.isMagnetic&&this.notHomeMove){
				this.unGrip();
				this.isMagnetic = false;
				}
			else{
				this.isMagnetic = true;
				this.grip();
				}
		
			}
	
		}
	
	//tests the move finished
	this.reachedMove = function(){
		if((abs(this.currentX-this.targetX))&&(abs(this.targetY-this.currentY))){
			return true;
		}
	}

	//setter for the tarfet coordinates
	this.startMove = function(moveToX,moveToY){
		this.targetX = moveToX;
		this.targetY = moveToY;

	}

	//activates the electromagnet, grips the piece at that position
	this.grip = function(){

	if (findPieceAt(this.currentX,this.currentY)!==null){
		findPieceAt(this.currentX,this.currentY).gripped = true;
		this.isMagnetic = true;
		}
	}

	this.moveTo= function(toLetter,toNumber){
		this.startMove(posToCoord(toLetter),posToCoord(toNumber));
	}

	this.unGrip = function(){
		findPieceAt(this.currentX,this.currentY).gripped = false;
		this.isMagnetic = false;
	}


}

function chessPiece (startX,startY,startImage,pieceType){
	this.moveSheme;
	this.image = startImage;
	this.startPosX = startX;
	this.startPosY = startY;
	this.currentX = this.startPosX;
	this.currentY = this.startPosY;
	this.gripped = false;

	this.draw = function(){
		imageMode(CENTER,CENTER);
		image(this.image,this.currentX,this.currentY,45,45);
	
	}

	this.move = function(){
	if (this.gripped){
		this.currentX = magnet.currentX;
		this.currentY = magnet.currentY;
		}
		
 	}


}



function drawAllPieces(){
	for (var i = 0; i<piecesArray.length;i++){
		piecesArray[i].draw();
	}
}

function moveAllPieces(){
	for (var i = 0; i < piecesArray.length;i++){
		piecesArray[i].move();
	}
}

function findPieceAt(xCoordSearch,yCoordSearch){
	for (var i = 0; i < piecesArray.length;i++){
		if((piecesArray[i].currentX == xCoordSearch) && (piecesArray[i].currentY == yCoordSearch)){
			return piecesArray[i];
		}

	}
	return null;
}
function addPiece(addedPiece){
	piecesArray[piecesArray.length]=addedPiece;
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
	
	fill(0)
	textAlign(CENTER,CENTER);
	
	for (var i = 1;i<9;i++){
		text(buchs[i-1],i*singleField+singleField/2,singleField/2);
	}
		for (var i = 1;i<9;i++){
		text(buchs[i-1],i*singleField+singleField/2,singleField/2+singleField*9);
	}
	for (var i = 8 ; i > 0 ; i--){	
		text(9-i,25,singleField*i+singleField/2);
	}
	for (var i = 8 ; i > 0 ; i--){	
		text(9-i,singleField/2+singleField*9,singleField*i+singleField/2);
	}
}

function posToCoord(pos){
	switch(pos){
		case "A": return singleField*1+singleField/2;
			break;
		case "B": return singleField*2+singleField/2;
			break;
		case "C": return singleField*3+singleField/2;
			break;
		case "D": return singleField*4+singleField/2;
			break;
		case "E": return singleField*5+singleField/2;
			break;
		case "F": return singleField*6+singleField/2;
			break;
		case "G": return singleField*7+singleField/2;
			break;
		case "H": return singleField*8+singleField/2;
			break;
		case 1: return singleField*8+singleField/2;
			break;
		case 2: return singleField*7+singleField/2;
			break;
		case 3: return singleField*6+singleField/2;
			break;
		case 4: return singleField*5+singleField/2;
			break;
		case 5: return singleField*4+singleField/2;
			break;
		case 6: return singleField*3+singleField/2;
			break;
		case 7: return singleField*2+singleField/2;
			break;
		case 8: return singleField*1+singleField/2;
			break;
		}	
	}

function chessMove(fromLetter,fromNumber,toLetter,toNumber){
	if(findPieceAt(posToCoord( fromLetter),posToCoord(fromNumber))==null){
		
	}
	else{

	checkLegal(findPieceAt(posToCoord( fromLetter),posToCoord(fromNumber)));
	checkCapture();


	magnet.moveQueue[magnet.moveQueue.length] =([toLetter,toNumber]);
	magnet.moveQueue[magnet.moveQueue.length]=([fromLetter,fromNumber]);

}
}
function createPieces(){
	//Blk Pawns
	addPiece(new chessPiece(posToCoord("A"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw"));
	addPiece(new chessPiece(posToCoord("B"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw"));
	addPiece(new chessPiece(posToCoord("C"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw"));
	addPiece(new chessPiece(posToCoord("D"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw"));
	addPiece(new chessPiece(posToCoord("E"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw"));
	addPiece(new chessPiece(posToCoord("F"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw"));
	addPiece(new chessPiece(posToCoord("G"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw"));
	addPiece(new chessPiece(posToCoord("H"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw"));	
	//blk king
	addPiece(new chessPiece(posToCoord("E"),posToCoord(8),loadImage("assets/Chess_kdt60.png"),"blkKi"));
	//blk queen
	addPiece(new chessPiece(posToCoord("D"),posToCoord(8),loadImage("assets/Chess_qdt60.png"),"blkQu"));
	//blk bishop 
	addPiece(new chessPiece(posToCoord("C"),posToCoord(8),loadImage("assets/Chess_bdt60.png"),"blkBi"));
	addPiece(new chessPiece(posToCoord("F"),posToCoord(8),loadImage("assets/Chess_bdt60.png"),"blkBi"));
	//blk knight
	addPiece(new chessPiece(posToCoord("B"),posToCoord(8),loadImage("assets/Chess_ndt60.png"),"blkKn"));
	addPiece(new chessPiece(posToCoord("G"),posToCoord(8),loadImage("assets/Chess_ndt60.png"),"blkKn"));
	//blk rook
	addPiece(new chessPiece(posToCoord("A"),posToCoord(8),loadImage("assets/Chess_rdt60.png"),"blkRo"));
	addPiece(new chessPiece(posToCoord("H"),posToCoord(8),loadImage("assets/Chess_rdt60.png"),"blkRo"));
	
	//wht Pawns 
	addPiece(new chessPiece(posToCoord("A"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw"));	
	addPiece(new chessPiece(posToCoord("B"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw"));
	addPiece(new chessPiece(posToCoord("C"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw"));
	addPiece(new chessPiece(posToCoord("D"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw"));
	addPiece(new chessPiece(posToCoord("E"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw"));
	addPiece(new chessPiece(posToCoord("F"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw"));
	addPiece(new chessPiece(posToCoord("G"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw"));
	addPiece(new chessPiece(posToCoord("H"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw"));
	//wht king
	addPiece(new chessPiece(posToCoord("E"),posToCoord(1),loadImage("assets/Chess_klt60.png"),"whtKi"));
	//wht queen
	addPiece(new chessPiece(posToCoord("D"),posToCoord(1),loadImage("assets/Chess_qlt60.png"),"whtQu"));
	//wht bishop 
	addPiece(new chessPiece(posToCoord("C"),posToCoord(1),loadImage("assets/Chess_blt60.png"),"whtBi"));
	addPiece(new chessPiece(posToCoord("F"),posToCoord(1),loadImage("assets/Chess_blt60.png"),"whtBi"));
	//wht knight
	addPiece(new chessPiece(posToCoord("B"),posToCoord(1),loadImage("assets/Chess_nlt60.png"),"whtKn"));
	addPiece(new chessPiece(posToCoord("G"),posToCoord(1),loadImage("assets/Chess_nlt60.png"),"whtKn"));
	//wht rook
	addPiece(new chessPiece(posToCoord("A"),posToCoord(1),loadImage("assets/Chess_rlt60.png"),"whtRo"));
	addPiece(new chessPiece(posToCoord("H"),posToCoord(1),loadImage("assets/Chess_rlt60.png"),"whtRo"));
}

function checkCheck(){

}

function checkLegal(pieceToCheck,fromLe,fromNu,toLe,toNu){
switch(pieceToCheck.pieceType){
case "blkPw":
		


		break;





}




}

function checkCapture(){

}