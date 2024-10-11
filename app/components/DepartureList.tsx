import { JSX, useMemo } from 'react'
import DepartureCard from '../components/DepartureCard'
import { ScrollView, View } from 'react-native'
import style from '../style'
import { useDepartureControllerContext } from '../DepartureController'

const DepartureList = (): JSX.Element => {
  const controller = useDepartureControllerContext()

  const departureItems = useMemo(() => {
    return controller.departures
      .filter(departure => !departure.hasDeparted)
      .map((departure, index) => <DepartureCard key={index} departure={departure} />)
  }, [controller.departures])

  return (
    <ScrollView style={{ backgroundColor: 'grey' }}>
      <View style={{ margin: style.space, gap: style.space }}>{departureItems}</View>
    </ScrollView>
  )
}

export default DepartureList
