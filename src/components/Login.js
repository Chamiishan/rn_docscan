import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Dimensions, TouchableOpacity
} from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Button } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { GSignIn } from '../actions/LoginActions';
import { IN_PROGRESS } from '../utils/Constants'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Login extends Component {

    skip() {
        Actions.reset('home_root', { login_status: false });
    }

    componentDidMount() {

        //initial configuration
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId: '958730634482-7bjl3p1dovrij081bpbdbpo9osdhcbad.apps.googleusercontent.com',
        });
    }


    gSignIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* <Text style={styles.skTxt} onPress={() => {this.skip() }}>
                    Skip
                    </Text> */}
                <View style={styles.container}>
                    <Text style={styles.mainTxt}>Scanner</Text>
                    <View style={styles.powerContainer}>
                        <Text style={styles.pTxt}>Personalised Experience</Text>
                        <Text style={styles.cTxt}>by choosing your Gmail Id</Text>
                        <GoogleSigninButton
                            style={styles.gSignBtn}
                            size={GoogleSigninButton.Size.Standard}
                            color={GoogleSigninButton.Color.Dark}
                            disabled={this.props.login_status == IN_PROGRESS
                                ? true : false
                            }
                            onPress={() => { this.props.GSignIn(GoogleSignin, statusCodes) }}
                        // onPress={this.gSignIn}
                        />
                    </View>
                </View>
                {/* <View style={{ flex: 0.1, alignItems: 'flex-start' }}>
                    <Button onPress={() => { this.skip() }}>Skip</Button>
                </View> */}
                <TouchableOpacity style={{ flex: 0.1, alignItems: 'flex-end', margin:10 }}
                    onPress={() => { this.skip() }}>
                    <View style={{backgroundColor:'green', borderRadius: 15}}>
                        <Text style={styles.skTxt} >
                            SKIP
            </Text>
                    </View>
                </TouchableOpacity>
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
        fontSize: 20,
    },
    cTxt: {
        fontSize: 14,
    },
    skTxt: {
        color: '#ffffff',
        fontSize: 20,
        alignSelf: "flex-end",
        margin: 20,
    },
    gSignBtn: {
        width: screenWidth / 1.8,
        height: 50,
        margin: 10
    }

})

const mapStateToProps = (state) => {
    return {
        login_status: state.login.login_status
    }
};
export default connect(mapStateToProps, {
    GSignIn
})(Login);