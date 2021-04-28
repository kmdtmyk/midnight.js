import Midnight from './midnight'
import Timecop from './timecop'

expect.extend({
  toBeDate(received, year, month, day){
    const pass = (
      received.getFullYear() === year &&
      received.getMonth() + 1 === month &&
      received.getDate() === day
    )
    return {
      pass,
      message(){
        const expected = `${
          `${year}`.padStart(4, '0')
        }-${
          `${month}`.padStart(2, '0')
        }-${
          `${day}`.padStart(2, '0')
        }`
        if(pass){
          return `${received} and ${expected} are same date`
        }else{
          return `${received} and ${expected} are not same date`
        }
      }
    }
  },
  toInvalidDate(received){
    const pass = received instanceof Date && received.toString() === 'Invalid Date'
    return {
      pass,
      message(){
        if(pass){
          return `${received} is Invalid Date`
        }else{
          return `${received} is not Invalid Date`
        }
      }
    }
  },
})

describe('constructor', () => {

  test('no argument', () => {
    const date = new Midnight()
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    expect(date).toBeDate(year, month, day)
  })

  test('one argument (number)', () => {
    expect(new Midnight(1)).toBeDate(1, 1, 1)
    expect(new Midnight(99)).toBeDate(99, 1, 1)
    expect(new Midnight(100)).toBeDate(100, 1, 1)
    expect(new Midnight(1900)).toBeDate(1900, 1, 1)
    expect(new Midnight(2000)).toBeDate(2000, 1, 1)
    expect(new Midnight(2100)).toBeDate(2100, 1, 1)
  })

  test('one argument (string)', () => {
    expect(new Midnight('2018/05/15')).toBeDate(2018, 5, 15)
    expect(new Midnight('2018-05-15')).toBeDate(2018, 5, 15)

    expect(new Midnight('2018/05')).toBeDate(2018, 5, 1)
    expect(new Midnight('2018-05')).toBeDate(2018, 5, 1)

    expect(new Midnight('2018')).toBeDate(2018, 1, 1)
  })

  test('one argument (date)', () => {
    const date = new Date('2018-05-15')
    expect(new Midnight(date)).toBeDate(2018, 5, 15)
  })

  test('year and month', () => {
    expect(new Midnight(2018, 0)).toBeDate(2017, 12, 1)
    expect(new Midnight(2018, 1)).toBeDate(2018, 1, 1)
    expect(new Midnight(2018, 5)).toBeDate(2018, 5, 1)
    expect(new Midnight(2018, 12)).toBeDate(2018, 12, 1)
    expect(new Midnight(2018, 13)).toBeDate(2019, 1, 1)
  })

  test('year, month and day', () => {
    expect(new Midnight(2018, 5, 0)).toBeDate(2018, 4, 30)
    expect(new Midnight(2018, 5, 1)).toBeDate(2018, 5, 1)
    expect(new Midnight(2018, 5, 31)).toBeDate(2018, 5, 31)
    expect(new Midnight(2018, 5, 32)).toBeDate(2018, 6, 1)

    expect(new Midnight(2018, 0, 15)).toBeDate(2017, 12, 15)
    expect(new Midnight(2018, 1, 15)).toBeDate(2018, 1, 15)
    expect(new Midnight(2018, 5, 15)).toBeDate(2018, 5, 15)
    expect(new Midnight(2018, 12, 15)).toBeDate(2018, 12, 15)
    expect(new Midnight(2018, 13, 15)).toBeDate(2019, 1, 15)
  })

  test('time is fixed on 00:00:00.000', () => {
    const date = new Midnight()
    expect(date.getHours()).toBe(0)
    expect(date.getMinutes()).toBe(0)
    expect(date.getSeconds()).toBe(0)
    expect(date.getMilliseconds()).toBe(0)
  })

  test('instance of Date', () => {
    expect(new Midnight()).toBeInstanceOf(Date)
  })

  test('1 century', () => {
    expect(new Midnight(1, 5)).toBeDate(1, 5, 1)
    expect(new Midnight(99, 5)).toBeDate(99, 5, 1)
    expect(new Midnight(100, 5)).toBeDate(100, 5, 1)

    expect(new Midnight(1, 5, 15)).toBeDate(1, 5, 15)
    expect(new Midnight(99, 5, 15)).toBeDate(99, 5, 15)
    expect(new Midnight(100, 5, 15)).toBeDate(100, 5, 15)

    expect(new Midnight('0001/05/15')).toBeDate(1, 5, 15)
    expect(new Midnight('0099/05/15')).toBeDate(99, 5, 15)
    expect(new Midnight('0100/05/15')).toBeDate(100, 5, 15)
  })

  test('invalid date', () => {
    expect(new Midnight(null)).toInvalidDate()
    expect(new Midnight(undefined)).toInvalidDate()
    expect(new Midnight(NaN)).toInvalidDate()
    expect(new Midnight('invalid date')).toInvalidDate()
  })

  test('travel', () => {
    Timecop.freeze()
    Timecop.travel(new Date('2015-01-23'))
    expect(new Midnight()).toBeDate(2015, 1, 23)
    Timecop.return()
  })

})

