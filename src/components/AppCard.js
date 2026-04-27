import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAppTheme } from '../theme/theme';

export default function AppCard({ children, style }) {
  const { colors } = useAppTheme();

  return <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border, shadowColor: colors.shadow }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 18,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
});
