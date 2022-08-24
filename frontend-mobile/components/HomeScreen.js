import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Events from './EventsScreen';
import { useSelector } from 'react-redux'


function Home() {
  const { user } = useSelector((state) => state.auth)
  const navigation = useNavigation();
  const handleLiveTranslateButtonClicked = () => {
    navigation.replace('Events');
  };
  return (
    <View>
      <Text>The Home page</Text>
      <Text>Welcome {user && user.name}</Text>
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