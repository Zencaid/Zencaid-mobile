import { Redirect } from 'expo-router';

export default function Index() {
  // For now, redirect to auth. In a real app, you'd check authentication state
  return <Redirect href="/(auth)/login" />;
}