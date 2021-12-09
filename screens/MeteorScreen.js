import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, View , ImageBackground , StatusBar , Platform, SafeAreaView, FlatList, Dimensions, Image} from 'react-native';

export default class MeteorScreen extends React.Component {
    constructor(props) {
        super();

        this.state = {
            meteors: {}
        }
    }

    getMeteors = () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=Cc0mAlikfmcGs2OsB7ehmhe1fR9lp6x4opCtp7hm")
        .then(response => {
            this.setState({
                meteors: response.data.near_earth_objects
            })
        })

        .catch((errors) => {
            alert(errors.message)
        }) 
    }

    componentDidMount() {
        this.getMeteors();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({item}) => {
        var meteor = item
        var bgImage, speed, size

        if(meteor.threat_score <= 30) {
            bgImage = require("../meteorbgs-main/meteor_bg1.png")
            speed = require("../meteorbgs-main/meteor_speed3.gif")
            size= 100
        } else if(meteor.threat_score <= 75) {
            bgImage = require("../meteorbgs-main/meteor_bg2.png")
            speed = require("../meteorbgs-main/meteor_speed3.gif")
            size= 150
        } else {
            bgImage = require("../meteorbgs-main/meteor_bg3.png")
            speed = require("../meteorbgs-main/meteor_speed3.gif")
            size= 200
        }

        return(
            <View>
                <ImageBackground style={styles.bgImage} source={bgImage}>
                    <View style={styles.gifView}>
                        <Image source={speed} style={{width: size, height: size, alignSelf: 'center'}}/>
                        <View>
                            <Text style={[styles.cardTitle, {marginTop: 400, marginLeft: 50}]}>{item.name}</Text>
                            <Text style={[styles.cardText, {marginTop: 20, marginLeft: 50}]}>
                                Closet To Earth: {item.close_approach_data[0].close_approach_date_full}
                            </Text>
                            <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>
                                Minimum Diameter(KM): {item.estimated_diameter.kilometers.estimated_diameter_min}
                            </Text>
                            <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>
                                Maximum Diameter(KM): {item.estimated_diameter.kilometers.estimated_diameter_max}
                            </Text>
                            <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>
                                Velocity(KM/H): {item.close_approach_data[0].relative_velocity.kilometers_per_hour}
                            </Text>
                            <Text style={[styles.cardText, {marginTop: 5, marginLeft: 50}]}>
                                Missing Earth By(KM): {item.close_approach_data[0].miss_distance.kilometers}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }

    render() {
        if(Object.keys(this.state.meteors).length === 0) {
            return(
                <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                    <Text>Loading...</Text>
                </View>
            )
        } else {

            var meteor_arr = Object.keys(this.state.meteors).map((meteor_data) => {
                return(this.state.meteors[meteor_data])

            })

            var meteors = [].concat.apply([], meteor_arr)

            meteors.forEach(function(element) {
                var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max)/2
                var threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers)*1000000000
                element.threat_score = threatScore
            });

            meteors.sort(function(a, b) {
                return b.threat_score - a.threat_score
            })
            

        return(
            <View style={styles.container}>
                <SafeAreaView style={{marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}/>
                <FlatList
                    keyExtractor = {this.keyExtractor}
                    data = {meteors}
                    renderItem = {this.renderItem}
                    horizontal = {true}
                />
            </View>
        )
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

    cardTitle: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: 'white',
    },

    cardText: {
        color: 'white'
    },
    gifView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
  });