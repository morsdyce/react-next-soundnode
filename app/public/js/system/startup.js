"use strict";

function startApp() {
  setTimeout(function () {
    window.soundNodeReact.bootstrap(document.getElementById('root'), 'components/app');
    document.body.setAttribute('data-isVisible', 'true');
  }, 2000);
}

startApp();
