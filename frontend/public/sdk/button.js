(function(root, document) {
  "use strict";
  
  const EMEEZO_URI = "http://localhost:5001";
  const EMEEZO_MAGIC_IFRAME_URI = EMEEZO_URI + "/iframe/magic/";
  const EMEEZO_MAGIC_IFRAME_FROM = "EmeezoMagicIframe";

  const uris = {
    js: [
      'https://cdn.jsdelivr.net/gh/englishextra/iframe-lightbox@latest/js/iframe-lightbox.min.js' // Iframe Lightbox
    ], 
    css: [
      EMEEZO_URI + '/sdk/button.css', // Emeezo button
      'https://cdn.jsdelivr.net/gh/englishextra/iframe-lightbox@latest/css/iframe-lightbox.min.css' // Iframe Lightbox
    ]
  }

  const loaderJs = function(c,a,n,o){
    var w=c.createElement(a),s=c.getElementsByTagName(a)[0];
    w.src=n;s.parentNode.insertBefore(w,s);s.onload=o;
  }
  const loaderCss = function(c,a,n){
    var w=c.createElement(a),s=c.getElementsByTagName(`script`)[0];
    w.href=n;s.parentNode.insertBefore(w,s);w.rel="stylesheet";
  }

  // Loading Js
  uris.js.forEach(uri => loaderJs(document,'script', uri, init))

  // Loading Css
  uris.css.forEach(uri => loaderCss(document,'link', uri))

  // Main intilization function
  function init() {
    // Loading emeezo buttons
    loadButtons()
    setupEventHandler()
  }

  function loadButtons() {
    waitUntil(function() {
      return !!root.IframeLightbox;
    }, function(){

      const elments = traverseEmeezoButtonElements(function(element) {
        const magicIframeUri = EMEEZO_MAGIC_IFRAME_URI + "?" + uriQuerySerialize(element.dataset)
        element.setAttribute("href", magicIframeUri);
      });

      [].forEach.call(
        elments,
        function (el) {
          el.lightbox = new IframeLightbox(el, {
            scrolling: false,
            rate: 500 /* default: 500 */,
            touch: false /* default: false - use with care for responsive images in links on vertical mobile screens */,
          })
        },
      )
    });  
  }

  function setupEventHandler() {
    root.addEventListener("message", function(response) {
      if(response.origin !== EMEEZO_URI) return
      if(response.data.from !== EMEEZO_MAGIC_IFRAME_FROM) return

      traverseEmeezoButtonElements(function(element) {
        const functionName = element.getAttribute('onmessage')
        if(!functionName) return
        root[functionName](response.data.data)
      });
    }, false);
  }

  function traverseEmeezoButtonElements(callback) {
    const elments = document.getElementsByClassName(`emeezo-button`);
    for (let index = 0; index < elments.length; index++) {
      const element = elments[index];
      callback(element)
    }
    return elments
  }

  const waitUntil = (
    waitFunction,
    callbackFunction,
    intervalDuration = 100,
  ) => {
      const intervalId = setInterval(() => {
        if (!waitFunction()) return
        clearInterval(intervalId)
        callbackFunction()
      }, intervalDuration)
      
  }

  const uriQuerySerialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

})("undefined" !== typeof window ? window : this, document);