import React, {Component} from 'react'

export default class List extends Component {
  render () {
    return <ScrollView>
      {this.props.items.map((item, i) => item.active && React.createElement(this.props.component, {item: item, key: i}))}
    </ScrollView>
  }
}