describe('operator', () => {

  test.skip('==', () => {
    expect(new Midnight(2018, 5, 15) == new Midnight(2018, 5, 14)).toBe(false)
    expect(new Midnight(2018, 5, 15) == new Midnight(2018, 5, 15)).toBe(true)
    expect(new Midnight(2018, 5, 15) == new Midnight(2018, 5, 16)).toBe(false)
  })

  test.skip('!=', () => {
    expect(new Midnight(2018, 5, 15) != new Midnight(2018, 5, 14)).toBe(true)
    expect(new Midnight(2018, 5, 15) != new Midnight(2018, 5, 15)).toBe(false)
    expect(new Midnight(2018, 5, 15) != new Midnight(2018, 5, 16)).toBe(true)
  })

  test('<', () => {
    expect(new Midnight(2018, 5, 15) < new Midnight(2018, 5, 14)).toBe(false)
    expect(new Midnight(2018, 5, 15) < new Midnight(2018, 5, 15)).toBe(false)
    expect(new Midnight(2018, 5, 15) < new Midnight(2018, 5, 16)).toBe(true)
  })

  test('<=', () => {
    expect(new Midnight(2018, 5, 15) <= new Midnight(2018, 5, 14)).toBe(false)
    expect(new Midnight(2018, 5, 15) <= new Midnight(2018, 5, 15)).toBe(true)
    expect(new Midnight(2018, 5, 15) <= new Midnight(2018, 5, 16)).toBe(true)
  })

  test('>', () => {
    expect(new Midnight(2018, 5, 15) > new Midnight(2018, 5, 14)).toBe(true)
    expect(new Midnight(2018, 5, 15) > new Midnight(2018, 5, 15)).toBe(false)
    expect(new Midnight(2018, 5, 15) > new Midnight(2018, 5, 16)).toBe(false)
  })

  test('>=', () => {
    expect(new Midnight(2018, 5, 15) >= new Midnight(2018, 5, 14)).toBe(true)
    expect(new Midnight(2018, 5, 15) >= new Midnight(2018, 5, 15)).toBe(true)
    expect(new Midnight(2018, 5, 15) >= new Midnight(2018, 5, 16)).toBe(false)
  })

})

