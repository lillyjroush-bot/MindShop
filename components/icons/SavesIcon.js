import Svg, { Path } from 'react-native-svg';

export default function SavesIcon({ color, size = 22 }) {
  return (
    <Svg width={size} height={(size / 24) * 28} viewBox="0 0 24 28" fill="none">
      <Path
        d="M4 2 H20 V26 L12 20 L4 26 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
