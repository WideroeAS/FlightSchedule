import { Text } from 'react-native'
import { useRepository } from '@/app/data/useRepository'
import { useEffect, useMemo, useState } from 'react'
import { Departure } from '@/app/data/models'

export default function HomeScreen() {
  const [departures, setDepartures] = useState<Departure[]>([])

  useEffect(() => {
    const repository = useRepository()
    repository.getDepartures('BOO').then(setDepartures)
  }, [])

  const departureItems = useMemo(() => {
    return departures.map((departure, index) => {
      return <Text key={index}>{departure.toAirportName}</Text>
    })
  }, [departures])

  return (
    <>
      <Text>Flight table app</Text>
      {
        departureItems
      }
    </>
  )
}
