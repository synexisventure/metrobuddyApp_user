import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';

// Local icon
const RIGHT_ARROW = require('../../assets/images/forward_icon.png'); 

const faqData = [
  {
    question: 'How do I reset my password?',
    category: 'Account',
    answer: "Go to Settings > Account > Change Password, or use the 'Forgot Password' link on the login screen.",
  },
  {
    question: 'How can I add my business to MetroBuddy?',
    category: 'Business',
    answer: '',
  },
  {
    question: "Why can’t I see some businesses in my area?",
    category: 'Search',
    answer: '',
  },
  {
    question: 'How do I write a review?',
    category: 'Reviews',
    answer: '',
  },
  {
    question: 'Can I edit or delete my review?',
    category: 'Reviews',
    answer: '',
  },
  {
    question: 'How do I save a business to favorites?',
    category: 'Favorites',
    answer: '',
  },
  {
    question: 'Is MetroBuddy free to use?',
    category: 'General',
    answer: '',
  },
  {
    question: 'How do I report inappropriate content?',
    category: 'Safety',
    answer: '',
  },
];

const FaQ = () => {
  return (
    <ScrollView
     style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle ={{
        paddingBottom : 10
      }}>
      {faqData.map((item, index) => (
        <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8}>
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Text style={styles.question}>{item.question}</Text>
              <View style={styles.categoryContainer}>
                <Text style={styles.category}>{item.category}</Text>
              </View>
              {item.answer ? <Text style={styles.answer}>{item.answer}</Text> : null}
            </View>
            <Image source={RIGHT_ARROW} style={styles.arrow} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FaQ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 10,

  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5', // light grey border to match image
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  question: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 6,
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8F8F8', // subtle light gray background
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 6,
  },
  category: {
    fontSize: 12,
    color: '#555',
  },
  answer: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    lineHeight: 18,
  },
  arrow: {
    width: 14,
    height: 14,
    tintColor: '#9a9a9a',
    marginLeft: 10,
    marginTop: 3,
  },
});
