'use client'

import { styled } from '@linaria/react'
import Link from 'next/link'
import { useTransit } from '@lib'
// import { range} from 'lodash-es'

export const SlideshowDetails = ({
  shiftAction,
  count,
  active,
  link,
}: {
  shiftAction: (n: number) => void
  count: number
  active: number
  link: string
}) => {
  const transit = useTransit()

  return !count ? null : (
    <Wrapper>
      {count > 1 && (
        <Details>
          <Increment onClick={() => shiftAction(-1)}> &lt;</Increment>
          <Counter>
            <span>{active + 1}</span> of <span>{count}</span>
          </Counter>
          <Increment onClick={() => shiftAction(1)}> &gt;</Increment>
        </Details>
      )}

      {/* count > 1 && (
          <Dots>
            {range(count).map((dot, i) => (
              <Dot
                key={`dot-${dot._key}`}
                className={i === active ? 'filled' : ''}
                onClick={() => setActive(i)}
              />
            ))}
          </Dots>
        ) */}

      <Link onClick={transit} href={link}>
        Details &gt; &gt;
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 0.5em;

  font-size: var(--typeSizeS);
  line-height: var(--typeLineS);

  a {
    color: var(--tundora);
    &:hover:after {
      opacity: 0;
    }
  }
`

const Details = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`

const Counter = styled.div`
  span {
    display: inline-block;
    width: 10px;
    text-align: center;
  }
`

const Increment = styled.button`
  appearance: none;
  cursor: pointer;
`

// const Dots = styled.div`
//   display: flex;
//   flex-direction: row;
//   gap: 3px !important;
// `
//
// const Dot = styled.div`
//   position: relative;
//   height: 10px;
//   aspect-ratio: 1;
//   margin-top: 3px;
//   border: 0.75px solid black;
//   border-radius: 100%;
//   &:after {
//     content: ' ';
//     position: absolute;
//     top: 2px;
//     left: 2px;
//     width: 5px;
//     height: 5px;
//     background: black;
//     border-radius: 100%;
//     transition: transform 0.3s ease-in-out;
//     transform: scale(0);
//   }
//   &.filled:after {
//     transform: scale(1);
//   }
//   cursor: pointer;
// `
