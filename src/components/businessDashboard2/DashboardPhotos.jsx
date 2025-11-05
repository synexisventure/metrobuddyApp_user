import React, { useContext, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";

const BusinessPhotos = ({ }) => {

  const navigation = useNavigation();

  const { businessMedia, IMAGE_BASE_URL } = useContext(AppContext);

  // Dynamic photos from API
  const photos = businessMedia?.photos || [];

  // Construct full image URLs
  const getImageUrl = (photoUrl) => {
    if (!photoUrl) return null;

    // remove leading /uploads if already present
    const cleanPath = photoUrl.replace(/^\/?uploads\//, '');

    return `${IMAGE_BASE_URL}/uploads/businessMedia/${cleanPath}`;
  };




  return (
    <View style={styles.container}>
      {/* Header with Edit Button */}
      <View style={styles.header}>
        <Text style={styles.title}>Business Photos</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('PhotosVideoScreen')}
        >
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.editIcon}
          />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Photos Grid */}
      <View style={styles.photosContainer}>
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <View key={photo._id || index} style={styles.imageWrapper}>
              <Image
                source={{ uri: getImageUrl(photo.url) }}
                style={styles.image}
                resizeMode="cover"
                onError={(error) => console.log('Image loading error:', error)}
              />
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No photos added yet</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default BusinessPhotos;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e8ecff",
  },
  editIcon: {
    width: 14,
    height: 14,
    tintColor: "#155DFC",
    marginRight: 6,
  },
  editText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#155DFC",
  },
  photosContainer: {
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
  emptyState: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});