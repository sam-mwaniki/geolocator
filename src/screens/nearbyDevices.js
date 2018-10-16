import React, { Component } from 'react';
import { View, Text } from "react-native";
import { Navigation } from "react-native-navigation";

class devicesNearby extends Component {
    constructor(props){
        super(props)
        Navigation.events().bindComponent(this)
    }
    state = {  }

    componentDidMount() {
        console.log(this.props)
        
    }

    componentDidAppear(){
        console.log("ComponentDidAppear lifecycle-hook worked");
        
    }

    render() { 
        return ( 
            <View style={{flex: 1,justifyContent: "center",alignItems: "center"}}>
                <Text>This is your landing screen</Text>
            </View>
         );
    }
}
 
export default devicesNearby;