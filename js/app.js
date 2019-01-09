const canvas = document.getElementById("c1");
const ctx = canvas.getContext("2d");

let R = 76;
let r = 76;
let d = 76;
let teta = 0;
let timer;
let startBool = false;
let myColor = "black";
let timeOut = 50;

let idStart = document.getElementById("start");

document.getElementById("color").oninput = function () {
	myColor = this.value;
}


const  spiro = function() {
	let x = (R-r)*Math.cos(teta) + d * Math.cos( (R-r) * teta / r);
	let y = (R-r)*Math.sin(teta) - d * Math.sin( (R-r) * teta / r);
	teta = teta + 0.1;
	ctx.fillRect(300 + 1 * x, 300 + 1 * y, 4, 4);
	ctx.fillStyle = myColor;
	timer = setTimeout(spiro, timeOut);
	RValue()
}


function RValue () {
	// ползунки
	let rv = document.getElementById("R");
	let rV = document.getElementById("r");
	let dV = document.getElementById("d");

	R = document.getElementById("rn").value
	r = document.getElementById("rN").value
	d = document.getElementById("dN").value

	//unput
	document.getElementById("rn").value = rv.value;
	document.getElementById("rN").value = rV.value;
	document.getElementById("dN").value = dV.value;
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
	ctx.clearRect(0, 0, 800, 600);
};


function star () {
	console.log("star");
}