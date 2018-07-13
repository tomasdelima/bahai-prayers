import {View} from 'react-native'
import React, { Component } from 'react'

export default class Flex extends Component {
  render () {

    var style = (this.props.children && this.props.children.constructor.name == "String") ? [] : [s.flex, s.center1, s.center2]

    Object.keys(this.props).map(prop => {
      if (s[prop]) {
        if (s[prop].constructor.name == "Function") {
          style.push(s[prop](this.props[prop]))
        } else {
          style.push(s[prop])
        }
      }
    })

    var element = (this.props.children && this.props.children.constructor.name) == "String" ? Text : View
    var component = React.createElement(
      element,
      Object.assign({}, this.props, {style: style.concat(this.props.style)}),
      this.props.children
    )

    if (this.props.onPress) {
      return <TouchableHighlight onPress={this.props.onPress}>{component}</TouchableHighlight>
    } else {
      return component
    }
  }
}