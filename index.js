/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { Navigation } from "react-native-navigation";

import devicesNearby from './src/screens/nearbyDevices'

Navigation.registerComponent('geoLocator.devicesNearby',()=> devicesNearby)

Navigation.events().registerAppLaunchedListener(()=> {
    Navigation.setRoot({
        root: {
            component: {
                name: 'geoLocator.devicesNearby'
            }
        }
    })
})