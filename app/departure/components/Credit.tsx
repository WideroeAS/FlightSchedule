import { JSX } from 'react'
import { Linking, Text, View } from 'react-native'
import style from '../../style'

const Credit = (): JSX.Element => {
  const openWebsite = () => Linking.openURL('https://www.avinor.no')

  return (
    <View style={{ flexDirection: 'row', padding: style.space }}>
      <Text>Flight data from </Text>
      <Text style={{ color: 'blue' }} onPress={openWebsite}>
        Avinor
      </Text>
    </View>
  )
}

export default Credit
