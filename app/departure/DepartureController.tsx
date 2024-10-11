import { useDepartureRepository } from './data/useDepartureRepository'
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { Airport, Departure } from './data/models'
import { withLoading } from '../utils/withLoading'

export interface DepartureController {
  loading: boolean
  departures: Departure[]
  airports: Airport[]
  selectedAirportIata: string
  setSelectedAirportIata: (iata: string) => void
}

const useDepartureController = (): DepartureController => {
  const repository = useDepartureRepository()

  const [loading, setLoading] = useState<boolean>(false)
  const [departures, setDepartures] = useState<Departure[]>([])
  const airports = useRef<Airport[]>(repository.getAirports())
  const [selectedAirportIata, setSelectedAirportIata] = useState<string>(airports.current[0].iata)

  useEffect(() => {
    void withLoading(() => repository.getDepartures(selectedAirportIata).then(setDepartures), setLoading)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAirportIata])

  return {
    loading,
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
