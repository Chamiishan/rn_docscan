import React from 'react';
import {
    View, Text, Image, TouchableHighlight, TouchableOpacity, StyleSheet,
    SafeAreaView, ScrollView, Dimensions, NativeModules
} from 'react-native';
import { Header } from './common/Header';
import AsyncStorage from '@react-native-community/async-storage';
import { DrawerActions } from 'react-navigation-drawer';
import { withNavigation } from 'react-navigation';
// import { Actions } from 'react-native-router-flux';
// import { IN_PROGRESS } from '../utils/Constants';

const foldersAvl = false;

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const getValue = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

class Folders extends React.Component {

    constructor(props){
        super(props)
        console.log("in constructor");
        getValue('user');
    }

    

    getEmptyView() {
        if (foldersAvl) {
            return (
                <View style={styles.folderContainer}>
                    <SafeAreaView style={styles.sccontainer}>
                        <ScrollView style={styles.scrollView}>
                            <View style={styles.folder}>
                            </View>
                            <View style={styles.folder}>
                            </View>
                            <View style={styles.folder}>
                            </View>
                            <View style={styles.folder}>
                            </View>
                            <View style={styles.folder}>
                            </View>
                            <View style={styles.folder}>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                   
                    {/* <FlatList
                        data={this.state.dataSource}
                        renderItem={({ item }) => (
                            <View style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                                <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                            </View>
                        )}
                        //Setting the number of column
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                    /> */}
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
                    Button2={<Image style={{ marginRight: 10 }} source={require('../icons/folder.png')} />}
                    Button3={<Image style={{ marginLeft: 10 }} source={require('../icons/search.png')} />}
                />
                {this.getEmptyView()}


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
    dummyV:{
    },
    folders: {
        alignItems: "center",
        justifyContent: "center",
    },
    folder: {
        alignSelf: "center",
        backgroundColor: 'red',
        borderRadius: 5,
        height: screenHeight / 10,
        width: screenWidth - 15,
        margin: 10,
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
})

export default withNavigation(Folders)
