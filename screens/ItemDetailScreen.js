import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StorageService } from '../services/StorageService';

const { width } = Dimensions.get('window');

export default function ItemDetailScreen({ navigation, route, theme }) {
  const { item: initialItem, type } = route.params;
  const [item, setItem] = useState(initialItem);

  const statusOptions = ['سأشاهده', 'أشاهده الآن', 'تم المشاهدة'];

  const updateStatus = async (newStatus) => {
    const updatedItem = { ...item, status: newStatus };
    setItem(updatedItem);

    try {
      if (type === 'movie') {
        const movies = await StorageService.getMovies();
        const updated = movies.map((m) => (m.id === item.id ? updatedItem : m));
        await StorageService.saveMovies(updated);
      } else {
        const anime = await StorageService.getAnime();
        const updated = anime.map((a) => (a.id === item.id ? updatedItem : a));
        await StorageService.saveAnime(updated);
      }
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء التحديث');
    }
  };

  const deleteItem = () => {
    Alert.alert(
      'تأكيد الحذف',
      `هل تريد حذف "${item.name}"؟`,
      [
        {
          text: 'إلغاء',
          style: 'cancel',
        },
        {
          text: 'حذف',
          style: 'destructive',
          onPress: async () => {
            try {
              if (type === 'movie') {
                const movies = await StorageService.getMovies();
                const updated = movies.filter((m) => m.id !== item.id);
                await StorageService.saveMovies(updated);
              } else {
                const anime = await StorageService.getAnime();
                const updated = anime.filter((a) => a.id !== item.id);
                await StorageService.saveAnime(updated);
              }
              navigation.goBack();
            } catch (error) {
              Alert.alert('خطأ', 'حدث خطأ أثناء الحذف');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'تم المشاهدة':
        return theme.success;
      case 'أشاهده الآن':
        return theme.warning;
      case 'سأشاهده':
        return theme.primary;
      default:
        return theme.secondaryText;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.imagePlaceholder, { backgroundColor: theme.border }]}>
          <Ionicons
            name={type === 'movie' ? 'film-outline' : 'tv-outline'}
            size={80}
            color={theme.secondaryText}
          />
        </View>
      )}

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]}>{item.name}</Text>

        {item.description ? (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.secondaryText }]}>الوصف</Text>
            <Text style={[styles.description, { color: theme.text }]}>{item.description}</Text>
          </View>
        ) : null}

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.secondaryText }]}>الحالة</Text>
          <View style={styles.statusContainer}>
            {statusOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.statusButton,
                  {
                    backgroundColor: item.status === option ? getStatusColor(option) : theme.cardBackground,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => updateStatus(option)}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: item.status === option ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.secondaryText }]}>معلومات</Text>
          <View style={[styles.infoCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {new Date(item.createdAt).toLocaleDateString('ar-EG')}
              </Text>
              <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>تاريخ الإضافة</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {type === 'movie' ? 'فيلم' : 'مسلسل'}
              </Text>
              <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>النوع</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.deleteButton, { backgroundColor: theme.danger }]}
          onPress={deleteItem}
        >
          <Ionicons name="trash-outline" size={24} color="#FFFFFF" style={styles.deleteIcon} />
          <Text style={styles.deleteButtonText}>حذف</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: width * 1.2,
    backgroundColor: '#E5E5EA',
  },
  imagePlaceholder: {
    width: width,
    height: width * 1.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'right',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'right',
  },
  statusContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  statusButton: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '400',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 40,
  },
  deleteIcon: {
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
