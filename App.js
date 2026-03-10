import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { lightTheme, darkTheme } from './theme';
import { StorageService } from './services/StorageService';

// Screens
import HomeScreen from './screens/HomeScreen';
import MoviesScreen from './screens/MoviesScreen';
import SeriesScreen from './screens/SeriesScreen';
import SettingsScreen from './screens/SettingsScreen';
import AIChatScreen from './screens/AIChatScreen';
import AddItemScreen from './screens/AddItemScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeTabs({ theme, isDark, toggleTheme }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Movies') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Series') {
            iconName = focused ? 'tv' : 'tv-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.secondaryText,
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
          borderTopColor: theme.tabBarBorder,
          borderTopWidth: 0.5,
          height: 90,
          paddingBottom: 30,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: theme.cardBackground,
          shadowColor: 'transparent',
          elevation: 0,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 34,
        },
        headerTitleAlign: 'right',
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{ title: 'الرئيسية', headerTitle: 'الرئيسية' }}
      >
        {(props) => <HomeScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen
        name="Movies"
        options={{ title: 'الأفلام', headerTitle: 'الأفلام' }}
      >
        {(props) => <MoviesScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen
        name="Series"
        options={{ title: 'المسلسلات', headerTitle: 'المسلسلات' }}
      >
        {(props) => <SeriesScreen {...props} theme={theme} />}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{ title: 'الإعدادات', headerTitle: 'الإعدادات' }}
      >
        {(props) => (
          <SettingsScreen
            {...props}
            theme={theme}
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await StorageService.getTheme();
    setIsDark(savedTheme === 'dark');
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await StorageService.saveTheme(newTheme ? 'dark' : 'light');
  };

  return (
    <NavigationContainer>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.cardBackground,
          },
          headerTintColor: theme.primary,
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17,
          },
          headerTitleAlign: 'center',
          headerBackTitle: 'رجوع',
        }}
      >
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
        >
          {(props) => (
            <HomeTabs
              {...props}
              theme={theme}
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AIChat"
          options={{ headerShown: false }}
        >
          {(props) => <AIChatScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen
          name="AddItem"
          options={({ route }) => ({
            title: route.params.type === 'movie' ? 'إضافة فيلم' : 'إضافة مسلسل',
            presentation: 'modal',
          })}
        >
          {(props) => <AddItemScreen {...props} theme={theme} />}
        </Stack.Screen>
        <Stack.Screen
          name="ItemDetail"
          options={{ title: 'التفاصيل' }}
        >
          {(props) => <ItemDetailScreen {...props} theme={theme} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
