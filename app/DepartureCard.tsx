import { StyleSheet, Text, View } from 'react-native'
import { Departure } from '@/app/data/models'
import style from '@/app/style'

export default function DepartureCard(props: { departure: Departure }) {
  const departureTime = props.departure.departureDate.toFormat('HH:mm')

  return (
    <View style={{ ...style.card, flexDirection: 'row', gap: style.space }}>
      <View style={cardStyle.row}>
        <Text>Departure: {departureTime}</Text>
        <Text>To: {props.departure.toAirportName}</Text>
        <Text>Gate: {props.departure.gate}</Text>
      </View>
      <View style={cardStyle.row}>
        <Text>Flight: {props.departure.flightId}</Text>
        <Text>Airline: {props.departure.airlineName}</Text>
      </View>
    </View>
  )
}

const cardStyle = StyleSheet.create({
  row: {
    margin: style.space,
  },
})