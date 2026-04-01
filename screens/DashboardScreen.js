import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
const XR_LOGO = require('../assets/xr-store-logo.png');
import { useState } from 'react';
import data from '../data/sampleData.json';
import AuthService from '../services/AuthService';

const BG = '#0d1b2a';
const CARD = '#1c2e45';
const ITEM = '#8fa8c0';
const TEXT_PRIMARY = '#cce0f5';

export default function DashboardScreen({ user: userProp, onSelectApp, onOpenStore, onLogout }) {
  const [selectedApp, setSelectedApp] = useState(data.installedApps[0].id);
  const { installedApps } = data;
  // Use API user if available, fall back to sample data
  const user = userProp || data.user;

  const handleLogout = async () => {
    await AuthService.logout();
    onLogout();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onOpenStore}>
          <Image source={XR_LOGO} style={styles.logoImage} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={handleLogout}>
          <Text style={styles.backButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* User Info Card */}
      <View style={styles.userCard}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.batteryText}>Battery {user.battery}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Currently{'\n'}Online</Text>
        </View>
      </View>

      {/* Installed Apps */}
      <View style={styles.appsCard}>
        <Text style={styles.appsTitle}>Installed Apps</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {installedApps.map((app) => (
            <TouchableOpacity
              key={app.id}
              style={[styles.appItem, selectedApp === app.id && styles.appItemSelected]}
              onPress={() => { setSelectedApp(app.id); onSelectApp(app); }}
            >
              <View style={styles.appThumbnail}>
                <Image source={{ uri: app.thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
              </View>
              <View style={styles.appDetails}>
                <Text style={styles.appName}>{app.name}</Text>
                <Text style={styles.appTime}>Time in App: {app.timeInApp}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
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
    fontWeight: '500',
  },
  userCard: {
    backgroundColor: CARD,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    gap: 6,
  },
  userName: {
    color: TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: '400',
  },
  batteryText: {
    color: TEXT_PRIMARY,
    fontSize: 18,
    fontWeight: '400',
  },
  statusBadge: {
    backgroundColor: '#2a4060',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: 'center',
  },
  statusText: {
    color: TEXT_PRIMARY,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
  appsCard: {
    backgroundColor: CARD,
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  appsTitle: {
    color: TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 14,
  },
  appItem: {
    backgroundColor: ITEM,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  appItemSelected: {
    borderColor: '#1a1a2e',
    borderWidth: 2,
  },
  appThumbnail: {
    width: 60,
    height: 70,
    backgroundColor: '#6e8aaa',
    borderRadius: 6,
    marginRight: 14,
    overflow: 'hidden',
  },
  appDetails: {
    gap: 6,
  },
  appName: {
    color: '#1a2e45',
    fontSize: 17,
    fontWeight: '500',
  },
  appTime: {
    color: '#1a2e45',
    fontSize: 15,
  },
});
