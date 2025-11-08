// import React from "react";
// import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

// const reviews = [
//   {
//     name: "Rajesh Kumar",
//     time: "2 days ago",
//     review:
//       "Excellent service and quality. Highly recommended! The staff was very professional and the facilities were top-notch.",
//   },
//   {
//     name: "Priya Sharma",
//     time: "1 week ago",
//     review:
//       "Good experience overall. Staff was friendly and helpful. Will definitely visit again soon.",
//   },
//   {
//     name: "Amit Singh",
//     time: "2 weeks ago",
//     review:
//       "Best in the area! Outstanding quality and service.",
//   },
// ];

// const BusinessReviews = () => {
//   return (
//     <View style={styles.container}>
//       {reviews.map((item, index) => (
//         <View key={index} style={styles.reviewCard}>
//           <View style={styles.headerRow}>
//             <View style={styles.avatar}>
//               <Text style={styles.avatarText}>
//                 {item.name
//                   .split(" ")
//                   .map((n) => n[0])
//                   .join("")
//                   .toUpperCase()}
//               </Text>
//             </View>
//             <View style={styles.nameContainer}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.time}>{item.time}</Text>
//             </View>
//           </View>

//           {/* ⭐ Rating Row */}
//           <View style={styles.starRow}>
//             {Array(5)
//               .fill(0)
//               .map((_, i) => (
//                 <Image
//                   key={i}
//                   source={require("../../assets/images/star.png")}
//                   style={styles.starIcon}
//                 />
//               ))}
//           </View>

//           {/* 💬 Review Text */}
//           <Text style={styles.reviewText}>{item.review}</Text>
//         </View>
//       ))}

//       {/* Buttons */}
//       <TouchableOpacity style={styles.loadMoreBtn}>
//         <Text style={styles.loadMoreText}>Load More Reviews</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.writeBtn}>
//         <Text style={styles.writeText}>Write a Review</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default BusinessReviews;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   reviewCard: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     padding: 14,
//     marginBottom: 12, 
//   },
//   headerRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },
//   avatar: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: "#e8efff",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//   },
//   avatarText: {
//     color: "#1a73e8",
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   nameContainer: {
//     flexDirection: "column",
//   },
//   name: {
//     fontSize: 14,
//     fontWeight: "600",
//     color: "#111",
//   },
//   time: {
//     fontSize: 12,
//     color: "#6b7280",
//   },
//   starRow: {
//     flexDirection: "row",
//     marginBottom: 6,
//   },
//   starIcon: {
//     width: 16,
//     height: 16,
//     marginRight: 2,
//   },
//   reviewText: {
//     fontSize: 13,
//     color: "#444",
//     lineHeight: 18,
//   },
//   loadMoreBtn: {
//     borderWidth: 1,
//     borderColor: "#e5e7eb",
//     borderRadius: 10,
//     paddingVertical: 10,
//     alignItems: "center",
//     marginTop: 4,
//   },
//   loadMoreText: {
//     fontSize: 14,
//     color: "#111",
//     fontWeight: "500",
//   },
//   writeBtn: {
//     backgroundColor: "#1a73e8",
//     borderRadius: 10,
//     paddingVertical: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   writeText: {
//     fontSize: 14,
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const BusinessReviews = ({ reviews }) => {
  // fallback to empty array if no reviews passed
  const reviewList = reviews || [];

  return (
    <View style={styles.container}>
      {reviewList.length > 0 ? (
        reviewList.map((item, index) => (
          <View key={index} style={styles.reviewCard}>
            <View style={styles.headerRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {item.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </Text>
              </View>
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>

            {/* ⭐ Rating Row */}
            <View style={styles.starRow}>
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Image
                    key={i}
                    source={require("../../assets/images/star.png")}
                    style={styles.starIcon}
                  />
                ))}
            </View>

            {/* 💬 Review Text */}
            <Text style={styles.reviewText}>{item.review}</Text>
          </View>
        ))
      ) : (
        <View style={styles.noReview}>
          <Text style={styles.noReviewText}>No reviews yet</Text>
        </View>
      )}

      {reviewList.length > 0 && (
        <>
          <TouchableOpacity style={styles.loadMoreBtn}>
            <Text style={styles.loadMoreText}>Load More Reviews</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.writeBtn}>
            <Text style={styles.writeText}>Write a Review</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default BusinessReviews;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 14,
    marginBottom: 12, 
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e8efff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    color: "#1a73e8",
    fontWeight: "600",
    fontSize: 14,
  },
  nameContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
  },
  time: {
    fontSize: 12,
    color: "#6b7280",
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  reviewText: {
    fontSize: 13,
    color: "#444",
    lineHeight: 18,
  },
  noReview: {
    paddingVertical: 20,
    alignItems: "center",
  },
  noReviewText: {
    fontSize: 14,
    color: "#6b7280",
    fontStyle: "italic",
  },
  loadMoreBtn: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 4,
  },
  loadMoreText: {
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },
  writeBtn: {
    backgroundColor: "#1a73e8",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  writeText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
});
