import { Airport, Departure } from '../models/models'

export interface IDepartureRepository {
  getDepartures: (airport: string) => Promise<Departure[]>
  getAirports: () => Airport[]
}
