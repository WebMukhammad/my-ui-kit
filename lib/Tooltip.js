import Schema from 'validate'

const tooltips = []
let container

/**
 * @param {String} type - тип тултипа (error, warning, loading)
 * @param {String} title - заголовок тултипа
 * @param {String} description - описание тултипа
 * @param {Number} timeRemaining - время показа тултипа в миллисекундах
 * @param {Array<number>} mobileOffset - должен содержать 4 значения типа Number которые описывают положение тултипа относительно страницы со всех сторон (top, right, bottom, left)
 * @param {Function} onEnable - вызывается перед cозданием тултипа
 * @param {Function} onDisable - вызывается после удаления тултипа
 */

export default function Tooltip({
  type = 'error',
  title = null,
  description = null,
  timeRemaining = 3000,
  mobileOffset = [],
  onEnable = () => {},
  onDisable = () => {}
} = {}) {
  let counterTimeout = null
  const margin = mobileOffset.length ? mobileOffset.map((el) => (el === 0 ? '0' : `${el}px`)).join(' ') : []

  const TooltipParams = new Schema({
    type: {
      type: String
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    timeRemaining: {
      type: Number
    },
    mobileOffset: {
      type: Array
    }
  })

  if (!title && type === 'error') title = 'Ошибка'
  else if (!title && type === 'success') title = 'Успешно'
  else if (!title && type === 'warning') title = 'Предупреждение'
  else if (!title && type === 'loading') title = 'Загрузка...'

  const errors = TooltipParams.validate({ type, title, description, timeRemaining, mobileOffset })
  if (errors.length) throw errors

  onEnable()

  if (!tooltips.length) {
    createContainer()
  }
  const tooltipEl = createTooltip()
  if (timeRemaining) setTimer()

  function createContainer() {
    container = document.createElement('div')
    container.className = 'modal-tooltip-container'
    document.body.appendChild(container)
  }

  function createTooltip() {
    const tooltip = document.createElement('div')
    tooltip.className = `modal-tooltip modal-tooltip_${type}`
    container.appendChild(tooltip)
    tooltip.innerHTML = `
      <div class="modal-tooltip__divider"></div>
      <div class="modal-tooltip__body">
        <p class="modal-tooltip__title">${title}</p>
        <p class="modal-tooltip__description">${description || ''}</p>
      </div>
      <div class="modal-tooltip__close icon-close icon-close_grey"></div>
    `
    if (mobileOffset.length) {
      tooltip.style.margin = getMargin()
      window.addEventListener('resize', () => (tooltip.style.margin = getMargin()))
    }

    tooltip.addEventListener('mouseover', () => {
      restartTimer()
    })

    const closeButton = tooltip.querySelector('.modal-tooltip__close')
    closeButton.addEventListener('click', disable)

    tooltips.push(tooltip)
    return tooltip
  }

  function removeContainer() {
    container.remove()
    container = null
  }

  function getMargin() {
    return document.documentElement.clientWidth <= 800 ? margin : null
  }

  function clearTimer() {
    if (counterTimeout) window.clearTimeout(counterTimeout)
  }

  function restartTimer() {
    clearTimer()
    setTimer()
  }

  function setTimer(time) {
    if (time) clearTimer()
    if (time || timeRemaining) {
      counterTimeout = setTimeout(disable, time || timeRemaining)
    }
  }

  function disable() {
    clearTimer()
    tooltipEl.remove()
    tooltips.splice(tooltips.indexOf(tooltipEl), 1)
    if (!tooltips.length) {
      removeContainer()
    }
    onDisable()
  }
  return {
    disable,
    restartTimer,
    setTimer
  }
}
