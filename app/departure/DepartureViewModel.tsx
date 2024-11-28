import { DepartureRepository } from './repository/DepartureRepository'
import { type JSX, createContext, ReactNode, useContext, useEffect, useState, useRef } from 'react'
import { Airport, Departure } from './models/models'
import { withLoading } from '../utils/withLoading'
import { IDepartureService, DepartureService } from './service/IDepartureService'

export interface DepartureViewModel {
  loading: boolean
  departures: Departure[]
  airports: Airport[]
  selectedAirportIata?: string
  setSelectedAirportIata: (iata: string) => void
}

const useDepartureViewModel = (props: { service: IDepartureService }): DepartureViewModel => {
  const { service } = props

  const [loading, setLoading] = useState<boolean>(false)
  const [departures, setDepartures] = useState<Departure[]>([])
  const [airports, setAirports] = useState<Airport[]>([])
  const [selectedAirportIata, setSelectedAirportIata] = useState<string>()

  useEffect(() => {
    const newAirports = service.getAirports()
    setAirports(newAirports)

    const defaultAirport = service.getAirport('OSL')
    setSelectedAirportIata(defaultAirport?.iata)
  }, [service])

  useEffect(() => {
    if (!selectedAirportIata) return

    void withLoading(async () => {
      const departures = await service.getActiveDepartures(selectedAirportIata)
      setDepartures(departures)
    }, setLoading)
  }, [service, selectedAirportIata])

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
  const service = useRef(DepartureService({ repository: DepartureRepository() })).current
  const viewModel = useDepartureViewModel({ service })
  return <DepartureViewModelContext.Provider value={viewModel}>{props.children}</DepartureViewModelContext.Provider>
}
