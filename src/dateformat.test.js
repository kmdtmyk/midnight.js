import dateFormat from 'dateformat'
import Midnight from './midnight'

describe('dateFormat', () => {

  test('yyyy', () => {
    expect(dateFormat(new Midnight(2019, 5, 15), 'yyyy')).toBe('2019')
  })

  test('yy', () => {
    expect(dateFormat(new Midnight(2019, 5, 15), 'yy')).toBe('19')
  })

  test('mm', () => {
    expect(dateFormat(new Midnight(2019, 5, 15), 'mm')).toBe('05')
    expect(dateFormat(new Midnight(2019, 12, 15), 'mm')).toBe('12')
  })

  test('m', () => {
    expect(dateFormat(new Midnight(2019, 5, 15), 'm')).toBe('5')
    expect(dateFormat(new Midnight(2019, 12, 15), 'm')).toBe('12')
  })

  test('dd', () => {
    expect(dateFormat(new Midnight(2019, 5, 8), 'dd')).toBe('08')
    expect(dateFormat(new Midnight(2019, 5, 15), 'dd')).toBe('15')
  })

  test('d', () => {
    expect(dateFormat(new Midnight(2019, 5, 8), 'd')).toBe('8')
    expect(dateFormat(new Midnight(2019, 5, 15), 'd')).toBe('15')
  })

})
