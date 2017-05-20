import test from 'ava'
import Midnight from '../dist/midnight'

test('time is fixed on 00:00:00.000', t => {
  const date = new Midnight()
  t.is(date.getHours(), 0)
  t.is(date.getMinutes(), 0)
  t.is(date.getSeconds(), 0)
  t.is(date.getMilliseconds(), 0)
})

test('addDays', t => {
  const date = new Midnight('2017/05/15')
  t.true(Midnight.equals(date.addDays(-15), '2017/04/30'))
  t.true(Midnight.equals(date.addDays(-1), '2017/05/14'))
  t.true(Midnight.equals(date.addDays(0), '2017/05/15'))
  t.true(Midnight.equals(date.addDays(1), '2017/05/16'))
  t.true(Midnight.equals(date.addDays(17), '2017/06/01'))
})

test('addMonths', t => {
  let date = new Midnight('2016/08/01')
  t.true(Midnight.equals(date.addMonths(1), '2016/09/01'))
  t.true(Midnight.equals(date.addMonths(4), '2016/12/01'))
  t.true(Midnight.equals(date.addMonths(5), '2017/01/01'))

  date = new Midnight('2016/08/15')
  t.true(Midnight.equals(date.addMonths(-1), '2016/07/15'))
  t.true(Midnight.equals(date.addMonths(0), '2016/08/15'))
  t.true(Midnight.equals(date.addMonths(1), '2016/09/15'))

  date = new Midnight('2016/08/31')
  t.true(Midnight.equals(date.addMonths(1), '2016/09/30'))
  t.true(Midnight.equals(date.addMonths(6), '2017/02/28'))
  t.true(Midnight.equals(date.addMonths(-2), '2016/06/30'))
})

test('addYears', t => {
  let date = new Midnight('2016/05/15')
  t.true(Midnight.equals(date.addYears(-1), '2015/05/15'))
  t.true(Midnight.equals(date.addYears(0), '2016/05/15'))
  t.true(Midnight.equals(date.addYears(1), '2017/05/15'))

  date = new Midnight('2016/02/29')
  t.true(Midnight.equals(date.addYears(-1), '2015/02/28'))
  t.true(Midnight.equals(date.addYears(1), '2017/02/28'))
  t.true(Midnight.equals(date.addYears(4), '2020/02/29'))
})

test('create', t => {
  t.true(Midnight.equals(Midnight.create(2017, 5, 20), '2017/05/20'))
  t.true(Midnight.equals(Midnight.create(2017, 5, 0), '2017/04/30'))
  t.true(Midnight.equals(Midnight.create(2017, 5, 32), '2017/06/01'))
})

test('equals', t => {
  const date = new Midnight('2017/05/20')
  t.true(date.equals(new Date('2017/05/20')))
  t.true(date.equals(new Date('2017-05-20')))
  t.true(date.equals('2017/05/20'))

  t.false(date.equals(new Date('2017/05/21')))
  t.false(date.equals(null))
  t.false(date.equals(undefined))
})

test('static equals', t => {
  t.true(Midnight.equals(new Date('2017/05/20'), new Date('2017/05/20')))
  t.true(Midnight.equals(new Date('2017/05/20 01:23:45'), new Date('2017/05/20 12:34:56')))
  t.false(Midnight.equals(new Date('2017/05/20'), new Date('2017/05/21')))
  t.true(Midnight.equals('2017/05/20', '2017/05/20'))
  t.false(Midnight.equals('2017/05/20', '2017/05/21'))
})

test('day', t => {
  const date = new Midnight('2017/05/15')
  t.is(date.day(), 15)
  t.true(Midnight.equals(date.day(0), '2017/04/30'))
  t.true(Midnight.equals(date.day(1), '2017/05/01'))
  t.true(Midnight.equals(date.day(31), '2017/05/31'))
  t.true(Midnight.equals(date.day(32), '2017/06/01'))
})

test('month', t => {
  let date = new Midnight('2017/05/15')
  t.is(date.month(), 5)
  t.true(Midnight.equals(date.month(4), '2017/04/15'))
  t.true(Midnight.equals(date.month(6), '2017/06/15'))

  date = new Midnight('2016/08/31')
  t.true(Midnight.equals(date.month(9), '2016/09/30'))
  t.true(Midnight.equals(date.month(2), '2016/02/29'))
  t.true(Midnight.equals(date.month(6), '2016/06/30'))
})

test('startOfMonth', t => {
  t.true(Midnight.equals(new Midnight('2017/05/01').startOfMonth(), '2017/05/01'))
  t.true(Midnight.equals(new Midnight('2017/05/20').startOfMonth(), '2017/05/01'))
  t.true(Midnight.equals(new Midnight('2017/05/31').startOfMonth(), '2017/05/01'))
})

test('toObject', t => {
  const date = new Midnight('2017/05/20')
  t.deepEqual(date.toObject(), {year: 2017, month: 5, day: 20})
})

test('year', t => {
  let date = new Midnight('2017/05/20')
  t.is(date.year(), 2017)
  t.true(Midnight.equals(date.year(2016), '2016/05/20'))
  t.true(Midnight.equals(date.year(2018), '2018/05/20'))

  date = new Midnight('2016/02/29')
  t.true(Midnight.equals(date.year(2017), '2017/02/28'))
})
