import { View, Text, StyleSheet } from 'react-native';

export default function RecapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Recap</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafaf9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111110',
  },
});
