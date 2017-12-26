var w1, w2, w3, w4, w5, w6, w7, w8, w9
var run_animation_bool
$(document).ready(function(){

  $('#run').click(function(){
    $.ajax({
      url: '/run_XORNeuralNetwork',
      data: {"w1": w1, "w2": w2, "w3": w3, "w4": w4, "w5": w5, "w6": w6, "w7": w7, "w8": w8, "w9": w9},
      type: 'POST',
      success: function(data){
        update_values(data)
      }
    });
  });

  $('#run-constant').click(function(){
    if($(this).html() != "Pause"){
      runContinuous()
      $(this).html("Pause");
      $(this).addClass("w3-red");
    } else {
      $(this).html("Continue");
      $(this).removeClass("w3-red");
      $(this).addClass("w3-green");
    }
  });

  $('#reset').click(function(){
    reset()
  })

  $('#run-animation').click(function(){
    run_animation_bool = true;
  });

});

function reset(){
  $('#run-constant').html("Run continuously")
  $('#run-constant').removeClass("w3-red");
  $('#run-constant').addClass("w3-green");
  initialize()
  $('#output1').html("")
  $('#output2').html("")
  $('#output3').html("")
  $('#output4').html("")
  $('#error').html("")
  $('#iteration').html(0)

}

function run_animation(){
  ellipse(235, 75, 10, 10);
}

function initialize(){
  run_animation = false

  w1 = "w1"
  w2 = "w2"
  w3 = "w3"
  w4 = "w4"
  w5 = "w5"
  w6 = "w6"
  w7 = "w7"
  w8 = "w8"
  w9 = "w9"
}

function setup() {
  var canvas = createCanvas(900,450);
  actualWindowWidth = 900;
  actualWindowHeight = 450;
  canvas.parent('canvas-holder');
  //mono = loadFont("Quicksand-Light.otf", 10)
  //textFont(mono)
  initialize();
}

function draw() {
  background(255)
  ellipseMode(RADIUS)
  stroke(0, 0)
  // Layer 1

  fill(255, 243, 74)
  ellipse(175, 75, 50, 50)
  ellipse(175, 225, 50, 50)

  fill(74, 125, 255)
  ellipse(450, 75, 50, 50)
  ellipse(450, 225, 50, 50)

  fill(255, 74, 98)
  ellipse(725, 225, 50, 50)

  //Bias terms
  fill(255, 243, 74, 150)
  ellipse(175, 375, 50, 50)
  fill(74, 125, 255, 100)
  ellipse(450, 375, 50, 50)

  stroke(0)
  line(235, 75, 390, 75)
  line(235, 75, 390, 225)

  line(235, 225, 390, 75)
  line(235, 225, 390, 225)

  stroke(150, 100)
  line(235, 375, 390, 75)
  line(235, 375, 390, 225)

  fill(0)
  stroke(150, 100)

  textSize(24)
  text("i1", 165, 80)
  text("i2", 165, 230)
  text("b1", 165, 380)

  text("h1", 438, 80)
  text("h2", 438, 230)
  text("b2", 438, 380)
  textSize(12)
  text(w1, 310, 70)
  text(w2, 320, 110)
  text(w3, 370, 130)

  text(w4, 360, 190)
  text(w5, 335, 220)
  text(w6, 360, 265)

  stroke(0)
  line(510, 75, 660, 225)
  line(510, 225, 660, 225)
  stroke(150, 100)
  line(510, 375, 660, 225)

  text(w7, 600, 160)
  text(w8, 600, 220)
  text(w9, 600, 300)

  /*
  if (run_animation_bool) {
    ellipse(235, 75, 10, 10);
  }
  */
}

function runContinuous(){
  $.ajax({
    url: '/run_XORNeuralNetwork',
    data: {"w1": w1, "w2": w2, "w3": w3, "w4": w4, "w5": w5, "w6": w6, "w7": w7, "w8": w8, "w9": w9},
    type: 'POST',
    success: function(data){
      update_values(data)
    }
  }).done(function(){
    if($('#run-constant').html() == 'Pause') runContinuous();
  });
}

function update_values(data){
  w1 = data.weights1[0]
  w2 = data.weights1[1]
  w3 = data.weights1[2]
  w4 = data.weights1[3]
  w5 = data.weights1[4]
  w6 = data.weights1[5]

  w7 = data.weights2[0]
  w8 = data.weights2[1]
  w9 = data.weights2[2]

  $('#output1').html(data.f[0])
  $('#output2').html(data.f[1])
  $('#output3').html(data.f[2])
  $('#output4').html(data.f[3])

  $('#error').html(data.error)

  number = parseInt($('#iteration').html())
  $('#iteration').html(number + 1)
}


function arrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  push();
  translate(x2, y2+1);
  a = atan2(x1-x2, y2-y1);
  rotate(a);
  line(0, 0, -5, -5);
  line(0, 0, 5, -5);
  pop();
}


















  /*arrow(235, 55, 390, 55);
  arrow(235, 55, 390, 205);

  arrow(235, 225, 390, 75);
  arrow(235, 225, 390, 225);

  arrow(235, 375, 390, 95)
  arrow(235, 375, 390, 245)

  arrow(510, 225, 665, 225)*/
