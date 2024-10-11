import { JSX, useMemo } from 'react'
import DepartureCard from './DepartureCard'
import { ScrollView, View } from 'react-native'
import style from '../../style'
import { useDepartureControllerContext } from '../DepartureController'
import { ActivityIndicator } from 'react-native'

const DepartureList = (): JSX.Element => {
  const controller = useDepartureControllerContext()

  const departureItems = useMemo(() => {
    return controller.departures
      .filter(departure => !departure.hasDeparted)
      .map((departure, index) => <DepartureCard key={index} departure={departure} />)
  }, [controller.departures])

  return (
    <ScrollView style={{ backgroundColor: 'grey' }}>
      {controller.loading && <ActivityIndicator size={'large'} />}
      <View style={{ margin: style.space, gap: style.space }}>{departureItems}</View>
    </ScrollView>
  )
}

export default DepartureList
