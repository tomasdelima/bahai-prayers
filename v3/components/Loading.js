import React from 'react'

class Loading extends React.Component {
  constructor () {
    super()
    this.angle = observable.box(new Animated.Value(0))
  }

  componentDidMount() {
    this.spin()
  }

  spin () {
    this.angle.get().setValue(0)

    Animated.timing(this.angle.get(), {
      toValue: 1,
      duration: 15000,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => this.spin())
  }

  rotation () {
    return {transform: [{rotate: this.angle.get().interpolate({
      inputRange:  [0, 1],
      outputRange: ['0deg', '360deg'],
    })}]}
  }

  render () {
    return store.loading && <View style={[s.high(), s.center1, s.center2]}>
      <Animated.Image source={require("../assets/nine-pointed-star-light.png")} style={[s.square(80), this.rotation()]}/>
    </View>
  }
}

export default decorate(Loading, {})
