import React from 'react'

export default (props) => <ScrollView containerStyle={[s.high(),s.red]} style={[s.wide(), s.white, s.marginTop(statusBarHeight)]}>
  {props.children}
</ScrollView>
