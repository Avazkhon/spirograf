
const canvas = document.getElementById("c1");
const ctx = canvas.getContext("2d");


const randomColor = ["red", "green", "blue", "yellow"]
let element = "start";
let R = 0;
let r = 0;
let d = 0;
let teta = 0;
let timer;
let startBool = false;
let myColor = "black";
let timeOut = 100;

let idStart = document.getElementById("start");

document.getElementById("color").oninput = function () {
	myColor = this.value;
}

const  spiro = function() {
	let x = (R-r)*Math.cos(teta) + d * Math.cos( (R-r) * teta / r);
	let y = (R-r)*Math.sin(teta) - d * Math.sin( (R-r) * teta / r);
	ctx.fillStyle = myColor;
	timeOut = 5;
	teta = teta + 0.1;
	ctx.fillRect(400 + 1 * x, 400 + 1 * y, 4, 4);
	timer = setTimeout(spiro, timeOut);
	timeOut = document.getElementById('speedRange').value;
	RValue()
}


function RValue () {
	if(element == "start") {
			// ползунки
		let rv = document.getElementById("R");
		let rV = document.getElementById("r");
		let dV = document.getElementById("d");

		R = document.getElementById("rn").value
		r = document.getElementById("rN").value
		d = document.getElementById("dN").value

		// unput
		document.getElementById("rn").value = rv.value;
		document.getElementById("rN").value = rV.value;
		document.getElementById("dN").value = dV.value;
	}
	if(element == "star") {
		R = 150;
		r = 90;
		d = 80;

		timeOut = 5;
	}
	if(element=="fire") {
		R =  Math.floor(150*Math.random())
		r =  Math.floor(150*Math.random())
		d =  Math.floor(150*Math.random())
	}

};


function start () {
	if(!startBool) {
		spiro();
		startBool = true;
		idStart.value = "reload";
	}
	else if (startBool) {
		window.location.reload();
		startBool = false;
		idStart.value = "start";
	}
	else {
		console.log("err")
	}
};

function clearDraw () {
	ctx.clearRect(0, 0, 800, 800);
};


function star () {
	start();
	element = "star";
}


////////////////////////////
function fire () {
	let teta = 397.5;
	let x = 395;
	let y = 750;
	zenit()

	function zenit () {
		let r = Math.floor(10*Math.random())
		let color = Math.floor(Math.random()*randomColor.length)
		teta = teta + 2.5;
		if(teta <=445) {
			ctx.fillStyle = randomColor[color];
			ctx.fillRect(x-(r), y-teta, 1, 3)
			ctx.clearRect(x-10, y-teta+30, 15, 15);

		}
		if(teta>=400) {
			clearDraw();
			salut();
			RValue();
			teta=0;
			element = "fire";
		}
		setTimeout(zenit, 5);
	}

	function salut() {

		let x = (R-r)*Math.cos(teta) + d * Math.cos( (R-r) * teta / r);
		let y = (R-r)*Math.sin(teta) - d * Math.sin( (R-r) * teta / r);

		ctx.fillRect(x+390, y+300, 2, 2);
		if(teta<=400) {
			 setTimeout(salut, 5);
		}
	}
}

////////

canvas.onclick = function(event){
	let x = event.offsetX;
	let y = event.offsetY;
	let count = 5;
	let circle = new Path2D();
	function big () {
		count = count + 10;
		r++
		ctx.fillStyle = myColor;
	    circle.arc(x, y, count, 0, Math.PI*2);
	    ctx.stroke(circle);
	  	if(count <= 50) {
	   		setTimeout(big, 100 )
	   	}
	  	if(count > 50) {
	   		ctx.clearRect(0, 0, 800, 800)
	   }
	}big()
}