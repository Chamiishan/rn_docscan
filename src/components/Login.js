import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { CardSection, Card, Button } from './common';
import { Actions } from 'react-native-router-flux';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Login extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.skTxt}>Skip</Text>
                <View style={styles.container}>
                    <Text style={styles.mainTxt}>Scanner</Text>
                    <View style={styles.powerContainer}>
                        <Text style={styles.pTxt}>Personalised Experience</Text>
                        <Text style={styles.cTxt}>by choosing your Gmail Id</Text>
                        <GoogleSigninButton
                            style={styles.gSignBtn}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                        />
                    </View>
                </View>
                <View style={{ flex:0.1, alignItems: 'flex-end' }}>
                    <Button onPress={()=> Actions.reset('home')}>Continue</Button>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex:1,
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
        color: '#007a1f',
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

export default Login;