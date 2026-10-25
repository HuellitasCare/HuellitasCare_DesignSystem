import { Platform, type ViewStyle } from 'react-native';

export function gradient(value: string): ViewStyle {
  return Platform.OS === 'web'
    ? ({ backgroundImage: value } as ViewStyle)
    : { experimental_backgroundImage: value };
}

export const screenBackground: ViewStyle = {
  backgroundColor: '#F0F6F3',
  ...Platform.select({
    web: gradient('radial-gradient(ellipse at 0% 5%, rgba(185, 226, 210, 0.62), transparent 52%), radial-gradient(ellipse at 100% 68%, rgba(222, 223, 243, 0.48), transparent 48%), linear-gradient(155deg, #F3F8F5, #EDF4F1 65%, #F6F5EF)'),
    default: gradient('linear-gradient(155deg, #E9F4ED, #F3F5F1)'),
  }),
};
