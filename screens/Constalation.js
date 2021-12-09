import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, StyleSheet, Alert, Platform, StatusBar, SafeAreaView, Linking, ScrollView, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Constel from './Cons';

const constellations = require('./tempDataBase.json')
var num = 0

export default class ConstalationScreen extends React.Component {

    keyExtractor = (item, index) => index.toString();

    renderItem = (item) => {
        return <Constel numb = {item}/>
    }

    render() {
        {num = num + 1}
        return(
            <View style={styles.container}>
                <FlatList
                    keyExtractor= {this.keyExtractor}
                    renderItem= {this.renderItem }
                    data= {constellations}
                    horizontal= {true}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    bgImage: {
        resizeMode: 'cover',
        flex: 1,
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height,
    }
})