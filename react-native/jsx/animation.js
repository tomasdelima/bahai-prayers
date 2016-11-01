'use strict'

import { Easing, Animated } from 'react-native'

module.exports = {
  fast (value, toValue, callBack) {
    Animated.timing(value, {
      toValue: toValue,
      duration: 300,
    }).start(callBack)
  },
  slow (value, toValue, callBack) {
    Animated.timing(value, {
      toValue: toValue,
      duration: 1000,
    }).start(callBack)
  },
  continuous (value) {
    value.setValue(0)
    Animated.timing(value, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear
    }).start(() => this.continuous(value))
  },
}
