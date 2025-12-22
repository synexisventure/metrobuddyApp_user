 

import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const LoadingOverlay = ({ visible = true }) => {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setDots(prev => (prev.length < 5 ? prev + "." : "."));
    }, 500);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Text style={styles.text}>Loading{dots}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)", // semi-transparent
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoadingOverlay;







// import React, { useEffect, useRef } from 'react';
// import { View, StyleSheet, Animated } from 'react-native';

// const BOUNCE_HEIGHT = -15; // How high the dots bounce (negative value moves it up)
// const DURATION = 400;      // Duration of one bounce up or down

// const Dot = ({ delay, color }) => {
//   const bounce = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Defines a single up-and-down bounce sequence
//     const bounceSequence = Animated.sequence([
//       // Bounce Up
//       Animated.timing(bounce, {
//         toValue: BOUNCE_HEIGHT,
//         duration: DURATION,
//         useNativeDriver: true, // Use native driver for smooth performance
//       }),
//       // Bounce Down
//       Animated.timing(bounce, {
//         toValue: 0,
//         duration: DURATION,
//         useNativeDriver: true,
//       }),
//     ]);

//     // Loop the sequence with an initial delay for the staggered effect
//     const animation = Animated.loop(
//       Animated.sequence([
//         Animated.delay(delay), 
//         bounceSequence,
//         // Short delay before the next loop starts
//         Animated.delay(400), 
//       ])
//     );
    
//     animation.start();
    
//     // Cleanup function to stop the animation when the component is unmounted or hidden
//     return () => animation.stop(); 
//   }, [bounce, delay]);

//   return (
//     <Animated.View 
//       style={[
//         styles.dot, 
//         { 
//           backgroundColor: color, 
//           // Apply the animated vertical movement
//           transform: [{ translateY: bounce }] 
//         } 
//       ]} 
//     />
//   );
// };

// const BounceLoader = ({ visible = false, dotColor = '#FF9500' }) => {
//   if (!visible) return null;

//   return (
//     // Transparent overlay is non-blocking
//     <View style={styles.overlay} pointerEvents="none">
//       <View style={styles.loaderContainer}>
//         {/* Three dots with staggered delays (0ms, 200ms, 400ms) */}
//         <Dot delay={0} color={dotColor} /> 
//         <Dot delay={200} color={dotColor} /> 
//         <Dot delay={400} color={dotColor} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     // Covers the screen but is mostly transparent
//     position: "absolute",
//     top: 0, 
//     left: 0, 
//     right: 0, 
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.0)", // Fully transparent background
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 999,
//   },
//   loaderContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     borderRadius: 10,
//     // Small background card for better visual focus
//     backgroundColor: 'white', 
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3, // Android shadow
//   },
//   dot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6, 
//     marginHorizontal: 5,
//   },
// });

// export default BounceLoader;