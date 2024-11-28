import { useOnlineDepartureRepository } from './repository/useOnlineDepartureRepository'
import { type JSX, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { Airport, Departure } from './models/models'
import { withLoading } from '../utils/withLoading'

export interface DepartureViewModel {
  loading: boolean
  departures: Departure[]
  airports: Airport[]
  selectedAirportIata?: string
  setSelectedAirportIata: (iata: string) => void
}

const useDepartureViewModel = (): DepartureViewModel => {
  const repository = useOnlineDepartureRepository()

  const [loading, setLoading] = useState<boolean>(false)
  const [departures, setDepartures] = useState<Departure[]>([])
  const [airports, setAirports] = useState<Airport[]>([])
  const [selectedAirportIata, setSelectedAirportIata] = useState<string>()

  useEffect(() => {
    const newAirports = repository.getAirports()
    setAirports(newAirports)

    const defaultAirport = newAirports.find(airport => airport.iata === 'OSL')
    setSelectedAirportIata(defaultAirport?.iata)
  }, [repository])

  useEffect(() => {
    void withLoading(async () => {
      if (!selectedAirportIata) return

      const departures = await repository.getDepartures(selectedAirportIata)
      const activeDepartures = departures.filter(departure => !departure.hasDeparted)
      setDepartures(activeDepartures)
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

const DepartureViewModelContext = createContext<DepartureViewModel | null>(null)

export const useDepartureViewModelContext = (): DepartureViewModel => {
  const context = useContext(DepartureViewModelContext)
  if (context) return context

  throw Error('Could not find departure view model in context')
}

export const DepartureViewModelProvider = (props: { children: ReactNode }): JSX.Element => {
  const viewModel = useDepartureViewModel()
  return <DepartureViewModelContext.Provider value={viewModel}>{props.children}</DepartureViewModelContext.Provider>
}
