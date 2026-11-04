(function () {
  'use strict'

  var script = document.getElementById('screenFix')
  var designWidth = Number(script && script.getAttribute('data-size')) || 750

  function setFont() {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / designWidth * 100 + 'px'
  }

  setFont()
  window.addEventListener('resize', setFont)
  window.addEventListener('orientationchange', setFont)
}())
