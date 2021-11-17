import { useCallback, useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import Image from 'next/image'
import { useRouter } from 'next/router'

import SideBar from '../components/sideBar'
import Meta from '../components/meta'
import { styled } from '../styles/index.js'
import MenuDots from '../public/MenuDots.png'
import MenuClose from '../public/MenuClose.png'
import useWindowSize from '../lib/useWindowSize'
import TitleHeader from './titleHeader'
import useMounted from '../lib/useMounted'

export default function Layout({ preview, children, projectSlugs }) {
  const router = useRouter()
  const { width } = useWindowSize()
  const isMounted = useMounted()

  const [showMenu, setShowMenu] = useState(width < 800 ? true : false)
  const [showSideBar, setShowSideBar] = useState(isMobile ? false : true)
  const [currentPathname, setCurrentPathname] = useState(router.asPath)

  // Show menu button dynamically on desktop
  useEffect(() => {
    if (width === undefined) return

    if (width < 800) {
      setShowMenu(true)
      setShowSideBar(false)
    } else {
      setShowMenu(false)
      setShowSideBar(true)
    }
  }, [width])

  // Close sidebar when path changes
  useEffect(() => {
    if (!isMobile) return
    if (router.pathname !== currentPathname && showSideBar) {
      console.log('hide side bar')
      setShowSideBar(false)
    }
    setCurrentPathname(router.asPath)
  }, [router.asPath, currentPathname])

  useEffect(() => {
    if (!isMobile) return
    if (showSideBar) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [showSideBar])

  const handleMenuToggle = useCallback(() => {
    console.log('handleMenuToggle')
    setShowSideBar(v => !v)
  }, [])

  if (!isMounted) return null

  return (
    <MainContainer>
      <Meta />
      {isMobile ? (
        <>
          {showSideBar ? (
            <SideBar projectSlugs={projectSlugs} />
          ) : (
            <>
              <main style={{ scrollbarWidth: 'none' }}>
                <HeaderContainer>
                  <TitleHeader />
                </HeaderContainer>
                {children}
              </main>
            </>
          )}
          <MenuButton showSideBar={showSideBar} onClick={handleMenuToggle} />
        </>
      ) : (
        <>
          {showMenu && (
            <HeaderContainer>
              <TitleHeader />
            </HeaderContainer>
          )}
          <main style={{ scrollbarWidth: 'none' }}>{children}</main>
          {showSideBar && <SideBar projectSlugs={projectSlugs} />}
          {showMenu && (
            <MenuButton showSideBar={showSideBar} onClick={handleMenuToggle} />
          )}
        </>
      )}
    </MainContainer>
  )
}

const MainContainer = styled.div({
  minHeight: '100vh',
  width: '100%',
  overflow: 'hidden',
})

const HeaderContainer = styled.div({
  padding: '15px 20px 0px',
})

const MenuButton = ({ showSideBar, onClick }) => {
  return (
    <Button onClick={onClick}>
      {showSideBar ? (
        <CloseImage
          src={MenuClose}
          alt="Button to close menu"
          width={17}
          height={17}
          objectFit={'contain'}
        />
      ) : (
        <Image
          src={MenuDots}
          alt="Button to show menu"
          width={25}
          height={25}
          objectFit={'contain'}
        />
      )}
    </Button>
  )
}

const Button = styled.button({
  borderRadius: 50,
  position: 'fixed',
  top: 0,
  right: 5,
  width: 50,
  height: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const CloseImage = styled(Image)({
  paddingTop: 0,
})
