import React from 'react'

export default class Prayer extends React.Component {
  render() {
    var prayer = store.prayers.filter(prayer => prayer.Id == this.props.navigation.state.params.prayerId)[0]

    return <Container>
      <Flex padding={10} onPress={() => {}}>{prayer.Text}</Flex>
      <Flex padding={10} onPress={() => {}}>{prayer.Author}</Flex>
    </Container>
  }
}
