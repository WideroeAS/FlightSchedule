import useOfflineDepartureRepository from '../app/departure/repository/useOfflineDepartureRepository'
import { useOnlineDepartureRepository } from '../app/departure/repository/useOnlineDepartureRepository'
import { DepartureRepository } from '../app/departure/repository/DepartureRepository'
import { render } from '@testing-library/react-native'
import { type JSX } from 'react'

describe('Repository tests', () => {
  const createInComponentBody = (repositoryFactory: () => DepartureRepository): DepartureRepository => {
    let repository!: DepartureRepository
    const Component = (): JSX.Element => {
      repository = repositoryFactory()
      return <></>
    }

    render(<Component />)

    return repository
  }

  test('Online repository fetches departures and converts them to domain model', async () => {
    const repository = createInComponentBody(useOnlineDepartureRepository)
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
    const repository = createInComponentBody(useOfflineDepartureRepository)
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
