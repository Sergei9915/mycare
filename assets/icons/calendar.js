import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';

const SvgComponent = ({ colorValue }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <Rect
      width={18}
      height={15}
      x={3}
      y={6}
      stroke={colorValue}
      strokeWidth={2}
      rx={2}
    />
    <Path
      fill={colorValue}
      d="M3 10c0-1.886 0-2.828.586-3.414C4.172 6 5.114 6 7 6h10c1.886 0 2.828 0 3.414.586C21 7.172 21 8.114 21 10H3Z"
    />
    <Path
      stroke={colorValue}
      strokeLinecap="round"
      strokeWidth={2}
      d="M7 3v3M17 3v3"
    />
    <Rect width={4} height={2} x={7} y={12} fill={colorValue} rx={0.5} />
    <Rect width={4} height={2} x={7} y={16} fill={colorValue} rx={0.5} />
    <Rect width={4} height={2} x={13} y={12} fill={colorValue} rx={0.5} />
    <Rect width={4} height={2} x={13} y={16} fill={colorValue} rx={0.5} />
  </Svg>
);

export const CalendarIcon = ({ focused }) => {
  const colorValue = focused ? '#134F22' : '#40744D';
  return <SvgComponent colorValue={colorValue} />;
};
