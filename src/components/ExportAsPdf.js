import React, { Component } from 'react';
import { View, StyleSheet, TouchableHighlight, Image, TouchableOpacity, Text } from 'react-native';
import { Header, CardSection, Input } from './common';
import { Actions } from 'react-native-router-flux';
import BottomSheet from 'reanimated-bottom-sheet'
// import RBSheet from 'react-native-raw-bottom-sheet';

let bottomSheetRef = React.createRef();
class ExportAsPdf extends Component {

    renderHeader() {
        return (
            <View><Text>ih text</Text></View>
        );
    }

    renderContent() {
        return (
            <View style={{ flexDirection: 'column' }}>
                <TouchableOpacity style={{ alignSelf: 'flex-end' }}
                    onPress={() => { bottomSheetRef.current.snapTo(0) }}>
                    <Image
                        source={require('../icons/close.png')}
                    />
                </TouchableOpacity>
                <View style={{ zIndex: 10, padding: 15, backgroundColor: "white", flexDirection: 'column' }}>
                    <Text style={styles.bsText}>File Name</Text>

                    <CardSection>
                        <Input />
                    </CardSection>
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
                    snapPoints={['0%', '20%']}
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
    }
});

export default ExportAsPdf;