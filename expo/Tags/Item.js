var Item = ({ item, match }) => <GenericItem
  to={`/language/${match.params.languageId}/tags/${item.Id}/prayers`}
  label={item.Name}
/>

export default withRouter(Item)
