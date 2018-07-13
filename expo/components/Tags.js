import React from 'react'
import {observer} from 'mobx-react/native'

@observer
export default class Tags extends React.Component {
  render() {
    var tags = store.tags.filter(t => t.Kind == store.kind).sort((a, b) => a.Name > b.Name ? 1 : -1)

    return <ScrollView style={[s.wide()]}>
      {tags.map(tag => <Tag tag={tag} key={tag.Id}/>)}
    </ScrollView>
  }
}
