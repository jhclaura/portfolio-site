import React, { useEffect } from 'react'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'

const ImageFancyBox = props => {
  const delegate = props.delegate || '[data-fancybox]'

  useEffect(() => {
    const opts = props.options || {}

    Fancybox.bind(delegate, opts)

    return () => {
      Fancybox.destroy()
    }
  }, [])

  return <>{props.children}</>
}

export default ImageFancyBox
