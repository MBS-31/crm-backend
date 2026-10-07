import React from 'react';
import { useLandingStore } from './store/useLandingStore';
import HomePage from './app/page';

// Vite entry: HomePage itself handles the landing <-> dashboard toggle.
export default function App() {
  useLandingStore();
  return <HomePage />;
}
