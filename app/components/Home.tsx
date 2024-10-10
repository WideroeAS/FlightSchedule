import { JSX, useEffect, useMemo, useRef, useState } from 'react'
import { Airport, Departure } from '@/app/data/models'
import { useRepository } from '@/app/data/useRepository'
import DepartureCard from '@/app/components/DepartureCard'
import { ScrollView, View } from 'react-native'
import style from '@/app/style'
import { Picker } from '@react-native-picker/picker'

const Home = (): JSX.Element => {
  const repository = useRepository()
  const [departures, setDepartures] = useState<Departure[]>([])
  const airports = useRef<Airport[]>(repository.getAirports())
  const [selectedAirportIata, setSelectedAirportIata] = useState<string>(airports.current[0].iata)


  useEffect(() => {
    repository.getDepartures(selectedAirportIata).then(setDepartures)
  }, [selectedAirportIata, repository])

  const departureItems = useMemo(() => {
    return departures
      .filter(departure => !departure.hasDeparted)
      .map((departure, index) => {
        return <DepartureCard key={index} departure={departure} />
      })
  }, [departures])

  return (
    <ScrollView style={{ backgroundColor: 'grey' }}>
      <Picker
        style={{ backgroundColor: 'white' }}
        mode="dropdown"
        selectedValue={selectedAirportIata}
        onValueChange={setSelectedAirportIata}
      >
        {airports.current.map(airport =>
          <Picker.Item label={airport.name} value={airport.iata} />,
        )}
      </Picker>
      <View style={{ margin: style.space, gap: style.space }}>
        {departureItems}
      </View>
    </ScrollView>
  )
}

export default Home