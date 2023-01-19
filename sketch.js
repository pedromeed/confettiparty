var blobs = [];
var colors;
let variation = 0;
let xScale, yScale, centerX, centerY;

//auto change
let changeDuration = 3000;
let lastChange = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(40)
  
  
	xScale = width/60;
	yScale = height/20*(width/height);
	
	centerX = width/2;
	centerY = height/2;
	
	colors = [color("#80ed99"), color("#f72585"), color("#f72585"), color("#4cc9f0"), color("#FFC30F")];
  
}

function draw() {
	background("#1a0633");
	//DEBUG
	textSize(20);
	noStroke();
	fill(255);
	ellipse(centerX, centerY, 60, 60);
	fill(0);
	text(variation, centerX, centerY-10);
	text(length, centerX, centerY+10);
	
	
	if(mouseIsPressed){
		for(let i = 0; i < 50; i++){
			let x = mouseX + random(-15, 15);
			let y = mouseY + random(-10, 10);
			var blob = {
				x : getXPos(x),
				y : getYPos(y),
				size : random(1, 2),
				lastX : x,
				lastY : y,
				color : colors[floor(random(colors.length))],
				direction : random(0.1, 5) * (random() > 0.5 ? 1 : -1)
			};
			blobs.push(blob);
		}
	}
	
  
	var length = blobs.length;
	if(length == 0){
		background("#14213d");
		noStroke();
		fill(255);
		textSize(40);
		//text("CLICK", x = width / 2, y = height / 2);
    text("START", centerX-50, centerY-10); // os valores a negativo sao para posicionar corretamente a palavra no centro
	
		return;
	}
	
	noStroke();
	fill("#14213d");
	rect(0, 0, width, height);
	
	//auto change
	let time = millis();
	if(time - lastChange > changeDuration) {
		lastChange = time;
		variation++;
		if(variation>0) variation = 0
	}

	var stepsize = deltaTime*0.001;
	for(var i = length-1; i >= 0; i--){
		let blob = blobs[i];

		var x = getSlopeX(blob.x, blob.y);
		var y = getSlopeY(blob.x, blob.y);
		blob.x += blob.direction * x * stepsize;
		blob.y += blob.direction * y * stepsize;
		
		x = getXPrint(blob.x);
		y = getYPrint(blob.y);
		stroke(blob.color);
		strokeWeight(blob.size);
		line(x, y, blob.lastX, blob.lastY);
		blob.lastX = x;
		blob.lastY = y;
		
		const border = 7
		if(x < -border || y < -border || x > width+border || y > height+border){
			blobs.splice(i,1);
		}
	}
 
}

function getSlopeY(x, y){
	switch(variation){
case 0:return Math.sin(y=random(5,65,4))
        //se 0:return Math.sin(x);
  }
	}
function getSlopeX(x,y){
	switch(variation){
		//se 0:return Math.sin(x=random(25,5,5))
        case 0:return Math.sin(y);
    
	}
}

function getXPos(x){
	return (x-centerX)/xScale;
}
function getYPos(y){
	return (y-centerY)/yScale;
}

function getXPrint(x){
	return xScale*x+centerX;
}
function getYPrint(y){
	return yScale*y+centerY;
}