var Item = ({ item }) => <GenericItem
  to={`/language/${item.Id}/tags`}
  label={item.Name}
/>

export default withRouter(Item)
