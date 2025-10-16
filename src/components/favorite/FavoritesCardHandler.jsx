import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const STAR_ICON = require('../../assets/images/star.png');
const HEART_ICON = require('../../assets/images/redHeart.png');
const SHARE_ICON = require('../../assets/images/share.png');    
const CLOCK_ICON = require('../../assets/images/clock.png');   
const TICK_ICON = require('../../assets/images/check.png');     

// Accept isGridView prop (passed from FavoritesScreen)
const FavoritesCardHandler = ({ item, isGridView }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isGridView ? styles.cardGrid : styles.cardList]}
      activeOpacity={0.85}
    >
      {/* Image Section */}
      <View style={[styles.imageWrapper, isGridView ? styles.imageGrid : styles.imageList]}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        {/* Heart Icon (always shown) */}
        <TouchableOpacity style={styles.heartWrapper}>
          <Image source={HEART_ICON} style={styles.heartIcon} />
        </TouchableOpacity>

        {/* Featured Tag */}
        {item.isFeatured && (
          <View style={styles.featureTag}>
            <Text style={styles.featureText}>Featured</Text>
          </View>
        )}

        {/* Closed Overlay */}
        {!item.isOpen && (
          <View style={styles.closedOverlay}>
            <Text style={styles.closedText}>Closed</Text>
          </View>
        )}
      </View>

      {/* Info Section */}
      <View style={[styles.infoBox, isGridView ? styles.infoGrid : styles.infoList]}>
        <Text numberOfLines={1} style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.ratingBox}>
            <Image source={STAR_ICON} style={styles.starIcon} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>

          <Text style={styles.distanceText}>{item.distance}</Text>
        </View>

        {/* EXTRA ICONS: show only in LIST (1-col) view */}
        {!isGridView && (
          <View style={styles.extraRow}>
            <View style={styles.leftExtras}>
              <Image source={CLOCK_ICON} style={styles.smallIcon} />
              <Text style={styles.clockText}> 24/7</Text>
            </View>

            <View style={styles.rightExtras}>
              <TouchableOpacity style={styles.iconBtn}>
                <Image source={SHARE_ICON} style={styles.actionIcon} />
              </TouchableOpacity>

              {/* <TouchableOpacity style={styles.iconBtn}>
                <Image source={HEART_ICON} style={styles.actionIcon} />
              </TouchableOpacity> */}

              {/* optional tick if open */}
              {item.isOpen && (
                <View style={styles.tickWrap}>
                  <Image source={TICK_ICON} style={styles.tickIcon} />
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default FavoritesCardHandler;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16, 
    borderWidth : 1,
    borderColor : "#e2e8f0"
  },

  // Grid (2-col) outer tweaks (keep same look)
  cardGrid: {
    marginHorizontal: 8,
    flex: 1,
  },
  imageGrid: {
    height: 150,
    width: '100%',
  },
  infoGrid: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  // List (1-col) outer tweaks (full-width styled like your image)
  cardList: {
    marginHorizontal: 10,
  },
  imageList: {
    height: 180,
    width: '100%',
  },
  infoList: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  // Image + overlays
  imageWrapper: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartWrapper: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFFCC',
    padding: 6,
    borderRadius: 10,
    elevation: 2,
  },
  heartIcon: {
    width: 21,
    height: 18,
    tintColor: '#FF3D5A',
  },
  featureTag: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#FF8A00',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featureText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  closedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000066',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closedText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // Info
  infoBox: {},
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  category: {
    fontSize: 13,
    color: '#777',
    marginTop: 4,
    marginBottom: 8,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 12,
    height: 12,
    tintColor: '#FFC107',
    marginRight: 6,
  },
  ratingText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '600',
  },
  distanceText: {
    fontSize: 13,
    color: '#666',
  },

  // Extras row for list-only view
  extraRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftExtras: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallIcon: {
    width: 16,
    height: 16,
    tintColor: '#7A8FA6',
  },
  clockText: {
    fontSize: 13,
    color: '#7A8FA6',
    marginLeft: 6,
  },

  rightExtras: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 10,
    padding: 6,
  },
  actionIcon: {
    width: 18,
    height: 18,
    tintColor: '#7A8FA6',
  },

  tickWrap: {
    marginLeft: 10,
    backgroundColor: '#E6F9EC',
    padding: 6,
    borderRadius: 8,
  },
  tickIcon: {
    width: 14,
    height: 14,
    tintColor: '#30D158',
  },
});
