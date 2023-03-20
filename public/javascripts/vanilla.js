// loading mask bootstrap 5
const mask = (function (context = document) {
  const elements = Array.from(context.getElementsByTagName('body'))
  const maskElement = '<div class="spinner-border" role="status" style="width: 3rem; height: 3rem;color:#ffffff;"><span class="visually-hidden">Loading...</span></div><strong style="color:#ffffff;">Loading...</strong>'
  const maskDiv = document.createElement('div')
  maskDiv.style.cssText = 'position: absolute;height: 100%;width: 100%;background-color: #000;bottom: 0;left: 0;right: 0;top: 0;z-index: 9999;opacity: 0.4;'
  maskDiv.className = 'loadmask d-flex justify-content-center align-items-center'
  maskDiv.innerHTML = maskElement
  return {
    elements,
    show () {
      this.elements.forEach(element => {
        element.prepend(maskDiv)
      })
      return this
    },
    hide () {
      this.elements.forEach(element => {
        Array.from(element.getElementsByClassName('loadmask')).forEach(el => {
          el.remove()
        })
      })
      return this
    }
  }
}(this))
