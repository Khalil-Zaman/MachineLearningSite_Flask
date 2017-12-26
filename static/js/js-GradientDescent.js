$(document).ready(function(){
  draw_graph();

  $('#run-constant').click(function(){
      if (checkXY()) {
        if($(this).html() != "Pause"){
          runContinuous()
          $(this).html("Pause");
          $(this).addClass("w3-red");
          $('#X-values').attr('disabled', true);
          $('#Y-values').attr('disabled', true);
        } else {
          $(this).html("Continue");
          $(this).removeClass("w3-red");
          $(this).addClass("w3-green");
          $('#X-values').attr('disabled', false);
          $('#Y-values').attr('disabled', false);
        }
      }
  });

  $('#reset').click(function(){
    $('#error').html(0);
    $('#w0').html(0);
    $('#w1').html(0);
    $('#iteration-number').html(0);
    $('#run-constant').removeClass("w3-red").removeClass("w3-green");
    $('#run-constant').html("Run continuously")
    clearInterval(it);
    draw_graph();
  });

  $('#run').click(function(){
      if (checkXY()) {
        $('#run').html('Computing');
        $('#run').css('background-color', '#FF7105');
        runLR();
      }
  });

});

// This function makes sure there are as many X values as Y values
function checkXY(){
  X = getXValue();
  X = X.split(",");
  Y = getYValue();
  Y = Y.split(",");
  if (Y.length != X.length){
    $('#error').css('color', 'red');
    $('#error').html("Please make sure you have the same number of inputs as outputs")
    return false;
  }
  return true;
}

function runContinuous(){
  y = getYValue();
  x = getXValue();
  w = getWValue();
  a = getAValue();
  $.ajax({
    url: '/run_iteration',
    data: {"W": w, "X": x, "Y": y, "A": a},
    type: 'POST',
    success: function(data){
      $('#w0').html(data.weights[0]);
      $('#w1').html(data.weights[1]);

      $('#error').html(data.error);

      iteration_number = parseInt($('#iteration-number').html());
      $('#iteration-number').html(iteration_number+ 1);

      lineY = data.F;
      y0 = lineY[0];
      yn = lineY[1];

      draw_graph(y0, yn);
    }
  }).done(function(){
    if ($('#run-constant').html() == "Pause"){
      runContinuous()
    }
  });
}

function runLR(){
    y = getYValue();
    x = getXValue();
    w = getWValue();
    a = getAValue();
    $.ajax({
      url: '/run_iteration',
      data: {"W": w, "X": x, "Y": y, "A": a},
      type: 'POST',
      success: function(data){
        $('#w0').html(data.weights[0]);
        $('#w1').html(data.weights[1]);

        $('#error').html(data.error);

        iteration_number = parseInt($('#iteration-number').html());
        $('#iteration-number').html(iteration_number+ 1);

        lineY = data.F;
        y0 = lineY[0];
        yn = lineY[1];

        draw_graph(y0, yn);
      }
    }).done(function(){
      $('#run').html('Run 1 iteration');
      $('#run').css('background-color', '#1A85FF');
    });
}

function getXValue(){
  x = $('#X-values').val();
  return x;
}

function getYValue(){
  y = $('#Y-values').val();
  return y;
}

function getWValue(){
  w0 = $('#w0').html();
  w1 = $('#w1').html();
  w = w0+","+w1;
  return w;
}

function getAValue(){
  return $('#alpha').val();
}

function draw_graph(y0, yn){
  X = getXValue();
  X = X.split(",");
  Y = getYValue();
  Y = Y.split(",");
  data_xy = []
  for (i = 0; i < X.length; i++){
    data_xy.push({
      x: X[i],
      y: Y[i]
    });
  }

  var ctx = $('#myChart');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'scatter',
    // The data for our dataset
    data: {
      datasets: [{
        type: 'scatter',
        label: "Points",
        backgroundColor: "rgb(123,123,244)",
        pointBackgroundColor: "rgb(123, 123, 244)",
        data: data_xy,
        fill: false,
        showLine: false,
      }, {
        type: 'line',
        label: 'Gradient descent line',
        backgroundColor: "rgb(123, 244, 123)",
        borderColor: "rgb(123, 244, 123)",
        fill: false,
        data: [ {x: X[0], y: y0},
                {x: X[X.length-1], y: yn}],
      }]
    },

    // Configuration options go here
    options: {
        animation: false,
          scales: {
              xAxes: [{
                  type: 'linear',
                  position: 'bottom'
              }]
          }
      }
  });
}
