import React, { useMemo } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import { useAuth } from '../context/AuthContext';
import { homeStats } from '../data/mockData';
import { useToast } from '../components/Toast';
import { useAppTheme } from '../theme/theme';

export default function HomeScreen() {
  const { colors } = useAppTheme();
  const { user } = useAuth();
  const toast = useToast();

  const welcomeName = useMemo(() => user?.name || 'SAFEWALK User', [user]);

  const handleRoute = () => {
    toast.show('Safe route suggested based on current alert density.', 'info');
  };

  const handleSOS = () => {
    Alert.alert('SOS Triggered', 'Emergency contacts and nearby responders would be notified here.');
  };

  const handleReport = () => {
    Alert.alert('Incident Report', 'Incident reporting flow is ready for expansion.');
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.kicker, { color: colors.primary }]}>Good evening</Text>
          <Text style={[styles.title, { color: colors.text }]}>Welcome, {welcomeName}.</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>Your live safety dashboard is active and updating nearby risk zones.</Text>
        </View>

        <AppCard style={styles.mapCard}>
          <LinearGradient colors={[colors.primaryDark, colors.primary, colors.accent]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.mapHero}>
            <View style={styles.mapBadge}>
              <Ionicons name="location" size={16} color="#FFFFFF" />
              <Text style={styles.mapBadgeText}>Live Location Enabled</Text>
            </View>
            <Text style={styles.mapTitle}>Map Placeholder</Text>
            <Text style={styles.mapCopy}>Nearby routes, high-risk zones, and emergency exits would render here.</Text>
          </LinearGradient>
        </AppCard>

        <View style={styles.statsRow}>
          {homeStats.map((item) => {
            const toneColors = {
              danger: colors.softRed,
              success: colors.softGreen,
              primary: colors.softBlue,
            };

            return (
              <AppCard key={item.label} style={[styles.statCard, { backgroundColor: toneColors[item.tone] }]}>
                <Text style={[styles.statLabel, { color: colors.muted }]}>{item.label}</Text>
                <Text style={[styles.statValue, { color: colors.text }]}>{item.value}</Text>
              </AppCard>
            );
          })}
        </View>

        <AppCard style={styles.statusCard}>
          <View style={styles.statusTopRow}>
            <View>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Safety Status</Text>
              <Text style={[styles.sectionCopy, { color: colors.muted }]}>Route conditions are currently moderate with two low-risk corridors nearby.</Text>
            </View>
            <View style={[styles.pill, { backgroundColor: colors.softGreen }]}>
              <Text style={[styles.pillText, { color: colors.success }]}>Protected</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Ionicons name="warning-outline" size={18} color={colors.warning} />
              <Text style={[styles.summaryText, { color: colors.text }]}>3 active alerts in your area</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
              <Text style={[styles.summaryText, { color: colors.text }]}>Safe corridors updated 2 min ago</Text>
            </View>
          </View>
        </AppCard>

        <View style={styles.actionsRow}>
          <AppButton title="Find Safe Route" onPress={handleRoute} style={styles.actionButton} />
          <AppButton title="SOS" variant="danger" onPress={handleSOS} style={styles.actionButton} />
        </View>

        <AppButton title="Report Incident" variant="secondary" onPress={handleReport} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 16,
  },
  kicker: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  mapCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 14,
  },
  mapHero: {
    minHeight: 190,
    borderRadius: 24,
    padding: 18,
    justifyContent: 'flex-end',
  },
  mapBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.16)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginBottom: 40,
  },
  mapBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  mapTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  mapCopy: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 13,
    lineHeight: 19,
    maxWidth: '92%',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statusCard: {
    marginBottom: 14,
  },
  statusTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 6,
  },
  sectionCopy: {
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 250,
  },
  pill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 12,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    marginVertical: 16,
    opacity: 0.8,
    backgroundColor: '#CBD5E1',
  },
  summaryRow: {
    gap: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  actionButton: {
    flex: 1,
  },
});
