import { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, radii } from '../constants/theme';
import ProductCard from '../components/ProductCard';
import FilterPills from '../components/FilterPills';
import PinModal from '../components/PinModal';
import NewListModal from '../components/NewListModal';
import ItemDetailModal from '../components/ItemDetailModal';

export default function SavesScreen({ items, setItems, lists, setLists }) {
  const [activeList, setActiveList] = useState('All');
  const [pinModalVisible, setPinModalVisible] = useState(false);
  const [newListModalVisible, setNewListModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems =
    activeList === 'All' ? items : items.filter((i) => i.list === activeList);

  function handlePin(newItem) {
    setItems((prev) => [newItem, ...prev]);
  }

  function handleCreateList({ name, symbol }) {
    setLists((prev) => [...prev, name]);
    setNewListModalVisible(false);
  }

  function handleSaveItem(id, updates) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>MindShop</Text>
          <Text style={styles.tagline}>your mindful cart · {items.length} saves</Text>
        </View>
        <TouchableOpacity
          style={styles.pinButton}
          onPress={() => setPinModalVisible(true)}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Pin a product"
        >
          <Text style={styles.pinButtonText}>+ Pin</Text>
        </TouchableOpacity>
      </View>

      {/* Filter pills */}
      <FilterPills
        lists={lists}
        activeList={activeList}
        onSelectList={setActiveList}
        onAddList={() => setNewListModalVisible(true)}
      />

      {/* Item list or empty state */}
      {filteredItems.length === 0 ? (
        <EmptyState onPin={() => setPinModalVisible(true)} />
      ) : (
        <ScrollView
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        >
          {filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={() => setSelectedItem(item)}
            />
          ))}
        </ScrollView>
      )}

      {/* Modals */}
      <PinModal
        visible={pinModalVisible}
        lists={lists}
        onClose={() => setPinModalVisible(false)}
        onPin={handlePin}
        onAddList={() => {
          setPinModalVisible(false);
          setNewListModalVisible(true);
        }}
      />

      <NewListModal
        visible={newListModalVisible}
        onClose={() => setNewListModalVisible(false)}
        onCreate={handleCreateList}
      />

      <ItemDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSave={handleSaveItem}
      />
    </SafeAreaView>
  );
}

function EmptyState({ onPin }) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyIcon}>🔖</Text>
      <Text style={styles.emptyText}>Nothing pinned here yet</Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={onPin}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="Pin a product"
      >
        <Text style={styles.emptyButtonText}>+ Pin something</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 0,
  },
  appTitle: {
    ...typography.appTitle,
    color: colors.black,
  },
  tagline: {
    fontSize: 12,
    color: colors.gray3,
    marginTop: 2,
  },
  pinButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.buttonPill,
  },
  pinButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 15,
    color: colors.gray4,
    fontWeight: '500',
  },
  emptyButton: {
    backgroundColor: colors.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.buttonPill,
    marginTop: 4,
  },
  emptyButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
});
