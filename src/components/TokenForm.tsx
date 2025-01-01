import { useState } from "react"
import { Button } from "./ui/Button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { ConnectButton } from "./WalletConnect/ConnectButton"
import { useAccount, useDeployContract, useWriteContract } from "wagmi"
import { DisconnectButton } from "./WalletConnect/DisconnectButton"
import { customTokenAbi } from "../contract/abi"
import { customTokenBytecode } from "../contract/bytecode"
import { SwitchChainButton } from "./SwitchChain"
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { useToast } from "../hooks/use-toast"

export default function TokenForm() {
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenSymbol: "",
    amount: 100,
  })
  const [contractAddress, setContractAddress] = useState('')
  const [mintFormData, setMintFormData] = useState({
    mintTo: address,
    amount: 0
  });
  const { deployContractAsync } = useDeployContract();
  const { toast } = useToast();
  const { writeContractAsync } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      // see how to get the deployed contract address
      // see if it really shows deployed contract address
      // add some type of moving background like nebula swap
      const response = await deployContractAsync({
        abi: customTokenAbi,
        args: [formData.tokenName, formData.tokenSymbol, formData.amount],
        bytecode: `0x${customTokenBytecode}`,
      })
      setContractAddress(response);
    } catch (error) {
        toast({
          title: "An error happened!",
          description: (error as any)?.message,
        })
    }
  }

  const mintTokens = async () => {
    if (!mintFormData.mintTo || !/^0x[a-fA-F0-9]{40}$/.test(mintFormData.mintTo)) {
      toast({
      title: "Invalid address",
      description: "Please enter a valid Ethereum address.",
      })
      return;
    }
    if (mintFormData.amount == 0) {
      toast({
        title: "Add a amount greater than 0"
      })
      return;
    }
    try {
      const response = await writeContractAsync({
        address: `0x${contractAddress}`,
        abi: customTokenAbi,
        functionName: "mint",
        args: [mintFormData.mintTo, mintFormData.amount]
      })
      if (!response) {
        toast({
          title: "Something went wrong!",
          description: "Please try one more time."
        })
        return;
      }
      toast({
        title: "Minting Successfull",
        description: "Check the wallet you entered for tokens."
      })
    } catch (error) {
      toast({
        title: "An error happened!",
        description: (error as any)?.message,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 p-4 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="absolute top-4 right-4">
            {
              isConnected ? <DisconnectButton /> : <ConnectButton />
            }
        </div>
        <div className="absolute top-8 right-4">
            <SwitchChainButton />
        </div>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Create Your Token On Ethereum Blockchain</h2>
          <p className="text-md font-bold text-white mb-2">Deployed Contract Follows ERC20 Token Standard</p>
          <p className="text-gray-400">Enter your token details below</p>
          {contractAddress && <p className="text-gray-400">Deployed Contract Address: {contractAddress}</p>}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-200">Token Name</Label>
            <Input
              id="name"
              placeholder="Enter token name"
              value={formData.tokenName}
              onChange={(e: any) => setFormData({ ...formData, tokenName: e.target.value })}
              className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="symbol" className="text-gray-200">Symbol</Label>
            <Input
              id="symbol"
              placeholder="Enter token symbol"
              value={formData.tokenSymbol}
              onChange={(e: any) => setFormData({ ...formData, tokenSymbol: e.target.value })}
              className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-200">Initial Supply</Label>
            <Input
              id="amount"
              placeholder="Enter initial supply number"
              value={formData.amount}
              onChange={(e: any) => setFormData({ ...formData, amount: e.target.value })}
              className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4"
          >
            Create Token
          </Button>
        </form>
        {contractAddress && <form onSubmit={mintTokens} className="space-y-6">

            <div className="space-y-2">
              <Label htmlFor="address" className="text-gray-200">Address To Mint To</Label>
              <Input
                id="address"
                placeholder="Enter address to mint to"
                value={mintFormData.mintTo}
                onChange={(e: any) => setMintFormData({ ...mintFormData, mintTo: e.target.value })}
                className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-200">Amount To Mint</Label>
              <Input
                id="amount"
                placeholder="Enter amount of tokens to mint"
                value={mintFormData.amount}
                onChange={(e: any) => setMintFormData({ ...mintFormData, amount: e.target.value })}
                className="bg-gray-900/50 border-gray-800 text-white placeholder:text-gray-500"
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4"
            >
              Mint More
            </Button>
        </form>}
        <h6 className='font-bold text-white text-center mt-2'>Nothern Lights icon by <a target="_blank" className='underline' href="https://icons8.com">Icons8</a></h6>
        <h6 className='font-bold text-white text-center mt-2'>Designed And Developed By <a href="https://x.com/arav190720" className='underline'>Arav Bhivgade</a></h6>
        <div className="flex space-x-6 flex justify-center items-center mt-2">
          <a href="https://x.com/arav190720" className="text-white transition-all duration-200 ease-in-out transform hover:scale-110">
            <Twitter size={24} />
          </a>
          <a href="https://www.linkedin.com/in/aravbhivgade" className="text-white transition-all duration-200 ease-in-out transform hover:scale-110">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/bhivgadearav" className="text-white transition-all duration-200 ease-in-out transform hover:scale-110">
            <Github size={24} />
          </a>
          <a href="mailto:bhivgadearav0@gmail.com" className="text-white transition-all duration-200 ease-in-out transform hover:scale-110">
            <Mail size={24} />
          </a>
        </div>
      </div>
    </div>
  )
}