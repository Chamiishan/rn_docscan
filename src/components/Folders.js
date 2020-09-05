import React from 'react';
import {
    View, Text, Image, TouchableHighlight, TouchableOpacity, StyleSheet,
    SafeAreaView, ScrollView, Dimensions, NativeModules, Modal, TextInput
} from 'react-native';
import { Header } from './common';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from 'react-navigation-drawer';
import { withNavigation } from 'react-navigation';
// import { Actions } from 'react-native-router-flux';
// import { IN_PROGRESS } from '../utils/Constants';

const foldersAvl = true;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const getValue = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            // value previously stored
        }
    } catch (e) {
        // error reading value
    }
}

class Folders extends React.Component {

    constructor(props) {
        super(props)
        console.log("in constructor");
        getValue('user');
        this.state = {
            modalVisible: false,
        };
    }



    getEmptyView() {
        if (foldersAvl) {
            return (
                <View style={styles.folderContainer}>
                    <SafeAreaView style={styles.sccontainer}>
                        <ScrollView style={styles.scrollView}>
                        {this.getFolderView()}
                        {this.getFolderView()}
                        </ScrollView>
                    </SafeAreaView>
                    {this.getScanBtn()}
                </View>
            );

        } else {
            return (
                <View style={styles.folderContainer}>
                    <View style={styles.dummyV}></View>
                    <View style={styles.folders}>
                        <Image style={styles.fImg} source={require('../icons/paper.png')} />
                        <Text style={styles.warnTxt1}>You do not have yet any</Text>
                        <Text style={styles.warnTxt2}>scanned documents!!</Text>
                    </View>
                    {this.getScanBtn()}
                </View>
            );
        }
    }

    getFolderView() {
        return (
            <View style={styles.folder}>
                 <Image source={require('../icons/folder_big.png')}/>
                <View style={{flexDirection:'column'}}>
                <Text>Personal Docs</Text>
                <Text>15 items</Text>
                </View>
                {/* <Image  source={require('../icons/more.png')}/> */}
            </View>
        );
    }

    getScanBtn() {
        return (
            <TouchableOpacity style={styles.scanBtn} onPress={() => {
                console.log("scan pressed");
                // Actions.push('scanner')
                NativeModules.ActivityStarter.openDocumentScan();
            }
            }>
                <Image style={styles.sImg} source={require('../icons/scan.png')} />
                <Text style={styles.sTxt}>Scan</Text>
            </TouchableOpacity>
        );
    }

    render() {

        return (
            <View style={styles.container}>
                <Header
                    title={""}
                    titleStyle={{ color: 'white', fontSize: 30 }}
                    Button1={
                        <TouchableHighlight onPress={() => {
                            this.props.navigation.dispatch(DrawerActions.toggleDrawer())
                        }}>
                            <Image
                                source={require('../icons/menu.png')}
                            />
                        </TouchableHighlight>
                    }
                    Button2={
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                modalVisible: true
                            });
                        }}>
                            <Image style={{ marginRight: 10 }} source={require('../icons/folder.png')} />
                        </TouchableOpacity>
                    }
                    Button3={<Image style={{ marginLeft: 10 }} source={require('../icons/search.png')} />}
                />
                {this.getEmptyView()}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                    }}
                >
                    <View style={styles.modalVContainer}>
                        <View style={styles.modalVParent}>
                            <Text style={styles.modalVTitle}>Add Folder</Text>
                            <TextInput style={styles.modlaVInput} />

                            <View style={styles.modalBtnParent}>
                                <TouchableOpacity style={{ margin: 5, flex: 0.5 }}
                                    onPress={() => {
                                        this.setState({
                                            modalVisible: false
                                        });
                                    }}>
                                    <View style={{
                                        backgroundColor: 'white', borderRadius: 15, alignItems: 'center',
                                        justifyContent: 'center', borderWidth: 1, borderColor: 'green'
                                    }}>
                                        <Text style={styles.okBtnTxt} >
                                            Ok
            </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ margin: 5, flex: 0.5 }}
                                    onPress={() => {
                                        this.setState({
                                            modalVisible: false
                                        });
                                    }}>
                                    <View style={{
                                        backgroundColor: 'green', borderRadius: 15, alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={styles.cancelBtnTxt} >
                                            Cancel
            </Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                </Modal>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    folderContainer: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: "center",
    },
    dummyV: {
    },
    folders: {
        alignItems: "center",
        justifyContent: "center",
    },
    folder: {
        alignSelf: "center",
        backgroundColor: 'white',
        alignItems:'center',
        borderRadius: 5,
        elevation: 5,
        height: screenHeight / 10,
        width: screenWidth - 15,
        margin: 10,
        flexDirection: 'row',
        borderColor: 'black'
    },
    file: {
        flex: 0.3,
        alignSelf: "flex-start",
        backgroundColor: 'red',
        borderRadius: 5,
        height: screenHeight / 5,
        width: screenWidth / 3 - 15,
        zIndex: 1,
        margin: 10,
        borderColor: 'black'
    },
    fImg: {
        height: 100,
        width: 100
    },
    warnTxt1: {
        color: '#707070',
        fontSize: 15
    },
    warnTxt2: {
        color: '#011c0f',
        fontSize: 20
    },
    scanBtn: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: 'green',
        bottom: 40,
        borderRadius: 10,
        // height: 40,
        // width: 40
    },
    sTxt: {
        color: 'white',
        fontSize: 20,
        margin: 10
    },
    sImg: {
        margin: 10
    },
    sccontainer: {
        flex: 1,
        marginTop: 10,
    },
    scrollView: {
    },
    sctext: {
        fontSize: 42,
    },
    modalVContainer: {
        backgroundColor: '#80FFFF11',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalVParent: {
        backgroundColor: 'white',
        elevation: 5,
        borderRadius: 15,
        padding: 15
    },
    modalVTitle: {
        fontSize: 20,
        color: 'grey'
    },
    modlaVInput: {
        borderBottomColor: '#dbd9d9',
        borderBottomWidth: 1,
        height: 60
    },
    modalVBtnTxt: {
        fontSize: 15,
        color: 'green'
    },
    modalBtnParent: {
        width: screenWidth / 1.5,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    okBtnTxt: {
        color: 'green',
        fontSize: 15,
        margin: 10,
    },
    cancelBtnTxt: {
        color: '#ffffff',
        fontSize: 15,
        margin: 10,
    },
})

export default withNavigation(Folders)
