import { StyleSheet, View, ImageBackground } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './app/store';
import background from './assets/images/background.png'
import NavigationStack from './components/NavigationComponents/NavigationStack';

export default function App() {
  const handleError = (e) => { console.log(e.nativeEvent.error); };

  return (
    <Provider store={store}> 
      <NavigationStack /> 
    </Provider>
  );
}
/*
<ImageBackground 
        source={require('./assets/images/background.png')}
        resizeMode={'cover'}
        style={styles.root}
        onError={handleError}
      >

    </ImageBackground>
*/
const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 15,
    height: '100%',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
});

// #00043c  rgba(0,4,60,255) logo blue
// #ef0114 || rgb(239,1,20) logo red 
// #474e68 logo grey