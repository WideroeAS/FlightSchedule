import { useOnlineDepartureRepository } from './repository/useOnlineDepartureRepository'
import { type JSX, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Airport, Departure } from './models/models'
import { withLoading } from '../utils/withLoading'

export interface DepartureController {
  loading: boolean
  departures: Departure[]
  airports: Airport[]
  selectedAirportIata?: string
  setSelectedAirportIata: (iata: string) => void
}

const useDepartureController = (): DepartureController => {
  const repository = useOnlineDepartureRepository()

  const [loading, setLoading] = useState<boolean>(false)
  const [departures, setDepartures] = useState<Departure[]>([])
  const [airports, setAirports] = useState<Airport[]>([])
  const [selectedAirportIata, setSelectedAirportIata] = useState<string>()

  useEffect(() => {
    const newAirports = repository.getAirports()
    setAirports(newAirports)
    setSelectedAirportIata(newAirports[0].iata)
  }, [repository])

  useEffect(() => {
    void withLoading(async () => {
      if (!selectedAirportIata) return

      const departures = await repository.getDepartures(selectedAirportIata)
      setDepartures(departures)
    }, setLoading)
  }, [repository, selectedAirportIata])

  return {
    loading,
    departures,
    airports,
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
