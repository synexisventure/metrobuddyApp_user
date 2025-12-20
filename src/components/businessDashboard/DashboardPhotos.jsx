// import React, { useContext, useEffect, useState } from "react";
// import { 
//     StyleSheet, 
//     View, 
//     Image, 
//     TouchableOpacity, 
//     Text, 
//     Modal,
//     Alert 
// } from "react-native";
// import { AppContext } from "../../context/AppContext";
// import { useNavigation } from "@react-navigation/native";
// import Video from "react-native-video";

// const BusinessPhotos = ({ }) => {
//   const navigation = useNavigation();
//   const { businessMedia, IMAGE_BASE_URL } = useContext(AppContext);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [videoModalVisible, setVideoModalVisible] = useState(false);

//   // Icons - using your previous icons
//   const icons = {
//     play: require('../../assets/images/bell.png'),
//     close: require('../../assets/images/bell.png'),
//     video: require('../../assets/images/bell.png'),
//     photos: require('../../assets/images/bell.png'), 
//   };

//   // Dynamic photos and videos from API
//   const photos = businessMedia?.photos || [];
//   const videos = businessMedia?.videos || [];

//   useEffect(() => {
//     console.log("My business media : ", businessMedia);
//   }, [businessMedia]);

//   const getImageUrl = (photoUrl) => {
//     if (!photoUrl) return null;

//     const urlString =
//       typeof photoUrl === 'string'
//         ? photoUrl
//         : typeof photoUrl?.url === 'string'
//           ? photoUrl.url
//           : null;

//     if (!urlString) return null;

//     const cleanPath = urlString.replace(/^\/?uploads\//, '');
//     return `${IMAGE_BASE_URL}/uploads/businessMedia/${cleanPath}`;
//   };

//   const handleVideoPress = (video) => {
//     const videoUrl = getImageUrl(video.url);
//     if (videoUrl) {
//       setSelectedVideo(videoUrl);
//       setVideoModalVisible(true);
//     } else {
//       Alert.alert("Error", "Video URL not found");
//     }
//   };

//   const closeVideoModal = () => {
//     setVideoModalVisible(false);
//     setSelectedVideo(null);
//   };

//   const renderMediaItem = (item, index, type) => {
//     const mediaUrl = getImageUrl(item.url);

//     if (type === 'video') {
//       return (
//         <TouchableOpacity 
//           key={item._id || `video-${index}`} 
//           style={styles.videoWrapper}
//           onPress={() => handleVideoPress(item)}
//         >
//           <Video
//             source={{ uri: mediaUrl }}
//             style={styles.videoThumbnail}
//             resizeMode="cover"
//             paused={true}
//             muted={true}
//             onError={(error) => console.log('Video loading error:', error)}
//           />
//           {/* Video Play Overlay */}
//           <View style={styles.videoOverlay}>
//             <View style={styles.playButton}>
//               <Image source={icons.play} style={styles.playIcon} />
//             </View>
//           </View>
//           {/* Video Badge */}
//           <View style={styles.videoBadge}>
//             {/* <Image source={icons.video} style={styles.videoIcon} /> */}
//             <Text style={styles.videoBadgeText}>Video</Text>
//           </View>
//         </TouchableOpacity>
//       );
//     }

//     // Photo item
//     return (
//       <View key={item._id || `photo-${index}`} style={styles.imageWrapper}>
//         <Image
//           source={{ uri: mediaUrl }}
//           style={styles.image}
//           resizeMode="cover"
//           onError={(error) => console.log('Image loading error:', error)}
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with Edit Button */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Business Media</Text>
//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={() => navigation.navigate('PhotosVideoScreen')}
//         >
//           <Image
//             source={require("../../assets/images/edit.png")}
//             style={styles.editIcon}
//           />
//           <Text style={styles.editText}>Edit</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Photos Section */}
//       {photos.length > 0 && (
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             {/* <Image source={icons.photos} style={styles.sectionIcon} /> */}
//             <Text style={styles.sectionTitle}>Photos</Text>
//           </View>
//           <View style={styles.mediaGrid}>
//             {photos.map((photo, index) => renderMediaItem(photo, index, 'photo'))}
//           </View>
//         </View>
//       )}

//       {/* Videos Section */}
//       {videos.length > 0 && (
//         <View style={styles.section}>
//           <View style={styles.sectionHeader}>
//             {/* <Image source={icons.video} style={styles.sectionIcon} /> */}
//             <Text style={styles.sectionTitle}>Videos </Text>
//           </View>
//           <View style={styles.mediaGrid}>
//             {videos.map((video, index) => renderMediaItem(video, index, 'video'))}
//           </View>
//         </View>
//       )}

