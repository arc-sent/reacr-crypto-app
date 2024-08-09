import React, { useContext, useEffect } from 'react';
import { Layout, Spin } from 'antd';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import AppContent from './components/AppContent';
import { CryptoContextProvider } from './context/crypto-context';
import CryptoContext from './context/crypto-context';




export default function App() {
  return (
    <CryptoContextProvider>
      <InnerApp />
    </CryptoContextProvider>
  );
}

function InnerApp() {
  const { loading } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  );
}

