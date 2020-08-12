import React, { Component } from 'react';
import {
    View, TouchableHighlight, TouchableNativeFeedback, Text, Image,
    StyleSheet, AsyncStorage, Switch, ScrollView
} from 'react-native';
import { Header } from './common';
import { Actions } from 'react-native-router-flux';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.getLoginStatus();
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
            console.log("user ", JSON.parse(user).email);
            this.setState({
                user: JSON.parse(user)
            });
        } catch (e) {
            console.log("error")
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Header
                    title={"Settings"}
                    titleStyle={{ color: 'white', fontSize: 20 }}
                    Button1={
                        <TouchableHighlight onPress={() => {
                            Actions.pop();
                        }}>
                            <Image
                                source={require('../icons/back.png')}
                            />
                        </TouchableHighlight>
                    }


                />
                <ScrollView>
                    <View style={styles.settingsContainer}>

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
                            }} />

                        {this.getToggleView('Storage Setting', 'Auto Upload',
                            'upload files to the drive automatically', false)}

                        {this.getToggleView('', 'Save To',
                            'storage/local memory/scanner', false)}

                        {this.getToggleView('Security', 'Turn On Pin',
                            'set pin to protect documents', true)}

                        {this.getToggleView('Notifications', 'Push Notifications',
                            'turn off push notifications', true)}

                            <View style={{margin:10}}></View>

                        {this.getSimpleTxtView('Terms & Conditions')}

                        {this.getSimpleTxtView('Privacy Policy')}

                        {this.getSimpleTxtView('Feedback')}

                        <View style={styles.appDetailStyle}>
                            <Text style={{ fontStyle: 'italic', }}>Version: 1.01 beta</Text>
                            <Text style={{ fontSize: 16, color: 'black', margin: 5 }}>Made In India</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    getToggleView(heading, title, desc, toggle) {
        return (
            <View style={styles.toggleViewContainer}>
                <Text style={styles.tHeadingTxt}>
                    {heading}
                </Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <Text style={styles.tTitleTxt}>{title}</Text>
                    <Switch value={toggle} />
                </View>
                <Text style={styles.tDescTxt} >{desc}</Text>
            </View>
        );
    }

    getSimpleTxtView(text) {
        return (
            <View style={styles.simpleTextView}>
                <Text style={styles.simpleText}>
                    {text}
                </Text>
            </View>
        );
    }


}

const ripple = TouchableNativeFeedback.Ripple('#adacac', false);

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: "flex-start",
        backgroundColor: '#f5f5f5',
        paddingTop: 20,
    }, signinContainer: {
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
    simpleTextView: {
        padding: 10
    },
    simpleText: {
        fontSize: 18,
        color: '#19211a'
    },
    toggleViewContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 10
    },
    tHeadingTxt: {
        fontSize: 14,
        color: '#007818',
    },
    tTitleTxt: {
        fontSize: 18,
        color: '#19211a'
    },
    tDescTxt: {
        fontSize: 10,
        color: 'grey'
    },
    appDetailStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        alignSelf: "center",
        padding: 10,
        margin: 10,
    },
})

export default Settings;