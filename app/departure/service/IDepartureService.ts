import { Airport, Departure } from '../models/models'
import { IDepartureRepository } from '../repository/IDepartureRepository'

export interface IDepartureService {
  getActiveDepartures: (airport: string) => Promise<Departure[]>
  getAirports: () => Airport[]
  getAirport: (iata: string) => Airport | undefined
}

export const DepartureService = (props: { repository: IDepartureRepository }): IDepartureService => {
  const { repository } = props

  const getActiveDepartures = async (airport: string): Promise<Departure[]> => {
    const departures = await repository.getDepartures(airport)
    return departures.filter(departure => !departure.hasDeparted)
  }

  const getAirports = (): Airport[] => {
    return repository.getAirports()
  }

  const getAirport = (iata: string): Airport | undefined => {
    return repository.getAirports().find(airport => airport.iata = iata)
  }

  return {
    getActiveDepartures,
    getAirports,
    getAirport,
  }
}

