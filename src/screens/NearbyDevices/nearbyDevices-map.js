import React, { Component } from "react";
import MapView from "react-native-maps";

class DevicesMap extends Component {
  state = {};
  render() {
    const markers = this.props.devices.map(device => {
      return (
        <MapView.Marker
          key={device.key}
          coordinate={device.coordinates}
          title={device.name}
        />
      );
    });

    return (
      <MapView
        initialRegion={this.props.initialRegion}
        style={{ height: "100%", width: "100%" }}
      >
        {markers}
      </MapView>
    );
  }
}

export default DevicesMap;
