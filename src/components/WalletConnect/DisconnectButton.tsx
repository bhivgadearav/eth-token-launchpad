import React from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '../ui/Button';

export const DisconnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="relative">
        <Button
          onClick={() => disconnect()}
          variant="outline"
          className="font-medium"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <>
    </>
  );
};