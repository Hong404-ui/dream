(function () {
  'use strict'

  var device = location.pathname.endsWith('index_pc.html') ? 'pc' : 'm'
  var notice = document.querySelector('.notice')
  var hideTimer

  function easReport(action) {
    try {
      if (window.EAS && typeof window.EAS.SendClick === 'function') {
        window.EAS.SendClick({ e_c: 'a20211029mhzx5th.index.' + device + '.' + action })
      }
    } catch (error) {
      console.warn('EAS report unavailable', error)
    }
  }

  window.easReport = easReport
  if (window.pageSwitchRedirecting) return

  easReport('pv')
  document.querySelectorAll('[data-track], [data-message]').forEach(function (element) {
    element.addEventListener('click', function (event) {
      if (element.dataset.track) easReport(element.dataset.track)
      if (!notice || !element.dataset.message) return
      event.preventDefault()
      notice.textContent = element.dataset.message
      notice.hidden = false
      clearTimeout(hideTimer)
      hideTimer = setTimeout(function () { notice.hidden = true }, 3200)
    })
  })
}())
