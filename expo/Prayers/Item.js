var Item = ({ item }) => <GenericItem
  to={`/prayers/${item.Id}`}
  label={item.Text.replace(/<.+?>/g, '').slice(0, 100) + '...'}
/>

export default withRouter(Item)