describe('parse', () => {

  test('instance of', () => {
    expect(Midnight.parse('2018-05-15')).toBeInstanceOf(Midnight)
    expect(Midnight.parse('2018-05-15')).toBeInstanceOf(Date)
  })

  test('year', () => {
    expect(Midnight.parse('2018')).toBeDate(2018, 1, 1)
  })

  test('year month', () => {
    expect(Midnight.parse('2018-05')).toBeDate(2018, 5, 1)
    expect(Midnight.parse('2018/05')).toBeDate(2018, 5, 1)
    expect(Midnight.parse('2018.05')).toBeDate(2018, 5, 1)

    expect(Midnight.parse('2018-5')).toBeDate(2018, 5, 1)
    expect(Midnight.parse('2018/5')).toBeDate(2018, 5, 1)
    expect(Midnight.parse('2018.5')).toBeDate(2018, 5, 1)

    expect(Midnight.parse('201805')).toBeDate(2018, 5, 1)
  })

  test('month day', () => {
    const year = Midnight.today().year()
    expect(Midnight.parse('5/1')).toBeDate(year, 5, 1)
    expect(Midnight.parse('05/01')).toBeDate(year, 5, 1)

    expect(Midnight.parse('5-1')).toBeDate(year, 5, 1)
    expect(Midnight.parse('05-01')).toBeDate(year, 5, 1)

    expect(Midnight.parse('5.1')).toBeDate(year, 5, 1)
    expect(Midnight.parse('05.01')).toBeDate(year, 5, 1)
  })

  test('year month day', () => {
    expect(Midnight.parse('2018-05-05')).toBeDate(2018, 5, 5)
    expect(Midnight.parse('2018/05/05')).toBeDate(2018, 5, 5)
    expect(Midnight.parse('2018.05.05')).toBeDate(2018, 5, 5)

    expect(Midnight.parse('2018-5-5')).toBeDate(2018, 5, 5)
    expect(Midnight.parse('2018/5/5')).toBeDate(2018, 5, 5)
    expect(Midnight.parse('2018.5.5')).toBeDate(2018, 5, 5)

    expect(Midnight.parse('20180515')).toBeDate(2018, 5, 15)
  })

  test('before 100 year', () => {
    expect(Midnight.parse('00010101')).toBeDate(1, 1, 1)
    expect(Midnight.parse('00990101')).toBeDate(99, 1, 1)
    expect(Midnight.parse('01000101')).toBeDate(100, 1, 1)
  })

  test('complete: true', () => {
    Timecop.freeze()
    Timecop.travel(new Date('2019-01-01'))

    expect(Midnight.parse('1-1-1', true)).toBeDate(2001, 1, 1)
    expect(Midnight.parse('1/1/1', true)).toBeDate(2001, 1, 1)
    expect(Midnight.parse('1.1.1', true)).toBeDate(2001, 1, 1)

    expect(Midnight.parse('68.1.1', true)).toBeDate(2068, 1, 1)
    expect(Midnight.parse('69.1.1', true)).toBeDate(1969, 1, 1)

    expect(Midnight.parse('99-1-1', true)).toBeDate(1999, 1, 1)
    expect(Midnight.parse('99/1/1', true)).toBeDate(1999, 1, 1)
    expect(Midnight.parse('99.1.1', true)).toBeDate(1999, 1, 1)

    Timecop.return()
  })

  test('complete: false', () => {
    expect(Midnight.parse('1-1-1', false)).toBeDate(1, 1, 1)
    expect(Midnight.parse('1/1/1', false)).toBeDate(1, 1, 1)
    expect(Midnight.parse('1.1.1', false)).toBeDate(1, 1, 1)

    expect(Midnight.parse('99-1-1', false)).toBeDate(99, 1, 1)
    expect(Midnight.parse('99/1/1', false)).toBeDate(99, 1, 1)
    expect(Midnight.parse('99.1.1', false)).toBeDate(99, 1, 1)
  })

  test('invalid value', () => {
    expect(Midnight.parse('invalid date')).toEqual(null)
    expect(Midnight.parse(null)).toEqual(null)
    expect(Midnight.parse(undefined)).toEqual(null)
    expect(Midnight.parse(NaN)).toEqual(null)
    expect(Midnight.parse()).toEqual(null)
  })

})


test('instanceof Date', () => {
  const date = new Midnight()
  expect(date).toBeInstanceOf(Date)
})

test('differenceInDays', () => {
  const date = new Midnight(2017, 5, 22)
  expect(date.differenceInDays(new Date('2017-05-27'))).toBe(5)
  expect(date.differenceInDays(new Midnight(2017, 5, 27))).toBe(5)
  expect(date.differenceInDays('2017/05/27')).toBe(5)
  expect(date.differenceInDays(new Date('2017-04-10'))).toBe(-42)
  expect(date.differenceInDays(new Date('2017-05-22'))).toBe(0)
  expect(date.differenceInDays(new Date('2017-06-10'))).toBe(19)

  expect(date.differenceInDays(null)).toBe(null)
  expect(date.differenceInDays(undefined)).toBe(null)
  expect(date.differenceInDays('invalid date')).toBe(null)
})

test('endOfMonth', () => {
  expect(new Midnight(2016, 8, 1).endOfMonth()).toBeDate(2016, 8, 31)
  expect(new Midnight(2016, 8, 15).endOfMonth()).toBeDate(2016, 8, 31)
  expect(new Midnight(2016, 8, 31).endOfMonth()).toBeDate(2016, 8, 31)

  expect(new Midnight(2016, 2, 25).endOfMonth()).toBeDate(2016, 2, 29)
  expect(new Midnight(2017, 2, 25).endOfMonth()).toBeDate(2017, 2, 28)
})

test('endOfYear', () => {
  expect(new Midnight(2017, 1, 1).endOfYear()).toBeDate(2017, 12, 31)
  expect(new Midnight(2017, 5, 15).endOfYear()).toBeDate(2017, 12, 31)
  expect(new Midnight(2017, 12, 1).endOfYear()).toBeDate(2017, 12, 31)
  expect(new Midnight(2018, 1, 31).endOfYear()).toBeDate(2018, 12, 31)
})

test('endOfDecade', () => {
  expect(new Midnight(2009, 12, 31).endOfDecade()).toBeDate(2009, 12, 31)
  expect(new Midnight(2010, 1, 1).endOfDecade()).toBeDate(2019, 12, 31)
  expect(new Midnight(2015, 5, 15).endOfDecade()).toBeDate(2019, 12, 31)
  expect(new Midnight(2019, 12, 31).endOfDecade()).toBeDate(2019, 12, 31)
  expect(new Midnight(2020, 1, 1).endOfDecade()).toBeDate(2029, 12, 31)
})

