import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';

import { useAppTheme } from '../theme/theme';

export default function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  onToggleSecure,
  autoCapitalize = 'none',
  leftIcon,
  rightIcon,
  onRightPress,
  multiline = false,
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {label ? <Text style={[styles.label, { color: colors.muted }]}>{label}</Text> : null}
      <View style={[styles.field, { backgroundColor: colors.inputBackground, borderColor: colors.border }]}> 
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          style={[styles.input, { color: colors.text }, multiline && styles.multiline]}
        />
        {rightIcon ? (
          <TouchableOpacity onPress={onRightPress} hitSlop={8} style={styles.iconButton}>
            {rightIcon}
          </TouchableOpacity>
        ) : null}
        {onToggleSecure ? (
          <TouchableOpacity onPress={onToggleSecure} hitSlop={8} style={styles.iconButton}>
            {onToggleSecure()}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  field: {
    minHeight: 54,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 14,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  icon: {
    marginRight: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
});
