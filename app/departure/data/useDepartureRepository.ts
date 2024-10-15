import { Airport, Departure, DepartureFlightDTO, DeparturesDTO } from './models'
import { DateTime } from 'luxon'
import airports from './airports.json'
import { useMemo } from 'react'

export interface DepartureRepository {
  getDepartures: (airport: string) => Promise<Departure[]>
  getAirports: () => Airport[]
}

export const useDepartureRepository = (): DepartureRepository => {
  return useMemo(() => {
    const mapDepartureToDomain = (dto: DepartureFlightDTO): Departure => {
      return {
        airlineName: dto.airlineName,
        flightId: dto.flightId,

        fromAirport: dto.fromAirport,
        fromAirportName: dto.fromAirportName,
        toAirport: dto.toAirport,
        toAirportName: dto.toAirportName,

        gate: dto.gate,
        hasDeparted: dto.isOld,
        departureDate: DateTime.fromFormat(dto.scheduledTimeFull, 'yyyyMMddHHmm'),
      }
    }

    const getDepartures = async (airport: string): Promise<Departure[]> => {
      const today = DateTime.now()
      const yesterday = today.minus({ day: 1 })
      const start = `${yesterday.toISODate()}T22:00:00Z`
      const end = `${today.toISODate()}T21:59:59Z`

      const params = new URLSearchParams({
        direction: 'd',
        start,
        end,
        language: 'no',
      })
      const path = `Api/Flights/Airport/${airport}?${params.toString()}`
      const host = 'https://avinor.no'
      const url = new URL(path, host)

      const result = await fetch(url)

      const departureResult = await result.json() as DeparturesDTO
      return departureResult.flights.map(mapDepartureToDomain)
    }

    return {
      getDepartures,
      getAirports: (): Airport[] => airports,
    }
  }, [])
}
