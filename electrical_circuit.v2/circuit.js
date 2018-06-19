//global variable definition

let x=0;
let y=0;
let d=0; // circle diameter
let col=[];  // Array of used colors in RGB 
let spots=[]; //Array of all circles drawn 
let count = 0; //counter of drawn circles
let attempt = 0; //counter for attempts 
let dir =  [0,1,2,3,4]; // define movement directions: 0 - remain, 1 - up, 2 - right, 3 - down, 4 - left



function setup() {
	cnv = createCanvas(4965,3510);
	background(255);
	strokeWeight(4);
	noFill();
	col[0]=[106,81,60];
	col[1]=[80,118,86];
	col[2]=[65,75,117];
	x = random (width);
	y = random(height);
	
}	

function pickColor() { //function to randomly pick-up next color from array 
c =(random(3));
	if (c < 1) {
		return col[0];
		} else if (c > 1 && c < 2) {
			return col[1];
			} else if (c > 2) {
				return col[2];
				}
}

function validSpot () {
attempt++;
valid=true;

console.log ('count=', count, ' attempts=', attempt);


if (attempt > width/50) {
	noLoop();
	console.log ('Finished - attempts number exidede', int(width/50));
	}




// pick-up next direction and calculate next circle centre
nextDir = random(dir); 
	if (nextDir == 0) {
		nextX = x;
		nextY = y;
	}
	 if (nextDir == 1) {
		nextX = x;
		nextY = y - dm;
	}
	if (nextDir == 2) {
		nextX = x + dm;
		nextY = y;
	} 
	if (nextDir == 3) {
		nextX = x;
		nextY = y + dm;
	} 
	if (nextDir == 4) {
		nextX = x - dm;
		nextY = y;
	}
//
	
	
	if ( nextX + d + 25 > width || nextX - d - 25 < 0 || nextY + d + 25 > height || nextY - d -25 < 0) { // check if circle will touch canvas borders + 25 pixels and do not draw it
		valid = false;
	} 
//

	
	if (nextDir !=0){ // check if circle will overlap with existing
		for (i = 0; i < spots.length; i++){
				sx = spots[i][0];
				sy = spots[i][1];
				sd = spots[i][2];
				let dx = dist (nextX, nextY, sx, sy);
					if (dx < d + sd){
						valid=false;
					}
		}
	}	
//

	if (nextDir ==0){	// if next circle will not move check it will not overlap
		ind = spots.length - 1;
			if (d > spots[ind][2]) {
				valid=false;
			}
	}

	
//
}





function draw() {
	clr=pickColor();
	stroke (clr);
	d = random (width/150,width/20); // circle diameter
	dm = random (width/40, width/5); //line length
	
if (count == 0) {
	//starting circle
	console.log('start');
	strokeWeight(4);
	ellipse (x, y, 2);
	strokeWeight(d/6);
	ellipse (x, y, d);
	spots.push([x, y, d]);
	strokeWeight(4);
	count++;
	}
	
validSpot();	

	
if (valid) {		
		line(x, y, nextX, nextY);
		x=nextX;
		y=nextY;
		strokeWeight(4);
		ellipse (x, y, 2);
		strokeWeight(d/6);
		ellipse (x, y, d);
		spots.push([x, y, d]);
		strokeWeight(4);
		count++;
		attempt=0;
		}
		

if (count > width/10) {
	noLoop();
	console.log ('Finished');
	}
}