function toggleFullScreen(el) {
  if (
    !document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) { 
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

window.onload = function() {
  var mainEl = document.querySelector(".main");

  window.addEventListener("keydown", function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 70) {
      toggleFullScreen(mainEl); 
    }
  });

  window.webkitRequestAnimationFrame(loop);

  var prev = Date.now();
  var r = 100;
  var g = 150;
  var b = 255;

  var rd = 1;
  var gd = 1;
  var bd = 1;

  function loop() {
    window.webkitRequestAnimationFrame(loop);
    var d = Date.now() - prev;

    if(r < 100 || r > 255) rd *= -1;
    if(g < 100 || g > 255) gd *= -1;
    if(b < 100 || b > 255) bd *= -1;

    r += d/100 * rd;
    g += d/200 * gd;
    b += d/400 * bd;

    mainEl.style.backgroundColor = "rgb("+Math.round(r)+", "+Math.round(g)+", "+Math.round(b)+")";
    prev = Date.now();
  }
}
