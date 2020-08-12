import React, { Component } from 'react';
import {
  View, StyleSheet, Image, Text, TouchableNativeFeedback,
  AsyncStorage,
  // Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';
import { LOGIN_SUCCESS } from '../utils/Constants';
// import Folders from '../components/Folders';

// const screenWidth = Math.round(Dimensions.get('window').width);
// const screenHeight = Math.round(Dimensions.get('window').height);

class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.getLoginStatus();
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        // navOptionThumb: 'camera',
        navOptionName: 'All Docs',
        screenToNavigate: 'Screen 1',
      },
      {
        // navOptionThumb: 'image',
        navOptionName: 'Export as a PDF',
        screenToNavigate: 'exportaspdf',
      },
      {
        // navOptionThumb: 'build',
        navOptionName: 'Import & Export Files',
        screenToNavigate: 'Screen 3',
      },
      {
        // navOptionThumb: 'build',
        navOptionName: 'Notifications',
        screenToNavigate: 'Screen 4',
      },
      {
        // navOptionThumb: 'build',
        navOptionName: 'About Us',
        screenToNavigate: 'Screen 5',
      },
      {
        // navOptionThumb: 'build',
        navOptionName: 'Settings',
        screenToNavigate: 'settings',
      },
      {
        // navOptionThumb: 'build',
        navOptionName: 'Help',
        screenToNavigate: 'Screen 7',
      },
    ];
  }

  getLoginStatus = async () => {
    this.state = {
      login_status: '',
      user: null
    };
    try {
      const value = await AsyncStorage.getItem("login_status")
      console.log("value: ", value);
      this.setState({
        login_status: value
      });
      const user = await AsyncStorage.getItem("user")
      // user.map(item => console.log("item: ", item))
      // let json = JSON.stringify(user)
      console.log("user ", JSON.parse(user).email);
      this.setState({
        user: JSON.parse(user)
      });
    } catch (e) {
      // error reading value
      console.log("error")
    }
  }

  componentDidMount() {
    console.log("componenetDidMount");

    //initial configuration
    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: '958730634482-7bjl3p1dovrij081bpbdbpo9osdhcbad.apps.googleusercontent.com',
    });
  }


  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.removeValue('login_status');
      this.removeValue('user');
      Actions.reset('login');
    } catch (error) {
      console.error(error);
    }
  };

  removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key)
    } catch (e) {
      // remove error
    }

    console.log('Done.')
  }

  getLoginMenu() {

    if (this.state.login_status == LOGIN_SUCCESS) {
      return (
        <TouchableNativeFeedback background={ripple} onPress={() => {
          console.log('logout')
          this.signOut();
        }}>
          <View style={styles.loginViewStyle}>
            {/* <Icon
              name='logout'
              size={20}
              style={{ marginRight: '10%' }}
            /> */}
            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'sans-serif-medium' }}>Logout</Text>
          </View>
        </TouchableNativeFeedback>
      );

    } else {
      return null;
    }

  }

  render() {
    return (
      <View style={styles.sideMenuContainer}>

        <TouchableNativeFeedback background={ripple} onPress={() => {
          if (this.state.user == null) {
            Actions.reset('login', { login_status: false });
          }
        }}>
          <View style={styles.signinContainer}>
            <Image
              source={this.state.user == null ? require('../icons/user.png') : { uri: this.state.user.photo }}
              style={styles.sideMenuProfileIcon}
            />
            <Text style={styles.signInText}>{this.state.user == null ? "Sign In / Register" :
              this.state.user.email
            }</Text>
          </View>
        </TouchableNativeFeedback>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
        {/*Setting up Navigation Options from option array using loop*/}
        {this.items.map((item, key) => (
          <TouchableNativeFeedback background={ripple} onPress={() => {
            global.currentScreenIndex = key;
            this.props.navigation.closeDrawer();
            Actions.push(item.screenToNavigate);
          }}>
            <View
              style={styles.itemStyle
                //   ,{
                //   backgroundColor: global.currentScreenIndex === key ? '#e0dbdb' : '#ffffff',
                // }
              }
              key={key}>
              {/* <View style={{ marginRight: 10, marginLeft: 20 }}>
                <Icon name={item.navOptionThumb} size={25} color="#808080" />
              </View> */}
              {/* <Icon
              name="home"
              // type='simple-line-icon'
              size={20}
              color="#000"
              style={{ marginRight: '10%' }}
            /> */}
              <Text
                style={{
                  fontSize: 15,
                  color: 'black'
                  // color: global.currentScreenIndex === key ? 'red' : 'black',
                }}
              // onPress={() => {
              //   global.currentScreenIndex = key;
              //   this.props.navigation.navigate(item.screenToNavigate);
              // }}
              >
                {item.navOptionName}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
        {this.getLoginMenu()}
        <View style={styles.appDetailStyle}>
          <Text style={{ fontStyle: 'italic', }}>Version: 1.01 beta</Text>
          <Text style={{ fontSize: 16, color: 'black', margin: 5 }}>Made In India</Text>
        </View>
      </View>
    );
  }
}

const ripple = TouchableNativeFeedback.Ripple('#adacac', false);

const styles = StyleSheet.create({
  sideMenuContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "flex-start",
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  signinContainer: {
    padding: 20,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    color: '#007818',
    fontSize: 15
  },
  sideMenuProfileIcon: {
    marginTop: 20,
    marginBottom: 10,
    height: 80,
    width: 80,
    borderColor: '#82817e',
    borderWidth: 2,
    borderRadius: 80,
  },
  itemStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white'
  },
  loginViewStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    backgroundColor: 'white'
  },
  appDetailStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    marginTop: 40,
  },
});

// const mapStateToProps = (state) => {
//   return {
//     login_status: state.login.login_status
//   }
// };
// export default connect(mapStateToProps)(CustomSidebarMenu);

export default CustomSidebarMenu;