import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function formatName(email) {
  const prefix = email.split('@')[0] || 'User';
  return prefix
    .replace(/[._-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function AuthProvider({ children }) {
  const [registeredAccount, setRegisteredAccount] = useState(null);
  const [user, setUser] = useState(null);

  // Local mock auth keeps the app fully functional without a backend.
  const signIn = async ({ email, password }) => {
    await pause(900);

    const trimmedEmail = email.trim();
    const accountMatches =
      registeredAccount &&
      registeredAccount.email.toLowerCase() === trimmedEmail.toLowerCase() &&
      registeredAccount.password === password;

    setUser({
      name: accountMatches ? registeredAccount.fullName : formatName(trimmedEmail),
      email: trimmedEmail,
      emergencyContacts: [
        { name: 'Ava Johnson', phone: '+1 555 214 4433', relation: 'Primary' },
        { name: 'Emergency Services', phone: '911', relation: 'SOS' },
        { name: 'Jordan Lee', phone: '+1 555 801 7724', relation: 'Backup' },
      ],
    });

    return true;
  };

  const signUp = async ({ fullName, email, password }) => {
    await pause(1000);

    setRegisteredAccount({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
    });

    return true;
  };

  const signOut = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      registeredAccount,
      signIn,
      signUp,
      signOut,
    }),
    [registeredAccount, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
}
