import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, radii } from '../constants/theme';

const VERDICT_CONFIG = {
  yes:   { bg: colors.verdictYesBg,   text: colors.verdictYesText,   symbol: '✓' },
  no:    { bg: colors.verdictNoBg,    text: colors.verdictNoText,    symbol: '✕' },
  maybe: { bg: colors.verdictMaybeBg, text: colors.verdictMaybeText, symbol: '～' },
};

function VerdictBadge({ verdict }) {
  if (!verdict) return null;
  const config = VERDICT_CONFIG[verdict];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.badgeSymbol, { color: config.text }]}>{config.symbol}</Text>
    </View>
  );
}

export default function ProductCard({ item, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, $${item.price}, from ${item.store}`}
    >
      {/* Product image */}
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        accessibilityLabel={item.name}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.meta}>{item.store} · {item.list}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
          <Text style={styles.date}>{item.savedDate}</Text>
        </View>
        {item.notes ? (
          <Text style={styles.notes} numberOfLines={1}>{item.notes}</Text>
        ) : null}
      </View>

      {/* Verdict badge */}
      <VerdictBadge verdict={item.verdict} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.gray1,
    borderRadius: radii.card,
    marginHorizontal: 16,
    marginBottom: 10,
    overflow: 'hidden',
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 0,
    backgroundColor: colors.gray2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  name: {
    ...typography.cardName,
    color: colors.black,
    marginBottom: 3,
  },
  meta: {
    ...typography.body,
    color: colors.gray3,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    ...typography.priceCard,
    color: colors.black,
  },
  date: {
    ...typography.body,
    color: colors.gray3,
  },
  notes: {
    ...typography.body,
    color: colors.gray4,
    fontStyle: 'italic',
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: radii.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSymbol: {
    fontSize: 11,
    fontWeight: '700',
  },
});
