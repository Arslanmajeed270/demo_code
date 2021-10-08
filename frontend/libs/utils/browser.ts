import * as axios from 'axios'

export const downloadVideo = (url: string, videoTitle: string) => {
  axios.default
    .get(url, {
      responseType: `blob`,
    })
    .then(function (response) {
      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: response.headers[`content-type`],
        }),
      )
      const link = document.createElement(`a`)
      link.href = url
      link.setAttribute(`download`, videoTitle)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
}

export const copyToClipboard = (content: string) => {
  const el = document.createElement(`textarea`)
  el.value = content
  document.body.appendChild(el)
  el.select()
  document.execCommand(`copy`)
  document.body.removeChild(el)
}
