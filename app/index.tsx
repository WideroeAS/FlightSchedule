import { type JSX } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DepartureScreen from './departure/DepartureScreen'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name='Flight schedule' component={DepartureScreen} />
  </Stack.Navigator>
)
export default App
