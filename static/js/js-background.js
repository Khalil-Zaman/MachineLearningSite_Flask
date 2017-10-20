$(document).ready(function(){
  $('.choice-code').click(function(){
    $('.choices').css('background-color', '');
    $(this).css('background-color', '#ff3131')
    $('.code').css('display','block');
    $('.explanation').css('display', 'none');
  });

  $('.choice-explanation').click(function(){
    $('.choices').css('background-color', '');
    $(this).css('background-color', '#ff3131')
    $('.code').css('display','none');
    $('.explanation').css('display', 'block');
  });

});
