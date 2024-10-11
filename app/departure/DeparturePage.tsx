import { JSX } from 'react'
import AirportPicker from './components/AirportPicker'
import DepartureList from './components/DepartureList'
import { DepartureControllerProvider } from './DepartureController'

const DeparturePage = (): JSX.Element => {
  return (
    <DepartureControllerProvider>
      <AirportPicker />
      <DepartureList />
    </DepartureControllerProvider>
  )
}

export default DeparturePage
