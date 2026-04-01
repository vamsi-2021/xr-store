import { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AppDetailScreen from './screens/AppDetailScreen';
import StoreScreen from './screens/StoreScreen';

export default function App() {
  const [screen, setScreen] = useState('login'); // 'login' | 'dashboard' | 'store' | 'detail'
  const [selectedApp, setSelectedApp] = useState(null);
  const [user, setUser] = useState(null);
  const [fontsLoaded] = useFonts({ Lato_400Regular, Lato_700Bold });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator /></View>;
  }

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setScreen('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setScreen('login');
  };

  if (screen === 'login') {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (screen === 'detail' && selectedApp) {
    return (
      <AppDetailScreen
        app={selectedApp}
        onBack={() => setScreen('dashboard')}
        onOpenStore={() => setScreen('store')}
      />
    );
  }

  if (screen === 'store') {
    return (
      <StoreScreen
        onBack={() => setScreen('dashboard')}
        onSelectApp={(app) => { setSelectedApp(app); setScreen('detail'); }}
      />
    );
  }

  return (
    <DashboardScreen
      user={user}
      onSelectApp={(app) => { setSelectedApp(app); setScreen('detail'); }}
      onOpenStore={() => setScreen('store')}
      onLogout={handleLogout}
    />
  );
}
