'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var Prayer = require('./prayer')

var Prayers = React.createClass({
  prayers() {
    return [
      {
        active:      true,
        author:      "Bahá’u’lláh",
        body:        "Ó meu Deus, meu mestre, Alvo de meu desejo! Este servo Teu quer dormir à sombra da Tua misericórdia e repousar sob o pálio da Tua graça, implorando o Teu cuidado e a Tua proteção.<br><br>Suplico-Te, ó meu Senhor, pelos Teus olhos insones, guarda meus olhos para que nada vejam senão a Ti. Fortalece-lhes, pois, a visão para que discirnam Teus sinais e contemplem o Horizonte da Tua Revelação. És Aquele ante as manifestações de Cuja supremacia tremeu a quintessência do poder.<br><br>Nenhum outro Deus há senão Tu, o Onipotente, O que tudo domina, o Absoluto.",
        category_id: 30,
        created_at:  "2015-02-07T00:05:30.496Z",
        id:          100,
        preamble:    "",
        updated_at:  "2016-08-06T03:28:51.595Z",
      }, {
        active:      true,
        author:      "Bahá’u’lláh",
        body:        "Ó meu Deus! Ó meu Deus! Une os corações de Teus servos e revela-lhes Teu grande plano. Que sigam Teus mandamentos e permaneçam firmes em Tua lei. Ajuda-os, ó Deus, em seus esforços, e concede-lhes o poder de Te servirem. Ó Deus, não os abandones a si mesmos, mas guia seus passos pela luz do Teu conhecimento e, com Teu amor, alegra seus corações. Em verdade, Tu és seu Amparo, e seu Senhor.",
        category_id: 10,
        created_at:  "2015-02-07T00:05:29.297Z",
        id:          16,
        preamble:    "",
        updated_at:  "2016-08-06T03:28:51.541Z",
      }, {
        active:      true,
        author:      "O Báb",
        body:        "Ó Senhor! Tu és quem remove toda angústia, Quem dissipa toda aflição. És Aquele que afasta toda tristeza e liberta todo escravo, o Redentor de todas as almas. Ó Senhor! Concede-me redenção, por Tua misericórdia, e inclui-me no número daqueles servos Teus que atingiram a salvação.",
        category_id: 15,
        created_at:  "2015-02-07T00:05:29.521Z",
        id:          26,
        preamble:    "",
        updated_at:  "2015-03-03T01:23:52.304Z",
      }
    ]
  },
  render () {
    return <View style={styles.prayers}>
      {this.prayers().map(prayer => <Prayer key={prayer.id} prayer={prayer}/> )}
    </View>
  },
})

var styles = StyleSheet.create({
  prayers: {
    margin: 40
  },
  prayer: {
    margin: 20
  }
})

module.exports = Prayers;
