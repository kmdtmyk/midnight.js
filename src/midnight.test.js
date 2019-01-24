import Midnight from './midnight'

expect.extend({
  toSameDate(received, argument){
    const date1 = new Date(received)
    const date2 = new Date(argument)
    const pass = date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
    return {
      pass,
      message(){
        if(pass){
          return `${received} and ${argument} are same date`
        }else{
          return `${received} and ${argument} are not same date`
        }
      }
    }
  }
})

describe('constructor', () => {

  test('no argument', () => {
    const date = new Midnight()
    expect(date).toSameDate(new Date())
  })

  test('one argument', () => {
    expect(new Midnight('2018/05/15')).toSameDate('2018/05/15')
    expect(new Midnight('2018-05-15')).toSameDate('2018/05/15')
  })

  test('year and month', () => {
    expect(new Midnight(2018, 0)).toSameDate('2017/12/01')
    expect(new Midnight(2018, 1)).toSameDate('2018/01/01')
    expect(new Midnight(2018, 5)).toSameDate('2018/05/01')
    expect(new Midnight(2018, 12)).toSameDate('2018/12/01')
    expect(new Midnight(2018, 13)).toSameDate('2019/01/01')
  })

  test('year, month and day', () => {
    expect(new Midnight(2018, 5, 0)).toSameDate('2018/04/30')
    expect(new Midnight(2018, 5, 1)).toSameDate('2018/05/01')
    expect(new Midnight(2018, 5, 31)).toSameDate('2018/05/31')
    expect(new Midnight(2018, 5, 32)).toSameDate('2018/06/01')

    expect(new Midnight(2018, 0, 15)).toSameDate('2017/12/15')
    expect(new Midnight(2018, 1, 15)).toSameDate('2018/01/15')
    expect(new Midnight(2018, 5, 15)).toSameDate('2018/05/15')
    expect(new Midnight(2018, 12, 15)).toSameDate('2018/12/15')
    expect(new Midnight(2018, 13, 15)).toSameDate('2019/01/15')
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

  test('instance of Date', () => {
    expect(new Midnight()).toBeInstanceOf(Date)
  })

})

describe('operator', () => {

  test.skip('==', () => {
    expect(new Midnight('2018/05/15') == new Midnight('2018/05/14')).toBe(false)
    expect(new Midnight('2018/05/15') == new Midnight('2018/05/15')).toBe(true)
    expect(new Midnight('2018/05/15') == new Midnight('2018/05/16')).toBe(false)
  })

  test.skip('!=', () => {
    expect(new Midnight('2018/05/15') != new Midnight('2018/05/14')).toBe(true)
    expect(new Midnight('2018/05/15') != new Midnight('2018/05/15')).toBe(false)
    expect(new Midnight('2018/05/15') != new Midnight('2018/05/16')).toBe(true)
  })

  test('<', () => {
    expect(new Midnight('2018/05/15') < new Midnight('2018/05/14')).toBe(false)
    expect(new Midnight('2018/05/15') < new Midnight('2018/05/15')).toBe(false)
    expect(new Midnight('2018/05/15') < new Midnight('2018/05/16')).toBe(true)
  })

  test('<=', () => {
    expect(new Midnight('2018/05/15') <= new Midnight('2018/05/14')).toBe(false)
    expect(new Midnight('2018/05/15') <= new Midnight('2018/05/15')).toBe(true)
    expect(new Midnight('2018/05/15') <= new Midnight('2018/05/16')).toBe(true)
  })

  test('>', () => {
    expect(new Midnight('2018/05/15') > new Midnight('2018/05/14')).toBe(true)
    expect(new Midnight('2018/05/15') > new Midnight('2018/05/15')).toBe(false)
    expect(new Midnight('2018/05/15') > new Midnight('2018/05/16')).toBe(false)
  })

  test('>=', () => {
    expect(new Midnight('2018/05/15') >= new Midnight('2018/05/14')).toBe(true)
    expect(new Midnight('2018/05/15') >= new Midnight('2018/05/15')).toBe(true)
    expect(new Midnight('2018/05/15') >= new Midnight('2018/05/16')).toBe(false)
  })

})

describe('parse', () => {

  test('instance of', () => {
    expect(Midnight.parse('2018-05-15')).toBeInstanceOf(Midnight)
    expect(Midnight.parse('2018-05-15')).toBeInstanceOf(Date)
  })

  test('valid value', () => {
    expect(Midnight.parse('2018-05-15')).toEqual(new Midnight(2018, 5, 15))
    expect(Midnight.parse('2018-05')).toEqual(new Midnight(2018, 5, 1))

    expect(Midnight.parse('2018/05/15')).toEqual(new Midnight(2018, 5, 15))
    expect(Midnight.parse('2018/05')).toEqual(new Midnight(2018, 5, 1))

    expect(Midnight.parse('20180515')).toEqual(new Midnight(2018, 5, 15))
    expect(Midnight.parse('201805')).toEqual(new Midnight(2018, 5, 1))
    expect(Midnight.parse('2018')).toEqual(new Midnight(2018, 1, 1))
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
  const date = new Midnight('2017/05/22')
  expect(date.differenceInDays(new Date('2017/05/27'))).toBe(5)
  expect(date.differenceInDays(new Midnight('2017/05/27'))).toBe(5)
  expect(date.differenceInDays('2017/05/27')).toBe(5)
  expect(date.differenceInDays(new Date('2017/04/10'))).toBe(-42)
  expect(date.differenceInDays(new Date('2017/05/22'))).toBe(0)
  expect(date.differenceInDays(new Date('2017/06/10'))).toBe(19)
  expect(date.differenceInDays(null)).toBe(NaN)
  expect(date.differenceInDays(undefined)).toBe(NaN)
  expect(date.differenceInDays('invalid date')).toBe(NaN)
})

test('endOfMonth', () => {
  expect(new Midnight('2016/08/01').endOfMonth()).toSameDate('2016/08/31')
  expect(new Midnight('2016/08/15').endOfMonth()).toSameDate('2016/08/31')
  expect(new Midnight('2016/08/31').endOfMonth()).toSameDate('2016/08/31')

  expect(new Midnight('2016/02/25').endOfMonth()).toSameDate('2016/02/29')
  expect(new Midnight('2017/02/25').endOfMonth()).toSameDate('2017/02/28')
})

test('endOfYear', () => {
  expect(new Midnight('2017/01/01').endOfYear()).toSameDate('2017/12/31')
  expect(new Midnight('2017/05/15').endOfYear()).toSameDate('2017/12/31')
  expect(new Midnight('2017/12/01').endOfYear()).toSameDate('2017/12/31')
  expect(new Midnight('2018/01/31').endOfYear()).toSameDate('2018/12/31')
})

test('equals', () => {
  const date = new Midnight('2017/05/20')
  expect(date.equals(new Date('2017/05/20'))).toBe(true)
  expect(date.equals(new Date('2017-05-20'))).toBe(true)
  expect(date.equals('2017/05/20')).toBe(true)

  expect(date.equals('2017/05/21')).toBe(false)
  expect(date.equals(null)).toBe(false)
  expect(date.equals(undefined)).toBe(false)
  expect(date.equals('invalid date')).toBe(false)
})

test('static equals', () => {
  expect(Midnight.equals(new Date('2017/05/20'), new Date('2017/05/20'))).toBe(true)
  expect(Midnight.equals(new Date('2017/05/20 01:23:45'), new Date('2017/05/20 12:34:56'))).toBe(true)
  expect(Midnight.equals(new Date('2017/05/20'), new Date('2017/05/21'))).toBe(false)
  expect(Midnight.equals('2017/05/20', '2017/05/20')).toBe(true)
  expect(Midnight.equals('2017/05/20', '2017/05/21')).toBe(false)
  expect(Midnight.equals('2017/05/20 01:23:45', '2017/05/20 12:34:56')).toBe(true)
})

test('day', () => {
  const date = new Midnight('2017/05/15')
  expect(date.day()).toBe(15)
  expect(date.day(0)).toSameDate('2017/04/30')
  expect(date.day(1)).toSameDate('2017/05/01')
  expect(date.day(31)).toSameDate('2017/05/31')
  expect(date.day(32)).toSameDate('2017/06/01')
})

test('month', () => {
  let date = new Midnight('2017/05/15')
  expect(date.month()).toBe(5)
  expect(date.month(-1)).toSameDate('2016/11/15')
  expect(date.month(0)).toSameDate('2016/12/15')
  expect(date.month(4)).toSameDate('2017/04/15')
  expect(date.month(6)).toSameDate('2017/06/15')
  expect(date.month(12)).toSameDate('2017/12/15')
  expect(date.month(13)).toSameDate('2018/01/15')

  date = new Midnight('2016/08/31')
  expect(date.month(9)).toSameDate('2016/09/30')
  expect(date.month(2)).toSameDate('2016/02/29')
  expect(date.month(6)).toSameDate('2016/06/30')
})

test('nextDay', () => {
  const date = new Midnight('2017/05/15')
  expect(date.nextDay()).toSameDate('2017/05/16')
  expect(date.nextDay(-15)).toSameDate('2017/04/30')
  expect(date.nextDay(-1)).toSameDate('2017/05/14')
  expect(date.nextDay(0)).toSameDate('2017/05/15')
  expect(date.nextDay(1)).toSameDate('2017/05/16')
  expect(date.nextDay(17)).toSameDate('2017/06/01')
})

test('nextMonth', () => {
  let date = new Midnight('2016/08/01')
  expect(date.nextMonth()).toSameDate('2016/09/01')
  expect(date.nextMonth(1)).toSameDate('2016/09/01')
  expect(date.nextMonth(4)).toSameDate('2016/12/01')
  expect(date.nextMonth(5)).toSameDate('2017/01/01')

  date = new Midnight('2016/08/15')
  expect(date.nextMonth(-1)).toSameDate('2016/07/15')
  expect(date.nextMonth(0)).toSameDate('2016/08/15')
  expect(date.nextMonth(1)).toSameDate('2016/09/15')

  date = new Midnight('2016/08/31')
  expect(date.nextMonth(1)).toSameDate('2016/09/30')
  expect(date.nextMonth(6)).toSameDate('2017/02/28')
  expect(date.nextMonth(-2)).toSameDate('2016/06/30')
})

test('nextYear', () => {
  let date = new Midnight('2016/05/15')
  expect(date.nextYear()).toSameDate('2017/05/15')
  expect(date.nextYear(-1)).toSameDate('2015/05/15')
  expect(date.nextYear(0)).toSameDate('2016/05/15')
  expect(date.nextYear(1)).toSameDate('2017/05/15')

  date = new Midnight('2016/02/29')
  expect(date.nextYear(-1)).toSameDate('2015/02/28')
  expect(date.nextYear(1)).toSameDate('2017/02/28')
  expect(date.nextYear(4)).toSameDate('2020/02/29')
})

test('nextSunday', () => {
  expect(new Midnight('2018/11/11').nextSunday()).toSameDate('2018/11/18')
  expect(new Midnight('2018/11/12').nextSunday()).toSameDate('2018/11/18')
  expect(new Midnight('2018/11/13').nextSunday()).toSameDate('2018/11/18')
  expect(new Midnight('2018/11/14').nextSunday()).toSameDate('2018/11/18')
  expect(new Midnight('2018/11/15').nextSunday()).toSameDate('2018/11/18')
  expect(new Midnight('2018/11/16').nextSunday()).toSameDate('2018/11/18')
  expect(new Midnight('2018/11/17').nextSunday()).toSameDate('2018/11/18')

  expect(new Midnight('2018/11/14').nextSunday(1)).toSameDate('2018/11/18')
  expect(new Midnight('2018/11/14').nextSunday(2)).toSameDate('2018/11/25')
  expect(new Midnight('2018/11/14').nextSunday(-1)).toSameDate('2018/11/11')
  expect(new Midnight('2018/11/14').nextSunday(-2)).toSameDate('2018/11/04')
})

test('nextMonday', () => {
  expect(new Midnight('2018/11/11').nextMonday()).toSameDate('2018/11/12')
  expect(new Midnight('2018/11/12').nextMonday()).toSameDate('2018/11/19')
  expect(new Midnight('2018/11/13').nextMonday()).toSameDate('2018/11/19')
  expect(new Midnight('2018/11/14').nextMonday()).toSameDate('2018/11/19')
  expect(new Midnight('2018/11/15').nextMonday()).toSameDate('2018/11/19')
  expect(new Midnight('2018/11/16').nextMonday()).toSameDate('2018/11/19')
  expect(new Midnight('2018/11/17').nextMonday()).toSameDate('2018/11/19')

  expect(new Midnight('2018/11/15').nextMonday(1)).toSameDate('2018/11/19')
  expect(new Midnight('2018/11/15').nextMonday(2)).toSameDate('2018/11/26')
  expect(new Midnight('2018/11/15').nextMonday(-1)).toSameDate('2018/11/12')
  expect(new Midnight('2018/11/15').nextMonday(-2)).toSameDate('2018/11/05')
})

test('nextTuesday', () => {
  expect(new Midnight('2018/11/11').nextTuesday()).toSameDate('2018/11/13')
  expect(new Midnight('2018/11/12').nextTuesday()).toSameDate('2018/11/13')
  expect(new Midnight('2018/11/13').nextTuesday()).toSameDate('2018/11/20')
  expect(new Midnight('2018/11/14').nextTuesday()).toSameDate('2018/11/20')
  expect(new Midnight('2018/11/15').nextTuesday()).toSameDate('2018/11/20')
  expect(new Midnight('2018/11/16').nextTuesday()).toSameDate('2018/11/20')
  expect(new Midnight('2018/11/17').nextTuesday()).toSameDate('2018/11/20')

  expect(new Midnight('2018/11/16').nextTuesday(1)).toSameDate('2018/11/20')
  expect(new Midnight('2018/11/16').nextTuesday(2)).toSameDate('2018/11/27')
  expect(new Midnight('2018/11/16').nextTuesday(-1)).toSameDate('2018/11/13')
  expect(new Midnight('2018/11/16').nextTuesday(-2)).toSameDate('2018/11/06')
})

test('nextWednesday', () => {
  expect(new Midnight('2018/11/11').nextWednesday()).toSameDate('2018/11/14')
  expect(new Midnight('2018/11/12').nextWednesday()).toSameDate('2018/11/14')
  expect(new Midnight('2018/11/13').nextWednesday()).toSameDate('2018/11/14')
  expect(new Midnight('2018/11/14').nextWednesday()).toSameDate('2018/11/21')
  expect(new Midnight('2018/11/15').nextWednesday()).toSameDate('2018/11/21')
  expect(new Midnight('2018/11/16').nextWednesday()).toSameDate('2018/11/21')
  expect(new Midnight('2018/11/17').nextWednesday()).toSameDate('2018/11/21')

  expect(new Midnight('2018/11/17').nextWednesday(1)).toSameDate('2018/11/21')
  expect(new Midnight('2018/11/17').nextWednesday(2)).toSameDate('2018/11/28')
  expect(new Midnight('2018/11/17').nextWednesday(-1)).toSameDate('2018/11/14')
  expect(new Midnight('2018/11/17').nextWednesday(-2)).toSameDate('2018/11/07')
})

test('nextThursday', () => {
  expect(new Midnight('2018/11/11').nextThursday()).toSameDate('2018/11/15')
  expect(new Midnight('2018/11/12').nextThursday()).toSameDate('2018/11/15')
  expect(new Midnight('2018/11/13').nextThursday()).toSameDate('2018/11/15')
  expect(new Midnight('2018/11/14').nextThursday()).toSameDate('2018/11/15')
  expect(new Midnight('2018/11/15').nextThursday()).toSameDate('2018/11/22')
  expect(new Midnight('2018/11/16').nextThursday()).toSameDate('2018/11/22')
  expect(new Midnight('2018/11/17').nextThursday()).toSameDate('2018/11/22')

  expect(new Midnight('2018/11/18').nextThursday(1)).toSameDate('2018/11/22')
  expect(new Midnight('2018/11/18').nextThursday(2)).toSameDate('2018/11/29')
  expect(new Midnight('2018/11/18').nextThursday(-1)).toSameDate('2018/11/15')
  expect(new Midnight('2018/11/18').nextThursday(-2)).toSameDate('2018/11/08')
})

test('nextFriday', () => {
  expect(new Midnight('2018/11/11').nextFriday()).toSameDate('2018/11/16')
  expect(new Midnight('2018/11/12').nextFriday()).toSameDate('2018/11/16')
  expect(new Midnight('2018/11/13').nextFriday()).toSameDate('2018/11/16')
  expect(new Midnight('2018/11/14').nextFriday()).toSameDate('2018/11/16')
  expect(new Midnight('2018/11/15').nextFriday()).toSameDate('2018/11/16')
  expect(new Midnight('2018/11/16').nextFriday()).toSameDate('2018/11/23')
  expect(new Midnight('2018/11/17').nextFriday()).toSameDate('2018/11/23')

  expect(new Midnight('2018/11/19').nextFriday(1)).toSameDate('2018/11/23')
  expect(new Midnight('2018/11/19').nextFriday(2)).toSameDate('2018/11/30')
  expect(new Midnight('2018/11/19').nextFriday(-1)).toSameDate('2018/11/16')
  expect(new Midnight('2018/11/19').nextFriday(-2)).toSameDate('2018/11/09')
})

test('nextSaturday', () => {
  expect(new Midnight('2018/11/11').nextSaturday()).toSameDate('2018/11/17')
  expect(new Midnight('2018/11/12').nextSaturday()).toSameDate('2018/11/17')
  expect(new Midnight('2018/11/13').nextSaturday()).toSameDate('2018/11/17')
  expect(new Midnight('2018/11/14').nextSaturday()).toSameDate('2018/11/17')
  expect(new Midnight('2018/11/15').nextSaturday()).toSameDate('2018/11/17')
  expect(new Midnight('2018/11/16').nextSaturday()).toSameDate('2018/11/17')
  expect(new Midnight('2018/11/17').nextSaturday()).toSameDate('2018/11/24')

  expect(new Midnight('2018/11/20').nextSaturday(1)).toSameDate('2018/11/24')
  expect(new Midnight('2018/11/20').nextSaturday(2)).toSameDate('2018/12/01')
  expect(new Midnight('2018/11/20').nextSaturday(-1)).toSameDate('2018/11/17')
  expect(new Midnight('2018/11/20').nextSaturday(-2)).toSameDate('2018/11/10')
})

test('isToday', () => {
  expect(new Midnight().isToday()).toBe(true)
  expect(new Midnight().nextDay(-1).isToday()).toBe(false)
  expect(new Midnight().nextDay(1).isToday()).toBe(false)
})

test('isSunday', () => {
  expect(new Midnight('2018/11/11').isSunday()).toBe(true)
  expect(new Midnight('2018/11/12').isSunday()).toBe(false)
  expect(new Midnight('2018/11/13').isSunday()).toBe(false)
  expect(new Midnight('2018/11/14').isSunday()).toBe(false)
  expect(new Midnight('2018/11/15').isSunday()).toBe(false)
  expect(new Midnight('2018/11/16').isSunday()).toBe(false)
  expect(new Midnight('2018/11/17').isSunday()).toBe(false)
})

test('isMonday', () => {
  expect(new Midnight('2018/11/11').isMonday()).toBe(false)
  expect(new Midnight('2018/11/12').isMonday()).toBe(true)
  expect(new Midnight('2018/11/13').isMonday()).toBe(false)
  expect(new Midnight('2018/11/14').isMonday()).toBe(false)
  expect(new Midnight('2018/11/15').isMonday()).toBe(false)
  expect(new Midnight('2018/11/16').isMonday()).toBe(false)
  expect(new Midnight('2018/11/17').isMonday()).toBe(false)
})

test('isTuesday', () => {
  expect(new Midnight('2018/11/11').isTuesday()).toBe(false)
  expect(new Midnight('2018/11/12').isTuesday()).toBe(false)
  expect(new Midnight('2018/11/13').isTuesday()).toBe(true)
  expect(new Midnight('2018/11/14').isTuesday()).toBe(false)
  expect(new Midnight('2018/11/15').isTuesday()).toBe(false)
  expect(new Midnight('2018/11/16').isTuesday()).toBe(false)
  expect(new Midnight('2018/11/17').isTuesday()).toBe(false)
})

test('isWednesday', () => {
  expect(new Midnight('2018/11/11').isWednesday()).toBe(false)
  expect(new Midnight('2018/11/12').isWednesday()).toBe(false)
  expect(new Midnight('2018/11/13').isWednesday()).toBe(false)
  expect(new Midnight('2018/11/14').isWednesday()).toBe(true)
  expect(new Midnight('2018/11/15').isWednesday()).toBe(false)
  expect(new Midnight('2018/11/16').isWednesday()).toBe(false)
  expect(new Midnight('2018/11/17').isWednesday()).toBe(false)
})

test('isThursday', () => {
  expect(new Midnight('2018/11/11').isThursday()).toBe(false)
  expect(new Midnight('2018/11/12').isThursday()).toBe(false)
  expect(new Midnight('2018/11/13').isThursday()).toBe(false)
  expect(new Midnight('2018/11/14').isThursday()).toBe(false)
  expect(new Midnight('2018/11/15').isThursday()).toBe(true)
  expect(new Midnight('2018/11/16').isThursday()).toBe(false)
  expect(new Midnight('2018/11/17').isThursday()).toBe(false)
})

test('isFriday', () => {
  expect(new Midnight('2018/11/11').isFriday()).toBe(false)
  expect(new Midnight('2018/11/12').isFriday()).toBe(false)
  expect(new Midnight('2018/11/13').isFriday()).toBe(false)
  expect(new Midnight('2018/11/14').isFriday()).toBe(false)
  expect(new Midnight('2018/11/15').isFriday()).toBe(false)
  expect(new Midnight('2018/11/16').isFriday()).toBe(true)
  expect(new Midnight('2018/11/17').isFriday()).toBe(false)
})

test('isSaturday', () => {
  expect(new Midnight('2018/11/11').isSaturday()).toBe(false)
  expect(new Midnight('2018/11/12').isSaturday()).toBe(false)
  expect(new Midnight('2018/11/13').isSaturday()).toBe(false)
  expect(new Midnight('2018/11/14').isSaturday()).toBe(false)
  expect(new Midnight('2018/11/15').isSaturday()).toBe(false)
  expect(new Midnight('2018/11/16').isSaturday()).toBe(false)
  expect(new Midnight('2018/11/17').isSaturday()).toBe(true)
})

test('isValid', () => {
  expect(new Midnight().isValid()).toBe(true)
  expect(new Midnight('invalid date').isValid()).toBe(false)
})

test('setHours', () => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  expect(date.setHours(1)).toBe(value)
  expect(date.getHours(1)).toBe(0)
  date.setHours(-1)
  expect(date.getHours()).toBe(0)
  expect(date.getDate()).toBe(19)
})

test('setMinutes', () => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  expect(date.setMinutes(1)).toBe(value)
  expect(date.getMinutes()).toBe(0)
})

test('setSeconds', () => {
  const date = new Midnight('2016/05/20')
  const value = date.valueOf()
  expect(date.setSeconds(1)).toBe(value)
  expect(date.getSeconds()).toBe(0)
})

test('setMilliseconds', () => {
  const date = new Midnight('2016/05/20')
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
  expect(new Midnight('2017/05/01').startOfMonth()).toSameDate('2017/05/01')
  expect(new Midnight('2017/05/15').startOfMonth()).toSameDate('2017/05/01')
  expect(new Midnight('2017/05/31').startOfMonth()).toSameDate('2017/05/01')
})

test('startOfYear', () => {
  expect(new Midnight('2017/01/01').startOfYear()).toSameDate('2017/01/01')
  expect(new Midnight('2017/05/15').startOfYear()).toSameDate('2017/01/01')
  expect(new Midnight('2017/12/31').startOfYear()).toSameDate('2017/01/01')
})

test('toObject', () => {
  const date = new Midnight('2017/05/20')
  expect(date.toObject()).toEqual({year: 2017, month: 5, day: 20})
})

test('year', () => {
  let date = new Midnight('2017/05/20')
  expect(date.year()).toBe(2017)
  expect(date.year(2016)).toSameDate('2016/05/20')
  expect(date.year(2018)).toSameDate('2018/05/20')

  date = new Midnight('2016/02/29')
  expect(date.year(2017)).toSameDate('2017/02/28')
})

test('immutable', () => {
  const value = '2017/05/20'
  const date = new Midnight(value)
  date.day(1)
  expect(date).toSameDate(value)
  date.month(1)
  expect(date).toSameDate(value)
  date.year(2000)
  expect(date).toSameDate(value)
  date.nextDay(1)
  expect(date).toSameDate(value)
  date.nextMonth(1)
  expect(date).toSameDate(value)
  date.nextYear(1)
  expect(date).toSameDate(value)
  date.startOfMonth()
  expect(date).toSameDate(value)
  date.startOfYear()
  expect(date).toSameDate(value)
  date.endOfMonth()
  expect(date).toSameDate(value)
  date.endOfYear()
  expect(date).toSameDate(value)
})
