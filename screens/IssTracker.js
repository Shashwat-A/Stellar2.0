import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, View , SafeAreaView , ImageBackground , Image, Platform, StatusBar} from 'react-native';
import MapView , {Marker} from 'react-native-maps';

export default class IssTracker extends React.Component {
    constructor(props) {
        super(props);

        this.state= {
            location : {},
            hhh: null
        }
    }

    getIssLocation = () => {
        axios.get('https://api.wheretheiss.at/v1/satellites/25544')
        .then(response => {
            var location = response.data

            this.setState({
                location: location
            })

            console.log(this.state.location.latitude) 
        })

        .catch((error) => {
            alert(error.message)
        })

    }

    componentDidMount() {
        this.getIssLocation()
    }

    render() {
        if(Object.keys(this.state.location).length === 0) {
            return(
                <View>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
        return(
            <View style={styles.container}>
                <SafeAreaView style={styles.safeAreaView}/>

                <ImageBackground source={require("../assets/iss_bg.jpg")} style={styles.bgImage}>

                <View style={styles.headerView}>
                    <Text style={styles.header}>ISS Location</Text>
                </View>

                <View style={styles.mapView}>
                    <MapView style={styles.map}
                        region= {{
                            latitude: this.state.location.latitude,
                            longitude: this.state.location.longitude,
                            latitudeDelta: 100,
                            longitudeDelta: 100,
                        }}
                    >
                        <Marker coordinate = {{latitude: this.state.location.latitude, longitude: this.state.location.longitude}}>
                            <Image source={require("../assets/iss_icon.png")} style={{width: 50, height: 50}}/>
                        </Marker>
                    </MapView>
                </View>

                <View style={styles.infoView}>
                    <Text style={styles.infoTxt}>Latitude: {this.state.location.latitude}</Text>
                    <Text style={styles.infoTxt}>Longitude: {this.state.location.longitude}</Text>
                    <Text style={styles.infoTxt}>Altitude: {this.state.location.altitude}</Text>
                    <Text style={styles.infoTxt}>Velocity: {this.state.location.velocity}</Text>
                </View>

                </ImageBackground>
            </View>
        )}
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    safeAreaView: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    bgImage: {
        flex: 1,
        height: '100%',
        width: '100%'        
    },

    headerView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white'
    },

    mapView: {
        flex: 0.7,
    },

    map: {
        width: '100%',
        height: '100%'
    },

    infoView: {
        flex: 0.2,
        backgroundColor: 'white',
        marginTop: -7,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 30
    },
    infoTxt: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black'
    }
  });