import useOfflineDepartureRepository from '../app/departure/repository/useOfflineDepartureRepository'
import { useOnlineDepartureRepository } from '../app/departure/repository/useOnlineDepartureRepository'

describe('Repository tests', () => {
  test('Online repository fetches departures and converts them to domain model', async () => {
    const repository = useOnlineDepartureRepository()
    const departures = await repository.getDepartures('BOO')

    expect(Array.isArray(departures)).toBe(true)
    expect(Object.keys(departures[0])).toStrictEqual([
      'airlineName',
      'flightId',
      'fromAirport',
      'fromAirportName',
      'toAirport',
      'toAirportName',
      'gate',
      'hasDeparted',
      'departureDate',
    ])
  })

  test('Cached repository fetches departures and converts them to domain model', async () => {
    const repository = useOfflineDepartureRepository()
    const departures = await repository.getDepartures('BOO')

    expect(Array.isArray(departures)).toBe(true)
    expect(Object.keys(departures[0])).toStrictEqual([
      'airlineName',
      'flightId',
      'fromAirport',
      'fromAirportName',
      'toAirport',
      'toAirportName',
      'gate',
      'hasDeparted',
      'departureDate',
    ])
  })
})
