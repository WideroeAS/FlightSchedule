import { useRepository } from './data/useRepository'
import { useEffect, useRef, useState } from 'react'
import { Airport, Departure } from './data/models'

export interface DepartureController {
  departures: Departure[]
  airports: Airport[]
  selectedAirportIata: string
  setSelectedAirportIata: (iata: string) => void
}

export const useDepartureController = (): DepartureController => {
  const repository = useRepository()

  const [departures, setDepartures] = useState<Departure[]>([])
  const airports = useRef<Airport[]>(repository.getAirports())
  const [selectedAirportIata, setSelectedAirportIata] = useState<string>(airports.current[0].iata)

  useEffect(() => {
    repository.getDepartures(selectedAirportIata).then(setDepartures)
  }, [selectedAirportIata, repository])

  return {
    departures,
    airports: airports.current,
    selectedAirportIata,
    setSelectedAirportIata,
  }
}
