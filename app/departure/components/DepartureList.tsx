import { JSX } from 'react'
import DepartureCard from './DepartureCard'
import { FlatList, View } from 'react-native'
import { useDepartureViewModelContext } from '../DepartureViewModel'
import { ActivityIndicator } from 'react-native'

const DepartureList = (): JSX.Element => {
  const viewModel = useDepartureViewModelContext()

  return (
    <View style={{ backgroundColor: 'grey', flex: 1 }}>
      {viewModel.loading && <ActivityIndicator size={'large'} />}
      <FlatList
        style={{ margin: 8 }}
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
        data={viewModel.departures}
        renderItem={departure => <DepartureCard departure={departure.item} />}
      />
    </View>
  )
}

export default DepartureList
