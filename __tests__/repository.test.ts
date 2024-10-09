import { useRepository } from '@/app/data/useRepository'

test('Repository fetches departures and converts them to domain model', async () => {
  const repository = useRepository()
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
