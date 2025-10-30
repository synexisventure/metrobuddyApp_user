import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const LeadsPieChart = () => {
  const pieData = [
    {
      value: 47,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
    { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
    // { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
  ];

  const renderDot = color => (
    <View style={[styles.dot, { backgroundColor: color }]} />
  );

  const renderLegendComponent = () => (
    <>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          {renderDot('#006DFF')}
          <Text style={styles.legendText}>Search : 47%</Text>
        </View>
        <View style={styles.legendItem}>
          {renderDot('#8F80F3')}
          <Text style={styles.legendText}>Trendings : 16%</Text>
        </View>
      </View>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          {renderDot('#3BE9DE')}
          <Text style={styles.legendText}>Social Media Share: 40%</Text>
        </View>
        {/* <View style={styles.legendItem}>
          {renderDot('#FF7F97')}
          <Text style={styles.legendText}>Poor: 3%</Text>
        </View> */}
      </View>
    </>
  );

  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.title}>Lead Source Overview </Text>
        <View style={styles.chartContainer}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#232B5D'}
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <Text style={styles.centerValue}>47%</Text>
                <Text style={styles.centerText}>Search</Text>
              </View>
            )}
          />
        </View>
        {renderLegendComponent()}
      </View>
    </View>
  );
};

export default LeadsPieChart;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingVertical: 60,
    backgroundColor: '#34448B',
  },
  card: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#232B5D',
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chartContainer: {
    padding: 20,
    alignItems: 'center',
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerValue: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  centerText: {
    fontSize: 14,
    color: 'white',
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: 160,
    marginRight: 20,
  },
  legendText: {
    color: 'white',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
});
