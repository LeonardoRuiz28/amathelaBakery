import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { IInfo } from "../../models/info";

interface Props {
  info: IInfo;
}

const CustomHeader: React.FC<Props> = ({ info }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: info.image }}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      <Text style={{ fontSize: 20, marginRight: 10 }}>{info.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default CustomHeader;