test('equals', () => {
  const date = new Midnight(2017, 5, 20)
  expect(date.equals(new Date('2017-05-20'))).toBe(true)
  expect(date.equals('2017/05/20')).toBe(true)

  expect(date.equals('2017/05/21')).toBe(false)
  expect(date.equals(null)).toBe(false)
  expect(date.equals(undefined)).toBe(false)
  expect(date.equals('invalid date')).toBe(false)
})

test('static equals', () => {
  expect(Midnight.equals(new Date('2017-05-20'), new Date('2017-05-20'))).toBe(true)
  expect(Midnight.equals(new Date('2017-05-20 01:23:45'), new Date('2017-05-20 12:34:56'))).toBe(true)
  expect(Midnight.equals(new Date('2017-05-20'), new Date('2017-05-21'))).toBe(false)
  expect(Midnight.equals('2017/05/20', '2017/05/20')).toBe(true)
  expect(Midnight.equals('2017/05/20', '2017/05/21')).toBe(false)
  expect(Midnight.equals('2017/05/20 01:23:45', '2017/05/20 12:34:56')).toBe(true)
})

test('day', () => {
  const date = new Midnight(2017, 5, 15)
  expect(date.day()).toBe(15)
  expect(date.day(0)).toBeDate(2017, 4, 30)
  expect(date.day(1)).toBeDate(2017, 5, 1)
  expect(date.day(31)).toBeDate(2017, 5, 31)
  expect(date.day(32)).toBeDate(2017, 6, 1)
})

test('month', () => {
  let date = new Midnight(2017, 5, 15)
  expect(date.month()).toBe(5)
  expect(date.month(-1)).toBeDate(2016, 11, 15)
  expect(date.month(0)).toBeDate(2016, 12, 15)
  expect(date.month(4)).toBeDate(2017, 4, 15)
  expect(date.month(6)).toBeDate(2017, 6, 15)
  expect(date.month(12)).toBeDate(2017, 12, 15)
  expect(date.month(13)).toBeDate(2018, 1, 15)

  date = new Midnight(2016, 8, 31)
  expect(date.month(9)).toBeDate(2016, 9, 30)
  expect(date.month(2)).toBeDate(2016, 2, 29)
  expect(date.month(6)).toBeDate(2016, 6, 30)
})

test('nextDay', () => {
  const date = new Midnight(2017, 5, 15)
  expect(date.nextDay()).toBeDate(2017, 5, 16)
  expect(date.nextDay(-15)).toBeDate(2017, 4, 30)
  expect(date.nextDay(-1)).toBeDate(2017, 5, 14)
  expect(date.nextDay(0)).toBeDate(2017, 5, 15)
  expect(date.nextDay(1)).toBeDate(2017, 5, 16)
  expect(date.nextDay(17)).toBeDate(2017, 6, 1)
})

test('nextMonth', () => {
  let date = new Midnight(2016, 8, 1)
  expect(date.nextMonth()).toBeDate(2016, 9, 1)
  expect(date.nextMonth(1)).toBeDate(2016, 9, 1)
  expect(date.nextMonth(4)).toBeDate(2016, 12, 1)
  expect(date.nextMonth(5)).toBeDate(2017, 1, 1)

  date = new Midnight(2016, 8, 15)
  expect(date.nextMonth(-1)).toBeDate(2016, 7, 15)
  expect(date.nextMonth(0)).toBeDate(2016, 8, 15)
  expect(date.nextMonth(1)).toBeDate(2016, 9, 15)

  date = new Midnight(2016, 8, 31)
  expect(date.nextMonth(1)).toBeDate(2016, 9, 30)
  expect(date.nextMonth(6)).toBeDate(2017, 2, 28)
  expect(date.nextMonth(-2)).toBeDate(2016, 6, 30)
})

test('nextYear', () => {
  let date = new Midnight(2016, 5, 15)
  expect(date.nextYear()).toBeDate(2017, 5, 15)
  expect(date.nextYear(-1)).toBeDate(2015, 5, 15)
  expect(date.nextYear(0)).toBeDate(2016, 5, 15)
  expect(date.nextYear(1)).toBeDate(2017, 5, 15)

  date = new Midnight(2016, 2, 29)
  expect(date.nextYear(-1)).toBeDate(2015, 2, 28)
  expect(date.nextYear(1)).toBeDate(2017, 2, 28)
  expect(date.nextYear(4)).toBeDate(2020, 2, 29)
})

