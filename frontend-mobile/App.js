
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar';
import SignInScreen from './components/SignInScreen'
import { Provider } from 'react-redux';
import { store } from './app/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.root}>
        <Navbar />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    marginTop: 15,
    backgroundColor: '#F9FBFC'
  },
});
