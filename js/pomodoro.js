$(document).ready(function(){
  //variables
  var timer = 5000;//1500000; //25 * 60 * 1000;
  var countdown = false;
  var timeout;
  set_timer();

  //startup function
  function set_timer() {
    var m,s;
    s = Math.floor(timer / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    m = m % 60;

    $("#visor").html(m + ":" + s);
    print_balls();
  };

  function print_balls() {
    $("#seconds").html("");
    for ( var i = 0; i < timer; i+= 1000) {
      if (i < 60000) {
        $("#seconds").append('<span class="text-danger"><i class="fa fa-circle" aria-hidden="true"></i></span>');
      } else if ( i < 180000) {
        $("#seconds").append('<span class="text-warning"><i class="fa fa-circle" aria-hidden="true"></i></span>');
      } else if ( i < 360000) {
        $("#seconds").append('<span class="text-info"><i class="fa fa-circle" aria-hidden="true"></i></span>');
      } else {
        $("#seconds").append('<span class="text-dark"><i class="fa fa-circle" aria-hidden="true"></i></span>');
      }
    }
  };

  function every_second() {
    set_timer();
    timer -= 1000;
    if (timer < 0) {
      clearInterval(timeout);
      console.log("timeout");
      alarm();
    }
  };

  function alarm() {
    console.log("alarm");
  };

  //button start_click
  $("#start_button").click(function() {
    // if countdown already started, ignore
    if (countdown) {
      return;
    }
    countdown = true;
    timeout = setInterval(every_second, 1000);
  });

  //button reset_click
  $("#reset_button").click(function() {
    clearInterval(timeout);
    countdown = false;
    timer = 1500000;
    set_timer();
  });

  //button plus_1m
  $("#plus_1m").click(function() {
    if (countdown) {
      return;
    }
    timer += 60000;
    set_timer();
  });

  //button minus_1m
  $("#minus_1m").click(function() {
    if (countdown || timer <= 0) {
      return;
    }
    timer -= 60000;
    set_timer();
  });
});