//       {/* Empty State */}
//       {photos.length === 0 && videos.length === 0 && (
//         <View style={styles.emptyState}>
//           <Image source={icons.photos} style={styles.emptyIcon} />
//           <Text style={styles.emptyTitle}>No Media Added</Text>
//           <Text style={styles.emptyText}>Add photos and videos to showcase your business</Text>
//           <TouchableOpacity
//             style={styles.addButton}
//             onPress={() => navigation.navigate('PhotosVideoScreen')}
//           >
//             <Text style={styles.addButtonText}>Add Media</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Video Player Modal */}
//       <Modal
//         visible={videoModalVisible}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={closeVideoModal}
//       >
//         <View style={styles.videoModal}>
//           <View style={styles.videoModalHeader}>
//             <TouchableOpacity onPress={closeVideoModal} style={styles.closeButton}>
//               <Image source={icons.close} style={styles.closeIcon} />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.videoPlayerContainer}>
//             {selectedVideo && (
//               <Video
//                 source={{ uri: selectedVideo }}
//                 style={styles.fullScreenVideo}
//                 resizeMode="contain"
//                 controls={true}
//                 paused={false}
//                 onError={(error) => {
//                   console.log('Video playback error:', error);
//                   Alert.alert("Error", "Failed to play video");
//                   closeVideoModal();
//                 }}
//               />
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default BusinessPhotos;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     marginBottom: 12,
//     borderRadius: 12,
//     overflow: "hidden",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//     backgroundColor: "#fafafa",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#1a1a1a",
//   },
//   editButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#B91C1C",
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 8,
//     shadowColor: "#B91C1C",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   editIcon: {
//     width: 14,
//     height: 14,
//     tintColor: "#fff",
//     marginRight: 6,
//   },
//   editText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   section: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#f0f0f0",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },
//   sectionIcon: {
//     width: 18,
//     height: 18,
//     tintColor: "#B91C1C",
//     marginRight: 8,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2C3E50",
//   },
//   mediaGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   imageWrapper: {
//     width: "48%",
//     height: 120,
//     borderRadius: 8,
//     overflow: "hidden",
//     marginBottom: 10,
//     backgroundColor: "#f8f9fa",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//   },
//   videoWrapper: {
//     width: "48%",
//     height: 120,
//     borderRadius: 8,
//     overflow: "hidden",
//     marginBottom: 10,
//     backgroundColor: "#000",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     position: "relative",
//   },
//   videoThumbnail: {
//     width: "100%",
//     height: "100%",
//     opacity: 0.8,
//   },
//   videoOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.3)",
//   },
//   playButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "rgba(21, 93, 252, 0.9)",
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 4,
//   },
//   playIcon: {
//     width: 20,
//     height: 20,
//     tintColor: "#fff",
//     marginLeft: 3, // Center the play icon
//   },
//   videoBadge: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.7)",
//     paddingHorizontal: 6,
//     paddingVertical: 3,
//     borderRadius: 4,
//   },
//   videoIcon: {
//     width: 12,
//     height: 12,
//     tintColor: "#fff",
//     marginRight: 2,
//   },
//   videoBadgeText: {
//     color: "#fff",
//     fontSize: 10,
//     fontWeight: "600",
//   },
//   emptyState: {
//     padding: 40,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   emptyIcon: {
//     width: 50,
//     height: 50,
//     tintColor: "#CCD1D1",
//     marginBottom: 12,
//   },
//   emptyTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2C3E50",
//     marginBottom: 8,
//   },
//   emptyText: {
//     fontSize: 14,
//     color: "#7F8C8D",
//     textAlign: "center",
//     marginBottom: 20,
//     lineHeight: 20,
//   },
//   addButton: {
//     backgroundColor: "#B91C1C",
//     paddingHorizontal: 24,
//     paddingVertical: 10,
//     borderRadius: 8,
//     shadowColor: "#B91C1C",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   addButtonText: {
//     color: "#fff",
//     fontSize: 14,
//     fontWeight: "600",
//   },
//   // Video Modal Styles
//   videoModal: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   videoModalHeader: {
//     position: "absolute",
//     top: 50,
//     left: 16,
//     right: 16,
//     zIndex: 10,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   closeButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   closeIcon: {
//     width: 18,
//     height: 18,
//     tintColor: "#fff",
//   },
//   videoPlayerContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   fullScreenVideo: {
//     width: "100%",
//     height: "100%",
//   },
// });




import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Alert
} from "react-native";
import { AppContext } from "../../context/AppContext";
import { useNavigation } from "@react-navigation/native";
import Video from "react-native-video";

