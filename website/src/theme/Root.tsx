import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { AuthProvider } from '../lib/AuthContext';
import { setAuthUrl as setAuthClientUrl } from '../lib/authClient';
import ChatBot from '../components/ChatBot/ChatBot';
import TextSelectionButton from '../components/TextSelectionButton/TextSelectionButton';

export default function Root({children}: {children: React.ReactNode}) {
  const {siteConfig} = useDocusaurusContext();
  const authUrl = (siteConfig.customFields?.authUrl as string) || 'http://localhost:4000';
  setAuthClientUrl(authUrl);

  return (
    <AuthProvider>
      {children}
      <ChatBot />
      <TextSelectionButton />
    </AuthProvider>
  );
}
