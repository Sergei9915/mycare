import React from 'react';
import { HomeIcon } from '@/assets/icons/home';
import { CalendarIcon } from '@/assets/icons/calendar';
import { ChatIcon } from '@/assets/icons/chat';
import { View, StyleSheet } from 'react-native';

interface TabIconProps {
  name: string;
  focused: boolean;
}

type IconProps = {
  focused: boolean;
};

const icons: { [key: string]: React.FC<IconProps> } = {
  home: HomeIcon,
  calendar: CalendarIcon,
  explore: ChatIcon,
};

export const useTabBarOptions = () => {
  const getIcon = ({ name, focused }: TabIconProps) => {
    const Icon = icons[name];

    return (
      <View style={styles.iconContainer}>
        <Icon focused={focused} />
        {focused && <View style={styles.underline} />}
      </View>
    );
  };

  return { getIcon };
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    top: 15,
  },
  underline: {
    position: 'absolute',
    bottom: -4,
    width: 9,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#134F22',
  },
});
