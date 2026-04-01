import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const BG = '#0d1b2a';
const INPUT_BG = 'rgba(10, 30, 55, 0.8)';
const BORDER = '#3a7bd5';
const BUTTON_BG = '#3a7bd5';
const TEXT = '#e0f0ff';
const LABEL = '#cce0f5';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inner}
      >
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/xr-store-logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="rgba(150,190,230,0.5)"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="rgba(150,190,230,0.5)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoImage: {
    width: 220,
    height: 80,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  label: {
    color: TEXT,
    fontSize: 16,
    fontWeight: '600',
    alignSelf: 'center',
    marginBottom: 8,
    fontFamily: 'Lato_700Bold',
  },
  input: {
    width: '100%',
    backgroundColor: INPUT_BG,
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: TEXT,
    fontSize: 15,
    marginBottom: 20,
    fontFamily: 'Lato_400Regular',
  },
  button: {
    backgroundColor: BUTTON_BG,
    borderRadius: 8,
    paddingHorizontal: 40,
    paddingVertical: 12,
    marginTop: 4,
    shadowColor: '#3a7bd5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Lato_700Bold',
  },
});
