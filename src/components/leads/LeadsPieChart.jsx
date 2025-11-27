import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const LeadsPieChart = ({ leads, loading }) => {

  if (loading) {
    return (
      <View style={{ backgroundColor: "#34448B" }}>
        <View style={styles.card}>
          <Text style={styles.title}>Last 10 days leads Overview</Text>
          <View style={[styles.chartContainer, { justifyContent: 'center' }]}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      </View>
    );
  }

  const totalViews = leads.reduce((acc, item) => acc + item.viewProfile, 0);
  const totalMessages = leads.reduce((acc, item) => acc + item.message, 0);
  const totalCalls = leads.reduce((acc, item) => acc + item.call, 0);
  const totalMaps = leads.reduce((acc, item) => acc + item.map, 0);

  const totalAll = totalViews + totalMessages + totalCalls + totalMaps;

  const pieData = [
    {
      value: totalViews,
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
      label: 'Views',
      count: totalViews,
    },
    {
      value: totalMessages,
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
      label: 'Messages',
      count: totalMessages,
    },
    {
      value: totalCalls,
      color: '#BDB2FA',
      gradientCenterColor: '#8F80F3',
      label: 'Calls',
      count: totalCalls,
    },
    {
      value: totalMaps,
      color: '#FFA07A',
      gradientCenterColor: '#FF7F50',
      label: 'Maps',
      count: totalMaps,
    }
  ];

  const renderLegend = () => (
    <View style={{ backgroundColor: "#34448B" }}>
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>
              {item.label}: {item.count}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: "#34448B" }}>
      <View style={styles.card}>
        <Text style={styles.title}>Last 10 days leads Overview</Text>

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
                <Text style={styles.centerValue}>{totalAll}</Text>
                <Text style={styles.centerText}>Total Leads</Text>
              </View>
            )}
            // Show values on pie chart segments
            showText
            textColor="white"
            textSize={12}
            fontWeight="bold"
            // Custom text for segments
            textBackgroundRadius={15}
          />
        </View>

        {/* Legend below the chart */}
        {renderLegend()}
      </View>
    </View>
  );
};

export default LeadsPieChart;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#232B5D',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  chartContainer: {
    padding: 20,
    alignItems: 'center',
    minHeight: 230,
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
    color: '#fff',
    fontSize: 12,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
    flex: 1,
  },
});