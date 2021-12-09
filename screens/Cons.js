import React, { Component } from 'react';
import { Text, View, Image, ImageBackground, TouchableOpacity, StyleSheet, Alert, Platform, StatusBar, SafeAreaView, Linking, ScrollView, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const constellations = require('./tempDataBase.json')

export default class Constel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <ImageBackground style={styles.bgImage} source={{uri: this.props.numb.item.bgImages}}>
                    <Text style={[styles.cardTitle, {marginTop: 670, marginLeft: 50}]}>{this.props.numb.item.name}</Text>
                    <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>{this.props.numb.item.description}</Text>
                    <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>Best Veiwed in: {this.props.numb.item.bestSeen}</Text>
                </ImageBackground>
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
        flex: 1,
        width: Dimensions.get('window').width + 280,
        height: Dimensions.get('window').height,
        top: 30
    },

    cardText: {
        color: 'white',
        fontSize: 15
    },

    cardTitle: {
        fontSize: 30,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'white',
    }
})