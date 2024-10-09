import { DepartureFlight, DepartureFlightDTO, DeparturesDTO } from '@/app/data/models'
import { DateTime } from 'luxon'

export interface Repository {
  getDepartures: () => Promise<DepartureFlight[]>
}

export const useRepository = (): Repository => {
  const mapDepartureToDomain = (dto: DepartureFlightDTO): DepartureFlight => {
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

  const getDepartures = async (): Promise<DepartureFlight[]> => {
    const airport = 'BOO'
    const params = new URLSearchParams({
      direction: 'd',
      start: '2024-10-08T22:00:00Z',
      end: '2024-10-09T21:59:59Z',
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
