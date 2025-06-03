// app/src/hooks/useColorScheme.ts
import { useColorScheme as useNativeColorScheme } from 'react-native';

export function useColorScheme(): NonNullable<ReturnType<typeof useNativeColorScheme>> {
  return useNativeColorScheme() as NonNullable<ReturnType<typeof useNativeColorScheme>>;
}