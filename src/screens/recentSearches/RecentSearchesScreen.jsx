import React, { useContext, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { AppContext } from '../../context/AppContext';
import { useNavigation } from '@react-navigation/native';

const CLOCK_ICON = require('../../assets/images/clock.png');

const RecentSearchesScreen = () => {
  
  const {
    allSearchHistory,
    allSearchHistoryLoading,
    fetchAllSearchHistory,
    searchCurrentPage,
    searchTotalPages,
  } = useContext(AppContext);

  const scrollRef = useRef(null); // Scroll reference
  const navigation = useNavigation();

  // First page load
  useEffect(() => {
    fetchAllSearchHistory(1);
  }, []);

  // Go to page + refresh UI
  const goToPage = useCallback(
    (page) => {
      if (page >= 1 && page <= searchTotalPages) {
        // Scroll to top when page changes
        scrollRef.current?.scrollTo({ y: 0, animated: true });

        // Fetch new page data
        fetchAllSearchHistory(page);
      }
    },
    [searchTotalPages]
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity
          onPress={() => {
            console.log("pressed...");
            navigation.goBack();
          }}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.arrow}>{'‹'}</Text>
            <Text style={styles.header}>Recent Searches</Text>
          </View>
        </TouchableOpacity>

        {/* List */}
        <View style={styles.listContainer}>
          {allSearchHistory.map((item) => (
            <View key={item._id} style={styles.itemCard}>
              <Image source={CLOCK_ICON} style={styles.icon} />
              <Text style={styles.itemText}>{item.query}</Text>
            </View>
          ))}

          {allSearchHistoryLoading && (
            <Text style={styles.loaderText}>Loading...</Text>
          )}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Clear Search History</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Pagination */}
      {searchTotalPages > 1 && (
        <View style={styles.paginationContainer}>
          {/* Prev */}
          <TouchableOpacity
            disabled={searchCurrentPage === 1}
            style={[
              styles.pageButton,
              searchCurrentPage === 1 && styles.disabledBtn,
            ]}
            onPress={() => goToPage(searchCurrentPage - 1)}
          >
            <Text style={styles.pageText}>Prev</Text>
          </TouchableOpacity>

          {/* Page Numbers */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({ length: searchTotalPages }).map((_, index) => {
              const page = index + 1;
              return (
                <TouchableOpacity
                  key={page}
                  style={[
                    styles.pageNumber,
                    searchCurrentPage === page && styles.activePage,
                  ]}
                  onPress={() => goToPage(page)}
                >
                  <Text
                    style={[
                      styles.pageText,
                      searchCurrentPage === page && styles.activePageText,
                    ]}
                  >
                    {page}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Next */}
          <TouchableOpacity
            disabled={searchCurrentPage === searchTotalPages}
            style={[
              styles.pageButton,
              searchCurrentPage === searchTotalPages && styles.disabledBtn,
            ]}
            onPress={() => goToPage(searchCurrentPage + 1)}
          >
            <Text style={styles.pageText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RecentSearchesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  container: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  arrow: {
    fontSize: 20,
    color: '#374151',
    marginRight: 6,
  },

  header: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },

  listContainer: {
    marginTop: 4,
  },

  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 10,
  },

  icon: {
    width: 16,
    height: 16,
    tintColor: '#6B7280',
    marginRight: 10,
  },

  itemText: {
    fontSize: 14,
    color: '#111827',
  },

  clearButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },

  clearText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },

  loaderText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#6B7280',
  },

  /* Pagination styles */

  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },

  pageButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 4,
  },

  pageNumber: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 4,
  },

  pageText: {
    fontSize: 14,
    color: '#000',
  },

  activePage: {
    backgroundColor: '#B91C1C',
    borderColor: '#B91C1C',
  },

  activePageText: {
    color: '#FFFFFF',
  },

  disabledBtn: {
    opacity: 0.4,
  },
});
