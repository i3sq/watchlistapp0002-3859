import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  MOVIES: '@movies',
  ANIME: '@anime',
  SERIES: '@series',
  THEME: '@theme',
  AI_CONVERSATIONS: '@ai_conversations',
};

export const StorageService = {
  // Movies
  async getMovies() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.MOVIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting movies:', error);
      return [];
    }
  },

  async saveMovies(movies) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
    } catch (error) {
      console.error('Error saving movies:', error);
    }
  },

  // Anime
  async getAnime() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.ANIME);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting anime:', error);
      return [];
    }
  },

  async saveAnime(anime) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ANIME, JSON.stringify(anime));
    } catch (error) {
      console.error('Error saving anime:', error);
    }
  },

  // Series
  async getSeries() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SERIES);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting series:', error);
      return [];
    }
  },

  async saveSeries(series) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.SERIES, JSON.stringify(series));
    } catch (error) {
      console.error('Error saving series:', error);
    }
  },

  // Theme
  async getTheme() {
    try {
      const theme = await AsyncStorage.getItem(STORAGE_KEYS.THEME);
      return theme || 'light';
    } catch (error) {
      console.error('Error getting theme:', error);
      return 'light';
    }
  },

  async saveTheme(theme) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },

  // AI Conversations
  async getConversations() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.AI_CONVERSATIONS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting conversations:', error);
      return [];
    }
  },

  async saveConversations(conversations) {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.AI_CONVERSATIONS, JSON.stringify(conversations));
    } catch (error) {
      console.error('Error saving conversations:', error);
    }
  },
};
