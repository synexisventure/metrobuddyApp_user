 import React, { useContext } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { AppContext } from "../../context/AppContext";

const BusinessPhotos = ({ media }) => {
  const { IMAGE_BASE_URL } = useContext(AppContext);

  const photos = media?.photos?.length > 0 ? media.photos : [];

  const getImageUrl = (photo) => {
    if (!photo) return null;

    const urlString =
      typeof photo === "string"
        ? photo
        : typeof photo?.url === "string"
        ? photo.url
        : null;

    if (!urlString) return null;

    const cleanPath = urlString.replace(/^\/?uploads\//, "");
    console.log("try to view : " , `${IMAGE_BASE_URL}/uploads/businessMedia/${cleanPath}`);
    
    return `${IMAGE_BASE_URL}/uploads/businessMedia/${cleanPath}`;
  };

  if (photos.length === 0) {
    return (
      <View style={styles.noPhotos}>
        <Text style={styles.noPhotosText}>No photos available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {photos.map((photo, index) => (
        <View key={photo._id || index} style={styles.imageWrapper}>
          <Image
            source={{ uri: getImageUrl(photo) }}
            style={styles.image}
            resizeMode="cover"
            onError={(err) => console.log("Image load error:", err.nativeEvent)}
          />
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
  noPhotos: {
    padding: 20,
    alignItems: "center",
  },
  noPhotosText: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
  },
});
