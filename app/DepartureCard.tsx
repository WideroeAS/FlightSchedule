import { StyleSheet, Text, View } from 'react-native'
import { Departure } from '@/app/data/models'
import style from '@/app/style'
import { useMemo } from 'react'

export default function DepartureCard(props: { departure: Departure }) {
  const departureTime = props.departure.departureDate.toFormat('HH:mm')

  const airlineColor = useMemo(() => {
    switch (props.departure.airlineName) {
      case 'Widerøe':
        return 'green'
      case 'Norwegian':
        return 'red'
      case 'SAS':
        return 'blue'
    }
  }, [props.departure.airlineName])

  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.firstRow}>
        <Text>Departure: {departureTime}</Text>
        <Text>To: {props.departure.toAirportName}</Text>
        <Text>Gate: {props.departure.gate}</Text>
      </View>

      <View style={{ ...cardStyle.secondRow, backgroundColor: airlineColor }}>
        <Text>Flight: {props.departure.flightId}</Text>
        <Text>Airline: {props.departure.airlineName}</Text>
      </View>
    </View>
  )
}

const cardStyle = StyleSheet.create({
  container: {
    ...style.card,
    flexDirection: 'row',
    gap: style.space,
    overflow: 'hidden',
  },
  firstRow: {
    flex: 1,
    padding: style.space,
  },
  secondRow: {
    flex: 1,
    padding: style.space,
  },
})