import { useEffect } from 'react'
import shallow from 'zustand/shallow'
import useStore from './useStore'

const useMounted = () => {
  const { isMounted, mount } = useStore(
    state => ({ isMounted: state.isMounted, mount: state.mount }),
    shallow,
  )

  useEffect(() => {
    if (!isMounted) mount()
  })

  return isMounted
}

export default useMounted
