import { useDepartureRepository } from '../app/departure/data/useDepartureRepository'
import fs from 'fs'

test('Repository fetches departures and converts them to domain model', async () => {
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

test(
  'Cache all airport departures',
  async () => {
    const repository = useDepartureRepository()
    const airports = repository.getAirports()

    const data: object = {}
    for (const airport of airports) {
      // @ts-ignore
      data[airport.iata] = await repository.getDepartures(airport.iata)
      await new Promise(r => setTimeout(r, 1000))
    }

    const json = JSON.stringify(data)
    fs.writeFileSync('./app/departure/data/departures.json', json)
  },
  2 * 60 * 1000,
)
