var canvas = [document.getElementById("knob1"),document.getElementById("knob2")];
var burner = [document.getElementById("burner"), document.getElementById("small-burner")];
document.getElementById("numpad-nums").value = "";

var on = false;
var beep = [document.getElementById('beep'), false]

function timer(num, type){
  let end = new Date();
  console.log(end);

  switch (type) {
    case "Hour(s)":
    end.setTime(end.getTime() + (num*60*60*1000))
      break;
    case "Minute(s)":
    end.setTime(end.getTime() + (num*60*1000))
      break;

    default:

  }
  // Update the count down every 1 second
on = true;
var x = setInterval(function() {




  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = end - now;

  // Time calculations for days, hours, minutes and seconds
  var hours = Math.floor(distance / (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  hours += Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="demo"
  document.getElementById("numpad-nums").value = hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if(on === false){
      clearInterval(x);
      document.getElementById("numpad-nums").value = "Timer Cancelled";
      document.getElementById("numpad-status").innerText = "Type To Set Timer";
    }
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("numpad-nums").value = "Timer Up";
    document.getElementById("numpad-status").innerText = "Type To Set Timer";
    on = false;
    beep[0].play();
    beep[1] = true;
  }
}, 1000);


}

function numpad (event) {
  let td = event.target;
  let nums = document.getElementById("numpad-nums");
  let type = document.getElementById("numpad-type");
  let status = document.getElementById("numpad-status");
if (beep[1] === true) {
beep[0].pause();
beep[1] = false;
}

  if(td.matches("td")){
    if(isNaN(td.innerText)){
      switch (td.innerText) {
        case "Delete":
        if(!isNaN(nums.value)){
        nums.value = nums.value.substr(0, nums.value.length-1);
      }
        if(on === true){
          on = false;
          document.getElementById("numpad-nums").value = "Timer Cancelled";
          document.getElementById("numpad-status").value = "Type To Set Timer";
        }
          break;
        case "Set":
        if(!isNaN(nums.value)){
          timer(nums.value, type.innerText);
          status.innerText = "Alarm In"
        }
        break;
        case "Minute(s)":
        type.innerText = "Hour(s)";
        break;
        case "Hour(s)":
        type.innerText ="Minute(s)";
        break;


        default:

      }
    }else if(on === false){
      if(isNaN(nums.value)){
        nums.value = "";
      }
      nums.value+=td.innerText;
      status.innerText = "Setting Timer For"
    }
  }

 }
 const characterList = document.querySelector('.numpad')
 characterList.addEventListener('click', numpad)

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
  ctx.fillStyle = '' + color;
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
