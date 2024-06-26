import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeaderboardRow = ({ username, playersFound, attemptsMissed, score }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.cell}>{username}</Text>
      <Text style={styles.cell}>{playersFound}</Text>
      <Text style={styles.cell}>{attemptsMissed}</Text>
      <Text style={styles.cell}>{score}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default LeaderboardRow;
