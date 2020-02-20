var colors = {
  0:  '#A02BA7',
  1:  '#7831CA',
  2:  '#5A6EEF',
  3:  '#345938',
  4:  '#2E9A42',
  5:  '#82BC5B',
  6:  '#D7F520',
  7:  '#F0BD15',
  8:  '#EE8327',
  9:  '#F14D35',
  10: '#E50E51',
  11: '#CC2E9A',
}

var monthsNames = [
  {id: 1,  slug: "baha",       name: "Bahá"},
  {id: 2,  slug: "jalal",      name: "Jalál"},
  {id: 3,  slug: "jamal",      name: "Jamál"},
  {id: 4,  slug: "azamat",     name: "‘Aẓamat"},
  {id: 5,  slug: "nur",        name: "Núr"},
  {id: 6,  slug: "rahmat",     name: "Raḥmat"},
  {id: 7,  slug: "kalimat",    name: "Kalimát"},
  {id: 8,  slug: "kamal",      name: "Kamál"},
  {id: 9,  slug: "asma",       name: "Asmá’"},
  {id: 10, slug: "izzat",      name: "‘Izzat"},
  {id: 11, slug: "mashiyyat",  name: "Mashíyyat"},
  {id: 12, slug: "ilm",        name: "‘Ilm"},
  {id: 13, slug: "qudrat",     name: "Qudrat"},
  {id: 14, slug: "qawl",       name: "Qawl"},
  {id: 15, slug: "masa-il",    name: "Masá’il"},
  {id: 16, slug: "sharaf",     name: "Sharaf"},
  {id: 17, slug: "sultan",     name: "Sulṭán"},
  {id: 18, slug: "mulk",       name: "Mulk"},
  {id: 19, slug: "ayyam-i-ha", name: "Ayyám-i-Há"},
  {id: 20, slug: "ala",        name: "‘Alá’"},
]

var loadHolidays = function (year, month, day) {
  if (global.db.loadFromDB) {
    if (year || month || day) {
      var where = {}
      if (year)  where.year  = [year]
      if (month) where.month = [month]
      if (day)   where.day   = [day]
    }

    return global.db.loadFromDB('holidays', where)
  } else {
    console.warn('ERROR: global.db.loadFromDB is not defined. Trying to load again')
    setTimeout(loadHolidays, 100)
  }
}

var groupedYear = (year) => {
  var months = [
    [{id: 'year', year: year}, {id: 1}, {id: 2}],
    [{id:  3}, {id:  4}, {id:  5}],
    [{id:  6}, {id:  7}, {id:  8}],
    [{id:  9}, {id: 10}, {id: 11}],
    [{id: 12}, {id: 13}, {id: 14}],
    [{id: 15}, {id: 16}, {id: 17}],
    [{id: 18}, {id: 19}, {id: 20}],
  ]

  for(var i = 0; i < months.length; i++) {
    for(var j = 0; j < months[i].length; j++) {
      var index = 3 * i + j
      if (months[i][j].id == 'year') {
        months[i][j].gregorianStart = {getMonth: () => {}}
        months[i][j].gregorianEnd   = {getMonth: () => {}}
      } else {
        months[i][j].gregorianStart = new CalendarBadiDate(year, index,  1).toGregorian()
        months[i][j].gregorianEnd   = new CalendarBadiDate(year, index, 19).toGregorian()
        months[i][j].name           = monthsNames.filter((m) => m.id == index)[0].name
        if (months[i][j].gregorianStart.getMonth() != months[i][j].gregorianEnd.getMonth()) {
          months[i][j].gregorianNewMonth = 20 - months[i][j].gregorianEnd.getDate()
        }
      }
    }
  }
  months[6][1].gregorianEnd   = new CalendarBadiDate(year, 19, new CalendarBadiDate(year, 1,  1).ayyamihaDuration()).toGregorian()
  months.year = year

  return mergeDataAndHolidays(year, undefined, months)
}

var groupedMonth = (year, month) => {
  var days = [
    [{id: 'month', year: year, month: monthsNames.filter((m) => m.id == month)[0]}, {id: 1}, {id: 2}],
    [{id:  3}, {id:  4}, {id:  5}],
    [{id:  6}, {id:  7}, {id:  8}],
    [{id:  9}, {id: 10}, {id: 11}],
    [{id: 12}, {id: 13}, {id: 14}],
    [{id: 15}, {id: 16}, {id: 17}],
    [{id: 18}, {id: 19}, {id: null}],
  ]

  for(var i = 0; i < days.length; i++) {
    for(var j = 0; j < days[i].length; j++) {
      var index = 3 * i + j
      var date = new CalendarBadiDate(year, month, index).toGregorian()

      if (month == 19 && !date.getDate()) {
      } else if (days[i][j].id != 'month') {
        days[i][j].gregorian = date
        days[i][j].monthName = monthsNames.filter((m) => m.id == month)[0].name
      }
    }
  }

  days.year = year
  days.month = month

  return mergeDataAndHolidays(year, month, days)
}

var mergeDataAndHolidays = function (year, month, data) {
  var holidays = store.holidays
  if (year) holidays = holidays.filter(h => h.year == year)
  if (month) holidays = holidays.filter(h => h.month == month)

  holidays.map((holiday) => {
    var type = month ? 'day' : 'month'
    var item = data[Math.floor(holiday[type]/3)][holiday[type]%3]

    if (item.holidays) {
      item.holidays.push(holiday)
    } else {
      item.holidays = [holiday]
    }
  })

  return data
}

export default {
  groupedYear,
  groupedMonth,
  all: () => {
    var months = []
    groupedYear.map((i) => i.map((j) => months.push(j)))
    return months
  },
  colors,
}
