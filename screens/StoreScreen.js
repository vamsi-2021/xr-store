import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image } from 'react-native';
const XR_LOGO = require('../assets/xr-store-logo.png');
import { useState } from 'react';
import data from '../data/sampleData.json';

const BG = '#0d1b2a';
const CARD = '#1c2e45';
const ITEM = '#8fa8c0';
const TEXT_PRIMARY = '#cce0f5';

export default function StoreScreen({ onSelectApp, onBack }) {
  const [search, setSearch] = useState('');

  const filtered = data.storeApps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Image source={XR_LOGO} style={styles.logoImage} resizeMode="contain" />
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#8fa8c0"
          value={search}
          onChangeText={setSearch}
        />
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      {/* App List */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {filtered.map((app) => (
          <View key={app.id} style={styles.appItem}>
            <View style={styles.appThumbnail}>
              <Text style={styles.thumbnailText}>pic</Text>
            </View>
            <View style={styles.appInfo}>
              <Text style={styles.appName}>{app.name}</Text>
              <TouchableOpacity style={styles.launchButton} onPress={() => onSelectApp(app)}>
                <Text style={styles.launchButtonText}>Launch</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoImage: {
    width: 120,
    height: 44,
  },

  backButton: {
    backgroundColor: '#2a4060',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  backButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 15,
    fontFamily: 'Lato_400Regular',
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CARD,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a4a6a',
  },
  searchInput: {
    flex: 1,
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontFamily: 'Lato_400Regular',
  },
  searchIcon: {
    fontSize: 18,
  },

  // App Items
  appItem: {
    backgroundColor: ITEM,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 14,
  },
  appThumbnail: {
    width: 70,
    height: 80,
    backgroundColor: '#b0c4d8',
    borderRadius: 10,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    color: '#1a2e45',
    fontSize: 13,
    fontStyle: 'italic',
  },
  appInfo: {
    flex: 1,
    gap: 10,
  },
  appName: {
    color: '#1a2e45',
    fontSize: 18,
    fontFamily: 'Lato_700Bold',
  },
  launchButton: {
    backgroundColor: '#1c3a5c',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  launchButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 15,
    fontFamily: 'Lato_400Regular',
  },
});
