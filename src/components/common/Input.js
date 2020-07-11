import React from 'react';
import { Text, TextInput, View } from 'react-native';

const Input = ({ label, value, onChangeText, autoCorrect, placeHolder, secureTextEntry }) => {

    const { inputStyle, textStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>{label}</Text>
            <TextInput
                secureTextEntry = {secureTextEntry}
                placeholder={placeHolder}
                autoCorrect={autoCorrect} style={inputStyle} value={value} onChangeText={onChangeText} />
        </View>
    );

}

const styles = {
    inputStyle: {
        color: '#000',
        fontSize: 18,
        height: 40,
        width: null,
        flex: 2,
        paddingRight: 5,
        paddingLeft: 5
    },
    textStyle: {
        paddingLeft: 10,
        color: '#000',
        fontSize: 18,
        flex: 1
    },
    containerStyle: {
        height: 50,
        flex: 1,
        flexDirection: 'row',
        borderWidth: 1,
        alignItems: 'center'
    }
};

export { Input }
