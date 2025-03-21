import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgComponent = ({ colorValue }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
    <Path
      stroke={colorValue}
      strokeWidth={2}
      d="M5 12.76c0-1.358 0-2.037.274-2.634.275-.597.79-1.038 1.821-1.922l1-.857C9.96 5.75 10.89 4.95 12 4.95c1.11 0 2.041.799 3.905 2.396l1 .857c1.03.884 1.546 1.325 1.82 1.922.275.597.275 1.276.275 2.633V17c0 1.887 0 2.83-.586 3.415C17.828 21 16.886 21 15 21H9c-1.886 0-2.828 0-3.414-.586C5 19.828 5 18.886 5 17v-4.24Z"
    />
    <Path
      stroke={colorValue}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.5 21v-5a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v5"
    />
  </Svg>
);
export const HomeIcon = ({ focused }) => {
  const colorValue = focused ? '#134F22' : '#40744D';
  return <SvgComponent colorValue={colorValue} />;
};
