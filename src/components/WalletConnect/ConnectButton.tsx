import React, { useState } from 'react';
import { useAccount, useEnsName } from 'wagmi';
import { WalletModal } from './WalletModal';
import { Button } from '../ui/Button';
import { formatAddress } from '../../utils/formatAddress';

export const ConnectButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { data: ensName } = useEnsName({ address });

  if (isConnected && address) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          className="font-medium"
        >
          {ensName || formatAddress(address)}
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="font-medium"
      >
        Connect Wallet
      </Button>
      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};