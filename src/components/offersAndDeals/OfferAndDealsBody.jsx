import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const offersData = [
  {
    id: 1,
    discount: '20% OFF',
    tag: 'Featured',
    image: require('../../assets/images/images2/city.png'),
    title: '20% Off Weekend Stay',
    business: 'The Grand Plaza Hotel',
    rating: 4.8,
    description:
      'Enjoy luxury accommodation with 20% discount on weekend bookings. Includes complimentary breakfast and spa access.',
    validTill: 'Dec 31, 2024',
    code: 'WEEKEND20',
  },
  {
    id: 2,
    discount: '33% OFF',
    tag: 'Popular',
    image: require('../../assets/images/images2/city.png'),
    title: 'Buy 2 Get 1 Free',
    business: 'Bella Vista Restaurant',
    rating: 4.6,
    description:
      'Order any 2 main courses and get the third one absolutely free. Valid for dine-in only.',
    validTill: 'Dec 25, 2024',
    code: 'FAMILY3',
  },
];

const OfferAndDealsBody = ({ filter }) => {
  return (
    <View style={styles.listContainer}>
      {offersData.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* Image */}
          <View style={styles.imageContainer}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.discountTag}>
              <Text style={styles.discountText}>{item.discount}</Text>
            </View>
            <View style={styles.featuredTag}>
              <Image
                source={require('../../assets/images/saved.png')}
                style={[styles.shareIcon, { tintColor: '#000' }]}
              />
            </View>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.ratingRow}>
                <Image
                  source={require('../../assets/images/star.png')}
                  style={styles.starIcon}
                />
                <Text style={styles.rating}>{item.rating}</Text>
              </View>
            </View>

            <Text style={styles.business}>{item.business}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            {/* Validity */}
            <View style={styles.validRow}>
              <Image
                source={require('../../assets/images/clock.png')}
                style={styles.clockIcon}
              />
              <Text style={styles.validText}>Valid until {item.validTill}</Text>
            </View>

            {/* Promo Code */}
            <View style={styles.codeRow}>
              <Text style={styles.codeLabel}>Promo Code</Text>
              <View style={styles.codeBox}>
                <Text style={styles.code}>{item.code}</Text>
                <TouchableOpacity style={styles.copyBtn}>
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Claim Offer */}
            <View style={styles.claimRow}>
              <TouchableOpacity style={styles.claimBtn}>
                <Image
                  source={require('../../assets/images/gift.png')}
                  style={styles.shareIcon}
                />
                <Text style={styles.claimText}>Claim Offer</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.shareBtn}>
                <Image
                  source={require('../../assets/images/share.png')}
                  style={[styles.shareIcon, { tintColor: '#000' }]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default OfferAndDealsBody;

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF4040',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  featuredTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFFCC',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  content: {
    padding: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 13,
    height: 13,
    tintColor: '#FFD700',
    marginRight: 3,
  },
  rating: {
    fontSize: 13,
    color: '#444',
  },
  business: {
    color: '#777',
    marginTop: 2,
    marginBottom: 4,
  },
  desc: {
    color: '#555',
    fontSize: 13,
    marginBottom: 8,
  },
  validRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
    tintColor: '#444',
  },
  validText: {
    fontSize: 12,
    color: '#444',
  },
  codeRow: {
    backgroundColor : "#F8FAFC",
    padding : 10,
    borderRadius : 8,
    marginTop: 6,
    flexDirection: 'column',
  },
  codeLabel: {
    fontSize: 12,
    color: '#777',
  },
  codeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  code: {
    backgroundColor: '#F4F4F4',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  copyBtn: {
    backgroundColor: '#fff',
    borderWidth : 1,
    borderColor : "#d3d3d3",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 6,
  },
  copyText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '500',
  },
  claimRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  claimBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    backgroundColor: '#2456FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  claimText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  shareBtn: {
    marginLeft: 10,
    backgroundColor: '#F3F4F6',
    padding: 10,
    borderRadius: 8,
  },
  shareIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
});
