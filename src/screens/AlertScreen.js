import React, { useCallback, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import { alertsData } from '../data/mockData';
import { useToast } from '../components/Toast';
import { useAppTheme } from '../theme/theme';

export default function AlertScreen() {
  const { colors } = useAppTheme();
  const toast = useToast();
  const [refreshing, setRefreshing] = useState(false);
  const [alerts, setAlerts] = useState(alertsData);

  const onRefresh = useCallback(() => {
    // Pull-to-refresh simulates new incoming safety alerts.
    setRefreshing(true);

    setTimeout(() => {
      setAlerts((current) => [
        {
          id: `${Date.now()}`,
          title: 'Fresh Police Dispatch',
          location: 'Downtown Transit Plaza',
          time: 'Just now',
          severity: 'High',
        },
        ...current,
      ]);
      setRefreshing(false);
      toast.show('Alerts refreshed with the latest safety data.', 'success');
    }, 900);
  }, [toast]);

  const reroute = () => {
    toast.show('Safe path reroute suggested for your current area.', 'info');
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} colors={[colors.primary]} />}
        ListHeaderComponent={
          <View>
            <View style={[styles.banner, { backgroundColor: colors.softRed, borderColor: colors.danger }]}> 
              <Ionicons name="warning" size={20} color={colors.danger} />
              <Text style={[styles.bannerText, { color: colors.danger }]}>Crime increased by 50% in this area</Text>
            </View>

            <View style={styles.headerBlock}>
              <Text style={[styles.title, { color: colors.text }]}>Active Alerts</Text>
              <Text style={[styles.subtitle, { color: colors.muted }]}>Monitor nearby incidents and update your route before you leave.</Text>
            </View>

            <AppButton title="Reroute to Safe Path" onPress={reroute} style={styles.routeButton} />
          </View>
        }
        renderItem={({ item }) => (
          <AppCard style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.iconWrap}>
                <Ionicons name="alert-circle-outline" size={22} color={colors.danger} />
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.cardMeta, { color: colors.muted }]}>{item.location}</Text>
              </View>
              <View style={[styles.severityPill, { backgroundColor: colors.softAmber }]}>
                <Text style={[styles.severityText, { color: colors.warning }]}>{item.severity}</Text>
              </View>
            </View>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="time-outline" size={16} color={colors.muted} />
                <Text style={[styles.detailText, { color: colors.muted }]}>{item.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="location-outline" size={16} color={colors.muted} />
                <Text style={[styles.detailText, { color: colors.muted }]}>Pin this zone to avoid it</Text>
              </View>
            </View>
          </AppCard>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={<View style={{ height: 24 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },
  bannerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
  },
  headerBlock: {
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  routeButton: {
    marginBottom: 16,
  },
  card: {
    paddingVertical: 16,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardMeta: {
    fontSize: 13,
    lineHeight: 18,
  },
  severityPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  severityText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  detailsRow: {
    marginTop: 14,
    gap: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
