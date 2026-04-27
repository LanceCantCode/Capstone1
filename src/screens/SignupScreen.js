import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppButton from '../components/AppButton';
import AppCard from '../components/AppCard';
import AppInput from '../components/AppInput';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { useAppTheme } from '../theme/theme';

export default function SignupScreen({ navigation }) {
  const { colors } = useAppTheme();
  const { signUp } = useAuth();
  const toast = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secure, setSecure] = useState(true);
  const [confirmSecure, setConfirmSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Missing information', 'Please fill in every field to create an account.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Password and confirm password must match.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      Alert.alert('Invalid email', 'Please use a valid email address.');
      return;
    }

    try {
      setLoading(true);
      await signUp({ fullName, email, password });
      toast.show('Account created. Sign in to continue.', 'success');
      navigation.replace('Login');
    } catch (error) {
      Alert.alert('Signup failed', 'Unable to create your account right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <AppCard style={styles.card}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Create Account</Text>
            <Text style={[styles.sectionCopy, { color: colors.muted }]}>Set up your SAFEWALK profile in under a minute.</Text>

            <AppInput
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              leftIcon={<Ionicons name="person-outline" size={18} color={colors.primary} />}
            />

            <AppInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              keyboardType="email-address"
              leftIcon={<Ionicons name="mail-outline" size={18} color={colors.primary} />}
            />

            <AppInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry={secure}
              leftIcon={<Ionicons name="lock-closed-outline" size={18} color={colors.primary} />}
              rightIcon={<Ionicons name={secure ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.muted} />}
              onRightPress={() => setSecure((value) => !value)}
            />

            <AppInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter your password"
              secureTextEntry={confirmSecure}
              leftIcon={<Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />}
              rightIcon={<Ionicons name={confirmSecure ? 'eye-outline' : 'eye-off-outline'} size={18} color={colors.muted} />}
              onRightPress={() => setConfirmSecure((value) => !value)}
            />

            <AppButton title="Register" onPress={handleSignUp} loading={loading} style={styles.button} />

            <View style={styles.footerRow}>
              <Text style={[styles.footerText, { color: colors.muted }]}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.footerLink, { color: colors.primary }]}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </AppCard>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 24,
    justifyContent: 'center',
  },
  card: {
    paddingTop: 22,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 6,
  },
  sectionCopy: {
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    marginTop: 10,
  },
  footerRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '800',
  },
});
