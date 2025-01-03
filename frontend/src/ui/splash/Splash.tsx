'use client'

import { styled } from '@linaria/react'
import { PropsWithChildren } from 'react'
import { Slideshow } from './Slideshow'
import { useLayout } from '@lib'
import { useShallow } from 'zustand/react/shallow'
import { useTimeout } from 'usehooks-ts'

interface PageProps extends PropsWithChildren {
  page: Sanity.PageQueryResult
  navigation: Sanity.NavigationQueryResult
  className?: string
}

export const Splash = ({ navigation, ...props }: PageProps) => {
  const [setTransitioning] = useLayout(
    useShallow((state) => [state.setTransitioning]),
  )

  useTimeout(() => setTransitioning(false), 500)

  return (
    <Wrapper {...props}>
      <Slideshow navigation={navigation} />
    </Wrapper>
  )
}

const Wrapper = styled.main`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;

  width: 100%;
  height: 100dvh;

  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`
