var canvas = [document.getElementById("knob1"),document.getElementById("knob2")];
var burner = [document.getElementById("burner"), document.getElementById("small-burner")];

function draw(){
  for (var i = 0; i < canvas.length; i++) {
    var ctx = canvas[i].getContext("2d");
    var radius = canvas[i].height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90
    drawKnob(ctx, radius)
    drawHand(ctx, ang, 40, 6)
  }

  for (var i = 0; i < burner.length; i++) {
    var ctx = burner[i].getContext("2d");
    var radius = burner[i].height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    drawBurner(ctx, radius, 'darkgray');
    update(i+1);
  }

}


function drawBurner(ctx, radius, color){
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
  drawLines(ctx, radius);
}

function drawKnob(ctx, radius){
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'gray';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
  drawNumbers(ctx, radius);
  ang = -4 * Math.PI /6;

}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  var i = -4;
  ctx.font = radius * 0.15 + "px arial";
  ctx.fillStyle = "ghostwhite";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for(num = 400; num >= 0; num-=50, i++){
    ang = i * Math.PI /6;
    ctx.rotate(-ang);
    ctx.translate(0, -radius * 0.8);
    ctx.rotate(ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(-ang);
    ctx.translate(0, radius * 0.8);
    ctx.rotate(ang);
  }
}

function drawLines(ctx, radius) {
var ang;
var num;
ctx.font = radius * 0.15 + "px arial";
ctx.textBaseline = "middle";
ctx.textAlign = "center";
for(num = 1; num < 13; num++){
  ang = num * Math.PI / 6;
  ctx.rotate(ang);
  ctx.translate(0, -radius * 0.85);
  ctx.rotate(-ang);
  ctx.moveTo(0,0);
  ctx.lineTo(10,5);
  ctx.stroke();
  ctx.rotate(ang);
  ctx.translate(0, radius * 0.85);
  ctx.rotate(-ang);
}
}


function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0,0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

function update(i){

  i = parseInt(i);
  var pos = parseFloat(document.getElementById("range" + i).value);
  i--;
  var ctx =  canvas[i].getContext("2d");
  var radius = canvas[i].height / 2;


  drawKnob(ctx, radius);
  drawHand(ctx, pos, 40, 6)

  ctx = burner[i].getContext("2d");
  radius = burner[i].height/2;
  var color;
  if(pos < 5){
    color="darkgray";
  }
  else if(pos < 7.4){
    color="darkorange";
  }
  else{
    color = "red";
  }

  drawBurner(ctx, radius, color);

}
