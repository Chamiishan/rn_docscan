import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const Input = ({ label, value, onChangeText, autoCorrect, placeHolder, secureTextEntry }) => {

    const { inputStyle, textStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            {/* <Text style={textStyle}>{label}</Text> */}
            <TextInput
                secureTextEntry = {secureTextEntry}
                placeholder={placeHolder}
                autoCorrect={autoCorrect} style={inputStyle} value={value} onChangeText={onChangeText} />
        </View>
    );

}

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        fontSize: 18,
        height: 50,
        width: null,
        flex: 1,
    },
    textStyle: {
        paddingLeft: 10,
        color: '#000',
        fontSize: 18,
        // flex: 1
    },
    containerStyle: {
        height: 50,
        flex: 1,
        elevation: 1,
        flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'grey',
        alignItems: 'center'
    }
});


export { Input }
