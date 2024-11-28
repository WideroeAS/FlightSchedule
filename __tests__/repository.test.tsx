import FakeDepartureRepository from '../app/departure/repository/FakeDepartureRepository'
import { DepartureRepository } from '../app/departure/repository/DepartureRepository'

describe('Repository tests', () => {
  test('Online repository fetches departures and converts them to domain model', async () => {
    const repository = DepartureRepository()
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

  test('Offline repository fetches departures and converts them to domain model', async () => {
    const repository = FakeDepartureRepository()
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
