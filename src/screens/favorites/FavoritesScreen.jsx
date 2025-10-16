import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

// Import all child components
import FavoritesHeader from '../../components/favorite/FavoritesHeader';
import CategoryTabSelector from '../../components/favorite/CategoryTabSelector';
import FavoritesCardHandler from '../../components/favorite/FavoritesCardHandler'; // The list component

const favoritesData = [
  {
    id: '1', name: 'The Grand Plaza Hotel', category: 'Hotels',
    rating: 4.8, distance: '1.2 km', isFeatured: true, isOpen: true,
    image: require('../../assets/images/trendingNow/hotel.png'), // Placeholder
  },
  {
    id: '2', name: 'Royal Heritage Hotel', category: 'Hotels',
    rating: 4.7, distance: '2.5 km', isFeatured: false, isOpen: true,
    image: require('../../assets/images/trendingNow/hotel.png'), // Placeholder
  },
  {
    id: '3', name: 'Serenity Spa', category: 'Beauty & Spa',
    rating: 4.9, distance: '1.5 km', isFeatured: true, isOpen: true,
    image: require('../../assets/images/trendingNow/hotel.png'), // Placeholder
  },
  {
    id: '4', name: 'Bella Vista Restaurant', category: 'Restaurants',
    rating: 4.6, distance: '0.8 km', isFeatured: false, isOpen: false, // Closed on Mondays
    image: require('../../assets/images/trendingNow/hotel.png'), // Placeholder
  },
  {
    id: '5', name: 'Serenity Spa', category: 'Beauty & Spa',
    rating: 4.9, distance: '1.5 km', isFeatured: true, isOpen: true,
    image: require('../../assets/images/trendingNow/hotel.png'), // Placeholder
  },
  {
    id: '6', name: 'Bella Vista Restaurant', category: 'Restaurants',
    rating: 4.6, distance: '0.8 km', isFeatured: false, isOpen: false, // Closed on Mondays
    image: require('../../assets/images/trendingNow/hotel.png'), // Placeholder
  },
];

const FavoritesScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = React.useState('All');
  const [isGridView, setIsGridView] = React.useState(true);

  const filteredData = favoritesData.filter(item =>
    selectedTab === 'All' || item.category === selectedTab
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={isGridView ? 'GRID' : 'LIST'}
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={isGridView ? 2 : 1}
        columnWrapperStyle={isGridView ? styles.columnWrapper : null}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <View>
            <FavoritesHeader
              navigation={navigation}
              totalPlaces={favoritesData.length}
              isGridView={isGridView}
              toggleView={() => setIsGridView((prev) => !prev)}
            />
            <CategoryTabSelector selectedTab={selectedTab} onSelectTab={setSelectedTab} />
          </View>
        }
        renderItem={({ item }) => (
          <FavoritesCardHandler item={item} isGridView={isGridView} />
        )}
        style={styles.list}
      />

    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  list: {
    paddingTop: 10,
  }
});



