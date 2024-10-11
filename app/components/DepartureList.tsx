import { JSX, useMemo } from 'react'
import { Departure } from '../data/models'
import DepartureCard from '../components/DepartureCard'
import { ScrollView, View } from 'react-native'
import style from '../style'

const DepartureList = (props: { departures: Departure[] }): JSX.Element => {
  const departureItems = useMemo(() => {
    return props.departures
      .filter(departure => !departure.hasDeparted)
      .map((departure, index) => <DepartureCard key={index} departure={departure} />)
  }, [props.departures])

  return (
    <ScrollView style={{ backgroundColor: 'grey' }}>
      <View style={{ margin: style.space, gap: style.space }}>{departureItems}</View>
    </ScrollView>
  )
}

export default DepartureList
