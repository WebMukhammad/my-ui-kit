export const ClickOutside = {
  inserted(el, binding) {
    const onClick = (e) => {
      if (!el.contains(e.target)) {
        binding.value(e)
      }
    }

    const app = document.querySelector('[data-app]') || document.body
    app.addEventListener('click', onClick, true)
    el._clickOutside = onClick
  },

  unbind(el) {
    if (!el._clickOutside) return

    const app = document.querySelector('[data-app]') || document.body
    app && app.removeEventListener('click', el._clickOutside, true)
    delete el._clickOutside
  }
}

export default ClickOutside
