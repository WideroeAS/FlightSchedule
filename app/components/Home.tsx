import { JSX } from 'react'
import AirportPicker from '../components/AirportPicker'
import DepartureList from './DepartureList'
import { useDepartureController } from '../DepartureController'

const Home = (): JSX.Element => {
  const controller = useDepartureController()

  return (
    <>
      <AirportPicker
        airports={controller.airports}
        selectedAirportIata={controller.selectedAirportIata}
        setSelectedAirportIata={controller.setSelectedAirportIata}
      />
      <DepartureList departures={controller.departures} />
    </>
  )
}

export default Home
