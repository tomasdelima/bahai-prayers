'use strict'

import React, {Component} from 'react'
import {
  View,
  Navigator,
  ListView,
  AsyncStorage,
  Text,
} from 'react-native'

const BadiDate = require('./badi-date')
const Grid     = require('./grid')
const LongDay  = require('./long-day')
const Data     = require('./data')
const s        = require('../styles')
const t        = require('../themes')

const remoteHost = 'http://badi-calendar.herokuapp.com'

module.exports = React.createClass({
  componentDidMount () {
    this.goToYear(173)
    // this.goToDay(173, '', {
    //   id: 17,
    //   monthName: 'Rahmat',
    //   gregorian: new BadiDate(173, 6, 17).toGregorian(),
    //   holidays: [
    //     {
    //       day: 17,
    //       year: 173,
    //       name: 'Martírio do Báb',
    //       month: 6,
    //       date: '2016-07-09',
    //       id: 352,
    //     }
    //   ]
    // })
    global.navigation = {
      goToYear: this.goToYear,
      goToMonth: this.goToMonth,
      goToDay: this.goToDay,
    }
  },
  loadHolidaysFromRemoteServer () {
    AsyncStorage.getItem('holidays:last_updated_at', (a, last_updated_at) => {
      global.db.loadFromRemoteServer(remoteHost + '/holidays?last_updated_at=' + (last_updated_at || '2000-01-01'), 'holidays').then()
    })
  },
  goToYear (year) {
    if (global.db.loadFromDB) {
      Data.groupedYear(year).then((data) => {
        global.navigator.calendar.push({id: 'year', items: data})
      })
      this.loadHolidaysFromRemoteServer()
    } else {
      console.log('ERROR: global.db.loadFromDB is not defined. Trying to load again')
      setTimeout(() => this.goToYear(year), 100)
    }
  },
  goToMonth (year, month) {
    Data.groupedMonth(year, month).then((data) => {
      global.navigator.calendar.push({id: 'month', items: data})
    })
  },
  goToDay (year, month, day) {
    global.navigator.calendar.push({id: 'day', year: year, month: month, day: day})
  },
  render () {
    return <Navigator
      initialRoute={{id: 'root'}}
      renderScene={this.renderScene}
      configureScene={(route) => { return Navigator.SceneConfigs.FadeAndroid }}
    />
  },
  renderScene (route, navigator) {
    global.navigator.calendar = navigator

         if (route.id == 'root')  { return null }
    else if (route.id == 'year')  { return <Grid type={'year'}  items={route.items} theme={this.props.theme}/> }
    else if (route.id == 'month') { return <Grid type={'month'} items={route.items} theme={this.props.theme}/> }
    else if (route.id == 'day')   { return <LongDay year={route.year} month={route.month} day={route.day} theme={this.props.theme}/> }
    else { return <Text>NO ROUTE FOUND!</Text>}
  }
})
