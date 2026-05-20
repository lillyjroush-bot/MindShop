import Svg, { Rect, Line, Circle, Polyline } from 'react-native-svg';

export default function ReviewIcon({ color, size = 22 }) {
  const scale = size / 32;
  return (
    <Svg width={size} height={size * (26 / 32)} viewBox="0 0 32 26" fill="none">
      <Rect x="2" y="1" width="16" height="22" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <Line x1="6" y1="7" x2="14" y2="7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <Line x1="6" y1="11" x2="14" y2="11" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <Line x1="6" y1="15" x2="11" y2="15" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <Circle cx="25" cy="7.5" r="4.5" stroke={color} strokeWidth="1.5" fill="none" />
      <Polyline points="22.5,7.5 24,9 27.5,5.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="25" cy="18.5" r="4.5" stroke={color} strokeWidth="1.5" fill="none" />
      <Line x1="22.8" y1="16.3" x2="27.2" y2="20.7" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
      <Line x1="27.2" y1="16.3" x2="22.8" y2="20.7" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    </Svg>
  );
}
