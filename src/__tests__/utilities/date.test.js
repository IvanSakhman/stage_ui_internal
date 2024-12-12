import dateUtilities from '~su/utilities/date'
import FakeTimers from '@sinonjs/fake-timers'

const { timeBetween, formatDuration, format, detailedFormat, isValidDateWithFormat } = dateUtilities

describe('Date Utilities', () => {
  let clock

  beforeEach(() => {
    clock = FakeTimers.install({ now: 1604582722000 })
  })

  afterEach(() => {
    clock.uninstall()
  })

  describe('isValidDate', () => {
    it('returns true for valid date', () => {
      expect(isValidDateWithFormat('2021-07-12', 'YYYY-MM-DD')).toEqual(true)
    })
    it('returns false for valid date in different format', () => {
      expect(isValidDateWithFormat('2021-07-12', 'YYYY/MM/DD')).toEqual(false)
    })
    it('returns false for invalid month', () => {
      expect(isValidDateWithFormat('2021-55-12', 'YYYY-MM-DD')).toEqual(false)
    })
    it('returns false for invalid date string', () => {
      expect(isValidDateWithFormat('invalid date string', 'YYYY-MM-DD')).toEqual(false)
    })
    it('returns false for number instead of date passed', () => {
      expect(isValidDateWithFormat(0, 'YYYY-MM-DD')).toEqual(false)
    })
  })

  describe('timeBetween', () => {
    describe('with both startDate and endDate', () => {
      it('returns humanized duration between those 2', () => {
        expect(timeBetween({ startDate: '2020-11-02T09:00:10.952Z', endDate: '2020-11-03T10:19:55.952Z' })).toEqual(
          '1 day, 1 hour and 19 minutes'
        )
      })
    })

    describe('with startDate being after endDate', () => {
      it('returns humanized duration between those 2', () => {
        expect(timeBetween({ startDate: '2020-11-03T10:19:55.952Z', endDate: '2020-11-02T09:00:10.952Z' })).toEqual(0)
      })
    })

    describe('with only startDate', () => {
      it('returns humanized duration between startDate and now', () => {
        expect(timeBetween({ startDate: '2020-11-03T10:19:55.000Z' })).toEqual('2 days, 3 hours and 5 minutes')
      })
    })

    describe('with humanizeOptions', () => {
      it('it takes them into account', () => {
        expect(timeBetween({ startDate: '2020-11-03T10:19:55.000Z', humanizeOptions: { largest: 2 } })).toEqual(
          '2 days and 3 hours'
        )
      })
    })

    describe('with relateive = true', () => {
      it('returns the difference with relative word', () => {
        expect(timeBetween({ startDate: '2020-11-03T10:19:55.000Z', humanizeOptions: { largest: 2 }, relative: true })).toEqual(
          '2 days and 3 hours ago'
        )
      })
    })
  })

  describe('formatDuration', () => {
    it('returns humanized duration with 2 largest items, separated by and', () => {
      expect(formatDuration(2**22)).toEqual('1 hour and 9 minutes')
    })

    describe('with humanizeOptions', () => {
      it('it takes them into account', () => {
        expect(formatDuration(2**22, { largest: 3 })).toEqual('1 hour, 9 minutes and 54.3 seconds')
      })
    })
  })

  describe('format', () => {
    describe('w/ !value', () => {
      it('returns null', () => {
        expect(format()).toEqual(null)
        expect(format(null)).toEqual(null)
        expect(format('')).toEqual(null)
      })
    })

    describe('w/ value', () => {
      beforeEach(() => {
        let languageGetter = jest.spyOn(window.navigator, 'language', 'get')
        languageGetter.mockReturnValue('en-GB')
      })

      it('formats the date w/ users localisation', () => {
        expect(format('2020-12-14T17:56:15.786Z')).toEqual('Mon, 14 Dec 2020, 17:56 GMT')
      })
    })
  })

  describe('detailedFormat', () => {
    describe('w/ !value', () => {
      it('returns null', () => {
        expect(detailedFormat()).toEqual(null)
        expect(detailedFormat(null)).toEqual(null)
        expect(detailedFormat('')).toEqual(null)
      })
    })

    describe('w/ value', () => {
      beforeEach(() => {
        let languageGetter = jest.spyOn(window.navigator, 'language', 'get')
        languageGetter.mockReturnValue('en-GB')
      })

      it('formats the date w/ users localisation', () => {
        expect(detailedFormat('2020-12-14T17:56:15.786Z')).toEqual('14 Dec 2020, 17:56:15.786 GMT')
      })

      describe('w/ timeZone specified', () => {
        it('uses it', () => {
          const formattedDate = detailedFormat('2020-12-14T17:56:15.786Z', 'CET');
          expect(
            ['14 Dec 2020, 18:56:15.786 GMT+1', '14 Dec 2020, 18:56:15.786 CET'].includes(formattedDate)
          ).toBe(true);
        })
      })
    })
  })
})
