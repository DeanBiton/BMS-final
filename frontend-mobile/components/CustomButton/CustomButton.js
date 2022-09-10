import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';


function CustomButton({onPress, text, disable, textColor, type}) {

  let pressableStyle
  if(type === "Ended" || type === "No permission")
    pressableStyle = styles.endedContainer
  else if (type === undefined)
    pressableStyle = styles.defaultContainer
  else 
    pressableStyle = styles.unregisterContainer
  
    return (
    <Pressable 
      onPress={onPress} 
      style={pressableStyle} 
      disabled={disable}
    >
      <Text style={type !== undefined? styles.blackText : styles.defaultText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
    defaultContainer: {
        backgroundColor: '#3B71F3',

        width: '90%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    defaultText: {
        fontWeight: 'bold',
        color: 'white',
    },
    endedContainer: {
      backgroundColor: '#transparent',
      borderColor: "#FF0500",

      width: '90%',
      padding: 15,
      marginVertical: 5,
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 2,
    },
    blackText: {
      fontWeight: 'bold',
      color: 'black',
    },
    unregisterContainer: {
      backgroundColor: '#D3D3D3',
      borderColor: "#3B71F3",

      width: '90%',
      padding: 15,
      marginVertical: 5,
      alignItems: 'center',
      borderRadius: 5,
      borderWidth: 2,
    },
  });

export default CustomButton;