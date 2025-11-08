import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Switch, Image, Modal, ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import SearchCard from "../../components/search/SearchCard";
import { AppContext } from '../../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchScreen = () => {
    const { API_BASE_URL } = useContext(AppContext);

    const [searchQuery, setSearchQuery] = useState('') 
    const [showFilters, setShowFilters] = useState(false)
    const [ratingFilter, setRatingFilter] = useState(0)
    const [selectedCity, setSelectedCity] = useState('')
    const [radius, setRadius] = useState(15)
    const [openNow, setOpenNow] = useState(false)
    const [useCurrentLocation, setUseCurrentLocation] = useState(false)
    const [businessList, setBusinessList] = useState([])
    const [loading, setLoading] = useState(false)

    const [userLocation, setUserLocation] = useState(null); // new state


    const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad']
    const ratings = [1, 2, 3, 4, 5]
    const radiusOptions = [1, 2, 5, 10, 15, 20, 25, 30]

    const SearchIcon = require('../../assets/images/search.png')
    const FilterIcon = require('../../assets/images/filter.png')
    const LocationIcon = require('../../assets/images/location.png')
    const BusinessIcon = require('../../assets/images/bell.png')
    const NavigateIcon = require('../../assets/images/bell.png')
    const StarIcon = require('../../assets/images/star.png')
    const ClockIcon = require('../../assets/images/clock.png')

    // 🔍 SEARCH FUNCTION
    // const handleSearch = async () => {
    //     if (!searchQuery.trim()) return;

    //     setLoading(true);
    //     try {
    //         const body = {
    //             query: searchQuery.trim(),
    //             latitude: 28.61,
    //             longitude: 77.20
    //         };

    //         const token = await AsyncStorage.getItem("token");

    //         const response = await axios.post(
    //             `${API_BASE_URL}/user/search`,
    //             body,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //         );

    //         console.log("Search Response:", response);

    //         if (response.data.success) {
    //             setBusinessList(response.data.data || []);
    //         } else {
    //             setBusinessList([]);
    //         }
    //     } catch (error) {
    //         console.error("Search API Error:", error.message);
    //         setBusinessList([]);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);

        try {
            const token = await AsyncStorage.getItem("token");

            // Build request body according to filters
            const body = {
                query: searchQuery.trim(),
            };


            // If using current location
            if (useCurrentLocation) {
                body.latitude = 28.61;   // replace with actual GPS later
                body.longitude = 77.20;
                body.radius = radius * 1000; // backend expects meters
            }

            // If user picked a city
            if (selectedCity) {
                body.city = selectedCity;
            }

            console.log("my body of search : ", body);

            const response = await axios.post(
                `${API_BASE_URL}/user/search`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Search Response:", response.data);

            if (response.data.success) {
                setBusinessList(response.data.data || []);
            } else {
                setBusinessList([]);
            }
        } catch (error) {
            console.error("Search API Error:", error.message);
            setBusinessList([]);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        setShowFilters(false)
        console.log('Filters applied:', {
            ratingFilter,
            selectedCity,
            radius,
            openNow,
            useCurrentLocation
        })
    }

    const clearFilters = () => {
        setRatingFilter(0)
        setSelectedCity('')
        setRadius(5)
        setOpenNow(false)
        setUseCurrentLocation(false)
    }

    return (
        <View style={styles.container}>
            {/* 🔍 Search Header */}
            <View style={styles.searchContainer}>
                {/* Search Bar with Button in Same Row */}
                <View style={styles.searchRow}>
                    <View style={styles.searchInputContainer}>
                        <Image source={SearchIcon} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search for businesses..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            onSubmitEditing={handleSearch}
                            placeholderTextColor="#999"
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.searchActionButton,
                            searchQuery.trim() ? styles.activeSearchButton : styles.inactiveSearchButton
                        ]}
                        onPress={handleSearch}
                        disabled={!searchQuery.trim()}
                    >
                        <Text style={[
                            styles.searchActionText,
                            searchQuery.trim() ? styles.activeSearchText : styles.inactiveSearchText
                        ]}>
                            Search
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Filter Button */}
                <TouchableOpacity
                    style={styles.filterButton}
                    onPress={() => setShowFilters(true)}
                >
                    <Image source={FilterIcon} style={styles.filterIcon} />
                    <Text style={styles.filterText}>Filters</Text>
                </TouchableOpacity>
            </View>

            {/* 🔄 Loader */}
            {loading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#155DFC" />
                    <Text style={styles.loadingText}>Searching...</Text>
                </View>
            )}

            {/* 📋 Search Results */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {!loading && businessList.length === 0 && (
                    <View style={styles.emptyState}>
                        <Text style={styles.placeholderText}>
                            {searchQuery ? 'No results found.' : 'Search for businesses to get started...'}
                        </Text>
                    </View>
                )}

                {businessList.map((business) => (
                    <SearchCard key={business._id} business={business} />
                ))}
            </ScrollView>

            {/* 🎛 Filters Modal */}
            <Modal
                visible={showFilters}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilters(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Filters</Text>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setShowFilters(false)}
                            >
                                <View style={styles.closeIconContainer}>
                                    <Text style={styles.closeIconText}>×</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalScrollView} showsVerticalScrollIndicator={false}>
                            {/* 📍 Current Location Toggle */}
                            <View style={styles.filterSection}>
                                <View style={styles.filterHeader}>
                                    <Image source={LocationIcon} style={styles.filterIcon} />
                                    <Text style={styles.filterTitle}>Location</Text>
                                </View>
                                <View style={styles.locationRow}>
                                    <Text style={styles.locationText}>Use Current Location</Text>
                                    <Switch
                                        value={useCurrentLocation}
                                        onValueChange={setUseCurrentLocation}
                                        thumbColor={useCurrentLocation ? '#155DFC' : '#f4f3f4'}
                                        trackColor={{ false: '#767577', true: '#c6d9ff' }}
                                    />
                                </View>
                            </View>

                            {/* 🏙️ City Selection - Show only when NOT using current location */}
                            {!useCurrentLocation && (
                                <View style={styles.filterSection}>
                                    <View style={styles.filterHeader}>
                                        <Image source={BusinessIcon} style={styles.filterIcon} />
                                        <Text style={styles.filterTitle}>Select City</Text>
                                    </View>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cityScroll}>
                                        {cities.map((city) => (
                                            <TouchableOpacity
                                                key={city}
                                                style={[
                                                    styles.cityChip,
                                                    selectedCity === city && styles.selectedCityChip
                                                ]}
                                                onPress={() => setSelectedCity(city)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.cityText,
                                                        selectedCity === city && styles.selectedCityText
                                                    ]}
                                                >
                                                    {city}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </View>
                            )}

                            {/* 📏 Radius Filter - Show only when using current location */}
                            {useCurrentLocation && (
                                <View style={styles.filterSection}>
                                    <View style={styles.filterHeader}>
                                        <Image source={NavigateIcon} style={styles.filterIcon} />
                                        <Text style={styles.filterTitle}>Search Radius</Text>
                                    </View>
                                    <View style={styles.radiusContainer}>
                                        <Text style={styles.radiusValue}>{radius} km</Text>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.radiusScroll}>
                                            <View style={styles.radiusButtons}>
                                                {radiusOptions.map((km) => (
                                                    <TouchableOpacity
                                                        key={km}
                                                        style={[
                                                            styles.radiusButton,
                                                            radius === km && styles.selectedRadiusButton
                                                        ]}
                                                        onPress={() => setRadius(km)}
                                                    >
                                                        <Text style={[
                                                            styles.radiusButtonText,
                                                            radius === km && styles.selectedRadiusButtonText
                                                        ]}>
                                                            {km} km
                                                        </Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </ScrollView>
                                    </View>
                                </View>
                            )}

                            {/* ⭐ Rating Filter */}
                            <View style={styles.filterSection}>
                                <View style={styles.filterHeader}>
                                    <Image source={StarIcon} style={styles.filterIcon} />
                                    <Text style={styles.filterTitle}>Minimum Rating</Text>
                                </View>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ratingScroll}>
                                    <View style={styles.ratingContainer}>
                                        {ratings.map((rate) => (
                                            <TouchableOpacity
                                                key={rate}
                                                style={[
                                                    styles.ratingChip,
                                                    ratingFilter === rate && styles.selectedRatingChip
                                                ]}
                                                onPress={() => setRatingFilter(rate)}
                                            >
                                                <Image
                                                    source={StarIcon}
                                                    style={[
                                                        styles.ratingStarIcon,
                                                        ratingFilter === rate && styles.selectedRatingStarIcon
                                                    ]}
                                                />
                                                <Text
                                                    style={[
                                                        styles.ratingText,
                                                        ratingFilter === rate && styles.selectedRatingText
                                                    ]}
                                                >
                                                    {rate}+
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </ScrollView>
                            </View>

                            {/* ⏰ Open Now */}
                            <View style={styles.filterSection}>
                                <View style={styles.openNowRow}>
                                    <Text style={styles.openNowText}>Open Now</Text>
                                    <Switch
                                        value={openNow}
                                        onValueChange={setOpenNow}
                                        thumbColor={openNow ? '#155DFC' : '#f4f3f4'}
                                        trackColor={{ false: '#767577', true: '#c6d9ff' }}
                                    />
                                </View>
                            </View>
                        </ScrollView>

                        <View style={styles.modalFooter}>
                            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
                                <Text style={styles.clearButtonText}>Clear All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
                                <Text style={styles.applyButtonText}>Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    searchContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e8ecf0',
    },
    // Search Row with Input and Button
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
        marginRight: 12,
    },
    searchIcon: {
        width: 16,  // Smaller icon
        height: 16, // Smaller icon
        tintColor: '#666',
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    searchActionButton: {
        paddingHorizontal: 16,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 70,
    },
    activeSearchButton: {
        backgroundColor: '#155DFC',
    },
    inactiveSearchButton: {
        backgroundColor: '#e8ecf0',
    },
    activeSearchText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    inactiveSearchText: {
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
    },
    // Filter Button
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 12,
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    filterIcon: {
        width: 16,
        height: 16,
        tintColor: '#155DFC',
        marginRight: 6,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#155DFC',
    },
    // Loading
    loadingContainer: {
        padding: 20,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 8,
        color: '#555',
        fontSize: 14,
    },
    // Content
    content: {
        flex: 1,
        padding: 16,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
    },
    placeholderText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 16,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e8ecf0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    closeButton: {
        padding: 4,
    },
    closeIconContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#FF4444',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeIconText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        lineHeight: 20,
    },
    modalScrollView: {
        padding: 16,
    },
    modalFooter: {
        flexDirection: 'row',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#e8ecf0',
        gap: 12,
    },
    clearButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: '#fff',
    },
    clearButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    applyButton: {
        flex: 2,
        backgroundColor: '#155DFC',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    // Filter Section Styles
    filterSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e8ecf0',
    },
    filterHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    filterIcon: {
        width: 18,
        height: 18,
        tintColor: '#155DFC',
    },
    filterTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
        marginLeft: 8,
    },
    locationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    cityScroll: {
        marginHorizontal: -4,
    },
    cityChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#e8e8e8',
    },
    selectedCityChip: {
        backgroundColor: '#155DFC',
        borderColor: '#155DFC',
    },
    cityText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    selectedCityText: {
        color: '#fff',
    },
    // Radius Filter Styles
    radiusContainer: {
        marginTop: 8,
    },
    radiusValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#155DFC',
        textAlign: 'center',
        marginBottom: 12,
    },
    radiusScroll: {
        marginHorizontal: -4,
    },
    radiusButtons: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 4,
    },
    radiusButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e8e8e8',
        flexShrink: 0,
    },
    selectedRadiusButton: {
        backgroundColor: '#155DFC',
        borderColor: '#155DFC',
    },
    radiusButtonText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    selectedRadiusButtonText: {
        color: '#fff',
    },
    // Rating Filter
    ratingScroll: {
        marginHorizontal: -4,
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: 8,
        paddingHorizontal: 4,
    },
    ratingChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        backgroundColor: '#f8f9fa',
        borderWidth: 1,
        borderColor: '#e8e8e8',
        flexShrink: 0,
    },
    selectedRatingChip: {
        backgroundColor: '#155DFC',
        borderColor: '#155DFC',
    },
    ratingStarIcon: {
        width: 16,
        height: 16,
        tintColor: '#FFD700',
    },
    selectedRatingStarIcon: {
        tintColor: '#fff',
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        marginLeft: 4,
    },
    selectedRatingText: {
        color: '#fff',
    },
    openNowRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    openNowText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
})