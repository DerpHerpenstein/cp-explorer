import React, { useState } from 'react';
import UniSatConnect from '../wallets/unisatconnect';

const WalletConnect = ({walletState, setWalletState}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [connected, setConnected] = useState(false);


  return (
    <div className="relative">
        {!walletState?.connected ? (
            <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowButtons(!showButtons)}
            >
            Connect
            </button>
        )
        :
        (
            <div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {walletState?.walletAddress.slice(0, 8)}...{walletState?.walletAddress.slice(-4)}
                </button>
            </div>
        )
        }

      {showButtons && (
        <div className="absolute right-0 mt-2 space-y-2">
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={ async () => {
                const unisatWallet = new UniSatConnect();
                await unisatWallet.connect();
                setWalletState(unisatWallet);
                setShowButtons(false);
            }}>
            Unisat</button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;