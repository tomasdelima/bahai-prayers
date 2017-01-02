'use strict'

import React, {Component} from 'react'
import {
  View,
  AsyncStorage,
  Navigator,
  ListView,
  Text,
  AppRegistry,
  BackAndroid,
} from 'react-native'

const SideMenu   = require('react-native-side-menu');
const DB         = require('../../db')
const Loading    = require('../loading')
const Menu       = require('../menu')
const s          = require('../styles')

const List       = require('./list')
const LongPrayer = require('./long-prayer')

const remoteHost = 'http://bahai-prayers-server.herokuapp.com'

module.exports = React.createClass({
  getInitialState() {
    return {
      initialRoute: {id: 'root'},
      // initialRoute: {id: 'prayers', items: [
      //   {body: "Ele é o Compassivo, o Mais Generoso!<br><br>Ó Deus, meu Deus! Tu me vês, Tu me conheces; és meu Amparo e Refúgio.<br><br>A ninguém tenho buscado, nem desejo buscar, salvo a Ti; caminho algum tenho trilhado, nem desejo trilhar, a não ser o caminho do Teu amor. Na noite tenebrosa do desespero, meus olhos volvem-se cheios de esperança e expectativa para o amanhecer de Teu infinito favor e, na hora do alvorecer, minh'alma esmorecida é refrescada e fortalecida com a lembrança de Tua beleza e Tua perfeição. Quem for ajudado pela graça da Tua misericórdia, embora seja ele apenas uma gota, tornar-se-á um ilimitado oceano, e o mais simples átomo que for amparado pela emanação de Tua benevolência, cintilará como uma estrela radiante.<br><br>Abriga sob tua proteção, ó Tu, Espírito de pureza, Tu que és o Mais Generoso Provedor, este Teu vassalo e servo extasiado. Ajuda-o, neste mundo da existência, a permanecer constante e firme em Teu amor e permite que esta ave de asas partidas atinja um refúgio e abrigo em Teu ninho divino, que jaz na árvore celestial.", id: 1, author: "'Abdu'l-Bahá", stared: false},
      //   {body: "Ele é o Compassivo, o Mais Generoso!<br><br>Ó Deus, meu Deus! Tu me vês, Tu me conheces; és meu Amparo e Refúgio.<br><br>A ninguém tenho buscado, nem desejo buscar, salvo a Ti; caminho algum tenho trilhado, nem desejo trilhar, a não ser o caminho do Teu amor. Na noite tenebrosa do desespero, meus olhos volvem-se cheios de esperança e expectativa para o amanhecer de Teu infinito favor e, na hora do alvorecer, minh'alma esmorecida é refrescada e fortalecida com a lembrança de Tua beleza e Tua perfeição. Quem for ajudado pela graça da Tua misericórdia, embora seja ele apenas uma gota, tornar-se-á um ilimitado oceano, e o mais simples átomo que for amparado pela emanação de Tua benevolência, cintilará como uma estrela radiante.<br><br>Abriga sob tua proteção, ó Tu, Espírito de pureza, Tu que és o Mais Generoso Provedor, este Teu vassalo e servo extasiado. Ajuda-o, neste mundo da existência, a permanecer constante e firme em Teu amor e permite que esta ave de asas partidas atinja um refúgio e abrigo em Teu ninho divino, que jaz na árvore celestial.", id: 2, author: "'Abdu'l-Bahá", stared: true},
      //   {body: "Ele é o Compassivo, o Mais Generoso!<br><br>Ó Deus, meu Deus! Tu me vês, Tu me conheces; és meu Amparo e Refúgio.<br><br>A ninguém tenho buscado, nem desejo buscar, salvo a Ti; caminho algum tenho trilhado, nem desejo trilhar, a não ser o caminho do Teu amor. Na noite tenebrosa do desespero, meus olhos volvem-se cheios de esperança e expectativa para o amanhecer de Teu infinito favor e, na hora do alvorecer, minh'alma esmorecida é refrescada e fortalecida com a lembrança de Tua beleza e Tua perfeição. Quem for ajudado pela graça da Tua misericórdia, embora seja ele apenas uma gota, tornar-se-á um ilimitado oceano, e o mais simples átomo que for amparado pela emanação de Tua benevolência, cintilará como uma estrela radiante.<br><br>Abriga sob tua proteção, ó Tu, Espírito de pureza, Tu que és o Mais Generoso Provedor, este Teu vassalo e servo extasiado. Ajuda-o, neste mundo da existência, a permanecer constante e firme em Teu amor e permite que esta ave de asas partidas atinja um refúgio e abrigo em Teu ninho divino, que jaz na árvore celestial.", id: 3, author: "'Abdu'l-Bahá", stared: false},
      // ]}
      // initialRoute: {id: 'prayer', prayer: {body: "Ele é o Compassivo, o Mais Generoso!<br><br><a class=\"preamble\">Some italic text to be rendered in between paragraps</a><br><br>Ó Deus, meu Deus! Tu me vês, Tu me conheces; és meu Amparo e Refúgio.<br><br>A ninguém tenho buscado, nem desejo buscar, salvo a Ti; caminho algum tenho trilhado, nem desejo trilhar, a não ser o caminho do Teu amor. Na noite tenebrosa do desespero, meus olhos volvem-se cheios de esperança e expectativa para o amanhecer de Teu infinito favor e, na hora do alvorecer, minh'alma esmorecida é refrescada e fortalecida com a lembrança de Tua beleza e Tua perfeição. Quem for ajudado pela graça da Tua misericórdia, embora seja ele apenas uma gota, tornar-se-á um ilimitado oceano, e o mais simples átomo que for amparado pela emanação de Tua benevolência, cintilará como uma estrela radiante.<br><br>Abriga sob tua proteção, ó Tu, Espírito de pureza, Tu que és o Mais Generoso Provedor, este Teu vassalo e servo extasiado. Ajuda-o, neste mundo da existência, a permanecer constante e firme em Teu amor e permite que esta ave de asas partidas atinja um refúgio e abrigo em Teu ninho divino, que jaz na árvore celestial. Ele é o Compassivo, o Mais Generoso!<br><br>Ó Deus, meu Deus! Tu me vês, Tu me conheces; és meu Amparo e Refúgio.<br><br>A ninguém tenho buscado, nem desejo buscar, salvo a Ti; caminho algum tenho trilhado, nem desejo trilhar, a não ser o caminho do Teu amor. Na noite tenebrosa do desespero, meus olhos volvem-se cheios de esperança e expectativa para o amanhecer de Teu infinito favor e, na hora do alvorecer, minh'alma esmorecida é refrescada e fortalecida com a lembrança de Tua beleza e Tua perfeição. Quem for ajudado pela graça da Tua misericórdia, embora seja ele apenas uma gota, tornar-se-á um ilimitado oceano, e o mais simples átomo que for amparado pela emanação de Tua benevolência, cintilará como uma estrela radiante.<br><br>Abriga sob tua proteção, ó Tu, Espírito de pureza, Tu que és o Mais Generoso Provedor, este Teu vassalo e servo extasiado. Ajuda-o, neste mundo da existência, a permanecer constante e firme em Teu amor e permite que esta ave de asas partidas atinja um refúgio e abrigo em Teu ninho divino, que jaz na árvore celestial.", id: 1, author: "‘Abdu’l-Bahá"}},
    }
  },
  error (error) { console.log('ERROR: ' + error) },
  setItems(items, type) {
    if(items) {
      global.navigator.prayers.push({id: type, items: items})
    }
  },
  goToCategories () {
    if (global.db.loadFromDB) {
      var specialPrayersValues = this.props.specialPrayers ? [true] : ['', false, 'null']
      global.db.loadFromDB('categories', {active: [true], special_category: specialPrayersValues}, 'title').then((categories) => {
        if (categories.length > 0) {
          this.setItems(categories, 'categories')
        } else {
          global.navigator.prayers.push({id: 'loading'})
        }
        AsyncStorage.getItem('prayers:last_updated_at', (a, last_updated_at) => {
          global.db.loadFromRemoteServer(remoteHost + '/categories.json?last_updated_at=' + (last_updated_at || 0), 'categories').then((loadedCategories) => {
            global.db.loadFromRemoteServer(remoteHost + '/prayers.json?last_updated_at=' + (last_updated_at || 0), 'prayers').then((loadedPrayers) => {
              if (categories.length == 0) {
                var filteredCategories = loadedCategories.filter((c) => { return (!c.special_category || c.special_category == 'null') && c.active })
                this.setItems(filteredCategories, 'categories')
              }
            }).catch(this.error)
          }).catch(this.error)
        })
      }).catch(this.error)
    } else {
      console.log('ERROR: global.db.loadFromDB is not defined. Trying to load again')
      setTimeout(this.goToCategories, 100)
    }
  },
  goToCategory (categoryId) {
    global.db.loadFromDB('prayers', {category_id: [categoryId], active: [true]}, 'author').then((prayers) => {
      if (prayers.length == 1) {
        this.goToPrayer(prayers[0])
      } else {
        this.setItems(prayers, 'prayers')
      }
    }).catch(this.error)
  },
  goToStaredPrayers () {
    global.db.loadFromDB('prayers', {active: [true], stared: [true]}, 'author').then((prayers) => {
      this.setItems(prayers, 'prayers')
    }).catch(this.error)
  },
  goToPrayer (prayer) {
    global.navigator.prayers.push({id: 'prayer', prayer: prayer})
  },
  componentDidMount () {
    global.navigation = {
      goToCategories: this.goToCategories,
      goToCategory: this.goToCategory,
      goToPrayer: this.goToPrayer,
    }
    if (this.props.staredPrayers) {
      this.goToStaredPrayers()
    } else {
      this.goToCategories()
    }
  },
  render () {
    return <Navigator style={[{}]}
      initialRoute={this.state.initialRoute}
      renderScene={this.renderScene}
      configureScene={(route) => { return Navigator.SceneConfigs.FadeAndroid }}
    />
  },
  renderScene (route, navigator) {
    global.navigator.prayers = navigator

         if (route.id == 'root')       { return null }
    else if (route.id == 'loading')    { return <Loading theme={this.props.theme}/> }
    else if (route.id == 'categories') { return <List items={route.items} type={'categories'} theme={this.props.theme}/> }
    else if (route.id == 'prayers')    { return <List items={route.items} type={'prayers'}    theme={this.props.theme}/> }
    else if (route.id == 'prayer')     { return <LongPrayer prayer={route.prayer} theme={this.props.theme} reloadTheme={this.props.reloadTheme}/> }
    else { return <Text>NO ROUTE FOUND!</Text>}
  }
})

