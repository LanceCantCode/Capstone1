import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useAppTheme } from '../theme/theme';

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  textStyle,
  icon,
}) {
  const { colors } = useAppTheme();
  const inactive = disabled || loading;
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isDanger = variant === 'danger';

  const containerStyle = [
    styles.base,
    isPrimary && styles.primary,
    isSecondary && [styles.secondary, { backgroundColor: colors.surface, borderColor: colors.border }],
    isDanger && [styles.danger, { backgroundColor: colors.softRed, borderColor: colors.softRed }],
    inactive && styles.disabled,
    style,
  ];

  const content = (
    <View style={styles.content}>
      {loading ? (
        <ActivityIndicator size="small" color={isPrimary ? '#FFFFFF' : colors.primary} />
      ) : (
        icon
      )}
      <Text
        style={[
          styles.text,
          isPrimary && styles.textPrimary,
          isSecondary && { color: colors.primary },
          isDanger && { color: colors.danger },
          textStyle,
        ]}
      >
        {loading ? 'Please wait' : title}
      </Text>
    </View>
  );

  if (isPrimary) {
    return (
      <Pressable onPress={onPress} disabled={inactive} style={({ pressed }) => [containerStyle, pressed && styles.pressed]}>
        <LinearGradient colors={[colors.primaryDark, colors.primary, colors.accent]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
          {content}
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} disabled={inactive} style={({ pressed }) => [containerStyle, pressed && styles.pressed]}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 18,
    minHeight: 54,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  gradient: {
    width: '100%',
    minHeight: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  },
  primary: {
    borderColor: 'transparent',
    shadowColor: '#2563EB',
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  secondary: {
    borderWidth: 1,
  },
  danger: {
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.7,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  textPrimary: {
    color: '#FFFFFF',
  },
});
