import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAppTheme } from '../theme/theme';
import RootNavigator from './RootNavigator';

export default function AppNavigator() {
  const { navigationTheme } = useAppTheme();

  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
