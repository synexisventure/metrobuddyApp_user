import React from "react";
import { StyleSheet, View, Image } from "react-native";

const BusinessPhotos = () => {
  const photos = [
    require("../../assets/images/images2/city.png"),
    require("../../assets/images/images2/city.png"),
    require("../../assets/images/images2/city.png"),
  ];

  return (
    <View style={styles.container}>
      {photos.map((img, index) => (
        <View key={index} style={styles.imageWrapper}>
          <Image source={img} style={styles.image} resizeMode="cover" />
        </View>
      ))}
    </View>
  );
};

export default BusinessPhotos;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 12,
  },
  imageWrapper: {
    width: "48%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});
