import LoadingBlock from '~su/components/LoadingBlock'
import withLoader from '~su/hoc/withLoader'

describe('withLoader HOC', () => {
  const MockComponent = jest.fn(() => null)

  describe('showing LoadingBlock vs Content', () => {
    describe('without any props', () => {
      it('returns LoadingBlock', () => {
        expect(withLoader(MockComponent)()).toEqual(<LoadingBlock showTip={true} size="large">{null}</LoadingBlock>)
      })
    })

    describe('with isLoaded being false', () => {
      it('returns LoadingBlock', () => {
        expect(withLoader(MockComponent)({ isLoaded: false })).toEqual(<LoadingBlock showTip={true} size="large">{null}</LoadingBlock>)
      })

      describe('and isLoading being true', () => {
        it('returns LoadingBlock', () => {
          expect(withLoader(MockComponent)({ isLoaded: false, isLoading: true })).toEqual(
            <LoadingBlock showTip={true} size="large">{null}</LoadingBlock>
          )
        })
      })

      describe('and isLoading being false', () => {
        it('returns LoadingBlock', () => {
          expect(withLoader(MockComponent)({ isLoaded: false, isLoading: false })).toEqual(
            <LoadingBlock showTip={true} size="large">{null}</LoadingBlock>
          )
        })
      })
    })

    describe('with isLoaded being true', () => {
      it('returns the content', () => {
        expect(withLoader(MockComponent)({ isLoaded: true })).toEqual(<MockComponent isLoaded={true} />)
      })

      describe('and isLoading being true', () => {
        it('returns LoadingBlock', () => {
          expect(withLoader(MockComponent)({ isLoaded: true, isLoading: true })).toEqual(
            <LoadingBlock showTip={true} size="large">{null}</LoadingBlock>
          )
        })
      })

      describe('and isLoading being false', () => {
        it('returns the content', () => {
          expect(withLoader(MockComponent)({ isLoaded: true })).toEqual(<MockComponent isLoaded={true} />)
        })
      })
    })
  })

  describe('handling HOC options', () => {
    describe('when configured with embeddedMode', () => {
      it('returns LoadingBlock with Content as a child', () => {
        expect(withLoader(MockComponent, { embeddedMode: true })()).toEqual(
          <LoadingBlock showTip={true} size="large">
            <MockComponent />
          </LoadingBlock>
        )
      })
    })

    describe('when options include loadingBlock key', () => {
      it('returns LoadingBlock with those options set as props', () => {
        expect(withLoader(MockComponent, { loadingBlock: { size: 'small', showTip: false } })()).toEqual(
          <LoadingBlock showTip={false} size="small">{null}</LoadingBlock>
        )
      })
    })

    describe('with options.preventLoadingFlagsPassing', () => {
      it('does not pass isLoaded nor isLoading props to Content', () => {
        expect(withLoader(MockComponent, { preventLoadingFlagsPassing: true })({ isLoaded: true })).toEqual(
          <MockComponent />
        )
      })
    })
  })
})
