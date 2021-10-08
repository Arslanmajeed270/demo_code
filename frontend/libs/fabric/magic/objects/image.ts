import { updateFabricObjectFunction } from '.'
import { FCOPropertySetEventNamePrefix } from '..'

export const applyImageObjectModifications = (_fabric: typeof fabric): void => {
  updateFabricObjectFunction(
    _fabric,
    `Image`,
    `initialize`,
    function ($this: fabric.Image, _, options: fabric.IImageOptions) {
      options.width = undefined
      options.height = undefined

      setTimeout(() => {
        $this._element.onload = () => {
          $this.canvas.requestRenderAll()
        }
      })

      $this.on(`${FCOPropertySetEventNamePrefix}src`, () => {
        if (!$this._element) return
        $this._element.src = $this.src
      })

      $this.on(`${FCOPropertySetEventNamePrefix}filters`, () => {
        const imagePrototype = fabric.Image.prototype as any
        imagePrototype._initFilters.call($this, $this.filters, (filters) => {
          $this.filters = filters || []
          $this.applyFilters()
        })
      })

      $this.on(`${FCOPropertySetEventNamePrefix}resizeFilter`, () => {
        const imagePrototype = fabric.Image.prototype as any
        imagePrototype._initFilters.call(
          $this,
          $this.resizeFilter,
          (resizeFilters) => {
            $this.resizeFilter = resizeFilters[0]
          },
        )
      })

      $this.initialized()
    },
  )
}
