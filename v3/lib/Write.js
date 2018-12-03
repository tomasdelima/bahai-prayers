import React from 'react'

const Write = (props) => <Flex size={store.fontSize} {...props}>
  {props.children}
</Flex>

export default observer(Write)
