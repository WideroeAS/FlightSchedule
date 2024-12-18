import { JSX } from 'react'
import AirportPicker from './components/AirportPicker'
import DepartureList from './components/DepartureList'
import { DepartureViewModelProvider } from './DepartureViewModel'
import Credit from './components/Credit'

const DepartureScreen = (): JSX.Element => {
  return (
    <DepartureViewModelProvider>
      <AirportPicker />
      <DepartureList />
      <Credit />
    </DepartureViewModelProvider>
  )
}

export default DepartureScreen
