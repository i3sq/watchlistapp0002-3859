import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StorageService } from '../services/StorageService';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export default function MoviesScreen({ navigation, theme }) {
  const [movies, setMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadMovies();
    }, [])
  );

  const loadMovies = async () => {
    const data = await StorageService.getMovies();
    setMovies(data);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      onPress={() => navigation.navigate('ItemDetail', { item, type: 'movie' })}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImagePlaceholder, { backgroundColor: theme.border }]}>
          <Ionicons name="film-outline" size={50} color={theme.secondaryText} />
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={2}>
          {item.name}
        </Text>
        {item.status && (
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status, theme) }]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status, theme) => {
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
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="film-outline" size={80} color={theme.secondaryText} />
            <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
              لا توجد أفلام بعد
            </Text>
            <Text style={[styles.emptySubText, { color: theme.secondaryText }]}>
              اضغط على + لإضافة فيلم جديد
            </Text>
          </View>
        }
      />
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate('AddItem', { type: 'movie' })}
      >
        <Ionicons name="add" size={32} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    width: CARD_WIDTH,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    backgroundColor: '#E5E5EA',
  },
  cardImagePlaceholder: {
    width: '100%',
    height: CARD_WIDTH * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'right',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 16,
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
