import { ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import { Departure } from '../models/models'
import React, { useMemo } from 'react'
import { WithLocalSvg } from 'react-native-svg/css'
import wfLogo from '../../../assets/svg/wf.svg'
import norwegianLogo from '../../../assets/svg/norwegian.svg'
import sasLogo from '../../../assets/svg/sas.svg'

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
    <View style={style.container}>
      <View style={style.row}>
        <Text>Departure: {departureTime}</Text>
        <Text>To: {props.departure.toAirportName}</Text>
        <Text>Gate: {props.departure.gate}</Text>
      </View>

      <View style={style.row}>
        <Text>Flight: {props.departure.flightId}</Text>
        <Text>Airline: {props.departure.airlineName}</Text>
        <WithLocalSvg asset={airlineIcon as ImageSourcePropType} width={32} height={32} />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
    overflow: 'hidden',
  },
  row: {
    flex: 1,
    padding: 8,
  },
})
