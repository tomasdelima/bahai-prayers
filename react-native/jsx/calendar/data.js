'use strict'

const BadiDate = require('./badi-date')

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
  {id: 1,  slug: "baha",       arabicName: "Bahá",       portugueseName: "Esplendor"},
  {id: 2,  slug: "jalal",      arabicName: "Jalál",      portugueseName: "Glória"},
  {id: 3,  slug: "jamal",      arabicName: "Jamál",      portugueseName: "Beleza"},
  {id: 4,  slug: "azamat",     arabicName: "‘Aẓamat",    portugueseName: "Grandeza"},
  {id: 5,  slug: "nur",        arabicName: "Núr",        portugueseName: "Luz"},
  {id: 6,  slug: "rahmat",     arabicName: "Raḥmat",     portugueseName: "Miséricórdia"},
  {id: 7,  slug: "kalimat",    arabicName: "Kalimát",    portugueseName: "Palavras"},
  {id: 8,  slug: "kamal",      arabicName: "Kamál",      portugueseName: "Perfeição"},
  {id: 9,  slug: "asma",       arabicName: "Asmá’",      portugueseName: "Nomes"},
  {id: 10, slug: "izzat",      arabicName: "‘Izzat",     portugueseName: "Potência"},
  {id: 11, slug: "mashiyyat",  arabicName: "Mashíyyat",  portugueseName: "Vontade"},
  {id: 12, slug: "ilm",        arabicName: "‘Ilm",       portugueseName: "Conhecimento"},
  {id: 13, slug: "qudrat",     arabicName: "Qudrat",     portugueseName: "Poder"},
  {id: 14, slug: "qawl",       arabicName: "Qawl",       portugueseName: "Discurso"},
  {id: 15, slug: "masa-il",    arabicName: "Masá’il",    portugueseName: "Perguntas"},
  {id: 16, slug: "sharaf",     arabicName: "Sharaf",     portugueseName: "Honra"},
  {id: 17, slug: "sultan",     arabicName: "Sulṭán",     portugueseName: "Soberania"},
  {id: 18, slug: "mulk",       arabicName: "Mulk",       portugueseName: "Domínio"},
  {id: 19, slug: "ayyam-i-ha", arabicName: "Ayyám-i-Há", portugueseName: "Ayyám-i-Há",},
  {id: 20, slug: "ala",        arabicName: "‘Alá’",      portugueseName: "Sublimidade"},
]

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
        months[i][j].gregorianStart = {getMonth: ()=>{}}
        months[i][j].gregorianEnd   = {getMonth: ()=>{}}
      } else {
        months[i][j].gregorianStart = new BadiDate(year, index,  1).toGregorian()
        months[i][j].gregorianEnd   = new BadiDate(year, index, 19).toGregorian()
        months[i][j].arabicName     = monthsNames.filter((m) => m.id == index)[0].arabicName
        months[i][j].portugueseName = monthsNames.filter((m) => m.id == index)[0].portugueseName
        if (months[i][j].gregorianStart.getMonth() != months[i][j].gregorianEnd.getMonth()) {
          months[i][j].gregorianNewMonth = 20 - months[i][j].gregorianEnd.getDate()
        }
      }
    }
  }
  months[6][1].gregorianStart = new BadiDate(year, 19,  1).toGregorian()
  months[6][1].gregorianEnd =   new BadiDate(year, 19, 19).toGregorian()
  months.year = year

  return months
}

var groupedMonth = (year, month) => {
  var days = [
    [{id: 'month', year: year, month: monthsNames.filter((m) => m.id == month)[0]}, {id: 1}, {id: 2}],
    [{id:  3}, {id:  4}, {id:  5}],
    [{id:  6}, {id:  7}, {id:  8}],
    [{id:  9}, {id: 10}, {id: 11}],
    [{id: 12}, {id: 13}, {id: 14}],
    [{id: 15}, {id: 16}, {id: 17}],
    [{id: 18}, {id: 19}, {id: 20}],
  ]

  for(var i = 0; i < days.length; i++) {
    for(var j = 0; j < days[i].length; j++) {
      var index = 3 * i + j
      if (days[i][j].id != 'month') {
        days[i][j].gregorian = new BadiDate(year, month, index).toGregorian()
      }
    }
  }

  days.year = year
  days.month = month

  return days
}

module.exports = {
  groupedYear: groupedYear,
  groupedMonth: groupedMonth,
  all:  () => {
    var months = []
    groupedYear.map((i) => i.map((j) => months.push(j)))
    return months
  },
  colors: colors,
  // get: (year, id) => {
  //   if (id == 0) id = 20
  //   if (id == 21) id = 1

  //   return groupedYear(year).filter((month) => month.id == id)[0]
  // }
}
