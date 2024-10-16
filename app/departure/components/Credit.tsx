import { JSX } from 'react'
import { Linking, Text, View } from 'react-native'

const Credit = (): JSX.Element => {
  const openWebsite = () => Linking.openURL('https://www.avinor.no')

  return (
    <View style={{ flexDirection: 'row', padding: 8 }}>
      <Text>Flight data from </Text>
      <Text style={{ color: 'blue' }} onPress={openWebsite}>
        Avinor
      </Text>
    </View>
  )
}

export default Credit
