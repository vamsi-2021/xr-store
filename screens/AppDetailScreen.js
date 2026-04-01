import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
const XR_LOGO = require('../assets/xr-store-logo.png');

const BG = '#0d1b2a';
const CARD = '#1c2e45';
const TEXT_PRIMARY = '#cce0f5';
const DIVIDER = '#3a5a7a';

export default function AppDetailScreen({ app, onBack, onOpenStore }) {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onOpenStore}>
          <Image source={XR_LOGO} style={styles.logoImage} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Main Card */}
      <ScrollView style={styles.card} contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>

        {/* App Image */}
        <Image source={{ uri: app.thumbnail }} style={styles.imagePlaceholder} resizeMode="cover" />

        {/* Title */}
        <Text style={styles.title}>{app.name}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.launchButton}>
            <Text style={styles.launchButtonText}>Launch (or{'\n'}update)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uninstallButton}>
            <Text style={styles.uninstallButtonText}>Uninstall</Text>
          </TouchableOpacity>
        </View>

        {/* Requirements */}
        <Text style={styles.sectionTitle}>Requirements</Text>
        <View style={styles.divider} />
        <Text style={styles.sectionContent}>{app.requirements}</Text>

        {/* Description */}
        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.divider} />
        <Text style={styles.sectionContent}>{app.description}</Text>

        {/* Release Notes */}
        <Text style={styles.sectionTitle}>Release Notes</Text>
        <View style={styles.divider} />
        <Text style={styles.sectionContent}>{app.releaseNotes}</Text>

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

  // Card
  card: {
    backgroundColor: CARD,
    borderRadius: 12,
    flex: 1,
  },

  // Image
  imagePlaceholder: {
    backgroundColor: '#8fa8c0',
    borderRadius: 10,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePlaceholderText: {
    color: '#1a2e45',
    fontSize: 18,
    fontStyle: 'italic',
  },

  // Title
  title: {
    color: TEXT_PRIMARY,
    fontSize: 26,
    fontWeight: '400',
    marginBottom: 16,
  },

  // Buttons
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  launchButton: {
    backgroundColor: '#1a2e45',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flex: 1,
  },
  launchButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 14,
    lineHeight: 20,
  },
  uninstallButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uninstallButtonText: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: '500',
  },

  // Sections
  sectionTitle: {
    color: TEXT_PRIMARY,
    fontSize: 20,
    fontWeight: '400',
    marginTop: 8,
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: DIVIDER,
    marginBottom: 10,
  },
  sectionContent: {
    color: TEXT_PRIMARY,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.75,
  },
});
