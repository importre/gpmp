'use strict';

window.triggerKeyCode = function (el, keyCode) {
  var event = document.createEvent("Events");
  event.initEvent("keydown", true, true);
  event.keyCode = event.which = keyCode;
  el.dispatchEvent(event);
};
