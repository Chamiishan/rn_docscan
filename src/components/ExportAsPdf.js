import React, { Component } from 'react';
import {
    View, StyleSheet, TouchableHighlight, Image,
    TouchableOpacity, Text, TextInput, Dimensions,
    Modal
} from 'react-native';
import { Header, CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';
import BottomSheet from 'reanimated-bottom-sheet'
// import RBSheet from 'react-native-raw-bottom-sheet';

let bottomSheetRef = React.createRef();

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class ExportAsPdf extends Component {

    renderHeader() {
        return (
            <View><Text>ih text</Text></View>
        );
    }

    renderContent() {
        return (
            <View style={{
                flexDirection: 'column',
                margin: 10,
            }}>
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}
                    onPress={() => { bottomSheetRef.current.snapTo(0) }}>
                    <Image
                        source={require('../icons/close.png')}
                    />
                </TouchableOpacity>
                <View style={{
                    zIndex: 10, padding: 15,
                    borderWidth: 1, borderColor: 'grey', borderRadius: 15,
                    backgroundColor: "white", flexDirection: 'column'
                }}>
                    <Text style={styles.bsText}>File Name</Text>

                    <TextInput style={styles.fileNameIp} />
                    <TouchableOpacity style={{ margin: 15 }}
                        onPress={() => { }}>
                        <View style={{
                            backgroundColor: 'green', borderRadius: 15, alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ color: 'white', padding: 5 }} >
                                Save
            </Text>
                        </View>
                    </TouchableOpacity>
                    {/* <View style={styles.shareItems} ></View> */}
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <Header
                    title={"Export As PDF"}
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
                <View style={styles.helpTxtView}><Text style={styles.helpTxt}>
                    hold the images for rearranging the pages</Text></View>
                <View style={styles.fileViewContainer}></View>
                <View style={styles.bottomView}>
                    <TouchableOpacity style={{ margin: 5, flex: 0.5 }}
                        onPress={() => { bottomSheetRef.current.snapTo(1) }}>
                        <View style={{
                            backgroundColor: 'white', borderRadius: 15, alignItems: 'center',
                            justifyContent: 'center', borderWidth: 1, borderColor: 'green'
                        }}>
                            <Text style={styles.saveBtnTxt} >
                                Save
            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ margin: 5, flex: 0.5 }}
                        onPress={() => { bottomSheetRef.current.snapTo(1) }}>
                        <View style={{
                            backgroundColor: 'green', borderRadius: 15, alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={styles.shareBtnTxt} >
                                Save & Share
            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
                {/* <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                      }}
                    minClosingHeight={200}
                    customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center"
            }
          }}
                >
                    <View><Text>Hi Text</Text></View>
                </RBSheet>*/}
                <BottomSheet
                    ref={bottomSheetRef}
                    snapPoints={['0%', screenHeight / 3, screenHeight / 2]}
                    renderContent={this.renderContent}
                    enabledManualSnapping={true}
                // renderHeader={this.renderHeader}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    helpTxtView: {
        flex: 0.1,
        padding: 10,
    },
    helpTxt: {
        fontSize: 15,
        alignSelf: 'center',
        color: 'black'
    },
    fileViewContainer: {
        flex: 0.75
    },
    bottomView: {
        flex: 0.15,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    saveBtnTxt: {
        color: 'green',
        fontSize: 20,
        margin: 15,
    },
    shareBtnTxt: {
        color: '#ffffff',
        fontSize: 20,
        margin: 15,
    },
    bsText: {
        fontSize: 20,
        color: 'grey',
    },
    fileNameIp: {
        borderBottomColor: '#dbd9d9',
        borderBottomWidth: 1,
        // elevation: 1,
        // shadowColor: '#dbd9d9',
        height: 60
    },
    shareItems: {
        height: screenHeight / 4,
        borderColor: 'grey',
        borderWidth: 1,
    }
});

export default ExportAsPdf;