import React from 'react'
import {observer} from 'mobx-react/native'

@observer
export default class Prayers extends React.Component {
  render() {
    var prayers = store.prayers.filter(t => t.Id == store.prayerId)

    return <ScrollView style={[s.wide()]}>
      {prayers.map(prayer => <Prayer prayer={prayer} key={prayer.Id}/>)}
    </ScrollView>
  }
}
