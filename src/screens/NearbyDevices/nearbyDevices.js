import React, { Component } from 'react';
import { View, Alert, ImageBackground, ActivityIndicator, FlatList } from "react-native";
import { Navigation } from "react-native-navigation";

import DeviceItem from './DeviceItem/deviceItem';

class devicesNearby extends Component {

    // static options(passProps){
    //     return {
    //         topBar: {
    //             title: {
    //                 text: 'Near devices'
    //             },
    //             drawBehind: false,
    //             visible: true,
    //             animate: true
    //         }
    //     }
    // }

    constructor(props){
        super(props)
        Navigation.events().bindComponent(this)
    }
    state = { 
        devices: null,
        loading: false
     }

    componentDidMount() {
        // Alert.alert('In development', 'Please inform us of any errors. This app is still being developed.',)
        let devices = [];
        this.setState({loading: true})
        fetch('https://place-sharing.firebaseio.com/nearby-devices.json')
            .then(res=> res.json())
            .then(data => {
                console.log(data)
                for (let key in data){
                    devices.push({
                        key,
                        ...data[key]                        
                    })                    
                }
                this.setState({loading: false,devices});
            })
            .catch(err=> console.log('Something went wrong'))
        }

    componentDidAppear(){
        console.log("ComponentDidAppear lifecycle-hook workeddd");
        // navigator.geolocation.getCurrentPosition(pos=> {
        //     coordinates = {
        //        latitude: pos.coords.latitude,
        //        longitude: pos.coords.longitude
        //     }
        // fetch('https://place-sharing.firebaseio.com/nearby-devices.json',{
        //      method: 'POST',
        //      body: JSON.stringify({
        //         deviceImage: {uri:'https://reactjs.org/logo-og.png'},
        //         name: 'John (India)',
        //         coordinates
        //     })
        //     })
        //     .then(res=> res.json())
        //     .then(data => console.log(data))
        //     .catch(err=> console.log('Something went wrong'))
        // }, err=> {
        //     console.log('Unable to obtain the current location. Error: ', err);            
        // })
        
    }

    componentWillUnmount() {
        console.log('umounting..');
        
    }

    render() { 
        let devices = null;
        if(this.state.loading){
            devices = <ActivityIndicator size="large" style={{flex: 1,justifyContent:'center',alignItems: 'center'}}/>
        } else {
            if(this.state.devices !== null){
                if(this.state.devices.length===0){
                    devices= <ImageBackground style={{width: '100%', height: '100%'}} source={{uri: 'https://pm1.narvii.com/6790/d522136cbefbba61b0c2c21fb27f49061764182ev2_hq.jpg'}}/>
                } else {
                    devices = <FlatList 
                                data={this.state.devices} 
                                renderItem={(info)=> <DeviceItem Image={info.item.deviceImage} name={info.item.name}/> }/>
                }
            }            
        }
        
        return ( 
            <View style={{flex: 1}}>
                {devices}                              
            </View>
         );
    }
}
 
export default devicesNearby;