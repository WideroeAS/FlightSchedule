import useOfflineDepartureRepository from '../app/departure/repository/useOfflineDepartureRepository'
import { DepartureRepository } from '../app/departure/repository/DepartureRepository'
import { IDepartureRepository } from '../app/departure/repository/IDepartureRepository'
import { render } from '@testing-library/react-native'
import { type JSX } from 'react'

describe('Repository tests', () => {
  const createInComponentBody = (repositoryFactory: () => IDepartureRepository): IDepartureRepository => {
    let repository!: IDepartureRepository
    const Component = (): JSX.Element => {
      repository = repositoryFactory()
      return <></>
    }

    render(<Component />)

    return repository
  }

  test('Online repository fetches departures and converts them to domain model', async () => {
    const repository = createInComponentBody(DepartureRepository)
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
