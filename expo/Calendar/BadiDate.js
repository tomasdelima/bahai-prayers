export default class BadiDate {
  constructor (year, month, day) {
    this.year = year
    this.month = month
    if (day > this.ayyamihaDuration() && month == 19) {
      this.day = 1/0
    } else {
      this.day = day
    }
  }

  toGregorian () {
    if (this.month > 18) {
      return this.nawRuzDateFor(this.year + 1844).addDays(-this.daysUntilNextNawRuz())
    } else {
      return this.nawRuzDateFor(this.year + 1843).addDays(this.daysSinceLastNawRuz())
    }
  }

  daysSinceLastNawRuz () {
    return (Number(this.month.toFixed()) - 1) * 19 + this.day - 1
  }

  daysUntilNextNawRuz () {
    return 20 - this.day + ((this.month == 19) ? this.ayyamihaDuration() : 0)
  }

  nawRuzDateFor (year) {
    var nawRuzDay = {2015: 21, 2016: 20, 2017: 20, 2018: 21, 2019: 21, 2020: 20, 2021: 20, 2022: 21, 2023: 21, 2024: 20, 2025: 20, 2026: 21, 2027: 21, 2028: 20, 2029: 20, 2030: 20, 2031: 21, 2032: 20, 2033: 20, 2034: 20, 2035: 21, 2036: 20, 2037: 20, 2038: 20, 2039: 21, 2040: 20, 2041: 20, 2042: 20, 2043: 21, 2044: 20, 2045: 20, 2046: 20, 2047: 21, 2048: 20, 2049: 20, 2050: 20, 2051: 21, 2052: 20, 2053: 20, 2054: 20, 2055: 21, 2056: 20, 2057: 20, 2058: 20, 2059: 20, 2060: 20, 2061: 20, 2062: 20, 2063: 20, 2064: 20}[year]
    return new Date(year, 2, nawRuzDay)
  }

  ayyamihaDuration () {
    return (((this.year - 174) % 4) == 0) ? 5 : 4
  }

  static monthsNames = [
    {slug: 'baha',       name: 'Bahá'},
    {slug: 'jalal',      name: 'Jalál'},
    {slug: 'jamal',      name: 'Jamál'},
    {slug: 'azamat',     name: '‘Aẓamat'},
    {slug: 'nur',        name: 'Núr'},
    {slug: 'rahmat',     name: 'Raḥmat'},
    {slug: 'kalimat',    name: 'Kalimát'},
    {slug: 'kamal',      name: 'Kamál'},
    {slug: 'asma',       name: 'Asmá’'},
    {slug: 'izzat',      name: '‘Izzat'},
    {slug: 'mashiyyat',  name: 'Mashíyyat'},
    {slug: 'ilm',        name: '‘Ilm'},
    {slug: 'qudrat',     name: 'Qudrat'},
    {slug: 'qawl',       name: 'Qawl'},
    {slug: 'masa-il',    name: 'Masá’il'},
    {slug: 'sharaf',     name: 'Sharaf'},
    {slug: 'sultan',     name: 'Sulṭán'},
    {slug: 'mulk',       name: 'Mulk'},
    {slug: 'ayyam-i-ha', name: 'Ayyám-i-Há'},
    {slug: 'ala',        name: '‘Alá’'},
  ]

  monthName = () => CalendarBadiDate.monthsNames[this.month]
}

Date.prototype.getMonthName = function () {
  return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.getMonth()]
}

Date.prototype.addDays = function (days) {
  var result = new Date(this)
  result.setDate(result.getDate() + days)
  return result
}

Date.prototype.toString = function () {
  var month = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  }[this.getMonth()]
  return this.getDate() + ' ' + month
}
