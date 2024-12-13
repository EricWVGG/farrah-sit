'use client'

import { MouseEventHandler } from 'react'
import { useLayout } from '@lib'
// import { useShallow } from 'zustand/react/shallow'
import { useRouter } from 'next/navigation'

export const useTransit = () => {
  const { push } = useRouter()
  const setTransitioning = useLayout((state) => state.setTransitioning)

  const transit: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    const destination = (e.target as HTMLAnchorElement).href
    setTransitioning(true)
    setTimeout(() => push(destination), 550)
  }
  return transit
}
