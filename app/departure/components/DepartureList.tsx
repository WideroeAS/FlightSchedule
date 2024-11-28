import React, { JSX } from 'react'
import DepartureCard from './DepartureCard'
import { FlatList, RefreshControl, View } from 'react-native'
import { useDepartureViewModelContext } from '../DepartureViewModel'

const DepartureList = (): JSX.Element => {
  const viewModel = useDepartureViewModelContext()

  return (
    <View style={{ backgroundColor: 'grey', flex: 1 }}>
      <FlatList
        style={{ margin: 8 }}
        ItemSeparatorComponent={() => <View style={{ margin: 4 }} />}
        data={viewModel.departures}
        renderItem={departure => <DepartureCard departure={departure.item} />}
        refreshControl={<RefreshControl refreshing={viewModel.loading} onRefresh={viewModel.onRefresh} />}
      />
    </View>
  )
}

export default DepartureList
