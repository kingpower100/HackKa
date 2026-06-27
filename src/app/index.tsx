import { Redirect } from 'expo-router';

import { useStore } from '@/store/app-store';

export default function Index() {
  const { state } = useStore();
  return <Redirect href={state.onboarded ? '/home' : '/onboarding'} />;
}
