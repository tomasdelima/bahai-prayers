export default (props) => {
  if (props.label) {
    return <Flex grow style={[s.indicator, {borderColor: t.text.color}]}>
      <Text style={[s.textAlignCenter, t.text, {top: 1}]}>
        {/*{props.label}*/}
      </Text>
    </Flex>
  } else {
    return null
  }
}
