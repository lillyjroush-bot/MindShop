import { useState } from 'react';
import {
  View, Text, Image, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView,
} from 'react-native';
import { colors, radii } from '../constants/theme';
import { SAMPLE_ITEMS } from '../data/sampleData';

const VERDICT_OPTIONS = [
  { value: 'yes',   label: 'Still Want It', symbol: '✓', bg: '#eaf4ef', text: '#2d6a4f' },
  { value: 'maybe', label: 'Not Sure',       symbol: '～', bg: '#fdf3e3', text: '#7a5c1e' },
  { value: 'no',    label: 'Over It',        symbol: '✕', bg: '#fdecea', text: '#9b2c2c' },
];

export default function ReviewScreen() {
  const [items, setItems] = useState(SAMPLE_ITEMS);
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviewed = items.filter((i) => i.verdict !== null);
  const unreviewed = items.filter((i) => i.verdict === null);
  const allDone = unreviewed.length === 0;
  const current = unreviewed[currentIndex] ?? null;

  function handleVerdict(verdict) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === current.id ? { ...item, verdict } : item
      )
    );
    // Stay at same index — next unreviewed slides in
  }

  if (allDone) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.doneState}>
          <Text style={styles.doneIcon}>✓</Text>
          <Text style={styles.doneTitle}>All reviewed!</Text>
          <Text style={styles.doneSub}>Head to Recap to see your totals.</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!current) return null;

  const total = items.length;
  const doneCount = reviewed.length;

  return (
    <SafeAreaView style={styles.safe}>
      {/* Progress dots */}
      <View style={styles.dotsRow}>
        {items.map((item) => (
          <View
            key={item.id}
            style={[styles.dot, item.verdict !== null && styles.dotDone]}
          />
        ))}
      </View>
      <Text style={styles.counter}>{doneCount} of {total}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product image */}
        <Image source={{ uri: current.image }} style={styles.image} />

        <View style={styles.body}>
          <Text style={styles.meta}>{current.store} · {current.savedDate}</Text>
          <Text style={styles.name}>{current.name}</Text>
          <Text style={styles.price}>${current.price}</Text>

          <View style={styles.divider} />

          <Text style={styles.question}>Do you still want this?</Text>

          <View style={styles.verdictRow}>
            {VERDICT_OPTIONS.map((opt) => (
              <TouchableOpacity
                key={opt.value}
                style={[styles.verdictButton, { backgroundColor: opt.bg }]}
                onPress={() => handleVerdict(opt.value)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={opt.label}
              >
                <Text style={[styles.verdictSymbol, { color: opt.text }]}>{opt.symbol}</Text>
                <Text style={[styles.verdictLabel, { color: opt.text }]}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  dotsRow: {
    flexDirection: 'row', justifyContent: 'center',
    gap: 6, paddingTop: 16, paddingBottom: 8, flexWrap: 'wrap', paddingHorizontal: 16,
  },
  dot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.gray2,
  },
  dotDone: { backgroundColor: colors.accent },
  counter: {
    textAlign: 'center', fontSize: 12,
    color: colors.gray3, marginBottom: 12,
  },
  image: { width: '100%', height: 260, backgroundColor: colors.gray2 },
  body: { padding: 20 },
  meta: { fontSize: 12, color: colors.gray3, marginBottom: 6 },
  name: { fontSize: 20, fontWeight: '700', color: colors.black, marginBottom: 6 },
  price: { fontSize: 22, fontWeight: '700', color: colors.accent },
  divider: { height: 1, backgroundColor: colors.gray2, marginVertical: 20 },
  question: { fontSize: 13, color: colors.gray4, textAlign: 'center', marginBottom: 14 },
  verdictRow: { flexDirection: 'row', gap: 8 },
  verdictButton: {
    flex: 1, alignItems: 'center', paddingVertical: 14,
    borderRadius: radii.button,
  },
  verdictSymbol: { fontSize: 18, marginBottom: 4 },
  verdictLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  doneState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  doneIcon: { fontSize: 48, color: colors.accent },
  doneTitle: { fontSize: 22, fontWeight: '700', color: colors.black },
  doneSub: { fontSize: 14, color: colors.gray4 },
});
