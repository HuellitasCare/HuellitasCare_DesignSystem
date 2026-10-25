import { Image } from 'expo-image';

import { colors } from '../../theme';
import { svgDataSource } from './Icon';

const mark = '<ellipse cx="4.6" cy="9" rx="2.1" ry="2.7" transform="rotate(-25 4.6 9)"/><ellipse cx="9" cy="5.3" rx="2" ry="2.7" transform="rotate(-9 9 5.3)"/><ellipse cx="15" cy="5.3" rx="2" ry="2.7" transform="rotate(9 15 5.3)"/><ellipse cx="19.4" cy="9" rx="2.1" ry="2.7" transform="rotate(25 19.4 9)"/><path d="M12 21.6 6.6 17c-4-3.4 1.4-8.5 5.4-4.5 4-4 9.4 1.1 5.4 4.5Z"/>';

export function BrandMark({ size = 32, color = colors.primary }: { size?: number; color?: string }) {
  return <Image source={svgDataSource(mark, color, 1.65)} style={{ width: size, height: size }}
    contentFit="contain" cachePolicy="memory" accessible={false} />;
}
