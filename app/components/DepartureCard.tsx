import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import { Departure } from '../data/models'
import style from '../style'
import React, { useMemo } from 'react'
import { WithLocalSvg } from 'react-native-svg/css'
import wfLogo from '../../assets/svg/wf.svg'
import norwegianLogo from '../../assets/svg/norwegian.svg'
import sasLogo from '../../assets/svg/sas.svg'

export default function DepartureCard(props: { departure: Departure }) {
  const departureTime = props.departure.departureDate.toFormat('HH:mm')

  const airlineIcon = useMemo(() => {
    switch (props.departure.airlineName) {
      case 'Widerøe':
        return wfLogo
      case 'Norwegian':
        return norwegianLogo
      case 'SAS':
        return sasLogo
    }
  }, [props.departure.airlineName])

  return (
    <View style={cardStyle.container}>
      <View style={cardStyle.firstRow}>
        <Text>Departure: {departureTime}</Text>
        <Text>To: {props.departure.toAirportName}</Text>
        <Text>Gate: {props.departure.gate}</Text>
      </View>

      <View style={{ ...cardStyle.secondRow }}>
        <Text>Flight: {props.departure.flightId}</Text>
        <Text>Airline: {props.departure.airlineName}</Text>
        <WithLocalSvg asset={airlineIcon as ImageSourcePropType} width={32} height={32} />
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
