import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppTheme } from '../theme/theme';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-16)).current;
  const timerRef = useRef(null);
  const [toast, setToast] = useState(null);

  const hide = React.useCallback(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -16,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setToast(null));
  }, [opacity, translateY]);

  const show = React.useCallback((message, variant = 'info') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setToast({ message, variant });

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

    timerRef.current = setTimeout(() => {
      hide();
    }, 2400);
  }, [colors, hide, isDark, opacity, translateY]);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    },
    [],
  );

  const value = useMemo(() => ({ show, hide }), [show, hide]);
  const background =
    toast?.variant === 'success'
      ? colors.success
      : toast?.variant === 'danger'
        ? colors.danger
        : isDark
          ? '#1E293B'
          : '#0F172A';

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toast,
            {
              top: insets.top + 12,
              opacity,
              transform: [{ translateY }],
              backgroundColor: background,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={styles.title}>SAFEWALK</Text>
          <Text style={[styles.message, { color: isDark ? '#E2E8F0' : '#F8FAFC' }]}>{toast.message}</Text>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used inside a ToastProvider');
  }

  return context;
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    zIndex: 999,
  },
  title: {
    color: '#93C5FD',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.4,
    marginBottom: 2,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
  },
});
