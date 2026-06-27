import Ionicons from '@expo/vector-icons/Ionicons';

import type { CategoryKey } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type IconName = keyof typeof Ionicons.glyphMap;

export function Icon({
  name,
  size = 20,
  color,
}: {
  name: IconName;
  size?: number;
  color?: string;
}) {
  const theme = useTheme();
  return <Ionicons name={name} size={size} color={color ?? theme.ink} />;
}

const CATEGORY_ICON: Record<CategoryKey, IconName> = {
  bildung: 'book',
  umwelt: 'leaf',
  soziales: 'people',
  tierschutz: 'paw',
  sport: 'fitness',
  kultur: 'color-palette',
  gesundheit: 'heart',
};

export function categoryIcon(key: CategoryKey): IconName {
  return CATEGORY_ICON[key];
}
