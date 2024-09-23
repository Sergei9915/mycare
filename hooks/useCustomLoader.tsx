// hooks/useCustomLoader.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function useCustomLoader(): JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={'#40744D'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
