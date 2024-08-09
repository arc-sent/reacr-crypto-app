import React, { useEffect, useState } from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCripto } from '../context/crypto-context';
import CoinInfoModal from './CoininfoModal';
import AddAssetForm from './AddAssetForm';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [drawer , setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const { crypto } = useCripto()

  useEffect(() => {
    const keypressFunc = e => {
      if (e.key === `/`) {
        setSelect((prev) => !prev)
      }
    }
    document.addEventListener('keypress', keypressFunc);
    return () => document.removeEventListener('keypress', keypressFunc);
  }, [])
  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    console.log(value)
    setModal(true)
  }

  return (<Layout.Header style={headerStyle}>
    <Select
      mode="multiple"
      style={{ width: '300' }}
      open={select}
      value='press / to open'
      onClick={() => setSelect((prev) => !prev)}
      onSelect={handleSelect}
      options={crypto.map(coin => ({
        label: coin.name,
        value: coin.id,
        icon: coin.icon
      }))}
      optionRender={(option) => (
        <Space>
          <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} /> {option.data.label}
        </Space>
      )}
    />

    <Button type="primary"
    onClick={() => setDrawer(true)}
    >Primary Button</Button>

    <Modal
      open={modal}
      onCancel={() => setModal(false)}
      footer={null}
    >
      <CoinInfoModal coin={coin} />
    </Modal>


    <Drawer
          title="Two-level Drawer"
          width={600}
          onClose={() => setDrawer(false)}
          open={drawer}
          destroyOnClose
        >
          <AddAssetForm onClose = {() => setDrawer(false)}/>
    </Drawer>

  </Layout.Header>)
}


