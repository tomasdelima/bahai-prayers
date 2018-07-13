import React from 'react'
import {observer} from 'mobx-react/native'

require('./Import')

export default class Flag extends React.Component {
  constructor () {
    super()
    this.state = {width: 0}
  }

  render() {
    return <Image source={this.props.source} style={{width: 40, height: 40, resizeMode: 'contain'}}/>
  }
}
