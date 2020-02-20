export default class GregorianDate {
  constructor (date) {
    this.dayDuration = 24 * 60 * 60 * 1000
    this.date = date
    this.year = date.getFullYear()
    this.month = date.getMonth()
    this.day = date.getDate()
  }

  toBadi = () => ({
    year: this.badiYear(),
    month: this.badiMonth(),
    day: this.badiDay(),
    toString: this.badiDay() + '-' + this.badiMonth() + '-' + this.badiYear()
  })

  badiYear = () => this.year - (this.beforeNawRuz(this.year) ? 1844 : 1843)

  badiMonth () {
    if (this.daysUntilNextNawRuz() <= 19) {
      return 20
    } else {
      return Math.floor(this.daysSinceLastNawRuz(this.year, this.month, this.day) / 19) + 1
    }
  }

  badiDay () {
    if (this.badiMonth() == 20) {
      return 20 - this.daysUntilNextNawRuz()
    } else {
      return Math.round(this.daysSinceLastNawRuz(this.year, this.month, this.day) % 19) + 1
    }
  }

  yearShift = () => (this.beforeNawRuz(this.year) ? 1 : 0)
  daysSinceLastNawRuz = () => Math.round((this.date - this.nawRuzDateFor (this.year - this.yearShift())) / this.dayDuration)
  daysUntilNextNawRuz = () => Math.round((this.nawRuzDateFor (this.year + this.yearShift()) - this.date) / this.dayDuration)
  beforeNawRuz = (year) => this.date < this.nawRuzDateFor (year)

  nawRuzDateFor (year) {
    var nawRuzDay = {2015: 21, 2016: 20, 2017: 20, 2018: 21, 2019: 21, 2020: 20, 2021: 20, 2022: 21, 2023: 21, 2024: 20, 2025: 20, 2026: 21, 2027: 21, 2028: 20, 2029: 20, 2030: 20, 2031: 21, 2032: 20, 2033: 20, 2034: 20, 2035: 21, 2036: 20, 2037: 20, 2038: 20, 2039: 21, 2040: 20, 2041: 20, 2042: 20, 2043: 21, 2044: 20, 2045: 20, 2046: 20, 2047: 21, 2048: 20, 2049: 20, 2050: 20, 2051: 21, 2052: 20, 2053: 20, 2054: 20, 2055: 21, 2056: 20, 2057: 20, 2058: 20, 2059: 20, 2060: 20, 2061: 20, 2062: 20, 2063: 20, 2064: 20}[year]
    return new Date(year, 2, nawRuzDay)
  }
}
