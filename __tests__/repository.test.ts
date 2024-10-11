import useCachedDepartureRepository from '../app/departure/data/useCachedDepartureRepository'
import { useDepartureRepository } from '../app/departure/data/useDepartureRepository'

describe('Repository tests', () => {
  test('Online repository fetches departures and converts them to domain model', async () => {
    const repository = useDepartureRepository()
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
    const repository = useCachedDepartureRepository()
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
