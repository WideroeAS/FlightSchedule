import { useRepository } from '@/app/data/useRepository'
import { DateTime } from 'luxon'

test('Repository fetches departures and converts them to domain model', async () => {
  const repository = useRepository()
  const departures = await repository.getDepartures()

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
