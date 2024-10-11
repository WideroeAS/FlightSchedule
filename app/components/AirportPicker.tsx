import { JSX } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDepartureControllerContext } from '../DepartureController'

const AirportPicker = (): JSX.Element => {
  const controller = useDepartureControllerContext()

  return (
    <Picker
      style={{ backgroundColor: 'white' }}
      mode='dropdown'
      selectedValue={controller.selectedAirportIata}
      onValueChange={controller.setSelectedAirportIata}
    >
      {controller.airports.map((airport, index) => (
        <Picker.Item key={index} label={airport.name} value={airport.iata} />
      ))}
    </Picker>
  )
}

export default AirportPicker
