var singleField = 52;
var magnet = new partMover(singleField,singleField);
var piecesArray = [];
var buchs=["A","B","C","D","E","F","G","H","I"];
var blackDown = 0;
var whiteDown = 0;
var autoPlay = true;
var chess = new Chess();


function setup(){
  	
	createCanvas(singleField*10,singleField*10);
	rectMode(CENTER,CENTER);
	createPieces();	
}




//var Chess = require('./libraries/chess').Chess;
/*
function draw(){
	frameRate(1);



if (!chess.game_over()) {
  var moves = chess.moves();
  var move = moves[Math.floor(Math.random() * moves.length)];
  chess.move(move);
  console.log(chess.ascii());
}

}
*/

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
	this.directionX = 2;
	this.directionY = 2;
	this.isMagnetic = false;
	this.firstTime = true;
	this.notHomeMove = true;
	this.currentGrip;



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
		
			if (abs(this.currentX-this.targetX) <= 1 &&  abs(this.currentY -this.targetY) <= 1 && magnet.moveQueue.length>0){
				moveAllPieces();
				magnet.moveQueue.pop();
				
				console.log("finished move");
			
			if (this.isMagnetic){
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

	if (findPieceAt(this.currentX,this.currentY)!=null){
		findPieceAt(this.currentX,this.currentY).gripped = true;
		this.currentGrip=(findPieceAt(this.currentX,this.currentY));
		this.isMagnetic = true;
		}
	}

	this.moveTo= function(toLetter,toNumber){
		this.startMove(posToCoord(toLetter),posToCoord(toNumber));
	}

	this.unGrip = function(){
		this.currentGrip.gripped = false;
		this.currentGrip = null;
		this.isMagnetic = false;

	}

	this.return = function(){
		this.moveQueue.push(["X",9]);
		//this.targetX = singleField;
		//this.targetY = singleField;
	}


}

function chessPiece (startX,startY,startImage,pieceType,startPX,startPY){
	this.moveSheme;
	this.image = startImage;
	this.startPosX = startX;
	this.startPosY = startY;
	this.currentX = this.startPosX;
	this.currentY = this.startPosY;
	this.gripped = false;
	this.originalPosX = startPX;
	this.originalPosY = startPY;

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
		case "X": return singleField;
			break;
		case "GB": return round(singleField*5-singleField/16+singleField/16*blackDown);
			break;
		case "GW": return round(singleField*5-singleField/16+singleField/16*blackDown);
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
		case 9: return singleField;
			break;
		case 10: return round(singleField*9+singleField/2);
				//graveyard Black
			break;
		case 11: return round(singleField/2);//graveyard white
			break;
		}	
	}

function chessMove(fromLetter,fromNumber,toLetter,toNumber){
	if(findPieceAt(posToCoord(fromLetter),posToCoord(fromNumber))==null){
		
	}
	else{
	magnet.moveQueue[magnet.moveQueue.length] =([toLetter,toNumber]);
	magnet.moveQueue[magnet.moveQueue.length]=([fromLetter,fromNumber]);

}
}
function createPieces(){
	//Blk Pawns
	addPiece(new chessPiece(posToCoord("A"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw","A",7));
	addPiece(new chessPiece(posToCoord("B"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw","B",7));
	addPiece(new chessPiece(posToCoord("C"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw","C",7));
	addPiece(new chessPiece(posToCoord("D"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw","D",7));
	addPiece(new chessPiece(posToCoord("E"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw","E",7));
	addPiece(new chessPiece(posToCoord("F"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw","F",7));
	addPiece(new chessPiece(posToCoord("G"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw","G",7));
	addPiece(new chessPiece(posToCoord("H"),posToCoord(7),loadImage("assets/Chess_pdt60.png"),"blkPw","H",7));	
	//blk king
	addPiece(new chessPiece(posToCoord("E"),posToCoord(8),loadImage("assets/Chess_kdt60.png"),"blkKi","E",8));
	//blk queen
	addPiece(new chessPiece(posToCoord("D"),posToCoord(8),loadImage("assets/Chess_qdt60.png"),"blkQu","D",8));
	//blk bishop 
	addPiece(new chessPiece(posToCoord("C"),posToCoord(8),loadImage("assets/Chess_bdt60.png"),"blkBi","C",8));
	addPiece(new chessPiece(posToCoord("F"),posToCoord(8),loadImage("assets/Chess_bdt60.png"),"blkBi","F",8));
	//blk knight
	addPiece(new chessPiece(posToCoord("B"),posToCoord(8),loadImage("assets/Chess_ndt60.png"),"blkKn","B",8));
	addPiece(new chessPiece(posToCoord("G"),posToCoord(8),loadImage("assets/Chess_ndt60.png"),"blkKn","G",8));
	//blk rook
	addPiece(new chessPiece(posToCoord("A"),posToCoord(8),loadImage("assets/Chess_rdt60.png"),"blkRo","A",8));
	addPiece(new chessPiece(posToCoord("H"),posToCoord(8),loadImage("assets/Chess_rdt60.png"),"blkRo","H",8));
	
	//wht Pawns 
	addPiece(new chessPiece(posToCoord("A"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw","A",2));	
	addPiece(new chessPiece(posToCoord("B"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw","B",2));
	addPiece(new chessPiece(posToCoord("C"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw","C",2));
	addPiece(new chessPiece(posToCoord("D"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw","D",2));
	addPiece(new chessPiece(posToCoord("E"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw","E",2));
	addPiece(new chessPiece(posToCoord("F"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw","F",2));
	addPiece(new chessPiece(posToCoord("G"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw","G",2));
	addPiece(new chessPiece(posToCoord("H"),posToCoord(2),loadImage("assets/Chess_plt60.png"),"whtPw","H",2));
	//wht king
	addPiece(new chessPiece(posToCoord("E"),posToCoord(1),loadImage("assets/Chess_klt60.png"),"whtKi","E",1));
	//wht queen
	addPiece(new chessPiece(posToCoord("D"),posToCoord(1),loadImage("assets/Chess_qlt60.png"),"whtQu","D",1));
	//wht bishop 
	addPiece(new chessPiece(posToCoord("C"),posToCoord(1),loadImage("assets/Chess_blt60.png"),"whtBi","C",1));
	addPiece(new chessPiece(posToCoord("F"),posToCoord(1),loadImage("assets/Chess_blt60.png"),"whtBi","F",1));
	//wht knight
	addPiece(new chessPiece(posToCoord("B"),posToCoord(1),loadImage("assets/Chess_nlt60.png"),"whtKn","B",1));
	addPiece(new chessPiece(posToCoord("G"),posToCoord(1),loadImage("assets/Chess_nlt60.png"),"whtKn","G",1));
	//wht rook
	addPiece(new chessPiece(posToCoord("A"),posToCoord(1),loadImage("assets/Chess_rlt60.png"),"whtRo","A",1));
	addPiece(new chessPiece(posToCoord("H"),posToCoord(1),loadImage("assets/Chess_rlt60.png"),"whtRo","H",1));
}

function checkCheck(){
	//was ein dummer funktionsname

}

function checkLegal(pieceToCheck,fromLe,fromNu,toLe,toNu){
	//hehehehehhe
	//das macht chess.js für mich 





}

function checkCapture(){
	//muss noch gemacht werden :( 

}

function openingExample(){
	
	chessMove("E",7,"E",6);
	chessMove("E",2,"E",4);
	chessMove("D",7,"D",5);
	chessMove("D",2,"D",4);


	
}