import { Ionicons, type IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { Image } from 'expo-image';
import type { ReactElement } from 'react';

import { colors } from '../../theme';

export type IconName = IoniconsIconName;

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

const artwork: Record<string, string> = {
  home: '<path d="m3.5 10 8.5-7 8.5 7v9a2 2 0 0 1-2 2h-4.2v-7H9.7v7H5.5a2 2 0 0 1-2-2z"/>',
  paw: '<ellipse cx="5.2" cy="8.8" rx="2" ry="2.7" transform="rotate(-24 5.2 8.8)"/><ellipse cx="9.5" cy="5.5" rx="1.9" ry="2.6"/><ellipse cx="14.5" cy="5.5" rx="1.9" ry="2.6"/><ellipse cx="18.8" cy="8.8" rx="2" ry="2.7" transform="rotate(24 18.8 8.8)"/><path d="M12 11.8c-2.5 0-3 2.5-5.2 4.6-1.8 1.8-.6 4.1 1.5 4.1 1.6 0 2.3-.8 3.7-.8s2.1.8 3.7.8c2.1 0 3.3-2.3 1.5-4.1-2.2-2.1-2.7-4.6-5.2-4.6Z"/>',
  pulse: '<path d="M2 12h4l3-7 5 14 3-7h5"/>',
  medkit: '<rect x="3" y="6.5" width="18" height="15" rx="4"/><path d="M8 6.5V4a1.5 1.5 0 0 1 1.5-1.5h5A1.5 1.5 0 0 1 16 4v2.5M9 14h6m-3-3v6"/>',
  heart: '<path d="M20.2 4.9a5.2 5.2 0 0 0-7.3 0l-.9.9-.9-.9a5.2 5.2 0 0 0-7.3 7.3L12 20l8.2-7.8a5.2 5.2 0 0 0 0-7.3Z"/>',
  add: '<path d="M12 5v14M5 12h14"/>',
  remove: '<path d="M5 12h14"/>',
  'arrow-back': '<path d="m10 5-7 7 7 7M3 12h18"/>',
  'arrow-forward': '<path d="m14 5 7 7-7 7M21 12H3"/>',
  'chevron-forward': '<path d="m9 5 7 7-7 7"/>',
  'chevron-back': '<path d="m15 5-7 7 7 7"/>',
  'chevron-down': '<path d="m5 9 7 7 7-7"/>',
  'chevron-up': '<path d="m5 15 7-7 7 7"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  'close-circle': '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>',
  checkmark: '<path d="m5 12 4.5 4.5L19 7"/>',
  'checkmark-circle': '<circle cx="12" cy="12" r="9"/><path d="m7.5 12 3 3 6-6"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
  time: '<circle cx="12" cy="12" r="9"/><path d="M12 6.5V12l3.5 2"/>',
  book: '<path d="M12 5.2C9.5 3.5 6.5 3.1 3 4v15c3.5-.9 6.5-.5 9 1.2 2.5-1.7 5.5-2.1 9-1.2V4c-3.5-.9-6.5-.5-9 1.2Zm0 0v15"/>',
  chatbubble: '<path d="M21 11.2a8.7 8.7 0 0 1-9 8.3 10 10 0 0 1-3.7-.7L3 21l1.6-5.1A7.7 7.7 0 0 1 3 11.2 8.7 8.7 0 0 1 12 3a8.7 8.7 0 0 1 9 8.2Z"/>',
  'chatbubble-ellipses': '<path d="M21 11.2a8.7 8.7 0 0 1-9 8.3 10 10 0 0 1-3.7-.7L3 21l1.6-5.1A7.7 7.7 0 0 1 3 11.2 8.7 8.7 0 0 1 12 3a8.7 8.7 0 0 1 9 8.2Z"/><path d="M8 11.5h.1m3.9 0h.1m3.9 0h.1" stroke-width="2.7"/>',
  chatbubbles: '<path d="M15 17.5H9l-5 3v-5A7.5 7.5 0 0 1 2.5 11C2.5 6.9 6 3.5 10.2 3.5S18 6.9 18 11c0 2.8-1.3 5.1-3 6.5Z"/><path d="M20 9a6.7 6.7 0 0 1 1.5 4.2 6 6 0 0 1-1.3 3.7V21l-4.2-2.2"/>',
  call: '<path d="M6 3H4a2 2 0 0 0-2 2c0 9.4 7.6 17 17 17a2 2 0 0 0 2-2v-2a1 1 0 0 0-.8-1l-3.7-.9a1 1 0 0 0-1 .3L13.9 18a15 15 0 0 1-7.8-7.8l1.6-1.6a1 1 0 0 0 .3-1L7 3.8A1 1 0 0 0 6 3Z"/>',
  location: '<path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  locate: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2.5"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
  options: '<path d="M3 7h4m4 0h10M3 17h10m4 0h4"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
  warning: '<path d="m10.2 3.9-8 14a2.1 2.1 0 0 0 1.8 3.1h16a2.1 2.1 0 0 0 1.8-3.1l-8-14a2.1 2.1 0 0 0-3.6 0Z"/><path d="M12 9v4m0 3.8v.2"/>',
  'information-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  'alert-circle': '<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 3.5v.1"/>',
  ellipse: '<circle cx="12" cy="12" r="9"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 5-5 4 4 4-7 5 8"/>',
  star: '<path d="m12 2.8 2.8 5.7 6.3.9-4.5 4.4 1.1 6.3-5.7-3-5.7 3 1.1-6.3-4.5-4.4 6.3-.9Z"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off': '<path d="m3 3 18 18M9 5.5A11.6 11.6 0 0 1 12 5c6.4 0 10 7 10 7a19.7 19.7 0 0 1-3.3 4.3M15 18.5a11.6 11.6 0 0 1-3 .5C5.6 19 2 12 2 12a19.7 19.7 0 0 1 3.3-4.3m4.6 2.2a3 3 0 0 0 4.2 4.2"/>',
  attach: '<path d="m8.5 13.5 7-7a3.5 3.5 0 0 1 5 5l-9 9a5.3 5.3 0 0 1-7.5-7.5l9-9a1.8 1.8 0 0 1 2.5 2.5l-9 9a1.8 1.8 0 0 0 2.5 2.5l8-8"/>',
  send: '<path d="m21 3-7 18-3.5-7.5L3 10l18-7ZM10.5 13.5 21 3"/>',
  'document-attach': '<path d="M12 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8l5 5v3M14 3v5h5m-11 2h4m-4 4h3m4 2 3.5-3.5a2.1 2.1 0 0 1 3 3L17 20a3 3 0 0 1-4.2-4.2l3-3"/>',
  headset: '<path d="M4 13v-3a8 8 0 0 1 16 0v8a3 3 0 0 1-3 3h-4"/><rect x="2" y="10" width="5" height="8" rx="2"/><rect x="17" y="10" width="5" height="8" rx="2"/>',
  camera: '<path d="M8 6 9.5 3h5L16 6h3a3 3 0 0 1 3 3v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a3 3 0 0 1 3-3Z"/><circle cx="12" cy="13" r="4"/>',
  person: '<circle cx="12" cy="7.5" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 10h18m-13 4h.1m3.9 0h.1m3.9 0h.1M8 17h.1m3.9 0h.1"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  create: '<path d="M12 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7m-4-9 5 5M9 16l1-5 8-8 4 4-8 8-5 1Z"/>',
};

function asciiBase64(value: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  for (let index = 0; index < value.length; index += 3) {
    const first = value.charCodeAt(index);
    const second = value.charCodeAt(index + 1) || 0;
    const third = value.charCodeAt(index + 2) || 0;
    result += alphabet[first >> 2] + alphabet[((first & 3) << 4) | (second >> 4)]
      + (index + 1 < value.length ? alphabet[((second & 15) << 2) | (third >> 6)] : '=')
      + (index + 2 < value.length ? alphabet[third & 63] : '=');
  }
  return result;
}

export function svgDataSource(body: string, color: string, strokeWidth = 1.7) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
  return { uri: `data:image/svg+xml;base64,${asciiBase64(svg)}` };
}

export function Icon({ name, size = 20, color = colors.text }: IconProps) {
  const body = artwork[name.replace(/-outline$/, '')];
  if (body) {
    return <Image source={svgDataSource(body, color)} style={{ width: size, height: size, flexShrink: 0 }}
      contentFit="contain" cachePolicy="memory" accessible={false} />;
  }
  return <Ionicons name={name} size={size} color={color} />;
}

export type IconSlot = IconName | ReactElement;

export function renderIconSlot(icon: IconSlot, size = 18, color: string = colors.text) {
  return typeof icon === 'string' ? <Icon name={icon} size={size} color={color} /> : icon;
}