test('nextSunday', () => {
  expect(new Midnight(2018, 11, 11).nextSunday()).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 12).nextSunday()).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 13).nextSunday()).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 14).nextSunday()).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 15).nextSunday()).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 16).nextSunday()).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 17).nextSunday()).toBeDate(2018, 11, 18)

  expect(new Midnight(2018, 11, 14).nextSunday(1)).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 14).nextSunday(2)).toBeDate(2018, 11, 25)
  expect(new Midnight(2018, 11, 14).nextSunday(-1)).toBeDate(2018, 11, 11)
  expect(new Midnight(2018, 11, 14).nextSunday(-2)).toBeDate(2018, 11, 4)

  expect(new Midnight(2018, 11, 17).nextSunday(0)).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 18).nextSunday(0)).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 18).nextSunday(-0)).toBeDate(2018, 11, 18)
  expect(new Midnight(2018, 11, 19).nextSunday(-0)).toBeDate(2018, 11, 18)
})

test('nextMonday', () => {
  expect(new Midnight(2018, 11, 11).nextMonday()).toBeDate(2018, 11, 12)
  expect(new Midnight(2018, 11, 12).nextMonday()).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 13).nextMonday()).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 14).nextMonday()).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 15).nextMonday()).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 16).nextMonday()).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 17).nextMonday()).toBeDate(2018, 11, 19)

  expect(new Midnight(2018, 11, 15).nextMonday(1)).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 15).nextMonday(2)).toBeDate(2018, 11, 26)
  expect(new Midnight(2018, 11, 15).nextMonday(-1)).toBeDate(2018, 11, 12)
  expect(new Midnight(2018, 11, 15).nextMonday(-2)).toBeDate(2018, 11, 5)

  expect(new Midnight(2018, 11, 18).nextMonday(0)).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 19).nextMonday(0)).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 19).nextMonday(-0)).toBeDate(2018, 11, 19)
  expect(new Midnight(2018, 11, 20).nextMonday(-0)).toBeDate(2018, 11, 19)
})

test('nextTuesday', () => {
  expect(new Midnight(2018, 11, 11).nextTuesday()).toBeDate(2018, 11, 13)
  expect(new Midnight(2018, 11, 12).nextTuesday()).toBeDate(2018, 11, 13)
  expect(new Midnight(2018, 11, 13).nextTuesday()).toBeDate(2018, 11, 20)
  expect(new Midnight(2018, 11, 14).nextTuesday()).toBeDate(2018, 11, 20)
  expect(new Midnight(2018, 11, 15).nextTuesday()).toBeDate(2018, 11, 20)
  expect(new Midnight(2018, 11, 16).nextTuesday()).toBeDate(2018, 11, 20)
  expect(new Midnight(2018, 11, 17).nextTuesday()).toBeDate(2018, 11, 20)

  expect(new Midnight(2018, 11, 16).nextTuesday(1)).toBeDate(2018, 11, 20)
  expect(new Midnight(2018, 11, 16).nextTuesday(2)).toBeDate(2018, 11, 27)
  expect(new Midnight(2018, 11, 16).nextTuesday(-1)).toBeDate(2018, 11, 13)
  expect(new Midnight(2018, 11, 16).nextTuesday(-2)).toBeDate(2018, 11, 6)

  expect(new Midnight(2018, 11, 19).nextTuesday(0)).toBeDate(2018, 11, 20)
  expect(new Midnight(2018, 11, 20).nextTuesday(0)).toBeDate(2018, 11, 20)
  expect(new Midnight(2018, 11, 20).nextTuesday(-0)).toBeDate(2018, 11, 20)
  expect(new Midnight(2018, 11, 21).nextTuesday(-0)).toBeDate(2018, 11, 20)
})

test('nextWednesday', () => {
  expect(new Midnight(2018, 11, 11).nextWednesday()).toBeDate(2018, 11, 14)
  expect(new Midnight(2018, 11, 12).nextWednesday()).toBeDate(2018, 11, 14)
  expect(new Midnight(2018, 11, 13).nextWednesday()).toBeDate(2018, 11, 14)
  expect(new Midnight(2018, 11, 14).nextWednesday()).toBeDate(2018, 11, 21)
  expect(new Midnight(2018, 11, 15).nextWednesday()).toBeDate(2018, 11, 21)
  expect(new Midnight(2018, 11, 16).nextWednesday()).toBeDate(2018, 11, 21)
  expect(new Midnight(2018, 11, 17).nextWednesday()).toBeDate(2018, 11, 21)

  expect(new Midnight(2018, 11, 17).nextWednesday(1)).toBeDate(2018, 11, 21)
  expect(new Midnight(2018, 11, 17).nextWednesday(2)).toBeDate(2018, 11, 28)
  expect(new Midnight(2018, 11, 17).nextWednesday(-1)).toBeDate(2018, 11, 14)
  expect(new Midnight(2018, 11, 17).nextWednesday(-2)).toBeDate(2018, 11, 7)

  expect(new Midnight(2018, 11, 20).nextWednesday(0)).toBeDate(2018, 11, 21)
  expect(new Midnight(2018, 11, 21).nextWednesday(0)).toBeDate(2018, 11, 21)
  expect(new Midnight(2018, 11, 21).nextWednesday(-0)).toBeDate(2018, 11, 21)
  expect(new Midnight(2018, 11, 22).nextWednesday(-0)).toBeDate(2018, 11, 21)
})

