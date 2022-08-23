import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Events from './EventsScreen';

function Home() {
  const navigation = useNavigation();
  const handleLiveTranslateButtonClicked = () => {
    navigation.replace('Events');
  };
  return (
    <View>
      <Text>The Home page</Text>
      <Text>Welcome</Text>
      <Button
          onPress={handleLiveTranslateButtonClicked}
          title="Events">
          
        </Button>
    </View>
  );
}

export default Home;
/*
function Home() {
  return (
    <View>
      <Text>The Home page</Text>
      <Text>Welcome</Text>
    </View>
  );
}

export default Home;*/
/*
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function Home(){
  return (
    <View>
      <Text>You have friends.</Text>

      <Button
        title="Add some friends"
        onPress={() =>
          this.props.navigation.navigate('Events')
        }
      />
    </View>
  );
}

export default Home;
*/