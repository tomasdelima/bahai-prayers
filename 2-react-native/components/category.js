import React, {Component} from 'react'

export default class Category extends Component {
  render () {
    return <Text style={[s.size(20), s.margin(0, 30), s.timeless, s.theme.text]}>{this.props.title}</Text>
  }
}