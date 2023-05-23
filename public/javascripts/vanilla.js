// loading mask bootstrap 5
const mask = function (context = document) {
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
}()


/** remote tpl load */
const LoadHtmlTemplet = (url,formdata = new FormData,context = document) => {
  const Elements = Array.from(context.getElementsByTagName('body'))
  const LoadHTML = document.createElement("div")
  return {}
  /*
  axios.post('/calendar/detailed',data).then(res => {
    let LoadHTML = document.createElement("div")
    LoadHTML.innerHTML = res.data
    Array.from(LoadHTML.querySelectorAll('script')).forEach(element => {
      let $script = document.createElement('script');
      $script.text = element.text
      LoadHTML.appendChild($script)
    })
    document.querySelector('body').prepend(LoadHTML)
  }).catch((error) => { 
    console.dir(error)
    Swal.fire(error.response.data.msg)
  }).finally(() =>{
    mask.hide()
    calendar.unselect()
  })*/
}

/** */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#pwdchange').addEventListener('click', (event) => {
    mask.show()
    axios.get('/users/pwd').then((res) => {
      let LoadHTML = document.createElement("div")
      LoadHTML.innerHTML = res.data
      Array.from(LoadHTML.getElementsByTagName('script')).forEach(element => {
        let $script = document.createElement('script');
        $script.text = element.text
        LoadHTML.appendChild($script)
      })
      document.getElementsByTagName("body")[0].prepend(LoadHTML)
    }).catch((error) => { 
      Swal.fire('樣板發生錯誤。')
    }).finally(() =>{ mask.hide() })
  })

  document.querySelector('#styleset').addEventListener('click', (event) => {
    mask.show()
    axios.get('/users/style').then((res) => {
      let LoadHTML = document.createElement("div")
      LoadHTML.innerHTML = res.data
      Array.from(LoadHTML.getElementsByTagName('script')).forEach(element => {
        let $script = document.createElement('script');
        $script.text = element.text
        LoadHTML.appendChild($script)
      })
      document.getElementsByTagName("body")[0].prepend(LoadHTML)
    }).catch((error) => { 
      Swal.fire('樣板發生錯誤。')
    }).finally(() =>{ mask.hide() })
  })
  


})