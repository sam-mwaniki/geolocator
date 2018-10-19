import React, { Component } from "react";
import MapView from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";

class DeviceDetail extends Component {
  labelDevice = () => {
    this.setMarker.showCallout();
  };

  render() {
    return (
      <View>
        <View style={{ padding: 10, height: 150 }}>
          <Text style={{ marginTop: 10, fontWeight: "bold", padding: 5 }}>
            DEVICE TYPE: iphone X
          </Text>
          <Text style={{ fontWeight: "bold", padding: 5 }}>
            DEVICE ID: {this.props.device.key}
          </Text>
          <Text style={{ fontWeight: "bold", padding: 5 }}>
            TRANSMISSION FREQUENCY: NORMAL
          </Text>
        </View>
        <MapView
          initialRegion={{
            latitude: this.props.device.coordinates.latitude,
            longitude: this.props.device.coordinates.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
          region={{
            latitude: this.props.device.coordinates.latitude,
            longitude: this.props.device.coordinates.longitude,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0021
          }}
          style={{ width: "100%", height: 300 }}
          onMapReady={this.labelDevice}
        >
          <MapView.Marker
            coordinate={{
              latitude: this.props.device.coordinates.latitude,
              longitude: this.props.device.coordinates.longitude
            }}
            title={this.props.device.name}
            ref={ref => (this.setMarker = ref)}
          />
        </MapView>
      </View>
    );
  }
}

export default DeviceDetail;
