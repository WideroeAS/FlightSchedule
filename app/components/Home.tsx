import { JSX, useEffect, useMemo, useRef, useState } from 'react'
import { Airport, Departure } from '../data/models'
import { useRepository } from '../data/useRepository'
import DepartureCard from '../components/DepartureCard'
import { ScrollView, View } from 'react-native'
import style from '../style'
import AirportPicker from '../components/AirportPicker'

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
      <AirportPicker
        airports={airports.current}
        selectedAirportIata={selectedAirportIata}
        setSelectedAirportIata={setSelectedAirportIata}
      />
      <View style={{ margin: style.space, gap: style.space }}>
        {departureItems}
      </View>
    </ScrollView>
  )
}

export default Home