test('nextThursday', () => {
  expect(new Midnight(2018, 11, 11).nextThursday()).toBeDate(2018, 11, 15)
  expect(new Midnight(2018, 11, 12).nextThursday()).toBeDate(2018, 11, 15)
  expect(new Midnight(2018, 11, 13).nextThursday()).toBeDate(2018, 11, 15)
  expect(new Midnight(2018, 11, 14).nextThursday()).toBeDate(2018, 11, 15)
  expect(new Midnight(2018, 11, 15).nextThursday()).toBeDate(2018, 11, 22)
  expect(new Midnight(2018, 11, 16).nextThursday()).toBeDate(2018, 11, 22)
  expect(new Midnight(2018, 11, 17).nextThursday()).toBeDate(2018, 11, 22)

  expect(new Midnight(2018, 11, 18).nextThursday(1)).toBeDate(2018, 11, 22)
  expect(new Midnight(2018, 11, 18).nextThursday(2)).toBeDate(2018, 11, 29)
  expect(new Midnight(2018, 11, 18).nextThursday(-1)).toBeDate(2018, 11, 15)
  expect(new Midnight(2018, 11, 18).nextThursday(-2)).toBeDate(2018, 11, 8)

  expect(new Midnight(2018, 11, 21).nextThursday(0)).toBeDate(2018, 11, 22)
  expect(new Midnight(2018, 11, 22).nextThursday(0)).toBeDate(2018, 11, 22)
  expect(new Midnight(2018, 11, 22).nextThursday(-0)).toBeDate(2018, 11, 22)
  expect(new Midnight(2018, 11, 23).nextThursday(-0)).toBeDate(2018, 11, 22)
})

test('nextFriday', () => {
  expect(new Midnight(2018, 11, 11).nextFriday()).toBeDate(2018, 11, 16)
  expect(new Midnight(2018, 11, 12).nextFriday()).toBeDate(2018, 11, 16)
  expect(new Midnight(2018, 11, 13).nextFriday()).toBeDate(2018, 11, 16)
  expect(new Midnight(2018, 11, 14).nextFriday()).toBeDate(2018, 11, 16)
  expect(new Midnight(2018, 11, 15).nextFriday()).toBeDate(2018, 11, 16)
  expect(new Midnight(2018, 11, 16).nextFriday()).toBeDate(2018, 11, 23)
  expect(new Midnight(2018, 11, 17).nextFriday()).toBeDate(2018, 11, 23)

  expect(new Midnight(2018, 11, 19).nextFriday(1)).toBeDate(2018, 11, 23)
  expect(new Midnight(2018, 11, 19).nextFriday(2)).toBeDate(2018, 11, 30)
  expect(new Midnight(2018, 11, 19).nextFriday(-1)).toBeDate(2018, 11, 16)
  expect(new Midnight(2018, 11, 19).nextFriday(-2)).toBeDate(2018, 11, 9)

  expect(new Midnight(2018, 11, 22).nextFriday(0)).toBeDate(2018, 11, 23)
  expect(new Midnight(2018, 11, 23).nextFriday(0)).toBeDate(2018, 11, 23)
  expect(new Midnight(2018, 11, 23).nextFriday(-0)).toBeDate(2018, 11, 23)
  expect(new Midnight(2018, 11, 24).nextFriday(-0)).toBeDate(2018, 11, 23)
})

test('nextSaturday', () => {
  expect(new Midnight(2018, 11, 11).nextSaturday()).toBeDate(2018, 11, 17)
  expect(new Midnight(2018, 11, 12).nextSaturday()).toBeDate(2018, 11, 17)
  expect(new Midnight(2018, 11, 13).nextSaturday()).toBeDate(2018, 11, 17)
  expect(new Midnight(2018, 11, 14).nextSaturday()).toBeDate(2018, 11, 17)
  expect(new Midnight(2018, 11, 15).nextSaturday()).toBeDate(2018, 11, 17)
  expect(new Midnight(2018, 11, 16).nextSaturday()).toBeDate(2018, 11, 17)
  expect(new Midnight(2018, 11, 17).nextSaturday()).toBeDate(2018, 11, 24)

  expect(new Midnight(2018, 11, 20).nextSaturday(1)).toBeDate(2018, 11, 24)
  expect(new Midnight(2018, 11, 20).nextSaturday(2)).toBeDate(2018, 12, 1)
  expect(new Midnight(2018, 11, 20).nextSaturday(-1)).toBeDate(2018, 11, 17)
  expect(new Midnight(2018, 11, 20).nextSaturday(-2)).toBeDate(2018, 11, 10)

  expect(new Midnight(2018, 11, 23).nextSaturday(0)).toBeDate(2018, 11, 24)
  expect(new Midnight(2018, 11, 24).nextSaturday(0)).toBeDate(2018, 11, 24)
  expect(new Midnight(2018, 11, 24).nextSaturday(-0)).toBeDate(2018, 11, 24)
  expect(new Midnight(2018, 11, 25).nextSaturday(-0)).toBeDate(2018, 11, 24)
})

