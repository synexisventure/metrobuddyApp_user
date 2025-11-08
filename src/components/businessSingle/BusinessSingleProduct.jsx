import React, { useContext } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Dimensions 
} from "react-native";
import { AppContext } from "../../context/AppContext";

const { width } = Dimensions.get("window");

const BusinessSingleProduct = ({ products }) => {
  const { IMAGE_BASE_URL } = useContext(AppContext);

  if (!products || products.length === 0) {
    return (
      <View style={styles.noProducts}>
        <Text style={styles.noProductsTitle}>No Products Available</Text>
        <Text style={styles.noProductsSubtitle}>
          This business hasn't added any products yet.
        </Text>
      </View>
    );
  }

  const getProductImage = (images) => {
    if (!images || images.length === 0) 
      return "https://via.placeholder.com/300x200?text=No+Image";
    
    return `${IMAGE_BASE_URL}/uploads/products/${images[0].url.replace(/^\/?uploads\//, "")}`;
  };

  const formatPrice = (price) => {
    if (!price) return "Price not set";
    return `₹${price.toLocaleString('en-IN')}`;
  };

  const handleProductPress = (product) => {
    // Add navigation to product detail screen here
    console.log("Product pressed:", product);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products </Text>
      </View>
      
      <ScrollView 
        contentContainerStyle={styles.productsContainer}
        showsVerticalScrollIndicator={false}
      >
        {products.map((product, index) => (
          <TouchableOpacity 
            key={product._id || index} 
            style={styles.productCard}
            onPress={() => handleProductPress(product)}
            activeOpacity={0.9}
          >
            {/* Product Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getProductImage(product.images) }}
                style={styles.productImage}
                resizeMode="contain"
              />
              {product.tags && product.tags.length > 0 && (
                <View style={styles.tagContainer}>
                  <Text style={styles.tagText}>{product.tags[0]}</Text>
                </View>
              )}
            </View>

            {/* Product Info */}
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={2}>
                {product.productName || "Unnamed Product"}
              </Text>
              
              <Text style={styles.productDescription} numberOfLines={2}>
                {product.shortDescription || "No description available"}
              </Text>

              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>
                  {formatPrice(product.pricing)}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>⭐ 5.0</Text>
                </View>
              </View>

              {/* Additional Info */}
              <View style={styles.metaContainer}>
                {/* <View style={styles.metaItem}>
                  <Text style={styles.metaText}>
                     {new Date(product.createdAt).toLocaleDateString()}
                  </Text>
                </View> */}
                {/* {product.specification && (
                  <View style={styles.metaItem}>
                    <Text style={styles.metaText}>Specs</Text>
                  </View>
                )} */}
              </View>
            </View>

            {/* Action Button */}
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>🛒 Inquire</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default BusinessSingleProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c3e50",
  },
  productsContainer: {
    padding: 16,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 200,
    backgroundColor: "#555",
  },
  tagContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#e74c3c",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 6,
    lineHeight: 20,
  },
  productDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 12,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#27ae60",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2c3e50",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 11,
    color: "#666",
  },
  actionButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  noProducts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#f8f9fa",
  },
  noProductsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#7f8c8d",
    marginBottom: 8,
  },
  noProductsSubtitle: {
    fontSize: 14,
    color: "#bdc3c7",
    textAlign: "center",
    lineHeight: 20,
  },
});