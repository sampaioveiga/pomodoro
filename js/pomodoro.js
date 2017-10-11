$(document).ready(function(){
  //variables
  var timer = 1500000; //25 * 60 * 1000;
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
      $("#seconds").append('<i class="fa fa-circle" aria-hidden="true"></i>');
    }
  };

  function fade_ball() {
    $("#seconds").append('<span id="last_ball" class="text-dark"><i class="fa fa-circle" aria-hidden="true"></i></span>');
    $("#last_ball").fadeOut();
  }

  function every_second() {
    timer -= 1000;
    if (timer < 0) {
      clearInterval(timeout);
      timer = 0;
      alarm();
    } else {
      set_timer();
      fade_ball();
    }
  };

  function alarm() {
    $("#seconds").html("<br /><div class='jumbotron'><h1 class='display-3'>Time's up!</h1></div>");
  };

  //button start_click
  $("#start_button").click(function() {
    // if countdown already started, ignore
    if (countdown) {
      return;
    }
    countdown = true;
    timeout = setInterval(every_second, 1000);
    $("#li_start_button").removeClass("active");
    $("#li_plus1m_button").removeClass("active");
    $("#li_minus1m_button").removeClass("active");
    $("#li_reset_button").addClass("active");
  });

  //button reset_click
  $("#reset_button").click(function() {
    clearInterval(timeout);
    countdown = false;
    timer = 1500000;
    set_timer();
    $("#li_start_button").addClass("active");
    $("#li_plus1m_button").addClass("active");
    $("#li_minus1m_button").addClass("active");
    $("#li_reset_button").removeClass("active");
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
