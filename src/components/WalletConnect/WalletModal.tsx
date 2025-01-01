import React from 'react';
import { Wallet, X } from 'lucide-react';
import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { Button } from '../ui/Button';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose }) => {
  const { connect, connectors } = useConnect();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Connect a wallet</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {connectors.map((connector) => (
            <Button
              key={connector.uid}
              onClick={() => connect({ connector })}
              variant="outline"
              className="w-full justify-between h-14 px-4"
            >
              <div className="flex items-center gap-3">
                <Wallet className="w-6 h-6" />
                <span>{connector.name}</span>
              </div>
              <span>Connect</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};