$(document).ready(function() {
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#currentLoginWrapper").toggleClass("currentLogin");
  });

  // Current Account Login
  $("#currentLoginWrapper").on("hide.bs.dropdown	", function() {
    $("#currentLoginLabel").css("background", "#393A3E");
    $("#currentLoginLabel").css("color", "#fff");
  });

  $("#currentLoginWrapper").on("shown.bs.dropdown	", function() {
    $("#currentLoginLabel").css("background", "#fff");
    $("#currentLoginLabel").css("color", "#000");
  });

  $("#currentLoginWrapper").mouseover(function() {
    $("#currentLoginLabel").css("background", "#f8f9fa");
    $("#currentLoginLabel").css("color", "#000");
  });

  $("#currentLoginWrapper").mouseout(function() {
    $("#currentLoginLabel").css("background", "#393A3E");
    $("#currentLoginLabel").css("color", "#fff");
  });
});