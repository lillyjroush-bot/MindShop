import {
  View, Text, ScrollView, StyleSheet, SafeAreaView,
} from 'react-native';
import { colors } from '../constants/theme';
import { SAMPLE_ITEMS, DEFAULT_LISTS } from '../data/sampleData';

const MONTH = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

const STAT_CONFIG = [
  { verdict: 'yes',   label: 'Still Want',  symbol: '✓', bg: '#eaf4ef', text: '#2d6a4f' },
  { verdict: 'no',    label: 'Over It',     symbol: '✕', bg: '#fdecea', text: '#9b2c2c' },
  { verdict: 'maybe', label: 'Not Sure',    symbol: '～', bg: '#fdf3e3', text: '#7a5c1e' },
  { verdict: null,    label: 'Unreviewed',  symbol: '·', bg: colors.gray1, text: colors.gray4 },
];

export default function RecapScreen() {
  // In production this would come from shared state; using sample data for now
  const items = SAMPLE_ITEMS;
  const lists = DEFAULT_LISTS;

  const totalValue = items.reduce((sum, i) => sum + i.price, 0);
  const removedValue = items
    .filter((i) => i.verdict === 'no')
    .reduce((sum, i) => sum + i.price, 0);
  const keptValue = items
    .filter((i) => i.verdict === 'yes')
    .reduce((sum, i) => sum + i.price, 0);

  function countByVerdict(verdict) {
    return verdict === null
      ? items.filter((i) => i.verdict === null).length
      : items.filter((i) => i.verdict === verdict).length;
  }

  function listStats(listName) {
    const listItems = items.filter((i) => i.list === listName);
    const total = listItems.reduce((sum, i) => sum + i.price, 0);
    return { count: listItems.length, total };
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Month label */}
        <Text style={styles.month}>{MONTH}</Text>

        {/* 2x2 stat grid */}
        <View style={styles.grid}>
          {STAT_CONFIG.map((stat) => (
            <View key={String(stat.verdict)} style={[styles.statCell, { backgroundColor: stat.bg }]}>
              <Text style={[styles.statSymbol, { color: stat.text }]}>{stat.symbol}</Text>
              <Text style={[styles.statCount, { color: stat.text }]}>{countByVerdict(stat.verdict)}</Text>
              <Text style={[styles.statLabel, { color: stat.text }]}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Dark summary card */}
        <View style={styles.darkCard}>
          <Text style={styles.darkCardLabel}>Still in consideration</Text>
          <Text style={styles.darkCardValue}>${keptValue.toFixed(0)}</Text>
          <View style={styles.darkDivider} />
          <View style={styles.darkRow}>
            <Text style={styles.darkRowLabel}>Removed</Text>
            <Text style={styles.darkRowValue}>${removedValue.toFixed(0)}</Text>
          </View>
          <View style={styles.darkRow}>
            <Text style={styles.darkRowLabel}>Total saves</Text>
            <Text style={styles.darkRowValue}>{items.length}</Text>
          </View>
        </View>

        {/* By List */}
        <Text style={styles.sectionLabel}>By List</Text>
        <View style={styles.byListCard}>
          {lists.map((list, i) => {
            const { count, total } = listStats(list);
            return (
              <View key={list}>
                {i > 0 && <View style={styles.listDivider} />}
                <View style={styles.listRow}>
                  <Text style={styles.listName}>{list}</Text>
                  <View style={styles.listRight}>
                    <Text style={styles.listCount}>{count} items</Text>
                    <Text style={styles.listTotal}>${total}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { padding: 16, paddingBottom: 40 },
  month: {
    fontSize: 11, fontWeight: '600', color: colors.gray3,
    letterSpacing: 1.5, marginBottom: 16,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 16 },
  statCell: {
    width: '47%', borderRadius: 14, padding: 16,
    alignItems: 'center', gap: 4,
  },
  statSymbol: { fontSize: 22 },
  statCount: { fontSize: 28, fontWeight: '700' },
  statLabel: { fontSize: 11, fontWeight: '600' },
  darkCard: {
    backgroundColor: colors.black, borderRadius: 14,
    padding: 20, marginBottom: 24,
  },
  darkCardLabel: { fontSize: 12, color: colors.gray3, marginBottom: 4 },
  darkCardValue: { fontSize: 32, fontWeight: '700', color: colors.white, marginBottom: 16 },
  darkDivider: { height: 1, backgroundColor: '#333', marginBottom: 12 },
  darkRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  darkRowLabel: { fontSize: 13, color: colors.gray3 },
  darkRowValue: { fontSize: 13, fontWeight: '600', color: colors.white },
  sectionLabel: {
    fontSize: 11, fontWeight: '600', color: colors.gray3,
    letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10,
  },
  byListCard: {
    backgroundColor: colors.white, borderRadius: 14,
    borderWidth: 1, borderColor: colors.gray2, overflow: 'hidden',
  },
  listRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14,
  },
  listDivider: { height: 1, backgroundColor: colors.gray2, marginHorizontal: 16 },
  listName: { fontSize: 14, fontWeight: '600', color: colors.black },
  listRight: { alignItems: 'flex-end' },
  listCount: { fontSize: 12, color: colors.gray3 },
  listTotal: { fontSize: 13, fontWeight: '700', color: colors.black },
});
