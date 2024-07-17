// TransportableItem.tsx
import React from 'react';
import { useTransportContext } from './TransportContext';
import ReactDOM from 'react-dom';
import useIsMobile from '~/hooks/useIsMobile';
import { TonConnectButton } from '@tonconnect/ui-react';

const TransportableItem = () => {
    const { container } = useTransportContext();
    const isMobile = useIsMobile()
    const classNames = isMobile ? "block lg:hidden" : "hidden lg:block"

    if (!container) return null;

  return ReactDOM.createPortal(
      <div className={"transportable-item text-white text-3xl"} >
      <TonConnectButton  />
    </div>,
    container
  );
};

export default TransportableItem;
