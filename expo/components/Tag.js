import React from 'react'
import {observer} from 'mobx-react/native'

export default class Tag extends React.Component {
  render() {
    return <Flex padding={10} onPress={() => {}}>
      {this.props.tag.Name}
    </Flex>
  }
}
