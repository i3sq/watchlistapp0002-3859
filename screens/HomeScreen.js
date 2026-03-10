import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StorageService } from '../services/StorageService';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.35;

export default function HomeScreen({ navigation, theme }) {
  const [movies, setMovies] = useState([]);
  const [anime, setAnime] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadData = async () => {
    const moviesData = await StorageService.getMovies();
    const animeData = await StorageService.getAnime();
    setMovies(moviesData);
    setAnime(animeData);
  };

  const renderCard = (item, type) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.card, { backgroundColor: theme.cardBackground }]}
      onPress={() => navigation.navigate('ItemDetail', { item, type })}
    >
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
      ) : (
        <View style={[styles.cardImagePlaceholder, { backgroundColor: theme.border }]}>
          <Ionicons name="film-outline" size={40} color={theme.secondaryText} />
        </View>
      )}
      <Text style={[styles.cardTitle, { color: theme.text }]} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSection = (title, items, type, navigateTo) => {
    const displayItems = items.slice(0, 4);

    return (
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {displayItems.map((item) => renderCard(item, type))}
          <TouchableOpacity
            style={[styles.moreCard, { backgroundColor: theme.cardBackground, borderColor: theme.border }]}
            onPress={() => navigation.navigate(navigateTo)}
          >
            <Ionicons name="add-circle-outline" size={40} color={theme.primary} />
            <Text style={[styles.moreText, { color: theme.primary }]}>عرض المزيد</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* AI Button */}
      <TouchableOpacity
        style={styles.aiButton}
        onPress={() => navigation.navigate('AIChat')}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[theme.gradientStart, theme.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.aiGradient}
        >
          <View style={styles.aiContent}>
            <Ionicons name="sparkles" size={28} color="#FFFFFF" style={styles.aiIcon} />
            <Text style={styles.aiText}>الذكاء الاصطناعي</Text>
            <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {/* Movies Section */}
      {renderSection('أفلام', movies, 'movie', 'Movies')}

      {/* Anime Section */}
      {renderSection('أنمي', anime, 'anime', 'Series')}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  aiButton: {
    margin: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  aiGradient: {
    padding: 20,
    borderRadius: 16,
  },
  aiContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  aiIcon: {
    marginRight: 12,
  },
  aiText: {
    flex: 1,
    fontSize: 22,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 16,
    marginBottom: 12,
    textAlign: 'right',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  card: {
    width: CARD_WIDTH,
    marginRight: 12,
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
  cardTitle: {
    padding: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
  },
  moreCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5 + 40,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});
