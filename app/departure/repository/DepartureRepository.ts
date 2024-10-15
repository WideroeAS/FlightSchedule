import { Airport, Departure } from '../models/models'

export interface DepartureRepository {
  getDepartures: (airport: string) => Promise<Departure[]>
  getAirports: () => Airport[]
}
