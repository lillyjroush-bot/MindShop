import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { colors, radii } from '../constants/theme';

export default function FilterPills({ lists, activeList, onSelectList, onAddList }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* "All" pill */}
      <Pill
        label="All"
        active={activeList === 'All'}
        onPress={() => onSelectList('All')}
      />

      {/* One pill per list */}
      {lists.map((list) => (
        <Pill
          key={list}
          label={list}
          active={activeList === list}
          onPress={() => onSelectList(list)}
        />
      ))}

      {/* Add list button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAddList}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel="Create new list"
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Pill({ label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={label}
    >
      <Text style={[styles.pillText, active ? styles.pillTextActive : styles.pillTextInactive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pillActive: {
    backgroundColor: colors.black,
  },
  pillInactive: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray2,
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextActive: {
    color: colors.white,
  },
  pillTextInactive: {
    color: colors.gray4,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 22,
  },
});
