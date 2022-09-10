import React from 'react'
import { StyleSheet, Text, View, Dimensions} from 'react-native'
import { useSelector } from 'react-redux'

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const offset = 40;
const radius = 20;

function HomeScreen({navigation}) {
  
  const { user } = useSelector((state) => state.auth)

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    //backgroundColor: '#D3D3D3',
    height: '100%',
    marginTop: 30,
    marginLeft: '5%',
    paddingBottom: 10,
  },
  cardContainer: {
    width: deviceWidth - offset,
    backgroundColor: '#D3D3D3',
    borderRadius: radius,
    height: '92%',

    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 9,
  },
});

export default HomeScreen