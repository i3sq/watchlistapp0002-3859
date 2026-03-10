import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StorageService } from '../services/StorageService';

export default function AddItemScreen({ navigation, route, theme }) {
  const { type } = route.params; // 'movie' or 'anime'
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [status, setStatus] = useState('سأشاهده');

  const statusOptions = ['سأشاهده', 'أشاهده الآن', 'تم المشاهدة'];

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('خطأ', 'الرجاء إدخال الاسم');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      status,
      createdAt: Date.now(),
    };

    try {
      if (type === 'movie') {
        const movies = await StorageService.getMovies();
        await StorageService.saveMovies([...movies, newItem]);
      } else {
        const anime = await StorageService.getAnime();
        await StorageService.saveAnime([...anime, newItem]);
      }

      Alert.alert('نجح', 'تم الإضافة بنجاح', [
        {
          text: 'حسناً',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء الحفظ');
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>الاسم *</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
              placeholder={type === 'movie' ? 'اسم الفيلم' : 'اسم المسلسل'}
              placeholderTextColor={theme.secondaryText}
              value={name}
              onChangeText={setName}
              textAlign="right"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>الوصف</Text>
            <TextInput
              style={[styles.textArea, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
              placeholder="وصف مختصر..."
              placeholderTextColor={theme.secondaryText}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlign="right"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>رابط الصورة</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor={theme.secondaryText}
              value={imageUrl}
              onChangeText={setImageUrl}
              textAlign="right"
              autoCapitalize="none"
              keyboardType="url"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>الحالة</Text>
            <View style={styles.statusContainer}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.statusButton,
                    {
                      backgroundColor: status === option ? theme.primary : theme.cardBackground,
                      borderColor: theme.border,
                    },
                  ]}
                  onPress={() => setStatus(option)}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: status === option ? '#FFFFFF' : theme.text },
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: theme.primary }]}
            onPress={handleSave}
          >
            <Ionicons name="checkmark" size={24} color="#FFFFFF" style={styles.saveIcon} />
            <Text style={styles.saveButtonText}>حفظ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  statusButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  saveIcon: {
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
