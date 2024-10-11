import { JSX } from 'react'
import AirportPicker from './components/AirportPicker'
import DepartureList from './components/DepartureList'
import { DepartureControllerProvider } from './DepartureController'
import Credit from './components/Credit'

const DeparturePage = (): JSX.Element => {
  return (
    <DepartureControllerProvider>
      <AirportPicker />
      <DepartureList />
      <Credit />
    </DepartureControllerProvider>
  )
}

export default DeparturePage
