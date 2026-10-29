(function () {
  'use strict'

  var modal = document.getElementById('booking-modal')
  var contactInput = document.getElementById('booking-contact')
  var toast = document.getElementById('feedback-toast')
  var toastTimer
  var lastFocusedElement
  var missingLinkActions = { 'official-site': true, download: true, 'activity-reward': true, 'reward-claim': true, 'team-gathering': true, 'anniversary-claim': true }

  function reportButtonClick(link) {
    if (typeof window.PTTSendClick === 'function') {
      window.PTTSendClick(link.dataset.trackType, link.dataset.trackId, link.dataset.trackLabel)
    }
  }

  function showToast(message) {
    window.clearTimeout(toastTimer)
    toast.textContent = message
    toast.hidden = false
    toastTimer = window.setTimeout(function () { toast.hidden = true }, 2800)
  }

  function showMissingLink() {
    window.alert('链接缺失')
  }

  function openBooking() {
    lastFocusedElement = document.activeElement
    modal.hidden = false
    contactInput.focus()
  }

  function closeBooking() {
    modal.hidden = true
    contactInput.value = ''
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus()
  }

  function submitBooking() {
    if (!contactInput.value.trim()) {
      contactInput.focus()
      showToast('请填写手机号或 QQ 号。')
      return
    }
    closeBooking()
    showToast('预约成功，开服当天见！')
  }

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('booking-modal__backdrop')) {
      closeBooking()
      return
    }

    var link = event.target.closest('a[data-action]')
    if (!link) return
    event.preventDefault()
    reportButtonClick(link)
    var action = link.dataset.action
    if (action === 'open-booking') return openBooking()
    if (action === 'close-booking') return closeBooking()
    if (action === 'submit-booking') return submitBooking()
    if (missingLinkActions[action]) {
      showMissingLink()
      return
    }
    showToast('功能入口尚未配置。')
  })

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.hidden) closeBooking()
  })

  document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault()
    if (typeof window.PTTSendClick === 'function') {
      window.PTTSendClick('order', 'booking-confirm', '确认预约')
    }
    submitBooking()
  })
}())
