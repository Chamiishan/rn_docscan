import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <View >
                {props.Button1}
            </View>
            <View >
                <Text style={props.titleStyle}>{props.title}</Text>
            </View>
            <View style={{ alignItems: "flex-end", flexDirection: 'row' }}>
                {props.Button2}
                {props.Button3}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: 'green',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        padding: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
    },
});

export { Header };