import { Airport, Departure, DepartureFlightDTO, DeparturesDTO } from '../models/models'
import { DateTime } from 'luxon'
import airports from './data/airports.json'
import { useMemo } from 'react'
import { DepartureRepository } from './DepartureRepository'

export const useOnlineDepartureRepository = (): DepartureRepository => {
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

    const convertToAvinorDate = (dateTime: DateTime): string => {
      const utcDateTime = dateTime.toUTC()
      const isoDate = utcDateTime.toISODate()
      const time = utcDateTime.toFormat('HH:mm:ss')
      return `${isoDate}T${time}Z`
    }

    const getDepartures = async (airport: string): Promise<Departure[]> => {
      const start = convertToAvinorDate(DateTime.now().startOf('day'))
      const end = convertToAvinorDate(DateTime.now().endOf('day'))

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

      const departureResult = (await result.json()) as DeparturesDTO
      return departureResult.flights.map(mapDepartureToDomain)
    }

    return {
      getDepartures,
      getAirports: (): Airport[] => airports,
    }
  }, [])
}
