import airports from './airports.json'
import departures from './departures.json'
import { DepartureRepository } from './useDepartureRepository'
import { Departure } from './models'
import { DateTime } from 'luxon'

const useCachedDepartureRepository = (): DepartureRepository => {
  return {
    getDepartures: async (airport: string): Promise<Departure[]> => {
      // Random delay to simulate network request
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000))
      // @ts-ignore
      const departuresForAirport = departures[airport]
      return departuresForAirport.map((it: any) => {
        const departureDate = DateTime.fromISO(it.departureDate)
        const hasDeparted = DateTime.now().toFormat('HHmm') > departureDate.toFormat('HHmm')
        return {
          ...it,
          departureDate,
          hasDeparted,
        }
      })
    },
    getAirports: () => airports,
  }
}

export default useCachedDepartureRepository
