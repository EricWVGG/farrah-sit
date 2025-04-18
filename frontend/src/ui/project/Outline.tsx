import { styled } from '@linaria/react'

export const Outline = ({
  outline,
  className,
}: { className?: string } & Partial<
  NonNullable<Sanity.ProjectQueryResult>
>) => {
  return !outline?.asset?.url ? null : (
    <Wrapper className={className}>
      <img src={outline.asset.url} alt="outline" />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: none;

  @media only screen and (min-width: 744px) {
    display: block;
    position: fixed;
    z-index: var(--layer-specifications);
    bottom: 10vh;
    right: left;
    width: 100%;
    max-width: 400px;
    max-height: calc(90vh - var(--header-height));
    overflow-y: auto;

    padding: 80px 80px;

    transition: transform 0.35s ease-in-out;
    left: -540px;

    &.active {
      z-index: var(--layer-popout);
      transform: translateX(540px);
    }

    background: var(--pearl);
    box-shadow: 20px 20px 0 rgb(225, 225, 225);

    img {
      max-width: 100%;
      width: auto;
      height: 100%;
      max-height: 100%;
    }
  }
`
