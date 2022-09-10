import React from 'react'
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import profileImage from '../assets/images/profile/test.jpg'

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const offset = 40;
const radius = 20;

function ProfileScreen() {
  const { user } = useSelector((state) => state.auth)

  let nextRegisterDateText = "--/--/--"
  let bloodInsuranceDateText = "--/--/--"
  const today = new Date()
  
  if(!user)
  {
    return <></>
  }
  
  const date = new Date(user.lastDonated)
  const date2 = new Date(user.lastDonated)
  const nextRegisterDate = new Date(date.setMonth(date.getMonth()+3))
  const bloodInsuranceDate = new Date(date2.setFullYear(date2.getFullYear()+1))
  nextRegisterDateText = nextRegisterDate < today ? "Any" : nextRegisterDate.toLocaleDateString('en-GB')
  bloodInsuranceDateText = bloodInsuranceDate < today ? "Any" : bloodInsuranceDate.toLocaleDateString('en-GB')
  
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.infoStyle}>
          <Image source={profileImage} style={styles.imageHeader}/>
          <View style={styles.row}>
            <Text style={styles.keyText}>Name:</Text>
            <Text style={styles.valueText}>{user.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyText}>Email:</Text>
            <Text style={styles.valueText}>{user.email}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyText}>Blood type:</Text>
            <Text style={styles.valueText}>{user.bloodType}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyTextDate}>Can register from:</Text>
            <Text style={styles.valueText}>{nextRegisterDateText}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.keyTextDate}>Blood insurance expired in:</Text>
            <Text style={styles.valueText}>{bloodInsuranceDateText}</Text>
          </View>
        </View>
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
  infoStyle: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  imageHeader: {
    height: 120, 
    width: 120, 
    borderRadius: 60, 
    marginTop: '12%',
    marginBottom: '12%',
    alignSelf: 'center'
  },
  row:{
    flexDirection: "row-reverse",
    width: '100%',
    paddingBottom: '7%',
    paddingTop: '10%',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  valueText:{
    fontWeight: '500',
    fontSize: 15,
    paddingRight: '10%',
  },
  keyText:{
    fontWeight: '500',
    fontSize: 15,
    width: '30%'
  },
  keyTextDate:{
    fontWeight: '500',
    fontSize: 15,
    width: '70%'
  },
  inner:{
    flexDirection: 'row-reverse'
  }
});

export default ProfileScreen

/*
 
      <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} /> 
          
          <Text
          placeholder="First Name"
          placeholderTextColor="#666666"
          autoCorrect={false}
          style={styles.textInput}
        >
          Dean
        </Text>
      </View>

action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  viewYR: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

















import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.titleBar}>
                    <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
                    <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
                </View>

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("./assets/profile-pic.jpg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <View style={styles.dm}>
                        <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                    </View>
                    <View style={styles.active}></View>
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Julie</Text>
                    <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>Photographer</Text>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                        <Text style={[styles.text, styles.subText]}>Followers</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                        <Text style={[styles.text, styles.subText]}>Following</Text>
                    </View>
                </View>

                <View style={{ marginTop: 32 }}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("./assets/media1.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("./assets/media2.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                        <View style={styles.mediaImageContainer}>
                            <Image source={require("./assets/media3.jpg")} style={styles.image} resizeMode="cover"></Image>
                        </View>
                    </ScrollView>
                    <View style={styles.mediaCount}>
                        <Text style={[styles.text, { fontSize: 24, color: "#DFD8C8", fontWeight: "300" }]}>70</Text>
                        <Text style={[styles.text, { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" }]}>Media</Text>
                    </View>
                </View>
                <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Jake Challeahe</Text> and <Text style={{ fontWeight: "400" }}>Luis Poteer</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Started following <Text style={{ fontWeight: "400" }}>Luke Harper</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});


*/
/*
          <Text

          />
        </Text>



import React from 'react';
import Images from '../config/Images';
import {
  Button,
  Container,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
const REPLACE_SCREEN_NAME = props => {
  const { theme } = props;
  return (
    <ScreenContainer
      style={styles.screenContainerJb}
      scrollable={true}
      hasSafeArea={false}
    >
      <ImageBackground
        style={styles.imageBackgroundNb}
        source={Images.ErikmcleannTCtYYyVqSYunsplash}
        resizeMode=""cover""
      />
      <Container
        style={styles.containerEA}
        elevation={0}
        useThemeGutterPadding={true}
      >
        <Image
          style={StyleSheet.flatten([
            styles.imageA3,
            { borderRadius: theme.borderRadius.global },
          ])}
          resizeMode=""cover""
          source={Images.Model024}
        />
        <Text
          style={StyleSheet.flatten([
            styles.textPr,
            theme.typography.headline3,
          ])}
        >
          Jessica Green
        </Text>
        <Button style={styles.buttonP2} type=""outline"">
          Edit Profile
        </Button>
      </Container>
      <Container useThemeGutterPadding={true} elevation={0}>
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableOk,
            { borderColor: theme.colors.divider },
          ])}
        >
          <View style={styles.viewKs}>
            <Text style={theme.typography.body1}>Privacy Settings</Text>
            <Icon
              style={styles.iconFE}
              size={24}
              color={theme.colors.strong}
              name=""MaterialIcons/account-circle""
            />
          </View>
        </Touchable>
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableOm,
            { borderColor: theme.colors.divider },
          ])}
        >
          <View style={styles.viewYR}>
            <Text style={theme.typography.body1}>Notifications</Text>
            <Icon
              style={styles.iconCl}
              color={theme.colors.strong}
              name=""MaterialIcons/notifications""
              size={24}
            />
          </View>
        </Touchable>
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableBp,
            { borderColor: theme.colors.divider },
          ])}
        >
          <View style={styles.viewS1}>
            <Text style={theme.typography.body1}>Order History</Text>
            <Icon
              style={styles.iconZz}
              color={theme.colors.strong}
              size={24}
              name=""MaterialIcons/history""
            />
          </View>
        </Touchable>
        <Touchable
          style={StyleSheet.flatten([
            styles.touchableJg,
            { borderColor: theme.colors.divider },
          ])}
        >
          <View style={styles.viewAl}>
            <Text style={theme.typography.body1}>Payment Details</Text>
            <Icon
              style={styles.iconZb}
              size={24}
              name=""MaterialIcons/payment""
              color={theme.colors.strong}
            />
          </View>
        </Touchable>
      </Container>
    </ScreenContainer>
  );
};
const styles = StyleSheet.create({
  screenContainerJb: {
    justifyContent: 'space-evenly',
  },
  viewKs: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewYR: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewS1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewAl: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  imageBackgroundNb: {
    width: '100%',
    height: 250,
  },
  imageA3: {
    height: 120,
    width: 120,
  },
  containerEA: {
    alignItems: 'center',
    marginTop: -65,
  },
  textPr: {
    width: '100%',
    textAlign: 'center',
    marginTop: 16,
  },
  touchableOk: {
    borderTopWidth: 1,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 32,
  },
  iconFE: {
    height: 24,
    width: 24,
  },
  iconCl: {
    width: 24,
    height: 24,
  },
  iconZz: {
    width: 24,
    height: 24,
  },
  iconZb: {
    height: 24,
    width: 24,
  },
  buttonP2: {
    marginTop: 16,
    alignSelf: 'center',
    width: '50%',
  },
  touchableOm: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  touchableBp: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  touchableJg: {
    paddingBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
});
export default withTheme(REPLACE_SCREEN_NAME);*/