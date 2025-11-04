import React, { useContext, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../../context/AppContext";

const PhotosVideosCard = () => {
  const navigation = useNavigation();
  const { businessMedia, API_BASE_URL, IMAGE_BASE_URL } = useContext(AppContext);

  const onEdit = () => {
    navigation.navigate("PhotosVideoScreen");
  };

  // 🧩 Map backend data (photos + videos) to a clean list for FlatList
  const mediaList = useMemo(() => {
    if (!businessMedia) return [];

    console.log("business media :  " , businessMedia);

    const photos = businessMedia.photos?.map((p) => ({
      type: "photo",
      uri: `${IMAGE_BASE_URL}/uploads/businessMedia/${p.url}`,
    })) || []; 

    const videos = businessMedia.videos?.map((v) => ({
      type: "video",
      uri: `${IMAGE_BASE_URL}/uploads/businessMedia/${v.url}`,
    })) || [];

    return [...photos, ...videos];
  }, [businessMedia]);

  // 🎞️ Render each media item
  const renderItem = ({ item }) => (
    <View style={styles.mediaItem}>
      {item.type === "photo" ? (
        <Image source={{ uri: item.uri }} style={styles.mediaImage} /> 
      ) : (
        <View style={styles.videoPlaceholder}>
          <Image
            source={require("../../assets/images/uploadIcon.png")}
            style={styles.videoIcon}
          />
          <Text style={styles.videoText}>Video</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Photos & Videos</Text>
        <TouchableOpacity onPress={onEdit}>
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.editIcon}
          />
        </TouchableOpacity>
      </View>

      {mediaList.length > 0 ? (
        <FlatList
          data={mediaList}
          renderItem={renderItem}
          horizontal
          keyExtractor={(_, idx) => idx.toString()}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.value}>No photos or videos added.</Text>
      )}
    </View>
  );
};

export default PhotosVideosCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#eee",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  title: { fontSize: 16, fontWeight: "600", color: "#000" },
  editIcon: { width: 18, height: 18, tintColor: "#0056ff" },
  value: { color: "#666", fontSize: 13 },
  mediaItem: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  mediaImage: { width: "100%", height: "100%", resizeMode: "cover" },
  videoPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eef3ff",
    justifyContent: "center",
    alignItems: "center",
  },
  videoIcon: { width: 30, height: 30, tintColor: "#0056ff" },
  videoText: { fontSize: 12, color: "#0056ff", marginTop: 4 },
});
