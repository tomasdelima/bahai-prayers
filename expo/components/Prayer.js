import React from 'react'

export default class Prayer extends React.Component {
  render() {
    return <Flex padding={10} onPress={() => {}}>
      {this.props.prayer.Text}
    </Flex>
  }
}
