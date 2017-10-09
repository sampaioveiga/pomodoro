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
    timer += 1000;
    set_timer();
  });

  //button minus_1m
  $("#minus_1m").click(function() {
    if (countdown || timer <= 0) {
      return;
    }
    timer -= 1000;
    set_timer();
  });
});