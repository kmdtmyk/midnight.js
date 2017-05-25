const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export default class Midnight extends Date{

  constructor(){
    super(...arguments)
    this._fixTime()
  }

  nextDay(days){
    return this.day(this.day() + days)
  }

  nextMonth(months){
    return this.month(this.month() + months)
  }

  nextYear(years){
    return this.year(this.year() + years)
  }

  static create(year, month, day){
    return new Midnight(year, month - 1, day)
  }

  day(day){
    if(arguments.length === 0){
      return this.getDate()
    }
    const o = this.toObject()
    return Midnight.create(o.year, o.month, day)
  }

  differenceInDays(value){
    if(!value){
      return NaN
    }
    return Math.floor((new Midnight(value) - this) / DAY)
  }

  endOfMonth(){
    return this.nextMonth(1).day(0)
  }

  equals(value){
    if(!value){
      return false
    }
    const date = new Date(value)
    return (
      this.getFullYear() === date.getFullYear() &&
      this.getMonth() === date.getMonth() &&
      this.getDate() === date.getDate()
    )
  }

  static equals(value1, value2){
    return new Midnight(value1).equals(value2)
  }

  month(month){
    const o = this.toObject()
    if(arguments.length === 0){
      return o.month
    }
    const d1 = Midnight.create(o.year, month, o.day)
    const d2 = Midnight.create(o.year, month + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  setHours(){
    super.setHours(...arguments)
    this._fixTime()
    return this.valueOf()
  }

  setMinutes(){
    super.setMinutes(...arguments)
    this._fixTime()
    return this.valueOf()
  }

  setSeconds(){
    super.setSeconds(...arguments)
    this._fixTime()
    return this.valueOf()
  }

  setMilliseconds(){
    super.setMilliseconds(...arguments)
    this._fixTime()
    return this.valueOf()
  }

  setTime(){
    super.setTime(...arguments)
    this._fixTime()
    return this.valueOf()
  }

  startOfMonth(){
    return this.day(1)
  }

  toObject(){
    const year = this.getFullYear()
    const month = this.getMonth() + 1
    const day = this.getDate()
    return {year, month, day}
  }

  year(year){
    const o = this.toObject()
    if(arguments.length === 0){
      return o.year
    }
    const d1 = Midnight.create(year, o.month, o.day)
    const d2 = Midnight.create(year, o.month + 1, 0)
    return d1 < d2 ? d1 : d2
  }

  _fixTime(){
    super.setHours(0)
    super.setMinutes(0)
    super.setSeconds(0)
    super.setMilliseconds(0)
  }

}
