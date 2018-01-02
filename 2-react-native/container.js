import Data from './data'
import React, {Component} from 'react'
import {NativeRouter, Route} from 'react-router-native'

export default class Container extends Component {
  constructor (props) {
    super(props)
    this.data = new Data
    this.renderCategories = this.renderCategories.bind(this)
    this.renderPrayers = this.renderPrayers.bind(this)
    this.renderPrayer = this.renderPrayer.bind(this)
    this.state = {
      categories: this.data.testCategories(),
      prayers: this.data.testPrayers(),
    }
  }

  loadData () {
    this.data.load('categories').then((data) => {
      this.setState({
        categories: data,
      })
    })

    this.data.load('prayers').then((data) => {
      this.setState({
        prayers: data,
      })
    })
  }

  componentDidMount () {
    this.loadData()
  }

  renderCategories () {
    return <List items={this.state.categories} component={Category}/>
  }

  renderPrayers ({match}) {
    var prayers = this.state.prayers.filter((p) => p.category_id == match.params.id)
    return <List items={prayers} component={InlinePrayer}/>
  }

  renderPrayer ({match}) {
    var prayer = this.state.prayers.filter((p) => p.id == match.params.id)[0]
    return <LongPrayer prayer={prayer}/>
  }

  render () {
    return <NativeRouter>
      <View>
        <Route exact path="/"       render={this.renderCategories}/>
        <Route path="/category/:id" render={this.renderPrayers}/>
        <Route path="/prayer/:id"   render={this.renderPrayer}/>
      </View>
    </NativeRouter>
  }
}