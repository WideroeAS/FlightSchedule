import { type JSX } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home'

const Stack = createNativeStackNavigator()

const App = (): JSX.Element => (
  <Stack.Navigator>
    <Stack.Screen name='Flight table' component={Home} />
  </Stack.Navigator>
)
export default App
