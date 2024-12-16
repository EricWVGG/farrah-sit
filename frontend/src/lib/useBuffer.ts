'use client'

import { useEffect, useState } from 'react'

const DEFAULT_BUFFER_TIME_OUT = 0.5 // seconds
const DEFAULT_BUFFER_TIME_IN = 0 // seconds

/* Usage

Upon any change, display old value for 5 seconds.
```
const [input, setInput] = useState<number | undefined>()
const buffered = useBuffer<number>(input, 5, 5)
...
<Button onClick={() => setInput(5)} >click</Button>
<p>{input}</p>
<p>{buffered}</p>

Upon unsetting a value (from number to undefined), wait 5 seconds before showing the change.
(Note: this is by far the most common use case; when unsetting, give the UI a moment to do some animations.)
```
const [input, setInput] = useState<number>()
const buffered = useBuffer<number>(input, 5, 0)
...
<Button onClick={() => setInput(5)} >See you in five</Button>
<p>{input}</p>
<p>{buffered}</p>
```

Upon setting the value from undefined, keep undefined state for 5 seconds before showing the value.
(This is effectively delaying setting the value, but instant unset.)
```
const [input, setInput] = useState<number | undefined>(5)
const buffered = useBuffer<number>(input, 0, 5)
...
<Button onClick={() => setInput(5)} >See you in five</Button>
<p>{input}</p>
<p>{buffered}</p>
```
*/

export const useBuffer = <T>(
  input: T | undefined,
  timeOut: number = DEFAULT_BUFFER_TIME_OUT, // seconds
  timeIn: number = DEFAULT_BUFFER_TIME_IN, // seconds
) => {
  const [bufferedValue, setBufferedValue] = useState<T>()

  useEffect(() => {
    const bufferedTimeout = setTimeout(
      () => setBufferedValue(input),
      !!input ? timeIn * 1000 : timeOut * 1000,
    )
    return () => {
      clearTimeout(bufferedTimeout)
    }
  }, [input, setBufferedValue, timeIn, timeOut])

  return bufferedValue
}
