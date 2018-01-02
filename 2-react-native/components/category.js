import React, {Component} from 'react'

export default class Category extends Component {
  render () {
    return <Link to={'/category/' + this.props.item.id}>
      <Text style={[s.item, s.theme.text]}>{this.props.item.title}</Text>
    </Link>
  }
}