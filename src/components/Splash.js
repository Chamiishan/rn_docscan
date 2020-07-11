import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class Splash extends Component {

    componentDidMount(){
        console.log("componenetDidMount");
        setTimeout(() => {
            // Actions.pop();
            Actions.reset('login')
        }, 500);
        // clearInterval(timer);
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