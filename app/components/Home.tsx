import { JSX, useEffect, useMemo, useState } from 'react'
import { Departure } from '@/app/data/models'
import { useRepository } from '@/app/data/useRepository'
import DepartureCard from '@/app/components/DepartureCard'
import { ScrollView, View } from 'react-native'
import style from '@/app/style'

const Home = (): JSX.Element => {
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
    <ScrollView style={{ backgroundColor: 'grey' }}>
      <View style={{ margin: style.space, gap: style.space }}>
        {departureItems}
      </View>
    </ScrollView>
  )
}

export default Home