const BusinessPhotos = ({ }) => {
  const navigation = useNavigation();
  const { businessMedia, IMAGE_BASE_URL } = useContext(AppContext);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);

  // Dynamic photos and videos from API
  const photos = businessMedia?.photos || [];
  const videos = businessMedia?.videos || [];

  useEffect(() => {
    console.log("My business media : ", businessMedia);
  }, [businessMedia]);

  const getImageUrl = (photoUrl) => {
    if (!photoUrl) return null;

    const urlString =
      typeof photoUrl === 'string'
        ? photoUrl
        : typeof photoUrl?.url === 'string'
          ? photoUrl.url
          : null;

    if (!urlString) return null;

    const cleanPath = urlString.replace(/^\/?uploads\//, '');
    return `${IMAGE_BASE_URL}/uploads/businessMedia/${cleanPath}`;
  };

  const handleVideoPress = (video) => {
    const videoUrl = getImageUrl(video.url);
    if (videoUrl) {
      setSelectedVideo(videoUrl);
      setVideoModalVisible(true);
    } else {
      Alert.alert("Error", "Video URL not found");
    }
  };

  const closeVideoModal = () => {
    setVideoModalVisible(false);
    setSelectedVideo(null);
  };

  const renderMediaItem = (item, index, type) => {
    const mediaUrl = getImageUrl(item.url);

    if (type === 'video') {
      return (
        <TouchableOpacity
          key={item._id || `video-${index}`}
          style={styles.videoWrapper}
          onPress={() => handleVideoPress(item)}
        >
          <Video
            source={{ uri: mediaUrl }}
            style={styles.videoThumbnail}
            resizeMode="cover"
            paused={true}
            muted={true}
            onError={(error) => console.log('Video loading error:', error)}
          />
          {/* Video Play Overlay */}
          <View style={styles.videoOverlay}>
            <View style={styles.playButton}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </View>
          {/* Video Badge */}
          <View style={styles.videoBadge}>
            <Text style={styles.videoBadgeText}>Video</Text>
          </View>
        </TouchableOpacity>
      );
    }

    // Photo item
    return (
      <View key={item._id || `photo-${index}`} style={styles.imageWrapper}>
        <Image
          source={{ uri: mediaUrl }}
          style={styles.image}
          resizeMode="cover"
          onError={(error) => console.log('Image loading error:', error)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with Edit Button */}
      <View style={styles.header}>
        <Text style={styles.title}>Business Media</Text>
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

      {/* Photos Section */}
      {photos.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos ({photos.length})</Text>
          </View>
          <View style={styles.mediaGrid}>
            {photos.map((photo, index) => renderMediaItem(photo, index, 'photo'))}
          </View>
        </View>
      )}

      {/* Videos Section */}
      {videos.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Videos ({videos.length})</Text>
          </View>
          <View style={styles.mediaGrid}>
            {videos.map((video, index) => renderMediaItem(video, index, 'video'))}
          </View>
        </View>
      )}

      {/* Empty State */}
      {photos.length === 0 && videos.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📷</Text>
          <Text style={styles.emptyTitle}>No Media Added</Text>
          <Text style={styles.emptyText}>Add photos and videos to showcase your business</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('PhotosVideoScreen')}
          >
            <Text style={styles.addButtonText}>Add Media</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Video Player Modal */}
      <Modal
        visible={videoModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeVideoModal}
      >
        <View style={styles.videoModal}>
          <View style={styles.videoModalHeader}>
            <TouchableOpacity onPress={closeVideoModal} style={styles.closeButton}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.videoPlayerContainer}>
            {selectedVideo && (
              <Video
                source={{ uri: selectedVideo }}
                style={styles.fullScreenVideo}
                resizeMode="contain"
                controls={true}
                paused={false}
                onError={(error) => {
                  console.log('Video playback error:', error);
                  Alert.alert("Error", "Failed to play video");
                  closeVideoModal();
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BusinessPhotos;

const styles = StyleSheet.create({
  container: { 
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden", 
    // marginHorizontal : 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  editButton: {
    backgroundColor: "#B91C1C",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8, 
  },
  editText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  sectionHeader: {
    marginBottom: 12,
  },

  // header section edit button css
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
    tintColor: "#B91C1C",
    marginRight: 6,
  },
  editText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#B91C1C",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
  },
  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: "48%",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#f8f9fa",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  videoWrapper: {
    width: "48%",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 10,
    backgroundColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    position: "relative",
  },
  videoThumbnail: {
    width: "100%",
    height: "100%",
    opacity: 0.8,
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(21, 93, 252, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  playIcon: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  videoBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  videoBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  emptyState: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2C3E50",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#7F8C8D",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: "#B91C1C",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#B91C1C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  // Video Modal Styles
  videoModal: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoModalHeader: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  videoPlayerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenVideo: {
    width: "100%",
    height: "100%",
  },
});