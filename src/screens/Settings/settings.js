import React, { Component } from 'react';
import { View, Text } from "react-native";

class Settings extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
                <Text>This is the settings page.</Text>
            </View>
         );
    }
}
 
export default Settings;