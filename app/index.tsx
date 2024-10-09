import { Animated, Text, View } from 'react-native'
import { useRepository } from '@/app/data/useRepository'
import { useEffect, useMemo, useState } from 'react'
import { Departure } from '@/app/data/models'
import DepartureCard from '@/app/DepartureCard'
import style from '@/app/style'
import ScrollView = Animated.ScrollView

export default function HomeScreen() {
  const [departures, setDepartures] = useState<Departure[]>([])

  useEffect(() => {
    const repository = useRepository()
    repository.getDepartures('BOO').then(setDepartures)
  }, [])

  const departureItems = useMemo(() => {
    return departures.map((departure, index) => {
      return <DepartureCard key={index} departure={departure} />
    })
  }, [departures])

  return (
    <>
      <Text>Flight table app</Text>
      <ScrollView>
        <View style={{ gap: style.space }}>
          {departureItems}
        </View>
      </ScrollView>
    </>
  )
}
