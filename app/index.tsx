import { type JSX } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DeparturePage from './departure/DeparturePage'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name='Flight schedule' component={DeparturePage} />
  </Stack.Navigator>
)
export default App
