import React, { Component } from "react";
import {
  View,
  Alert,
  ImageBackground,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import DeviceItem from "./DeviceItem/deviceItem";

class devicesNearby extends Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  state = {
    devices: null,
    loading: false,
    initialRegion: {
      latitude: -1.2786686,
      longitude: 36.9648075,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  componentDidMount() {
    var devices = [];
    this.setState({ loading: true });
    fetch("https://place-sharing.firebaseio.com/nearby-devices.json")
      .then(res => res.json())
      .then(data => {
        for (let key in data) {
          devices.push({
            key,
            ...data[key]
          });
        }
        navigator.geolocation.getCurrentPosition(
          pos => {
            console.log(
              "ComponentDidAppear-Your location has been established"
            );
            coordinates = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude
            };
            this.setState(prevState => {
              return {
                loading: false,
                devices,
                initialRegion: {
                  ...this.state.initialRegion,
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude
                }
              };
            });
          },
          err => {
            console.log("Unable to obtain the current location. Error: ", err);
            this.setState(prevState => {
              return {
                loading: false,
                devices,
                initialRegion: {
                  ...this.state.initialRegion,
                  latitude: devices[0].coordinates.latitude,
                  longitude: devices[0].coordinates.longitude
                }
              };
            });
          }
        );
      })
      .catch(err => {
        console.log(err);
        Alert.alert(
          "Network Error",
          "There was a problem fetching data. Restart app or contact support."
        );
      });
  }

  componentDidAppear() {}

  onDeviceItemPress = device => {
    Navigation.push(this.props.componentId, {
      component: {
        // name: "geoLocator.Settings",
        name: "geoLocator.deviceDetails",
        passProps: {
          device
        },
        options: {
          topBar: {
            title: {
              text: device.name
            }
          },
          bottomTabs: {
            visible: false
          }
        }
      }
    });
  };

  renderMapHandler = () => {
    if (this.state.devices && this.state.devices.length > 0) {
      Navigation.push(this.props.componentId, {
        component: {
          name: "geoLocator.nearbyDevices-map",
          passProps: {
            devices: this.state.devices,
            initialRegion: this.state.initialRegion
          },
          options: {
            topBar: {
              title: {
                text: "Devices Nearby"
              }
            },
            bottomTabs: {
              visible: false
            }
          }
        }
      });
    } else {
      console.log("There are no devices nearby to display");
    }
  };

  render() {
    let devices = null;
    if (this.state.loading) {
      devices = (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      );
    } else {
      if (this.state.devices !== null) {
        if (this.state.devices.length === 0) {
          devices = (
            <ImageBackground
              style={{ width: "100%", height: "100%" }}
              source={{
                uri:
                  "https://pm1.narvii.com/6790/d522136cbefbba61b0c2c21fb27f49061764182ev2_hq.jpg"
              }}
            />
          );
        } else {
          devices = (
            <FlatList
              data={this.state.devices}
              renderItem={info => (
                <DeviceItem
                  device={info.item}
                  openDeviceDetail={this.onDeviceItemPress}
                />
              )}
            />
          );
        }
      }
    }

    return (
      <View style={styles.container}>
        {devices}
        <TouchableOpacity
          onPress={this.renderMapHandler}
          style={
            this.state.devices && this.state.devices.length > 0
              ? styles.btn
              : [styles.btn, { backgroundColor: "#bbb" }]
          }
        >
          <Icon name="ios-pin" color="white" size={30} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  btn: {
    position: "absolute",
    width: 70,
    height: 70,
    backgroundColor: "blue",
    borderRadius: 50,
    bottom: 30,
    right: 10,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default devicesNearby;
