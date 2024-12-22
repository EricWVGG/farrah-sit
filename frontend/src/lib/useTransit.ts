'use client'

import { MouseEventHandler } from 'react'
import { useLayout } from '@lib'
// import { useShallow } from 'zustand/react/shallow'
import { useRouter } from 'next/navigation'
import { useIsClient, useScrollLock } from 'usehooks-ts'

export const useTransit = (TIMEOUT: number = 550) => {
  const { push } = useRouter()
  const setTransitioning = useLayout((state) => state.setTransitioning)

  const isClient = useIsClient()
  const { unlock } = useScrollLock({
    autoLock: false,
    lockTarget: isClient ? document.documentElement : undefined,
  })

  const transit: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    unlock()
    const destination = (e.currentTarget as HTMLAnchorElement).href
    setTransitioning(true)
    setTimeout(() => push(destination), TIMEOUT)
  }
  return transit
}
