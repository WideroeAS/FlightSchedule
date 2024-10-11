import { JSX } from 'react'
import AirportPicker from '../components/AirportPicker'
import DepartureList from './DepartureList'
import { DepartureControllerProvider } from '../DepartureController'

const Home = (): JSX.Element => {
  return (
    <DepartureControllerProvider>
      <AirportPicker />
      <DepartureList />
    </DepartureControllerProvider>
  )
}

export default Home