describe('isToday', () => {

  test('today', () => {
    expect(new Midnight().isToday()).toBe(true)
    expect(new Midnight().nextDay(-1).isToday()).toBe(false)
    expect(new Midnight().nextDay(1).isToday()).toBe(false)
  })

  test('travel', () => {
    Timecop.freeze()
    Timecop.travel(new Date('2015-01-23'))
    expect(new Midnight().isToday()).toBe(true)
    Timecop.return()
  })

})

test('isSunday', () => {
  expect(new Midnight(2018, 11, 11).isSunday()).toBe(true)
  expect(new Midnight(2018, 11, 12).isSunday()).toBe(false)
  expect(new Midnight(2018, 11, 13).isSunday()).toBe(false)
  expect(new Midnight(2018, 11, 14).isSunday()).toBe(false)
  expect(new Midnight(2018, 11, 15).isSunday()).toBe(false)
  expect(new Midnight(2018, 11, 16).isSunday()).toBe(false)
  expect(new Midnight(2018, 11, 17).isSunday()).toBe(false)
})

test('isMonday', () => {
  expect(new Midnight(2018, 11, 11).isMonday()).toBe(false)
  expect(new Midnight(2018, 11, 12).isMonday()).toBe(true)
  expect(new Midnight(2018, 11, 13).isMonday()).toBe(false)
  expect(new Midnight(2018, 11, 14).isMonday()).toBe(false)
  expect(new Midnight(2018, 11, 15).isMonday()).toBe(false)
  expect(new Midnight(2018, 11, 16).isMonday()).toBe(false)
  expect(new Midnight(2018, 11, 17).isMonday()).toBe(false)
})

test('isTuesday', () => {
  expect(new Midnight(2018, 11, 11).isTuesday()).toBe(false)
  expect(new Midnight(2018, 11, 12).isTuesday()).toBe(false)
  expect(new Midnight(2018, 11, 13).isTuesday()).toBe(true)
  expect(new Midnight(2018, 11, 14).isTuesday()).toBe(false)
  expect(new Midnight(2018, 11, 15).isTuesday()).toBe(false)
  expect(new Midnight(2018, 11, 16).isTuesday()).toBe(false)
  expect(new Midnight(2018, 11, 17).isTuesday()).toBe(false)
})

test('isWednesday', () => {
  expect(new Midnight(2018, 11, 11).isWednesday()).toBe(false)
  expect(new Midnight(2018, 11, 12).isWednesday()).toBe(false)
  expect(new Midnight(2018, 11, 13).isWednesday()).toBe(false)
  expect(new Midnight(2018, 11, 14).isWednesday()).toBe(true)
  expect(new Midnight(2018, 11, 15).isWednesday()).toBe(false)
  expect(new Midnight(2018, 11, 16).isWednesday()).toBe(false)
  expect(new Midnight(2018, 11, 17).isWednesday()).toBe(false)
})

test('isThursday', () => {
  expect(new Midnight(2018, 11, 11).isThursday()).toBe(false)
  expect(new Midnight(2018, 11, 12).isThursday()).toBe(false)
  expect(new Midnight(2018, 11, 13).isThursday()).toBe(false)
  expect(new Midnight(2018, 11, 14).isThursday()).toBe(false)
  expect(new Midnight(2018, 11, 15).isThursday()).toBe(true)
  expect(new Midnight(2018, 11, 16).isThursday()).toBe(false)
  expect(new Midnight(2018, 11, 17).isThursday()).toBe(false)
})

test('isFriday', () => {
  expect(new Midnight(2018, 11, 11).isFriday()).toBe(false)
  expect(new Midnight(2018, 11, 12).isFriday()).toBe(false)
  expect(new Midnight(2018, 11, 13).isFriday()).toBe(false)
  expect(new Midnight(2018, 11, 14).isFriday()).toBe(false)
  expect(new Midnight(2018, 11, 15).isFriday()).toBe(false)
  expect(new Midnight(2018, 11, 16).isFriday()).toBe(true)
  expect(new Midnight(2018, 11, 17).isFriday()).toBe(false)
})

