import { JSX } from 'react'
import { Text } from 'react-native'
import { DepartureControllerProvider } from './DepartureController'
import AirportPicker from './components/AirportPicker'
import DepartureList from './components/DepartureList'
import Credit from './components/Credit'

const DeparturePage = (): JSX.Element => {
  return (
    <Text style={{ fontSize: 32 }}>Hello world 👋</Text>
  )
}

export default DeparturePage
