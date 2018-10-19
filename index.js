import { Navigation } from "react-native-navigation";
import BackgroundJob from "react-native-background-job";
import Icon from "react-native-vector-icons/Ionicons";

import devicesNearby from "./src/screens/NearbyDevices/nearbyDevices-list";
import devicesNearbyMap from "./src/screens/NearbyDevices/nearbyDevices-map";
import aboutUs from "./src/screens/AboutUs/AboutUs";
import Settings from "./src/screens/Settings/settings";
import deviceDetails from "./src/screens/NearbyDevices/DeviceItem/DeviceDetails/deviceDetails";

Navigation.registerComponent("geoLocator.devicesNearby", () => devicesNearby);
Navigation.registerComponent(
  "geoLocator.nearbyDevices-map",
  () => devicesNearbyMap
);
Navigation.registerComponent("geoLocator.aboutUs", () => aboutUs);
Navigation.registerComponent("geoLocator.Settings", () => Settings);
Navigation.registerComponent("geoLocator.deviceDetails", () => deviceDetails);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    bottomTab: {
      iconColor: "#1B4C77",
      selectedIconColor: "#0f0",
      textColor: "#1B4C77",
      selectedTextColor: "#0f0",
      fontFamily: "HelveticaNeue-Italic",
      fontSize: 13
    }
  });

  Navigation.events().registerNavigationButtonPressedListener(event => {
    if (event.buttonId === "settingsButton") {
      Navigation.push(event.componentId, {
        component: {
          name: "geoLocator.Settings",
          options: {
            topBar: {
              title: {
                text: "Settings"
              }
            },
            bottomTabs: {
              visible: false
            }
          }
        }
      });
    }
  });
  Promise.all([
    Icon.getImageSource("md-map", 30),
    Icon.getImageSource("ios-body", 30),
    Icon.getImageSource("ios-settings", 30)
  ]).then(source => {
    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: "bottomTabsId",
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      id: "deviceList",
                      name: "geoLocator.devicesNearby",
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: "Devices Nearby",
                          icon: source[0]
                        },
                        topBar: {
                          rightButtons: [
                            {
                              id: "settingsButton",
                              icon: source[2]
                            }
                          ],
                          title: {
                            text: "Devices Nearby"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      id: "aboutUs",
                      name: "geoLocator.aboutUs",
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: "About Us",
                          icon: source[1]
                        },
                        topBar: {
                          rightButtons: [
                            {
                              id: "settingsButton",
                              icon: source[2]
                            }
                          ],
                          title: {
                            text: "About Us"
                          }
                        }
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    });
  });
});

BackgroundJob.register({
  jobKey: "myJob",
  job: () => {
    console.log("This is a background job that has been run automatically.");
    var coordinates = null;
    navigator.geolocation.getCurrentPosition(
      pos => {
        coordinates = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        fetch("https://place-sharing.firebaseio.com/devices-locations.json", {
          method: "POST",
          body: JSON.stringify(coordinates)
        })
          .then(res => res.json())
          .then(data => console.log("Uploaded location successfully.", data))
          .catch(err => console.log("Something went wrong", err));
      },
      err => {
        console.log("Unable to obtain the current location. Error: ", err);
      }
    );
  }
});

BackgroundJob.schedule({
  jobKey: "myJob",
  allowWhileIdle: true,
  allowExecutionInForeground: true
});
