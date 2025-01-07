import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import "./App.css";

import { TokenLaunchpad } from "./components/TokenLaunchpad";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import {
  WalletDisconnectButton,
  WalletModalContext,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';


function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint= useMemo(()=>clusterApiUrl(network),[network])
  return (
  
    <div style={{width: "100vw"}}>
    <ConnectionProvider endpoint={ endpoint }>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
        <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 20
              }}>
          <WalletMultiButton />
          <WalletDisconnectButton></WalletDisconnectButton>
          </div>
         
          <div>
            
            <TokenLaunchpad />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
    </div>
  );
}

export default App;
