import Data from './data'
import React, {Component} from 'react'

export default class Container extends Component {
  constructor (props) {
    super(props)
    this.data = new Data
    this.state = {
      categories: [],
      prayers: [],
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

  render () {
    return <List items={this.state.categories} component={Category}/>
    return <List items={this.state.prayers} component={InlinePrayer}/>
    return <LongPrayer prayer={this.state.prayers[0]}/>
  }
}