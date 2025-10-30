import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoadingScreen = () => {
  const navigation = useNavigation();
  const scaleValue = new Animated.Value(1);
  const rotateValue = new Animated.Value(0);

  useEffect(() => {
    // Logo animation
    const logoAnimation = Animated.parallel([
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 800,
            easing: Easing.ease,
            useNativeDriver: true,
          }),
        ])
      ),
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ),
    ]);

    logoAnimation.start();

    // Auth check
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setTimeout(() => {
          if (token) {
            navigation.reset({
              index: 0,
              routes: [{ name: "UserApp" }],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "UserAuth" }],
            });
          }
        }, 1500); // Slightly increased for better animation experience
      } catch (error) {
        console.log("Error checking token:", error);
        navigation.reset({
          index: 0,
          routes: [{ name: "UserAuth" }],
        });
      }
    };
    checkAuth();

    return () => {
      logoAnimation.stop();
    };
  }, []);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.View 
        style={[
          styles.logoWrapper,
          {
            transform: [
              { scale: scaleValue },
              { rotate: rotate }
            ]
          }
        ]}
      >
        <View style={styles.outerBlue}>
          <View style={styles.innerWhite}>
            <View style={styles.centerBlue} />
          </View>
        </View>
      </Animated.View>

      {/* App Name with Gradient Effect */}
      <Text style={styles.appName}>MetroBuddy</Text>
      
      {/* Loading Indicator */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E6CF8" />
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, styles.dot1]} />
          <Animated.View style={[styles.dot, styles.dot2]} />
          <Animated.View style={[styles.dot, styles.dot3]} />
        </View>
      </View>

      {/* Loading Text */}
      <Text style={styles.loadingText}>Checking your session</Text>
      
      {/* Subtitle */}
      <Text style={styles.subtitle}>Getting everything ready for you</Text>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#2E6CF8",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  outerBlue: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2E6CF8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#E8F0FE",
  },
  innerWhite: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  centerBlue: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#2E6CF8",
  },
  appName: {
    fontSize: 28,
    color: "#1A1A1A",
    fontWeight: "700",
    marginTop: 16,
    letterSpacing: 0.5,
    textShadowColor: "rgba(46, 108, 248, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  loadingContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2E6CF8",
    opacity: 0.6,
  },
  dot1: {
    animationDelay: '0s',
  },
  dot2: {
    animationDelay: '0.2s',
  },
  dot3: {
    animationDelay: '0.4s',
  },
  loadingText: {
    fontSize: 16,
    color: "#4A4A4A",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#888",
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 20,
  },
});