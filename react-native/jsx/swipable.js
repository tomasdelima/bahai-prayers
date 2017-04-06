// http://browniefed.com/blog/react-native-animated-api-with-panresponder/

'use strict'

import React, {Component} from 'react'
import {
  View,
  Animated,
  Button,
  TouchableOpacity,
  PanResponder,
  Text,
} from 'react-native'

const s = require('./styles')

module.exports = React.createClass({
  panResponder: {},
  scrolled: 0,
  prevScrolled: 0,

  componentWillMount () {
    this.setElements(this.props)

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => this.isMoving = true,
      onPanResponderMove: this.move,
      onPanResponderRelease: this.end,
      onPanResponderTerminate: this.end,
    })
  },

  setElements (props) {
    this.elements = []
    props.items.map((item, i) => {
      this.elements.push({
        index: i,
        value: item,
        initialLeft: i * props.width,
        last: i == props.items.length -1,
        style: {
          position: 'absolute',
          left: i * props.width,
          width: props.width,
          height: props.height,
        },
      })
    })
  },

  componentDidUpdate () {
    this.updateStyles()
  },

  render () {
    console.log(this.elements.length)
    return <View style={[{width: this.props.width, height: this.props.height}]} {...this.panResponder.panHandlers}>
      {this.elements.map((element, i) => <View key={i} style={[[s.green, s.red, s.blue][i%3], s.high]} ref={(s)=>{if(this.elements[i])this.elements[i].element=s}}>{element.value}
        <Text>{element.style.left}</Text>
        <Text>{this.prevScrolled}</Text>
      </View>)}
    </View>
  },

  componentWillReceiveProps(nextProps) {
    this.setElements(nextProps)
    this.updateStyles()
  },

  updateStyles () {
    this.elements.map((element, i) => {
      this.elements[i].element && this.elements[i].element.setNativeProps({style: this.elements[i].style})
    })
  },

  move (event, gestureState) {
    this.elements.map((element, i) => {
      var e = this.elements[i]
      this.scrolled = this.prevScrolled + gestureState.dx
      e.style.left = (e.style.width >= this.props.width) ? e.initialLeft + this.scrolled : 0
      if (e.style.left > e.initialLeft) e.style.left = e.initialLeft
      if (e.style.left < 0) e.style.left = 0

      e.style.opacity = 2*e.style.width/this.props.width - 1

      if (false) {
      } else if (e.initialLeft <= -this.scrolled) {
        var dx = (this.scrolled + this.props.width*i)/2
        e.style.width = this.props.width + dx
        e.style.height = this.props.height + dx
        e.style.top = -dx/2
      } else if (e.style.width <= this.props.width/2) {
        e.style.width = this.props.width/2
        e.style.height = this.props.height - this.props.width/2
        e.style.top = -this.props.width/4
      } else {
        e.style.width = this.props.width
        e.style.height = this.props.height
        e.style.top = 0
      }
      if (e.style.left <= 0 && e.last) {
        e.style.width = this.props.width
        e.style.height = this.props.height
        e.style.top = 0
      }
    })

    this.updateStyles()
    this.forceUpdate()
  },

  end (e, gestureState) {
    this.setPrevScrolled(gestureState.dx)
    this.isMoving = false

    var speed = gestureState.vx*100000000
    this.momentum(0, speed, 1)
  },

  momentum (position, speed, i) {
    var mod = Math.pow(1.5, -i)
    var newPosition = position + speed*mod

    this.move({}, {dx: newPosition})
    if(i<20 && !this.isMoving) {
      setTimeout(() => this.momentum(newPosition, speed, i+1), 10)
    } else {
      this.setPrevScrolled(newPosition)
    }
  },

  truncatePosition () {

  },

  setPrevScrolled (newValue) {
    this.prevScrolled += newValue
    this.prevScrolled = (this.prevScrolled > 0) ? 0 : (-this.prevScrolled > this.props.width*(this.props.items.length-1)) ? -this.props.width*(this.props.items.length-1) : this.prevScrolled
  },
})

