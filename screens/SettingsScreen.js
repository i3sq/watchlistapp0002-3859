import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen({ theme, isDark, toggleTheme }) {
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.secondaryText }]}>المظهر</Text>
        
        <View style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.settingContent}>
            <Ionicons 
              name={isDark ? "moon" : "sunny"} 
              size={24} 
              color={theme.text} 
              style={styles.settingIcon}
            />
            <Text style={[styles.settingText, { color: theme.text }]}>الوضع الليلي</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: theme.border, true: theme.primary }}
            thumbColor="#FFFFFF"
            ios_backgroundColor={theme.border}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.secondaryText }]}>معلومات</Text>
        
        <View style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.settingContent}>
            <Ionicons name="information-circle-outline" size={24} color={theme.text} style={styles.settingIcon} />
            <View>
              <Text style={[styles.settingText, { color: theme.text }]}>الإصدار</Text>
              <Text style={[styles.settingSubText, { color: theme.secondaryText }]}>1.0.0</Text>
            </View>
          </View>
        </View>

        <View style={[styles.settingItem, { backgroundColor: theme.cardBackground, marginTop: 1 }]}>
          <View style={styles.settingContent}>
            <Ionicons name="code-slash-outline" size={24} color={theme.text} style={styles.settingIcon} />
            <View>
              <Text style={[styles.settingText, { color: theme.text }]}>تم التطوير بواسطة</Text>
              <Text style={[styles.settingSubText, { color: theme.secondaryText }]}>React Native & Expo</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.secondaryText }]}>
          تطبيق قائمة المشاهدة
        </Text>
        <Text style={[styles.footerText, { color: theme.secondaryText }]}>
          مصمم بأسلوب iOS
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginHorizontal: 16,
    marginBottom: 8,
    textAlign: 'right',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    marginLeft: 12,
  },
  settingText: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'right',
  },
  settingSubText: {
    fontSize: 14,
    marginTop: 2,
    textAlign: 'right',
  },
  footer: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    marginVertical: 4,
  },
});
