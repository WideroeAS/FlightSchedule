import { JSX } from 'react'
import DepartureCard from './DepartureCard'
import { FlatList, View } from 'react-native'
import { useDepartureControllerContext } from '../DepartureController'
import { ActivityIndicator } from 'react-native'
import style from '../../style'

const DepartureList = (): JSX.Element => {
  const controller = useDepartureControllerContext()

  return (
    <View style={{ backgroundColor: 'grey', flex: 1 }}>
      {controller.loading && <ActivityIndicator size={'large'} />}
      <FlatList
        style={{ margin: style.space }}
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
        data={controller.departures}
        renderItem={departure => <DepartureCard departure={departure.item} />}
      />
    </View>
  )
}

export default DepartureList
