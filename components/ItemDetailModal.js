import {
  Modal, View, Text, Image, TextInput, TouchableOpacity,
  ScrollView, StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { colors, radii } from '../constants/theme';

const VERDICT_OPTIONS = [
  { value: 'yes',   label: 'Still Want It', symbol: '✓', bg: '#eaf4ef', text: '#2d6a4f' },
  { value: 'maybe', label: 'Not Sure',       symbol: '～', bg: '#fdf3e3', text: '#7a5c1e' },
  { value: 'no',    label: 'Over It',        symbol: '✕', bg: '#fdecea', text: '#9b2c2c' },
];

export default function ItemDetailModal({ item, onClose, onSave }) {
  const [verdict, setVerdict] = useState(item?.verdict ?? null);
  const [notes, setNotes] = useState(item?.notes ?? '');

  if (!item) return null;

  function handleSave() {
    onSave(item.id, { verdict, notes });
    onClose();
  }

  return (
    <Modal visible={!!item} animationType="slide" presentationStyle="pageSheet">
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {/* Image with back arrow */}
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <TouchableOpacity
              style={styles.backButton}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Close"
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            {/* Meta */}
            <Text style={styles.meta}>{item.store} · {item.savedDate}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Verdict selector */}
            <Text style={styles.question}>Do you still want this?</Text>
            <View style={styles.verdictRow}>
              {VERDICT_OPTIONS.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.verdictButton,
                    { backgroundColor: opt.bg },
                    verdict === opt.value && styles.verdictButtonActive,
                  ]}
                  onPress={() => setVerdict(opt.value)}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityState={{ selected: verdict === opt.value }}
                  accessibilityLabel={opt.label}
                >
                  <Text style={[styles.verdictSymbol, { color: opt.text }]}>{opt.symbol}</Text>
                  <Text style={[styles.verdictLabel, { color: opt.text }]}>{opt.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Notes */}
            <Text style={styles.notesLabel}>Notes to future you</Text>
            <TextInput
              style={styles.notesInput}
              value={notes}
              onChangeText={setNotes}
              placeholder="Anything worth remembering..."
              placeholderTextColor={colors.gray3}
              multiline
              numberOfLines={3}
            />
          </View>
        </ScrollView>

        {/* Save & Close */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Save and close"
        >
          <Text style={styles.saveButtonText}>Save & Close</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

// useState needs to be imported
import { useState } from 'react';

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.bg },
  imageWrapper: { position: 'relative' },
  image: { width: '100%', height: 280, backgroundColor: colors.gray2 },
  backButton: {
    position: 'absolute', top: 16, left: 16,
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center', justifyContent: 'center',
  },
  backArrow: { fontSize: 18, color: colors.black },
  body: { padding: 20 },
  meta: { fontSize: 12, color: colors.gray3, marginBottom: 6 },
  name: { fontSize: 20, fontWeight: '700', color: colors.black, marginBottom: 6 },
  price: { fontSize: 22, fontWeight: '700', color: colors.accent },
  divider: { height: 1, backgroundColor: colors.gray2, marginVertical: 20 },
  question: { fontSize: 13, color: colors.gray4, textAlign: 'center', marginBottom: 14 },
  verdictRow: { flexDirection: 'row', gap: 8, marginBottom: 24 },
  verdictButton: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingVertical: 12, borderRadius: radii.button,
    borderWidth: 2, borderColor: 'transparent',
  },
  verdictButtonActive: { borderColor: colors.black },
  verdictSymbol: { fontSize: 16, marginBottom: 4 },
  verdictLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  notesLabel: {
    fontSize: 11, fontWeight: '600', color: colors.gray3,
    letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8,
  },
  notesInput: {
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray2,
    borderRadius: radii.card, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 14, color: colors.black, minHeight: 80, textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: colors.black, marginHorizontal: 16, marginBottom: 24,
    paddingVertical: 16, borderRadius: radii.button, alignItems: 'center',
  },
  saveButtonText: { color: colors.white, fontSize: 15, fontWeight: '700' },
});
