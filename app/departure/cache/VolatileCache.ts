import { DateTime } from 'luxon'

export interface Cache<V> {
  set: (key: string, value: V) => void
  get: (key: string) => V | undefined
}

export const VolatileCache = <V>(config: { entryValidityInSeconds: number }): Cache<V> => {
  const map = new Map<string, { timestamp: DateTime, value: V }>()

  return {
    set: (key: string, value: V) => map.set(key, { timestamp: DateTime.now(), value }),
    get: (key: string) => {
      const entry = map.get(key)
      if (!entry) return undefined

      const entryAgeInSeconds = entry.timestamp.diffNow(['seconds']).toObject().seconds
      if (!entryAgeInSeconds) return undefined

      console.log('entry age', entryAgeInSeconds)
      return Math.abs(entryAgeInSeconds) > config.entryValidityInSeconds ? undefined : entry.value
    },
  }
}

