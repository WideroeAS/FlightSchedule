import { Animated, Text, View } from 'react-native'
import { useRepository } from '@/app/data/useRepository'
import { type JSX, useEffect, useMemo, useState } from 'react'
import { Departure } from '@/app/data/models'
import DepartureCard from '@/app/DepartureCard'
import style from '@/app/style'
import ScrollView = Animated.ScrollView
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name="Flight table" component={Home} />
  </Stack.Navigator>
)
export default App

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
