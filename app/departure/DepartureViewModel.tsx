import { DepartureRepository } from './repository/DepartureRepository'
import { createContext, type JSX, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { Airport, Departure } from './models/models'
import { withLoading } from '../utils/withLoading'
import { DepartureService, IDepartureService } from './service/IDepartureService'
import { VolatileCache } from './cache/VolatileCache'

export interface DepartureViewModel {
  loading: boolean
  departures: Departure[]
  airports: Airport[]
  selectedAirportIata?: string
  onAirportIataChanged: (iata: string) => void
  onRefresh: () => void
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

  const getDepartures = useCallback(() => {
    if (!selectedAirportIata) return

    void withLoading(async () => {
      const departures = await service.getActiveDepartures(selectedAirportIata)
      setDepartures(departures)
    }, setLoading)
  }, [service, selectedAirportIata])

  useEffect(getDepartures, [getDepartures])

  return {
    loading,
    departures,
    airports,
    selectedAirportIata,
    onAirportIataChanged: setSelectedAirportIata,
    onRefresh: getDepartures,
  }
}

const DepartureViewModelContext = createContext<DepartureViewModel | null>(null)

export const useDepartureViewModelContext = (): DepartureViewModel => {
  const context = useContext(DepartureViewModelContext)
  if (context) return context

  throw Error('Could not find departure view model in context')
}

const service = DepartureService({
  departureRepository: DepartureRepository(),
  departureCache: VolatileCache<Departure[]>({ entryValidityInSeconds: 60 }),
})

export const DepartureViewModelProvider = (props: { children: ReactNode }): JSX.Element => {
  const viewModel = useDepartureViewModel({ service })
  return <DepartureViewModelContext.Provider value={viewModel}>{props.children}</DepartureViewModelContext.Provider>
}
