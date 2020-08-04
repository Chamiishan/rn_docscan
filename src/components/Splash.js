import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';
import { LOGIN_SUCCESS } from '../utils/Constants';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Splash extends Component {

    componentDidMount() {
        console.log("componenetDidMount");

        //initial configuration
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId: '958730634482-7bjl3p1dovrij081bpbdbpo9osdhcbad.apps.googleusercontent.com',
        });
        setTimeout(() => {
            this._isSignedIn();
        }, 3000);

    }

    getLoginStatus = async () => {
        try {
            const value = await AsyncStorage.getItem("login_status")
            if (value !== null && value == LOGIN_SUCCESS) {
                Actions.reset('home_root', {login_status: true});
                // value previously stored
            } else {
                Actions.reset('login');
            }
        } catch (e) {
            // error reading value
            Actions.reset('login')
        }
    }

    _isSignedIn = async () => {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (isSignedIn) {
            console.log('User is already signed in');
            this.getLoginStatus();
        } else {
            console.log('Please Login');
            Actions.reset('login')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.mainTxt}>Scanner</Text>
                <View style={styles.powerContainer}>
                    <Text style={styles.pTxt}>Powered By</Text>
                    <Text style={styles.cTxt}>Code Banaa</Text>
                    <Text style={styles.mTxt}>Made in India</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainTxt: {
        color: '#00163b',
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: screenHeight / 4
    },
    powerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        marginBottom: screenHeight / 5,
        color: '#0a3b04',
    },
    pTxt: {
        fontSize: 15,
    },
    cTxt: {
        fontSize: 30,
    },
    mTxt: {
        fontSize: 15,
        alignSelf: "flex-end",
        marginEnd: 10
    }
})

export default Splash;