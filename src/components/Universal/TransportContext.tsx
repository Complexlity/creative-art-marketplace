// TransportContext.tsx
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import useIsMobile from '~/hooks/useIsMobile';

const TransportContext = createContext<any>(null);

export const TransportProvider = ({ children }: {children: React.ReactNode}) => {
  const [container, setContainer] = useState(null);
  const mobileContainerRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const isMobile = useIsMobile()

  useEffect(() => {
    setContainer(isMobile ? mobileContainerRef.current : desktopContainerRef.current);
  }, [isMobile])

  return (
    <TransportContext.Provider value={{ container, mobileContainerRef, desktopContainerRef }}>
      {children}
    </TransportContext.Provider>
  );
};

export const useTransportContext = () => useContext(TransportContext);
