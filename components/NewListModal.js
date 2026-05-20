import { useState } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity,
  StyleSheet, FlatList,
} from 'react-native';
import { colors, radii } from '../constants/theme';

const SYMBOLS = ['—', '·', '○', '△', '□', '◇', '/', '∞'];

export default function NewListModal({ visible, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('·');

  function handleCreate() {
    if (!name.trim()) return;
    onCreate({ name: name.trim(), symbol });
    setName(''); setSymbol('·');
    onClose();
  }

  function handleClose() {
    setName(''); setSymbol('·');
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleClose} accessibilityRole="button" accessibilityLabel="Close">
            <Text style={styles.back}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>New List</Text>
          <View style={{ width: 32 }} />
        </View>

        <View style={styles.body}>
          {/* Name input */}
          <Text style={styles.label}>List Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="e.g. For Me"
            placeholderTextColor={colors.gray3}
            autoFocus
          />

          {/* Symbol picker */}
          <Text style={[styles.label, { marginTop: 24 }]}>Symbol</Text>
          <View style={styles.symbolGrid}>
            {SYMBOLS.map((s) => (
              <TouchableOpacity
                key={s}
                style={[styles.symbolButton, symbol === s && styles.symbolButtonActive]}
                onPress={() => setSymbol(s)}
                accessibilityRole="button"
                accessibilityState={{ selected: symbol === s }}
                accessibilityLabel={`Symbol ${s}`}
              >
                <Text style={[styles.symbolText, symbol === s && styles.symbolTextActive]}>
                  {s}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Live preview */}
          {name.trim() ? (
            <View style={styles.previewRow}>
              <View style={styles.previewPill}>
                <Text style={styles.previewSymbol}>{symbol}</Text>
                <Text style={styles.previewName}>{name}</Text>
              </View>
            </View>
          ) : null}
        </View>

        {/* Create button */}
        <TouchableOpacity
          style={[styles.createButton, !name.trim() && styles.createButtonDisabled]}
          onPress={handleCreate}
          disabled={!name.trim()}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Create list"
        >
          <Text style={styles.createButtonText}>Create List</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingTop: 20, paddingBottom: 16,
    borderBottomWidth: 1, borderBottomColor: colors.gray2,
  },
  back: { fontSize: 22, color: colors.black, width: 32 },
  title: { fontSize: 16, fontWeight: '700', color: colors.black },
  body: { flex: 1, padding: 16 },
  label: {
    fontSize: 11, fontWeight: '600', color: colors.gray3,
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray2,
    borderRadius: radii.card, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, color: colors.black,
  },
  symbolGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 10,
  },
  symbolButton: {
    width: 48, height: 48, borderRadius: 12,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray2,
    alignItems: 'center', justifyContent: 'center',
  },
  symbolButtonActive: {
    backgroundColor: colors.black, borderColor: colors.black,
  },
  symbolText: { fontSize: 18, color: colors.gray4 },
  symbolTextActive: { color: colors.white },
  previewRow: { marginTop: 24, alignItems: 'flex-start' },
  previewPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.black, paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20,
  },
  previewSymbol: { color: colors.accent, fontSize: 14, fontWeight: '600' },
  previewName: { color: colors.white, fontSize: 13, fontWeight: '600' },
  createButton: {
    backgroundColor: colors.black, marginHorizontal: 16, marginBottom: 24,
    paddingVertical: 16, borderRadius: radii.button, alignItems: 'center',
  },
  createButtonDisabled: { opacity: 0.3 },
  createButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
