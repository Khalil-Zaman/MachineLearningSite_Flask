$(document).ready(function(){
  draw_graph([]);

  $('#reset').click(function(){
    $('#error').html(0);
    $('#w0').html(0);
    $('#w1').html(0);
    $('#iteration-number').html(0);
    draw_graph();
  });

  $('#run').click(function(){
      if (checkXY()) {
        $('#run').html('Computing');
        $('#run').css('background-color', '#FF7105');
        runLR();
      }
  });

  $('#increase-poly').click(function(){
    number = 0;
    $('.weights').each(function(){
      number++;
    });
    if (number == 0) $('.w').append('<div style="display:inline-block;"><div class="weights" style="display:inline-block;">0</div></div>');
    else if (number == 1) $('.w').append('<div style="display:inline-block;">&nbsp;&nbsp;+&nbsp;&nbsp;<div class="weights" style="display:inline-block;">0</div>x</div>');
    else $('.w').append('<div style="display:inline-block;">&nbsp;&nbsp;+&nbsp;&nbsp;<div class="weights" style="display:inline-block;">0</div>x<span style="font-size:10px; position:relative; bottom:5px;">'+number+'</span></div>');

  });

  $('#decrease-poly').click(function(){
    number = 0;
    $('.weights').each(function(){
      number++;
    });
    delete_row = 0;
    $('.weights').each(function(){
      delete_row++;
      if (delete_row == number){
        $(this).parent().remove();
      }
    });
  });

});

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
  $('#error').css('color', 'black');
  return true;
}

function runLR(){
  y = getYValue();
  x = getXValue();
  w = getWValue();
  $.ajax({
    url: '/run_polynomial_normalize',
    data: {"W": w, "X": x, "Y": y},
    type: 'POST',
    success: function(data){

      $('#w0').html(data.weights[0]);
      $('#w1').html(data.weights[1]);
      $('#w2').html(data.weights[2]);

      number = 0;
      $('.weights').each(function(){
        $(this).html(data.weights[number]);
        number++;
      });

      $('#error').html(data.error);

      iteration_number = parseInt($('#iteration-number').html());
      $('#iteration-number').html(iteration_number+ 1);
      draw_graph(data.F);
    }
  }).done(function(){
    $('#run').html('Run');
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
  w = "";
  $('.weights').each(function(){
    weight = $(this).html();
    w += weight + ",";
  });
  w = w.slice(0, -1);
  return w;
}

function getAValue(){
  return $('#alpha').val();
}

function draw_graph(f){
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

  data_f = []
  for (i = 0; i < f.length; i++){
    data_f.push({
      x: X[i],
      y: f[i]
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
        label: 'Normalization line',
        backgroundColor: "rgb(123, 244, 123)",
        borderColor: "rgb(123, 244, 123)",
        fill: false,
        data: data_f,
      }]
    },

    // Configuration options go here
    options: {
        bezierCurve : true,
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
