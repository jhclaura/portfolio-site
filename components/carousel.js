// source: https://fancyapps.com/docs/ui/carousel/react

import React, { useRef, useEffect } from 'react'
import { Carousel as NativeCarousel } from '@fancyapps/ui' //'/static/lib/ui@4.0/carousel.esm.js'
import '@fancyapps/ui/dist/carousel.css'

function ReactCarousel(props) {
  const wrapper = useRef(null)

  useEffect(() => {
    const items = props.items || []
    const opts = props.options || {}

    opts.slides = [...items].map(val => {
      return { html: val }
    })

    const instance = new NativeCarousel(
      (props.ref && props.ref.current) || wrapper.current,
      opts,
    )

    return () => {
      instance.destroy()
    }
  }, [])

  return (
    <div className={`carousel ${props.class || ''}`} ref={props.ref || wrapper}>
      {props.slides}
    </div>
  )
}

export default ReactCarousel
