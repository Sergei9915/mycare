import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  Dimensions,
} from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

export interface ButtonProps {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
}

export default function Button({
  title,
  onPress,
  backgroundColor = '#40744D',
  textColor = '#fff',
  style,
}: ButtonProps): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 70,
    width: width * 0.9,
    paddingVertical: 23,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
