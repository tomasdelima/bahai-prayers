export default ({ onPress, children, margin }) => <Flex
  margin={margin || 20}
  onPress={onPress}
>
  {children}
</Flex>
