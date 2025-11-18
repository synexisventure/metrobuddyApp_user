import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigation } from '@react-navigation/native'

const DashboardProduct = () => {
    const navigation = useNavigation()
    const { businessProducts, IMAGE_BASE_URL } = useContext(AppContext)

    const products = businessProducts?.products || []

    const handleAddProduct = () => {
        navigation.navigate('AddProductScreen')
    }

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
        return `${IMAGE_BASE_URL}/uploads/products/${cleanPath}`;
    };


    // Render product images
    const renderProductImages = (images) => {
        if (!images || images.length === 0) {
            return (
                <View style={styles.noImagesContainer}>
                    <Text style={styles.noImageText}>No images available</Text>
                </View>
            )
        }

        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imagesScrollView}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image
                            source={{ uri: getImageUrl(image) }}
                            style={styles.productImage}
                        />
                    </View>
                ))}
            </ScrollView>
        )
    }

    if (products.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Your Products</Text>
                    <Text style={styles.headerSubtitle}>Manage your business products</Text>
                </View>

                <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>No Products Added</Text>
                    <Text style={styles.emptyText}>
                        Start adding your products to showcase them to customers
                    </Text>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                        <Text style={styles.addButtonText}>+ Add First Product</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.headerTitle}>Your Products</Text>
                    <Text style={styles.headerSubtitle}>
                        {products.length} product{products.length !== 1 ? 's' : ''} listed
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleAddProduct}
                >
                    <Image
                        source={require('../../assets/images/edit.png')}
                        style={styles.editIcon}
                    />
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            </View>

            {/* Products List */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {products.map((product, index) => (
                    <View key={product._id || index} style={styles.productCard}>
                        {/* Product Images */}
                        {renderProductImages(product.images)}

                        {/* Product Header */}
                        <View style={styles.productHeader}>
                            <Text style={styles.productName} numberOfLines={1}>
                                {product.productName || 'Unnamed Product'}
                            </Text>
                            <View style={styles.priceTag}>
                                <Text style={styles.priceText}>
                                    ₹{product.pricing || 0}
                                </Text>
                            </View>
                        </View>

                        {/* Short Description */}
                        {product.shortDescription && (
                            <Text style={styles.shortDescription} numberOfLines={2}>
                                {product.shortDescription}
                            </Text>
                        )}

                        {/* Specifications */}
                        {product.specification && (
                            <View style={styles.specSection}>
                                <Text style={styles.specLabel}>Specifications:</Text>
                                <Text style={styles.specText} numberOfLines={3}>
                                    {product.specification}
                                </Text>
                            </View>
                        )}

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <View style={styles.tagsContainer}>
                                {product.tags.map((tag, tagIndex) => (
                                    <View key={tagIndex} style={styles.tag}>
                                        <Text style={styles.tagText}>{tag}</Text>
                                    </View>
                                ))}
                            </View>
                        )}

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.dateText}>
                                Added: {new Date(product.createdAt).toLocaleDateString()}
                            </Text>
                            <Text style={styles.imageCountText}>
                                {product.images?.length || 0} image{(product.images?.length || 0) !== 1 ? 's' : ''}
                            </Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

export default DashboardProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    emptyState: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    emptyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#155DFC',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    addButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    productCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    // Images Styles
    imagesScrollView: {
        marginBottom: 16,
    },
    imageContainer: {
        marginRight: 8,
    },
    productImage: {
        width: 120,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#f5f5f5',
    },
    noImagesContainer: {
        height: 100,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderStyle: 'dashed',
    },
    noImageText: {
        fontSize: 14,
        color: '#999',
    },
    productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginRight: 12,
    },
    priceTag: {
        backgroundColor: '#155DFC',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    priceText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    shortDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 12,
    },
    specSection: {
        marginBottom: 12,
    },
    specLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    specText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 16,
    },
    tag: {
        backgroundColor: '#E9EEFF',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginRight: 8,
        marginBottom: 6,
    },
    tagText: {
        fontSize: 12,
        color: '#155DFC',
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 12,
    },
    dateText: {
        fontSize: 12,
        color: '#999',
    },
    imageCountText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    editIcon: {
        width: 14,
        height: 14,
        tintColor: '#1a73e8',
        marginRight: 6,
    },
    editText: {
        fontSize: 14,
        color: '#1a73e8',
        fontWeight: '500',
    },
})