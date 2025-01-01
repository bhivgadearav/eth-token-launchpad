import React, { useState } from 'react';
import { ChainsModal } from './ChainsModal';
import { Button } from './ui/Button';
import { useChainId } from 'wagmi';

export const SwitchChainButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const chainId = useChainId();

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="font-medium"
      >
        Current: {chainId == 1 ? "Ethereum Mainnet" : "Sepolia Network"}
      </Button>
      <ChainsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};