import { Airport, Departure } from '../models/models'
import { IDepartureRepository } from '../repository/IDepartureRepository'
import { Cache } from '../cache/VolatileCache'

export interface IDepartureService {
  getActiveDepartures: (iata: string) => Promise<Departure[]>
  getAirports: () => Airport[]
  getAirport: (iata: string) => Airport | undefined
}

export const DepartureService = (props: {
  departureService: IDepartureRepository,
  departureCache: Cache<Departure[]>,
}): IDepartureService => {
  const { departureService, departureCache } = props

  const getActiveDepartures = async (iata: string): Promise<Departure[]> => {
    const cachedDepartures = departureCache.get(iata)
    if (cachedDepartures) return cachedDepartures

    const departures = await departureService.getDepartures(iata)
    const activeDepartures = departures.filter(departure => !departure.hasDeparted)
    departureCache.set(iata, activeDepartures)

    return activeDepartures
  }

  const getAirports = (): Airport[] => {
    return departureService.getAirports()
  }

  const getAirport = (iata: string): Airport | undefined => {
    return departureService.getAirports().find(airport => airport.iata = iata)
  }

  return {
    getActiveDepartures,
    getAirports,
    getAirport,
  }
}

