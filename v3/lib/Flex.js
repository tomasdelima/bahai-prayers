import { View } from 'react-native'
import React, { Component } from 'react'

export default class Flex extends Component {
  render () {
    var style = (this.props.children && ["String", "Number"].indexOf(this.props.children.constructor.name) >= 0) ? [t.text] : [s.flex, s.center1, s.center2]

    Object.keys(this.props).map(prop => {
      if (s[prop]) {
        if (s[prop].constructor.name == "Function") {
          style.push(s[prop](this.props[prop]))
        } else {
          style.push(s[prop])
        }
      }
    })

    var element = ["String", "Number"].indexOf(this.props.children && this.props.children.constructor.name) >= 0 ? Text : View

    var component = React.createElement(
      element,
      Object.assign({}, this.props, {style: style.concat(this.props.style)}),
      this.props.children
    )

    if (this.props.onPress) {
      return <TouchableOpacity style={s.flex} onPress={this.props.onPress}>{component}</TouchableOpacity>
    } else {
      return component
    }
  }
}