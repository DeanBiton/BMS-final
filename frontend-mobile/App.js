import { StyleSheet, View, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store';
import background from './assets/images/background.png'
import NavigationStack from './components/NavigationComponents/NavigationStack';

export default function App() {
  const handleError = (e) => { console.log(e.nativeEvent.error); };


  return (
    <Provider store={store}>
        <ImageBackground 
        source={require('./assets/images/background.png')}
        resizeMode={'cover'}
        style={styles.root}
        onError={handleError}
        >
          <NavigationStack /> 
        </ImageBackground>
    </Provider>
  );
}
//       <View style={styles.root}>       </View>


const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 15,
    //backgroundColor: '#F9FBFC',
    //width: '100%',
    //height: '100%',
    //position:"absolute",top:0,left:0, bottom:0,right:0 
  },
});
