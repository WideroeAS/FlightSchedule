import { JSX } from 'react'
import { Airport } from '../data/models'
import { Picker } from '@react-native-picker/picker'

const AirportPicker = (props: {
  airports: Airport[]
  selectedAirportIata: string
  setSelectedAirportIata: (iata: string) => void
}): JSX.Element => {
  return (
    <Picker
      style={{ backgroundColor: 'white' }}
      mode='dropdown'
      selectedValue={props.selectedAirportIata}
      onValueChange={props.setSelectedAirportIata}
    >
      {props.airports.map((airport, index) => (
        <Picker.Item key={index} label={airport.name} value={airport.iata} />
      ))}
    </Picker>
  )
}

export default AirportPicker
