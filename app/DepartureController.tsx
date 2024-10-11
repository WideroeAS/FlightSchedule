import { useRepository } from './data/useRepository'
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Airport, Departure } from './data/models'

export interface DepartureController {
  departures: Departure[]
  airports: Airport[]
  selectedAirportIata: string
  setSelectedAirportIata: (iata: string) => void
}

const useDepartureController = (): DepartureController => {
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

const DepartureControllerContext = createContext<DepartureController | null>(null)

export const useDepartureControllerContext = (): DepartureController => {
  const context = useContext(DepartureControllerContext)
  if (context) return context

  throw Error('Could not find departure context')
}

export const DepartureControllerProvider = (props: { children: ReactNode }): JSX.Element => {
  const controller = useDepartureController()

  return <DepartureControllerContext.Provider value={controller}>{props.children}</DepartureControllerContext.Provider>
}
