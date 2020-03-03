const tapSound = require('../Sounds/tap.mp3')
const finishSound = require('../Sounds/finish.wav')

@observer
export default class NinetyFiveTaps extends React.Component {
  state = {counter: 9}

  constructor () {
    super()
  }

  tap = () => {
    if (this.state.counter > 0) {
      this.state.counter -= 1
      this.forceUpdate()
    }

    if (this.state.counter > 0) {
      this.playSound(tapSound)
      this.vibrate(50)
    } else if (!this.state.finished) {
      this.playSound(finishSound)
      this.vibrate(1000)
      this.setState({finished: true})
    }
  }

  vibrate = (duration) => {
    if (!store.stopTapVibration) {
      Vibration.vibrate(duration)
    }
  }

  playSound = async (sound) => {
    if (!store.muteTapSound) {
      const soundObject = new Audio.Sound()
      await soundObject.loadAsync(sound)
      const status = await soundObject.playAsync()

      setTimeout(() => soundObject.unloadAsync(), status.playableDurationMillis + 100)
    }
  }

  repeat = () => {
    this.setState({counter: 9, finished: false})
  }

  toggleMute = () => store.muteTapSound = !store.muteTapSound
  toggleVibration = () => store.stopTapVibration = !store.stopTapVibration

  renderTopButton = (element, onPress, name) => {
    let obj = { element }

    return <obj.element
      onPress={onPress}
      name={name}
      size={25}
      color={theme[3]}
     style={[s.textAlignCenter, s.padding(10), s.wide(60)]}
    />
  }

  render () {
    return <TouchableWithoutFeedback onPress={this.tap}>
      <Flex relative>
        <Write size={171}>{this.state.counter}</Write>
        {this.state.finished && <AntDesign onPress={this.repeat} name='reload1' size={45} color={theme[3]} />}

        <Flex absolute top={0} left={0} row>
          {this.renderTopButton(AntDesign, this.repeat, 'reload1')}
          {this.renderTopButton(Ionicons, this.toggleMute, `ios-volume-${store.muteTapSound ? 'off' : 'high'}`)}
          {this.renderTopButton(Foundation, this.toggleVibration, `mobile${store.stopTapVibration ? '' : '-signal'}`)}
        </Flex>
      </Flex>
    </TouchableWithoutFeedback>
  }
}
