import { JSX } from 'react'
import DepartureCard from './DepartureCard'
import { FlatList, View } from 'react-native'
import { useDepartureControllerContext } from '../DepartureController'
import { ActivityIndicator } from 'react-native'

const DepartureList = (): JSX.Element => {
  const controller = useDepartureControllerContext()

  return (
    <View style={{ backgroundColor: 'grey', flex: 1 }}>
      {controller.loading && <ActivityIndicator size={'large'} />}
      <FlatList
        style={{ margin: 8 }}
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
        data={controller.departures}
        renderItem={departure => <DepartureCard departure={departure.item} />}
      />
    </View>
  )
}

export default DepartureList
