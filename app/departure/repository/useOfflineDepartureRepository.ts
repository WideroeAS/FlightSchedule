import airports from './data/airports.json'
import departures from './data/departures.json'
import { Departure } from '../models/models'
import { DateTime } from 'luxon'
import { DepartureRepository } from './DepartureRepository'
import { useMemo } from 'react'

const useOfflineDepartureRepository = (): DepartureRepository => {
  return useMemo(() => {
    const getDepartures = async (airport: string): Promise<Departure[]> => {
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
    }

    const getAirports = () => airports

    return {
      getDepartures,
      getAirports,
    }
  }, [])
}

export default useOfflineDepartureRepository
