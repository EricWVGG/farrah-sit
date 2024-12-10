'use client'

import { useState } from 'react'

export const increment = (currentIndex: number, maxIndex?: number) =>
  maxIndex && currentIndex + 1 >= maxIndex ? 0 : currentIndex + 1

export const useIncrement = (initialVal: number = 0, max?: number) => {
  const [val, setVal] = useState(initialVal)
  const inc = () => setVal(increment(val, max))
  return [val, inc] as const
}
