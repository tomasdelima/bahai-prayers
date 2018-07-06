import {View} from 'react-native'
import React, { Component } from 'react'

export default class Flex extends Component {
  render () {
    var style = [s.flex, s.center1, s.center2]

    Object.keys(this.props).map(prop => {
      if (s[prop]) {
        if (s[prop].constructor.name == "Function") {
          style.push(s[prop](this.props[prop]))
        } else {
          style.push(s[prop])
        }
      }
    })

    return React.createElement(
      this.props.children.constructor.name === "String" ? Text : View,
      Object.assign({}, this.props, {style: style.concat(this.props.style)}),
      this.props.children
    )
  }
}