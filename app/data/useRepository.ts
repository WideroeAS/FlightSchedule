import { Departure, DepartureFlightDTO, DeparturesDTO } from '@/app/data/models'
import { DateTime } from 'luxon'

export interface Repository {
  getDepartures: (airport: string) => Promise<Departure[]>
}

export const useRepository = (): Repository => {
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
    const tomorrow = today.plus({ day: 1 })
    const start = `${today.toISODate()}T22:00:00Z`
    const end = `${tomorrow.toISODate()}T21:59:59Z`

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
  }
}
