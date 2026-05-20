import { useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { colors, radii } from '../constants/theme';

export default function PinModal({ visible, lists, onClose, onPin, onAddList }) {
  const [name, setName] = useState('');
  const [store, setStore] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedList, setSelectedList] = useState(lists[0] ?? '');

  function handlePin() {
    if (!name.trim()) return;
    onPin({
      id: Date.now(),
      name: name.trim(),
      store: store.trim(),
      price: parseFloat(price) || 0,
      image: imageUrl.trim(),
      savedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      list: selectedList,
      verdict: null,
      notes: '',
    });
    resetAndClose();
  }

  function resetAndClose() {
    setName(''); setStore(''); setPrice(''); setImageUrl('');
    setSelectedList(lists[0] ?? '');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={resetAndClose}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.back}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Pin a Product</Text>
            <View style={{ width: 32 }} />
          </View>

          <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
            <Field label="Name" value={name} onChangeText={setName} placeholder="Product name" />
            <Field label="Store" value={store} onChangeText={setStore} placeholder="e.g. Parachute" />
            <Field label="Price ($)" value={price} onChangeText={setPrice} placeholder="0.00" keyboardType="decimal-pad" />
            <Field label="Image URL" value={imageUrl} onChangeText={setImageUrl} placeholder="https://... (optional)" autoCapitalize="none" />

            {/* List selector */}
            <Text style={styles.fieldLabel}>List</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listRow}>
              {lists.map((list) => (
                <TouchableOpacity
                  key={list}
                  style={[styles.listPill, selectedList === list && styles.listPillActive]}
                  onPress={() => setSelectedList(list)}
                  accessibilityRole="button"
                  accessibilityState={{ selected: selectedList === list }}
                >
                  <Text style={[styles.listPillText, selectedList === list && styles.listPillTextActive]}>
                    {list}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.newListPill}
                onPress={onAddList}
                accessibilityRole="button"
                accessibilityLabel="Create new list"
              >
                <Text style={styles.newListPillText}>+ New List</Text>
              </TouchableOpacity>
            </ScrollView>
          </ScrollView>

          {/* Pin It button */}
          <TouchableOpacity
            style={[styles.pinButton, !name.trim() && styles.pinButtonDisabled]}
            onPress={handlePin}
            disabled={!name.trim()}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Pin product"
          >
            <Text style={styles.pinButtonText}>Pin It</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

function Field({ label, ...props }) {
  return (
    <View style={styles.fieldWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput style={styles.input} placeholderTextColor={colors.gray3} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.bg, paddingBottom: 24 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: colors.gray2,
  },
  back: { fontSize: 22, color: colors.black, width: 32 },
  title: { fontSize: 16, fontWeight: '700', color: colors.black },
  form: { flex: 1, padding: 16 },
  fieldWrapper: { marginBottom: 16 },
  fieldLabel: { fontSize: 11, fontWeight: '600', color: colors.gray3, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 },
  input: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray2,
    borderRadius: radii.card, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: colors.black,
  },
  listRow: { flexDirection: 'row', gap: 8, paddingBottom: 8 },
  listPill: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: colors.gray2, backgroundColor: colors.white,
  },
  listPillActive: { backgroundColor: colors.black, borderColor: colors.black },
  listPillText: { fontSize: 13, fontWeight: '600', color: colors.gray4 },
  listPillTextActive: { color: colors.white },
  newListPill: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    borderWidth: 1, borderColor: colors.gray2, borderStyle: 'dashed',
  },
  newListPillText: { fontSize: 13, color: colors.gray4 },
  pinButton: {
    backgroundColor: colors.black, marginHorizontal: 16,
    paddingVertical: 16, borderRadius: radii.button, alignItems: 'center',
  },
  pinButtonDisabled: { opacity: 0.4 },
  pinButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
