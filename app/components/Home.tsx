import { JSX, useEffect, useRef, useState } from 'react'
import { Airport, Departure } from '../data/models'
import { useRepository } from '../data/useRepository'
import AirportPicker from '../components/AirportPicker'
import DepartureList from './DepartureList'

const Home = (): JSX.Element => {
  const repository = useRepository()
  const [departures, setDepartures] = useState<Departure[]>([])
  const airports = useRef<Airport[]>(repository.getAirports())
  const [selectedAirportIata, setSelectedAirportIata] = useState<string>(airports.current[0].iata)

  useEffect(() => {
    repository.getDepartures(selectedAirportIata).then(setDepartures)
  }, [selectedAirportIata, repository])

  return (
    <>
      <AirportPicker
        airports={airports.current}
        selectedAirportIata={selectedAirportIata}
        setSelectedAirportIata={setSelectedAirportIata}
      />
      <DepartureList departures={departures} />
    </>
  )
}

export default Home
