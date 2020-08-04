import React, { useRef, useState, useEffect } from "react"
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, TouchableHighlight, Image, Platform } from "react-native"
import Permissions from 'react-native-permissions';
import PDFScanner from "@woonivers/react-native-document-scanner";
import { Header } from './common/Header';
import { Actions } from "react-native-router-flux";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default function Scanner() {
  const pdfScannerElement = useRef(null)
  const [data, setData] = useState({})
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    async function requestCamera() {
      const result = await Permissions.request(Platform.OS === "android" ? "android.permission.CAMERA" : "ios.permission.CAMERA")
      if (result === "granted") setAllowed(true)
    }
    requestCamera()
  }, [])

  function handleOnPressRetry() {
    setData({})
  }
  function handleOnPress() {
    pdfScannerElement.current.capture()
  }
  if (!allowed) {
    console.log("You must accept camera permission")
    return (<View style={styles.permissions}>
      <Text>You must accept camera permission</Text>
    </View>)
  }
  if (data.croppedImage) {
    console.log("data", data)
    return (
      <React.Fragment>
        <Image source={{ uri: data.croppedImage }} style={styles.preview} />
        <TouchableOpacity onPress={handleOnPressRetry} style={styles.button}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <Header
        title={""}
        titleStyle={{ color: 'white', fontSize: 30 }}
        Button1={
          <TouchableHighlight onPress={() => {
            console.log("back pressed");
            Actions.pop();
          }}>
            <Image
              source={require('../icons/back.png')}
            />
          </TouchableHighlight>
        }

      />
      <PDFScanner
        ref={pdfScannerElement}
        style={styles.scanner}
        onPictureTaken={setData}
        overlayColor="rgba(255,130,0, 0.7)"
        enableTorch={false}
        quality={0.5}
        detectionCountBeforeCapture={5}
        detectionRefreshRateInMS={50}
      />
      <View style={styles.footer}>
        <TouchableOpacity>
          <Image source={require('../icons/flash_auto.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cImg} onPress={handleOnPress}>
          <Image source={require('../icons/capture.png')} />
        </TouchableOpacity>
        <View></View>
      </View>
      {/* <TouchableOpacity onPress={handleOnPress} style={styles.button}>
        <Text style={styles.buttonText}>Take picture</Text>
      </TouchableOpacity> */}
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined
  },
  button: {
    alignSelf: "center",
    position: "absolute",
    bottom: 32,
  },
  buttonText: {
    backgroundColor: "rgba(245, 252, 255, 0.7)",
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  permissions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: "row",
    backgroundColor: '#969696',
    width: screenWidth,
    alignItems: "center",
    justifyContent: "space-between"

  },
  cImg: {
    alignSelf: "center"
  }
})