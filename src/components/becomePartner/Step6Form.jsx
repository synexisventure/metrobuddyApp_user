import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { AppContext } from "../../context/AppContext";
import FilePickerModal from "../../components/filePicker/FilePickerModal";
import {
  requestCameraPermission,
  requestGalleryPermission,
} from "../../utils/permissions";
import Video from "react-native-video";

const Step6Form = ({ onNext = () => { } }) => {
  const {
    API_BASE_URL,
    IMAGE_BASE_URL,
    handleApiError,
    businessMedia,
    setBusinessMedia,
    fetchBusinessMedia
  } = useContext(AppContext);

  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [activeType, setActiveType] = useState(null);

  // 🔹 Load business ID
  // useEffect(() => {
  //   const loadBusinessId = async () => {
  //     const savedId = await AsyncStorage.getItem("businessId");
  //     if (savedId) setBusinessId(savedId);
  //   };
  //   loadBusinessId();
  // }, []);
  useEffect(() => {
    const loadBusinessId = async () => {
      const savedId = await AsyncStorage.getItem("businessId");
      if (savedId) setBusinessId(savedId);
    };
    loadBusinessId();

    // 🧩 Preload existing media from context
    if (businessMedia?.photos?.length) {
      const existingPhotos = businessMedia.photos.map((p) => {
        const cleanPath = p.url.replace(/^\/?uploads\//, '');
        return {
          _id: p._id,
          uri: `${IMAGE_BASE_URL}/uploads/businessMedia/${cleanPath}`,
          type: "image/jpeg",
        };
      });
      setPhotos(existingPhotos);
    }

    if (businessMedia?.videos) {
      const existingVideos = businessMedia.videos.map(v => ({
        _id: v._id,
        uri: `${IMAGE_BASE_URL}/uploads/businessMedia/${v.url}`,
        type: "video/mp4",
        fileName: v.url.split("/").pop()
      }));

      setVideos(existingVideos);
    } else {
      setVideos([]);
    }


  }, [businessMedia]);


  // 📸 File selection logic
  const handleSelect = async (type) => {
    try {
      if (type === "camera") {
        const hasPermission = await requestCameraPermission();
        if (!hasPermission) return Alert.alert("Permission required", "Camera access is needed");
        // const result = await launchCamera({ mediaType: "photo", quality: 0.8 });

        const result = await launchCamera({
          mediaType: activeType === "video" ? "video" : "photo",
          quality: 0.8,
        });

        if (result.assets?.length) saveFile(result.assets[0]);
      } else if (type === "gallery") {
        const hasPermission = await requestGalleryPermission();
        if (!hasPermission) return Alert.alert("Permission required", "Gallery access is needed");
        const result = await launchImageLibrary({
          mediaType: activeType === "video" ? "video" : "photo",
          quality: 0.8,
        });
        if (result.assets?.length) saveFile(result.assets[0]);
      }
    } catch (err) {
      console.log("Picker Error:", err);
      Alert.alert("Error", "Failed to pick file");
    }
  };

  const saveFile = (file) => {
    if (activeType === "photo") setPhotos((prev) => [...prev, file]);
    else if (activeType === "video") setVideos(prev => [...prev, file]);

  };

  const handleUploadPress = (type) => {
    setActiveType(type);
    setModalVisible(true);
  };
 
  const handleSaveAndContinue = async () => {
    if (!businessId) {
      Alert.alert("Error", "No business ID found");
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");

      const formData = new FormData();
      formData.append("businessId", businessId);

      // Only NEW photos → those without _id
      const newPhotos = photos.filter(p => !p._id);

      newPhotos.forEach((file, index) => {
        formData.append("photos", {
          uri: file.uri,
          type: file.type || "image/jpeg",
          name: file.fileName || `photo_${index}.jpg`,
        });
      });


      // Only new video
      videos.forEach((file, index) => {
        if (!file._id) {
          formData.append("videos", {
            uri: file.uri,
            type: file.type || "video/mp4",
            name: file.fileName || `video_${index}.mp4`,
          });
        }
      });



      // 🔥 AUTO POST or PUT (based on existing data)
      console.log("my business media data : ", businessMedia.businessId);

      const isEditing = businessMedia.businessId;
      // const isEditing = true;

      const url = isEditing
        ? `${API_BASE_URL}/user/partner_forms/photos_videos/${businessMedia.businessId}`
        : `${API_BASE_URL}/user/partner_forms/photos_videos`;

      const method = isEditing ? "put" : "post";

      console.log("Calling put url : ", method, `${API_BASE_URL}/user/partner_forms/photos_videos/${businessMedia.businessId}`);


      const res = await axios[method](url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert("Success", "Media uploaded successfully!");
      fetchBusinessMedia();
      onNext();
    } catch (error) {
      // Smart error handling
      if (error.response) {
        // API responded but with an error status
        console.error('Update media API Error:', error.response.data);
        Alert.alert('Update Failed', error.response.data?.message || 'Something went wrong.');
      } else if (error.request) {
        // No response (network/server down)
        console.error('Network Error:', error.request);
        Alert.alert(
          'Network Error',
          'Unable to reach the server. Please check your connection and try again.'
        );
      } else {
        // Something else (code error, timeout, etc.)
        console.error('Unexpected Error:', error.message);
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteMedia = async (mediaId, type) => {
    // 👉 local file: just remove from state, no API call  
    if (!mediaId) {
      if (type === "photo") {
        setPhotos(prev => prev.filter(p => p._id)); // only server photos remain
      } else if (type === "video") {
        setVideos(prev => prev.filter(v => v._id));
        return;
      }


      return;
    }

    // 👉 server file: call DELETE API
    Alert.alert(
      "Delete?",
      `Are you sure you want to delete this ${type}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem("token");

              await axios.delete(
                `${API_BASE_URL}/user/partner_forms/${businessId}/photo-video`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                  data: { mediaId, type },
                }
              );

              // Remove from UI
              if (type === "photo") {
                setPhotos(prev => prev.filter(p => p._id !== mediaId));
              } else {
                setVideos([]);
              }

              fetchBusinessMedia();
              Alert.alert("Deleted", `${type} deleted successfully`);
            } catch (error) {
              Alert.alert("Error", "Unable to delete media");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#155DFC" />
        <Text style={styles.loaderText}>Uploading media...</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text style={styles.title}>Photos & Videos</Text>
      <Text style={styles.subtitle}>
        Optional - Showcase your business with images
      </Text>

      <View style={styles.proTipCard}>
        <Text style={styles.proTipTitle}>Pro Tip</Text>
        <Text style={styles.proTipText}>
          Businesses with photos get 3x more engagement. Add at least 5 photos of your business.
        </Text>
      </View>


      <Text style={styles.sectionLabel}>Business Photos</Text>
      <Text style={styles.helperText}>
        Add photos of your business, products, or services
      </Text>

      {/* add photo section=============================================================== */}
      <View style={styles.photoRow}>
        <TouchableOpacity
          style={styles.photoBox}
          onPress={() => handleUploadPress("photo")}
        >
          <Image
            source={require("../../assets/images/gallery.png")}
            style={styles.icon}
          />
          <Text style={styles.photoText}>Add Photos</Text>
        </TouchableOpacity>
      </View>
      {/* Preview selected photos */}
      <View style={styles.previewRow}>
        {photos.map((p, idx) => (
          <View key={idx} style={styles.mediaBox}>
            <Image source={{ uri: p.uri }} style={styles.previewImage} />

            {/* Delete Button */}
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteMedia(p._id, "photo")}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>



      {/* add video section ====================================================================== */}

      <Text style={[styles.sectionLabel, { marginTop: 25 }]}>
        Business Videos (Optional)
      </Text>
      <Text style={styles.helperText}>Add a video tour or introduction</Text>

      <TouchableOpacity
        style={styles.videoBox}
        onPress={() => handleUploadPress("video")}
      // onPress={() => {
      //   setActiveType("video");
      //   setTimeout(() => handleSelect("gallery"), 1);
      // }}
      >
        <Image
          source={require("../../assets/images/video.png")}
          style={styles.icon}
        />
        <Text style={styles.photoText}>Add Video</Text>
        <Text style={styles.videoHint}>Max 30 seconds</Text>
      </TouchableOpacity>

      {/* {video && (
        <View style={styles.mediaBox}>
          <Text style={styles.videoSelected}>
            🎥 {video.fileName || "1 video selected"}
          </Text>

          <TouchableOpacity
            style={styles.deleteBtn}
            onPress={() => deleteMedia(video._id, "video")}
          >
            <Text style={styles.deleteText}>✕</Text>
          </TouchableOpacity>
        </View>
      )} */}
      {/* {videos.map((video, idx) => ( */}
      {Array.isArray(videos) &&
        videos.map((video, idx) => (
          <View key={idx} style={{ marginTop: 10 }}>
            <Video
              source={{ uri: video.uri }}
              style={{ width: "100%", height: 200, borderRadius: 10, marginBottom : 10 }}
              resizeMode="cover"
              paused={true}
              controls={true}
            />

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => deleteMedia(video._id, "video")}
            >
              <Text style={styles.deleteText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}




      <TouchableOpacity
        style={styles.saveBtn}
        onPress={handleSaveAndContinue}
        disabled={loading}
      >
        <Text style={styles.saveText}>
          {loading ? "Uploading..." : "Save and Continue"}
        </Text>
      </TouchableOpacity>

      <FilePickerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelect}
        options={[
          { id: "camera", label: "Camera" },
          { id: "gallery", label: "Gallery" },
        ]}
      />
    </ScrollView>
  );
};

export default Step6Form;

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 15 },
  title: { fontSize: 18, fontWeight: "600", color: "#000" },
  subtitle: { fontSize: 13, color: "#555", marginBottom: 20 },
  proTipCard: {
    backgroundColor: "#f0f5ff",
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: "#dce5ff",
    marginBottom: 25,
  },
  proTipTitle: { fontSize: 14, fontWeight: "600", color: "#0056ff" },
  proTipText: { fontSize: 13, color: "#000", lineHeight: 18, marginTop: 6 },
  sectionLabel: { fontSize: 13, fontWeight: "500", color: "#000" },
  helperText: { fontSize: 12, color: "#777", marginBottom: 12 },
  photoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  photoBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    width: "100%",
    height: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { width: 30, height: 30, tintColor: "#555", marginBottom: 8 },
  photoText: { fontSize: 13, color: "#000" },
  previewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#000"
  },
  videoBox: {
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 10,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  videoHint: { fontSize: 11, color: "#888", marginTop: 4 },
  videoSelected: { fontSize: 13, color: "#333", marginBottom: 10 },
  saveBtn: {
    backgroundColor: "#0056ff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    // marginBottom: 40,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderText: { marginTop: 10, color: "#555" },

  mediaBox: {
    position: "relative",
    marginRight: 10,
  },

  deleteBtn: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },

  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },

});
