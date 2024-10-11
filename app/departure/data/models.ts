import { DateTime } from 'luxon'

export interface DeparturesDTO {
  flights: DepartureFlightDTO[]
}

export interface DepartureFlightDTO {
  airlineName: string // Ex: Wideroe
  flightId: string // Ex: WF769

  fromAirport: string // Ex: BOO
  fromAirportName: string // Ex: Bodo
  toAirport: string // Ex: 'MQN'
  toAirportName: string // Ex: Mo i Rana'

  gate: string // The departure airport gate number
  isOld: boolean // True when flight has departed
  scheduledTimeFull: string // Format: yyyyMMddHHmm
}

export interface Departure {
  airlineName: string
  flightId: string

  fromAirport: string
  fromAirportName: string
  toAirport: string
  toAirportName: string

  gate: string
  hasDeparted: boolean
  departureDate: DateTime
}

export interface Airport {
  name: string
  iata: string
}