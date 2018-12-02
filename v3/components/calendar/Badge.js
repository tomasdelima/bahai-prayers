import React from 'react'

export default (props) => {
  if (props.label) {
    return <Flex grow style={[s.indicator]}>
      <Text style={[s.textAlignCenter, t.text, {top: 1}]}>
        {props.label}
      </Text>
    </Flex>
  } else {
    return null
  }
}
