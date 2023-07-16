class devicePixelRatio {
  /* get system type*/
  getSystem() {
    const agent = navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    if (isMac) return false;
    // only for windowns
    if (agent.indexOf("windows") >= 0) return true;
  }
  /* Compatibility with listening methods */
  addHandler(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  }
  /* Correct browser scaling */
  correct() {
    // After the surface devicePixelRatio (device pixel ratio) changes,
    // calculate the page body tag zoom to modify its size to offset the changes brought about by devicePixelRatio
    document.getElementsByTagName("body")[0].style.zoom =
      1 / window.devicePixelRatio;
  }
  /* watch page scaling */
  watch() {
    const that = this;
    // two global window.resize
    that.addHandler(window, "resize", function () {
      that.correct(); // Recalibrate browser scaling
    });
  }
  /* Initialize page scale */
  init() {
    const that = this;
    // only correct the browser zoom ratio under the win system
    if (that.getSystem()) {
      that.correct(); // Correct browser scaling
      that.watch();
    }
  }
}
export default devicePixelRatio;
