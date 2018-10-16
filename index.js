/** @format */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { Navigation } from "react-native-navigation";
import BackgroundJob from "react-native-background-job";

import devicesNearby from './src/screens/nearbyDevices';

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

BackgroundJob.register({
    jobKey: "myJob",
    job: ()=> console.log("This is a background job that has been run automatically.")
    
})

BackgroundJob.schedule({
    jobKey: "myJob",
    allowWhileIdle: true,
    allowExecutionInForeground: true
})