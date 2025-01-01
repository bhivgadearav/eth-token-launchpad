import React from 'react';
import { Globe, X } from 'lucide-react';
import { useSwitchChain } from 'wagmi';
import { Button } from './ui/Button';

interface ChainsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChainsModal: React.FC<ChainsModalProps> = ({ isOpen, onClose }) => {
  const { chains, switchChain } = useSwitchChain() 

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
          {chains.map((chain) => (
            <Button
              key={chain.id}
              onClick={() => {
                switchChain({ chainId: chain.id })
                onClose()
              }}
              variant="outline"
              className="w-full justify-between h-14 px-4"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-6 h-6" />
                <span>{chain.name}</span>
              </div>
              <span>Switch</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};