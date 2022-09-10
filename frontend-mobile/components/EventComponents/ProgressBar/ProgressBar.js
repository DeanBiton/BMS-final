import {useRef, FunctionComponent, useEffect} from 'react';
import {Animated, Dimensions, FlatList, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('screen');
const maxWidth = 230
function ProgressBar({current, max}) {
    const barWidth = useRef(new Animated.Value(0)).current;
    const finalWidth = (width);

    const progressWidth = max===0? maxWidth : current/max >= 1 ? maxWidth : (current/max) * maxWidth
    useEffect(() => {
        Animated.spring(barWidth, {
          toValue: finalWidth,
          bounciness: 10,
          speed: 2,
          useNativeDriver: true,
          delay: 10,
        }).start();
      }, []);

    return (
    <View style={style.view}>
      <Animated.View style={{...style.progressBar, width: progressWidth}}/>
        <Animated.Text style={style.label}>  
            {`${current}/${max}`}
        </Animated.Text>
    </View>
    )
}
//{current/max > 1 ? "100%" : `${Math.floor((current/max)*100)}%`}  
const style = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 30,
    },
    barContainer: {
        padding: 40,
    },
    progressBar: {
        backgroundColor: '#FF6865',
        height: 30,
        borderRadius: 15,
    },
    label:{
        marginTop: 3,
        fontSize:15,  
        color: "black",  
        position: "absolute",  
        zIndex: 1,  
        alignSelf: "center",
        width: 50,
    },
    view:{
        //flex: 1, 
        //flexDirection: 'row-reverse',
    }
});

export default ProgressBar