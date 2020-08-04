import React, { Component } from 'react';
import {
  View, StyleSheet, Image, Text, TouchableNativeFeedback,
  AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { GoogleSignin } from 'react-native-google-signin';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LOGIN_SUCCESS } from '../utils/Constants';
// import Folders from '../components/Folders';

class CustomSidebarMenu extends Component {
  constructor(props) {
    super(props);
    this.getLoginStatus();
    //Setting up the Main Top Large Image of the Custom Sidebar
    this.proileImage =
      'https://aboutreact.com/wp-content/uploads/2018/07/sample_img.png';
    //Array of the sidebar navigation option with icon and screen to navigate
    //This screens can be any screen defined in Drawer Navigator in App.js
    //You can find the Icons from here https://material.io/tools/icons/
    this.items = [
      {
        navOptionThumb: 'camera',
        navOptionName: 'Home',
        screenToNavigate: 'Folders',
      },
      // {
      //   navOptionThumb: 'image',
      //   navOptionName: 'Second Screen',
      //   screenToNavigate: 'NavScreen2',
      // },
      // {
      //   navOptionThumb: 'build',
      //   navOptionName: 'Third Screen',
      //   screenToNavigate: 'NavScreen3',
      // },
    ];
  }

  getLoginStatus = async () => {
    this.state = {
      login_status: '' 
    }; 
    try {
      const value = await AsyncStorage.getItem("login_status")
      console.log("value: ", value);
        this.setState({
          login_status: value 
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

  getLoginMenu(){

    if(this.state.login_status == LOGIN_SUCCESS){
      return(
        <TouchableNativeFeedback background={ripple} onPress={() => {
          console.log('logout')
          this.signOut();
        }}>
          <View style={styles.itemStyle}>
            <Icon
              name='logout'
              size={20}
              style={{ marginRight: '10%' }}
            />
            <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Logout</Text>
          </View>
        </TouchableNativeFeedback>
      );
  
    }else{
      return(
        <TouchableNativeFeedback background={ripple} onPress={() => {
          console.log('logout');
          Actions.reset('login', {login_status: true});
        }}>
          <View style={styles.itemStyle}>
            <Icon
              name='login'
              size={20}
              style={{ marginRight: '10%' }}
            />
            <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Login</Text>
          </View>
        </TouchableNativeFeedback>
      );

    }

  }

  render() {
    return (
      <View style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        {/* <Image
          source={{ uri: this.proileImage }}
          style={styles.sideMenuProfileIcon}
        /> */}
        {/*Divider between Top Image and Sidebar Option*/}
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
            <Icon
              name="home"
              // type='simple-line-icon'
              size={20}
              color="#000"
              style={{ marginRight: '10%' }}
            />
            <Text
              style={{
                fontSize: 15,
                color: global.currentScreenIndex === key ? 'red' : 'black',
              }}
              onPress={() => {
                global.currentScreenIndex = key;
                this.props.navigation.navigate(item.screenToNavigate);
              }}>
              {item.navOptionName}
            </Text>
          </View>
        ))}
        {this.getLoginMenu()}
       
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
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
  itemStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  }
});

// const mapStateToProps = (state) => {
//   return {
//     login_status: state.login.login_status
//   }
// };
// export default connect(mapStateToProps)(CustomSidebarMenu);

export default CustomSidebarMenu;