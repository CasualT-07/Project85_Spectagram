import React, {Component} from 'react';
import { View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './PostCard';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaView} from 'react-native-safe-area-context'

SplashScreen.preventAutoHideAsync();

let postData = require("./temp_posts.json")

let customFonts = {
    "salsa" : require('../assets/font/Salsa-Regular.ttf')
};

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded: false
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true})
    }

    componentDidMount() {
        this._loadFontsAsync();
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item: post}) => {
        return <PostCard post={post} navigation={this.props.navigation}/>
    }

    render() {
        if(this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            return(

            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea}/>
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image source={require('../assets/logo.png')} style={styles.iconImage} />
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={styles.appTitleText}>Spectagram</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={postData}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>

            )
        }        
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight -45 : RFValue(35)
    },

    appTitle: {
        flex: 0.07,
        flexDirection: 'row'
    },

    appIcon: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    appTitleTextContainer: {
        flex: .8,
        justifyContent: 'center',
    },

    appTitleText: {
        color: 'white',
        fontSize: RFValue(28),
        fontFamily: 'salsa'
    },

    cardContainer: {
        flex: .85
    }
})