test('isSaturday', () => {
  expect(new Midnight(2018, 11, 11).isSaturday()).toBe(false)
  expect(new Midnight(2018, 11, 12).isSaturday()).toBe(false)
  expect(new Midnight(2018, 11, 13).isSaturday()).toBe(false)
  expect(new Midnight(2018, 11, 14).isSaturday()).toBe(false)
  expect(new Midnight(2018, 11, 15).isSaturday()).toBe(false)
  expect(new Midnight(2018, 11, 16).isSaturday()).toBe(false)
  expect(new Midnight(2018, 11, 17).isSaturday()).toBe(true)
})

test('isValid', () => {
  expect(new Midnight().isValid()).toBe(true)
  expect(new Midnight('invalid date').isValid()).toBe(false)
})

test('setHours', () => {
  const date = new Midnight(2016, 5, 20)
  const value = date.valueOf()
  expect(date.setHours(1)).toBe(value)
  expect(date.getHours(1)).toBe(0)
  date.setHours(-1)
  expect(date.getHours()).toBe(0)
  expect(date.getDate()).toBe(19)
})

test('setMinutes', () => {
  const date = new Midnight(2016, 5, 20)
  const value = date.valueOf()
  expect(date.setMinutes(1)).toBe(value)
  expect(date.getMinutes()).toBe(0)
})

test('setSeconds', () => {
  const date = new Midnight(2016, 5, 20)
  const value = date.valueOf()
  expect(date.setSeconds(1)).toBe(value)
  expect(date.getSeconds()).toBe(0)
})

test('setMilliseconds', () => {
  const date = new Midnight(2016, 5, 20)
  const value = date.valueOf()
  expect(date.setMilliseconds(1)).toBe(value)
  expect(date.getMilliseconds()).toBe(0)
})

test('setTime', () => {
  const d = new Date()
  const date = new Midnight(d)
  const time = date.getTime()
  date.setTime(d.getTime())
  expect(date.getTime()).toBe(time)
})

test('startOfMonth', () => {
  expect(new Midnight(2017, 5, 1).startOfMonth()).toBeDate(2017, 5, 1)
  expect(new Midnight(2017, 5, 15).startOfMonth()).toBeDate(2017, 5, 1)
  expect(new Midnight(2017, 5, 31).startOfMonth()).toBeDate(2017, 5, 1)
})

test('startOfYear', () => {
  expect(new Midnight(2017, 1, 1).startOfYear()).toBeDate(2017, 1, 1)
  expect(new Midnight(2017, 5, 15).startOfYear()).toBeDate(2017, 1, 1)
  expect(new Midnight(2017, 12, 31).startOfYear()).toBeDate(2017, 1, 1)
})

test('startOfDecade', () => {
  expect(new Midnight(2009, 12, 31).startOfDecade()).toBeDate(2000, 1, 1)
  expect(new Midnight(2010, 1, 1).startOfDecade()).toBeDate(2010, 1, 1)
  expect(new Midnight(2015, 5, 15).startOfDecade()).toBeDate(2010, 1, 1)
  expect(new Midnight(2019, 12, 31).startOfDecade()).toBeDate(2010, 1, 1)
  expect(new Midnight(2020, 1, 1).startOfDecade()).toBeDate(2020, 1, 1)
})

test('toObject', () => {
  const date = new Midnight(2017, 5, 20)
  expect(date.toObject()).toEqual({year: 2017, month: 5, day: 20})
})

test('year', () => {
  let date = new Midnight(2017, 5, 20)
  expect(date.year()).toBe(2017)
  expect(date.year(2016)).toBeDate(2016, 5, 20)
  expect(date.year(2018)).toBeDate(2018, 5, 20)

  date = new Midnight(2016, 2, 29)
  expect(date.year(2017)).toBeDate(2017, 2, 28)
})

test('immutable', () => {
  const value = '2017-05-20'
  const ymd = [2017, 5, 20]
  const date = new Midnight(value)
  date.day(1)
  expect(date).toBeDate(...ymd)
  date.month(1)
  expect(date).toBeDate(...ymd)
  date.year(2000)
  expect(date).toBeDate(...ymd)
  date.nextDay(1)
  expect(date).toBeDate(...ymd)
  date.nextMonth(1)
  expect(date).toBeDate(...ymd)
  date.nextYear(1)
  expect(date).toBeDate(...ymd)
  date.startOfMonth()
  expect(date).toBeDate(...ymd)
  date.startOfYear()
  expect(date).toBeDate(...ymd)
  date.startOfDecade()
  expect(date).toBeDate(...ymd)
  date.endOfMonth()
  expect(date).toBeDate(...ymd)
  date.endOfYear()
  expect(date).toBeDate(...ymd)
  date.endOfDecade()
  expect(date).toBeDate(...ymd)
})
