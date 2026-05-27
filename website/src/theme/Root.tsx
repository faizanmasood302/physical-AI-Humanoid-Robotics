import React from 'react';
import { AuthProvider } from '../lib/AuthContext';
import ChatBot from '../components/ChatBot/ChatBot';
import TextSelectionButton from '../components/TextSelectionButton/TextSelectionButton';

export default function Root({children}: {children: React.ReactNode}) {
  return (
    <AuthProvider>
      {children}
      <ChatBot />
      <TextSelectionButton />
    </AuthProvider>
  );
}
