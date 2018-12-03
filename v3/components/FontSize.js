import React from 'react'
import {Slider} from 'react-native'

class FontSize extends React.Component {
  constructor () {
    super()
    this.state = {showModal: false}
  }

  showModal () {
    this.previousFontSize = store.fontSize
    this.setState({showModal: true})
  }

  closeModal (saveFontSize) {
    if (!saveFontSize) store.fontSize = this.previousFontSize
    this.setState({showModal: false})
  }

  render () {
    return <View>
      <TouchableOpacity onPress={this.showModal.bind(this)} style={s.padding(10)}>
        <MaterialIcons name="format-size" size={store.fontSize} color={t.text.color} />
      </TouchableOpacity>

      <Modal visible={this.state.showModal} transparent onRequestClose={() => {}}>
        <Flex opaqueBG={0.2}>
          <Flex whiteBG absolute top={Height - 120} high={100 + statusBarHeight} padding={20} row>
            <MaterialIcons name="close" size={30} style={[]} onPress={() => this.closeModal(false)} />
            <Slider step={0.1} onSlidingComplete={v => store.fontSize = v} value={store.fontSize} minimumValue={14} maximumValue={26} style={[s.grow()]} />
            <MaterialIcons name="check" size={30} style={[]} onPress={() => this.closeModal(true)} />
          </Flex>
        </Flex>
      </Modal>
    </View>
  }
}

export default observer(FontSize)
