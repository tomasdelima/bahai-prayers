import React, {Component} from 'react'

export default class Category extends Component {
  render () {
    return <Text style={[s.item, s.theme.text]}>{this.props.item.title}</Text>
  }
}