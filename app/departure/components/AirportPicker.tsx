import { JSX } from 'react'
import { Picker } from '@react-native-picker/picker'
import { useDepartureViewModelContext } from '../DepartureViewModel'

const AirportPicker = (): JSX.Element => {
  const viewModel = useDepartureViewModelContext()

  return (
    <Picker
      style={{ backgroundColor: 'white' }}
      mode='dropdown'
      selectedValue={viewModel.selectedAirportIata}
      onValueChange={viewModel.setSelectedAirportIata}
    >
      {viewModel.airports.map((airport, index) => (
        <Picker.Item key={index} label={airport.name} value={airport.iata} />
      ))}
    </Picker>
  )
}

export default AirportPicker
