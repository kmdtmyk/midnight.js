[![Build Status](https://travis-ci.org/kmdtmyk/midnight.svg?branch=master)](https://travis-ci.org/kmdtmyk/midnight)

## Installation

WIP

## Usage

This is a subclass of Date, but the time is always 00:00:00.

```javascript
var date = new Midnight() // 2017/05/15 00:00:00
date instanceof Date // true
```

### Methods added

```javascript
var date = new Midnight() // 2017/05/15

date.nextDay() // 2017/05/16
date.nextDay(3) // 2017/05/18

date.nextMonth() // 2017/06/15
date.nextMonth(3) // 2017/08/15

date.nextYear() // 2018/05/15
date.nextYear(3) // 2020/05/15

date.day() // 15
date.day(10) // 2017/05/10

date.month() // 5
date.month(8) // 2017/08/15

date.year() // 2017
date.year(2020) // 2020/05/15

date.startOfMonth() // 2017/05/01
date.endOfMonth() // 2017/05/31
```

### Immutable

These methods return new instance and don't change own state.

```javascript
var date1 = new Midnight() // 2017/05/15
var date2 = date1.nextDay()
// date1: 2017/05/15, not 2017/05/16
// date2: 2017/05/16
```
