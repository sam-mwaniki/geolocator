import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";

const deviceItem = props => {
  return (
    <TouchableOpacity onPress={() => props.openDeviceDetail(props.device)}>
      <View style={styles.container}>
        <Image
          style={{ width: 30, height: 30, marginRight: 15 }}
          source={props.device.deviceImage}
        />
        <Text>{props.device.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    margin: 10,
    marginBottom: 0,
    paddingBottom: 0,
    backgroundColor: "#eee",
    alignItems: "center"
  }
});

export default deviceItem;
